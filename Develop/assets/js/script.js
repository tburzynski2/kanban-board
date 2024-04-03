// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

function loadFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return tasks;
}

function saveToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Todo: create a function to generate a unique task id
function generateTaskId() {
  // Based on Stack Overflow thread: https://stackoverflow.com/questions/3231459/how-can-i-create-unique-ids-with-javascript
  // Return current datetime string concatenated w/ integer portion of Math.random() string
  return Date.now().toString() + Math.random().toString().substring(2);
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const taskId = generateTaskId();
  const card = $(`
    <div class="card draggable" data-id="${taskId}" data-status="${task.status}">
      <div class="card-body">
        <h5 class="card-title">${task.name}</h5>
        <p class="card-text">Due: ${task.dueDate}</p>
        <p class="card-text">Description:
        ${task.description}</p>
        <button class="btn btn-danger delete-card">Delete</button>
      </div>
    </div>
  `);
  return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});
