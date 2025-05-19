import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const FullScreenLoader = () => {
    return (
        <View style={ styles.loaderContainer }>
            <ActivityIndicator size="large" color="#fff" />
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(17, 13, 41, 0.6)', // 60% opacity
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
});

export default FullScreenLoader;
