import { updateCount } from './display-todos.js'
import { toDos } from './create-todos.js'

//clear all finished todos
function displayClear() {
    let completedToDos = [];

    for (let i = 0; i < toDos.length; i++) {
        if (!toDos[i].active) {
            completedToDos.push(toDos[i]);
        }
    }

    for (let i = 0; i < completedToDos.length; i++) {
        let index = toDos.indexOf(completedToDos[i]);

        clearCompleted(completedToDos[i], index);
    }
}

function clearCompleted(completed, index) {
    let todoRows = document.querySelectorAll('.todo');

    toDos.splice(toDos.indexOf(completed), 1);
    todoRows[index].remove();
    updateCount();
}

//delete the todo & the row it is in
function deleteRow(todoDiv, newToDo) {
    toDos.splice(toDos.indexOf(newToDo), 1);
    todoDiv.remove();
    updateCount();
}

export {displayClear, deleteRow}