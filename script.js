// finding elements
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const todoLists = document.getElementById("lists");
const messageElement = document.getElementById("message");

// showMessage
const showMessage = (text, status) => {
    messageElement.textContent = text;
    messageElement.classList.add(`bg-${status}`);
    setTimeout(() =>{
        messageElement.textContent = "";
        messageElement.classList.remove(`bg-${status}`);
    },1000)
}

// createTodo
const createTodo = (todoId, todoValue) => {
    const todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("li-style");
    todoElement.innerHTML = `
        <span> ${todoValue} </span>
        <span> <button class="btn" id="deleteBtn"> <i class="fa-solid fa-trash"></i> </button> </span>
    `;
    todoLists.appendChild(todoElement);

    const deleteButton = todoElement.querySelector("#deleteBtn");
    deleteButton.addEventListener("click",deleteTodo);
}

// deleteTodo
const deleteTodo = (e) => {
    const selectedTodo = e.target.parentElement.parentElement.parentElement;
    
    todoLists.removeChild(selectedTodo);
    showMessage("todo is deleted", "danger");
   
    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
    localStorage.setItem("myTodos", JSON.stringify(todos));
}

// getTodosFromLocalStorage
const getTodosFromLocalStorage = () => {
    return localStorage.getItem("myTodos") ? JSON.parse(localStorage.getItem("myTodos")) : [];
}

// addTodo
const addTodo = (e) => {
    e.preventDefault();
    const todoValue = todoInput.value;
    
    // unique id
    const todoId = Date.now().toString();
    
    createTodo(todoId, todoValue);
    showMessage("todo is added", "success");

    // add todo to localStorage
    const todos = getTodosFromLocalStorage();
    todos.push({todoId, todoValue});
    localStorage.setItem("myTodos", JSON.stringify(todos));

    todoInput.value = "";
}

// loadTodos
const loadTodos = () => {
    const todos = getTodosFromLocalStorage();
    todos.map((todo) => createTodo(todo.todoId, todo.todoValue));
}

// adding listeners
todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);