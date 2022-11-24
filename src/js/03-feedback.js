import throttle from 'lodash.throttle';

const formEL = document.querySelector('.feedback-form');
const emailEl = document.querySelector('[name="email"]');
const messageEl = document.querySelector('[name="message"]');

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

formEL.addEventListener('input', throttle(saveForm, 1000));
formEL.addEventListener('submit', onSubmitForm);

loadForm();

function saveForm(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onSubmitForm(event) {
  event.preventDefault();
  event.target.reset();
  console.log('Storage:', JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
}

function loadForm() {
  const loadData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (loadData) {
    emailEl.value = loadData.email;
    messageEl.value = loadData.message;
  }
}
