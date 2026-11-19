// ---------- localStorage wrapper (memory fallback if blocked) ----------
const mem = {};
export const LS = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem('tb_' + key);
      return v ? JSON.parse(v) : fallback;
    } catch {
      return key in mem ? mem[key] : fallback;
    }
  },
  set(key, value) {
    mem[key] = value;
    try { localStorage.setItem('tb_' + key, JSON.stringify(value)); } catch {}
  },
  remove(key) {
    delete mem[key];
    try { localStorage.removeItem('tb_' + key); } catch {}
  },
};

// ---------- static data ----------
export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const WEEK_TEMP = [22, 24, 23, 25, 24, 23, 22];
export const WEEK_HUM = [60, 63, 58, 65, 67, 64, 62];
export const WEEK_STORED = [12, 14, 10, 15, 18];
export const WEEK_FRESH = [11, 13, 9, 14, 17];

export const CATEGORIES = [
  { key: 'Fruits', emoji: '🍎' },
  { key: 'Vegetables', emoji: '🥬' },
  { key: 'Grains', emoji: '🌾' },
];
export const emojiFor = (cat) => CATEGORIES.find((c) => c.key === cat)?.emoji || '🧺';

export const TIPS = [
  { icon: 'leaf', title: 'Store Vegetables Properly', text: 'Keep leafy greens in airtight containers with a paper towel to increase freshness.' },
  { icon: 'trash', title: 'Avoid Food Waste', text: 'Plan your meals weekly to reduce unnecessary purchases and waste.' },
  { icon: 'clock', title: 'Check Expiry Dates', text: 'Always place older items in front to use them first (FIFO method).' },
  { icon: 'refresh', title: 'Use Leftovers Smartly', text: 'Transform leftovers into new meals instead of discarding them.' },
  { icon: 'drop', title: 'Keep Clay Moist', text: 'Sprinkle water on the clay basket every morning so evaporative cooling keeps working.' },
];
export const TIP_OF_THE_DAY = [
  'Store leafy vegetables in the upper layer for better freshness.',
  'Wet the clay basket daily for stronger evaporative cooling.',
  'Keep fruits like apples away from leafy greens to avoid early ripening.',
  'Place the basket in a shaded, airy spot — not in direct sunlight.',
];
export const todayTip = () => TIP_OF_THE_DAY[new Date().getDate() % TIP_OF_THE_DAY.length];

export const ALERTS = [
  { id: 1, text: 'Humidity dipped to 58% on Wednesday. Sprinkle some water on the basket.' },
  { id: 2, text: 'Temperature peaked at 25°C on Thursday. Move the basket to shade.' },
];

// ---------- items ----------
const DAY = 864e5;
export const seedItems = () => {
  const now = Date.now();
  return [
    { id: 1, name: 'Apple', category: 'Fruits', qty: '2 kg', days: 14, addedAt: now - 2 * DAY },
    { id: 2, name: 'Spinach', category: 'Vegetables', qty: '500 g', days: 5, addedAt: now - 3 * DAY },
    { id: 3, name: 'Tomato', category: 'Vegetables', qty: '1.5 kg', days: 7, addedAt: now - 1 * DAY },
    { id: 4, name: 'Rice', category: 'Grains', qty: '5 kg', days: 90, addedAt: now - 10 * DAY },
    { id: 5, name: 'Banana', category: 'Fruits', qty: '12 pcs', days: 4, addedAt: now - 3.5 * DAY },
    { id: 6, name: 'Carrot', category: 'Vegetables', qty: '1 kg', days: 10, addedAt: now - 2 * DAY },
  ];
};
export const daysLeft = (item) =>
  Math.max(0, Math.ceil(item.days - (Date.now() - item.addedAt) / DAY));
export const freshness = (item) => daysLeft(item) / item.days; // 0..1

// ---------- demo account ----------
export const seedUsers = () => [
  { name: 'Lavanya Priya', email: 'lavpriya@email.com', phone: '9876543210', password: '123456' },
];
