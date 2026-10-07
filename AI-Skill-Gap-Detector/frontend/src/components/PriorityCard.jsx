import React from 'react';

export default function PriorityCard({ level, title, description }) {
  return (
    <div style={{ padding: '1rem', borderLeft: '4px solid #4f46e5', background: '#f8fafc', borderRadius: '0 8px 8px 0', marginBottom: '0.75rem' }}>
      <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#4f46e5' }}>{level}</span>
      <h4 style={{ margin: '0.25rem 0', color: '#0f172a' }}>{title}</h4>
      <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{description}</p>
    </div>
  );
}
