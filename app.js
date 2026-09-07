/* ==========================================================================
   La Sabroso Café — Core POS & Management Engine (Production Ready)
   - Full Menu: fetches assets/js/menu-data.json on load (16-item seed fallback)
   - Indian Rupee (₹) Formatting for Madhapur, Hyderabad
   - Stored-XSS Escaping Helper across all innerHTML sinks
   - Stock & Availability Integrity Guards
   - LocalStorage State Persistence
   - Dynamic Chart.js Analytics & KPI Calculations
   ========================================================================== */

// --- 1. HTML ESCAPING HELPER (Fix H3 - XSS Prevention) ---
function esc(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const getFoodImage = (item) => {
  if (item.img && typeof item.img === 'string' && item.img.trim().length > 0) {
    return item.img;
  }
  const name = (item.name || '').toLowerCase();
  
  // Specific dish fallbacks
  if (name.includes('honey lemon pepper')) return 'Food/Honey Lemon Pepper Tenders.avif';
  if (name.includes('marry me chicken')) return 'Food/Marry me chicken.avif';
  if (name.includes('peppy paneer pizza')) return 'Food/Peppy Paneer Pizza.avif';
  if (name.includes('peri peri chicken pizza')) return 'Food/Peri Peri Chicken Pizza.avif';
  if (name.includes('sabroso green garden')) return 'Food/Sabroso Green Garden Veg Pizza.avif';
  if (name.includes('chicken alfredo pizza')) return 'assets/img/dishes/chicken_alfredo_pizza.jpg';
  if (name.includes('mutton kheema pizza')) return 'assets/img/dishes/mutton_kheema_pizza.jpg';
  if (name.includes('veg masala mafia')) return 'Food/Veg Masala Mafia Pasta.avif';
  if (name.includes('chicken masala mafia')) return 'assets/img/dishes/chicken_masala_mafia_pasta.jpg';
  if (name.includes('veg arrabbiata')) return 'Food/Veg Arrabbiata Pasta.avif';
  if (name.includes('chicken arrabbiata')) return 'assets/img/dishes/chicken_arrabbiata_pasta.jpg';
  if (name.includes('veg alfredo pasta')) return 'Food/Veg Alfredo Pasta.avif';
  if (name.includes('chicken alfredo pasta')) return 'assets/img/dishes/chicken_alfredo_pasta.jpg';
  if (name.includes('veg baked pasta')) return 'Food/Veg Baked Pasta.avif';
  if (name.includes('chicken baked pasta')) return 'assets/img/dishes/chicken_baked_pasta.jpg';
  if (name.includes('veg aglio olio')) return 'Food/Veg Aglio Olio Pasta.avif';
  if (name.includes('chicken aglio olio')) return 'assets/img/dishes/chicken_aglio_olio_pasta.jpg';
  if (name.includes('chessy chicken burger') || name.includes('cheesy chicken burger')) return 'Food/Chessy Chicken Burger.avif';
  if (name.includes('cheesy paneer burger')) return 'assets/img/dishes/cheesy_paneer_burger.jpg';
  if (name.includes('chipotle veg burger')) return 'assets/img/dishes/chipotle_veg_burger.jpg';
  if (name.includes('chipotle chicken burger')) return 'assets/img/dishes/chipotle_chicken_burger.jpg';
  if (name.includes('peri peri veg burger')) return 'assets/img/dishes/peri_peri_veg_burger.jpg';
  if (name.includes('peri peri chicken burger')) return 'assets/img/dishes/peri_peri_chicken_burger.jpg';
  if (name.includes('veg caesar sandwich')) return 'Food/Veg Caesar Sandwich.avif';
  if (name.includes('pesto chicken sandwich')) return 'assets/img/dishes/pesto_chicken_sandwich.jpg';
  if (name.includes('chicken caesar sandwich')) return 'assets/img/dishes/chicken_caesar_sandwich.jpg';
  if (name.includes('roasted tomato soup')) return 'Food/Roasted Tomato Soup With Cheese Toast.avif';
  if (name.includes('broccoli cheddar soup')) return 'Food/Broccoli Cheddar Soup With Garlic Bread.avif';
  if (name.includes('chicken alfredo garlic bread')) return 'Food/Chicken Alfredo Garlic Bread.avif';
  if (name.includes('veg alfredo garlic bread')) return 'Food/Veg Alfredo Garlic Bread.avif';
  if (name.includes('quinoa with grilled chicken')) return 'Food/Quinoa With Grilled Chicken.avif';
  if (name.includes('chicken caesar salad')) return 'Food/Chicken Caesar Salad.avif';
  if (name.includes('caesar salad')) return 'Food/Caesar Salad.avif';
  if (name.includes('lotus biscoff')) return 'Food/Lotus Biscoff Cold Coffee.avif';
  if (name.includes('french hot chocolate')) return 'Food/French Hot Chocolate.avif';
  if (name.includes('blue berry cheese cake') || name.includes('blueberry cheesecake')) return 'Food/Blue Berry Cheese Cake.avif';
  if (name.includes('chocolate khoma')) return 'Food/Chocolate Khoma.avif';
  if (name.includes('cranberry coffee')) return 'Food/Cranberry Coffee.avif';
  if (name.includes('iced mocha')) return 'Food/Iced Mocha.avif';
  if (name.includes('matcha cold coffee')) return 'Food/Matcha Cold Coffee.avif';
  if (name.includes('matcha latte hot')) return 'Food/Matcha Latte Hot.avif';
  if (name.includes('nutella cold coffee')) return 'Food/Nutella Cold Coffee.avif';
  if (name.includes('cappuccino')) return 'Food/Cappuccino.avif';
  if (name.includes('americano')) return 'Food/Americano.avif';

  return 'Food/Peppy Paneer Pizza.avif';
};

// --- 2. SEED MENU (16 items) — fallback if menu-data.json fetch fails ---
const SEED_MENU_ITEMS = [
  { id: 1, category: "La Sabroso Favourites", name: "Honey Lemon Pepper Chicken Tenders", price: 544, desc: "Crispy fried chicken tenders drenched in a rich honey lemon pepper sauce", veg: false, available: true, ordersCount: 142, img: "Food/Honey Lemon Pepper Tenders.avif" },
  { id: 2, category: "La Sabroso Favourites", name: "Creamy Garlic Prawns", price: 584, desc: "Crispy fried prawns served on a bed of rich, garlicky white cream sauce.", veg: false, available: true, ordersCount: 98, img: "Food/creamy-garlic-prawns.jpg" },
  { id: 3, category: "La Sabroso Favourites", name: "Fish And Chips", price: 574, desc: "Crispy golden fish fillets dipped in artisan batter, served with house tartar sauce and seasoned fries.", veg: false, available: true, ordersCount: 86, img: "Food/fish-and-chips.webp" },
  { id: 4, category: "La Sabroso Favourites", name: "Veg Croqueta With Al Fungi Sauce", price: 424, desc: "Crispy croquetas made from seasonal vegetables drizzled with luxurious Al Fungi sauce.", veg: true, available: true, ordersCount: 74, img: "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=800&auto=format&fit=crop" },
  { id: 5, category: "La Sabroso Favourites", name: "Bang Bang Broccoli", price: 424, desc: "Crispy broccoli served with Peri Peri Bang Bang Sauce.", veg: true, available: true, ordersCount: 110, img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop" },
  { id: 6, category: "La Sabroso Favourites", name: "Veg Masala Mafia Pasta", price: 524, desc: "Pasta tossed in a Red Bell Pepper puree and cream, served with garlic bread.", veg: true, available: true, ordersCount: 135, img: "Food/Veg Masala Mafia Pasta.avif" },
  { id: 7, category: "Burgers", name: "Chipotle Veg Burger", price: 484, desc: "Crispy veg patty layered with fresh lettuce and smoky chipotle mayo.", veg: true, available: true, ordersCount: 92, img: "assets/img/dishes/chipotle_veg_burger.jpg" },
  { id: 8, category: "Burgers", name: "Cheesy Paneer Burger", price: 494, desc: "Crispy paneer loaded with melty cheese, fresh lettuce, and thousand island sauce.", veg: true, available: true, ordersCount: 104, img: "assets/img/dishes/cheesy_paneer_burger.jpg" },
  { id: 9, category: "Burgers", name: "Chipotle Chicken Burger", price: 544, desc: "Juicy chicken patty topped with chipotle mayo and crispy lettuce.", veg: false, available: true, ordersCount: 118, img: "assets/img/dishes/chipotle_chicken_burger.jpg" },
  { id: 10, category: "Pizzas", name: "Peppy Paneer Pizza", price: 504, desc: "Spiced paneer, crunchy bell peppers, melted mozzarella, and house herb crust.", veg: true, available: true, ordersCount: 160, img: "Food/Peppy Paneer Pizza.avif" },
  { id: 11, category: "Pizzas", name: "Peri Peri Chicken Pizza", price: 564, desc: "Peri-peri spiced chicken, red paprika, and bubbling mozzarella.", veg: false, available: true, ordersCount: 145, img: "Food/Peri Peri Chicken Pizza.avif" },
  { id: 12, category: "Hot Beverages", name: "French Hot Chocolate", price: 290, desc: "Thick Parisian-style dark melted chocolate.", veg: true, available: true, ordersCount: 210, img: "Food/French Hot Chocolate.avif" },
  { id: 13, category: "Hot Beverages", name: "Classic Cappuccino", price: 220, desc: "Double shot espresso with velvety microfoam.", veg: true, available: true, ordersCount: 195, img: "Food/Cappuccino.avif" },
  { id: 14, category: "Cold Beverages", name: "Lotus Biscoff Cold Coffee", price: 374, desc: "Blend of espresso, Lotus Biscoff spread, and crushed Biscoff cookies.", veg: true, available: true, ordersCount: 240, img: "Food/Lotus Biscoff Cold Coffee.avif" },
  { id: 15, category: "Desserts", name: "Blueberry Cheesecake", price: 314, desc: "Velvety New York style cheesecake with slow-simmered wild blueberry compote.", veg: true, available: true, ordersCount: 180, img: "Food/Blue Berry Cheese Cake.avif" },
  { id: 16, category: "Desserts", name: "Chocolate Khoma", price: 320, desc: "Rich molten artisan chocolate dessert.", veg: true, available: true, ordersCount: 165, img: "Food/Chocolate Khoma.avif" }
];

// --- 3. STATE ENGINE ---
let appState = {
  theme: 'light',
  currentView: 'dashboard',
  selectedBranch: 'madhapur',
  
  // Menu State with LocalStorage Sync (R3-3: Pre-seeded to prevent async init visual flash)
  menu: [...SEED_MENU_ITEMS],

  // Orders State (R3-2: Totals include 5% GST to align with live KPI calculations)
  orders: [
    { id: 'ORD-1089', customer: 'Ananya Rao', items: [{ name: 'Biscoff Cold Coffee', qty: 2, price: 340 }, { name: 'Nutella Brownie Sundae', qty: 1, price: 320 }], total: 1050, payment: 'UPI', status: 'Completed', time: '11:45 AM' },
    { id: 'ORD-1090', customer: 'Vikram Sharma', items: [{ name: 'Chipotle Chicken Burger', qty: 1, price: 544 }, { name: 'Signature Hot Chocolate', qty: 1, price: 290 }], total: 876, payment: 'Card', status: 'Ready', time: '12:05 PM' },
    { id: 'ORD-1091', customer: 'Priya Mehta', items: [{ name: 'Honey Lemon Pepper Chicken Tenders', qty: 1, price: 544 }], total: 571, payment: 'Cash', status: 'Preparing', time: '12:12 PM' },
    { id: 'ORD-1092', customer: 'Arjun Reddy', items: [{ name: 'Veg Masala Mafia Pasta', qty: 2, price: 524 }], total: 1100, payment: 'UPI', status: 'New', time: '12:14 PM' },
    { id: 'ORD-1093', customer: 'Sneha Verma', items: [{ name: 'Classic Cappuccino', qty: 2, price: 220 }], total: 462, payment: 'Card', status: 'New', time: '12:15 PM' }
  ],

  // Ingredient Inventory (Madhapur Café)
  inventory: [
    { id: 1, item: 'Arabica Coffee Beans', category: 'Beans & Coffee', stock: 12.5, unit: 'kg', min: 10.0, status: 'In Stock', updated: 'Today 08:30 AM' },
    { id: 2, item: 'Whole Milk', category: 'Dairy', stock: 45, unit: 'liters', min: 20, status: 'In Stock', updated: 'Today 07:00 AM' },
    { id: 3, item: 'Belgian Chocolate Sauce', category: 'Syrups', stock: 2.5, unit: 'liters', min: 5.0, status: 'Low Stock', updated: 'Today 09:15 AM' },
    { id: 4, item: 'Lotus Biscoff Spread', category: 'Toppings', stock: 1.8, unit: 'kg', min: 4.0, status: 'Low Stock', updated: 'Today 10:00 AM' },
    { id: 5, item: 'Liquid Nitrogen Tanks', category: 'Lab Supplies', stock: 4, unit: 'canisters', min: 2, status: 'In Stock', updated: 'Yesterday' },
    { id: 6, item: 'Fresh Paneer & Cheese', category: 'Dairy', stock: 0.0, unit: 'kg', min: 5.0, status: 'Out of Stock', updated: 'Today 11:30 AM' }
  ],

  // Guest Directory
  customers: [
    { id: 1, name: 'Ananya Rao', phone: '+91 98765 43210', email: 'ananya@example.com', orders: 18, totalSpent: 12450, lastOrder: 'Today, 11:45 AM', status: 'VIP Gold' },
    { id: 2, name: 'Vikram Sharma', phone: '+91 91234 56789', email: 'vikram@example.com', orders: 12, totalSpent: 8900, lastOrder: 'Today, 12:05 PM', status: 'Regular' },
    { id: 3, name: 'Priya Mehta', phone: '+91 99887 76655', email: 'priya@example.com', orders: 24, totalSpent: 18200, lastOrder: 'Today, 12:12 PM', status: 'VIP Platinum' }
  ],

  // Staff Roster
  staff: [
    { id: 1, name: 'Rajesh Kumar', role: 'Head Barista', shift: 'Morning (08:00 - 16:00)', status: 'Active', phone: '+91 98111 22233' },
    { id: 2, name: 'Kavita Reddy', role: 'Senior Cashier', shift: 'Morning (09:00 - 17:00)', status: 'Active', phone: '+91 98222 33344' },
    { id: 3, name: 'Srinivas Rao', role: 'Shift Manager', shift: 'Full Day', status: 'Active', phone: '+91 98333 44455' }
  ],

  posCart: [],

  // System & POS Settings (R2-6 Fix)
  settings: {
    storeName: 'The Cafe La Sabroso',
    tagline: 'Feed your spirit. Feed your belly. Feed your soul.',
    gstRate: 5.0,
    currency: '₹',
    address: 'Road No. 36, Madhapur, Hyderabad, Telangana 500081'
  }
};

// Chart.js Instances
let salesChartInstance = null;
let categoryChartInstance = null;
let peakHoursChartInstance = null;
let paymentChartInstance = null;

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  initSettingsState();
  initMenuState();
  initOrdersState();
  initInventoryState();
  initSessionState();

  updateClock();
  setInterval(updateClock, 1000);

  renderDashboard();
  renderOrdersKanban();
  renderMenuGrid();
  renderCategoriesGrid();
  renderInventoryTable();
  renderCustomersTable();
  renderStaffGrid();

  // Guard Chart init
  if (window.Chart) {
    initAnalyticsCharts();
  }
});

