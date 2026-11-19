import { useState } from 'react';
import { useApp } from '../context';
import { LS, seedUsers } from '../data';
import { TopBar, PageTitle, StatCard, Icon, Logo, Modal, Field } from '../components/ui';

export default function Profile() {
  const { user, setUser, items, go, logout, toast, openNotif } = useApp();
  const [editing, setEditing] = useState(false);
  const [about, setAbout] = useState(false);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || '');

  const save = () => {
    if (name.trim().length < 2) return toast('Enter a valid name');
    const updated = { ...user, name: name.trim(), phone };
    const users = LS.get('users', seedUsers()).map((u) => (u.email === user.email ? updated : u));
    LS.set('users', users);
    setUser(updated);
    setEditing(false);
    toast('Profile updated ✅');
  };

  const rows = [
    { icon: 'user', label: 'Edit Profile', onClick: () => setEditing(true) },
    { icon: 'bell', label: 'Notifications', onClick: openNotif },
    { icon: 'sliders', label: 'Settings', onClick: () => go('settings') },
    { icon: 'info', label: 'About Terra Basket', onClick: () => setAbout(true) },
  ];

  return (
    <div className="screen tab-screen">
      <TopBar bell={false} />
      <PageTitle title="Profile" emoji="🌿" />

      <section className="card profile-card">
        <Logo size={70} />
        <h2>{user.name}</h2>
        <p className="muted">{user.email}</p>
      </section>

      <div className="grid2 tinted">
        <StatCard icon="box" value={items.length} label="Items" />
        <StatCard icon="zapoff" value="18%" label="Energy Saved" />
        <StatCard icon="leaf" value="3.5kg" label="Food Saved" />
        <StatCard icon="drop" value="89%" label="Freshness" />
      </div>

      <section className="card">
        <h2>Account Settings</h2>
        <ul className="list">
          {rows.map((r) => (
            <li key={r.label} onClick={r.onClick}>
              <Icon name={r.icon} size={22} color="var(--ink)" />
              <span>{r.label}</span>
              <Icon name="chevron" size={20} color="var(--muted)" />
            </li>
          ))}
        </ul>
      </section>

      <button className="btn primary" onClick={() => setEditing(true)}>Edit Profile</button>
      <button className="btn outline-red" onClick={logout}>Logout</button>

      {editing && (
        <Modal title="Edit Profile" onClose={() => setEditing(false)}>
          <Field label="Name" icon="user" value={name} onChange={setName} placeholder="Enter name" />
          <Field label="Phone" icon="phone" type="tel" value={phone} onChange={setPhone} placeholder="Enter phone" />
          <div className="row-gap">
            <button className="btn ghost" onClick={() => setEditing(false)}>Cancel</button>
            <button className="btn primary" onClick={save}>Save</button>
          </div>
        </Modal>
      )}
      {about && (
        <Modal title="About Terra Basket" onClose={() => setAbout(false)}>
          <p className="muted">Terra Basket is a natural clay-cooling storage that keeps fruits and vegetables fresh without electricity. This app helps you track what you store, monitor climate and reduce food waste.</p>
          <p className="muted">Version 1.0.0</p>
          <button className="btn primary" onClick={() => setAbout(false)}>Close</button>
        </Modal>
      )}
    </div>
  );
}
