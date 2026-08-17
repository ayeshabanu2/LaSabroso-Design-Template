/* La Sabroso — shared JS: nav toggle, reveal-on-scroll, menu filters/search,
   testimonial carousel, lightbox. Vanilla, no dependencies. */
(function () {
  'use strict';

  /* Mark JS active so reveal animation only hides when JS can re-show */
  document.documentElement.classList.add('js');

  /* ---------- sticky nav mobile toggle ---------- */
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  /* ---------- reveal on scroll (progressive enhancement; JS sets hidden state inline) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && revealEls.length && !reduced) {
    // JS only: hide below-fold elements inline, then fade them up on intersect
    revealEls.forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.85) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
      }
      el.classList.add('revealed'); // marker class; transition defined in CSS
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'none';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- menu page: data load, filters, search ---------- */
  const tabsWrap = document.querySelector('[data-menu-tabs]');
  const menuWrap = document.querySelector('[data-menu]');
  if (menuWrap) {
    const esc = (s) => String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

    const itemHTML = (item) => {
      const picks = window.CHEF_PICKS || [];
      const isChef = picks.some((p) => p.toLowerCase() === item.name.toLowerCase().replace(/\.$/, ''));
      const img = item.img
        ? `<img class="menu-item__img" src="${esc(item.img)}" alt="${esc(item.name)}" loading="lazy" onerror="this.outerHTML='<div class=&quot;menu-item__img menu-item__img--placeholder&quot;>☕</div>'">`
        : `<div class="menu-item__img menu-item__img--placeholder" aria-hidden="true">☕</div>`;
      return `
        <article class="menu-item reveal" data-name="${esc(item.name.toLowerCase())}" data-desc="${esc((item.desc || '').toLowerCase())}">
          ${img}
          <div class="menu-item__body">
            <div class="menu-item__top">
              <h3 class="menu-item__name">
                <span class="${item.veg ? 'tag-veg' : 'tag-nonveg'}" title="${item.veg ? 'Veg' : 'Non-veg'}"></span>
                ${esc(item.name)}
                ${isChef ? '<span class="badge-chef">★ Chef&rsquo;s Pick</span>' : ''}
              </h3>
              <span class="menu-item__price">₹${item.price}</span>
            </div>
            ${item.desc ? `<p class="menu-item__desc">${esc(item.desc)}</p>` : ''}
          </div>
        </article>`;
    };

    fetch('assets/js/menu-data.json')
      .then((r) => r.json())
      .then((items) => {
        const cats = [];
        items.forEach((i) => { if (!cats.includes(i.category)) cats.push(i.category); });

        // tabs
        if (tabsWrap) {
          const mkBtn = (label, cat) => `<button data-cat="${esc(cat)}" class="${cat === '__all' ? 'active' : ''}">${esc(label)}</button>`;
          tabsWrap.innerHTML = mkBtn('All', '__all') + cats.map((c) => mkBtn(c, c)).join('');
        }

        // sections
        menuWrap.innerHTML = cats.map((cat) => {
          const catItems = items.filter((i) => i.category === cat);
          return `
            <section class="menu-cat" data-section="${esc(cat)}">
              <h2>${esc(cat)}</h2>
              <p>${catItems.length} item${catItems.length === 1 ? '' : 's'}</p>
              ${catItems.map(itemHTML).join('')}
            </section>`;
        }).join('');

        // reveal newly injected elements
        menuWrap.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed'));

        // filter behavior
        const searchInput = document.querySelector('[data-menu-search]');
        let activeCat = '__all';
        const apply = () => {
          const q = (searchInput ? searchInput.value : '').trim().toLowerCase();
          document.querySelectorAll('.menu-cat').forEach((sec) => {
            const inCat = activeCat === '__all' || sec.dataset.section === activeCat;
            let visible = 0;
            sec.querySelectorAll('.menu-item').forEach((it) => {
              const matchQ = !q || it.dataset.name.includes(q) || it.dataset.desc.includes(q);
              const show = inCat && matchQ;
              it.classList.toggle('hidden', !show);
              if (show) visible += 1;
            });
            sec.classList.toggle('hidden', visible === 0);
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
        menuWrap.innerHTML = '<p class="menu-note">Menu failed to load — please refresh. Live menu also available on Zomato District &amp; Swiggy Dineout.</p>';
      });
  }

  /* ---------- testimonial carousel ---------- */
  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const slides = carousel.querySelector('.carousel__slides');
    const figures = slides.children.length;
    let idx = 0;
    const dotsWrap = carousel.querySelector('.carousel__dots');
    if (dotsWrap) {
      for (let i = 0; i < figures; i++) {
        const b = document.createElement('button');
        b.setAttribute('aria-label', 'Go to review ' + (i + 1));
        if (i === 0) b.classList.add('active');
        b.addEventListener('click', () => go(i));
        dotsWrap.appendChild(b);
      }
    }
    const go = (i) => {
      idx = (i + figures) % figures;
      slides.style.transform = `translateX(-${idx * 100}%)`;
      if (dotsWrap) [...dotsWrap.children].forEach((d, j) => d.classList.toggle('active', j === idx));
    };
    const prev = carousel.querySelector('.carousel__btn--prev');
    const next = carousel.querySelector('.carousel__btn--next');
    if (prev) prev.addEventListener('click', () => go(idx - 1));
    if (next) next.addEventListener('click', () => go(idx + 1));
    setInterval(() => go(idx + 1), 6000);
  }

  /* ---------- lightbox ---------- */
  const lb = document.querySelector('.lightbox');
  if (lb) {
    const lbImg = lb.querySelector('img');
    document.querySelectorAll('[data-lightbox]').forEach((img) => {
      img.addEventListener('click', () => {
        lbImg.src = img.dataset.full || img.src;
        lbImg.alt = img.alt || '';
        lb.classList.add('open');
      });
    });
    lb.addEventListener('click', (e) => {
      if (e.target === lb || e.target.classList.contains('lightbox__close')) lb.classList.remove('open');
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lb.classList.remove('open'); });
  }

  /* ---------- fake newsletter submit ---------- */
  const nlForm = document.querySelector('[data-newsletter]');
  if (nlForm) {
    nlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = nlForm.querySelector('button');
      btn.textContent = 'Subscribed ✓';
      btn.disabled = true;
      nlForm.querySelector('input').value = '';
    });
  }

  /* Chef's picks — names normalized, matched against live menu data */
  window.CHEF_PICKS = [
    'Honey Lemon Pepper Chicken Tenders', 'Honey Lemon Pepper Tenders',
    'Creamy Garlic Prawns', 'Fish And Chips', 'Chicken Alfredo Pasta',
    'Chicken Alfredo Pizza', 'Marry Me Chicken', 'Tuscan Chicken',
    'Lava Mud Cheese Cake', 'Lotus Biscoff Cold Coffee', 'Nutella Milkshake',
    'French Hot Chocolate', 'Cranberry Coffee', 'Veg Masala Mafia Pasta',
    'Chicken Masala Mafia Pasta'
  ];
})();
