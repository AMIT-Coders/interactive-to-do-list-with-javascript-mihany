// script.js
document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const taskInput = document.getElementById('task-input');
    const task = taskInput.value.trim();

    if (task) {
        addTask(task);
        taskInput.value = '';
    }
});

function addTask(task) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(task));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

document.getElementById('task-list').addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('completed');
    }
});


document.getElementById('task-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        const li = e.target.parentElement;
        li.remove();
    }
});



// Save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            addTask(task.text, task.completed);
        });
    }
}

// Modified addTask function to handle completed tasks
function addTask(task, completed = false) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(task));
    if (completed) {
        li.classList.add('completed');
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
    saveTasks();
}

// Load tasks when the page loads
window.addEventListener('load', loadTasks);


document.getElementById('task-list').addEventListener('dblclick', function(e) {
    if (e.target.tagName === 'LI') {
        const li = e.target;
        const currentText = li.firstChild.textContent;

        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        li.innerHTML = '';
        li.appendChild(input);
        input.focus();

        input.addEventListener('blur', function() {
            const newText = input.value.trim();
            if (newText) {
                li.innerHTML = newText;
                addDeleteButton(li);
            } else {
                li.remove();
            }
            saveTasks();
        });

        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                input.blur();
            }
        });
    }
});

function addDeleteButton(li) {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    li.appendChild(deleteBtn);
}
