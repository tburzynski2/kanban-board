// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Grab references to the important DOM elements
const swimLanesContainerEl = $(".swim-lanes");
const taskNameInputEl = $("#task-title");
const taskDueDateInputEl = $("#task-due-date");
const taskDescriptionInputEl = $("#task-description");
const submitButtonEl = $("#submit-button");

// Save list lane elements to variables
const todoListEl = $("#todo-cards");
const inProgressListEl = $("#in-progress-cards");
const doneListEl = $("#done-cards");

// Todo: create a function to generate a unique task id
function generateTaskId() {
  // Based on Stack Overflow thread: https://stackoverflow.com/questions/3231459/how-can-i-create-unique-ids-with-javascript
  // Return current datetime string concatenated w/ integer portion of Math.random() string
  return Date.now().toString() + Math.random().toString().substring(2);
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const card = $(`
    <div class="card draggable" data-id="${task.id}" data-status="${task.status}">
      <div class="card-body">
        <h5 class="card-title">${task.name}</h5>
        <p class="card-text">Due: ${task.dueDate}</p>
        <p class="card-text">Description:
        ${task.description}</p>
        <button class="btn btn-danger delete-card">Delete</button>
      </div>
    </div>
  `);

  // Determine if the card should be colored to indicate an upcoming or overdue due date
  const now = dayjs();
  const dueDate = dayjs(task.dueDate);

  console.log(
    `Now: ${now}\nDue date: ${dueDate}\nDifference: ${now.diff(dueDate, "day")}`
  );

  if (task.status !== "done" && now.diff(dueDate, "day") > 0) {
    card.addClass("overdue");
    console.log("assigning class overdue");
  } else if (task.status !== "done" && now.diff(dueDate, "day") > -2) {
    card.addClass("due");
    console.log("assigning class due");
  }

  return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  todoListEl.html("");
  inProgressListEl.html("");
  doneListEl.html("");

  for (const task of taskList) {
    // Create card
    const cardEl = createTaskCard(task);

    // Append to appropriate list
    if (task.status === "todo") {
      todoListEl.append(cardEl);
    } else if (task.status === "in-progress") {
      inProgressListEl.append(cardEl);
    } else {
      doneListEl.append(cardEl);
    }
  }

  // Make draggable
  $(".draggable").draggable({
    stack: ".swim-lanes",
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(e) {
  e.preventDefault();

  // Get form field values
  const taskId = generateTaskId();
  const taskName = taskNameInputEl.val();
  const taskDueDate = taskDueDateInputEl.val();
  const taskDescription = taskDescriptionInputEl.val();

  // Reset form fields
  taskNameInputEl.val("");
  taskDueDateInputEl.val("");
  taskDescriptionInputEl.val("");

  // New task data
  const newTask = {
    id: taskId,
    name: taskName,
    dueDate: taskDueDate,
    description: taskDescription,
    status: "todo",
  };

  // Add new task to the list of tasks
  taskList.push(newTask);

  // Save cards to localstorage
  localStorage.setItem("tasks", JSON.stringify(taskList));

  renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  // Get id of the card
  const cardId = $(event.target).closest(".card").data("id");
  const tasksToKeep = [];

  console.log(`ID to delete: ${cardId}`);

  // Loop through them
  for (const task of taskList) {
    if (cardId !== task.id) {
      tasksToKeep.push(task);
    }
  }

  // Setting task list array to "tasks to keep" array
  taskList = tasksToKeep;

  // Re-save projects in localStorage
  localStorage.setItem("tasks", JSON.stringify(tasksToKeep));

  // Re-render cards in lists
  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  console.log("event");
  const targetListId = event.target.id.replace("-cards", "");
  console.log(targetListId);
  console.log(ui);

  const card = ui.draggable[0];
  const taskId = $(card).data("id");

  for (const task of taskList) {
    // Find object in savedProject with same id
    if (task.id === taskId) {
      // Update it's status to the target swim-lane's ID
      task.status = targetListId;
    }
  }

  // Re-save updated projectData list
  localStorage.setItem("tasks", JSON.stringify(taskList));

  // Re-render the cards
  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  // Apply dateppicker UI to Task Due Date input
  $(function () {
    taskDueDateInputEl.datepicker();
  });

  // Handle adding tasks when a user clicks submit
  submitButtonEl.on("click", handleAddTask);

  // Render cards to list
  renderTaskList();

  // Make each list droppable
  $(".swim-lane").droppable({
    drop: handleDrop,
  });

  // Event delegation with delete button
  swimLanesContainerEl.on("click", ".delete-card", handleDeleteTask);
});
