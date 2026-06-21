'use strict';

const loader = document.getElementById('loader');
const itemsContainer = document.getElementById('items');
const CACHE_KEY = 'currency_data';

function renderCurrencies(data) {
    const valute = data.response.Valute;
    itemsContainer.innerHTML = '';

    for (const code in valute) {
        const currency = valute[code];
        const itemHTML = `
      <div class="item">
        <div class="item__code">${code}</div>
        <div class="item__value">${currency.Value}</div>
        <div class="item__currency">руб.</div>
      </div>
    `;
        itemsContainer.insertAdjacentHTML('beforeend', itemHTML);
    }
}

const cachedData = localStorage.getItem(CACHE_KEY);

if (cachedData) {
    renderCurrencies(JSON.parse(cachedData));
    loader.classList.remove('loader_active');
}

fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
    .then(response => response.json())
    .then(data => {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        renderCurrencies(data);
        loader.classList.remove('loader_active');
    })
    .catch(error => {
        loader.classList.remove('loader_active');
        if (!cachedData) {
            itemsContainer.innerHTML = '<p>Ошибка загрузки данных</p>';
        }
        console.error('Ошибка:', error);
    });
