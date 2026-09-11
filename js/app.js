/**
 * AURA MOTORS - Application Script
 * Minimalist Luxury Car Dealership Frontend
 */

(function () {
  'use strict';

  // --- State ---
  let state = {
    cars: CARS_DATA || [],
    category: 'all',
    search: '',
    sortBy: 'default',
    onlyInStock: false,
    favorites: JSON.parse(localStorage.getItem('aura_favorites') || '[]'),
    selectedCarId: null
  };

  // --- Formatting Helpers ---
  function formatRubles(val) {
    return new Intl.NumberFormat('ru-RU').format(Math.round(val)) + ' ₽';
  }

  function showToast(message, icon = '✓') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span style="color: var(--accent-gold); font-weight: 700; font-size: 16px;">${icon}</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // --- Favorites Management ---
  function isFavorite(carId) {
    return state.favorites.includes(carId);
  }

  function toggleFavorite(carId) {
    const index = state.favorites.indexOf(carId);
    const car = state.cars.find(c => c.id === carId);
    const carName = car ? `${car.brand} ${car.model}` : 'Автомобиль';

    if (index > -1) {
      state.favorites.splice(index, 1);
      showToast(`${carName} удален из избранного`, '—');
    } else {
      state.favorites.push(carId);
      showToast(`${carName} добавлен в избранное`, '★');
    }

    localStorage.setItem('aura_favorites', JSON.stringify(state.favorites));
    updateFavoritesBadge();
    renderCatalog();
    renderFavoritesDrawer();
  }

  function updateFavoritesBadge() {
    const badge = document.getElementById('favoritesCountBadge');
    if (badge) {
      badge.textContent = state.favorites.length;
      badge.style.display = state.favorites.length > 0 ? 'flex' : 'none';
    }
  }

  // --- Catalog Rendering ---
  function getFilteredCars() {
    return state.cars.filter(car => {
      // Category filter
      if (state.category !== 'all' && car.category !== state.category) {
        return false;
      }
      // Stock filter
      if (state.onlyInStock && car.status.toLowerCase().includes('под заказ')) {
        return false;
      }
      // Search filter
      if (state.search.trim() !== '') {
        const query = state.search.toLowerCase().trim();
        const text = `${car.brand} ${car.model} ${car.color} ${car.specs.power} ${car.category}`.toLowerCase();
        if (!text.includes(query)) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (state.sortBy === 'price-asc') return a.price - b.price;
      if (state.sortBy === 'price-desc') return b.price - a.price;
      if (state.sortBy === 'power-desc') {
        const pA = parseInt(a.specs.power.replace(/\D/g, '')) || 0;
        const pB = parseInt(b.specs.power.replace(/\D/g, '')) || 0;
        return pB - pA;
      }
      if (state.sortBy === 'accel-asc') {
        const aA = parseFloat(a.specs.acceleration) || 99;
        const aB = parseFloat(b.specs.acceleration) || 99;
        return aA - aB;
      }
      return 0;
    });
  }

  function renderCatalog() {
    const grid = document.getElementById('carsGrid');
    if (!grid) return;

    const filtered = getFilteredCars();

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="no-results">
          <h3>Автомобили не найдены</h3>
          <p>По вашему запросу ничего не найдено. Попробуйте изменить параметры фильтра или поиска.</p>
          <button class="btn btn-secondary" style="margin-top: 20px;" id="resetFiltersBtn">Сбросить фильтры</button>
        </div>
      `;
      const resetBtn = document.getElementById('resetFiltersBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
      }
      return;
    }

    grid.innerHTML = filtered.map(car => {
      const fav = isFavorite(car.id);
      return `
        <article class="car-card" data-id="${car.id}">
          <div class="card-image-wrap">
            <img src="${car.images[0]}" alt="${car.brand} ${car.model}" class="card-image" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80'">
            <span class="card-badge">${car.badge || car.status}</span>
            <button class="card-favorite-btn ${fav ? 'favorited' : ''}" data-fav-id="${car.id}" aria-label="Добавить в избранное" title="В избранное">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${fav ? '#ef4444' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>

          <div class="card-body">
            <div class="card-brand">${car.brand} • ${car.year}</div>
            <h3 class="card-title">${car.model}</h3>

            <div class="card-specs">
              <div class="spec-pill">
                <span class="spec-pill-val">${car.specs.power}</span>
                <span class="spec-pill-lbl">Мощность</span>
              </div>
              <div class="spec-pill">
                <span class="spec-pill-val">${car.specs.acceleration}</span>
                <span class="spec-pill-lbl">0-100 км/ч</span>
              </div>
              <div class="spec-pill">
                <span class="spec-pill-val">${car.specs.drive.split(' ')[0]}</span>
                <span class="spec-pill-lbl">Привод</span>
              </div>
            </div>

            <div class="card-price-row">
              <div class="card-price">${formatRubles(car.price)}</div>
              <div class="card-monthly">от ${formatRubles(car.monthlyPayment)}/мес</div>
            </div>

            <div class="card-actions">
              <button class="btn-card-detail" data-detail-id="${car.id}">Подробнее</button>
              <button class="btn-card-drive" data-drive-id="${car.id}">Тест-драйв</button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach card event listeners
    grid.querySelectorAll('.card-favorite-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(btn.dataset.favId);
      });
    });

    grid.querySelectorAll('.btn-card-detail').forEach(btn => {
      btn.addEventListener('click', () => {
        openCarDetailModal(btn.dataset.detailId);
      });
    });

    grid.querySelectorAll('.btn-card-drive').forEach(btn => {
      btn.addEventListener('click', () => {
        scrollToTestDrive(btn.dataset.driveId);
      });
    });
  }

  function resetFilters() {
    state.category = 'all';
    state.search = '';
    state.sortBy = 'default';
    state.onlyInStock = false;

    // Reset controls UI
    document.querySelectorAll('.category-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.category === 'all');
    });
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';

    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) sortSelect.value = 'default';

    const inStockOnly = document.getElementById('inStockOnly');
    if (inStockOnly) inStockOnly.checked = false;

    renderCatalog();
  }

  // --- Modal: Car Detail Quick View ---
  function openCarDetailModal(carId) {
    const car = state.cars.find(c => c.id === carId);
    if (!car) return;

    state.selectedCarId = carId;
    const modal = document.getElementById('carModal');
    const content = document.getElementById('modalCarContent');
    if (!modal || !content) return;

    const fav = isFavorite(car.id);

    content.innerHTML = `
      <div class="modal-gallery">
        <div class="gallery-main">
          <img id="galleryMainImg" src="${car.images[0]}" alt="${car.brand} ${car.model}">
        </div>
        <div class="gallery-thumbs">
          ${car.images.map((img, idx) => `
            <div class="gallery-thumb ${idx === 0 ? 'active' : ''}" data-index="${idx}">
              <img src="${img}" alt="${car.model} ракурс ${idx + 1}">
            </div>
          `).join('')}
        </div>
      </div>

      <div class="modal-details">
        <div class="modal-brand">${car.brand} • ${car.year} • ${car.status}</div>
        <h2 class="modal-title">${car.model}</h2>

        <div class="modal-price-box">
          <div>
            <div class="modal-price">${formatRubles(car.price)}</div>
            <div class="modal-monthly">или в кредит от ${formatRubles(car.monthlyPayment)} / мес</div>
          </div>
          <button class="header-favorites-btn ${fav ? 'favorited' : ''}" id="modalFavToggleBtn" style="border-color: var(--border-medium);" title="В избранное">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${fav ? '#ef4444' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>

        <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6;">
          ${car.description}
        </p>

        <table class="modal-specs-table">
          <tr><td>Мощность двигателя</td><td>${car.specs.power}</td></tr>
          <tr><td>Разгон 0-100 км/ч</td><td>${car.specs.acceleration}</td></tr>
          <tr><td>Максимальная скорость</td><td>${car.specs.maxSpeed}</td></tr>
          <tr><td>Тип привода</td><td>${car.specs.drive}</td></tr>
          <tr><td>Трансмиссия</td><td>${car.specs.transmission}</td></tr>
          <tr><td>Тип топлива / Батарея</td><td>${car.specs.fuelType}</td></tr>
          <tr><td>Пробег</td><td>${car.specs.mileage}</td></tr>
          <tr><td>Цвет кузова</td><td>${car.color}</td></tr>
          <tr><td>Отделка интерьера</td><td>${car.interior}</td></tr>
        </table>

        <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--accent-gold); font-weight: 600; margin-bottom: 10px;">
          Ключевое оснащение:
        </div>
        <ul class="modal-features-list">
          ${car.features.map(f => `<li>${f}</li>`).join('')}
        </ul>

        <div class="modal-actions">
          <button class="btn btn-primary" id="modalBookDriveBtn">Записаться на тест-драйв</button>
          <button class="btn btn-secondary" id="modalCalcCreditBtn">Рассчитать в калькуляторе</button>
        </div>
      </div>
    `;

    // Thumbnails click handler
    const mainImg = content.querySelector('#galleryMainImg');
    const thumbs = content.querySelectorAll('.gallery-thumb');
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const idx = parseInt(thumb.dataset.index);
        if (mainImg) mainImg.src = car.images[idx];
      });
    });

    // Favorite button in modal
    const favBtn = content.querySelector('#modalFavToggleBtn');
    if (favBtn) {
      favBtn.addEventListener('click', () => {
        toggleFavorite(car.id);
        const updatedFav = isFavorite(car.id);
        const svg = favBtn.querySelector('svg');
        if (svg) svg.setAttribute('fill', updatedFav ? '#ef4444' : 'none');
      });
    }

    // Modal buttons
    const bookDriveBtn = content.querySelector('#modalBookDriveBtn');
    if (bookDriveBtn) {
      bookDriveBtn.addEventListener('click', () => {
        closeCarDetailModal();
        scrollToTestDrive(car.id);
      });
    }

    const calcCreditBtn = content.querySelector('#modalCalcCreditBtn');
    if (calcCreditBtn) {
      calcCreditBtn.addEventListener('click', () => {
        closeCarDetailModal();
        setCalculatorCarPrice(car.price);
      });
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCarDetailModal() {
    const modal = document.getElementById('carModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // --- Financial & Trade-In Calculator ---
  function initCalculator() {
    const priceRange = document.getElementById('calcPriceRange');
    const downRange = document.getElementById('calcDownRange');
    const durationRange = document.getElementById('calcDurationRange');
    const tradeInCheck = document.getElementById('calcTradeInCheck');

    if (!priceRange || !downRange || !durationRange) return;

    function updateCalculations() {
      const price = parseFloat(priceRange.value);
      const downPercent = parseFloat(downRange.value);
      const duration = parseInt(durationRange.value);
      const hasTradeIn = tradeInCheck ? tradeInCheck.checked : false;

      // Down payment amount
      const downAmount = price * (downPercent / 100);
      const tradeInBonus = hasTradeIn ? 500000 : 0;
      
      // Effective loan principal
      const loanPrincipal = Math.max(0, price - downAmount - tradeInBonus);

      // Annual interest rate: 4.9% with trade-in, 5.9% without
      const annualRate = hasTradeIn ? 0.049 : 0.059;
      const monthlyRate = annualRate / 12;

      // Annuity Formula: P = L * [r(1+r)^n] / [(1+r)^n - 1]
      let monthlyPayment = 0;
      if (loanPrincipal > 0) {
        monthlyPayment = loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, duration)) / (Math.pow(1 + monthlyRate, duration) - 1);
      }

      // Update DOM
      const priceDisplay = document.getElementById('calcPriceDisplay');
      if (priceDisplay) priceDisplay.textContent = formatRubles(price);

      const downPercentDisplay = document.getElementById('calcDownPercent');
      if (downPercentDisplay) downPercentDisplay.textContent = downPercent;

      const downAmountDisplay = document.getElementById('calcDownAmountDisplay');
      if (downAmountDisplay) downAmountDisplay.textContent = formatRubles(downAmount);

      const durationDisplay = document.getElementById('calcDurationDisplay');
      if (durationDisplay) {
        const years = duration / 12;
        durationDisplay.textContent = `${duration} мес. (${years} ${years === 1 ? 'год' : years < 5 ? 'года' : 'лет'})`;
      }

      const monthlyDisplay = document.getElementById('calcMonthlyResult');
      if (monthlyDisplay) {
        monthlyDisplay.innerHTML = `${formatRubles(monthlyPayment)} <span style="font-size: 16px; font-weight: 400; color: var(--text-muted);">/ мес</span>`;
      }

      const loanSumDisplay = document.getElementById('calcLoanSumDisplay');
      if (loanSumDisplay) loanSumDisplay.textContent = formatRubles(loanPrincipal);

      const rateDisplay = document.getElementById('calcRateDisplay');
      if (rateDisplay) {
        rateDisplay.textContent = hasTradeIn ? 'от 4.9% (Trade-in бонус)' : 'от 5.9% годовых';
      }

      const tradeBonusDisplay = document.getElementById('calcTradeBonusDisplay');
      if (tradeBonusDisplay) {
        tradeBonusDisplay.textContent = hasTradeIn ? '-500 000 ₽' : '0 ₽';
        tradeBonusDisplay.style.color = hasTradeIn ? 'var(--accent-gold)' : 'var(--text-muted)';
      }
    }

    priceRange.addEventListener('input', updateCalculations);
    downRange.addEventListener('input', updateCalculations);
    durationRange.addEventListener('input', updateCalculations);
    if (tradeInCheck) tradeInCheck.addEventListener('change', updateCalculations);

    const applyBtn = document.getElementById('calcApplyBtn');
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        showToast('Заявка на расчет одобрения сформирована! Менеджер свяжется с вами.', '✓');
      });
    }

    updateCalculations();
  }

  function setCalculatorCarPrice(price) {
    const priceRange = document.getElementById('calcPriceRange');
    const calcSection = document.getElementById('calculator');
    if (priceRange && calcSection) {
      priceRange.value = Math.min(50000000, Math.max(10000000, price));
      priceRange.dispatchEvent(new Event('input'));
      calcSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // --- Favorites Drawer ---
  function renderFavoritesDrawer() {
    const list = document.getElementById('drawerItemsList');
    const totalCount = document.getElementById('drawerTotalCount');
    const totalPrice = document.getElementById('drawerTotalPrice');
    if (!list) return;

    const favoriteCars = state.cars.filter(c => state.favorites.includes(c.id));

    if (favoriteCars.length === 0) {
      list.innerHTML = `
        <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 12px; opacity: 0.5;">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <div style="font-size: 15px; color: var(--text-primary); font-weight: 600; margin-bottom: 6px;">Список избранного пуст</div>
          <p style="font-size: 13px;">Нажмите на значок сердца на карточке автомобиля, чтобы сохранить его.</p>
        </div>
      `;
      if (totalCount) totalCount.textContent = '0';
      if (totalPrice) totalPrice.textContent = '0 ₽';
      return;
    }

    const sum = favoriteCars.reduce((acc, c) => acc + c.price, 0);

    list.innerHTML = favoriteCars.map(car => `
      <div class="drawer-item">
        <img src="${car.images[0]}" alt="${car.model}" class="drawer-item-img">
        <div class="drawer-item-info">
          <div class="drawer-item-title">${car.brand} ${car.model}</div>
          <div class="drawer-item-price">${formatRubles(car.price)}</div>
        </div>
        <button class="drawer-item-remove" data-remove-id="${car.id}" title="Удалить из избранного">✕</button>
      </div>
    `).join('');

    if (totalCount) totalCount.textContent = `${favoriteCars.length} авто`;
    if (totalPrice) totalPrice.textContent = formatRubles(sum);

    list.querySelectorAll('.drawer-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        toggleFavorite(btn.dataset.removeId);
      });
    });
  }

  function openFavoritesDrawer() {
    renderFavoritesDrawer();
    const drawer = document.getElementById('favoritesDrawer');
    if (drawer) {
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeFavoritesDrawer() {
    const drawer = document.getElementById('favoritesDrawer');
    if (drawer) {
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // --- Test-Drive Form Handling ---
  function initTestDriveForm() {
    const select = document.getElementById('tdCarSelect');
    const form = document.getElementById('testDriveForm');
    const dateInput = document.getElementById('tdDate');

    if (select) {
      select.innerHTML = state.cars.map(c => `
        <option value="${c.id}">${c.brand} ${c.model} (${c.specs.power})</option>
      `).join('');
    }

    // Set tomorrow as min date
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.min = tomorrow.toISOString().split('T')[0];
      dateInput.value = tomorrow.toISOString().split('T')[0];
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedCar = state.cars.find(c => c.id === select.value);
        const name = document.getElementById('tdName').value;
        const carName = selectedCar ? `${selectedCar.brand} ${selectedCar.model}` : 'Автомобиль';

        showToast(`Благодарим, ${name}! Запись на тест-драйв ${carName} подтверждена.`, '★');
        form.reset();
        if (dateInput) dateInput.value = tomorrow.toISOString().split('T')[0];
      });
    }
  }

  function scrollToTestDrive(carId) {
    const section = document.getElementById('testdrive');
    const select = document.getElementById('tdCarSelect');
    if (select && carId) {
      select.value = carId;
    }
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // --- General Event Listeners & Modals ---
  function initEvents() {
    // Header scroll background
    window.addEventListener('scroll', () => {
      const header = document.getElementById('header');
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 40);
      }
    });

    // Category pills filter
    const pills = document.querySelectorAll('.category-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.category = pill.dataset.category;
        renderCatalog();
      });
    });

    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.search = e.target.value;
        renderCatalog();
      });
    }

    // Sort select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        renderCatalog();
      });
    }

    // In Stock toggle
    const inStockToggle = document.getElementById('inStockOnly');
    if (inStockToggle) {
      inStockToggle.addEventListener('change', (e) => {
        state.onlyInStock = e.target.checked;
        renderCatalog();
      });
    }

    // Close Car Detail Modal
    const closeCarModalBtn = document.getElementById('closeCarModalBtn');
    const carModal = document.getElementById('carModal');
    if (closeCarModalBtn) {
      closeCarModalBtn.addEventListener('click', closeCarDetailModal);
    }
    if (carModal) {
      carModal.addEventListener('click', (e) => {
        if (e.target === carModal) closeCarDetailModal();
      });
    }

    // Favorites drawer events
    const openFavBtn = document.getElementById('openFavoritesBtn');
    const closeFavBtn = document.getElementById('closeFavoritesBtn');
    const favDrawer = document.getElementById('favoritesDrawer');
    if (openFavBtn) openFavBtn.addEventListener('click', openFavoritesDrawer);
    if (closeFavBtn) closeFavBtn.addEventListener('click', closeFavoritesDrawer);
    if (favDrawer) {
      favDrawer.addEventListener('click', (e) => {
        if (e.target === favDrawer) closeFavoritesDrawer();
      });
    }

    const drawerInquiryBtn = document.getElementById('drawerInquiryBtn');
    if (drawerInquiryBtn) {
      drawerInquiryBtn.addEventListener('click', () => {
        if (state.favorites.length === 0) {
          showToast('Добавьте автомобили в избранное для запроса', '!');
          return;
        }
        closeFavoritesDrawer();
        showToast('Коммерческое предложение по избранным автомобилям сформировано!', '✓');
      });
    }

    // Quick Call Modal
    const consultBtn = document.getElementById('headerConsultBtn');
    const quickModal = document.getElementById('quickCallModal');
    const closeQuickBtn = document.getElementById('closeQuickCallBtn');
    const quickForm = document.getElementById('quickCallForm');

    if (consultBtn && quickModal) {
      consultBtn.addEventListener('click', () => {
        quickModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }
    if (closeQuickBtn && quickModal) {
      closeQuickBtn.addEventListener('click', () => {
        quickModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
    if (quickModal) {
      quickModal.addEventListener('click', (e) => {
        if (e.target === quickModal) {
          quickModal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
    if (quickForm) {
      quickForm.addEventListener('submit', (e) => {
        e.preventDefault();
        quickModal.classList.remove('active');
        document.body.style.overflow = '';
        showToast('Консьерж свяжется с вами в течение 5 минут', '✓');
        quickForm.reset();
      });
    }

    // Newsletter Form
    const newsForm = document.getElementById('newsletterForm');
    if (newsForm) {
      newsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Вы успешно подписались на закрытый дайджест AURA', '✓');
        newsForm.reset();
      });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.querySelector('.nav-menu');
    if (mobileMenuBtn && navMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
      });
      navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('open');
        });
      });
    }

    // ESC key closes all modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCarDetailModal();
        closeFavoritesDrawer();
        if (navMenu) navMenu.classList.remove('open');
        if (quickModal) {
          quickModal.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  }

  // --- Initialization ---
  document.addEventListener('DOMContentLoaded', () => {
    updateFavoritesBadge();
    renderCatalog();
    initCalculator();
    initTestDriveForm();
    initEvents();
  });
})();
