import { mapFilters } from './form.js';
import { removeMarkers, createMarker } from './map.js';

const MIDDLE = 10000;
const HIGH = 50000;
const OFFERS_COUNT = 10;

const typeFilter = mapFilters.querySelector('#housing-type');
const priceFilter = mapFilters.querySelector('#housing-price');
const roomsFilter = mapFilters.querySelector('#housing-rooms');
const guestsFilter = mapFilters.querySelector('#housing-guests');
const featuresFilters = mapFilters.querySelectorAll('input[name="features"]');

const isFilterAny = (currentFilter) => currentFilter.value === 'any';

let filteredOffers = [];

const setFiltersClick = (cb, cards) => {

  typeFilter.addEventListener('change', () => {
    removeMarkers();
    cb(cards);
  });

  priceFilter.addEventListener('change', (evt) => {
    const filterValue = evt.target.value;
    const isLowPrice = (offer) => offer.offer.price < MIDDLE;
    const isMiddlePrice = (offer) => offer.offer.price >= MIDDLE && offer.offer.price <= HIGH;
    const isHighPrice = (offer) => offer.offer.price > HIGH;
    if (filterValue === 'low') {
      filteredOffers = cards.filter(isLowPrice);
    } else if (filterValue === 'middle') {
      filteredOffers = cards.filter(isMiddlePrice);
    } else if (filterValue === 'high') {
      filteredOffers = cards.filter(isHighPrice);
    } else {
      filteredOffers = cards;
    }
    removeMarkers();
    cb(filteredOffers);
  });

  roomsFilter.addEventListener('change', (evt) => {
    const filterValue = evt.target.value;
    const isManyRooms = (offer) => offer.offer.rooms >= 4 && offer.offer.rooms === filterValue;
    const isFewRooms = (offer) => offer.offer.rooms < 4 && offer.offer.rooms === filterValue;
    if (filterValue < 4) {
      filteredOffers = cards.filter(isFewRooms);
    } else if (filterValue === 4) {
      filteredOffers = cards.filter(isManyRooms);
    } else {
      filteredOffers = cards;
    }
    removeMarkers();
    cb(filteredOffers);
  });

  guestsFilter.addEventListener('change', (evt) => {
    const filterValue = evt.target.value;
    const isManyGuests = (offer) => offer.offer.guests >= 3 && offer.offer.rooms === filterValue;
    const isFewGuests = (offer) => offer.offer.guests < 3 && offer.offer.rooms === filterValue;
    if (filterValue < 3) {
      filteredOffers = cards.filter(isFewGuests);
    } else if (filterValue === 3) {
      filteredOffers = cards.filter(isManyGuests);
    } else {
      filteredOffers = cards;
    }
    removeMarkers();
    cb(filteredOffers);
  });
};

const setFeaturesClick = (cb, cards) => {
  for (let i = 0; i < featuresFilters.length; i++) {
    featuresFilters[i].addEventListener('click', (evt) => {
      if (featuresFilters[i].checked) {
        const filterValue = evt.target.value;
        filteredOffers = cards.filter((card) => featuresFilters[i].checked && card.offer.features && card.offer.features.includes(`${filterValue}`)
        );
        removeMarkers();
        cb(filteredOffers);
      } else {
        const filterValue = evt.target.value;
        filteredOffers = cards.filter((card) => !featuresFilters[i].checked && card.offer.features && !card.offer.features.includes(`${filterValue}`)
        );
        removeMarkers();
        cb(filteredOffers);
      }
    });
  }
};

const getOfferRank = (offer) => {
  const wifiFeature = mapFilters.querySelector('#filter-wifi');
  const dishwasherFeature = mapFilters.querySelector('#filter-dishwasher');
  const parkingFeature = mapFilters.querySelector('#filter-parking');
  const washerFeature = mapFilters.querySelector('#filter-washer');
  const elevatorFeature = mapFilters.querySelector('#filter-elevator');
  const conditionerFeature = mapFilters.querySelector('#filter-conditioner');

  let rank = 0;

  if (offer.offer.type === typeFilter.value) {
    rank += 1;
  }
  if (offer.offer.price === priceFilter.value) {
    rank += 1;
  }
  if (offer.offer.rooms === roomsFilter.value) {
    rank += 1;
  }
  if (offer.offer.guests === guestsFilter.value) {
    rank += 1;
  }
  if (wifiFeature.checked && offer.offer.features && offer.offer.features.includes(`${wifiFeature.value}`)) {
    rank += 1;
  }
  if (dishwasherFeature.checked && offer.offer.features && offer.offer.features.includes(dishwasherFeature.value)) {
    rank += 1;
  }
  if (parkingFeature.checked && offer.offer.features && offer.offer.features.includes(parkingFeature.value)) {
    rank += 1;
  }
  if (washerFeature.checked && offer.offer.features && offer.offer.features.includes(washerFeature.value)) {
    rank += 1;
  }
  if (elevatorFeature.checked && offer.offer.features && offer.offer.features.includes(elevatorFeature.value)) {
    rank += 1;
  }
  if (conditionerFeature.checked && offer.offer.features && offer.offer.features.includes(conditionerFeature.value)) {
    rank += 1;
  }

  return rank;
};

const compareOffers = (offerA, offerB) => {
  const rankA = getOfferRank(offerA);
  const rankB = getOfferRank(offerB);

  return rankB - rankA;
};

const isTypeChanged = (offer) => {
  if (!isFilterAny(typeFilter)) {
    return typeFilter.value === offer.offer.type;
  }
};

const addMarkers = (cards) => {
  if (isFilterAny(typeFilter) && isFilterAny(priceFilter) && isFilterAny(roomsFilter) && isFilterAny(guestsFilter)) {
    cards.slice(0, OFFERS_COUNT).forEach((card) => createMarker(card));
  } else if (!isFilterAny(typeFilter)) {
    cards.slice().filter(isTypeChanged).sort(compareOffers).slice(0, OFFERS_COUNT).forEach((card) => createMarker(card));
  } else if (!isFilterAny(priceFilter)) {
    cards.slice().sort(compareOffers).slice(0, OFFERS_COUNT).forEach((card) => createMarker(card));
  } else if (!isFilterAny(roomsFilter)) {
    cards.slice().sort(compareOffers).slice(0, OFFERS_COUNT).forEach((card) => createMarker(card));
  } else if (!isFilterAny(guestsFilter)) {
    cards.slice().sort(compareOffers).slice(0, OFFERS_COUNT).forEach((card) => createMarker(card));
  }
};

export { setFeaturesClick, setFiltersClick, addMarkers };
