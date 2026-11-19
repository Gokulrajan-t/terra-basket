import { useState } from 'react';
import { useApp } from '../context';

// ---------- Icons (inline SVG, no library needed) ----------
const P = {
  home: <path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />,
  plus: <><circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" /></>,
  box: <><path d="M21 8l-9-5-9 5v8l9 5 9-5z" /><path d="M3 8l9 5 9-5M12 13v8" /></>,
  user: <><circle cx="12" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  search: <><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.3-4.3" /></>,
  leaf: <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z" /><path d="M2 21c0-3 1.9-5.5 5-7" /></>,
  bars: <path d="M12 20V10M18 20V4M6 20v-4" />,
  drop: <path d="M12 2.7s7 6.3 7 11.3a7 7 0 0 1-14 0c0-5 7-11.3 7-11.3z" />,
  zapoff: <><path d="M12.4 2.1L4 14h7l-1 8 4.5-6.5" /><path d="M2 2l20 20" /></>,
  eye: <><path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  eyeoff: <><path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z" /><circle cx="12" cy="12" r="3" /><path d="M3 3l18 18" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>,
  back: <path d="M19 12H5M12 19l-7-7 7-7" />,
  chevron: <path d="M9 18l6-6-6-6" />,
  sliders: <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />,
  info: <><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></>,
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />,
  refresh: <path d="M23 4v6h-6M1 20v-6h6M3.5 9a9 9 0 0 1 14.8-3.4L23 10M1 14l4.7 4.4A9 9 0 0 0 20.5 15" />,
  trash: <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />,
  check: <path d="M20 6L9 17l-5-5" />,
  x: <path d="M18 6L6 18M6 6l12 12" />,
  download: <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />,
  share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" /></>,
  clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
  logout: <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />,
  edit: <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />,
};

export function Icon({ name, size = 22, color = 'currentColor', sw = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
         strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {P[name]}
    </svg>
  );
}

// ---------- Logo (SVG clay basket). Replace with <img src="/logo.png"> if you have the real file ----------
export function Logo({ size = 120, textColor = '#b5683a' }) {
  return (
    <div className="logo" style={{ width: size * 1.6 }}>
      <svg width={size * 0.8} height={size * 0.62} viewBox="0 0 120 92">
        <path d="M30 14c-8-8 8-10 0-20" transform="translate(30 20)" stroke="#aeb9bd" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".8" />
        <path d="M60 22c-8-8 8-10 0-18" stroke="#aeb9bd" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".8" />
        <ellipse cx="60" cy="40" rx="48" ry="12" fill="#8e4a26" />
        <path d="M12 40c0 34 20 50 48 50s48-16 48-50z" fill="#c6733c" />
        {[26, 42, 58, 74, 90].map((x) => (
          <rect key={x} x={x - 3} y="52" width="6" height="22" rx="3" fill="#7ee0d2" opacity=".9" />
        ))}
        <ellipse cx="60" cy="40" rx="48" ry="12" fill="none" stroke="#a65a2c" strokeWidth="3" />
      </svg>
      <div className="logo-word" style={{ color: textColor, fontSize: size * 0.34 }}>terra</div>
      <div className="logo-sub" style={{ color: textColor, fontSize: size * 0.11 }}>— BASKET —</div>
    </div>
  );
}

// ---------- Form field ----------
export function Field({ label, icon, type = 'text', value, onChange, placeholder, password, error }) {
  const [show, setShow] = useState(false);
  return (
    <label className="field">
      {label && <span className="field-label">{label}</span>}
      <span className={'input-wrap' + (error ? ' has-error' : '')}>
        {icon && <Icon name={icon} size={20} color="var(--teal)" />}
        <input
          type={password && !show ? 'password' : type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
        {password && (
          <button type="button" className="eye" onClick={() => setShow(!show)} aria-label="Toggle password">
            <Icon name={show ? 'eyeoff' : 'eye'} size={20} color="var(--teal)" />
          </button>
        )}
      </span>
      {error && <span className="field-error">{error}</span>}
    </label>
  );
}

// ---------- Header with menu / back + bell ----------
export function TopBar({ back = false, bell = true }) {
  const { back: goBack, openDrawer, openNotif } = useApp();
  return (
    <div className="topbar">
      <button className="icon-btn" onClick={back ? goBack : openDrawer} aria-label={back ? 'Back' : 'Menu'}>
        <Icon name={back ? 'back' : 'menu'} size={28} color="var(--ink)" />
      </button>
      {bell ? (
        <button className="icon-btn" onClick={openNotif} aria-label="Notifications">
          <Icon name="bell" size={28} color="var(--ink)" />
        </button>
      ) : <span />}
    </div>
  );
}

export function PageTitle({ title, sub, emoji }) {
  return (
    <div className="page-title">
      <h1>{title} {emoji}</h1>
      {sub && <p>{sub}</p>}
    </div>
  );
}

export function StatCard({ value, label, icon }) {
  return (
    <div className="stat-card">
      {icon && <Icon name={icon} size={24} color="var(--teal)" />}
      <b>{value}</b>
      <span>{label}</span>
    </div>
  );
}

export function Modal({ title, children, onClose }) {
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {title && <h3>{title}</h3>}
        {children}
      </div>
    </div>
  );
}

export function Toggle({ on, onChange }) {
  return (
    <button className={'toggle' + (on ? ' on' : '')} onClick={() => onChange(!on)} role="switch" aria-checked={on}>
      <i />
    </button>
  );
}

export function Table({ head, rows }) {
  return (
    <table className="table">
      <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
    </table>
  );
}
