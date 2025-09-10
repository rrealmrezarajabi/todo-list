let todos = [];
let nextId = 1;

const STORAGE_KEY = "todos-v1";

// Save
function save() {
  const data = { todos, nextId };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Load
function load() {
  const json = localStorage.getItem(STORAGE_KEY);
  if (!json) return;
  const data = JSON.parse(json);
  todos = data.todos;
  nextId = data.nextId;
}

// DOM
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const error = document.getElementById("error");
const todoList = document.getElementById("todo-list");

// Render
function render() {
  todoList.innerHTML = "";
  for (const todo of todos) {
    const li = document.createElement("li");
    li.dataset.id = todo.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "toggle";
    checkbox.checked = todo.completed;

    const span = document.createElement("span");
    span.textContent = todo.title;

    const btn = document.createElement("button");
    btn.className = "btn-delete";
    btn.textContent = "Delete";

    if (todo.completed) li.classList.add("completed");

    li.append(checkbox, span, btn);
    todoList.appendChild(li);
  }
}

// Init
load();
render();

// Add
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = todoInput.value.trim();
  if (!title) {
    error.hidden = false;
    return;
  }
  error.hidden = true;

  todos.push({ id: nextId++, title, completed: false });
  todoInput.value = "";
  render();
  save();
});

// Delete
todoList.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn-delete")) return;
  const li = e.target.closest("li");
  todos = todos.filter((t) => t.id != li.dataset.id);
  render();
  save();
});

// Toggle
todoList.addEventListener("change", (e) => {
  if (!e.target.classList.contains("toggle")) return;
  const li = e.target.closest("li");
  const todo = todos.find((t) => t.id == li.dataset.id);
  todo.completed = e.target.checked;
  render();
  save();
});
