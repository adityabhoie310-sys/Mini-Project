import React from 'react';
import { CheckSquare } from 'lucide-react';

export default function DailyPlan({ plan = [] }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Daily Practice Schedule</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {plan.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '6px' }}>
            <CheckSquare size={18} color="#4f46e5" />
            <span style={{ fontSize: '0.9rem', color: '#334155' }}>{item.task || item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
