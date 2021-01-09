import { updateStatus, updateCount } from './display-todos.js'
import { deleteRow } from './remove-todos.js'

const mainCardDiv = document.querySelector('.main-card');

let toDos = [];

class ToDo {
    constructor(active, complete, info) {
        this.active = active;
        this.complete = complete;
        this.info = info;
    }
}

function createRow(newToDo, inputValue) {
    //create to do row
    let todoDiv = document.createElement('div');
    todoDiv.setAttribute('class', 'todo');
    mainCardDiv.prepend(todoDiv);

    let todoCheckbox = document.createElement('input')
    todoCheckbox.setAttribute('type', 'checkbox');
    todoCheckbox.setAttribute('class', 'todo-checkbox');
    todoDiv.appendChild(todoCheckbox);

    let todoLabel = document.createElement('label');
    todoLabel.setAttribute('for', 'todo');
    todoLabel.setAttribute('data-content', `${inputValue}`);
    todoLabel.setAttribute('class', 'todo-text');
    todoLabel.innerText = `${inputValue}`;
    todoDiv.appendChild(todoLabel);

    let todoClose = document.createElement('button');
    todoClose.setAttribute('class', 'close-todo clickable');
    todoClose.innerText = "X";
    todoDiv.appendChild(todoClose);

    todoClose.addEventListener('click', () => {
        deleteRow(todoDiv, newToDo);
    });

    todoCheckbox.addEventListener('click', () => {
        updateStatus(todoCheckbox, newToDo);
        updateCount();
    })

}

export { toDos, ToDo, createRow };