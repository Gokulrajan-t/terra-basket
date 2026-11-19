import { useState } from 'react';
import { useApp } from '../context';
import { TopBar, Icon, Toggle, Modal } from '../components/ui';

export default function Settings() {
  const { settings, setSettings, logout, go } = useApp();
  const [about, setAbout] = useState(false);
  const set = (k) => (v) => setSettings({ ...settings, [k]: v });

  return (
    <div className="screen sub-screen">
      <TopBar back bell={false} />
      <div className="page-title row-between">
        <h1>Settings</h1>
        <Icon name="sliders" size={24} color="var(--teal)" />
      </div>

      <section className="card">
        <h4>Account</h4>
        <ul className="list">
          <li onClick={() => go('profile')}>
            <Icon name="user" size={20} /><span>Edit Profile</span><Icon name="chevron" size={20} color="var(--muted)" />
          </li>
        </ul>
      </section>

      <section className="card">
        <h4>Preferences</h4>
        <ul className="list">
          <li><Icon name="bell" size={20} /><span>Notifications</span><Toggle on={settings.notifications} onChange={set('notifications')} /></li>
          <li><Icon name="moon" size={20} /><span>Dark Mode</span><Toggle on={settings.dark} onChange={set('dark')} /></li>
          <li><Icon name="refresh" size={20} /><span>Auto Sync</span><Toggle on={settings.sync} onChange={set('sync')} /></li>
        </ul>
      </section>
      <p className="muted pad">Current mode: {settings.dark ? 'Dark Mode' : 'Light Mode'}</p>

      <section className="card">
        <h4>Support</h4>
        <ul className="list">
          <li onClick={() => setAbout(true)}>
            <Icon name="info" size={20} /><span>About Terra Basket</span><Icon name="chevron" size={20} color="var(--muted)" />
          </li>
        </ul>
      </section>

      <button className="btn outline-red" onClick={logout}>Logout</button>

      {about && (
        <Modal title="About Terra Basket" onClose={() => setAbout(false)}>
          <p className="muted">Clay · Cooling · Naturally. Version 1.0.0</p>
          <button className="btn primary" onClick={() => setAbout(false)}>Close</button>
        </Modal>
      )}
    </div>
  );
}
