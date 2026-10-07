import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function SkillGapCard({ skill, gapPercentage, priority }) {
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h4 style={{ margin: '0 0 0.25rem 0', color: '#1e293b' }}>{skill}</h4>
        <span style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 500 }}>Deficit: {gapPercentage}%</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <AlertCircle size={18} color="#ef4444" />
        <span style={{ padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, background: '#fee2e2', color: '#dc2626' }}>
          {priority || 'High'} Priority
        </span>
      </div>
    </div>
  );
}
