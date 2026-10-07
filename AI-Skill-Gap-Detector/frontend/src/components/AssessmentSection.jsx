import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function AssessmentSection({ title, description, count, onStart }) {
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', background: '#fff' }}>
      <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>{title}</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>{description}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', color: '#4f46e5', fontWeight: 600 }}>{count} Questions</span>
        <button
          onClick={onStart}
          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#4f46e5', color: '#fff', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 500 }}
        >
          <span>Begin</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
