let currentArr = [];
let currentUser;
// let momTodoList = createTodoList("momItem");
// let dadTodoList = createTodoList("dadItem");
let currentOwner = () => {
  if (window.location.pathname === "/index.html") {
    currentUser = "myItem"
    return "Я";
  }
  if (window.location.pathname === "/mom.html") {
    currentUser = "momItem"
    return "Мама";
  }
  if (window.location.pathname === "/dad.html") {
    currentUser = "dadItem"
    return "Папа";
  }
};

console.log(currentOwner());
function buttons() {
  document.querySelectorAll(".btn-success").forEach((button) => {
    button.addEventListener("click", function () {
      this.parentNode.parentNode.classList.toggle("list-group-item-success");
    });
  });

  document.querySelectorAll(".btn-danger").forEach((button) => {
    button.addEventListener("click", function () {
      let currentArr = JSON.parse(localStorage.getItem(storage));
      currentArrValue = this.parentNode.parentNode.textContent.replace(
        "ГотовоУдалить",
        ""
      );
      let currentIndex = currentArr.indexOf(currentArrValue);

      if (currentIndex === -1) {
        return;
      }

      if (confirm("Вы уверены?")) {
        this.parentNode.parentNode.remove();

        currentArr.splice(currentIndex, 1);

        localStorage.setItem(storage, JSON.stringify(currentArr));

        console.log(currentIndex);
        console.log(currentArr);
        console.log("remove");
      }
    });
  });
}
document.addEventListener("DOMContentLoaded", function () {
  buttons();
  loadTodoItems();
});

// localStorage.setItem("todoArr", JSON.stringify(todoArr));
// localStorage.setItem("momTodoArr", JSON.stringify(momTodoArr));
// localStorage.setItem("dadTodoArr", JSON.stringify(dadTodoArr));

function createAppTitle(title) {
  let appTitle = document.createElement("h2");
  appTitle.innerHTML = title;
  return appTitle;
}
function createTodoItemForm() {
  let form = document.createElement("form");
  let input = document.createElement("input");
  let buttonWrapper = document.createElement("div");
  let button = document.createElement("button");

  form.classList.add("input-group", "mb-3");
  input.classList.add("form-control");
  input.placeholder = "Введите название нового дела";
  buttonWrapper.classList.add("input-group-append");
  button.classList.add("btn", "btn-primary");
  button.textContent = "Добавить дело";

  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  return { form, input, button };
}

function createTodoList(id) {
  let list = document.createElement("ul");
  list.id = id;
  list.classList.add("list-group");
  return list;
}
let todoList = createTodoList(currentUser);
function createTodoItem(name) {
  let item = document.createElement("li");
  let buttonGroup = document.createElement("div");
  let doneButton = document.createElement("button");
  let deleteButton = document.createElement("button");

  item.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );
  item.textContent = name;
  buttonGroup.classList.add("btn-group", "btn-group-sm");
  doneButton.classList.add("btn", "btn-success");
  doneButton.textContent = "Готово";
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.textContent = "Удалить";

  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);
  buttons();
  return {
    item,
    doneButton,
    deleteButton,
  };
}
function createTodoApp(container, title = "Список дел") {
  let todoAppTitle = title;
  let todoItemForm = createTodoItemForm();

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  
  container.append(todoList);
  
  // if (window.location.pathname === "/mom.html") {
  //   container.append(momTodoList);
  // }
  // if (window.location.pathname === "/dad.html") {
  //   container.append(dadTodoList);
  // }

  todoItemForm.form.addEventListener("submit", async function (event) {
    event.preventDefault();

    let arr = 0;
    let arrName = 0;

    if (!todoItemForm.input.value) {
      return;
    }

    
    
    // if (window.location.pathname === "/index.html") {
      
      //   arrName = "todoArr";
      
      //   storage = arrName;
      // }
      // if (window.location.pathname === "/mom.html") {
        
    //   arrName = "momTodoArr";
    
    //   storage = arrName;
    // }
    // if (window.location.pathname === "/dad.html") {
      
      //   arrName = "dadTodoArr";
      
      //   storage = arrName;
      // }
      
      currentArr.push(todoItemForm.input.value);
      
      let todoItem = createTodoItem(todoItemForm.input.value);
      // не использовать, пока что
      
      
      // todoItem.doneButton.addEventListener("click", function () {
        //   todoItem.item.classList.toggle("list-group-item-success");
        // });
        // todoItem.deleteButton.addEventListener("click", function () {
          //   if (confirm("Вы уверены?")) {
            //     todoItem.item.remove();
            //   }
            // });
            
            todoList.append(todoItem.item);
            buttons();
            const response = await fetch("http://localhost:3000/api/todos", {
              
              method: "POST",
              body: JSON.stringify({
                name: todoItemForm.input.value.trim(),
                owner: `${currentOwner()}`,
              }),
              headers: {
                "Content-Type": "application/json",
              },
              
            });
            
            
            todoItemForm.input.value = "";
    
  });
}
let todoItem;
async function loadTodoItems() {
  const response = await fetch(
    `http://localhost:3000/api/todos?owner=${currentOwner()}`
  );
  let data = await response.json();

  data.forEach((el) => {
    currentArr.push(el);
  });
  currentArr.forEach((el) => {
    todoItem = createTodoItem(el.name);
    todoList.append(todoItem.item);
    console.log(todoItem.item);
  });
}

// loadTodoItems().forEach((el) => {
//   if (currentOwner() === "Я") {
//     todoArr.push(el);
//   }
//   if (currentOwner() === "Мама") {
//     momTodoArr.push(el);
//   }
//   if (currentOwner() === "Папа") {
//     dadTodoArr.push(el);
//   }
// });

window.createTodoApp = createTodoApp;
