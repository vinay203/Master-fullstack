let Cname = document.querySelector(".add");
function createCategory(name = Cname.value) {
  let categories = document.querySelector(".categories");

  let categorywrapper = document.createElement("div");
  categorywrapper.classList.add("categorywrapper");

  let categoryContainer = document.createElement("div");
  categoryContainer.classList.add("category-container");

  let tasksContainer = document.createElement("div");
  tasksContainer.classList.add("tasks-container");

  let btn = document.createElement("button");
  btn.textContent = "🔻";

  let categoryTitle = document.createElement("div");
  categoryTitle.classList.add("category-title");

  let categorySpan = document.createElement("span");
  categorySpan.classList.add("title");
  categorySpan.textContent = name;

  let categoryButtons = document.createElement("div");
  categoryButtons.classList.add("category-buttons");

  let Cbtn1 = document.createElement("button");
  Cbtn1.textContent = "➕";

  let Cbtn2 = document.createElement("button");
  Cbtn2.textContent = "✏️";

  let Cbtn3 = document.createElement("button");
  Cbtn3.textContent = "🗑️";

  categoryButtons.append(Cbtn1, Cbtn2, Cbtn3);
  categoryTitle.append(categorySpan);
  categoryContainer.append(btn, categoryTitle, categoryButtons);
  categorywrapper.append(categoryContainer, tasksContainer);
  categories.append(categorywrapper);

  Cname.value = "";

  Cbtn3.addEventListener("click", () => {
    categorywrapper.remove();
    saveData();
  });

  Cbtn2.addEventListener("click", () => {
    let renameinp = document.createElement("input");
    renameinp.classList.add("renameinput");

    categoryTitle.replaceChild(renameinp, categorySpan);
    renameinp.focus();

    renameinp.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (renameinp.value.trim() === "") return;
        categorySpan.textContent = renameinp.value;
        categoryTitle.replaceChild(categorySpan, renameinp);
      }
      saveData();
    });
    renameinp.addEventListener("blur", () => {
      if (renameinp.value.trim() === "") {
        categoryTitle.replaceChild(categorySpan, renameinp);
        return;
      }
      categorySpan.textContent = renameinp.value;
      categoryTitle.replaceChild(categorySpan, renameinp);
      saveData();
    });
  });

  Cbtn1.addEventListener("click", () => {
    let taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    let taskcheckbox = document.createElement("input");
    taskcheckbox.setAttribute("type", "checkbox");
    taskcheckbox.classList.add("task-checkbox");

    let taskinput = document.createElement("input");
    taskinput.classList.add("task-input");

    let taskspan = document.createElement("span");
    taskspan.classList.add("taskSpan");

    let taskdelete = document.createElement("button");
    taskdelete.classList.add("task-delete");
    taskdelete.textContent = "🗑️";

    taskItem.append(taskcheckbox, taskinput, taskdelete);
    tasksContainer.append(taskItem);
    tasksContainer.classList.add("open");
    taskinput.focus();

    taskinput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (taskinput.value.trim() === "") return;
        taskspan.textContent = taskinput.value;
        taskItem.replaceChild(taskspan, taskinput);
      }
      saveData();
    });
    taskinput.addEventListener("blur", () => {
      if (taskinput.value.trim() === "") {
        return taskinput.focus();
      } else {
        taskspan.textContent = taskinput.value;
        taskItem.replaceChild(taskspan, taskinput);
      }
      saveData();
    });
    taskcheckbox.addEventListener("click", () => {
      if (taskcheckbox.checked) {
        taskspan.style.textDecoration = "line-through";
        taskspan.style.color = "#d0cbcb";
      } else {
        taskspan.style.textDecoration = "none";
        taskspan.style.color = "initial";
      }
      saveData();
    });
    taskdelete.addEventListener("click", () => {
      taskItem.remove();
      saveData();
    });
    saveData();
  });

  btn.addEventListener("click", () => {
    tasksContainer.classList.toggle("open");
  });
  saveData();
  return tasksContainer;
}

document.querySelector("#btn").addEventListener("click", () => {
  if (Cname.value.trim() === "") {
    return;
  } else {
    createCategory(Cname.value);
  }
});

function saveData() {
  let data = [];
  let categorywrapper = document.querySelectorAll(".categorywrapper");

  categorywrapper.forEach((wrapper) => {
    let tasks = [];
    let categoryName = wrapper.querySelector(".title").textContent;

    wrapper.querySelectorAll(".taskSpan").forEach((task) => {
      tasks.push({
        text: task.textContent,
        completed: task.style.textDecoration === "line-through",
      });
    });

    data.push({ name: categoryName, tasks: tasks });
  });
  localStorage.setItem("categoryName", JSON.stringify(data));
}

function addTask(tasksContainer, taskText) {
  let taskItem = document.createElement("div");
  taskItem.classList.add("task-item");

  let taskcheckbox = document.createElement("input");
  taskcheckbox.setAttribute("type", "checkbox");
  taskcheckbox.classList.add("task-checkbox");

  let taskspan = document.createElement("span");
  taskspan.classList.add("taskSpan");
  taskspan.textContent = taskText.text;

  let taskdelete = document.createElement("button");
  taskdelete.classList.add("task-delete");
  taskdelete.textContent = "🗑️";

  taskItem.append(taskcheckbox, taskspan, taskdelete);
  tasksContainer.append(taskItem);

  taskdelete.addEventListener("click", () => {
    taskItem.remove();
    saveData();
  });

  taskcheckbox.addEventListener("click", () => {
    if (taskcheckbox.checked) {
      taskspan.style.textDecoration = "line-through";
      taskspan.style.color = "#d0cbcb";
    } else {
      taskspan.style.textDecoration = "none";
      taskspan.style.color = "initial";
    }
    saveData();
  });
  
  if (taskText.completed) {
    taskspan.style.textDecoration = "line-through";
    taskspan.style.color = "#d0cbcb";
    taskcheckbox.checked = true;
  }
}

function loadData() {
  let data = JSON.parse(localStorage.getItem("categoryName"));
  if (!data) return;

  data.forEach((category) => {
    let tasksContainer = createCategory(category.name);
    category.tasks.forEach((task) => {
      addTask(tasksContainer, task);
    });
  }); 
}
loadData();
