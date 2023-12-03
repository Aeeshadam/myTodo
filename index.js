const form = document.querySelector(".form")
const submit = document.querySelector(".submit")
const input = document.querySelector(".input")
const ulEl = document.querySelector(".list")
const completedList = document.querySelector('.completed-list')
const completedTittle = document.querySelector(".completed-tittle")
const taskTittle = document.querySelector('.task-tittle')

function displayHeading() {
    if (completedList.innerHTML == '') {
        completedTittle.classList.add("hide")
    }
    else{
        completedTittle.classList.remove("hide")
    }

    if (ulEl.innerHTML == '') {
        taskTittle.classList.add("hide")
    }
    else{
        taskTittle.classList.remove("hide")
    }


}



let list = JSON.parse(localStorage.getItem("list")) || []

list.forEach((task) => {
    display(task)
});

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    if (input.value === "") {
        alert("please Enter a Task")
    }
    else
    display();
    
})

function display(task) {
    let newTask = input.value

    if (task) {
        newTask = task.name
    }
    const liEl = document.createElement("li")
    if (task && task.completed) {
        liEl.classList.add("completed");
        completedList.appendChild(liEl)
    }
    else{
        ulEl.appendChild(liEl); 
    }
    input.value = "";


    const text = document.createElement('span')
    text.innerHTML = newTask;
    liEl.appendChild(text);

    const check = document.createElement("div")
    check.innerHTML = `<i class="fa-solid fa-square-check"></i>`
    liEl.appendChild(check);

    const trash = document.createElement("div")
    trash.innerHTML = `<i class="fa-solid fa-trash"></i>`
    liEl.appendChild(trash);

    const save = document.createElement("div")
    save.innerHTML = `<i class="fa-solid fa-check"></i>`
    save.classList.add("hide")
    liEl.appendChild(save);

    const edit = document.createElement("div")
    edit.innerHTML = `<i class="fa-solid fa-pen"></i>`
    liEl.appendChild(edit);

    trash.addEventListener("click", ()=>{
        deleteFtn(liEl);
        displayHeading();
    })

    check.addEventListener("click", ()=>{
       checkFtn(liEl);
       displayHeading();
    })

    edit.addEventListener("click", ()=>{

        if (liEl.classList.contains("completed")) {
            alert("This task has been completed")
        }

        else{
            text.setAttribute('contenteditable', true);
            trash.classList.add("hide")
            check.classList.add("hide")
            save.classList.remove("hide")
            edit.classList.add("hide")
        }

    })

    save.addEventListener("click", ()=>{
        text.removeAttribute('contenteditable');
        check.classList.remove('hide')
        trash.classList.remove("hide")
        save.classList.add('hide')
        edit.classList.remove('hide')
        saveToLocalStorage();
    })

    displayHeading()
    saveToLocalStorage();
}



function checkFtn(liEl) {
    if (!liEl.classList.contains("completed")) {
        liEl.classList.add("completed")
        completedList.appendChild(liEl);
    }
    else{
        liEl.classList.remove("completed")
        ulEl.appendChild(liEl);
    }
    saveToLocalStorage();
}

function deleteFtn(liEl) {
    const userConfirmed = window.confirm("Are you sure you want to delete this task?");
        if (userConfirmed) {
            liEl.remove();
            saveToLocalStorage();
        }
}

function saveToLocalStorage() {
    liEls = document.querySelectorAll("li")
    list = []
    liEls.forEach((liEl) => {
        list.push({
            name : liEl.firstElementChild.innerText,
            completed: liEl.classList.contains("completed")
        })
    });
    localStorage.setItem("list", JSON.stringify(list));
}