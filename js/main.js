import './api.js';
import './avatar.js';
import './form.js';
import './map.js';
import './messages.js';
import './popup.js';
import './utils.js';

import { setUserFormSubmit } from './form.js';
import { addMarkers } from './map.js';
import { showAlert, showSuccessMessage, showFailMessage } from './messages.js';
import { getData } from './api.js';

getData(addMarkers, showAlert);
setUserFormSubmit(showSuccessMessage, showFailMessage);
