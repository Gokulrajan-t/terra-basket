import { useEffect } from 'react';
import { useApp } from '../context';
import { Logo } from '../components/ui';

export default function Splash() {
  const { user, reset } = useApp();
  useEffect(() => {
    const t = setTimeout(() => reset(user ? 'home' : 'login'), 1600);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="screen splash">
      <div className="splash-logo"><Logo size={110} /></div>
      <p>Clay · Cooling · Naturally</p>
    </div>
  );
}
