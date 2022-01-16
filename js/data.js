import { getRandomPositiveInteger, getRandomPositiveFloat, createIdGenerator } from './utils.js';

const OFFERS_QUANTITY = 10;
const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTO_LINKS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const generatePhotoId = createIdGenerator();

function createOffer() {
  const offerObj = {
    author: {
      avatar: `img/avatars/user${generatePhotoId()}.png`,
    },
    location: {
      lat: getRandomPositiveFloat(35.65000, 35.70000),
      lng: getRandomPositiveFloat(139.70000, 139.80000),
    },
    offer: {
      title: 'Заголовок предложения.',
      address: '',
      price: getRandomPositiveInteger(6000, 60000),
      type: OFFER_TYPES[getRandomPositiveInteger(0, OFFER_TYPES.length - 1)],
      rooms: getRandomPositiveInteger(1, 3),
      guests: getRandomPositiveInteger(0, 2),
      checkin: CHECK_TIMES[getRandomPositiveInteger(0, CHECK_TIMES.length - 1)],
      checkout: CHECK_TIMES[getRandomPositiveInteger(0, CHECK_TIMES.length - 1)],
      features: FEATURES.slice(0, getRandomPositiveInteger(1, 6)),
      description: 'Описание помещения.',
      photos: PHOTO_LINKS.slice(0, getRandomPositiveInteger(1, 3)),
    },
  };
  offerObj.offer.address = `${offerObj.location.lat}, ${offerObj.location.lng}`;
  return offerObj;
}

const offers = Array.from({ length: OFFERS_QUANTITY }, createOffer);
export { offers };
