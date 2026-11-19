import { useState } from 'react';
import { useApp } from '../context';
import { LS, seedUsers } from '../data';
import { Logo, Field } from '../components/ui';

export default function Register() {
  const { go, reset, toast } = useApp();
  const [f, setF] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [err, setErr] = useState({});
  const set = (k) => (v) => setF((s) => ({ ...s, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    const x = {};
    if (f.name.trim().length < 2) x.name = 'Enter your name';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = 'Enter a valid email';
    if (!/^\d{10}$/.test(f.phone)) x.phone = 'Enter 10 digit phone number';
    if (f.password.length < 6) x.password = 'Minimum 6 characters';
    if (f.confirm !== f.password) x.confirm = 'Passwords do not match';
    setErr(x);
    if (Object.keys(x).length) return;

    const users = LS.get('users', seedUsers());
    if (users.some((u) => u.email.toLowerCase() === f.email.toLowerCase())) {
      return setErr({ email: 'Email already registered' });
    }
    LS.set('users', [...users, { name: f.name.trim(), email: f.email.trim(), phone: f.phone, password: f.password }]);
    toast('Registration successful! Please login');
    reset('login');
  };

  return (
    <div className="screen auth register">
      <div className="auth-head"><Logo size={100} /></div>
      <h1 className="auth-title">Register</h1>
      <form className="auth-form" onSubmit={submit}>
        <Field label="Name" icon="user" placeholder="Enter name" value={f.name} onChange={set('name')} error={err.name} />
        <Field label="Email" icon="mail" type="email" placeholder="Enter email" value={f.email} onChange={set('email')} error={err.email} />
        <Field label="Phone" icon="phone" type="tel" placeholder="Enter phone" value={f.phone} onChange={set('phone')} error={err.phone} />
        <Field label="Password" icon="lock" password placeholder="Enter password" value={f.password} onChange={set('password')} error={err.password} />
        <Field label="Confirm Password" icon="lock" password placeholder="Confirm password" value={f.confirm} onChange={set('confirm')} error={err.confirm} />
        <button className="btn primary" type="submit">Register</button>
        <p className="switch">Already have an account? <a onClick={() => go('login')}>Login</a></p>
      </form>
      <p className="version">@app version 1.0.0</p>
    </div>
  );
}
