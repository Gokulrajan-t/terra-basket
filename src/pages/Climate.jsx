import { useApp } from '../context';
import { DAYS, WEEK_TEMP, WEEK_HUM, ALERTS } from '../data';
import LineChart from '../components/LineChart';
import { TopBar, Table } from '../components/ui';

const avg = (a) => Math.round(a.reduce((s, v) => s + v, 0) / a.length);

export default function Climate() {
  const todayIdx = (new Date().getDay() + 6) % 7; // Mon=0
  return (
    <div className="screen sub-screen">
      <TopBar back />
      <div className="page-title center">
        <h1>Climate Monitoring 🌱</h1>
        <p className="teal">Monitor storage conditions in real time</p>
      </div>

      <div className="grid2 outlined">
        <div className="stat-card"><b>{WEEK_TEMP[todayIdx]}°C</b><span>Temperature</span></div>
        <div className="stat-card"><b>{WEEK_HUM[todayIdx]}%</b><span>Humidity</span></div>
        <div className="stat-card"><b>{avg(WEEK_TEMP)}°C</b><span>Avg Temp</span></div>
        <div className="stat-card"><b>{ALERTS.length}</b><span>Alerts</span></div>
      </div>

      <section className="card">
        <h3>🌡️ Weekly Temperature</h3>
        <LineChart data={WEEK_TEMP} labels={DAYS} unit="°" />
      </section>

      <section className="card">
        <h3>💧 Weekly Humidity</h3>
        <LineChart data={WEEK_HUM} labels={DAYS} unit="%" />
      </section>

      <section className="health">
        <h3>🌱 Storage Health Status</h3>
        <b className="good">🟢 Excellent Storage Conditions</b>
        <p>Temperature and humidity levels are ideal for storing fruits and vegetables.</p>
      </section>

      <div className="grid2 outlined">
        <div className="stat-card"><b>94%</b><span>Freshness</span></div>
        <div className="stat-card"><b>88%</b><span>Energy Saved</span></div>
        <div className="stat-card"><b>92%</b><span>Moisture</span></div>
        <div className="stat-card"><b>75%</b><span>Capacity</span></div>
      </div>

      <section className="card">
        <h3>📋 Weekly Records</h3>
        <Table head={['Day', 'Temp', 'Humidity']}
               rows={DAYS.map((d, i) => [d, `${WEEK_TEMP[i]}°C`, `${WEEK_HUM[i]}%`])} />
      </section>
    </div>
  );
}
