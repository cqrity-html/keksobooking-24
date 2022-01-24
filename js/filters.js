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

const wifiFeature = mapFilters.querySelector('#filter-wifi');
const dishwasherFeature = mapFilters.querySelector('#filter-dishwasher');
const parkingFeature = mapFilters.querySelector('#filter-parking');
const washerFeature = mapFilters.querySelector('#filter-washer');
const elevatorFeature = mapFilters.querySelector('#filter-elevator');
const conditionerFeature = mapFilters.querySelector('#filter-conditioner');

let typeFilterValue = 'any';
let priceFilterValue = '';
let roomsFilterValue = '';
let guestsFilterValue = '';
let filteredOffers = [];

const filterCards = (cards, type, price, rooms, guests) => {
  let filteredOffersValue = [];

  if (type !== 'any') {
    filteredOffersValue = cards.filter((card) => card.offer.type === type);
  } else {
    filteredOffersValue = cards;
  }

  if (price) {
    filteredOffersValue = filteredOffersValue.filter((card) => price(card));
  }

  if (rooms) {
    filteredOffersValue = filteredOffersValue.filter((card) => rooms(card));
  }

  if (guests) {
    filteredOffersValue = filteredOffersValue.filter((card) => guests(card));
  }

  return filteredOffersValue;
};

const setFiltersClick = (cb, cards) => {
  typeFilter.addEventListener('change', () => {
    typeFilterValue = typeFilter.value;
    removeMarkers();
    filteredOffers = filterCards(cards, typeFilterValue, priceFilterValue, roomsFilterValue, guestsFilterValue);
    cb(filteredOffers);
  });

  priceFilter.addEventListener('change', () => {
    const isLowPrice = (offer) => offer.offer.price < MIDDLE;
    const isMiddlePrice = (offer) => offer.offer.price >= MIDDLE && offer.offer.price <= HIGH;
    const isHighPrice = (offer) => offer.offer.price > HIGH;
    if (priceFilter.value === 'low') {
      priceFilterValue = isLowPrice;
    } else if (priceFilter.value === 'middle') {
      priceFilterValue = isMiddlePrice;
    } else if (priceFilter.value === 'high') {
      priceFilterValue = isHighPrice;
    } else {
      priceFilterValue = '';
    }
    removeMarkers();

    filteredOffers = filterCards(cards, typeFilterValue, priceFilterValue, roomsFilterValue, guestsFilterValue);
    cb(filteredOffers);
  });

  roomsFilter.addEventListener('change', () => {
    const isOneRoom = (offer) => offer.offer.rooms === '1';
    const isTwoRooms = (offer) => offer.offer.rooms === '2';
    const isThreeRooms = (offer) => offer.offer.rooms === '3';
    if (roomsFilter.value === '1') {
      roomsFilterValue = isOneRoom;
    } else if (roomsFilter.value === '2') {
      roomsFilterValue = isTwoRooms;
    } else if (roomsFilter.value === '3') {
      roomsFilterValue = isThreeRooms;
    } else {
      roomsFilterValue = '';
    }

    removeMarkers();

    filteredOffers = filterCards(cards, typeFilterValue, priceFilterValue, roomsFilterValue, guestsFilterValue);
    cb(filteredOffers);
  });

  guestsFilter.addEventListener('change', () => {
    const isOneGuest = (offer) => offer.offer.guests === '1';
    const isTwoGuests = (offer) => offer.offer.guests === '2';
    const isThreeGuests = (offer) => offer.offer.guests === '3';
    if (guestsFilter.value === '1') {
      guestsFilterValue = isOneGuest;
    } else if (guestsFilter.value === '2') {
      guestsFilterValue = isTwoGuests;
    } else if (guestsFilter.value === '3') {
      guestsFilterValue = isThreeGuests;
    } else {
      guestsFilterValue = '';
    }

    removeMarkers();

    filteredOffers = filterCards(cards, typeFilterValue, priceFilterValue, roomsFilterValue, guestsFilterValue);
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
      }
    });
  }
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

const isFeatureChanged = (offer) => (
  (offer.offer.features && (
    (wifiFeature.checked && offer.offer.features.includes(`${wifiFeature.value}`))
    || (dishwasherFeature.checked && offer.offer.features.includes(`${dishwasherFeature.value}`))
    || (parkingFeature.checked && offer.offer.features.includes(`${parkingFeature.value}`))
    || (washerFeature.checked && offer.offer.features.includes(`${wifiFeature.value}`))
    || (elevatorFeature.checked && offer.offer.features.includes(`${wifiFeature.value}`))
    || (conditionerFeature.checked && offer.offer.features.includes(`${wifiFeature.value}`))))
);

const addMarkers = (cards) => {
  if (wifiFeature.checked || dishwasherFeature.checked || parkingFeature.checked || washerFeature.checked || elevatorFeature.checked || conditionerFeature.checked) {
    cards
      .filter(isFeatureChanged)
      .sort(compareOffers)
      .slice(0, OFFERS_COUNT)
      .forEach((card) => createMarker(card));
  } else {
    cards.slice(0, OFFERS_COUNT).forEach((card) => createMarker(card));
  }
};

export { setFeaturesClick, setFiltersClick, addMarkers };
