/* eslint-disable no-use-before-define */

import './style.css';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
  faPlus,
  faTrashAlt,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faTrashAlt, faArrowAltCircleRight);
dom.watch();

const tasks = [
  { description: 'memo 1', completed: false, index: 1 },
  { description: 'memo 2', completed: true, index: 2 },
  { description: 'memo 3', completed: false, index: 3 },
];

document.addEventListener('DOMContentLoaded', () => {
  const todoListElement = document.getElementById('todo-list');
  todoListElement.innerHTML = '';

  const listHeader = createListHeader();
  todoListElement.appendChild(listHeader);

  const addTaskField = createAddTaskField();
  todoListElement.appendChild(addTaskField);

  tasks.forEach((task) => {
    const listItem = createTaskListItem(task);
    todoListElement.appendChild(listItem);
  });

  const clearButton = createClearButton();
  todoListElement.appendChild(clearButton);
});

const createListHeader = () => {
  const header = document.createElement('label');
  header.textContent = "Today's To Do";
  header.classList.add('list-header');
  return header;
};

const createAddTaskField = () => {
  const addTaskField = document.createElement('div');
  addTaskField.classList.add('input-group', 'mb-3');

  const textField = document.createElement('input');
  textField.type = 'text';
  textField.placeholder = 'Add a task...';
  textField.classList.add('form-control');
  textField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  });

  const enterIcon = document.createElement('span');
  enterIcon.classList.add('input-group-text', 'enter-icon');
  enterIcon.innerHTML = '<i class="fas fa-arrow-alt-circle-right"></i>';

  addTaskField.appendChild(textField);
  addTaskField.appendChild(enterIcon);

  return addTaskField;
};

const createTaskListItem = (task) => {
  const listItem = document.createElement('li');
  listItem.classList.add(
    'list-group-item',
    'd-flex',
    'align-items-center',
    'task-item',
  );

  const checkbox = createCheckbox(task);
  const description = createDescription(task);
  const removeButton = createRemoveButton(task);

  listItem.appendChild(checkbox);
  listItem.appendChild(description);
  listItem.appendChild(removeButton);

  return listItem;
};

const createCheckbox = (task) => {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.classList.add('form-check-input', 'me-2');
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    updateTodoList();
  });

  return checkbox;
};

const createDescription = (task) => {
  const description = document.createElement('span');
  description.textContent = task.description;
  description.classList.add('task-description');
  if (task.completed) {
    description.classList.add('completed');
  }

  return description;
};

const createRemoveButton = (task) => {
  const removeButton = document.createElement('button');
  removeButton.classList.add('btn', 'ms-auto', 'remove-button');
  removeButton.addEventListener('click', () => {
    const index = tasks.findIndex((t) => t.index === task.index);
    tasks.splice(index, 1);
    updateTodoList();
  });

  const removeButtonIcon = document.createElement('span');
  removeButtonIcon.innerHTML = '<i class="fas fa-trash-alt"></i>';

  removeButton.appendChild(removeButtonIcon);

  return removeButton;
};

const createClearButton = () => {
  const clearButton = document.createElement('button');
  clearButton.textContent = 'Clear All Tasks';
  clearButton.classList.add('btn', 'btn-danger', 'mt-3', 'clear-button');
  clearButton.addEventListener('click', () => {
    tasks.length = 0;
    updateTodoList();
  });

  return clearButton;
};

const updateTodoList = () => {
  const todoListElement = document.getElementById('todo-list');
  todoListElement.innerHTML = '';

  const listHeader = createListHeader();
  todoListElement.appendChild(listHeader);

  const addTaskField = createAddTaskField();
  todoListElement.appendChild(addTaskField);

  tasks.forEach((task) => {
    const listItem = createTaskListItem(task);
    todoListElement.appendChild(listItem);
  });

  const clearButton = createClearButton();
  todoListElement.appendChild(clearButton);
};

const handleAddTask = () => {
  const inputField = document.querySelector('.form-control');
  const description = inputField.value;
  if (description.trim() !== '') {
    const newTask = {
      description,
      completed: false,
      index: tasks.length + 1,
    };
    tasks.push(newTask);
    inputField.value = '';
    updateTodoList();
  }
};
