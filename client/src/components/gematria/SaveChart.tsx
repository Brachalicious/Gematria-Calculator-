import * as React from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from './AuthModal';

interface SaveChartProps {
  name: string;
  total: number;
  method: string;
  letters: Array<{ letter: string; value: number }>;
}

export function SaveChart({ name, total, method, letters }: SaveChartProps) {
  const { user } = useAuth();
  const [saved, setSaved] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [chartName, setChartName] = React.useState('');
  const [showAuth, setShowAuth] = React.useState(false);
  const [error, setError] = React.useState('');

  const methodLabel = (m: string) => {
    switch (m) {
      case 'standard': return 'Standard';
      case 'ordinal': return 'Ordinal';
      case 'reduced': return 'Reduced';
      case 'integral': return 'Integral Reduced';
      default: return m;
    }
  };

  const saveToFirestore = async () => {
    if (!user) { setShowAuth(true); return; }
    setSaving(true);
    setError('');
    try {
      await addDoc(collection(db, 'savedCharts'), {
        uid: user.uid,
        email: user.email,
        chartName: chartName.trim() || name,
        name,
        total,
        method: methodLabel(method),
        letters,
        createdAt: serverTimestamp(),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError('Could not save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const saveAsImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = Math.max(400, 220 + letters.length * 28);
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#1a0a2e');
    grad.addColorStop(1, '#2d1b4e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#c9a84c';
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    ctx.fillStyle = '#c9a84c';
    ctx.font = 'bold 22px Georgia';
    ctx.textAlign = 'center';
    ctx.fillText('✨ MysticMinded³³ ✨', canvas.width / 2, 55);
    ctx.fillStyle = '#a07cc5';
    ctx.font = '14px Georgia';
    ctx.fillText('Gematria Chart', canvas.width / 2, 80);
    ctx.strokeStyle = 'rgba(201,168,76,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(40, 95); ctx.lineTo(460, 95); ctx.stroke();
    ctx.fillStyle = '#e8d5ff';
    ctx.font = 'bold 18px Georgia';
    ctx.textAlign = 'left';
    ctx.fillText(`Name: ${name}`, 40, 125);
    ctx.font = '14px Georgia';
    ctx.fillStyle = '#a07cc5';
    ctx.fillText(`Method: ${methodLabel(method)}`, 40, 150);
    ctx.fillStyle = '#c9a84c';
    ctx.font = 'bold 36px Georgia';
    ctx.textAlign = 'right';
    ctx.fillText(`${total}`, 460, 145);
    ctx.font = '12px Georgia';
    ctx.fillStyle = '#a07cc5';
    ctx.fillText('Total Value', 460, 162);
    ctx.strokeStyle = 'rgba(201,168,76,0.4)';
    ctx.beginPath(); ctx.moveTo(40, 175); ctx.lineTo(460, 175); ctx.stroke();
    ctx.fillStyle = '#c9a84c';
    ctx.font = 'bold 13px Georgia';
    ctx.textAlign = 'left';
    ctx.fillText('Letter Breakdown:', 40, 200);
    letters.forEach((l, i) => {
      const y = 225 + i * 26;
      ctx.fillStyle = '#e8d5ff';
      ctx.font = '15px Georgia';
      ctx.textAlign = 'left';
      ctx.fillText(l.letter, 55, y);
      ctx.fillStyle = '#c9a84c';
      ctx.font = 'bold 15px Georgia';
      ctx.textAlign = 'right';
      ctx.fillText(`${l.value}`, 460, y);
    });
    ctx.fillStyle = 'rgba(201,168,76,0.5)';
    ctx.font = '11px Georgia';
    ctx.textAlign = 'center';
    ctx.fillText(`mysticminded33.com  •  ${new Date().toLocaleDateString()}`, canvas.width / 2, canvas.height - 20);
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob!);
      const a = document.createElement('a');
      a.href = url;
      a.download = `gematria-${name}-${total}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const btnStyle = (bg: string, disabled = false): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: '6px',
    padding: '8px 14px', borderRadius: '20px', border: 'none',
    background: disabled ? 'rgba(201,168,76,0.3)' : bg,
    color: bg === '#c9a84c' ? '#1a0a2e' : '#fff',
    fontWeight: 'bold', fontSize: '13px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  });

  return (
    <>
      <div style={{
        margin: '8px 0 12px 0', padding: '12px 16px',
        background: 'linear-gradient(135deg, rgba(26,10,46,0.06), rgba(201,168,76,0.06))',
        borderRadius: '12px', border: '1px solid rgba(201,168,76,0.25)',
      }}>
        <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '13px', color: '#4b0082' }}>
          💾 Save your chart:
        </p>
        {user && (
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              value={chartName}
              onChange={e => setChartName(e.target.value)}
              placeholder={`Name this chart (e.g. "${name} reading")`}
              style={{
                width: '100%', padding: '8px 12px', borderRadius: '8px',
                border: '1px solid rgba(201,168,76,0.4)',
                background: 'rgba(255,255,255,0.07)',
                color: '#4b0082', fontSize: '13px', outline: 'none',
                boxSizing: 'border-box' as any,
              }}
            />
            <div style={{ fontSize: '11px', color: '#a07cc5', marginTop: '4px' }}>
              Give your chart a name for easy searching later
            </div>
          </div>
        )}

        {!user && (
          <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#7c3aed' }}>
            🔐 <button onClick={() => setShowAuth(true)} style={{ background: 'none', border: 'none', color: '#c9a84c', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline', fontSize: '12px', padding: 0 }}>
              Create an account or log in
            </button> to save charts to your profile
          </p>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button style={btnStyle('#4b0082', saving)} onClick={saveToFirestore} disabled={saving}>
            {saved ? '✅ Saved!' : saving ? '⏳ Saving...' : user ? '☁️ Save to Account' : '🔐 Save to Account'}
          </button>
          <button style={btnStyle('#c9a84c')} onClick={saveAsImage}>
            🖼️ Download Image
          </button>
        </div>

        {error && <p style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '8px' }}>{error}</p>}
        {user && saved && <p style={{ color: '#4b0082', fontSize: '12px', marginTop: '8px', fontWeight: 'bold' }}>✅ Chart saved to your account!</p>}
      </div>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
}
