let todo = JSON.parse(localStorage.getItem("todo")) || [];

const addBtn = document.getElementById("addBtn");
const todayTasks = document.getElementById("todayTasks");
const futureTasks = document.getElementById("futureTasks");
const completedTasks = document.getElementById("completedTasks");

addBtn.onclick = () => {

    const name = document.getElementById("taskName").value.trim();
    const date = document.getElementById("taskDate").value;
    const priority = document.getElementById("taskPriority").value;

    if (!name || !date || !priority) return alert("Fill all fields.");

    todo.push({
        name,
        date,
        priority,
        completed: false
    });

    localStorage.setItem("todo", JSON.stringify(todo));
    clearInputs();
    render();
};

function clearInputs() {
    document.getElementById("taskName").value = "";
    document.getElementById("taskDate").value = "";
    document.getElementById("taskPriority").value = "";
}

function deleteItem(index) {
    todo.splice(index, 1);
    localStorage.setItem("todo", JSON.stringify(todo));
    render();
}

function toggleComplete(index) {
    todo[index].completed = !todo[index].completed;
    localStorage.setItem("todo", JSON.stringify(todo));
    render();
}

function render() {
    todayTasks.innerHTML = "";
    futureTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    const today = new Date().toISOString().split("T")[0];

    todo.forEach((item, index) => {
        const box = document.createElement("div");
        box.className = `task priority-${item.priority}`;

        box.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <small>${item.date} • ${item.priority}</small>
            </div>
            <div>
                <button class="completeBtn" onclick="toggleComplete(${index})">
                    ${item.completed ? "Undo" : "Done"}
                </button>
                <button class="deleteBtn" onclick="deleteItem(${index})">Delete</button>
            </div>
        `;

        if (item.completed) {
            completedTasks.appendChild(box);
        } else if (item.date === today) {
            todayTasks.appendChild(box);
        } else if (item.date > today || item.date < today) {
            futureTasks.appendChild(box);
        }
    });
}

render();
