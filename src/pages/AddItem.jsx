import { useState } from 'react';
import { useApp } from '../context';
import { CATEGORIES } from '../data';
import { TopBar, PageTitle, StatCard, Icon } from '../components/ui';

export default function AddItem() {
  const { items, setItems, go, toast } = useApp();
  const [cat, setCat] = useState('Fruits');
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [days, setDays] = useState('');
  const [err, setErr] = useState('');

  const submit = () => {
    if (!name.trim()) return setErr('Enter item name');
    if (!qty.trim()) return setErr('Enter quantity');
    if (!(Number(days) > 0)) return setErr('Enter expected storage days');
    setItems([{ id: Date.now(), name: name.trim(), category: cat, qty: qty.trim(), days: Number(days), addedAt: Date.now() }, ...items]);
    toast(`${name.trim()} added to storage 🌿`);
    go('storage');
  };

  const emoji = CATEGORIES.find((c) => c.key === cat).emoji;

  return (
    <div className="screen tab-screen">
      <TopBar />
      <PageTitle title="Add Fresh Item" emoji="🌿" sub="Store naturally, stay fresh longer" />

      <div className="grid2">
        <StatCard icon="box" value={items.length} label="Items Stored" />
        <StatCard icon="leaf" value="89%" label="Eco Score" />
      </div>

      <section className="card form-card">
        <h3>Select Category</h3>
        <div className="chips">
          {CATEGORIES.map((c) => (
            <button key={c.key} className={'chip' + (cat === c.key ? ' on' : '')} onClick={() => setCat(c.key)}>{c.key}</button>
          ))}
        </div>

        <label className="field">
          <span className="field-label">Item Name</span>
          <span className="input-wrap"><span className="emoji">{emoji}</span>
            <input placeholder="Apple" value={name} onChange={(e) => setName(e.target.value)} /></span>
        </label>
        <label className="field">
          <span className="field-label">Quantity</span>
          <span className="input-wrap"><span className="emoji">📦</span>
            <input placeholder="eg.5 kg / 10 pcs" value={qty} onChange={(e) => setQty(e.target.value)} /></span>
        </label>
        <label className="field">
          <span className="field-label">Expected Storage Days</span>
          <span className="input-wrap"><span className="emoji">🗓️</span>
            <input type="number" min="1" placeholder="eg.7" value={days} onChange={(e) => setDays(e.target.value)} /></span>
        </label>

        <div className="info-box">
          <Icon name="leaf" size={20} color="var(--green)" />
          <p>TERRA BASKET keeps fruits and vegetables fresh longer without electricity.</p>
        </div>
        {err && <div className="form-error">{err}</div>}
        <button className="btn primary" onClick={submit}><Icon name="plus" size={20} color="#fff" /> Add Item</button>
      </section>
    </div>
  );
}
