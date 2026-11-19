import { useApp } from '../context';
import { todayTip } from '../data';
import { Icon, TopBar } from '../components/ui';

const FEATURES = [
  { icon: 'zapoff', label: 'No Power', color: '#3aa76d' },
  { icon: 'drop', label: 'Moisture', color: '#1c8cf0' },
  { icon: 'leaf', label: 'Eco Safe', color: '#f59a1b' },
];
const ACTIONS = [
  { icon: 'plus', label: 'Add', color: '#2cc5b4', to: 'add' },
  { icon: 'search', label: 'Search', color: '#1c8cf0', to: 'storage' },
  { icon: 'leaf', label: 'Tips', color: '#f59a1b', to: 'tips' },
  { icon: 'bars', label: 'Report', color: '#9c27b0', to: 'reports' },
];

export default function Home() {
  const { go } = useApp();
  return (
    <div className="screen tab-screen">
      <TopBar />

      <section className="hero">
        <div className="hero-bg">🍎🥬🍊🍅🥕🍋</div>
        <h1>Hello! <span>Terra Basket</span></h1>
        <p>Natural cooling solution<br />for fruits &amp; vegetables.</p>
      </section>

      <section className="card">
        <h2>Natural Cooling Features</h2>
        <div className="features">
          {FEATURES.map((f) => (
            <div key={f.label}>
              <Icon name={f.icon} size={38} color={f.color} />
              <b>{f.label}</b>
            </div>
          ))}
        </div>
      </section>

      <h2 className="section-h">Quick Actions</h2>
      <div className="actions">
        {ACTIONS.map((a) => (
          <button key={a.label} className="action" onClick={() => go(a.to)}>
            <Icon name={a.icon} size={34} color={a.color} />
            <span>{a.label}</span>
          </button>
        ))}
      </div>

      <section className="tip-card">
        <div className="tip-img">🧺</div>
        <div>
          <h3>Tip of the Day</h3>
          <p>{todayTip()}</p>
        </div>
      </section>

      <section className="card">
        <div className="row-between">
          <h2>Overview</h2>
          <a className="link" onClick={() => go('climate')}>View Analytics</a>
        </div>
        <div className="overview">
          <div><b>16</b><span>Temperature</span></div>
          <div><b>14</b><span>Humidity</span></div>
          <div><b>98%</b><span>Saved</span></div>
        </div>
      </section>
    </div>
  );
}
