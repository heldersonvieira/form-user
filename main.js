import { PersonController } from './controller/PersonController.js';
import { Validate } from './helper/Validate.js';

let personController = new PersonController();

document.querySelector('[data-form-person]')
.addEventListener('submit', (event) => {

    personController._addPerson(event);
})


document.querySelector('[data-button-delete]')
    .addEventListener('click', (event) => {
        personController._deleteAll(event);
    })


document.querySelectorAll('input').forEach(input => {

    input.addEventListener('submit', (event) => {
        Validate.input(event.target);
    })
})
