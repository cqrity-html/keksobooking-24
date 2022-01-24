import { mapFilters } from './form.js';
import { removeMarkers, createMarker } from './map.js';

const MIDDLE = 10000;
const HIGH = 50000;
const OFFERS_COUNT = 10;

const typeFilter = mapFilters.querySelector('#housing-type');
const priceFilter = mapFilters.querySelector('#housing-price');
const roomsFilter = mapFilters.querySelector('#housing-rooms');
const guestsFilter = mapFilters.querySelector('#housing-guests');
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
let wifiFilterValue = '';
let dishwasherFilterValue = '';
let parkingFilterValue = '';
let washerFilterValue = '';
let elevatorFilterValue = '';
let conditionerFilterValue = '';
let filteredOffers = [];

const filterCards = (cards, type, price, rooms, guests, wifi, dishwasher, parking, washer, elevator, conditioner) => {
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

  if (wifi) {
    filteredOffersValue = filteredOffersValue.filter((card) => wifi(card));
  }

  if (dishwasher) {
    filteredOffersValue = filteredOffersValue.filter((card) => dishwasher(card));
  }

  if (parking) {
    filteredOffersValue = filteredOffersValue.filter((card) => parking(card));
  }

  if (washer) {
    filteredOffersValue = filteredOffersValue.filter((card) => washer(card));
  }

  if (elevator) {
    filteredOffersValue = filteredOffersValue.filter((card) => elevator(card));
  }

  if (conditioner) {
    filteredOffersValue = filteredOffersValue.filter((card) => conditioner(card));
  }

  return filteredOffersValue;
};

const setFiltersClick = (cb, cards) => {
  typeFilter.addEventListener('change', () => {
    typeFilterValue = typeFilter.value;
    removeMarkers();
    filteredOffers = filterCards(
      cards,
      typeFilterValue,
      priceFilterValue,
      roomsFilterValue,
      guestsFilterValue,
      wifiFilterValue,
      dishwasherFilterValue,
      parkingFilterValue,
      washerFilterValue,
      elevatorFilterValue,
      conditionerFilterValue);
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

    filteredOffers = filterCards(
      cards,
      typeFilterValue,
      priceFilterValue,
      roomsFilterValue,
      guestsFilterValue,
      wifiFilterValue,
      dishwasherFilterValue,
      parkingFilterValue,
      washerFilterValue,
      elevatorFilterValue,
      conditionerFilterValue);
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

    filteredOffers = filterCards(
      cards,
      typeFilterValue,
      priceFilterValue,
      roomsFilterValue,
      guestsFilterValue,
      wifiFilterValue,
      dishwasherFilterValue,
      parkingFilterValue,
      washerFilterValue,
      elevatorFilterValue,
      conditionerFilterValue);
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

    filteredOffers = filterCards(
      cards,
      typeFilterValue,
      priceFilterValue,
      roomsFilterValue,
      guestsFilterValue,
      wifiFilterValue,
      dishwasherFilterValue,
      parkingFilterValue,
      washerFilterValue,
      elevatorFilterValue,
      conditionerFilterValue);
    cb(filteredOffers);
  });

  wifiFeature.addEventListener('change', () => {
    const isWifi = (offer) => offer.offer.features && offer.offer.features.includes(wifiFeature.value);
    if (wifiFeature.checked) {
      wifiFilterValue = isWifi;
    } else {
      wifiFilterValue = '';
    }
    removeMarkers();

    filteredOffers = filterCards(
      cards,
      typeFilterValue,
      priceFilterValue,
      roomsFilterValue,
      guestsFilterValue,
      wifiFilterValue,
      dishwasherFilterValue,
      parkingFilterValue,
      washerFilterValue,
      elevatorFilterValue,
      conditionerFilterValue);
    cb(filteredOffers);
  });

  dishwasherFeature.addEventListener('change', () => {
    const isDishwasher = (offer) => offer.offer.features && offer.offer.features.includes(dishwasherFeature.value);
    if (dishwasherFeature.checked) {
      dishwasherFilterValue = isDishwasher;
    } else {
      dishwasherFilterValue = '';
    }
    removeMarkers();

    filteredOffers = filterCards(
      cards,
      typeFilterValue,
      priceFilterValue,
      roomsFilterValue,
      guestsFilterValue,
      wifiFilterValue,
      dishwasherFilterValue,
      parkingFilterValue,
      washerFilterValue,
      elevatorFilterValue,
      conditionerFilterValue);
    cb(filteredOffers);
  });

  parkingFeature.addEventListener('change', () => {
    const isParking = (offer) => offer.offer.features && offer.offer.features.includes(parkingFeature.value);
    if (parkingFeature.checked) {
      parkingFilterValue = isParking;
    } else {
      parkingFilterValue = '';
    }
    removeMarkers();

    filteredOffers = filterCards(
      cards,
      typeFilterValue,
      priceFilterValue,
      roomsFilterValue,
      guestsFilterValue,
      wifiFilterValue,
      dishwasherFilterValue,
      parkingFilterValue,
      washerFilterValue,
      elevatorFilterValue,
      conditionerFilterValue);
    cb(filteredOffers);
  });

  washerFeature.addEventListener('change', () => {
    const isWasher = (offer) => offer.offer.features && offer.offer.features.includes(washerFeature.value);
    if (washerFeature.checked) {
      washerFilterValue = isWasher;
    } else {
      washerFilterValue = '';
    }
    removeMarkers();

    filteredOffers = filterCards(
      cards,
      typeFilterValue,
      priceFilterValue,
      roomsFilterValue,
      guestsFilterValue,
      wifiFilterValue,
      dishwasherFilterValue,
      parkingFilterValue,
      washerFilterValue,
      elevatorFilterValue,
      conditionerFilterValue);
    cb(filteredOffers);
  });

  elevatorFeature.addEventListener('change', () => {
    const isElevator = (offer) => offer.offer.features && offer.offer.features.includes(elevatorFeature.value);
    if (elevatorFeature.checked) {
      elevatorFilterValue = isElevator;
    } else {
      elevatorFilterValue = '';
    }
    removeMarkers();

    filteredOffers = filterCards(
      cards,
      typeFilterValue,
      priceFilterValue,
      roomsFilterValue,
      guestsFilterValue,
      wifiFilterValue,
      dishwasherFilterValue,
      parkingFilterValue,
      washerFilterValue,
      elevatorFilterValue,
      conditionerFilterValue);
    cb(filteredOffers);
  });

  conditionerFeature.addEventListener('change', () => {
    const isConditioner = (offer) => offer.offer.features && offer.offer.features.includes(conditionerFeature.value);
    if (conditionerFeature.checked) {
      conditionerFilterValue = isConditioner;
    } else {
      conditionerFilterValue = '';
    }
    removeMarkers();

    filteredOffers = filterCards(
      cards,
      typeFilterValue,
      priceFilterValue,
      roomsFilterValue,
      guestsFilterValue,
      wifiFilterValue,
      dishwasherFilterValue,
      parkingFilterValue,
      washerFilterValue,
      elevatorFilterValue,
      conditionerFilterValue);
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
  if (wifiFeature.checked && offer.offer.features && offer.offer.features.includes(wifiFeature.value)) {
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

export { /* setFeaturesClick, */ setFiltersClick, addMarkers };
