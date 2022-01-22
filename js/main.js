import './api.js';
import './avatar.js';
import './filters.js';
import './form.js';
import './map.js';
import './messages.js';
import './popup.js';
import './temp_data.js';
import './utils.js';

const RERENDER_DELAY = 500;

import { setUserFormSubmit } from './form.js';
import { showAlert, showSuccessMessage, showFailMessage } from './messages.js';
import { getData } from './api.js';
import { setFeaturesClick, setFiltersClick, addMarkers } from './filters.js';

getData((cards) => {
  addMarkers(cards);
  setFiltersClick(_.debounce(addMarkers, RERENDER_DELAY), cards);
  setFeaturesClick(_.debounce(addMarkers, RERENDER_DELAY), cards);
}, showAlert);
setUserFormSubmit(showSuccessMessage, showFailMessage);
