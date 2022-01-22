import { mapFilters } from './form.js';
import { removeMarkers } from './map.js';

const MIDDLE = 10000;
const HIGH = 50000;

const typeFilter = mapFilters.querySelector('#housing-type');
const priceFilter = mapFilters.querySelector('#housing-price');
const roomsFilter = mapFilters.querySelector('#housing-rooms');
const guestsFilter = mapFilters.querySelector('#housing-guests');
const featuresFilters = mapFilters.querySelectorAll('input[name="features"]');
/*
const wifiFeature = mapFilters.querySelector('#filter-wifi');
const dishwasherFeature = mapFilters.querySelector('#filter-dishwasher');
const parkingFeature = mapFilters.querySelector('#filter-parking');
const washerFeature = mapFilters.querySelector('#filter-washer');
const elevatorFeature = mapFilters.querySelector('#filter-elevator');
const conditionerFeature = mapFilters.querySelector('#filter-conditioner');
*/

const onFilterChange = (evt) => {
  const filterValue = evt.target.value;
  console.log(filterValue);
};

roomsFilter.addEventListener('change', onFilterChange);
guestsFilter.addEventListener('change', onFilterChange);
featuresFilters.forEach((filter) => filter.addEventListener('change', onFilterChange));

const setTypeClick = (cb, cards) => {
  typeFilter.addEventListener('change', (evt) => {
    const filterValue = evt.target.value;
    const filteredOffers = cards.filter((offer) => offer.offer.type === filterValue);
    removeMarkers();
    cb(filteredOffers);
  });
};

const setPriceClick = (cb, cards) => {
  priceFilter.addEventListener('change', (evt) => {
    const filterValue = evt.target.value;
    const isLowPrice = (offer) => offer.offer.price < MIDDLE;
    const isMiddlePrice = (offer) => offer.offer.price >= MIDDLE && offer.offer.price <= HIGH;
    const isHighPrice = (offer) => offer.offer.price > HIGH;
    let filteredOffers = [];
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
};

const setRoomsClick = (cb, cards) => {
  roomsFilter.addEventListener('change', (evt) => {
    const filterValue = evt.target.value;
    const filteredOffers = cards.filter((offer) => offer.offer.rooms === filterValue);
    removeMarkers();
    cb(filteredOffers);
  });
};
const setGuestsClick = (cb, cards) => {
  guestsFilter.addEventListener('change', (evt) => {
    const filterValue = evt.target.value;
    const filteredOffers = cards.filter((offer) => offer.offer.guests === filterValue);
    removeMarkers();
    cb(filteredOffers);
  });
};

const getOfferRank = (offer) => {
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
  return rank;
};

const compareOffers = (offerA, offerB) => {
  const rankA = getOfferRank(offerA);
  const rankB = getOfferRank(offerB);

  return rankB - rankA;
};

const setFeaturesClick = (cb, cards) => {
  for (let i = 0; i < featuresFilters.length; i++) {
    featuresFilters[i].addEventListener('click', () => {
      if (featuresFilters[i].checked) {
        removeMarkers();
        cb(cards);
      } else { removeMarkers(); }
    });
  }
};

export { typeFilter, priceFilter, roomsFilter, guestsFilter, featuresFilters, onFilterChange, compareOffers, setFeaturesClick, setTypeClick, setPriceClick, setRoomsClick, setGuestsClick };
