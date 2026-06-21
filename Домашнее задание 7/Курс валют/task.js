'use strict';

const loader = document.getElementById('loader');
const itemsContainer = document.getElementById('items');

fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
    .then(response => response.json())
    .then(data => {
        loader.classList.remove('loader_active');
        const valute = data.response.Valute;

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
    })
    .catch(error => {
        loader.classList.remove('loader_active');
        itemsContainer.innerHTML = '<p>Ошибка загрузки данных</p>';
        console.error('Ошибка:', error);
    });