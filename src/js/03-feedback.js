let throttle = require('lodash.throttle');

const formEL = document.querySelector('.feedback-form');
const emailEl = document.querySelector('[name="email"]');
const messageEl = document.querySelector('[name="message"]');

const STORAGE_KEY = 'feedback-form-state';

formEL.addEventListener('input', throttle(saveForm, 1000));
formEL.addEventListener('submit', onSubmitForm);

loadForm();

function saveForm(event) {
  const {
    elements: { email, message },
  } = event.currentTarget;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      [email.name]: email.value,
      [message.name]: message.value,
    })
  );
}

function onSubmitForm(event) {
  event.preventDefault();
  event.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
}

function loadForm() {
  const loadData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (loadData) {
    emailEl.value = loadData.email;
    messageEl.value = loadData.message;
  }
}
