
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        funcAdd()
    }
})

function funcAdd() {
    let input = document.getElementById("forinput");

    if (input.value === "") {
        alert("Please write your todo in the input field")
        return
    }

    else {
        let todoArray = JSON.parse(localStorage.getItem('todoArray')) || [];

        todoArray.push(input.value)

        localStorage.setItem("todoArray", JSON.stringify(todoArray));

        input.value = "";

        displayTodo();
    }



}

function displayTodo() {
    let todoArray = JSON.parse(localStorage.getItem('todoArray')) || [];
    let todosBox = document.getElementById("unorderedList");

    todosBox.innerHTML = "";

    todoArray.forEach((value, index) => {
        let todo = document.createElement('li');
        todo.textContent = value;
        todosBox.append(todo);


        let button = document.createElement("button")
        button.textContent = "Delete"
        todo.append(button)

        button.addEventListener("click", () => {
            deleteTodo(index)
            displayTodo()
        })


        let editButton = document.createElement("button")
        editButton.textContent = "Edit"
        todo.append(editButton)

        editButton.addEventListener("click", () => {
            startEditTextTask(index)
        })


        

    });
}



function deleteTodo(index) {
    let todoArray = JSON.parse(localStorage.getItem('todoArray')) || [];

    todoArray.splice(index, 1)

    localStorage.setItem("todoArray", JSON.stringify(todoArray))

}



function startEditTextTask(index) {
    let container = document.getElementById("container")
    let editButtonId = document.getElementById("editButtonId")
    let saveBtn = document.getElementById("saveBtn")
    container.style.display = 'none'
    document.body.style.backgroundColor = "black"
    editButtonId.style.display = "block"

    saveBtn.addEventListener("click", () => {
        saveFunction(index)
    })

}


function saveFunction(index) {
    let container = document.getElementById("container")
    let editButtonId = document.getElementById("editButtonId")
    let forEditable = document.getElementById("forEditable")

    if (forEditable.value === "") {
        alert("please Fill")
        return
    }

    changingEdits(index, forEditable.value)
    editButtonId.style.display = "none"
    container.style.display = 'block'
    document.body.style.backgroundColor = "green"
}

function changingEdits(index, editValue) {
    let todoArray = JSON.parse(localStorage.getItem('todoArray')) || [];
    todoArray[index] = editValue
    localStorage.setItem("todoArray", JSON.stringify(todoArray))
    displayTodo()
}

function cancelEverything(){
    let container = document.getElementById("container")
    let editButtonId = document.getElementById("editButtonId")



    editButtonId.style.display = "none"
    container.style.display = "block"
    document.body.style.backgroundColor = "green"

}

displayTodo()
