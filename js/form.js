const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');
const mapFiltersSelects = mapFilters.querySelectorAll('select');

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

export { inactiveState, activeState };
