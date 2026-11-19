import { useApp } from '../context';
import { DAYS, WEEK_STORED, WEEK_FRESH, daysLeft } from '../data';
import { TopBar, StatCard, Table, Icon } from '../components/ui';

export default function Reports() {
  const { items, toast } = useApp();
  const total = items.length;
  const fresh = items.filter((i) => daysLeft(i) > 2).length;
  const expired = items.filter((i) => daysLeft(i) === 0).length;

  const text = () =>
    [
      'TERRA BASKET - Weekly Report',
      `Total items: ${total}`,
      `Fresh items: ${fresh}`,
      `Expired: ${expired}`,
      'Energy saved: 18%',
      'Food saved: 25 kg | Carbon footprint reduced: 12% | Water conserved: 30 L',
      '',
      'Day, Stored, Fresh',
      ...WEEK_STORED.map((s, i) => `${DAYS[i]}, ${s}, ${WEEK_FRESH[i]}`),
    ].join('\n');

  const download = () => {
    try {
      const url = URL.createObjectURL(new Blob([text()], { type: 'text/plain' }));
      const a = document.createElement('a');
      a.href = url; a.download = 'terra-basket-report.txt';
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
      toast('Report downloaded');
    } catch { toast('Download not supported here'); }
  };

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: 'Terra Basket Report', text: text() });
      else { await navigator.clipboard.writeText(text()); toast('Report copied to clipboard'); }
    } catch { /* user cancelled */ }
  };

  return (
    <div className="screen sub-screen">
      <TopBar back />
      <div className="page-title center">
        <h1>Reports 📄</h1>
        <p className="teal">Monitor your storage performance</p>
      </div>

      <div className="grid2 outlined">
        <StatCard value={total} label="Total Items" />
        <StatCard value={fresh} label="Fresh Items" />
        <StatCard value={expired} label="Expired" />
        <StatCard value="18%" label="Energy Saved" />
      </div>

      <section className="card">
        <h3>🌿 Eco Impact Summary</h3>
        <p className="muted lines">Food Saved: 25 kg<br />Carbon Footprint Reduced: 12%<br />Water Conservation: 30 L<br />Energy Efficiency: Excellent</p>
      </section>

      <section className="card">
        <h3>📋 Weekly Storage Report</h3>
        <Table head={['Day', 'Stored', 'Fresh']}
               rows={WEEK_STORED.map((s, i) => [DAYS[i], s, WEEK_FRESH[i]])} />
      </section>

      <section className="health">
        <h3>📈 Overall Performance</h3>
        <b className="good">🟢 Excellent</b>
        <p>Your eco-friendly fridge is maintaining optimal freshness and reducing food waste.</p>
      </section>

      <button className="btn primary" onClick={download}><Icon name="download" size={18} color="#fff" /> Download Report</button>
      <button className="btn dark" onClick={share}><Icon name="share" size={18} color="#fff" /> Share Report</button>
    </div>
  );
}
