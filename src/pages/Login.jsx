import { useState } from 'react';
import { useApp } from '../context';
import { LS, seedUsers } from '../data';
import { Logo, Field, Icon } from '../components/ui';

export default function Login() {
  const { setUser, reset, go } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password) return setError('Please enter email and password');
    const users = LS.get('users', seedUsers());
    const u = users.find((x) => x.email.toLowerCase() === email.trim().toLowerCase() && x.password === password);
    if (!u) return setError('Invalid email or password');
    setError('');
    setSuccess(true);
    setTimeout(() => {
      setUser(u);
      reset('home');
    }, 1300);
  };

  return (
    <div className="screen auth login">
      <div className="auth-head tall"><Logo size={120} /></div>
      <h1 className="auth-title">Login</h1>
      <p className="auth-sub">Welcome back! Login in to continue</p>

      <form className="auth-card" onSubmit={submit}>
        <Field label="Email" icon="mail" type="email" placeholder="Enter email" value={email} onChange={setEmail} />
        <Field label="Password" icon="lock" password placeholder="Enter password" value={password} onChange={setPassword} />
        {error && <div className="form-error">{error}</div>}
        <button className="btn primary" type="submit">Login</button>
        <p className="switch">Don't have an account ? <a onClick={() => go('register')}>Register</a></p>
        <p className="hint">Demo: lavpriya@email.com / 123456</p>
      </form>

      <p className="version">@app version 1.0.0</p>

      {success && (
        <div className="modal-bg">
          <div className="modal center success">
            <div className="tick"><Icon name="check" size={34} color="#fff" sw={3} /></div>
            <h3>Login Successful</h3>
            <p>Welcome back!</p>
          </div>
        </div>
      )}
    </div>
  );
}
