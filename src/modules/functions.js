// Function to add a task to the list
function addTask(taskDescription, tasks){
  const task = {
    description: taskDescription,
    completed: false,
    id: tasks.length,
  };
  tasks.push(task);
};

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
};
