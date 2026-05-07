import * as React from 'react';

interface ShareResultsProps {
  name: string;
  total: number;
  method: string;
}

export function ShareResults({ name, total, method }: ShareResultsProps) {
  const [copied, setCopied] = React.useState(false);

  const methodLabel = (m: string) => {
    switch (m) {
      case 'standard': return 'Standard';
      case 'ordinal': return 'Ordinal';
      case 'reduced': return 'Reduced';
      case 'integral': return 'Integral Reduced';
      default: return m;
    }
  };

  const message = `✨ Gematria Result for "${name}" ✨\n🔢 Value: ${total} (${methodLabel(method)})\n\n🔮 Discover the spiritual significance of your name at MysticMinded33!`;
  const encodedMessage = encodeURIComponent(message);
  const encodedSubject = encodeURIComponent(`Gematria Result for ${name}`);

  const shareWhatsApp = () => window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  const shareEmail = () => window.open(`mailto:?subject=${encodedSubject}&body=${encodedMessage}`, '_blank');
  const shareSMS = () => window.open(`sms:?body=${encodedMessage}`, '_blank');
  const copyLink = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const btnStyle = (bg: string): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: '6px',
    padding: '8px 14px', borderRadius: '20px', border: 'none',
    background: bg, color: '#fff', fontWeight: 'bold',
    fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)', transition: 'opacity 0.2s',
  });

  return (
    <div style={{
      margin: '12px 0',
      padding: '12px 16px',
      background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(75,0,130,0.08))',
      borderRadius: '12px',
      border: '1px solid rgba(201,168,76,0.3)',
    }}>
      <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '13px', color: '#4b0082' }}>
        📤 Share your results:
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        <button style={btnStyle('#25D366')} onClick={shareWhatsApp}>
          <span>📱</span> WhatsApp
        </button>
        <button style={btnStyle('#c9a84c')} onClick={shareEmail}>
          <span>✉️</span> Email
        </button>
        <button style={btnStyle('#4b0082')} onClick={shareSMS}>
          <span>💬</span> Text
        </button>
        <button style={btnStyle(copied ? '#888' : '#333')} onClick={copyLink}>
          <span>{copied ? '✅' : '📋'}</span> {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
