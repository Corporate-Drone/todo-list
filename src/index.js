import { displayClear } from './modules/remove-todos.js'
import { toDos, ToDo, createRow } from './modules/create-todos.js'
import { updateCount, displayAll, displayActive, displayCompleted, displayStatus } from './modules/display-todos.js'

const htmlClass = document.querySelector('html');
const themeBtn = document.querySelector('.theme-switcher');
const backgroundImg = document.querySelector('.background');
const inputToDo = document.querySelector('.create-todo');

const allClickable = document.querySelector('#status-all');
const activeClickable = document.querySelector('#status-active');
const completeClickable = document.querySelector('#status-complete');
const clearClickable = document.querySelector('#clear-complete');

function init() {
    updateCount();
    window.location.href = '#status-all'
}

init();

//Toggle light/dark theme
themeBtn.addEventListener('click', () => {
    if (htmlClass.classList.contains("light")) {
        htmlClass.setAttribute('class', 'dark');
        backgroundImg.src = "images/bg-desktop-dark.jpg";
    } else {
        htmlClass.setAttribute('class', 'light');
        backgroundImg.src = "images/bg-desktop-light.jpg";
    }
})

inputToDo.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && inputToDo.value !== "") {
        let newToDo = new ToDo(true, false, inputToDo.value);
        toDos.unshift(newToDo);

        //create new row
        createRow(newToDo, newToDo.info);

        //update to do count
        updateCount();

        //display the to dos based on what status button was clicked
        displayStatus();

        inputToDo.value = "";
    }
})

activeClickable.addEventListener('click', () => {
    displayActive();

})

completeClickable.addEventListener('click', () => {
    displayCompleted();

})

allClickable.addEventListener('click', () => {
    displayAll();

})

clearClickable.addEventListener('click', () => {
    displayClear();
})



