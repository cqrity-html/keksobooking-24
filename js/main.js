import './api.js';
import './avatar.js';
import './filters.js';
import './form.js';
import './map.js';
import './messages.js';
import './popup.js';
import './temp_data.js';
import './utils.js';

import { setUserFormSubmit } from './form.js';
import { addMarkers } from './map.js';
import { showAlert, showSuccessMessage, showFailMessage } from './messages.js';
import { getData } from './api.js';
import { setFeaturesClick, setTypeClick, setPriceClick, setRoomsClick, setGuestsClick } from './filters.js';

getData((cards) => {
  addMarkers(cards);
  setFeaturesClick(addMarkers, cards);
  setRoomsClick(addMarkers, cards);
  setPriceClick(addMarkers, cards);
  setTypeClick(addMarkers, cards);
  setGuestsClick(addMarkers, cards);
}, showAlert);
setUserFormSubmit(showSuccessMessage, showFailMessage);
