// Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// functions

function addTodo(event) {
  //prevent form from submitting
  event.preventDefault();

  //   Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Created List
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");

  todoDiv.appendChild(newTodo);

  // Add localStorage
  saveLocalTodos(todoInput.value);

  //   check mark button
  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  completeButton.classList.add("complete-button");

  todoDiv.appendChild(completeButton);

  //   check mark button
  const trashButton = document.createElement("button");
  //   trashButton.innerHTML = '<i class="fa-sharp fa-solid fa-check"></i>';
  trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  trashButton.classList.add("trash-button");

  todoDiv.appendChild(trashButton);

  //   append to list
  todoList.appendChild(todoDiv);

  //   Clear Todo INPUT Value
  todoInput.value = "";
}

function deleteCheck(e) {
  console.log(e.target);
  const item = e.target;
  //DELETE TODO
  if (item.classList[0] === "trash-button") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //   CHECK MARK
  if (item.classList[0] === "complete-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;

  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
    // console.log("todo", todo);
    // console.log("TODO", todo.classList[1] === "completed");
    // console.log("TODO List", todo.classList.contains("complete"));

    // while (e.target.value) {
    //   if (e.target.value == "all") {
    //     todo.style.display = "flex";
    //   } else if (e.target.value == "completed") {
    //     if (todo.classList[1] === "completed") {
    //       todo.style.display = "flex";
    //     }
    //   } else if (e.target.value == "uncompleted") {
    //     if (!todo.classList[1] === "completed") {
    //       todo.style.display = "flex";
    //     }
    //   }
    //   // else {
    //   //   todo.style.display = "none";
    //   // }
    // }
  });
}

function saveLocalTodos(todo) {
  //Check items
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //   Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Created List
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");

    todoDiv.appendChild(newTodo);

    //   check mark button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completeButton.classList.add("complete-button");

    todoDiv.appendChild(completeButton);

    //   check mark button
    const trashButton = document.createElement("button");
    //   trashButton.innerHTML = '<i class="fa-sharp fa-solid fa-check"></i>';
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashButton.classList.add("trash-button");

    todoDiv.appendChild(trashButton);

    //   append to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  // const index = todos.indexof(todoIndex);
  // console.log(todo.children[0].innerText);
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
