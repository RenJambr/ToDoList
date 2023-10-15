let todoInput = document.querySelector('#todoInput');
let todoContainer = document.querySelector('.todos');
let todos = document.querySelectorAll('.todo');
let addTodoBtn = document.querySelector('#addTodo');
let todosForOrdinalNum = JSON.parse(localStorage.getItem('todos'));
let num = 0;

loadLS()

todoInput.addEventListener('keydown', (e) => {
    if(e.key === "Enter"){
        addTodo()
    }
})
addTodoBtn.addEventListener('click', () => addTodo())

function addTodo(){

    let value = todoInput.value;

    if(value === ""){
        return false;
    } else{
        createEl(value)

        todoInput.value = "";
        setLS();
    }

    
}

//function which creates a todo, and adds complete and delete button
function createEl(value, completed){
    let todoDiv = document.createElement('div');
    let todoText = document.createElement('p');
    let todoDeleteBtn = document.createElement('button');
    let deleteBtnImg = document.createElement('img');

    deleteBtnImg.src = "delete.png";
    todoDeleteBtn.append(deleteBtnImg) 

    todoText.innerText = value;
    
    todoDiv.append(todoText, todoDeleteBtn)
    todoDiv.classList.add('todo');
    

    if(completed){
        todoDiv.classList.add('complete')
    }

    todoDiv.addEventListener('click', e => {
        todoDiv.classList.toggle('complete');
        setLS()
    })
    todoDeleteBtn.addEventListener('click', e => {
        e.preventDefault();
        todoDiv.remove()
        setLS();
    })

    todoContainer.appendChild(todoDiv)
}
//save todo to Local Storage
function setLS(){
    let items = document.querySelectorAll('.todo');
    let todos = [];

    items.forEach(item => {
        todos.push({
            name : item.innerText,
            completed : item.classList.contains('complete')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos));
}
//load todos from Local Storage
function loadLS(){
    let items = JSON.parse(localStorage.getItem('todos'));

    items.forEach(item => {
        createEl(item.name, item.completed)
    })
}