/* La Sabroso — shared JS: scroll header, drawer nav, reveal-on-scroll, 
   interactive menu preview, menu filters, carousel, lightbox with key controls. */
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

  if (toggle && overlay) {
    toggle.addEventListener('click', () => overlay.classList.add('open'));
  }
  if (overlayClose && overlay) {
    overlayClose.addEventListener('click', () => overlay.classList.remove('open'));
  }
  if (overlay) {
    overlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => overlay.classList.remove('open'));
    });
  }

  /* ---------- Reveal on Scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && revealEls.length && !reduced) {
    revealEls.forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.9) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
      }
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'none';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- Interactive Signature Menu Preview (Home Page) ---------- */
  const menuRows = document.querySelectorAll('.menu-item-row');
  const previewImg = document.querySelector('.menu-preview-display__img');
  const previewTitle = document.querySelector('.menu-preview-display__title');
  const previewDesc = document.querySelector('.menu-preview-display__desc');

  if (menuRows.length && previewImg) {
    menuRows.forEach(row => {
      row.addEventListener('mouseenter', () => {
        menuRows.forEach(r => r.classList.remove('active'));
        row.classList.add('active');

        const img = row.dataset.img;
        const title = row.dataset.title;
        const desc = row.dataset.desc;

        if (img) previewImg.src = img;
        if (title && previewTitle) previewTitle.textContent = title;
        if (desc && previewDesc) previewDesc.textContent = desc;
      });
    });
  }

  /* ---------- Menu Page: Data Load, Category Filters & Search ---------- */
  const tabsWrap = document.querySelector('[data-menu-tabs]');
  const menuWrap = document.querySelector('[data-menu]');

  if (menuWrap) {
    const esc = (s) => String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

    const getFoodImage = (item) => {
      if (item.img && typeof item.img === 'string' && item.img.startsWith('http')) {
        return item.img;
      }
      const str = ((item.name || '') + ' ' + (item.category || '') + ' ' + (item.desc || '')).toLowerCase();
      
      if (str.includes('pizza') || str.includes('margherita') || str.includes('pepperoni')) {
        return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop';
      }
      if (str.includes('burger') || str.includes('slider') || str.includes('patty')) {
        return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop';
      }
      if (str.includes('pasta') || str.includes('spaghetti') || str.includes('penne') || str.includes('alfredo') || str.includes('arrabbiata') || str.includes('macaroni') || str.includes('lasagna')) {
        return 'https://images.unsplash.com/photo-1621996346565-e3d5d6281270?q=80&w=800&auto=format&fit=crop';
      }
      if (str.includes('chicken') || str.includes('tender') || str.includes('wing') || str.includes('nugget') || str.includes('brochettes')) {
        return 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=800&auto=format&fit=crop';
      }
      if (str.includes('fish') || str.includes('prawn') || str.includes('shrimp') || str.includes('squid') || str.includes('calamari') || str.includes('seafood')) {
        return 'https://images.unsplash.com/photo-1559737605-331879f2b57e?q=80&w=800&auto=format&fit=crop';
      }
      if (str.includes('fry') || str.includes('fries') || str.includes('nacho') || str.includes('croqueta') || str.includes('garlic bread') || str.includes('ring') || str.includes('bruschetta')) {
        return 'https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=800&auto=format&fit=crop';
      }
      if (str.includes('salad') || str.includes('broccoli') || str.includes('quinoa') || str.includes('avocado') || str.includes('caesar')) {
        return 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop';
      }
      if (str.includes('latte') || str.includes('cappuccino') || str.includes('espresso') || str.includes('coffee') || str.includes('brew') || str.includes('biscoff')) {
        return 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop';
      }
      if (str.includes('chocolate') || str.includes('tea') || str.includes('chai') || str.includes('cocoa')) {
        return 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop';
      }
      if (str.includes('mojito') || str.includes('shake') || str.includes('smoothie') || str.includes('cooler') || str.includes('iced') || str.includes('soda') || str.includes('mocktail') || str.includes('drink')) {
        return 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop';
      }
      if (str.includes('ice cream') || str.includes('cake') || str.includes('brownie') || str.includes('cheesecake') || str.includes('pastry') || str.includes('sundae') || str.includes('waffle') || str.includes('nitrogen') || str.includes('dessert')) {
        return 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop';
      }
      if (str.includes('rice') || str.includes('biryani') || str.includes('curry') || str.includes('paneer') || str.includes('dal')) {
        return 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop';
      }

      return 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop';
    };

    const itemHTML = (item) => {
      const picks = window.CHEF_PICKS || [];
      const isChef = picks.some((p) => p.toLowerCase() === item.name.toLowerCase().replace(/\.$/, ''));
      const imgSrc = getFoodImage(item);
      const img = `<img class="menu-card__img" src="${esc(imgSrc)}" alt="${esc(item.name)}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop'">`;

      return `
        <article class="menu-card reveal" data-name="${esc(item.name.toLowerCase())}" data-desc="${esc((item.desc || '').toLowerCase())}">
          ${img}
          <div class="menu-card__body">
            <div class="menu-card__header">
              <h3 class="menu-card__title">
                <span class="${item.veg ? 'tag-veg-dot' : 'tag-nonveg-dot'}" title="${item.veg ? 'Veg' : 'Non-veg'}"></span>
                ${esc(item.name)}
                ${isChef ? '<span class="badge-chef">★ Chef&rsquo;s Pick</span>' : ''}
              </h3>
              <span class="menu-card__price">₹${item.price}</span>
            </div>
            ${item.desc ? `<p class="menu-card__desc">${esc(item.desc)}</p>` : ''}
          </div>
        </article>`;
    };

    fetch('assets/js/menu-data.json')
      .then((r) => r.json())
      .then((items) => {
        const cats = [];
        items.forEach((i) => { if (!cats.includes(i.category)) cats.push(i.category); });

        if (tabsWrap) {
          const mkBtn = (label, cat) => `<button data-cat="${esc(cat)}" class="${cat === '__all' ? 'active' : ''}">${esc(label)}</button>`;
          tabsWrap.innerHTML = mkBtn('All Dishes', '__all') + cats.map((c) => mkBtn(c, c)).join('');
        }

        menuWrap.innerHTML = cats.map((cat) => {
          const catItems = items.filter((i) => i.category === cat);
          return `
            <section class="menu-cat" data-section="${esc(cat)}" style="margin-bottom: 50px;">
              <h2 style="font-family: var(--font-serif); font-size: 28px; color: var(--text-primary); margin-bottom: 6px;">${esc(cat)}</h2>
              <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">${catItems.length} specialty item${catItems.length === 1 ? '' : 's'}</p>
              <div class="menu-grid">
                ${catItems.map(itemHTML).join('')}
              </div>
            </section>`;
        }).join('');

        const searchInput = document.querySelector('[data-menu-search]');
        let activeCat = '__all';

        const apply = () => {
          const q = (searchInput ? searchInput.value : '').trim().toLowerCase();
          document.querySelectorAll('.menu-cat').forEach((sec) => {
            const inCat = activeCat === '__all' || sec.dataset.section === activeCat;
            let visible = 0;
            sec.querySelectorAll('.menu-card').forEach((it) => {
              const matchQ = !q || it.dataset.name.includes(q) || it.dataset.desc.includes(q);
              const show = inCat && matchQ;
              it.style.display = show ? 'flex' : 'none';
              if (show) visible += 1;
            });
            sec.style.display = visible === 0 ? 'none' : 'block';
          });
        };

        if (tabsWrap) {
          tabsWrap.addEventListener('click', (e) => {
            const btn = e.target.closest('button[data-cat]');
            if (!btn) return;
            activeCat = btn.dataset.cat;
            tabsWrap.querySelectorAll('button').forEach((b) => b.classList.toggle('active', b === btn));
            apply();
          });
        }
        if (searchInput) searchInput.addEventListener('input', apply);
      })
      .catch(() => {
        menuWrap.innerHTML = '<p class="menu-note">Menu items are live on Swiggy &amp; Zomato. Refresh to reload menu database.</p>';
      });
  }

  /* ---------- Enhanced Lightbox Gallery ---------- */
  const lb = document.querySelector('.lightbox');
  const galleryItems = Array.from(document.querySelectorAll('[data-lightbox]'));
  let currentIndex = 0;

  if (lb && galleryItems.length) {
    const lbImg = lb.querySelector('.lightbox__img') || lb.querySelector('img');
    const lbCaption = lb.querySelector('.lightbox__caption');

    const showImage = (index) => {
      currentIndex = (index + galleryItems.length) % galleryItems.length;
      const target = galleryItems[currentIndex];
      const src = target.dataset.full || target.src;
      const caption = target.dataset.caption || target.alt || '';

      if (lbImg) {
        lbImg.src = src;
        lbImg.alt = caption;
      }
      if (lbCaption) {
        lbCaption.textContent = caption;
      }
      lb.classList.add('open');
    };

    galleryItems.forEach((img, idx) => {
      img.addEventListener('click', () => showImage(idx));
    });

    const prevBtn = lb.querySelector('.lightbox__prev');
    const nextBtn = lb.querySelector('.lightbox__next');
    const closeBtn = lb.querySelector('.lightbox__close');

    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex - 1); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex + 1); });
    if (closeBtn) closeBtn.addEventListener('click', () => lb.classList.remove('open'));

    lb.addEventListener('click', (e) => {
      if (e.target === lb) lb.classList.remove('open');
    });

    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') lb.classList.remove('open');
      if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
      if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });
  }

  /* ---------- Gallery Page Filtering ---------- */
  const galleryFilterBtns = document.querySelectorAll('[data-gallery-filter]');
  const galleryGridItems = document.querySelectorAll('.gallery-item');

  if (galleryFilterBtns.length && galleryGridItems.length) {
    galleryFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.galleryFilter;
        galleryFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        galleryGridItems.forEach(item => {
          const itemCat = item.dataset.category || 'all';
          if (cat === 'all' || itemCat === cat) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---------- Newsletter Form Submit ---------- */
  const nlForm = document.querySelector('[data-newsletter]');
  if (nlForm) {
    nlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = nlForm.querySelector('button');
      if (btn) {
        btn.textContent = 'Subscribed ✓';
        btn.disabled = true;
      }
      const input = nlForm.querySelector('input');
      if (input) input.value = '';
    });
  }

  window.CHEF_PICKS = [
    'Honey Lemon Pepper Chicken Tenders', 'Honey Lemon Pepper Tenders',
    'Creamy Garlic Prawns', 'Fish And Chips', 'Chicken Alfredo Pasta',
    'Chicken Alfredo Pizza', 'Marry Me Chicken', 'Tuscan Chicken',
    'Lava Mud Cheese Cake', 'Lotus Biscoff Cold Coffee', 'Nutella Milkshake',
    'French Hot Chocolate', 'Cranberry Coffee', 'Veg Masala Mafia Pasta',
    'Chicken Masala Mafia Pasta'
  ];
})();
