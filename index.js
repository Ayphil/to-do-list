let taskList = [];

window.addEventListener("load", (event) => {
    const tasksList = JSON.parse(localStorage.getItem("tasklist"));

    tasksList.forEach(task => 
    {
        const taskData = {
        taskDatatext : task.taskDatatext,
        checkboxState : task.checkboxState
        };
        InitializeTask(taskData)
        taskList.push(taskData);
    });
});

window.addEventListener("beforeunload", (event) => {
    localStorage.setItem("tasklist", JSON.stringify(taskList));
});

clearLocalStorage = () =>{
    taskList = [];
    localStorage.clear();
}

onFormSubmit = (event) =>{
    CreateNewTask(document.getElementById("name").value);
    event.preventDefault();
}

CreateNewTask = (text) =>{
    document.getElementById("name").value = "";
    const taskData = {
        taskDatatext : text,
        checkboxState : false
    };
    InitializeTask(taskData)
    taskList.push(taskData);
}

InitializeTask = (taskData) =>{
    const task = {
        TextDiv : document.createElement("span"),
        text : document.createElement("span"),
        checkbox : document.createElement("input"),
        object : document.createElement("div"),
        trashDiv : document.createElement("div"),
        trash : document.createElement("i"),
    };
    task.trash.className = "fa fa-trash-o";
    task.trash.addEventListener("click", () => RemoveTask(task, taskData));
    task.trashDiv.appendChild(task.trash);
    task.trashDiv.className = "TrashDiv";


    task.text.innerHTML = taskData.taskDatatext;
    task.TextDiv.appendChild(task.text);
    task.TextDiv.className = "TextDiv";

    task.checkbox.type = "checkbox";
    task.checkbox.addEventListener("change", () => OnCheckChange(task, taskData));
    task.object.className = "task";
    task.checkbox.checked = taskData.checkboxState;
    OnCheckChange(task, taskData);

    task.object.appendChild(task.checkbox);
    task.object.appendChild(task.TextDiv)
    task.object.appendChild(task.trashDiv);



    document.getElementById("taskList").appendChild(task.object);

};

RemoveTask = (task, taskData) =>{
    document.getElementById("taskList").removeChild(task.object);
    taskList.pop(taskData);
    
}

OnCheckChange  = (task, taskData) => {
       if(task.checkbox.checked){
            taskData.checkboxState = true;
            task.text.style.textDecoration = "line-through";
        }
       else{
            taskData.checkboxState = false;
            task.text.style.textDecoration = "none";
        }
}
