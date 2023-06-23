// Function to add a task to the list
function addTask(taskDescription, tasks) {
  const task = {
    description: taskDescription,
    completed: false,
    id: tasks.length,
  };
  tasks.push(task);
}

// Function to remove a task from the list
function removeTask(taskId, tasks) {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
  }
}

// Function to edit the description of a task
function editTaskDescription(taskId, newDescription, tasks) {
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.description = newDescription;
  }
}

// Function to update an item's 'completed' status
function updateTaskStatus(taskId, completed, tasks) {
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.completed = completed;
  }
}

// Function to clear all completed tasks
function clearCompletedTasks(tasks) {
  tasks = tasks.filter((task) => !task.completed);
  return tasks; // Return the filtered tasks array
}
module.exports = {
  addTask,
  removeTask,
  editTaskDescription,
  updateTaskStatus,
  clearCompletedTasks,
};
