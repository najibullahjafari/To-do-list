// Import the functions to be tested
const {
  addTask,
  removeTask,
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

describe('addTask', () => {
  let tasks;

  beforeEach(() => {
    tasks = [];
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
    ];
  });

  test('should remove a task from the list', () => {
    const taskId = 1;

    removeTask(taskId, tasks);

    expect(tasks).toHaveLength(2);
    expect(tasks).not.toContainEqual(expect.objectContaining({ id: taskId }));
  });

  test('should not remove any task if the provided taskId is not found', () => {
    const taskId = 3;

    removeTask(taskId, tasks);

    expect(tasks).toHaveLength(tasks.length);
  });
});

describe('editTaskDescription', () => {
  let tasks;

  beforeEach(() => {
    tasks = [
      { description: 'Task 1', completed: false, id: 0 },
      { description: 'Task 2', completed: true, id: 1 },
      { description: 'Task 3', completed: false, id: 2 },
    ];
  });

  test('should edit the description of a task', () => {
    const taskId = 1;
    const newDescription = 'Updated Task 2';

    editTaskDescription(taskId, newDescription, tasks);

    expect(tasks[taskId].description).toBe(newDescription);
  });

  test('should not edit the description if the provided taskId is not found', () => {
    const taskId = 3;
    const newDescription = 'New Task';

    editTaskDescription(taskId, newDescription, tasks);

    expect(tasks[taskId]).toBeUndefined();
  });
});

describe('updateTaskStatus', () => {
  let tasks;

  beforeEach(() => {
    tasks = [
      { description: 'Task 1', completed: false, id: 0 },
      { description: 'Task 2', completed: true, id: 1 },
      { description: 'Task 3', completed: false, id: 2 },
    ];
  });

  test('should update the status of a task to completed', () => {
    const taskId = 0;

    updateTaskStatus(taskId, true, tasks);

    expect(tasks[taskId].completed).toBe(true);
  });

  test('should update the status of a task to not completed', () => {
    const taskId = 1;

    updateTaskStatus(taskId, false, tasks);

    expect(tasks[taskId].completed).toBe(false);
  });

  test('should not update the status if the provided taskId is not found', () => {
    const taskId = 3;

    updateTaskStatus(taskId, true, tasks);

    expect(tasks[taskId]).toBeUndefined();
  });
});
test('should remove all completed tasks from the list', () => {
  const initialTasks = [
    { description: 'Task 1', completed: false, id: 0 },
    { description: 'Task 2', completed: true, id: 1 },
    { description: 'Task 3', completed: true, id: 2 },
  ];

  const expectedTasks = [
    { description: 'Task 1', completed: false, id: 0 },
  ];

  const result = clearCompletedTasks([...initialTasks]);

  expect(result).toHaveLength(expectedTasks.length);
  expect(result).toEqual(expect.arrayContaining(expectedTasks));
});
