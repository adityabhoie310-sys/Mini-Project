import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

export default function RoadmapCard({ week, title, tasks = [], completed = false, onToggle }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <span style={{ fontWeight: 700, color: '#4f46e5', fontSize: '0.85rem' }}>WEEK {week}</span>
        <button onClick={onToggle} style={{ color: completed ? '#10b981' : '#cbd5e1' }}>
          {completed ? <CheckCircle2 size={22} /> : <Circle size={22} />}
        </button>
      </div>
      <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>{title}</h4>
      <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#64748b', fontSize: '0.875rem' }}>
        {tasks.map((task, idx) => (
          <li key={idx} style={{ marginBottom: '0.25rem' }}>{task}</li>
        ))}
      </ul>
    </div>
  );
}
