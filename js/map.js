import { activeState, adFormAddress } from './form.js';
//import { offers } from './temp_data.js';
import { db } from './db.js';
import { createCustomPopup } from './popup.js';

const map = L.map('map')
  .on('load', () => {
    activeState();
  })
  .setView({
    lat: 35.6895000,
    lng: 139.6917100,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMarkerIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: 35.6895000,
    lng: 139.6917100,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

adFormAddress.placeholder = `${mainMarker._latlng.lat}, ${mainMarker._latlng.lng}`;

mainMarker.on('moveend', () => {
  adFormAddress.placeholder = `${mainMarker._latlng.lat.toFixed(5)}, ${mainMarker._latlng.lng.toFixed(5)}`;
});

mainMarker.addTo(map);

db.forEach((card) => {
  const lat = card.location.lat;
  const lng = card.location.lng;
  const markerIcon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
  const marker = L.marker({ lat, lng }, { icon: markerIcon });

  marker.addTo(map).bindPopup(createCustomPopup(card));
});
