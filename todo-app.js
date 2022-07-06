(function () {
  let todoArr = [];
  let momTodoArr = [];
  let dadTodoArr = [];
  let todoList = createTodoList("myItem");
  let momTodoList = createTodoList("momItem");
  let dadTodoList = createTodoList("dadItem");

  function buttons() {
    document.querySelectorAll(".btn-success").forEach((button) => {
      button.addEventListener("click", function () {
        this.parentNode.parentNode.classList.toggle("list-group-item-success");
      });
    });

    document.querySelectorAll(".btn-danger").forEach((button) => {
      button.addEventListener("click", function () {
        if (window.location.pathname === "/todo-list/index.html") {
          storage = "todoArr";
        }
        if (window.location.pathname === "/todo-list/mom.html") {
          storage = "momTodoArr";
        }
        if (window.location.pathname === "/todo-list/dad.html") {
          storage = "dadTodoArr";
        }
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
  });

  // localStorage.setItem("todoArr", JSON.stringify(todoArr));
  // localStorage.setItem("momTodoArr", JSON.stringify(momTodoArr));
  // localStorage.setItem("dadTodoArr", JSON.stringify(dadTodoArr));
  if (localStorage.getItem("todoArr") !== null) {
    todoArr = JSON.parse(localStorage.getItem("todoArr"));
  }
  if (localStorage.getItem("momTodoArr") !== null) {
    momTodoArr = JSON.parse(localStorage.getItem("momTodoArr"));
  }
  if (localStorage.getItem("dadTodoArr") !== null) {
    dadTodoArr = JSON.parse(localStorage.getItem("dadTodoArr"));
  }
  function setLocalStorage(arr, arrName) {
    localStorage.setItem(arrName, JSON.stringify(arr));
    arr = JSON.parse(localStorage.getItem("todoArr"));
    return arr;
  }

  todoArr.forEach((el) => {
    let todoItem = createTodoItem(el);
    todoList.append(todoItem.item);
  });
  momTodoArr.forEach((el) => {
    let todoItem = createTodoItem(el);
    momTodoList.append(todoItem.item);
  });
  dadTodoArr.forEach((el) => {
    let todoItem = createTodoItem(el);
    dadTodoList.append(todoItem.item);
  });

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
    if (window.location.pathname === "/todo-list/index.html") {
      container.append(todoList);
    }
    if (window.location.pathname === "/todo-list/mom.html") {
      container.append(momTodoList);
    }
    if (window.location.pathname === "/todo-list/dad.html") {
      container.append(dadTodoList);
    }

    todoItemForm.form.addEventListener("submit", function (event) {
      event.preventDefault();

      let arr = 0;
      let arrName = 0;

      if (!todoItemForm.input.value) {
        return;
      }

      if (window.location.pathname === "/todo-list/index.html") {
        arr = todoArr;
        arrName = "todoArr";
        list = todoList;
        storage = arrName;
      }
      if (window.location.pathname === "/todo-list/mom.html") {
        arr = momTodoArr;
        arrName = "momTodoArr";
        list = momTodoList;
        storage = arrName;
      }
      if (window.location.pathname === "/todo-list/dad.html") {
        arr = dadTodoArr;
        arrName = "dadTodoArr";
        list = dadTodoList;
        storage = arrName;
      }

      arr.push(todoItemForm.input.value);
      setLocalStorage(arr, arrName);

      let todoItem = createTodoItem(todoItemForm.input.value);

      // todoItem.doneButton.addEventListener("click", function () {
      //   todoItem.item.classList.toggle("list-group-item-success");
      // });
      // todoItem.deleteButton.addEventListener("click", function () {
      //   if (confirm("Вы уверены?")) {
      //     todoItem.item.remove();
      //   }
      // });

      list.append(todoItem.item);
      todoItemForm.input.value = "";
      buttons();
      return storage;
    });
  }

  window.createTodoApp = createTodoApp;
})();
