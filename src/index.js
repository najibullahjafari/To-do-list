/* eslint-disable no-use-before-define */

import './style.css';

const tasks = [
  { description: 'memo 1', completed: false, index: 1 },
  { description: 'memo 2', completed: true, index: 2 },
  { description: 'memo 3', completed: false, index: 3 },
];

document.addEventListener('DOMContentLoaded', () => {
  const todoListElement = document.getElementById('todo-list');
  todoListElement.innerHTML = '';

  tasks.forEach((task) => {
    const listItem = createTaskListItem(task);
    todoListElement.appendChild(listItem);
  });
});

const createCheckbox = (task) => {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
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
  removeButton.textContent = 'Remove';
  removeButton.classList.add('remove-button');
  removeButton.addEventListener('click', () => {
    const index = tasks.findIndex((t) => t.index === task.index);
    tasks.splice(index, 1);
    updateTodoList();
  });

  return removeButton;
};

const createTaskListItem = (task) => {
  const listItem = document.createElement('li');
  listItem.classList.add('task-item');

  const checkbox = createCheckbox(task);
  const description = createDescription(task);
  const removeButton = createRemoveButton(task);

  listItem.appendChild(checkbox);
  listItem.appendChild(description);
  listItem.appendChild(removeButton);

  return listItem;
};

const updateTodoList = () => {
  const todoListElement = document.getElementById('todo-list');
  todoListElement.innerHTML = '';

  tasks.forEach((task) => {
    const listItem = createTaskListItem(task);
    todoListElement.appendChild(listItem);
  });
};
