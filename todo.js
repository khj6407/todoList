const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

// Array length -> 0
const toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  }

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    
    toDoList.removeChild(li);

    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    console.log(cleanToDos);
}

function paintToDo(text){

    // li Create
    const li = document.createElement("li");

    // button span Create
    const delBtn = document.createElement("button");  
    const span = document.createElement("span");

    // toDos ?  toDos.length -> [1] + 1  = 2
    // Current newId value = 1;
    const newId = toDos.length + 1;

    // Btn insert 'X' && click -> deleteTodo()
    delBtn.innerText = "Χ";
    delBtn.addEventListener("click", deleteToDo);

    // span insert 'text'
    span.innerText = text

    // li component Add Btn & Span
    li.appendChild(delBtn);
    li.appendChild(span); 

    // li <li id="2" >
    li.Id = newId;

    // Add li Componet to ul tag
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        })
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}
init();