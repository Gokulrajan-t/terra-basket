import { useState, useEffect, useCallback } from 'react';
import { AppCtx } from './context';
import { LS, seedItems, ALERTS } from './data';
import { Icon, Modal } from './components/ui';

import Splash from './pages/Splash';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AddItem from './pages/AddItem';
import Storage from './pages/Storage';
import Profile from './pages/Profile';
import Climate from './pages/Climate';
import Tips from './pages/Tips';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

const SCREENS = {
  splash: Splash, login: Login, register: Register,
  home: Home, add: AddItem, storage: Storage, profile: Profile,
  climate: Climate, tips: Tips, reports: Reports, settings: Settings,
};
const TABS = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'add', label: 'AddItem', icon: 'plus' },
  { key: 'storage', label: 'Storage', icon: 'box' },
  { key: 'profile', label: 'Profile', icon: 'user' },
];
const TAB_KEYS = TABS.map((t) => t.key);

export default function App() {
  const [stack, setStack] = useState(['splash']);
  const [user, setUser] = useState(() => LS.get('session', null));
  const [items, setItems] = useState(() => LS.get('items', seedItems()));
  const [settings, setSettings] = useState(() => LS.get('settings', { notifications: true, dark: false, sync: true }));
  const [toastMsg, setToastMsg] = useState('');
  const [drawer, setDrawer] = useState(false);
  const [notif, setNotif] = useState(false);

  const screen = stack[stack.length - 1];

  // persist
  useEffect(() => { user ? LS.set('session', user) : LS.remove('session'); }, [user]);
  useEffect(() => LS.set('items', items), [items]);
  useEffect(() => {
    LS.set('settings', settings);
    document.documentElement.classList.toggle('dark', settings.dark);
  }, [settings]);

  // navigation
  const go = useCallback((s) => {
    setDrawer(false);
    setStack((st) => (TAB_KEYS.includes(s) || s === 'login' ? [s] : [...st, s]));
    window.scrollTo?.(0, 0);
  }, []);
  const reset = useCallback((s) => setStack([s]), []);
  const back = useCallback(() => setStack((st) => (st.length > 1 ? st.slice(0, -1) : st)), []);

  const toast = useCallback((msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2200);
  }, []);

  const logout = () => {
    setDrawer(false);
    setUser(null);
    reset('login');
    toast('Logged out');
  };

  // guard: private screens need a user
  const isPublic = ['splash', 'login', 'register'].includes(screen);
  const Screen = !isPublic && !user ? Login : SCREENS[screen];
  const showTabs = TAB_KEYS.includes(screen) && user;

  const ctx = {
    user, setUser, items, setItems, settings, setSettings,
    go, back, reset, toast, logout,
    openDrawer: () => setDrawer(true),
    openNotif: () => setNotif(true),
  };

  return (
    <AppCtx.Provider value={ctx}>
      <div className="app">
        <Screen key={screen} />

        {showTabs && (
          <nav className="tabbar">
            {TABS.map((t) => (
              <button key={t.key} className={screen === t.key ? 'active' : ''} onClick={() => go(t.key)}>
                <Icon name={t.icon} size={28} />
                <span>{t.label}</span>
              </button>
            ))}
          </nav>
        )}

        {drawer && (
          <div className="drawer-bg" onClick={() => setDrawer(false)}>
            <aside className="drawer" onClick={(e) => e.stopPropagation()}>
              <h2>🧺 Terra Basket</h2>
              <p className="muted">{user?.name}</p>
              <ul className="list">
                {[['home', 'Home', 'home'], ['storage', 'My Storage', 'box'], ['climate', 'Climate', 'drop'],
                  ['reports', 'Reports', 'bars'], ['tips', 'Eco Tips', 'leaf'], ['settings', 'Settings', 'sliders']].map(([k, l, i]) => (
                  <li key={k} onClick={() => go(k)}><Icon name={i} size={20} /><span>{l}</span></li>
                ))}
                <li onClick={logout}><Icon name="logout" size={20} color="#e5484d" /><span style={{ color: '#e5484d' }}>Logout</span></li>
              </ul>
            </aside>
          </div>
        )}

        {notif && (
          <Modal title="Notifications" onClose={() => setNotif(false)}>
            {settings.notifications ? (
              <ul className="alerts">
                {ALERTS.map((a) => <li key={a.id}>⚠️ {a.text}</li>)}
              </ul>
            ) : <p className="muted">Notifications are turned off in Settings.</p>}
            <button className="btn primary" onClick={() => setNotif(false)}>Close</button>
          </Modal>
        )}

        {toastMsg && <div className="toast">{toastMsg}</div>}
      </div>
    </AppCtx.Provider>
  );
}