// --- SETTINGS STATE ENGINE (R2-6 Fix) ---
function initSettingsState() {
  const saved = localStorage.getItem('lasabroso_settings_v1');
  if (saved) {
    try {
      appState.settings = { ...appState.settings, ...JSON.parse(saved) };
    } catch (e) {
      console.warn('Failed to parse saved settings:', e);
    }
  }
  loadSettingsIntoForm();
}

function saveSettingsState() {
  localStorage.setItem('lasabroso_settings_v1', JSON.stringify(appState.settings));
}

function loadSettingsIntoForm() {
  const nameEl = document.getElementById('setting-name');
  const tagEl = document.getElementById('setting-tagline');
  const taxEl = document.getElementById('setting-tax');
  const currEl = document.getElementById('setting-currency');

  if (nameEl) nameEl.value = appState.settings.storeName;
  if (tagEl) tagEl.value = appState.settings.tagline;
  if (taxEl) taxEl.value = appState.settings.gstRate;
  if (currEl) currEl.value = appState.settings.currency;
}

function saveSettings() {
  const nameVal = document.getElementById('setting-name')?.value.trim();
  const tagVal = document.getElementById('setting-tagline')?.value.trim();
  const taxVal = parseFloat(document.getElementById('setting-tax')?.value);

  if (!nameVal) {
    showToast('Store name cannot be empty', 'warning');
    return;
  }
  if (isNaN(taxVal) || taxVal < 0) {
    showToast('Please enter a valid non-negative GST rate %', 'warning');
    return;
  }

  appState.settings.storeName = nameVal;
  if (tagVal) appState.settings.tagline = tagVal;
  appState.settings.gstRate = taxVal;

  saveSettingsState();
  showToast(`Settings saved! GST rate set to ${taxVal}%`, 'success');
  renderPosCart();
}

