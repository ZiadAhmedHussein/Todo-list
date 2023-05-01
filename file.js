let taskForm = document.querySelector(".listForm");

let taskInput = document.querySelector(".inputTask");

let tasksTodo = document.querySelector(".tasksToDo");

let deleteAllbutton = document.querySelector(".deleteAll")

let tasksCounter = document.querySelector(".tasksCounter span");

let mainToDo = document.querySelector(".mainDiv");




let arrayOfTasks = [];
// to dont miss data from local
if(localStorage.getItem('tasks')) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
  deleteAllbutton.style.display = "block";
};
// get data from local
getDataFromLocalStorage();

//button to delete all tasks
deleteAllTasks ();

taskForm.addEventListener ("submit", (e) => {
  e.preventDefault();
  if (taskInput.value.trim() !== "") {
    addTaskToStore(taskInput.value);
    taskInput.value = "";
    deleteAllbutton.style.display = "block";
  };
});

// function to store task in array of tasks
function addTaskToStore(taskText) {
  const task = {
    id:Date.now(),
    text: taskText,
    done: false,
    year: new Date().getFullYear().toString(),
    month: new Date().getMonth()+1,
    day: new Date().getDay(),
  };
  //store data in array of tasks
  arrayOfTasks.push(task);

  taskscounter (arrayOfTasks);
  
  //appeare tasks on page
  appeareTasksOnPage(arrayOfTasks);

  // store data in local starage
  storeDataInLoaclStorage(arrayOfTasks);

  console.log(arrayOfTasks);
};

//function to loop on tasks array
function appeareTasksOnPage (arrayOfTasks) {
  tasksTodo.innerHTML = "";


  arrayOfTasks.forEach(task => {
    
    let mainDiv = document.createElement("div");
    mainDiv.className = "task";
    mainDiv.setAttribute("idText", task.id)
    tasksTodo.appendChild(mainDiv);

    

    let taskText = document.createElement("p");
    taskText.className = "taskText";
    taskText.textContent = task.text;
    mainDiv.appendChild(taskText);

    let taskDate = document.createElement('ul');
    taskDate.className = "taskDate";
    mainDiv.appendChild(taskDate);

    let day = document .createElement("li");
    day.className = "day";
    day.textContent = task.day;
    taskDate.appendChild(day);

    let month = document.createElement('li');
    month.className = "month";
    month.textContent = task.month;
    taskDate.appendChild(month);

    let year = document.createElement("li");
    year.className = "year";
    year.textContent = task.year;
    taskDate.appendChild(year);

    let deleteTask = document.createElement("p");
    deleteTask.className = "del";
    deleteTask.textContent = "x";
    mainDiv.appendChild(deleteTask);

    

    deleteTask.addEventListener("click", (e)=>{
      //remove task from local
      deleteTaskFromLocal(e.target.parentElement.getAttribute("idText"))

      //remove task from page
      e.target.parentElement.remove()
    })

    let checkBox = document.createElement("span");
    checkBox.classList.add("checkBox");
    checkBox.onclick = function(e) {
      e.target.classList.toggle("done");

      if(e.target.parentElement.getAttribute("idText") === taskText.parentElement.getAttribute("idText")) {
        taskText.classList.toggle("dashed");
      }
    }
    mainDiv.appendChild(checkBox);

  });
};


//function of store data in loacl storage
function storeDataInLoaclStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
};

//function to get data from local storage
function getDataFromLocalStorage () {
  let data = window.localStorage.getItem("tasks");
  if(data) {
    let tasks = JSON.parse(data);
    appeareTasksOnPage(tasks);
    taskscounter (tasks);
  }
}

//function to count tasks
function taskscounter (array) {
  if(array) {
    tasksCounter.parentElement.style.display = "flex";
    tasksCounter.textContent = arrayOfTasks.length;
  };
}

//function to delete all 
function deleteAllTasks () {
  deleteAllbutton.onclick = function(e) {
    e.target.style.display = "none";
    tasksCounter.parentElement.style.display = 'none';
    tasksTodo.innerHTML = "";
    arrayOfTasks = [];
    window.localStorage.removeItem("tasks");
  }
}

//function to delete task from local 
function deleteTaskFromLocal (taskId) {
  arrayOfTasks = arrayOfTasks.filter(task => task.id != taskId);
  storeDataInLoaclStorage(arrayOfTasks);
  taskscounter (arrayOfTasks)
  if (arrayOfTasks.length == 0){
    tasksCounter.parentElement.style.display = 'none';
    tasksTodo.innerHTML = "";
    arrayOfTasks = [];
    window.localStorage.removeItem("tasks");
    mainToDo.remove();
    window.location.reload();
  } 
}

