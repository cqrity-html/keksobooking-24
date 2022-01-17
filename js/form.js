const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
const PRICE_MAX = 1000000;

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');
const mapFiltersSelects = mapFilters.querySelectorAll('select');
const adFormTitle = adForm.querySelector('#title');
const adFormPrice = adForm.querySelector('#price');
const adFormRoomNumber = adForm.querySelector('#room_number');
const adFormCapacity = adForm.querySelector('#capacity');

const inactiveState = () => {
  adForm.classList.add('ad-form--disabled');
  adFormFieldsets.forEach((fieldset) => fieldset.setAttribute('disabled', 'disabled'));
  mapFilters.classList.add('map__filters--disabled');
  mapFiltersFieldsets.forEach((fieldset) => fieldset.setAttribute('disabled', 'disabled'));
  mapFiltersSelects.forEach((select) => select.setAttribute('disabled', 'disabled'));
};

const activeState = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormFieldsets.forEach((fieldset) => fieldset.removeAttribute('disabled'));
  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersFieldsets.forEach((fieldset) => fieldset.removeAttribute('disabled'));
  mapFiltersSelects.forEach((select) => select.removeAttribute('disabled'));
};

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

const onPriceInput = () => {
  const priceValue = adFormPrice.value;

  if (priceValue > PRICE_MAX) {
    adFormPrice.setCustomValidity(`Максимальная цена: ${PRICE_MAX} руб. Уменьшите цену на ${priceValue - PRICE_MAX} руб.`);
  } else {
    adFormPrice.setCustomValidity('');
  }

  adFormPrice.reportValidity();
};

const createNonCapacityOption = (index) => {
  const newOption = document.createElement('option');
  newOption.value = index;
  newOption.textContent = 'не для гостей';
  adFormCapacity.appendChild(newOption);
};

const createCapacityList = (index) => {
  for (let i = 1; i <= index; i++) {
    const newOption = document.createElement('option');
    newOption.value = i;
    newOption.textContent = `для ${i} ${i === 1 ? 'гостя' : 'гостей'}`;
    adFormCapacity.appendChild(newOption);
  }
};

adFormRoomNumber.addEventListener('change', () => {
  const roomNumberValue = adFormRoomNumber.value;
  if (roomNumberValue === '100') {
    adFormCapacity.innerHTML = '';
    createNonCapacityOption(0);
  } else {
    adFormCapacity.innerHTML = '';
    createCapacityList(roomNumberValue);
  }
  adFormRoomNumber.reportValidity();
});

adFormTitle.addEventListener('input', onTitleInput);
adFormPrice.addEventListener('input', onPriceInput);

export { inactiveState, activeState };
