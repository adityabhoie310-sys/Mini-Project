import React from 'react';
import ProgressBar from './ProgressBar';

export default function SkillCard({ skill, currentLevel = 0, requiredLevel = 100 }) {
  return (
    <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ fontWeight: 600 }}>{skill?.name || 'Skill'}</span>
        <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Req: {requiredLevel}%</span>
      </div>
      <ProgressBar value={currentLevel} max={requiredLevel} />
    </div>
  );
}
