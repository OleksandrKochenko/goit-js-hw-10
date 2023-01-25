import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(() => {
    if (input.value.trim() === '') {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      return
    };
    fetchCountries(input.value.trim())
        .then((countries) => {
          if (countries.length > 10) {
            countryList.innerHTML = '';
            countryInfo.innerHTML = '';
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            return
          };
          if (countries.length === 1) {
            countryList.innerHTML = '';
            renderCountryInfo(countries);
            return
          };
          countryInfo.innerHTML = '';
          renderCountryList(countries);
        })
      .catch(() => {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        Notiflix.Notify.failure('Oops, there is no country with that name');
        });
}, DEBOUNCE_DELAY));

function renderCountryList(countries) {
  const markup = countries
    .map((country) => {
      return `<li class="country-name">
    <img src="${country.flags.svg}" alt="country flag" width="50">
    <p>${country.name.common}</p>
    </li>`
    })
    .join('');
  countryList.innerHTML = markup;
};

function renderCountryInfo(countries) {
  const country = countries[0];
  const langs = Object.values(country.languages).join(', ');
  const markup = `<div class="title">
      <img src="${country.flags.svg}" alt="country flag" width="50">
      <span class="country-title">${country.name.common}</span>
      </div>
      <p><span class="field">Oficial name: </span>${country.name.official}</p>
      <p><span class="field">Capital: </span>${country.capital}</p>
      <p><span class="field">Population: </span>${country.population}</p>
      <p><span class="field">Languages: </span>${langs}</p>`;
  countryInfo.innerHTML = markup;
}
