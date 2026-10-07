import React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';

export default function ResourceCard({ resource }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <BookOpen size={18} color="#4f46e5" />
        <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}>{resource?.type || 'Tutorial'}</span>
      </div>
      <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>{resource?.title || 'Learning Guide'}</h4>
      <p style={{ margin: '0 0 1rem 0', color: '#64748b', fontSize: '0.85rem', flex: 1 }}>{resource?.description}</p>
      <a
        href={resource?.url || '#'}
        target="_blank"
        rel="noreferrer"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#4f46e5', fontWeight: 600, fontSize: '0.85rem' }}
      >
        <span>Open Material</span>
        <ExternalLink size={14} />
      </a>
    </div>
  );
}
