import { isEscapeKey } from './utils.js';
import { adForm } from './form.js';
import { resetMap } from './map.js';

const ALERT_SHOW_TIME = 5000;
const messagesContainer = document.querySelector('.messages-container');

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const showSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessageElement = successMessageTemplate.cloneNode(true);
  messagesContainer.appendChild(successMessageElement);
  adForm.reset();
  resetMap();

  const closeSuccessMessage = () => {
    messagesContainer.innerHTML = '';
    document.removeEventListener('click', closeSuccessMessage);
    window.removeEventListener('keydown', onEscapeClose);
  };

  document.addEventListener('click', closeSuccessMessage);
  window.addEventListener('keydown', onEscapeClose);

  function onEscapeClose(evt) {
    if (isEscapeKey) {
      evt.preventDefault();
      closeSuccessMessage();
    }
  }
};

const showFailMessage = () => {
  const failMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const failMessageElement = failMessageTemplate.cloneNode(true);
  messagesContainer.appendChild(failMessageElement);

  const closeFailMessage = () => {
    messagesContainer.innerHTML = '';
    failMessageElement.querySelector('.error__button').removeEventListener('click', closeFailMessage);
    document.removeEventListener('click', closeFailMessage);
    window.removeEventListener('keydown', onEscapeClose);
  };

  failMessageElement.querySelector('.error__button').addEventListener('click', closeFailMessage);
  document.addEventListener('click', closeFailMessage);
  window.addEventListener('keydown', onEscapeClose);

  function onEscapeClose(evt) {
    if (isEscapeKey) {
      evt.preventDefault();
      closeFailMessage();
    }
  }
};

export { showAlert, showSuccessMessage, showFailMessage };
