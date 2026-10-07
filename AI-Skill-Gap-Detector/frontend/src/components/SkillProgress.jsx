import React from 'react';
import ProgressBar from './ProgressBar';

export default function SkillProgress({ skillName, percentage = 0 }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
        <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{skillName}</span>
        <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#4f46e5' }}>{percentage}%</span>
      </div>
      <ProgressBar value={percentage} />
    </div>
  );
}