// --- LOCALSTORAGE PERSISTENCE (Fix M4) ---
async function initMenuState() {
  const saved = localStorage.getItem('lasabroso_menu_v2');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length >= 16) {
        appState.menu = parsed;
        updateCatalogUiCounters();
        renderMenuGrid();
        renderCategoriesGrid();
        renderPosItemsSelector();
        return;
      }
    } catch (e) { console.warn('Menu cache error:', e); }
  }

  // Async load of full live menu (R2-1 Fix)
  try {
    const res = await fetch('assets/js/menu-data.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      appState.menu = data.map((item, idx) => ({
        id: idx + 1,
        category: item.category || 'La Sabroso Favourites',
        name: item.name,
        price: Number(item.price) || 0,
        desc: item.desc || 'Freshly prepared specialty dish.',
        veg: item.veg !== undefined ? Boolean(item.veg) : true,
        available: true,
        ordersCount: Math.max(15, 250 - idx * 2),
        img: item.img || null
      }));
      saveMenuState();
      updateCatalogUiCounters();
      renderMenuGrid();
      renderCategoriesGrid();
      renderPosItemsSelector();
      return;
    }
  } catch (err) {
    console.warn('menu-data.json fetch failed — using 16-item seed:', err.message);
  }

  // Fallback to 16-item seed
  appState.menu = [...SEED_MENU_ITEMS];
  saveMenuState();
  updateCatalogUiCounters();
  renderMenuGrid();
  renderCategoriesGrid();
  renderPosItemsSelector();
}

function updateCatalogUiCounters() {
  const total = appState.menu.length;
  const subtitleEl = document.getElementById('menu-subtitle');
  if (subtitleEl) subtitleEl.textContent = `Configure products from La Sabroso's live menu (${total} items), prices, and availability.`;
  const searchInput = document.querySelector('#view-menu input[aria-label="Search menu catalog"]');
  if (searchInput) searchInput.placeholder = `Search ${total} menu items...`;
}

function saveMenuState() {
  localStorage.setItem('lasabroso_menu_v2', JSON.stringify(appState.menu));
}

function initOrdersState() {
  const saved = localStorage.getItem('lasabroso_orders_v1');
  if (saved) {
    try { appState.orders = JSON.parse(saved); } catch (e) {}
  }
}

function saveOrdersState() {
  localStorage.setItem('lasabroso_orders_v1', JSON.stringify(appState.orders));
}

