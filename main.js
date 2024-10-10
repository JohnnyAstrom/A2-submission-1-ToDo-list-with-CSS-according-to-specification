// Array to store tasks
let tasks = [];

// Select HTML elements
const taskInput = document.querySelector('.task-input');
const addTaskButton = document.querySelector('.add-task-button');
const taskList = document.querySelector('.task-list');
const completedCount = document.querySelector('.span-completed-count');
const errorMessage = document.querySelector('.error-message');

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) {
    errorMessage.classList.add('error-active');
    errorMessage.textContent = "Input must not be empty";
    return;
  }
  errorMessage.textContent = '';
  errorMessage.classList.remove('error-active');

  const newTask = {
    text: taskText,
    completed: false
  };
  tasks.push(newTask);
  taskInput.value = '';

  const newListItem = createListItem(newTask, tasks.length - 1);
  newListItem.classList.add('new');
  taskList.appendChild(newListItem);

  updateCompletedCount();
}

// Function to create and return a new list item
function createListItem(task, index) {
  const li = document.createElement('li');
  li.classList.add('task-item');
  li.textContent = task.text;

  // Check if the task is completed and add the appropriate class
  if (task.completed) {
    li.classList.add('completed');
  }

  // Mark task as completed
  li.addEventListener('click', function () {
    task.completed = !task.completed;

    // Update the list item class based on completion status
    li.classList.toggle('completed');

    updateCompletedCount();
  });

  // Remove task
  const removeButton = document.createElement('button');
  removeButton.textContent = '';
  removeButton.classList.add('remove-button');
  removeButton.addEventListener('click', function (event) {
    event.stopPropagation();
    tasks.splice(index, 1);
    li.remove();
    updateCompletedCount();
  });

  li.appendChild(removeButton);

  return li;
}

// Function to render the task list
function renderList() {
  taskList.innerHTML = '';
  tasks.forEach(function (task, index) {
    const listItem = createListItem(task, index);
    taskList.appendChild(listItem);
  });
}

// Function to update the completed task count
function updateCompletedCount() {
  let completedTasks = tasks.filter(function (task) {
    return task.completed;
  }).length;

  completedCount.textContent = completedTasks;
}

// Function to update the UI
function updateUI() {
  renderList();
  updateCompletedCount();
}

// Initialize the app
function initialize() {
  updateUI();

  addTaskButton.addEventListener('click', addTask);
}

initialize();