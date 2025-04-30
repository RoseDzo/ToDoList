const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

// Add task function
function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}


function checkAllTasksCompleted() {
    const tasks = document.querySelectorAll('#list-container li');
    if (tasks.length === 0) return false; 
    
    let allCompleted = true;
    tasks.forEach(task => {
        if (!task.classList.contains('checked')) {
            allCompleted = false;
        }
    });
    return allCompleted;
}


function showCongratulations() {
    const congrats = document.createElement('div');
    congrats.className = 'congrats-message';
    congrats.innerHTML = `
        <h2>🎉 Congratulations! 🎉</h2>
        <p>You've completed all your tasks! Time to celebrate!</p>
        <button onclick="this.parentElement.remove()">Close</button>
    `;
    document.body.appendChild(congrats);
}

// Single click event listener (replaces the old one)
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
        if (checkAllTasksCompleted()) {
            showCongratulations();
        }
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
        if (checkAllTasksCompleted()) {
            showCongratulations();
        }
    }
}, false);

// Save and load tasks
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();