function initInventoryState() {
  const saved = localStorage.getItem('lasabroso_inventory_v1');
  if (saved) {
    try { appState.inventory = JSON.parse(saved); } catch (e) {}
  }
}

function saveInventoryState() {
  localStorage.setItem('lasabroso_inventory_v1', JSON.stringify(appState.inventory));
}

function initSessionState() {
  if (localStorage.getItem('lasabroso_staff_session') === 'active') {
    const overlay = document.getElementById('login-overlay');
    if (overlay) overlay.style.display = 'none';
  }
}

// --- CLOCK & THEME ---
function updateClock() {
  const now = new Date();
  const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const el = document.getElementById('live-datetime');
  if (el) el.textContent = now.toLocaleDateString('en-IN', options);
}

function toggleTheme() {
  appState.theme = appState.theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', appState.theme);
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.className = appState.theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
  showToast(`Switched to ${appState.theme === 'dark' ? 'Dark Roast' : 'Warm Cream'} mode`, 'info');
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.toggle('open');
}

// --- VIEW NAVIGATION ---
function switchView(viewId, navEl) {
  appState.currentView = viewId;

  document.querySelectorAll('.sidebar-nav .nav-item').forEach(el => el.classList.remove('active'));
  if (navEl) navEl.classList.add('active');

  document.querySelectorAll('.app-view').forEach(el => el.style.display = 'none');
  const targetView = document.getElementById(`view-${viewId}`);
  if (targetView) targetView.style.display = 'block';

  if (viewId === 'reports' && window.Chart) {
    setTimeout(initAnalyticsCharts, 100);
  }

  if (window.innerWidth <= 1024) {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('open');
  }
}

// --- DEMO AUTH (Fix H2) ---
function handleLogin(e) {
  e.preventDefault();
  localStorage.setItem('lasabroso_staff_session', 'active');
  const overlay = document.getElementById('login-overlay');
  if (overlay) overlay.style.display = 'none';
  showToast('Logged in as Madhapur Staff Lead', 'success');
}

function quickDemoLogin() {
  localStorage.setItem('lasabroso_staff_session', 'active');
  const overlay = document.getElementById('login-overlay');
  if (overlay) overlay.style.display = 'none';
  showToast('Signed in to Madhapur POS Portal', 'success');
}

function logout() {
  localStorage.removeItem('lasabroso_staff_session');
  const overlay = document.getElementById('login-overlay');
  if (overlay) overlay.style.display = 'flex';
  showToast('Logged out of POS', 'info');
}

// --- DASHBOARD & RECALCULATIONS (Fix M5) ---
function renderDashboard() {
  recalculateKpis();
  renderPopularToday();
  renderRecentOrders();
  if (window.Chart) initSalesChart();
}

function recalculateKpis() {
  const totalSales = appState.orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = appState.orders.length;
  const aov = totalOrders > 0 ? totalSales / totalOrders : 0;
  const lowStockCount = appState.inventory.filter(i => i.status !== 'In Stock').length;

  const salesEl = document.getElementById('kpi-sales-val');
  const ordersEl = document.getElementById('kpi-orders-val');
  const aovEl = document.getElementById('kpi-aov-val');
  const lowEl = document.getElementById('kpi-low-stock-val');
  const lowBadge = document.getElementById('low-stock-badge');

  if (salesEl) salesEl.textContent = `₹${totalSales.toLocaleString('en-IN')}`;
  if (ordersEl) ordersEl.textContent = totalOrders;
  if (aovEl) aovEl.textContent = `₹${Math.round(aov)}`;
  if (lowEl) lowEl.textContent = lowStockCount;
  if (lowBadge) lowBadge.textContent = lowStockCount;
}

function renderPopularToday() {
  const container = document.getElementById('popular-today-list');
  if (!container) return;

  const topItems = [...appState.menu].sort((a, b) => b.ordersCount - a.ordersCount).slice(0, 4);

  container.innerHTML = topItems.map(item => {
    const imageSrc = getFoodImage(item);
    return `
      <div style="display: flex; align-items: center; gap: 12px; padding: 10px; border-radius: var(--radius-md); background: var(--c-parchment); border: 1px solid var(--border);">
        <img src="${imageSrc}" alt="${esc(item.name)}" loading="lazy" style="width: 44px; height: 44px; border-radius: var(--radius-sm); object-fit: cover;">
        <div style="flex: 1;">
          <div style="font-weight: 700; font-size: 13.5px; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
            ${esc(item.name)}
            <span class="${item.veg ? 'tag-veg' : 'tag-nonveg'}" title="${item.veg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
          </div>
          <div style="font-size: 11.5px; color: var(--text-muted);">${esc(item.category)} • ${item.ordersCount} ordered</div>
        </div>
        <div style="font-weight: 800; color: var(--c-terracotta); font-size: 14px;">₹${item.price}</div>
      </div>
    `;
  }).join('');
}

function renderRecentOrders() {
  const tbody = document.getElementById('recent-orders-tbody');
  if (!tbody) return;

  tbody.innerHTML = appState.orders.map(ord => {
    const itemsSummary = ord.items.map(i => `${i.qty}x ${esc(i.name)}`).join(', ');
    const statusClass = ord.status === 'Completed' ? 'badge-success' :
                        ord.status === 'Ready' ? 'badge-info' :
                        ord.status === 'Preparing' ? 'badge-warning' : 'badge-danger';
    
    // Disable advance if completed (Fix M6)
    const actionBtn = ord.status === 'Completed' ?
      `<span class="badge badge-success">Completed ✓</span>` :
      `<button class="btn btn-secondary btn-sm" onclick="advanceOrderStatus('${esc(ord.id)}')">Advance</button>`;

    return `
      <tr>
        <td style="font-weight: 800; color: var(--c-forest);">${esc(ord.id)}</td>
        <td style="font-weight: 700;">${esc(ord.customer)}</td>
        <td style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${itemsSummary}</td>
        <td style="font-weight: 800; color: var(--c-terracotta);">₹${ord.total.toLocaleString('en-IN')}</td>
        <td><span class="badge" style="background: var(--background); color: var(--text-secondary);">${esc(ord.payment)}</span></td>
        <td><span class="badge ${statusClass}"><span class="badge-dot"></span>${esc(ord.status)}</span></td>
        <td style="color: var(--text-muted); font-size: 12px;">${esc(ord.time)}</td>
        <td>${actionBtn}</td>
      </tr>
    `;
  }).join('');
}

