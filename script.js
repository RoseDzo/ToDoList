const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value;
        listContainer.appendChild(li);
        
        // Add delete button
        let deleteBtn = document.createElement("span");
        deleteBtn.innerHTML = "×";
        deleteBtn.className = "delete-btn";
        li.appendChild(deleteBtn);
        
        // Add edit button
        let editBtn = document.createElement("span");
        editBtn.innerHTML = "✎";
        editBtn.className = "edit-btn";
        li.appendChild(editBtn);
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

function enableEditMode(taskElement) {
    const currentText = taskElement.firstChild.textContent;
    taskElement.innerHTML = `
        <input type="text" class="edit-input" value="${currentText}">
        <span class="save-btn">💾</span>
        <span class="cancel-btn">❌</span>
    `;
    
    const inputField = taskElement.querySelector('.edit-input');
    inputField.focus();
    
    inputField.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveEdit(taskElement);
        }
    });
}

function saveEdit(taskElement) {
    const newText = taskElement.querySelector('.edit-input').value;
    if (newText.trim() === '') {
        taskElement.remove();
    } else {
        taskElement.innerHTML = newText;
        
        // Recreate delete button
        let deleteBtn = document.createElement("span");
        deleteBtn.innerHTML = "×";
        deleteBtn.className = "delete-btn";
        taskElement.appendChild(deleteBtn);
        
        // Recreate edit button
        let editBtn = document.createElement("span");
        editBtn.innerHTML = "✎";
        editBtn.className = "edit-btn";
        taskElement.appendChild(editBtn);
    }
    saveData();
}

listContainer.addEventListener("click", function(e) {
    // Check/uncheck task
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
        if (checkAllTasksCompleted()) {
            showCongratulations();
        }
    } 
    // Delete task
    else if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
        saveData();
        if (checkAllTasksCompleted()) {
            showCongratulations();
        }
    }
    // Edit task (pencil icon)
    else if (e.target.classList.contains('edit-btn')) {
        enableEditMode(e.target.parentElement);
    }
    // Save edited task
    else if (e.target.classList.contains('save-btn')) {
        saveEdit(e.target.parentElement);
    }
    // Cancel edit
    else if (e.target.classList.contains('cancel-btn')) {
        showTask(); // Reload from storage to cancel changes
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
    // Reattach event listeners to existing tasks
    document.querySelectorAll('#list-container li').forEach(task => {
        if (!task.querySelector('.edit-btn')) {
            // Recreate delete button if missing
            if (!task.querySelector('.delete-btn')) {
                let deleteBtn = document.createElement("span");
                deleteBtn.innerHTML = "×";
                deleteBtn.className = "delete-btn";
                task.appendChild(deleteBtn);
            }
            
            // Recreate edit button
            let editBtn = document.createElement("span");
            editBtn.innerHTML = "✎";
            editBtn.className = "edit-btn";
            task.appendChild(editBtn);
        }
    });
}
showTask();