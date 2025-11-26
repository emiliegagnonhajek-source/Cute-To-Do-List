// DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const dateDisplay = document.getElementById('dateDisplay');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

renderTasks();
updateDate();

// Events
addTaskButton?.addEventListener('click', addTask);
taskInput?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const text = (taskInput?.value || '').trim();
  if (!text) return;
  const task = { id: Date.now(), text, completed: false };
  tasks.push(task);
  saveTasks();
  renderTasks();
  if (taskInput) taskInput.value = '';
}

function renderTasks() {
  if (!taskList) return;
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = `todo-item${task.completed ? ' completed' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(task.id));

    const span = document.createElement('span');
    span.textContent = task.text;

    const delBtn = document.createElement('button');
    delBtn.id = 'delBtn';
    delBtn.className = 'btn btn-delete btn-icon';
    delBtn.setAttribute('aria-label', 'Delete task');
    delBtn.title = 'Delete';
    delBtn.innerHTML = '✖';
    delBtn.addEventListener('click', () => deleteTask(task.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function toggleTask(id) {
  tasks = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Set today's date in the header
function updateDate() {
  if (!dateDisplay) return;
  const now = new Date();
  const formatted = now.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  dateDisplay.textContent = formatted;
}