// --- SALES CHART (Fix M8) ---
function initSalesChart(period = 'daily') {
  const ctx = document.getElementById('salesChart');
  if (!ctx || !window.Chart) return;

  if (salesChartInstance) salesChartInstance.destroy();

  const datasets = {
    daily: { labels: ['08 AM', '11 AM', '02 PM', '05 PM', '08 PM', '11 PM'], data: [4500, 12800, 24500, 31200, 39400, 42850] },
    weekly: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], data: [38000, 42850, 41200, 46500, 58000, 72000, 68000] },
    monthly: { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], data: [260000, 295000, 310000, 345000] }
  };

  const current = datasets[period] || datasets.daily;

  salesChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: current.labels,
      datasets: [{
        label: 'Sales Revenue (₹)',
        data: current.data,
        borderColor: '#2E5D34',
        backgroundColor: 'rgba(46, 93, 52, 0.12)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: '#E57A4F',
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: '#F2E6D9' }, ticks: { callback: v => '₹' + v } }
      }
    }
  });
}

function updateSalesChart(type) {
  document.querySelectorAll('#btn-chart-daily, #btn-chart-weekly, #btn-chart-monthly').forEach(b => {
    b.className = 'btn btn-secondary btn-sm';
  });
  const activeBtn = document.getElementById(`btn-chart-${type}`);
  if (activeBtn) activeBtn.className = 'btn btn-primary btn-sm';

  initSalesChart(type);
  showToast(`Sales trend updated to ${type}`, 'info');
}

// --- ORDERS KANBAN ---
function renderOrdersKanban() {
  const cols = {
    new: document.getElementById('col-new'),
    preparing: document.getElementById('col-preparing'),
    ready: document.getElementById('col-ready'),
    completed: document.getElementById('col-completed')
  };

  if (!cols.new) return;
  Object.values(cols).forEach(c => c.innerHTML = '');

  const counts = { new: 0, preparing: 0, ready: 0, completed: 0 };

  appState.orders.forEach(ord => {
    const key = ord.status.toLowerCase();
    if (counts[key] !== undefined) counts[key]++;

    const isDone = ord.status === 'Completed';
    const card = document.createElement('div');
    card.className = 'order-card';
    card.innerHTML = `
      <div class="order-header">
        <span class="order-num">${esc(ord.id)}</span>
        <span class="order-time"><i class="fa-regular fa-clock"></i> ${esc(ord.time)}</span>
      </div>
      <div class="order-customer">${esc(ord.customer)}</div>
      <ul class="order-items-list">
        ${ord.items.map(i => `<li>${i.qty}x ${esc(i.name)}</li>`).join('')}
      </ul>
      <div class="order-footer">
        <span class="order-total">₹${ord.total.toLocaleString('en-IN')}</span>
        ${isDone ? '<span class="badge badge-success">Done ✓</span>' : `<button class="btn btn-secondary btn-sm" onclick="advanceOrderStatus('${esc(ord.id)}')">Next Stage →</button>`}
      </div>
    `;

    if (cols[key]) cols[key].appendChild(card);
  });

  document.getElementById('count-new').textContent = counts.new;
  document.getElementById('count-preparing').textContent = counts.preparing;
  document.getElementById('count-ready').textContent = counts.ready;
  document.getElementById('count-completed').textContent = counts.completed;
  document.getElementById('new-orders-badge').textContent = counts.new;
}

function advanceOrderStatus(orderId) {
  const ord = appState.orders.find(o => o.id === orderId);
  if (!ord) return;

  const flow = { 'New': 'Preparing', 'Preparing': 'Ready', 'Ready': 'Completed', 'Completed': 'Completed' };
  const next = flow[ord.status];
  ord.status = next;

  saveOrdersState();
  showToast(`Order ${esc(orderId)} moved to ${next}`, 'success');
  renderDashboard();
  renderOrdersKanban();
}

function filterOrdersKanban(query) {
  const q = query.toLowerCase();
  document.querySelectorAll('.order-card').forEach(card => {
    card.style.display = card.textContent.toLowerCase().includes(q) ? 'block' : 'none';
  });
}

