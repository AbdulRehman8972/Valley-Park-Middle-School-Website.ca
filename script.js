// Define global variables
let selectedDate = null;
const tasks = JSON.parse(localStorage.getItem('tasks')) || {};

// Render the calendar for the current month
function renderCalendar() {
    const calendar = document.getElementById('calendar');
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    
    // Clear the previous calendar
    calendar.innerHTML = '';
    
    // Empty spaces before the first day
    for (let i = 0; i < firstDay; i++) {
        calendar.innerHTML += '<div></div>';
    }

    // Render days of the month
    for (let day = 1; day <= lastDate; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        
        // Add tasks if any
        if (tasks[`${month + 1}-${day}`]) {
            dayElement.style.backgroundColor = '#81c784'; // Light green for days with tasks
        }
        
        // Add event listener to open modal for editing tasks
        dayElement.addEventListener('click', () => openTaskModal(month + 1, day));
        
        calendar.appendChild(dayElement);
    }
}

// Open task modal
function openTaskModal(month, day) {
    const password = prompt('Enter the password to edit tasks:');
    if (password === '580902') {
        selectedDate = `${month}-${day}`;
        document.getElementById('taskInput').value = tasks[selectedDate] || ''; // Show existing task if any
        document.getElementById('taskModal').style.display = 'flex';
    } else {
        alert('Incorrect password!');
    }
}

// Save task
function saveTask() {
    const taskInput = document.getElementById('taskInput').value;
    if (selectedDate) {
        tasks[selectedDate] = taskInput;
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks in localStorage
        renderCalendar(); // Re-render the calendar
        closeModal();
    }
}

// Close task modal
function closeModal() {
    document.getElementById('taskModal').style.display = 'none';
}

// Initialize calendar on page load
renderCalendar();
