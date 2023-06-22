// Import the functions to be tested
const {
  addTask,
  removeTask
} = require('./functions');


describe('addTask', () => {
  let tasks;

  beforeEach(() => {
    tasks = []; // Reset tasks before each test
  });

  test('should add a task to the list', () => {
    const taskDescription = 'Task 1';

    addTask(taskDescription, tasks);

    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toMatchObject({
      description: taskDescription,
      completed: false,
      id: 0,
    });
  });
});

describe('removeTask', () => {
  let tasks;

  beforeEach(() => {
    tasks = [
      { description: 'Task 1', completed: false, id: 0 },
      { description: 'Task 2', completed: true, id: 1 },
      { description: 'Task 3', completed: false, id: 2 },
    ]; // Set up sample tasks before each test
  });

  test('should remove a task from the list', () => {
    const taskId = 1;

    removeTask(taskId, tasks);

    expect(tasks).toHaveLength(2);
    expect(tasks).not.toContainEqual(expect.objectContaining({ id: taskId }));
  });

  test('should not remove any task if the provided taskId is not found', () => {
    const taskId = 1;
    removeTask(taskId, tasks);

    expect(tasks).toHaveLength(tasks.length);
  });
});

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
