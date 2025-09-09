// State
let todos = [];
let nextId = 1;

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
    li.dataset.id = String(todo.id);

    // چک‌باکس
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "toggle";
    checkbox.checked = todo.completed === true;

    // متن تسک
    const titleSpan = document.createElement("span");
    titleSpan.textContent = todo.title;

    // دکمه حذف
    const delBtn = document.createElement("button");
    delBtn.className = "btn-delete";
    delBtn.textContent = "Delete";

    // بچسباندن به li
    li.append(checkbox, titleSpan, delBtn);

    // اگر completed بود کلاس بده
    if (todo.completed) {
      li.classList.add("completed");
    } else {
      li.classList.remove("completed");
    }

    todoList.appendChild(li);
  }
}

// Initial render
render();

// Add new todo
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = todoInput.value.trim();
  if (!title) {
    error.hidden = false;
    return;
  }

  error.hidden = true;

  const newTodo = { id: nextId++, title, completed: false };
  todos.push(newTodo);

  todoInput.value = "";
  render();
});

// Delete (event delegation)
todoList.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-delete");
  if (!btn) return;

  const li = btn.closest("li");
  const id = li?.dataset.id;
  if (!id) return;

  todos = todos.filter((t) => String(t.id) !== id);
  render();
});

// Toggle completed (event delegation)
todoList.addEventListener("change", (e) => {
  const checkbox = e.target.closest(".toggle");
  if (!checkbox) return;

  const li = checkbox.closest("li");
  const id = li?.dataset.id;
  if (!id) return;

  // آیتم مورد نظر رو پیدا کن
  const todo = todos.find((t) => String(t.id) === id);
  if (!todo) return;

  // وضعیت completed رو برعکس کن
  todo.completed = !todo.completed;
  render();
});