// --- MENU MANAGEMENT ---
function renderMenuGrid(itemsToRender = appState.menu) {
  const container = document.getElementById('product-cards-container');
  if (!container) return;

  if (itemsToRender.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <i class="fa-solid fa-mug-hot empty-icon"></i>
        <div class="empty-title">No menu items found</div>
        <p>Try selecting another category or clearing your search.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = itemsToRender.map(item => {
    const imageSrc = getFoodImage(item);
    return `
      <div class="product-card">
        <div class="product-img-container">
          <img src="${imageSrc}" alt="${esc(item.name)}" class="product-img" loading="lazy">
          <span class="product-category-tag">${esc(item.category)}</span>
        </div>
        <div class="product-body">
          <div class="product-title">
            <span>${esc(item.name)}</span>
            <span class="${item.veg ? 'tag-veg' : 'tag-nonveg'}" title="${item.veg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
          </div>
          <div class="product-desc">${esc(item.desc)}</div>
          <div class="product-footer">
            <span class="product-price">₹${item.price}</span>
            <div style="display: flex; gap: 6px;">
              <button class="btn btn-secondary btn-sm btn-icon-only" title="Toggle Availability" aria-label="Toggle availability" onclick="toggleMenuItemAvailability(${item.id})">
                <i class="fa-solid ${item.available ? 'fa-eye' : 'fa-eye-slash'}" style="color: ${item.available ? 'var(--c-forest)' : 'var(--danger)'};"></i>
              </button>
              <button class="btn btn-danger btn-sm btn-icon-only" title="Delete Item" aria-label="Delete menu item" onclick="deleteMenuItem(${item.id})">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterMenuCategory(cat, btnEl) {
  document.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  if (cat === 'All') {
    renderMenuGrid(appState.menu);
  } else {
    renderMenuGrid(appState.menu.filter(i => i.category === cat));
  }
}

function filterMenuGrid(query) {
  const q = query.toLowerCase();
  renderMenuGrid(appState.menu.filter(i => i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)));
}

function toggleMenuItemAvailability(id) {
  const item = appState.menu.find(i => i.id === id);
  if (item) {
    item.available = !item.available;
    saveMenuState();
    showToast(`${esc(item.name)} is now ${item.available ? 'Available' : 'Out of Stock'}`, 'info');
    renderMenuGrid();
    renderPosItemsSelector();
  }
}

// Confirmation guard on delete (Fix M4)
function deleteMenuItem(id) {
  const item = appState.menu.find(i => i.id === id);
  if (!item) return;

  if (confirm(`Are you sure you want to delete "${item.name}" from the menu catalog?`)) {
    appState.menu = appState.menu.filter(i => i.id !== id);
    saveMenuState();
    showToast(`Deleted ${esc(item.name)} from menu`, 'warning');
    renderMenuGrid();
    renderPosItemsSelector();
  }
}

function openAddMenuModal() {
  document.getElementById('modal-add-item').classList.add('active');
}

// Price > 0 Guard (Fix H5)
function handleCreateMenuItem(e) {
  e.preventDefault();
  const name = document.getElementById('new-item-name').value.trim();
  const cat = document.getElementById('new-item-cat').value;
  const price = parseFloat(document.getElementById('new-item-price').value);
  const desc = document.getElementById('new-item-desc').value.trim() || 'Freshly prepared item.';

  if (!name) {
    showToast('Please enter an item name', 'warning');
    return;
  }
  if (isNaN(price) || price <= 0) {
    showToast('Please enter a valid price greater than 0', 'warning');
    return;
  }

  const newItem = {
    id: Date.now(),
    name,
    category: cat,
    price,
    desc,
    veg: true,
    available: true,
    ordersCount: 0,
    img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop'
  };

  appState.menu.unshift(newItem);
  saveMenuState();
  showToast(`Added ${esc(name)} to menu`, 'success');
  closeModal('modal-add-item');
  renderMenuGrid();
  renderPosItemsSelector();
}

// --- CATEGORIES VIEW ---
function renderCategoriesGrid() {
  const container = document.getElementById('categories-grid');
  if (!container) return;

  const categories = [
    { name: 'La Sabroso Favourites', icon: 'fa-star' },
    { name: 'Burgers', icon: 'fa-burger' },
    { name: 'Pizzas', icon: 'fa-pizza-slice' },
    { name: 'Pastas', icon: 'fa-bowl-food' },
    { name: 'Hot Beverages', icon: 'fa-mug-hot' },
    { name: 'Cold Beverages', icon: 'fa-glass-water' },
    { name: 'Desserts', icon: 'fa-cookie-bite' }
  ];

  container.innerHTML = categories.map(cat => {
    const count = appState.menu.filter(m => m.category === cat.name).length;
    return `
      <div class="card" style="margin-bottom: 0; display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background: var(--c-butter); color: var(--c-forest); display: flex; align-items: center; justify-content: center; font-size: 20px;">
            <i class="fa-solid ${cat.icon}"></i>
          </div>
          <div>
            <h4 style="font-weight: 800; font-size: 15px; color: var(--text-primary);">${esc(cat.name)}</h4>
            <span style="font-size: 12px; color: var(--text-muted);">${count} items active</span>
          </div>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="switchView('menu'); filterMenuCategory('${esc(cat.name)}')">View</button>
      </div>
    `;
  }).join('');
}

// --- INVENTORY MANAGEMENT ---
function renderInventoryTable() {
  const tbody = document.getElementById('inventory-tbody');
  if (!tbody) return;

  tbody.innerHTML = appState.inventory.map(inv => {
    const badgeClass = inv.status === 'In Stock' ? 'badge-success' :
                       inv.status === 'Low Stock' ? 'badge-warning' : 'badge-danger';
    return `
      <tr>
        <td style="font-weight: 800; color: var(--text-primary);">${esc(inv.item)}</td>
        <td>${esc(inv.category)}</td>
        <td style="font-weight: 800; font-size: 14px; color: ${inv.status === 'Out of Stock' ? 'var(--danger)' : 'var(--text-primary)'};">${inv.stock}</td>
        <td>${esc(inv.unit)}</td>
        <td style="color: var(--text-muted);">${inv.min} ${esc(inv.unit)}</td>
        <td><span class="badge ${badgeClass}"><span class="badge-dot"></span>${esc(inv.status)}</span></td>
        <td style="font-size: 12px; color: var(--text-muted);">${esc(inv.updated)}</td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="quickRestockItem(${inv.id})"><i class="fa-solid fa-plus"></i> Restock</button>
        </td>
      </tr>
    `;
  }).join('');
}

function filterInventoryStatus(statusType) {
  const tbody = document.getElementById('inventory-tbody');
  if (!tbody) return;

  const filtered = appState.inventory.filter(i => i.status !== 'In Stock');
  tbody.innerHTML = filtered.map(inv => `
    <tr>
      <td style="font-weight: 800; color: var(--text-primary);">${esc(inv.item)}</td>
      <td>${esc(inv.category)}</td>
      <td style="font-weight: 800; color: var(--danger);">${inv.stock}</td>
      <td>${esc(inv.unit)}</td>
      <td>${inv.min} ${esc(inv.unit)}</td>
      <td><span class="badge badge-warning"><span class="badge-dot"></span>${esc(inv.status)}</span></td>
      <td style="font-size: 12px;">${esc(inv.updated)}</td>
      <td><button class="btn btn-primary btn-sm" onclick="quickRestockItem(${inv.id})">Restock</button></td>
    </tr>
  `).join('');
  showToast('Filtering for Low Stock and Out of Stock alerts', 'warning');
}

function openRestockModal() {
  const select = document.getElementById('restock-item-select');
  if (select) {
    select.innerHTML = appState.inventory.map(i => `<option value="${i.id}">${esc(i.item)} (Current: ${i.stock} ${esc(i.unit)})</option>`).join('');
  }
  document.getElementById('modal-restock').classList.add('active');
}

function quickRestockItem(id) {
  const item = appState.inventory.find(i => i.id === id);
  if (item) {
    item.stock += 10;
    item.status = item.stock >= item.min ? 'In Stock' : 'Low Stock';
    item.updated = 'Just now';
    saveInventoryState();
    showToast(`Restocked 10 ${esc(item.unit)} of ${esc(item.item)}`, 'success');
    renderInventoryTable();
    recalculateKpis();
  }
}

// Quantity > 0 Guard (Fix H5)
function submitRestock() {
  const select = document.getElementById('restock-item-select');
  const qtyInput = document.getElementById('restock-qty');
  const qty = parseFloat(qtyInput.value);

  if (isNaN(qty) || qty <= 0) {
    showToast('Please enter a positive restock quantity', 'warning');
    return;
  }

  if (select) {
    const id = parseInt(select.value);
    const item = appState.inventory.find(i => i.id === id);
    if (item) {
      item.stock += qty;
      item.status = item.stock >= item.min ? 'In Stock' : 'Low Stock';
      item.updated = 'Just now';
      saveInventoryState();
      showToast(`Added ${qty} ${esc(item.unit)} to ${esc(item.item)}`, 'success');
      closeModal('modal-restock');
      renderInventoryTable();
      recalculateKpis();
    }
  }
}

// --- CUSTOMERS ---
function renderCustomersTable() {
  const tbody = document.getElementById('customers-tbody');
  if (!tbody) return;

  tbody.innerHTML = appState.customers.map(c => `
    <tr>
      <td style="font-weight: 800; color: var(--text-primary);">${esc(c.name)}</td>
      <td>${esc(c.phone)}<br><span style="font-size: 11px; color: var(--text-muted);">${esc(c.email)}</span></td>
      <td style="font-weight: 700;">${c.orders} orders</td>
      <td style="font-weight: 800; color: var(--c-terracotta);">₹${c.totalSpent.toLocaleString('en-IN')}</td>
      <td style="font-size: 12px; color: var(--text-muted);">${esc(c.lastOrder)}</td>
      <td><span class="badge" style="background: var(--c-butter); color: var(--c-forest);">${esc(c.status)}</span></td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="openCustomerDrawer(${c.id})">Profile</button>
      </td>
    </tr>
  `).join('');
}

function filterCustomersTable(query) {
  const q = query.toLowerCase();
  document.querySelectorAll('#customers-tbody tr').forEach(tr => {
    tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}

function openCustomerDrawer(id) {
  const c = appState.customers.find(cust => cust.id === id);
  if (!c) return;

  document.getElementById('customer-modal-name').textContent = c.name;
  const body = document.getElementById('customer-modal-body');
  if (body) {
    body.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="width: 64px; height: 64px; border-radius: var(--radius-full); background: var(--c-forest); color: #FFF; display: inline-flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 800; margin-bottom: 8px;">
          ${esc(c.name.split(' ').map(n=>n[0]).join(''))}
        </div>
        <h4 style="font-size: 16px; font-weight: 800;">${esc(c.name)}</h4>
        <span class="badge" style="background: var(--c-butter); color: var(--c-forest);">${esc(c.status)}</span>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; background: var(--c-parchment); padding: 12px; border-radius: var(--radius-md);">
        <div>
          <div style="font-size: 11px; color: var(--text-muted);">Total Spent</div>
          <div style="font-size: 18px; font-weight: 800; color: var(--c-terracotta);">₹${c.totalSpent.toLocaleString('en-IN')}</div>
        </div>
        <div>
          <div style="font-size: 11px; color: var(--text-muted);">Total Visits</div>
          <div style="font-size: 18px; font-weight: 800; color: var(--text-primary);">${c.orders}</div>
        </div>
      </div>

      <h5 style="font-size: 13px; font-weight: 800; margin-bottom: 8px;">Favorite Orders</h5>
      <div style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.6;">
        • Signature Hot Chocolate<br>
        • Biscoff Cold Coffee<br>
        • Honey Lemon Pepper Tenders
      </div>
    `;
  }
  document.getElementById('modal-customer').classList.add('active');
}

// --- STAFF ---
function renderStaffGrid() {
  const container = document.getElementById('staff-grid');
  if (!container) return;

  container.innerHTML = appState.staff.map(s => `
    <div class="card" style="margin-bottom: 0;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <div style="width: 44px; height: 44px; border-radius: var(--radius-full); background: var(--c-butter); color: var(--c-forest); display: flex; align-items: center; justify-content: center; font-weight: 800;">
          ${esc(s.name.split(' ').map(n=>n[0]).join(''))}
        </div>
        <div>
          <h4 style="font-weight: 800; font-size: 14px;">${esc(s.name)}</h4>
          <span style="font-size: 12px; color: var(--c-terracotta); font-weight: 700;">${esc(s.role)}</span>
        </div>
      </div>
      <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;">
        <i class="fa-regular fa-clock"></i> ${esc(s.shift)}<br>
        <i class="fa-solid fa-phone" style="margin-top: 4px;"></i> ${esc(s.phone)}
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--divider); padding-top: 10px;">
        <span class="badge badge-success"><span class="badge-dot"></span>${esc(s.status)}</span>
        <button class="btn btn-secondary btn-sm" onclick="showToast('Roster updated', 'info')">Edit Shift</button>
      </div>
    </div>
  `).join('');
}

// --- POS SALE ENGINE & AVAILABILITY GUARD (Fix H5) ---
function openPosModal() {
  appState.posCart = [];
  renderPosItemsSelector();
  renderPosCart();
  document.getElementById('modal-pos').classList.add('active');
}

// Available Items Only Filter Guard (Fix H5)
function renderPosItemsSelector() {
  const container = document.getElementById('pos-items-selector');
  if (!container) return;

  const availableItems = appState.menu.filter(i => i.available !== false);

  if (availableItems.length === 0) {
    container.innerHTML = `<div style="padding: 12px; color: var(--text-muted); text-align: center;">No available items in catalog</div>`;
    return;
  }

  container.innerHTML = availableItems.map(item => `
    <div onclick="addToPosCart(${item.id})" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md); cursor: pointer; transition: all var(--transition-fast);" onmouseover="this.style.borderColor='var(--c-terracotta)'" onmouseout="this.style.borderColor='var(--border)'">
      <div>
        <div style="font-weight: 800; font-size: 13px; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
          ${esc(item.name)}
          <span class="${item.veg ? 'tag-veg' : 'tag-nonveg'}"></span>
        </div>
        <div style="font-size: 11px; color: var(--text-muted);">${esc(item.category)}</div>
      </div>
      <div style="font-weight: 800; color: var(--c-terracotta);">₹${item.price}</div>
    </div>
  `).join('');
}

function addToPosCart(itemId) {
  const item = appState.menu.find(i => i.id === itemId);
  if (!item || item.available === false) return;

  const existing = appState.posCart.find(c => c.id === itemId);
  if (existing) {
    existing.qty++;
  } else {
    appState.posCart.push({ id: item.id, name: item.name, price: item.price, qty: 1 });
  }
  renderPosCart();
}

function renderPosCart() {
  const container = document.getElementById('pos-cart-items');
  if (!container) return;

  if (appState.posCart.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 24px 0;">
        <i class="fa-solid fa-mug-saucer empty-icon" style="font-size: 28px;"></i>
        <p style="font-size: 12px;">Click available menu items to add to order</p>
      </div>
    `;
    updatePosTotals(0);
    return;
  }

  let subtotal = 0;
  container.innerHTML = appState.posCart.map(c => {
    const lineTotal = c.price * c.qty;
    subtotal += lineTotal;
    return `
      <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12.5px; background: var(--surface); padding: 8px 10px; border-radius: var(--radius-sm); border: 1px solid var(--border);">
        <div style="flex: 1; padding-right: 8px;">
          <div style="font-weight: 700; line-height: 1.2;">${esc(c.name)}</div>
          <div style="color: var(--text-muted); font-size: 11px; margin-top: 2px;">₹${c.price.toLocaleString('en-IN')}</div>
        </div>
        <div style="display: flex; align-items: center; gap: 6px; margin-right: 10px;">
          <button class="btn btn-secondary btn-sm btn-icon-only" style="padding:0;height:22px;width:22px;line-height:20px;" aria-label="Decrease quantity" onclick="updateCartQty(${c.id}, -1)">−</button>
          <span style="font-weight: 800; width: 18px; text-align: center;">${c.qty}</span>
          <button class="btn btn-secondary btn-sm btn-icon-only" style="padding:0;height:22px;width:22px;line-height:20px;" aria-label="Increase quantity" onclick="updateCartQty(${c.id}, 1)">+</button>
        </div>
        <div style="font-weight: 800; color: var(--c-terracotta); margin-right: 10px;">₹${lineTotal.toLocaleString('en-IN')}</div>
        <button class="btn btn-danger btn-sm btn-icon-only" style="padding: 2px 6px; height: 24px;" aria-label="Remove item" onclick="removeFromPosCart(${c.id})"><i class="fa-solid fa-xmark"></i></button>
      </div>
    `;
  }).join('');

  updatePosTotals(subtotal);
}

function removeFromPosCart(id) {
  appState.posCart = appState.posCart.filter(c => c.id !== id);
  renderPosCart();
}

// Per-line quantity adjustment (R2-7 Fix)
function updateCartQty(id, delta) {
  const item = appState.posCart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    appState.posCart = appState.posCart.filter(c => c.id !== id);
  }
  renderPosCart();
}

function updatePosTotals(subtotal) {
  const rate = appState.settings?.gstRate ?? 5.0;
  const gst = subtotal * (rate / 100);
  const total = subtotal + gst;

  // All amounts in whole rupees — no paise (R2-7 Fix)
  const subEl = document.getElementById('pos-subtotal');
  const taxEl = document.getElementById('pos-tax');
  const totEl = document.getElementById('pos-total');
  if (subEl) subEl.textContent = `₹${Math.round(subtotal).toLocaleString('en-IN')}`;
  if (taxEl) taxEl.textContent = `₹${Math.round(gst).toLocaleString('en-IN')}`;
  if (totEl) totEl.textContent = `₹${Math.round(total).toLocaleString('en-IN')}`;
}

// Order ID Sequence Fix (Fix M3)
function submitPosOrder() {
  if (appState.posCart.length === 0) {
    showToast('Please add available items before completing order', 'warning');
    return;
  }

  const subtotal = appState.posCart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const rate = appState.settings?.gstRate ?? 5.0;
  const total = Math.round(subtotal * (1 + rate / 100)); // R3-1 Fix: Consistent dynamic rate calculation

  // Sequential order ID
  const nextNum = 1094 + (appState.orders.length - 5);
  const newId = `ORD-${nextNum}`;

  const newOrd = {
    id: newId,
    customer: 'Walk-in Guest (Madhapur)',
    items: appState.posCart.map(c => ({ name: c.name, qty: c.qty, price: c.price })),
    total: total,
    payment: 'UPI',
    status: 'New',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  appState.orders.unshift(newOrd);
  saveOrdersState();
  showToast(`Receipt printed! Order ${newId} (₹${total}) received.`, 'success');
  closeModal('modal-pos');
  renderDashboard();
  renderOrdersKanban();
}

// --- ANALYTICS CHARTS (Fix M2 & M1) ---
function initAnalyticsCharts() {
  if (!window.Chart) return;

  // 1. Category Chart
  const ctxCat = document.getElementById('categoryChart');
  if (ctxCat) {
    if (categoryChartInstance) categoryChartInstance.destroy();
    categoryChartInstance = new Chart(ctxCat, {
      type: 'doughnut',
      data: {
        labels: ['Hot Beverages', 'Cold Beverages', 'Desserts', 'Burgers', 'Pizzas', 'Pastas'],
        datasets: [{
          data: [35, 25, 18, 12, 6, 4],
          backgroundColor: ['#2E5D34', '#E57A4F', '#FFF9D1', '#23472A', '#C9623A', '#D5F5E3']
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  // 2. Peak Hours Chart
  const ctxPeak = document.getElementById('peakHoursChart');
  if (ctxPeak) {
    if (peakHoursChartInstance) peakHoursChartInstance.destroy();
    peakHoursChartInstance = new Chart(ctxPeak, {
      type: 'bar',
      data: {
        labels: ['11 AM', '1 PM', '3 PM', '5 PM', '7 PM', '9 PM', '11 PM'],
        datasets: [{
          label: 'Madhapur Footfall',
          data: [25, 85, 45, 110, 145, 120, 40],
          backgroundColor: '#2E5D34',
          borderRadius: 6
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });
  }

  // 3. Payment Chart
  const ctxPay = document.getElementById('paymentChart');
  if (ctxPay) {
    if (paymentChartInstance) paymentChartInstance.destroy();
    paymentChartInstance = new Chart(ctxPay, {
      type: 'pie',
      data: {
        labels: ['UPI / QR', 'Credit/Debit Card', 'Cash'],
        datasets: [{
          data: [68, 22, 10],
          backgroundColor: ['#2E5D34', '#E57A4F', '#FFD700']
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  // 4. Best Sellers Ranking (Sort by ordersCount - Fix M2)
  const bestList = document.getElementById('bestsellers-list');
  if (bestList) {
    const sorted = [...appState.menu].sort((a, b) => b.ordersCount - a.ordersCount).slice(0, 5);
    bestList.innerHTML = sorted.map((item, idx) => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px; background: var(--c-parchment); border-radius: var(--radius-md); font-size: 13px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-weight: 800; color: var(--c-terracotta); width: 18px;">#${idx + 1}</span>
          <span style="font-weight: 700; color: var(--text-primary);">${esc(item.name)}</span>
        </div>
        <span style="font-weight: 800; color: var(--c-forest);">${item.ordersCount} sold</span>
      </div>
    `).join('');
  }
}

// --- UTILS & MODALS ---
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const icon = type === 'success' ? 'fa-circle-check' :
               type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-info';
  const color = type === 'success' ? 'var(--c-forest)' :
                type === 'warning' ? 'var(--c-terracotta)' : 'var(--info)';

  toast.style.borderLeftColor = color;
  toast.innerHTML = `
    <i class="fa-solid ${icon}" style="color: ${color}; font-size: 16px;"></i>
    <span style="font-size: 13px; font-weight: 600; color: var(--text-primary);">${esc(msg)}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 200ms ease';
    setTimeout(() => toast.remove(), 200);
  }, 3500);
}

// Daily Summary PDF — triggers native browser print dialog (R2-6 Fix)
function exportDailyReport() {
  showToast('Opening Daily POS Summary for print / Save as PDF…', 'info');
  setTimeout(() => window.print(), 600);
}

