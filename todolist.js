let input = document.getElementById("inputHere");
let list = document.querySelector(".list");
let editTask = null;
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach(task => {
    createTask(task.text, task.completed);
});
function updateLocalStorage() 
{
    const taskList = [];
    const allTasks = document.querySelectorAll(".list li");

    allTasks.forEach(item => 
    {
        const span = item.querySelector(".task-text");
        taskList.push({
            text: span.textContent,
            completed: span.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function createTask(text, completed) {
    let item = document.createElement("li");
    let taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = text;
    if (completed) {
        taskText.classList.add("completed");
    }
    item.appendChild(taskText);

    let buttons = document.createElement("span");
    buttons.className = "buttons";

    let doneButton = document.createElement("button");
    doneButton.innerHTML = "✅";
    doneButton.onclick = function () {
        taskText.classList.toggle("completed");
        updateLocalStorage();
    };
    buttons.appendChild(doneButton);

    let changeButton = document.createElement("button");
    changeButton.innerHTML = "✏️";
    changeButton.onclick = function () {
        input.value = taskText.textContent;
        editTask = item;
    };
    buttons.appendChild(changeButton);

    let removeButton = document.createElement("button");
    removeButton.innerHTML = "❌";
    removeButton.onclick = function () {
        item.remove();
        if (editTask === item) {
            editTask = null;
        }
        updateLocalStorage();
    };
    buttons.appendChild(removeButton);

    item.appendChild(buttons);
    list.appendChild(item);
}

function insertTask() {
    if (input.value === "") {
        alert("Please write a task!");
        return;
    }

    if (editTask) {
        editTask.querySelector(".task-text").textContent = input.value;
        editTask.querySelector(".task-text").classList.remove("completed");
        editTask = null;
        input.value = "";
        updateLocalStorage();
        return;
    }

    createTask(input.value, false);
    input.value = "";
    updateLocalStorage();
}