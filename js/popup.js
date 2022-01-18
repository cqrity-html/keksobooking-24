const offerTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const generateFeatures = (card, cardElement) => {
  const currentFeatures = card.offer.features;
  const featuresContainer = cardElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');

  if (currentFeatures) {
    featuresList.forEach((featuresListItem) => {
      const isNecessary = currentFeatures.some(
        (currentFeature) => featuresListItem.classList.contains(`popup__feature--${currentFeature}`),
      );

      if (!isNecessary) {
        featuresListItem.remove();
      }
    });
  }
};

const generatePhotos = (card, cardElement) => {
  cardElement.querySelector('.popup__photos').innerHTML = '';
  const currentPhotos = card.offer.photos;
  const photosContainer = cardElement.querySelector('.popup__photos');

  if (currentPhotos) {
    currentPhotos.forEach((currentPhoto) => {
      const photoElement = document.createElement('img');
      photoElement.classList.add('popup__photo');
      photoElement.width = '45';
      photoElement.height = '45';
      photoElement.src = currentPhoto;
      photosContainer.appendChild(photoElement);
    });
  }
};

const createCustomPopup = (card) => {
  const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = balloonTemplate.cloneNode(true);
  popupElement.querySelector('.popup__avatar').src = card.author.avatar;
  popupElement.querySelector('.popup__title').textContent = card.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = card.offer.address;
  popupElement.querySelector('.popup__text--price').textContent = (card.offer.price ? `${card.offer.price} ₽/ночь` : '');
  popupElement.querySelector('.popup__type').textContent = offerTypes[card.offer.type];
  popupElement.querySelector('.popup__text--capacity').textContent = (
    card.offer.rooms && card.offer.guests ?
      `${card.offer.rooms} ${card.offer.rooms === 1 ? 'комната' : 'комнаты'}
      для
      ${card.offer.guests} ${card.offer.guests === 1 ? 'гостя' : 'гостей'}` : '');
  popupElement.querySelector('.popup__text--time').textContent = (card.offer.checkin && card.offer.checkout ? `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout} ` : '');
  popupElement.querySelector('.popup__features').src = '';
  popupElement.querySelector('.popup__description').textContent = card.offer.description;
  popupElement.querySelector('.popup__photos').src = '';
  generateFeatures(card, popupElement);
  generatePhotos(card, popupElement);
  return popupElement;
};

export { createCustomPopup };
