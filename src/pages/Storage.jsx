import { useState } from 'react';
import { useApp } from '../context';
import { CATEGORIES, daysLeft, freshness, emojiFor } from '../data';
import { TopBar, PageTitle, Icon } from '../components/ui';

export default function Storage() {
  const { items, setItems, toast, go } = useApp();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');

  const list = items.filter(
    (i) => (cat === 'All' || i.category === cat) && i.name.toLowerCase().includes(q.toLowerCase())
  );
  const soon = items.filter((i) => daysLeft(i) <= 2).length;

  const remove = (it) => {
    setItems(items.filter((x) => x.id !== it.id));
    toast(`${it.name} removed`);
  };

  return (
    <div className="screen tab-screen">
      <TopBar />
      <PageTitle title="My Storage" emoji="🧺" sub={`${items.length} items · ${soon} expiring soon`} />

      <label className="input-wrap search">
        <Icon name="search" size={20} color="var(--teal)" />
        <input placeholder="Search items..." value={q} onChange={(e) => setQ(e.target.value)} />
      </label>

      <div className="chips scroll">
        {['All', ...CATEGORIES.map((c) => c.key)].map((c) => (
          <button key={c} className={'chip' + (cat === c ? ' on' : '')} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      {list.length === 0 && (
        <div className="empty">
          <div>🧺</div>
          <p>No items found</p>
          <button className="btn primary small" onClick={() => go('add')}>Add Item</button>
        </div>
      )}

      {list.map((it) => {
        const left = daysLeft(it), fr = freshness(it);
        const color = fr > 0.5 ? 'var(--green)' : fr > 0.2 ? '#f59a1b' : '#e5484d';
        return (
          <div className="item card" key={it.id}>
            <div className="item-emoji">{emojiFor(it.category)}</div>
            <div className="item-body">
              <div className="row-between">
                <b>{it.name}</b>
                <button className="icon-btn" onClick={() => remove(it)} aria-label={`Remove ${it.name}`}>
                  <Icon name="trash" size={18} color="#e5484d" />
                </button>
              </div>
              <span className="muted">{it.category} · {it.qty}</span>
              <div className="bar"><i style={{ width: `${Math.max(4, fr * 100)}%`, background: color }} /></div>
              <span className="muted" style={{ color }}>
                {left === 0 ? 'Expired' : `${left} day${left > 1 ? 's' : ''} left`}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
