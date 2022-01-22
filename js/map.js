import { activeState, adFormAddress, resetButton } from './form.js';
import { createCustomPopup } from './popup.js';

const map = L.map('map')
  .on('load', () => {
    activeState();
  })
  .setView({
    lat: 35.67557,
    lng: 139.74747,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMarkerIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: 35.67557,
    lng: 139.74747,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

adFormAddress.value = `${mainMarker._latlng.lat}, ${mainMarker._latlng.lng}`;

mainMarker.on('moveend', () => {
  adFormAddress.value = `${mainMarker._latlng.lat.toFixed(5)}, ${mainMarker._latlng.lng.toFixed(5)}`;
});

mainMarker.addTo(map);

const resetMap = () => {
  mainMarker.setLatLng({
    lat: 35.67557,
    lng: 139.74747,
  });

  map.setView({
    lat: 35.67557,
    lng: 139.74747,
  }, 14);
};

resetButton.addEventListener('click', resetMap);

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (card) => {
  const lat = card.location.lat;
  const lng = card.location.lng;
  const markerIcon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
  const marker = L.marker({ lat, lng }, { icon: markerIcon });

  marker.addTo(markerGroup).bindPopup(createCustomPopup(card));
};

const removeMarkers = () => {
  markerGroup.clearLayers();
};

export { resetMap, removeMarkers, createMarker };
