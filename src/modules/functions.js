// Function for editing 
function editTaskDescription(taskId, newDescription) {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.description = newDescription;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return task;
  }
  return null;
}

// Function for updating 
function updateTaskStatus(taskId, newStatus) {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.completed = newStatus;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return task;
  }
  return null;
}

// Function for clearing completed taskss
function clearCompletedTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const filteredTasks = tasks.filter((task) => !task.completed);
  localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}

module.exports = {
  editTaskDescription,
  updateTaskStatus,
  clearCompletedTasks,
};
