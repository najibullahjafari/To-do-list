import './style.css';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
  faPlus,
  faTrashAlt,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faTrashAlt, faArrowAltCircleRight);
dom.watch();
document.addEventListener('DOMContentLoaded', () => {
  const todoList = document.getElementById('todo-list');
  let tasks = [
    { text: 'Task 1', completed: false },
    { text: 'Task 2', completed: false },
    { text: 'Task 3', completed: false },
  ];

  const createTaskItem = (task) => {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;

    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.text;

    const dotsButton = document.createElement('button');
    dotsButton.className = 'task-dots';
    dotsButton.innerHTML = '&#8942;'; // Three dots character

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(dotsButton);

    return taskItem;
  };

  const renderTasks = () => {
    todoList.innerHTML = '';

    tasks.forEach((task) => {
      const taskItem = createTaskItem(task);
      todoList.appendChild(taskItem);
    });
  };

  const toggleTaskCompletion = (event) => {
    const taskItem = event.target.closest('.task-item');
    taskItem.classList.toggle('completed');
  };

  todoList.addEventListener('click', (event) => {
    if (event.target.classList.contains('task-checkbox')) {
      toggleTaskCompletion(event);
    }
  });

  renderTasks();

  const addTask = (taskText) => {
    const task = {
      text: taskText,
      completed: false,
    };
    tasks.push(task);
    const taskItem = createTaskItem(task);
    todoList.appendChild(taskItem);
  };

  const clearTasks = () => {
    tasks = [];
    todoList.innerHTML = '';
  };

  const listForm = document.getElementById('list-form');
  const inputField = document.getElementById('input-field');
  const clearAllBtn = document.querySelector('.clear-all-btn');

  listForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskText = inputField.value.trim();
    if (taskText !== '') {
      addTask(taskText);
      inputField.value = '';
    }
  });

  clearAllBtn.addEventListener('click', () => {
    clearTasks();
  });
});

const taskList = document.getElementById('todo-list');

const moveTaskBelow = (taskElement) => {
  const { nextElementSibling: nextTask } = taskElement;
  if (nextTask) {
    taskList.insertBefore(taskElement, nextTask.nextSibling);
  }
};

const moveTaskAbove = (taskElement) => {
  const { previousElementSibling: previousTask } = taskElement;
  if (previousTask) {
    taskList.insertBefore(taskElement, previousTask);
  }
};

taskList.addEventListener('click', (event) => {
  const { target } = event;
  if (target.classList.contains('task-dots')) {
    const taskElement = target.closest('.task-item');
    if (taskElement) {
      const { action } = target.dataset;
      if (action === 'move-below') {
        moveTaskBelow(taskElement);
      } else if (action === 'move-above') {
        moveTaskAbove(taskElement);
      }
    }
  }
});
