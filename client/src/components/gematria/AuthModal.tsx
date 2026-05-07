import * as React from 'react';
import { useAuth } from '@/hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = React.useState<'login' | 'signup'>('login');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { login, signup } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      onClose();
    } catch (err: any) {
      setError(err.message?.replace('Firebase: ', '').replace(/\(auth.*\)/, '') || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <div style={{
        background: 'linear-gradient(160deg, #1a0a2e 0%, #2d1b4e 100%)',
        border: '1.5px solid #c9a84c',
        borderRadius: '16px',
        padding: '32px',
        width: '340px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
        fontFamily: 'sans-serif',
      }} onClick={e => e.stopPropagation()}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src="/mysticminded-logo.svg" style={{ height: '70px', width: 'auto', margin: '0 auto' }} />
          <div style={{ color: '#c9a84c', fontWeight: 'bold', fontSize: '18px', marginTop: '8px' }}>MysticMinded³³</div>
          <div style={{ color: '#a07cc5', fontSize: '12px' }}>
            {mode === 'login' ? 'Welcome back ✨' : 'Create your account ✨'}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', marginBottom: '20px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.3)' }}>
          {(['login', 'signup'] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); setError(''); }} style={{
              flex: 1, padding: '8px', border: 'none', cursor: 'pointer',
              background: mode === m ? 'linear-gradient(135deg, #c9a84c, #a07020)' : 'transparent',
              color: mode === m ? '#1a0a2e' : '#a07cc5',
              fontWeight: 'bold', fontSize: '13px',
            }}>
              {m === 'login' ? 'Log In' : 'Create Account'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ color: '#a07cc5', fontSize: '12px', display: 'block', marginBottom: '4px' }}>Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)} required
              placeholder="your@email.com"
              style={{
                width: '100%', padding: '10px 12px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(201,168,76,0.4)',
                color: '#e8d5ff', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: '#a07cc5', fontSize: '12px', display: 'block', marginBottom: '4px' }}>Password</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)} required
              placeholder="••••••••"
              style={{
                width: '100%', padding: '10px 12px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(201,168,76,0.4)',
                color: '#e8d5ff', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>

          {error && <div style={{ color: '#ff6b6b', fontSize: '12px', marginBottom: '12px', textAlign: 'center' }}>{error}</div>}

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '12px',
            background: loading ? 'rgba(201,168,76,0.3)' : 'linear-gradient(135deg, #c9a84c, #a07020)',
            border: 'none', borderRadius: '8px',
            color: '#1a0a2e', fontWeight: 'bold', fontSize: '15px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}>
            {loading ? '✨ Loading...' : mode === 'login' ? '🔮 Log In' : '✨ Create Account'}
          </button>
        </form>

        <button onClick={onClose} style={{
          position: 'absolute' as any, display: 'block', margin: '16px auto 0',
          background: 'none', border: 'none', color: '#a07cc5',
          fontSize: '12px', cursor: 'pointer', width: '100%', textAlign: 'center',
        }}>Cancel</button>
      </div>
    </div>
  );
}
