/* ==========================================================================
   La Sabroso Café — Shared Engine & Data-Driven Restaurant Menu Renderer
   - Data-Driven Menu Renderer from window.MENU_DATA / src/data/menu.js
   - Compact Restaurant Menu Rows with hover interactions
   - Category Tabs & Real-time Live Search
   - Interactive Lightbox & Sticky Header
   ========================================================================== */

(function () {
  'use strict';

  document.documentElement.classList.add('js');

  /* ---------- Sticky Nav Scroll Effect ---------- */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ---------- Mobile Drawer Navigation ---------- */
  const toggle = document.querySelector('.nav__toggle');
  const overlay = document.querySelector('.mobile-overlay');
  const overlayClose = document.querySelector('.mobile-overlay__close');

  const openDrawer = () => {
    if (overlay) {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (toggle) toggle.setAttribute('aria-expanded', 'true');
    }
  };

  const closeDrawer = () => {
    if (overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  };

  if (toggle) {
    toggle.addEventListener('click', openDrawer);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-haspopup', 'dialog');
  }
  if (overlayClose) {
    overlayClose.addEventListener('click', closeDrawer);
  }
  if (overlay) {
    overlay.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeDrawer();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  /* ---------- Progressive Reveal on Scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && revealEls.length && !reduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05 });
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- DATA-DRIVEN MENU RENDERER ---------- */
  const tabsWrap = document.querySelector('[data-menu-tabs]');
  const menuWrap = document.querySelector('[data-menu]');

  if (menuWrap) {
    const esc = (s) => String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

    // Clean category normalizer
    const normalizeCategory = (cat) => {
      const c = (cat || '').toLowerCase().trim();
      if (c.includes('favourite')) return 'La Sabroso Favourites';
      if (c.includes('pizza')) return 'Thin-Crust Pizzas';
      if (c.includes('pasta')) return 'Handmade Pastas & Ravioli';
      if (c.includes('burger') || c.includes('sandwich')) return 'Burgers & Artisanal Sandwiches';
      if (c.includes('momo') || c.includes('bite') || c.includes('bread') || c.includes('french fries') || c.includes('croqueta')) return 'Starters & Quick Bites';
      if (c.includes('soup') || c.includes('salad')) return 'Soups & Fresh Salads';
      if (c.includes('healthy') || c.includes('main course')) return 'Continental & Main Courses';
      if (c.includes('hot coffee') || c.includes('iced cofffee') || c.includes('cold coffee')) return 'Artisan Coffees & Cold Brews';
      if (c.includes('shake') || c.includes('beverage') || c.includes('mojito')) return 'Milkshakes, Coolers & Beverages';
      if (c.includes('dessert') || c.includes('gelato')) return 'Tableside Gelato Lab & Desserts';
      return cat;
    };

    const itemRowHTML = (item) => {
      const imgSrc = item.img || 'Food/Peppy Paneer Pizza.avif';
      return `
        <article class="menu-item-row-card" data-name="${esc(item.name.toLowerCase())}" data-desc="${esc((item.desc || '').toLowerCase())}">
          <img class="menu-item-row-card__thumb" src="${esc(imgSrc)}" alt="${esc(item.name)}" loading="lazy" onerror="this.src='Food/Peppy Paneer Pizza.avif'">
          <div class="menu-item-row-card__details">
            <div class="menu-item-row-card__title-row">
              <span class="${item.veg ? 'tag-veg-dot' : 'tag-nonveg-dot'}" title="${item.veg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
              <h3 class="menu-item-row-card__title">${esc(item.name)}</h3>
              ${item.isChefPick ? '<span class="badge-chef">★ Chef Pick</span>' : ''}
            </div>
            ${item.desc ? `<p class="menu-item-row-card__desc">${esc(item.desc)}</p>` : ''}
          </div>
          <div class="menu-item-row-card__price">₹${item.price}</div>
        </article>`;
    };

    const renderMenu = (items) => {
      // Group items by normalized category
      const catMap = {};
      const catOrder = [
        'La Sabroso Favourites',
        'Thin-Crust Pizzas',
        'Handmade Pastas & Ravioli',
        'Burgers & Artisanal Sandwiches',
        'Starters & Quick Bites',
        'Continental & Main Courses',
        'Soups & Fresh Salads',
        'Artisan Coffees & Cold Brews',
        'Milkshakes, Coolers & Beverages',
        'Tableside Gelato Lab & Desserts'
      ];

      items.forEach((it) => {
        const norm = normalizeCategory(it.category);
        if (!catMap[norm]) catMap[norm] = [];
        catMap[norm].push(it);
      });

      const categories = Object.keys(catMap).sort((a, b) => {
        const ia = catOrder.indexOf(a);
        const ib = catOrder.indexOf(b);
        if (ia !== -1 && ib !== -1) return ia - ib;
        if (ia !== -1) return -1;
        if (ib !== -1) return 1;
        return a.localeCompare(b);
      });

      // Render Category Navigation Tabs
      if (tabsWrap) {
        tabsWrap.innerHTML = `
          <button data-cat="__all" class="active">All</button>
          ${categories.map(c => `<button data-cat="${esc(c)}">${esc(c)}</button>`).join('')}
        `;
      }

      // Render Category Blocks
      menuWrap.innerHTML = categories.map((cat) => {
        const catItems = catMap[cat];
        return `
          <section class="menu-category-block" data-section="${esc(cat)}">
            <div class="menu-category-block__header">
              <h2 class="menu-category-block__title">${esc(cat)}</h2>
            </div>
            <div class="menu-restaurant-grid">
              ${catItems.map(itemRowHTML).join('')}
            </div>
          </section>`;
      }).join('');

      // Filter & Search Logic
      const searchInput = document.querySelector('[data-menu-search]');
      let activeCat = '__all';

      const applyFilter = () => {
        const q = (searchInput ? searchInput.value : '').trim().toLowerCase();
        let totalVisible = 0;

        document.querySelectorAll('.menu-category-block').forEach((sec) => {
          const inCat = activeCat === '__all' || sec.dataset.section === activeCat;
          let secVisible = 0;

          sec.querySelectorAll('.menu-item-row-card').forEach((row) => {
            const name = row.dataset.name || '';
            const desc = row.dataset.desc || '';
            const matchQ = !q || name.includes(q) || desc.includes(q);
            const show = inCat && matchQ;

            row.style.display = show ? 'flex' : 'none';
            if (show) {
              secVisible++;
              totalVisible++;
            }
          });

          sec.style.display = secVisible === 0 ? 'none' : 'block';
        });
      };

      if (tabsWrap) {
        tabsWrap.addEventListener('click', (e) => {
          const btn = e.target.closest('button[data-cat]');
          if (!btn) return;
          activeCat = btn.dataset.cat;
          tabsWrap.querySelectorAll('button').forEach((b) => b.classList.toggle('active', b === btn));
          applyFilter();
        });
      }

      if (searchInput) {
        searchInput.addEventListener('input', applyFilter);
      }
    };

    if (window.MENU_DATA && Array.isArray(window.MENU_DATA) && window.MENU_DATA.length > 0) {
      renderMenu(window.MENU_DATA);
    } else {
      fetch('assets/js/menu-data.json')
        .then((r) => r.json())
        .then((items) => renderMenu(items))
        .catch(() => {
          if (window.MENU_DATA) renderMenu(window.MENU_DATA);
        });
    }
  }

  /* ---------- Gallery Filtering ---------- */
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryGroups = document.querySelectorAll('.gallery-group');
  const allCards = document.querySelectorAll('.gallery-card');

  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        if (filter === 'all') {
          galleryGroups.forEach(group => group.style.display = 'block');
          allCards.forEach(card => card.style.display = 'block');
        } else if (filter === 'cafe') {
          galleryGroups.forEach(group => {
            group.style.display = (group.dataset.category === 'cafe') ? 'block' : 'none';
          });
          allCards.forEach(card => card.style.display = 'block');
        } else if (filter === 'food') {
          galleryGroups.forEach(group => {
            group.style.display = (group.dataset.category === 'food-drinks') ? 'block' : 'none';
          });
          allCards.forEach(card => {
            card.style.display = (card.dataset.category === 'food') ? 'block' : 'none';
          });
        } else if (filter === 'drinks') {
          galleryGroups.forEach(group => {
            group.style.display = (group.dataset.category === 'food-drinks') ? 'block' : 'none';
          });
          allCards.forEach(card => {
            card.style.display = (card.dataset.category === 'drinks') ? 'block' : 'none';
          });
        }
      });
    });
  }

  /* ---------- Interactive Lightbox Gallery ---------- */
  const lb = document.querySelector('.lightbox');
  const allLightboxItems = Array.from(document.querySelectorAll('[data-lightbox]'));
  let currentActiveList = [];
  let currentIndex = 0;

  if (lb && allLightboxItems.length) {
    const lbImg = lb.querySelector('.lightbox__img') || lb.querySelector('img');
    const lbCaption = lb.querySelector('.lightbox__caption');

    const showImage = (index) => {
      const list = currentActiveList.length ? currentActiveList : allLightboxItems;
      currentIndex = (index + list.length) % list.length;
      const target = list[currentIndex];
      const src = target.dataset.full || target.src || (target.querySelector('img') ? target.querySelector('img').src : '');
      const caption = target.dataset.caption || (target.querySelector('img') ? target.querySelector('img').alt : '') || '';

      if (lbImg) lbImg.src = src;
      if (lbCaption) lbCaption.textContent = caption;
    };

    allLightboxItems.forEach((item) => {
      item.addEventListener('click', () => {
        // Collect currently visible lightbox items
        currentActiveList = allLightboxItems.filter(el => {
          return el.offsetParent !== null && window.getComputedStyle(el).display !== 'none';
        });
        if (!currentActiveList.length) currentActiveList = allLightboxItems;
        currentIndex = currentActiveList.indexOf(item);
        if (currentIndex === -1) currentIndex = 0;
        showImage(currentIndex);
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeBtn = lb.querySelector('.lightbox__close');
    const prevBtn = lb.querySelector('.lightbox__prev');
    const nextBtn = lb.querySelector('.lightbox__next');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        lb.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
    if (prevBtn) prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

    lb.addEventListener('click', (e) => {
      if (e.target === lb) {
        lb.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    window.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') {
        lb.classList.remove('open');
        document.body.style.overflow = '';
      } else if (e.key === 'ArrowLeft') {
        showImage(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        showImage(currentIndex + 1);
      }
    });
  }
})();
