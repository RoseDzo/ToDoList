To-Do List App

A simple and interactive to-do list web app built using vanilla JavaScript, HTML, and CSS. It allows users to add tasks, mark them as completed, delete them, and even shows a congratulatory message when all tasks are done.

Features
Add new tasks

Mark tasks as complete/incomplete

Delete individual tasks

Automatically saves your tasks in localStorage

Shows a "Congratulations!" popup when all tasks are completed

How It Works
Adds a <li> to the list when the input field is not empty.

Includes a delete (×) button using a <span>.

Clicking a task toggles the checked class (e.g., for strikethrough effect).

If all tasks are checked, a congratulatory popup appears.

Clicking the × (inside the <span>) deletes the parent <li>.

All tasks are saved to localStorage and reloaded on page refresh using showTask().
