import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser('sample-jwt-token', { name: email.split('@')[0] || 'User', email });
    navigate('/dashboard');
  };

  return (
    <div style={{ maxWidth: '420px', margin: '4rem auto', padding: '2rem', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Sign in to SkillGap AI</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.65rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.65rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.75rem', background: '#4f46e5', color: '#fff', borderRadius: '6px', fontWeight: 600, marginTop: '0.5rem' }}>
          Sign In
        </button>
      </form>
      <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: '#64748b' }}>
        Don't have an account? <Link to="/register" style={{ color: '#4f46e5', fontWeight: 600 }}>Create one</Link>
      </p>
    </div>
  );
}
