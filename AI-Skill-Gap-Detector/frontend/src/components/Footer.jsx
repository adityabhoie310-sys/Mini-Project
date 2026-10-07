import React from 'react';

export default function Footer() {
  return (
    <footer style={{ padding: '2rem', textAlign: 'center', borderTop: '1px solid #e2e8f0', color: '#64748b', background: '#fff', marginTop: 'auto' }}>
      <p>&copy; {new Date().getFullYear()} AI Skill Gap Detector. Empowering careers with AI diagnostics.</p>
    </footer>
  );
}
