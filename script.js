'use strict';

// select input field
const inputEl = document.getElementById('inp-word');

// select output field
const soundEl = document.getElementById('sound');

// select button
const btnSearch = document.getElementById('search-btn');

// select container
const resultEl = document.getElementById('result');

const checkInputValidation = function () {
  if (inputEl.value !== '') {
    return true;
  }
  return false;
};

const printErrorMessage = function (message) {
  resultEl.innerHTML = `<div class="error">${message}</div>`;
};

const renderData = function (data) {
  const html = `
  <div class="word">
   <h3>${data.word}</h3>
   <button onclick ="playSound()">
    <i class="fas fa-volume-up"></i>
   </button>
  </div>
  <div class="details">
   <p>${data.meanings[0].partOfSpeech}</p>
   <p>/${data.phonetics[0].text || data.phonetics[1].text}/</p>
  </div>
  <p class="word-meaning">${data.meanings[0].definitions[0].definition}</p>
  <p class="word-example">${data.meanings[0].definitions[0].example || ''}</p>`;
  soundEl.setAttribute(
    'src',
    `${data.phonetics[0].audio || data.phonetics[1].audio}`
  );
  // btnSound.addEventListener('click', function () {
  //   soundEl.play();
  // });
  resultEl.insertAdjacentHTML('beforeend', html);
};

const getData = async function (word) {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  const [data] = await response.json();
  console.log(data);
  renderData(data);
};

const search = function () {
  resultEl.innerHTML = '';
  if (checkInputValidation()) {
    getData(inputEl.value);
  } else {
    printErrorMessage('Please! write word');
  }
  inputEl.value = '';
};

// search for word
btnSearch.addEventListener('click', search);
document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    search();
    inputEl.blur();
  }
});

const playSound = function () {
  soundEl.play();
};
