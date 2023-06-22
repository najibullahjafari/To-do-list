// Import the functions to be tested
const {
  editTaskDescription,
  updateTaskStatus,
  clearCompletedTasks,
} = require('./functions');

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();
global.localStorage = localStorageMock;

describe('Task Functions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('editTaskDescription', () => {
    test('should edit the task description', () => {
      // Create a sample task
      const task = { id: 1, description: 'Task 1', completed: false };
      localStorage.setItem('tasks', JSON.stringify([task]));

      // Edit the task description
      const updatedTask = editTaskDescription(1, 'Updated Task 1');

      // Verify the task description is updated
      expect(updatedTask).toEqual({
        id: 1,
        description: 'Updated Task 1',
        completed: false,
      });

      // Verify the task is updated in the localStorage
      const storedTasks = JSON.parse(localStorage.getItem('tasks'));
      expect(storedTasks[0].description).toBe('Updated Task 1');
    });

    test('should return null if task does not exist', () => {
      const updatedTask = editTaskDescription(1, 'Updated Task 1');
      expect(updatedTask).toBeNull();
    });
  });

  describe('updateTaskStatus', () => {
    test('should update the task status', () => {
      // Create a sample task
      const task = { id: 1, description: 'Task 1', completed: false };
      localStorage.setItem('tasks', JSON.stringify([task]));

      // Update the task status
      const updatedTask = updateTaskStatus(1, true);

      // Verify the task status is updated
      expect(updatedTask).toEqual({
        id: 1,
        description: 'Task 1',
        completed: true,
      });

      // Verify the task is updated in the localStorage
      const storedTasks = JSON.parse(localStorage.getItem('tasks'));
      expect(storedTasks[0].completed).toBe(true);
    });

    test('should return null if task does not exist', () => {
      const updatedTask = updateTaskStatus(1, true);
      expect(updatedTask).toBeNull();
    });
  });

      // Verify completed tasks are removed from the localStorage
      const storedTasks = JSON.parse(localStorage.getItem('tasks'));
      expect(storedTasks.length).toBe(2);
      expect(storedTasks.some((task) => task.completed)).toBe(false);
    });
