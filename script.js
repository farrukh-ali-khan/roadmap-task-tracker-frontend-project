// Our task list array: each item is an object { description, completed }
let tasks = [];

const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

// Render tasks to the DOM
function renderTasks() {
  taskList.innerHTML = "";

  // Sort tasks: incomplete first, completed last
  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);
  const orderedTasks = [...pendingTasks, ...completedTasks];

  orderedTasks.forEach((task) => {
    // Find the index of this task in the main tasks array
    const realIndex = tasks.indexOf(task);

    // Create list item
    const li = document.createElement("li");

    // Left side: checkbox and text
    const leftDiv = document.createElement("div");
    leftDiv.className = "task-left";

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      tasks[realIndex].completed = !tasks[realIndex].completed;
      renderTasks();
    });

    // Task description
    const span = document.createElement("span");
    span.textContent = task.description;
    span.className = "task-desc";
    if (task.completed) {
      span.classList.add("completed");
    }

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "&times;"; // Multiplication sign or X
    deleteBtn.addEventListener("click", () => {
      tasks.splice(realIndex, 1);
      renderTasks();
    });

    li.appendChild(leftDiv);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

// Add a new task from input
function addTask() {
  const description = taskInput.value.trim();
  if (description) {
    tasks.push({ description, completed: false });
    taskInput.value = "";
    renderTasks();
  }
}

// Add task on button click
addTaskBtn.addEventListener("click", addTask);

// Add task on Enter key press
taskInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
