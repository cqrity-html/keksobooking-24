import './api.js';
import './avatar.js';
import './db.js';
import './filters.js';
import './form.js';
import './map.js';
import './messages.js';
import './popup.js';
import './temp_data.js';
import './utils.js';

const RERENDER_DELAY = 500;

import { offers } from './db.js';
import { setUserFormSubmit } from './form.js';
import { showSuccessMessage, showFailMessage } from './messages.js';
import { setFeaturesClick, setFiltersClick, addMarkers } from './filters.js';

addMarkers(offers);
setFiltersClick(_.debounce(addMarkers, RERENDER_DELAY), offers);
setFeaturesClick(_.debounce(addMarkers, RERENDER_DELAY), offers);

setUserFormSubmit(showSuccessMessage, showFailMessage);
