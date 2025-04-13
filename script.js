// Select DOM Elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clear-completed-btn');

// --- Global Variables ---
let tasks = []; // Array to hold our task objects
let currentFilter = 'all'; // Keep track of the current filter

// --- Event Listeners ---

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task event
taskForm.addEventListener('submit', handleAddTask);

// Handle clicks on task list (for complete/delete) - Event Delegation
taskList.addEventListener('click', handleTaskClick);

// Handle filter button clicks
filterBtns.forEach(btn => {
    btn.addEventListener('click', handleFilterClick);
});

// Handle clear completed button click
clearCompletedBtn.addEventListener('click', clearCompletedTasks);


// --- Placeholder Functions (We will fill these in) ---

function handleAddTask(event) {
    event.preventDefault(); // Prevent page reload on form submit
    console.log("Add task logic here");
}

function handleTaskClick(event) {
     console.log("Task interaction logic here (complete/delete)");
}

function handleFilterClick(event) {
    console.log("Filter logic here");
}

function loadTasks() {
     console.log("Load tasks from localStorage logic here");
}

function saveTasks() {
    console.log("Save tasks to localStorage logic here");
}

function renderTasks() {
    console.log("Render tasks to the DOM logic here");
}

function clearCompletedTasks() {
     console.log("Clear completed tasks logic here");
}
// Adding task in todo app functionality

// Replace the placeholder handleAddTask function
function handleAddTask(event) {
    event.preventDefault();
    document.body.classList.add('body-flash'); // Add the class to the body
    setTimeout(() => {
        document.body.classList.remove('body-flash'); // Remove the class after delay
    }, 300); 
    const taskText = taskInput.value.trim(); // Get input value and remove whitespace

    if (taskText === '') {
        alert("Please enter a task!"); // Basic validation
        return;
    }

    // Create a new task object
    const newTask = {
        id: Date.now(), // Simple unique ID using timestamp
        text: taskText,
        completed: false
    };

    // Add the new task to our tasks array
    tasks.push(newTask);

    // Clear the input field
    taskInput.value = '';

    // Save tasks to localStorage
    saveTasks();

    // Re-render the task list
    renderTasks();
}

// Replace the placeholder renderTasks function
function renderTasks() {
    // Clear the current list in the DOM
    taskList.innerHTML = '';

    // Filter tasks based on the current filter
    const tasksToRender = tasks.filter(task => {
        if (currentFilter === 'all') {
            return true; // Show all tasks
        } else if (currentFilter === 'active') {
            return !task.completed; // Show only tasks where completed is false
        } else if (currentFilter === 'completed') {
            return task.completed; // Show only tasks where completed is true
        }
    });


    // Create and append list items for each task to render
    tasksToRender.forEach(task => {
        const listItem = document.createElement('li');
        listItem.setAttribute('data-id', task.id); // Store task ID on the element

        if (task.completed) {
            listItem.classList.add('completed');
        }

        // Use innerHTML for simplicity here, includes span and buttons
        listItem.innerHTML = `
            <span class="task-text">${task.text}</span>
            <div class="task-buttons">
                <button class="complete-btn">✓</button>
                <button class="delete-btn">✗</button>
            </div>
        `;

        taskList.appendChild(listItem);
    });
}

// Replace the placeholder saveTasks function
function saveTasks() {
    // localStorage can only store strings, so convert the array to JSON
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//loading task
// Replace the placeholder loadTasks function
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        // If tasks exist in localStorage, parse the JSON string back into an array
        tasks = JSON.parse(storedTasks);
    }
    // Render the loaded tasks (or empty list if nothing was stored)
    renderTasks();
}

//completion and deletion part
// Replace the placeholder handleTaskClick function
function handleTaskClick(event) {
    const target = event.target; // The element that was clicked
    const parentLi = target.closest('li'); // Find the parent list item

    if (!parentLi) return; // Exit if the click wasn't inside a list item

    const taskId = Number(parentLi.getAttribute('data-id')); // Get the ID from the data-id attribute

    // Check if the complete button or task text was clicked
    if (target.classList.contains('complete-btn') || target.classList.contains('task-text')) {
        toggleTaskCompletion(taskId);
    }
    // Check if the delete button was clicked
    else if (target.classList.contains('delete-btn')) {
        deleteTask(taskId);
    }
}

// --- Helper functions for task completion and deletion ---

function toggleTaskCompletion(taskId) {
    // Find the task in the array and toggle its 'completed' status
    tasks = tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    saveTasks(); // Save the updated array
    renderTasks(); // Re-render the list
}

function deleteTask(taskId) {
    // Filter out the task with the matching ID
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks(); // Save the updated array
    renderTasks(); // Re-render the list
}

// adding filter
// Replace the placeholder handleFilterClick function
function handleFilterClick(event) {
    // Remove 'active' class from all filter buttons
    filterBtns.forEach(btn => btn.classList.remove('active'));

    // Add 'active' class to the clicked button
    event.target.classList.add('active');

    // Update the current filter state
    currentFilter = event.target.getAttribute('data-filter');

    // Re-render the tasks based on the new filter
    renderTasks();
}

// clear completed
// Replace the placeholder clearCompletedTasks function
function clearCompletedTasks() {
    // Keep only the tasks that are NOT completed
    tasks = tasks.filter(task => !task.completed);
    saveTasks(); // Save the changes
    renderTasks(); // Re-render the list
}