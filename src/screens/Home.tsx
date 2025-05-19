import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Alert,
    Modal,
    KeyboardAvoidingView,
    Platform,
    Image,
} from 'react-native';
import { Dimensions } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import api from '../utils/api';
import NetInfo from '@react-native-community/netinfo';
import styles from '../utils/styles';
import { Swipeable } from 'react-native-gesture-handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useAuth } from '../context/AuthContext';

interface Task {
    _id: string;
    title: string;
    completed: boolean;
}

const Home = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [networkAvailable, setNetworkAvailable] = useState(true);

    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [editText, setEditText] = useState('');
    const editInputRef = useRef<TextInput>(null);

    const [isDarkMode, setIsDarkMode] = useState(true);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [nameColor, setNameColor] = useState('#007AFF');


    type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
    const { logout, userEmail } = useAuth();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setNetworkAvailable(!!state.isConnected && !!state.isInternetReachable);
        });

        fetchTasks();
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * greetingColors.length);
        setNameColor(greetingColors[randomIndex]);
    }, []);

    useEffect(() => {
        if (editingTask) {
            setTimeout(() => editInputRef.current?.focus(), 300);
        }
    }, [editingTask]);

    const wallpapers = [
        require('../assets/cat-bg.png'),
        require('../assets/cat-bg-5.png'),
        require('../assets/cat-bg-6.png'),
    ];

    const [wallpaper, setWallpaper] = useState(wallpapers[0]); // default

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * wallpapers.length);
        setWallpaper(wallpapers[randomIndex]);
    }, []);


    const fetchTasks = async () => {
        setLoading(true);
        const controller = new AbortController();
        try {
            const res = await api.get('/tasks', { signal: controller.signal });
            setTasks(res.data);
        } catch (err: any) {
            if (err.name !== 'CanceledError') {
                Alert.alert('Error', 'Failed to load tasks');
            }
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchTasks();
        setRefreshing(false);
    };

    const toggleTaskDone = async (id: string) => {
        const task = tasks.find(t => t._id === id);
        if (!task) return;
        try {
            const res = await api.put(`/tasks/${id}`, { completed: !task.completed });
            setTasks(prev => prev.map(t => (t._id === id ? res.data : t)));
        } catch {
            Alert.alert('Error', 'Failed to update task');
        }
    };

    const handleAddTask = async () => {
        if (!newTask.trim()) return;
        try {
            const res = await api.post('/tasks', { title: newTask, completed: false });
            setTasks(prev => [...prev, res.data]);
            setNewTask('');
        } catch {
            Alert.alert('Error', 'Failed to add task');
        }
    };

    const handleDeleteTask = async (id: string) => {
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(prev => prev.filter(task => task._id !== id));
        } catch {
            Alert.alert('Error', 'Failed to delete task');
        }
    };

    const handleStartEdit = (task: Task) => {
        setEditingTask(task);
        setEditText(task.title);
    };

    const handleConfirmEdit = async () => {
        if (!editText.trim() || !editingTask) return;
        try {
            const res = await api.put(`/tasks/${editingTask._id}`, { title: editText });
            setTasks(prev =>
                prev.map(t => (t._id === editingTask._id ? res.data : t)),
            );
            setEditingTask(null);
            setEditText('');
        } catch {
            Alert.alert('Error', 'Failed to update task');
        }
    };

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await logout();
                    } catch {
                        Alert.alert('Error', 'Failed to log out');
                    }
                },
            },
        ]);
    };
    const renderRightActions = (id: string) => (
        <TouchableOpacity
            onPress={ () => handleDeleteTask(id) }
            style={ styles.deleteSwipe }>
            <Text style={ { color: 'white' } }>Delete</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }: { item: Task }) => (
        <Swipeable renderRightActions={ () => renderRightActions(item._id) }>
            <View style={ [styles.taskItem, isDarkMode && styles.taskItemDark] }>
                <TouchableOpacity
                    onPress={ () => toggleTaskDone(item._id) }
                    style={ { flex: 1 } }
                    accessibilityLabel={ `Mark task ${item.title} as done` }>
                    <Text
                        style={ [
                            styles.taskText,
                            item.completed && {
                                textDecorationLine: 'line-through',
                                color: '#999',
                            },
                            isDarkMode && { color: '#ccc' },
                        ] }>
                        { item.title }
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={ () => handleStartEdit(item) }
                    style={ styles.iconButton }
                    accessibilityLabel={ `Edit task ${item.title}` }>
                    <FontAwesome6
                        name="pen"
                        iconStyle="solid"
                        color={ isDarkMode ? '#ccc' : '#000' }
                    />
                </TouchableOpacity>
            </View>
        </Swipeable>
    );

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    const formatUsername = (email?: string | null) => {
        if (!email) return 'User';
        const raw = email.split('@')[0];
        return raw
            .split(/[._]/)
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ');
    };

    const username = formatUsername(userEmail);

    const greetingColors = [
        '#007AFF', // iOS blue
        '#FF9500', // Orange
        '#34C759', // Green
        '#AF52DE', // Purple
        '#FF2D55', // Pink
        '#5AC8FA', // Sky blue
        '#FFCC00', // Yellow
    ];

    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    return (
        <KeyboardAvoidingView
            behavior={ Platform.OS === 'ios' ? 'padding' : undefined }
            style={ [styles.container, isDarkMode && styles.containerDark] }>
            <Image
                source={ wallpaper }
                style={ {
                    position: 'absolute',
                    width: screenWidth * 1, // 50% of screen width
                    height: screenWidth * 1.5, // maintain square shape
                    top: screenHeight * 0.3, // roughly 30% from top
                    opacity: isDarkMode ? 0.2 : 0.8,
                    zIndex: 0,
                } }
            />
            <View style={ styles.topHeader }>
                <View>
                    <Text style={ [styles.greetingText, isDarkMode && styles.greetingTextDark] }>
                        Hi{ ' ' }
                        <Text
                            style={ [
                                styles.greetingName,
                                { color: nameColor },
                            ] }
                        >
                            { username }
                        </Text>

                    </Text>
                    <Text style={ [styles.header, isDarkMode && styles.headerDark] }>
                        📝 To-do List
                    </Text>
                </View>


                <View style={ { flexDirection: 'row', alignItems: 'center' } }>
                    <TouchableOpacity
                        onPress={ () => setIsDarkMode(prev => !prev) }
                        style={ styles.themeToggle }>
                        <Text style={ { fontSize: 22 } }>
                            { isDarkMode ? (
                                <FontAwesome6
                                    name="lightbulb"
                                    iconStyle="solid"
                                    size={ 22 }
                                    color={ isDarkMode ? '#ccc' : '#000' }
                                />
                            ) : (
                                <FontAwesome6
                                    name="lightbulb"
                                    iconStyle="regular"
                                    size={ 22 }
                                    color={ isDarkMode ? '#ccc' : '#000' }
                                />
                            ) }
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={ handleLogout }
                        style={ { marginLeft: 15 } }
                        accessibilityLabel="Logout">
                        <FontAwesome6
                            name="right-from-bracket"
                            iconStyle="solid"
                            size={ 22 }
                            color={ isDarkMode ? '#ccc' : '#000' }
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={ styles.inputContainer }>
                <TextInput
                    style={ [styles.input, isDarkMode && styles.inputDark] }
                    placeholder="Enter new task"
                    placeholderTextColor={ isDarkMode ? '#aaa' : '#888' }
                    value={ newTask }
                    onChangeText={ setNewTask }
                    onSubmitEditing={ handleAddTask }
                    accessibilityLabel="New task input"
                />
                <TouchableOpacity onPress={ handleAddTask } style={ styles.addButton }>
                    <Text style={ styles.buttonText }>Add</Text>
                </TouchableOpacity>
            </View>

            <View
                style={ {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginVertical: 10,
                } }>
                { ['all', 'active', 'completed'].map(type => (
                    <TouchableOpacity
                        key={ type }
                        onPress={ () => setFilter(type as any) }
                        style={ [
                            styles.filterButton,
                            filter === type && styles.filterButtonActive,
                            isDarkMode && styles.filterButtonDark,
                            isDarkMode && filter === type && styles.filterButtonActiveDark,
                        ] }>
                        <Text
                            style={ [styles.filterText, isDarkMode && styles.filterTextDark] }>
                            { type.charAt(0).toUpperCase() + type.slice(1) }
                        </Text>
                    </TouchableOpacity>
                )) }
            </View>

            { loading ? (
                <ActivityIndicator
                    size="large"
                    color="#fff"
                    style={ { marginTop: 60 } }
                />
            ) : !networkAvailable ? (
                <Text style={ styles.error }>📴 No network connection...</Text>
            ) : (
                <FlatList
                    data={ filteredTasks }
                    renderItem={ renderItem }
                    keyExtractor={ item => item._id }
                    contentContainerStyle={ styles.taskList }
                    refreshing={ refreshing }
                    onRefresh={ onRefresh }
                    ListEmptyComponent={
                        <Text style={ styles.noTasks }>🎉 All tasks completed, Yay!</Text>
                    }
                />
            ) }

            <Modal visible={ !!editingTask } animationType="fade" transparent>
                <View style={ styles.modalContainer }>
                    <View style={ styles.modalContent }>
                        <Text style={ styles.modalTitle }>Edit Task</Text>
                        <TextInput
                            ref={ editInputRef }
                            style={ styles.modalInput }
                            value={ editText }
                            onChangeText={ setEditText }
                            placeholder="Edit your task"
                            accessibilityLabel="Edit task input"
                            onSubmitEditing={ handleConfirmEdit }
                        />
                        <View
                            style={ { flexDirection: 'row', justifyContent: 'space-between' } }>
                            <TouchableOpacity
                                onPress={ () => setEditingTask(null) }
                                style={ styles.button }>
                                <Text style={ styles.buttonText }>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={ handleConfirmEdit }
                                style={ styles.button }>
                                <Text style={ styles.buttonText }>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
};

export default Home;
