import { TIPS } from '../data';
import { TopBar, Icon } from '../components/ui';

export default function Tips() {
  return (
    <div className="screen sub-screen">
      <TopBar back />
      <div className="page-title center">
        <h1>Eco Tips</h1>
        <p className="muted">Small habits • Big impact 🌍</p>
      </div>
      {TIPS.map((t) => (
        <section className="card tip-row" key={t.title}>
          <div className="tip-ico"><Icon name={t.icon} size={22} color="var(--green)" /></div>
          <div>
            <h3>{t.title}</h3>
            <p className="muted">{t.text}</p>
          </div>
        </section>
      ))}
    </div>
  );
}
