import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    padding: 20,
    paddingTop: 40,
  },
  containerDark: {
    backgroundColor: '#110d29',
  },

  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2e2e2e',
    marginBottom: 20,
  },
  headerDark: {
    color: '#fff',
  },

  inputContainer: {
    flexDirection: 'row',
    marginBottom: 1,
    gap: 12,
  },

  // New input container for add task row with background and rounding
  newTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  newTaskContainerDark: {
    backgroundColor: '#333',
  },

  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 2,
  },
  inputDark: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderColor: '#333',
  },

  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000',
  },
  textInputDark: {
    backgroundColor: '#444',
    color: '#ccc',
  },

  addButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  button: {
    backgroundColor: '#110d29',
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  taskList: {
    paddingBottom: 100,
  },

  taskItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderColor: '#eee',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskItemDark: {
    backgroundColor: '#1c1c1c',
    borderColor: '#333',
  },

  taskText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  taskTitleCompletedDark: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  taskTitleDark: {
    color: '#ccc',
  },

  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 10,
  },
  iconButton: {
    paddingHorizontal: 6,
    paddingVertical: 4,
  },

  noTasks: {
    marginTop: 20,
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
  },

  error: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },

  // Repeat interval badge on tasks
  repeatBadge: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginLeft: 8,
  },
  repeatBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },

  // Timer text on task items
  timerText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#007BFF',
    fontWeight: '600',
  },

  // Modal styling
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
  },
  modalContainerDark: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  modalContentDark: {
    backgroundColor: '#222',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
    textAlign: 'center',
  },
  modalTitleDark: {
    color: '#eee',
  },
  modalInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  modalInputDark: {
    backgroundColor: '#333',
    borderColor: '#555',
    color: '#eee',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButtonCancel: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingVertical: 14,
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
  },
  modalButtonCancelDark: {
    backgroundColor: '#555',
  },
  modalButtonUpdate: {
    flex: 1,
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    borderRadius: 12,
    marginLeft: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },

  // Delete swipe button style
  deleteSwipe: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  // Filter buttons and states (light/dark)
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#ddd',
    borderRadius: 6,
  },
  filterButtonActive: {
    backgroundColor: '#007BFF',
  },
  filterButtonDark: {
    backgroundColor: '#444',
  },
  filterButtonActiveDark: {
    backgroundColor: '#3399ff',
  },
  filterText: {
    color: '#000',
    fontWeight: '600',
  },
  filterTextDark: {
    color: '#fff',
  },

  themeToggle: {
    padding: 10,
  },

  // Auth and greeting styles (unchanged from your original)
  input_auth: {
    height: 52,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderColor: '#e0e0e0',
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
    color: '#333',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
    margin: 6,
  },
  greetingName: {
    fontWeight: '700',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 4,
  },
  greetingText: {
    fontSize: 22,
    fontStyle: 'italic',
    fontWeight: '600',
    marginBottom: 8,
    color: '#222',
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  greetingTextDark: {
    color: '#eee',
    textShadowColor: 'rgba(255,255,255,0.1)',
  },

  authContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  authContainerDark: {
    backgroundColor: '#0d1021',
  },
  authCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 16,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  authCardDark: {
    backgroundColor: '#1c1c2e',
  },
  authHeader: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1a1a1a',
    marginBottom: 20,
  },
  authHeaderDark: {
    color: '#fff',
  },
  switchAuthText: {
    textAlign: 'center',
    marginTop: 36,
    color: '#007BFF',
    fontWeight: '600',
  },
   gradientButton: {
  paddingVertical: 12,
  paddingHorizontal: 25,
  borderRadius: 25,
  alignItems: 'center',
  justifyContent: 'center',
},
});

export default styles;
