import { sendData } from './api.js';

const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
const PRICE_MAX = 1000000;

let minPrice = 0;
const offerMinPrices = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000,
};

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');
const mapFiltersSelects = mapFilters.querySelectorAll('select');
const adFormTitle = adForm.querySelector('#title');
const adFormPrice = adForm.querySelector('#price');
const adFormRoomNumber = adForm.querySelector('#room_number');
const adFormCapacity = adForm.querySelector('#capacity');
const adFormTimeIn = adForm.querySelector('#timein');
const adFormTimeOut = adForm.querySelector('#timeout');
const adFormType = adForm.querySelector('#type');
const adFormAddress = adForm.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');

const onTitleInput = () => {
  const valueLength = adFormTitle.value.length;

  if (valueLength < TITLE_MIN_LENGTH) {
    adFormTitle.setCustomValidity(`Ещё ${TITLE_MIN_LENGTH - valueLength} симв.`);
  } else if (valueLength > TITLE_MAX_LENGTH) {
    adFormTitle.setCustomValidity(`Удалите лишние ${valueLength - TITLE_MAX_LENGTH} симв.`);
  } else {
    adFormTitle.setCustomValidity('');
  }

  adFormTitle.reportValidity();
};

const createNonCapacityOption = (index) => {
  const newOption = document.createElement('option');
  newOption.value = index;
  newOption.textContent = 'не для гостей';
  adFormCapacity.appendChild(newOption);
  adFormCapacity.disabled = true;
};

const createCapacityList = (index) => {
  for (let i = 1; i <= index; i++) {
    const newOption = document.createElement('option');
    newOption.value = i;
    newOption.textContent = `для ${i} ${i === 1 ? 'гостя' : 'гостей'}`;
    adFormCapacity.disabled = false;
    adFormCapacity.appendChild(newOption);
  }
};

const onTimeChange = function (evt) {
  if (evt.target === adFormTimeIn) {
    adFormTimeOut.selectedIndex = this.selectedIndex;
  }
  adFormTimeIn.selectedIndex = this.selectedIndex;
};

const onPriceInput = () => {
  const priceValue = adFormPrice.value;

  if (priceValue > PRICE_MAX) {
    adFormPrice.setCustomValidity(`Максимальная цена: ${PRICE_MAX} руб. Уменьшите цену на ${priceValue - PRICE_MAX} руб.`);
  } else if (priceValue < minPrice) {
    adFormPrice.setCustomValidity(`Минимальная цена: ${minPrice} руб.`);
  } else {
    adFormPrice.setCustomValidity('');
  }

  adFormPrice.reportValidity();
};

const onTypeChange = () => {
  const currentType = adFormType.value;
  minPrice = offerMinPrices[currentType];
  adFormPrice.placeholder = minPrice;
};

const onRoomAndGuestsChange = () => {
  const roomNumberValue = adFormRoomNumber.value;
  if (roomNumberValue === '100') {
    adFormCapacity.innerHTML = '';
    createNonCapacityOption(0);
  } else {
    adFormCapacity.innerHTML = '';
    createCapacityList(roomNumberValue);
  }
  adFormRoomNumber.reportValidity();
};

const onAddressInput = () => {
  adFormAddress.setCustomValidity('В это поле ничего вводить нельзя, удалите всё введёное пожалуйста!');
  adFormAddress.reportValidity();
};

const inactiveState = () => {
  adForm.classList.add('ad-form--disabled');
  adFormFieldsets.forEach((fieldset) => fieldset.setAttribute('disabled', 'disabled'));
  mapFilters.classList.add('map__filters--disabled');
  mapFiltersFieldsets.forEach((fieldset) => fieldset.setAttribute('disabled', 'disabled'));
  mapFiltersSelects.forEach((select) => select.setAttribute('disabled', 'disabled'));

  adFormAddress.removeEventListener('input', onAddressInput);
  adFormType.removeEventListener('change', onTypeChange);
  adFormRoomNumber.removeEventListener('change', onRoomAndGuestsChange);
  adFormTimeIn.removeEventListener('change', onTimeChange);
  adFormTimeOut.removeEventListener('change', onTimeChange);
  adFormTitle.removeEventListener('input', onTitleInput);
  adFormPrice.removeEventListener('input', onPriceInput);
  resetButton.removeEventListener('click', () => {
    adForm.reset();
  });
};

inactiveState();

const activeState = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormFieldsets.forEach((fieldset) => fieldset.removeAttribute('disabled'));
  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersFieldsets.forEach((fieldset) => fieldset.removeAttribute('disabled'));
  mapFiltersSelects.forEach((select) => select.removeAttribute('disabled'));

  adFormAddress.addEventListener('input', onAddressInput);
  adFormType.addEventListener('change', onTypeChange);
  adFormRoomNumber.addEventListener('change', onRoomAndGuestsChange);
  adFormTimeIn.addEventListener('change', onTimeChange);
  adFormTimeOut.addEventListener('change', onTimeChange);
  adFormTitle.addEventListener('input', onTitleInput);
  adFormPrice.addEventListener('input', onPriceInput);
  resetButton.addEventListener('click', () => {
    adForm.reset();
  });
};

const setUserFormSubmit = (onSuccess, onFail) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target),
    );
  });
};

export { inactiveState, activeState, adFormAddress, setUserFormSubmit, adForm, resetButton };
