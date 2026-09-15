/**
 * AURA AUTO - Простой скрипт каталога
 */

(function () {
  'use strict';

  const cars = (typeof CARS_DATA !== 'undefined') ? CARS_DATA : [];
  let selectedBrand = 'all';
  let searchQuery = '';
  let currentSort = 'default';

  function formatPrice(val) {
    return new Intl.NumberFormat('ru-RU').format(Math.round(val)) + ' ₽';
  }

  // Фильтрация и сортировка
  function getFilteredCars() {
    return cars.filter(car => {
      // По марке
      if (selectedBrand !== 'all') {
        if (!car.brand.toLowerCase().includes(selectedBrand.toLowerCase())) {
          return false;
        }
      }
      // По поиску
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const text = `${car.brand} ${car.model} ${car.color} ${car.specs.engine}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    }).sort((a, b) => {
      if (currentSort === 'price-asc') return a.price - b.price;
      if (currentSort === 'price-desc') return b.price - a.price;
      if (currentSort === 'power-desc') {
        const pA = parseInt(a.specs.power.replace(/\D/g, '')) || 0;
        const pB = parseInt(b.specs.power.replace(/\D/g, '')) || 0;
        return pB - pA;
      }
      return 0;
    });
  }

  // Отрисовка каталога
  function renderCatalog() {
    const grid = document.getElementById('carsGrid');
    if (!grid) return;

    const list = getFilteredCars();

    if (list.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: #f8fafc; border-radius: 8px;">
          <h3 style="margin-bottom: 8px;">Автомобили не найдены</h3>
          <p style="color: #64748b;">Попробуйте выбрать другую марку или сбросить поиск.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = list.map(car => `
      <article class="car-card">
        <div class="car-img-wrap">
          <img src="${car.images[0]}" alt="${car.brand} ${car.model}" class="car-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80'">
          <span class="car-badge">${car.status}</span>
        </div>

        <div class="car-body">
          <h2 class="car-title">${car.brand} ${car.model}, ${car.year}</h2>
          <div class="car-price">${formatPrice(car.price)}</div>

          <div class="car-specs-grid">
            <div class="car-spec-item">
              Мощность: <strong>${car.specs.power}</strong>
            </div>
            <div class="car-spec-item">
              Разгон 0-100: <strong>${car.specs.acceleration}</strong>
            </div>
            <div class="car-spec-item">
              Пробег: <strong>${car.specs.mileage}</strong>
            </div>
            <div class="car-spec-item">
              Привод: <strong>${car.specs.drive.split(' ')[0]}</strong>
            </div>
          </div>

          <div class="car-actions">
            <a href="tel:+74959008800" class="btn btn-dark">Позвонить</a>
            <a href="https://wa.me/79990000000?text=Здравствуйте!%20Интересует%20${encodeURIComponent(car.brand + ' ' + car.model)}" target="_blank" class="btn btn-wa">WhatsApp</a>
            <button class="btn-details" data-id="${car.id}">Все характеристики и фото</button>
          </div>
        </div>
      </article>
    `).join('');

    // Слушатели кнопок подробнее
    grid.querySelectorAll('.btn-details').forEach(btn => {
      btn.addEventListener('click', () => {
        openModal(btn.dataset.id);
      });
    });
  }

  // Модальное окно
  function openModal(id) {
    const car = cars.find(c => c.id === id);
    if (!car) return;

    const modal = document.getElementById('carModal');
    const content = document.getElementById('modalContent');
    if (!modal || !content) return;

    content.innerHTML = `
      <img src="${car.images[0]}" alt="${car.brand} ${car.model}" class="modal-img">
      <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 6px;">${car.brand} ${car.model}</h2>
      <div style="font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 16px;">${formatPrice(car.price)}</div>

      <p style="color: #475569; font-size: 14px; line-height: 1.6; margin-bottom: 16px;">${car.description}</p>

      <table class="modal-specs-table">
        <tr><td>Год выпуска</td><td>${car.year}</td></tr>
        <tr><td>Двигатель</td><td>${car.specs.engine}</td></tr>
        <tr><td>Мощность</td><td>${car.specs.power}</td></tr>
        <tr><td>Разгон 0-100 км/ч</td><td>${car.specs.acceleration}</td></tr>
        <tr><td>Максимальная скорость</td><td>${car.specs.maxSpeed}</td></tr>
        <tr><td>Коробка передач</td><td>${car.specs.transmission}</td></tr>
        <tr><td>Привод</td><td>${car.specs.drive}</td></tr>
        <tr><td>Пробег</td><td>${car.specs.mileage}</td></tr>
        <tr><td>Цвет кузова</td><td>${car.color}</td></tr>
        <tr><td>Салон</td><td>${car.interior}</td></tr>
      </table>

      <div style="font-weight: 700; margin-bottom: 8px; font-size: 14px;">Комплектация:</div>
      <ul style="padding-left: 20px; color: #475569; font-size: 13.5px; line-height: 1.6; margin-bottom: 24px;">
        ${car.features.map(f => `<li>${f}</li>`).join('')}
      </ul>

      <div style="display: flex; gap: 12px;">
        <a href="tel:+74959008800" class="btn btn-dark" style="flex: 1;">Позвонить в салон</a>
        <a href="https://wa.me/79990000000?text=Здравствуйте!%20Интересует%20${encodeURIComponent(car.brand + ' ' + car.model)}" target="_blank" class="btn btn-wa" style="flex: 1;">Написать в WhatsApp</a>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modal = document.getElementById('carModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Инициализация событий
  function initEvents() {
    // Фильтр по марке
    const brandBtns = document.querySelectorAll('.filter-btn');
    brandBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        brandBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedBrand = btn.dataset.brand;
        renderCatalog();
      });
    });

    // Поиск
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderCatalog();
      });
    }

    // Сортировка
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderCatalog();
      });
    }

    // Закрытие модального окна
    const closeBtn = document.getElementById('modalClose');
    const modal = document.getElementById('carModal');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    // Форма заявки
    const form = document.getElementById('simpleForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('formName').value;
        alert(`Спасибо, ${name}! Мы свяжемся с вами в течение 5 минут.`);
        form.reset();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderCatalog();
    initEvents();
  });
})();
