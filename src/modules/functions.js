// Function to add a task to the list
function addTask(taskDescription, tasks){
  const task = {
    description: taskDescription,
    completed: false,
    id: tasks.length,
  };
  tasks.push(task);
};
<<<<<<< HEAD

// Function to remove completed tasks from the list
function removeTask(taskId, tasks){
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (tasks.id !== -1) {
    tasks.splice(taskIndex, 1);
  }
};

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
=======
>>>>>>> 6693f631f42b2c526b88d54d0a1211cd57a9bb95

// Function to remove completed tasks from the list
function removeTask(taskId, tasks){
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (tasks.id !== -1) {
    tasks.splice(taskIndex, 1);
  }
};

module.exports = {
  addTask,
  removeTask,
<<<<<<< HEAD
  editTaskDescription,
  updateTaskStatus,
  clearCompletedTasks,
=======
>>>>>>> 6693f631f42b2c526b88d54d0a1211cd57a9bb95
};
