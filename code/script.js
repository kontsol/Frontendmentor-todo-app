const form = document.querySelector("form");
const form_input = document.getElementById("form_input");
const form_ul = document.querySelector(".form_ul");
const body = document.querySelector("body");
const todos = JSON.parse(localStorage.getItem("todos")) || [];
const saved_svg = JSON.parse(localStorage.getItem("svg_active")) || [];
const all_btn = document.getElementById("all-btn");
const active_btn = document.getElementById("active-btn");
const clear_completed = document.getElementById("clear-completed");
const light_btn = document.getElementById("light-btn");
const dark_btn = document.getElementById("dark-btn");

const main_image = document.getElementById("main-image");
const bottom_part = document.querySelector(".bottom-part");

if (todos) {
  todos.forEach((todo) => {
    console.log(todo.text);
    addToDo(todo);
  });
}
console.log(todos);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addToDo();
});

function addToDo(todo) {
  let todo_text = form_input.value;
  if (todo) {
    todo_text = todo.text;
  }

  if (todo_text) {
    const form_li = document.createElement("li");
    const form_li_div = document.createElement("div");
    const check_svg = document.createElement("ion-icon");
    const close_svg = document.createElement("ion-icon");
    check_svg.setAttribute("name", "checkmark-outline");
    check_svg.setAttribute("id", "check-svg");
    close_svg.setAttribute("name", "close-outline");
    close_svg.setAttribute("id", "close-svg");
    if (todo && todo.completed) {
      form_li.classList.add("completed");
    }

    form_li.innerHTML = todo_text;
    form_li.addEventListener("click", () => {
      form_li.classList.toggle("completed");
      check_svg.classList.toggle("check-completed");
      update();
    });

    check_svg.addEventListener("click", () => {
      form_li.classList.toggle("completed");
      check_svg.classList.toggle("check-completed");
      update();
    });

    close_svg.addEventListener("click", (e) => {
      e.preventDefault();
      form_li.remove();
      update();
    });

    active_btn.addEventListener("click", () => {
      if (form_li.classList.contains("completed")) {
        active_btn.style.color = "var(--light-gray)";
        all_btn.style.color = "var(--dark-grayish-blue)";
        form_li.classList.add("hidden");
      }
    });

    all_btn.addEventListener("click", () => {
      form_li.classList.remove("hidden");
      active_btn.style.color = "var(--dark-grayish-blue)";
      all_btn.style.color = "var(--light-gray)";
    });

    clear_completed.addEventListener("click", () => {
      if (form_li.classList.contains("completed")) {
        form_li.remove();
      }
    });

    form_li_div.prepend(check_svg);
    form_li.prepend(form_li_div);
    form_li.appendChild(close_svg);
    form_ul.appendChild(form_li);
    form_input.value = "";
    update();
  }
}

function update() {
  const todo_li = document.querySelectorAll("li");
  const svg = document.querySelectorAll("#check-svg");
  const todos = [];
  todo_li.forEach((el) => {
    todos.push({
      text: el.innerHTML,
      completed: el.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
