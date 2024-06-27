const form = document.querySelector("form")
const ul = document.querySelector("ul")
const inputTag = document.querySelector("input")

if (getLocal()) {
    getLocal().forEach(todo => addTodo(todo));
}

const todoArray = getLocal() || [];


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const todoData = {
        id: Math.floor(Math.random() * 1000),
        text: inputTag.value.trim(),
        todoCheck: false,
    }

    addTodo(todoData);
    todoArray.push(todoData)
    setLocal(todoArray)
});


function addTodo(getData) {
    const li = document.createElement("li");
    const text = document.createElement("span");


    const iconBox = document.createElement("div");
    const deleteI = document.createElement("i");
    const editI = document.createElement("i");
    const checkedI = document.createElement("i");

    iconBox.append(checkedI, editI, deleteI);

    iconBox.className = "iconBox";
    deleteI.className = "fa-solid fa-trash";
    checkedI.className = "fa-solid fa-check";
    editI.className = "fa-solid fa-pen";

    text.textContent = getData.text; // Set the text content of the span element
    li.append(text, iconBox);
    ul.appendChild(li);
    inputTag.value = "";


    if (getData.todoCheck) {
        text.classList.add("completed");
    }

    // check
    checkedI.addEventListener("click", () => {
        text.classList.toggle("completed");
        const index = todoArray.findIndex(todo => todo.id === getData.id);

        todoArray[index].todoCheck = text.classList.contains("completed");
        setLocal(todoArray);
    });

    // delete
    deleteI.addEventListener("click", () => {
        li.remove();
        const index = todoArray.findIndex(todo => todo.id === getData.id);
        if (index > -1) {
            todoArray.splice(index, 1);
            setLocal(todoArray);
        }
    });

    // edit
    editI.addEventListener("click", () => {
        const newText = prompt("Edit your task:", text.textContent);
        if (newText !== null && newText.trim() !== "") {
            text.textContent = newText;

            text.classList.remove("completed")

            const index = todoArray.findIndex(todo => todo.id === getData.id);
            if (index > -1) {
                todoArray[index].text = newText;
                todoArray[index].todoCheck = false;
                setLocal(todoArray);
            }
        }
    });
}

function setLocal(getTodoArr) {
    localStorage.setItem("todoData", JSON.stringify(getTodoArr));
}

function getLocal() {
    return JSON.parse(localStorage.getItem("todoData"));
}
