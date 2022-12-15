## Todo App using JavaScript

- step 1: create the html basic structure

  ```HTML
  <!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Todo App</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <div class="container">
            <div class="card">
                <h1 class="card-title">Todo App using JavaScript</h1>
                <div class="card-body">
                    <form class="todo-form">
                        <input type="text" id="inputTodo" placeholder="Enter a todo here..." required>
                        <button type="submit" class="btn" id="addTodoButton">Add Todo</button>
                    </form>
                    <p id="message"></p>
                    <ul id="lists"></ul>
                </div>
            </div>
        </div>

        <script src="script.js"></script>
    </body>
  </html>
  ```

- step 2: style html elements
- step 3: find all the html elements and add listeners

  ```JavaScript
  // finding elements
    const todoForm = document.querySelector(".todo-form");
    const todoInput = document.querySelector("#inputTodo");
    const todoLists = document.getElementById("lists");
    const messageElement = document.getElementById("message");

    // adding listeners
    todoForm.addEventListener("submit", addTodo);
    window.addEventListener("DOMContentLoaded", loadTodos);
  ```

- step 4: add todo

  ```JavaScript
  // addTodo
  const addTodo = (e) => {
    e.preventDefault();
    const todoValue = todoInput.value;
    
    // unique id
    const todoId = Date.now().toString();
    
    createTodo(todoId, todoValue);
    showMessage("todo is added", "success");
  }
  ```

- step 5: create todo

  ```JavaScript
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
  }

  const deleteButton = todoElement.querySelector("#deleteBtn");
  deleteButton.addEventListener("click",deleteTodo);
  ```

- step 6: showMessage

  ```JavaScript
  // showMessage
  const showMessage = (text, status) => {
    messageElement.textContent = text;
    messageElement.classList.add(`bg-${status}`);
    setTimeout(() =>{
        messageElement.textContent = "";
        messageElement.classList.remove(`bg-${status}`);
    },1000)
  }
  ```

- step 7: adding todos in localStorage

  ```JavaScript
  // getTodosFromLocalStorage
  const getTodosFromLocalStorage = () => {
    return localStorage.getItem("myTodos") ? 
    JSON.parse(localStorage.getItem("myTodos")) : [];
  }
  
  const addTodo = (e) => {
    // add todo to localStorage
    const todos = getTodosFromLocalStorage();
    todos.push({todoId, todoValue});
    localStorage.setItem("myTodos", JSON.stringify(todos));

    todoInput.value = "";
  }
  ```

- step 8: delete todo

  ```JavaScript
  // deleteTodo
  const deleteTodo = (e) => {
    const selectedTodo = e.target.parentElement.parentElement.parentElement;
    
    todoLists.removeChild(selectedTodo);
    showMessage("todo is deleted", "danger");
   
    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
    localStorage.setItem("myTodos", JSON.stringify(todos));
  }
  ```

- step 9: read todo

  ```JavaScript
  // loadTodos
  const loadTodos = () => {
    const todos = getTodosFromLocalStorage();
    todos.map((todo) => createTodo(todo.todoId, todo.todoValue));
  }
  ```