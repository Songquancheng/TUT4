// Get elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskDisplay = document.getElementById('task-display'); // New

// Load tasks from Local Storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task event
taskForm.addEventListener('submit', addTask);

// Remove task event
taskList.addEventListener('click', removeTask);

// Load tasks from Local Storage
function loadTasks() {
    let tasks = getTasksFromLocalStorage();

    tasks.forEach(task => {
        createTaskElement(task);
    });
}

// Add task
function addTask(e) {
    e.preventDefault();
    
    const task = taskInput.value;
    
    if (task === '') return;

    createTaskElement(task);
    displayTask(task);  // Display task below the button

    // Store in Local Storage
    storeTaskInLocalStorage(task);

    taskInput.value = '';
}

// Create task element
function createTaskElement(task) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(task));

    const deleteBtn = document.createElement('button');
    deleteBtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

// Display task below the button
function displayTask(task) {
    const taskParagraph = document.createElement('p');
    taskParagraph.textContent = `Task Added: ${task}`;
    taskDisplay.appendChild(taskParagraph);
}

// Store task in Local Storage
function storeTaskInLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
    if (e.target.tagName === 'BUTTON') {
        const li = e.target.parentElement;
        taskList.removeChild(li);

        // Remove from Local Storage
        removeTaskFromLocalStorage(li.firstChild.textContent);
    }
}

// Remove task from Local Storage
function removeTaskFromLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from Local Storage
function getTasksFromLocalStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}
