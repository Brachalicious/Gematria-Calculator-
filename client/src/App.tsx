import * as React from 'react';
import { GematriaCalculator } from '@/components/gematria/GematriaCalculator';
import { NumerologyCalculator } from '@/components/gematria/NumerologyCalculator';

type Mode = 'gematria' | 'numerology';

function App() {
  const [mode, setMode] = React.useState<Mode>('gematria');
  const [hebrewNames, setHebrewNames] = React.useState<string[]>([]);
  const [hebrewGematria, setHebrewGematria] = React.useState<number[]>([]);

  return (
    <div className="min-h-screen bg-background">

      {/* ── Mode switcher bar ── */}
      <div style={{
        background: 'linear-gradient(135deg, #1a0a2e, #2d1b4e)',
        borderBottom: '2px solid #c9a84c',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <span style={{ color: '#c9a84c', fontWeight: 700, fontSize: '13px', marginRight: '6px' }}>Mode:</span>
        {([
          { key: 'gematria',   label: '✡️ Gematria',   emoji: '✡️' },
          { key: 'numerology', label: '🔢 Numerology', emoji: '🔢' },
        ] as { key: Mode; label: string; emoji: string }[]).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setMode(key)}
            style={{
              padding: '8px 24px',
              borderRadius: '20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all .2s',
              background: mode === key
                ? 'linear-gradient(135deg, #c9a84c, #a07020)'
                : 'transparent',
              color: mode === key ? '#1a0a2e' : '#c9a84c',
              border: mode === key
                ? '1px solid #c9a84c'
                : '1px solid rgba(201,168,76,0.4)',
            }}
          >
            {label}
          </button>
        ))}
        {hebrewNames.length > 0 && mode === 'numerology' && (
          <span style={{ fontSize: '11px', color: '#a07cc5', marginLeft: '8px' }}>
            {hebrewNames.length} Hebrew name{hebrewNames.length > 1 ? 's' : ''} loaded for comparison
          </span>
        )}
      </div>

      <div className="container mx-auto px-4 py-8">
        {mode === 'gematria' ? (
          <GematriaCalculator
            onNamesChange={(names, values) => {
              setHebrewNames(names);
              setHebrewGematria(values);
            }}
          />
        ) : (
          <NumerologyCalculator
            hebrewNames={hebrewNames}
            hebrewGematria={hebrewGematria}
          />
        )}
      </div>
    </div>
  );
}

export default App;
