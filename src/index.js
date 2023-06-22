import './style.css';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
  faPlus as a,
  faTrashAlt as b,
  faArrowAltCircleRight as c,
  faEdit as d,
  faSave as e,
  faCheck as f,
  faTrash as g,
  faSort as h,
} from '@fortawesome/free-solid-svg-icons';
import updateStatus from './modules/statusUpdates.js';

library.add(a, b, c, d, e, f, g, h);
dom.watch();

document.addEventListener('DOMContentLoaded', () => {
  const todoList = document.getElementById('todo-list');
  let tasks = [];

  const fetchTasks = () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      tasks = JSON.parse(storedTasks);
    }
  };

  const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const createItem = (task) => {
    const item = document.createElement('li');
    item.className = 'task-item';
    item.setAttribute('draggable', 'true');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;

    const text = document.createElement('span');
    text.className = 'task-text';
    text.textContent = task.description;

    const editBtn = document.createElement('button');
    editBtn.className = 'task-edit';
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'task-delete';
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';

    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(editBtn);
    item.appendChild(deleteBtn);

    // Add event listener for the edit button
    editBtn.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'edit-text-field';
      input.value = task.description;

      // Replace the text element with the input
      item.replaceChild(input, text);

      // Disable the edit button while editing
      editBtn.disabled = true;

      // Focus on the input field
      input.focus();

      // Event listener for the Enter key to save the edited task
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          const newDescription = input.value.trim();
          if (newDescription !== '') {
            task.description = newDescription;
            renderTasks();
            saveTasks();
          }
          input.removeEventListener('keydown', null);
          editBtn.disabled = false;
        }
      });

      // Event listener for the Esc key to cancel editing
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          item.replaceChild(text, input);
          input.removeEventListener('keydown', null);
          editBtn.disabled = false;
        }
      });
    });

    // Add event listener for the delete button
    deleteBtn.addEventListener('click', () => {
      const taskIndex = tasks.indexOf(task);
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        updateIndexes();
        renderTasks();
        saveTasks();
      }
    });

    checkbox.addEventListener('change', () => {
      updateStatus(task, checkbox.checked);
      saveTasks();
    });

    return item;
  };

  const renderTasks = () => {
    todoList.innerHTML = '';

    tasks.forEach((task, index) => {
      task.index = index;
      const item = createItem(task);
      todoList.appendChild(item);
    });
  };

  const addTask = (taskDescription) => {
    const task = {
      description: taskDescription,
      completed: false,
      index: tasks.length,
    };
    tasks.push(task);
    renderTasks();
    saveTasks();
  };

  const removeCompletedTasks = () => {
    tasks = tasks.filter((task) => !task.completed);
    updateIndexes();
    renderTasks();
    saveTasks();
  };

  const reorderTask = (fromIndex, toIndex) => {
    const [task] = tasks.splice(fromIndex, 1);
    tasks.splice(toIndex, 0, task);
    updateIndexes();
    renderTasks();
    saveTasks();
  };

  const toggleTaskCompletion = (event) => {
    const item = event.target.closest('.task-item');
    const taskIndex = Array.from(todoList.children).indexOf(item);
    tasks[taskIndex].completed = !tasks[taskIndex].completed;

    const text = item.querySelector('.task-text');
    if (tasks[taskIndex].completed) {
      text.classList.add('completed');
    } else {
      text.classList.remove('completed');
    }

    saveTasks();
  };

  const updateIndexes = () => {
    tasks.forEach((task, index) => {
      task.index = index;
    });
  };

  todoList.addEventListener('click', (event) => {
    if (event.target.classList.contains('task-checkbox')) {
      toggleTaskCompletion(event);
    }
  });

  todoList.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.target.classList.add('dragging');
  });

  todoList.addEventListener('dragover', (event) => {
    event.preventDefault();
    const draggableTask = document.querySelector('.dragging');
    const overTask = event.target.closest('.task-item');
    if (draggableTask && overTask && draggableTask !== overTask) {
      const fromIndex = Array.from(todoList.children).indexOf(draggableTask);
      const toIndex = Array.from(todoList.children).indexOf(overTask);
      reorderTask(fromIndex, toIndex);
    }
  });

  todoList.addEventListener('dragend', () => {
    const draggableTask = document.querySelector('.dragging');
    if (draggableTask) {
      draggableTask.classList.remove('dragging');
    }
  });

  const clearBtn = document.querySelector('.clear-all-btn');
  clearBtn.addEventListener('click', removeCompletedTasks);

  const form = document.getElementById('list-form');
  const input = document.getElementById('input-field');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskDescription = input.value.trim();
    if (taskDescription !== '') {
      addTask(taskDescription);
      input.value = '';
    }
  });

  fetchTasks();
  renderTasks();
});
