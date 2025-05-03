const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");

        const spanText = document.createElement("span");
        spanText.className = "task-text";
        spanText.textContent = inputBox.value;

        li.appendChild(spanText);

        const actions = document.createElement("div");
        actions.className = "task-actions";

        let editBtn = document.createElement("span");
        editBtn.innerHTML = "✎";
        editBtn.className = "edit-btn";
        actions.appendChild(editBtn);

        let deleteBtn = document.createElement("span");
        deleteBtn.innerHTML = "×";
        deleteBtn.className = "delete-btn";
        actions.appendChild(deleteBtn);

        li.appendChild(actions);
        listContainer.appendChild(li);
    }
    inputBox.value = "";
    saveData();
}

function checkAllTasksCompleted() {
    const tasks = document.querySelectorAll('#list-container li');
    if (tasks.length === 0) return false;

    return [...tasks].every(task => task.classList.contains('checked'));
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
    const spanText = taskElement.querySelector(".task-text");
    const originalText = spanText.textContent;

    const input = document.createElement("input");
    input.type = "text";
    input.className = "edit-input";
    input.value = originalText;

    const saveBtn = document.createElement("span");
    saveBtn.className = "save-btn";
    saveBtn.innerHTML = "💾";

    const actionDiv = taskElement.querySelector(".task-actions");
    
    // Hide the edit and delete buttons
    const editBtn = actionDiv.querySelector(".edit-btn");
    const deleteBtn = actionDiv.querySelector(".delete-btn");
    
    if (editBtn) editBtn.style.display = "none";
    if (deleteBtn) deleteBtn.style.display = "none";

    spanText.replaceWith(input);
    if (!taskElement.querySelector(".save-btn")) {
        actionDiv.insertBefore(saveBtn, actionDiv.firstChild);
    }

    input.focus();

    input.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            saveEdit(taskElement);
        }
    });
}

function saveEdit(taskElement) {
    const input = taskElement.querySelector('.edit-input');
    const newText = input.value.trim();

    if (newText) {
        const spanText = document.createElement("span");
        spanText.className = "task-text";
        spanText.textContent = newText;

        input.replaceWith(spanText);

        const saveBtn = taskElement.querySelector('.save-btn');
        if (saveBtn) saveBtn.remove();
        
        // Show the edit and delete buttons again
        const actionDiv = taskElement.querySelector(".task-actions");
        const editBtn = actionDiv.querySelector(".edit-btn");
        const deleteBtn = actionDiv.querySelector(".delete-btn");
        
        if (editBtn) editBtn.style.display = "";
        if (deleteBtn) deleteBtn.style.display = "";
    } else {
        taskElement.remove();
    }

    saveData();
}

listContainer.addEventListener("click", function(e) {
    const li = e.target.closest("li");

    if (e.target.tagName === "LI") {
        li.classList.toggle("checked");
        saveData();
        if (checkAllTasksCompleted()) showCongratulations();
    } 
    else if (e.target.classList.contains('delete-btn')) {
        li.remove();
        saveData();
        if (checkAllTasksCompleted()) showCongratulations();
    } 
    else if (e.target.classList.contains('edit-btn')) {
        enableEditMode(li);
    } 
    else if (e.target.classList.contains('save-btn')) {
        saveEdit(li);
    }
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";

    document.querySelectorAll('#list-container li').forEach(task => {
        if (!task.querySelector('.edit-btn')) {
            const actions = document.createElement("div");
            actions.className = "task-actions";

            let editBtn = document.createElement("span");
            editBtn.innerHTML = "✎";
            editBtn.className = "edit-btn";

            let deleteBtn = document.createElement("span");
            deleteBtn.innerHTML = "×";
            deleteBtn.className = "delete-btn";

            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);
            task.appendChild(actions);
        }
    });
}

showTask();