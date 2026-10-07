import React from 'react';

export default function ReadinessScore({ score = 75 }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
      borderRadius: '16px',
      color: '#fff',
      textAlign: 'center'
    }}>
      <span style={{ fontSize: '0.9rem', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '1px' }}>Role Readiness Score</span>
      <h1 style={{ fontSize: '3.5rem', margin: '0.5rem 0', fontWeight: 800 }}>{score}%</h1>
      <p style={{ margin: 0, opacity: 0.85, fontSize: '0.9rem' }}>
        {score >= 80 ? 'Ready for Interviews!' : score >= 50 ? 'Moderate alignment with gaps detected' : 'Requires structured foundation preparation'}
      </p>
    </div>
  );
}
