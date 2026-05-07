import * as React from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const [messages, setMessages] = React.useState<Message[]>([
    { role: 'assistant', content: 'Shalom! I am the MysticMinded33 chatbot, how can I help? 🔮' }
  ]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply || 'I could not find an answer.' }]);
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: '⚠️ Something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', bottom: '24px', right: '24px',
      width: '360px', height: '520px',
      background: 'linear-gradient(160deg, #1a0a2e 0%, #2d1b4e 100%)',
      borderRadius: '16px', border: '1.5px solid #c9a84c',
      boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 20px rgba(201,168,76,0.2)',
      display: 'flex', flexDirection: 'column',
      zIndex: 9999, fontFamily: 'sans-serif', overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '12px 16px', borderBottom: '1px solid rgba(201,168,76,0.3)',
        background: 'rgba(0,0,0,0.2)', position: 'relative',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '10px', right: '12px',
          background: 'none', border: 'none', color: '#c9a84c',
          fontSize: '20px', cursor: 'pointer', padding: '0 4px', lineHeight: 1,
        }}>✕</button>
        <img src="/mysticminded-logo.svg" alt="MysticMind"
          style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1.5px solid #c9a84c', marginBottom: '6px', marginLeft: '-36px' }} />
        <div style={{ color: '#c9a84c', fontWeight: 'bold', fontSize: '15px' }}>MysticMind ✨</div>
        <div style={{ color: '#a07cc5', fontSize: '11px' }}>Gematria & Kabbalah Guide</div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '12px 14px',
        display: 'flex', flexDirection: 'column', gap: '10px',
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex', flexDirection: 'column',
            alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
          }}>
            <div style={{
              fontSize: '10px', color: '#a07cc5', marginBottom: '3px',
              paddingLeft: msg.role === 'user' ? 0 : '4px',
              paddingRight: msg.role === 'user' ? '4px' : 0,
            }}>
              {msg.role === 'user' ? 'You' : 'MysticMind'}
            </div>
            <div style={{
              maxWidth: '85%', padding: '8px 12px',
              borderRadius: msg.role === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
              background: msg.role === 'user' ? 'linear-gradient(135deg, #c9a84c, #a07020)' : 'rgba(255,255,255,0.07)',
              color: msg.role === 'user' ? '#1a0a2e' : '#e8d5ff',
              fontSize: '13px', lineHeight: '1.5',
              border: msg.role === 'assistant' ? '1px solid rgba(201,168,76,0.2)' : 'none',
              whiteSpace: 'pre-wrap',
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '10px', color: '#a07cc5', marginBottom: '3px', paddingLeft: '4px' }}>MysticMind</div>
            <div style={{
              padding: '10px 14px', borderRadius: '14px 14px 14px 2px',
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(201,168,76,0.2)',
              display: 'flex', gap: '5px', alignItems: 'center',
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: '7px', height: '7px', borderRadius: '50%', background: '#c9a84c',
                  animation: 'mysticBounce 1.2s infinite', animationDelay: `${i * 0.2}s`,
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '10px 12px', borderTop: '1px solid rgba(201,168,76,0.3)',
        display: 'flex', gap: '8px', alignItems: 'flex-end', background: 'rgba(0,0,0,0.2)',
      }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask MysticMind... (Enter to send)"
          rows={1}
          style={{
            flex: 1, background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(201,168,76,0.4)', borderRadius: '10px',
            padding: '8px 12px', color: '#e8d5ff', fontSize: '13px',
            resize: 'none', outline: 'none', fontFamily: 'sans-serif', lineHeight: '1.4',
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{
            background: loading || !input.trim() ? 'rgba(201,168,76,0.3)' : 'linear-gradient(135deg, #c9a84c, #a07020)',
            border: 'none', borderRadius: '10px', padding: '8px 14px',
            color: '#1a0a2e', fontWeight: 'bold', fontSize: '13px',
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap',
          }}
        >
          Send ✨
        </button>
      </div>

      <style>{`
        @keyframes mysticBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
