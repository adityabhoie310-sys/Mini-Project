import React, { useState } from 'react';
import { Play } from 'lucide-react';

export default function CodingEditor({ initialCode = '// Write your solution here\nfunction solution() {\n  return true;\n}', onRun }) {
  const [code, setCode] = useState(initialCode);

  return (
    <div style={{ border: '1px solid #334155', borderRadius: '8px', overflow: 'hidden', background: '#0f172a', color: '#f8fafc' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: '#1e293b', borderBottom: '1px solid #334155' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8' }}>JavaScript Console</span>
        <button
          onClick={() => onRun && onRun(code)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#10b981', color: '#fff', padding: '0.35rem 0.85rem', borderRadius: '4px', fontWeight: 600, fontSize: '0.85rem' }}
        >
          <Play size={14} />
          <span>Execute</span>
        </button>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{
          width: '100%',
          minHeight: '260px',
          background: 'transparent',
          border: 'none',
          padding: '1rem',
          color: '#38bdf8',
          fontFamily: 'Courier New, monospace',
          fontSize: '0.95rem',
          outline: 'none',
          resize: 'vertical'
        }}
      />
    </div>
  );
}
