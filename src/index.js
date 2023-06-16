import './style.css';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
  faPlus,
  faTrashAlt,
  faArrowAltCircleRight,
  faEdit,
  faSave,
  faCheck,
  faTrash,
  faSort,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faPlus,
  faTrashAlt,
  faArrowAltCircleRight,
  faEdit,
  faSave,
  faCheck,
  faTrash,
  faSort,
);
dom.watch();

document.addEventListener('DOMContentLoaded', () => {
  const todoList = document.getElementById('todo-list');
  let tasks = [];

  const getTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      tasks = JSON.parse(storedTasks);
    }
  };

  const saveTasksToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const createTaskItem = (task) => {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.setAttribute('draggable', 'true');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;

    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.description;

    const editButton = document.createElement('button');
    editButton.className = 'task-edit';
    editButton.innerHTML = '<i class="fas fa-edit"></i>';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'task-delete';
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    // Add event listener for the edit button
    editButton.addEventListener('click', () => {
      const textField = document.createElement('input');
      textField.type = 'text';
      textField.className = 'edit-text-field';
      textField.value = task.description;

      // Replace the taskText element with the textField
      taskItem.replaceChild(textField, taskText);

      // Disable the edit button while editing
      editButton.disabled = true;

      // Focus on the textField
      textField.focus();

      // Event listener for the Enter key to save the edited task
      textField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          const newDescription = textField.value.trim();
          if (newDescription !== '') {
            task.description = newDescription;
            renderTasks();
            saveTasksToLocalStorage();
          }
          textField.removeEventListener('keydown', null);
          editButton.disabled = false;
        }
      });

      // Event listener for the Esc key to cancel editing
      textField.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          taskItem.replaceChild(taskText, textField);
          textField.removeEventListener('keydown', null);
          editButton.disabled = false;
        }
      });
    });

    // Add event listener for the delete button
    deleteButton.addEventListener('click', () => {
      const taskIndex = tasks.indexOf(task);
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        updateTaskIndexes();
        renderTasks();
        saveTasksToLocalStorage();
      }
    });
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      if (task.completed) {
        taskText.classList.add('completed');
      } else {
        taskText.classList.remove('completed');
      }
      saveTasksToLocalStorage();
    });
    return taskItem;
  };

  const renderTasks = () => {
    todoList.innerHTML = '';

    tasks.forEach((task, index) => {
      task.index = index;
      const taskItem = createTaskItem(task);
      todoList.appendChild(taskItem);
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
    saveTasksToLocalStorage();
  };

  const removeCompletedTasks = () => {
    tasks = tasks.filter((task) => !task.completed);
    updateTaskIndexes();
    renderTasks();
    saveTasksToLocalStorage();
  };

  const reorderTask = (fromIndex, toIndex) => {
    const [task] = tasks.splice(fromIndex, 1);
    tasks.splice(toIndex, 0, task);
    updateTaskIndexes();
    renderTasks();
    saveTasksToLocalStorage();
  };

  const toggleTaskCompletion = (event) => {
    const taskItem = event.target.closest('.task-item');
    const taskIndex = Array.from(todoList.children).indexOf(taskItem);
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveTasksToLocalStorage();
  };

  const updateTaskIndexes = () => {
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

  const clearAllBtn = document.querySelector('.clear-all-btn');
  clearAllBtn.addEventListener('click', removeCompletedTasks);

  const listForm = document.getElementById('list-form');
  const inputField = document.getElementById('input-field');

  listForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskDescription = inputField.value.trim();
    if (taskDescription !== '') {
      addTask(taskDescription);
      inputField.value = '';
    }
  });

  getTasksFromLocalStorage();
  renderTasks();
});
