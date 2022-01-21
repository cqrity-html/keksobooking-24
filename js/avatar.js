const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('.ad-form-header__input');
const photoChooser = document.querySelector('.ad-form__input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoPreview = document.querySelector('.ad-form__photo');
const photoPreviewContainer = document.querySelector('.ad-form__photo-container');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

photoChooser.addEventListener('change', () => {
  const file = photoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (photoPreview.style.backgroundImage === '') {
    if (matches) {
      photoPreview.style.backgroundImage = `url("${URL.createObjectURL(file)}")`;
    }
  } else {
    const previewElement = photoPreview.cloneNode(true);
    photoPreviewContainer.appendChild(previewElement);
    if (matches) {
      photoPreview.style.backgroundImage = `url("${URL.createObjectURL(file)}")`;
    }
  }
});
