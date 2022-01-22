const getData = (onSuccess, onFail) =>
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((cards) => onSuccess(cards))
    .catch(() => {
      onFail('Не удалось загрузить данные. Попробуйте позже');
    });

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking11',
    {
      method: 'POST',
      body,
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
