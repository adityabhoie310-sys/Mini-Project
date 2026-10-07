import React from 'react';

export default function ProgressBar({ value = 0, max = 100, height = 8 }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div style={{ width: '100%', height: `${height}px`, background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
      <div
        style={{
          width: `${percentage}%`,
          height: '100%',
          background: percentage > 70 ? '#10b981' : percentage > 40 ? '#4f46e5' : '#f59e0b',
          borderRadius: '999px',
          transition: 'width 0.4s ease'
        }}
      />
    </div>
  );
}
