import React from 'react';
import { Briefcase, ArrowRight } from 'lucide-react';

export default function JobCard({ job, onSelect, isSelected }) {
  return (
    <div style={{
      border: isSelected ? '2px solid #4f46e5' : '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '1.5rem',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ padding: '0.5rem', background: '#eef2ff', borderRadius: '8px', color: '#4f46e5' }}>
          <Briefcase size={22} />
        </div>
        <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#1e293b' }}>{job?.title || 'Job Role'}</h3>
      </div>
      <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>{job?.description || 'Explore market requirements and test your readiness.'}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {job?.skills?.slice(0, 4).map((s, idx) => (
          <span key={idx} style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
            {s}
          </span>
        ))}
      </div>
      <button
        onClick={() => onSelect && onSelect(job)}
        style={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          padding: '0.65rem',
          background: isSelected ? '#4f46e5' : '#f8fafc',
          color: isSelected ? '#fff' : '#4f46e5',
          border: '1px solid',
          borderColor: isSelected ? '#4f46e5' : '#cbd5e1',
          borderRadius: '6px',
          fontWeight: 600
        }}
      >
        <span>{isSelected ? 'Selected' : 'Select Target Role'}</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
