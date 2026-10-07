import React from 'react';
import { CheckCircle2, TrendingUp } from 'lucide-react';

export default function WeeklyReport() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ margin: 0 }}>Weekly Performance Digest</h1>
        <p style={{ color: '#64748b' }}>Summary of skill gain, problems solved, and roadmap adherence.</p>
      </div>
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#10b981' }}>
          <TrendingUp size={28} />
          <h3 style={{ margin: 0 }}>Readiness improved by +8% this week!</h3>
        </div>
        <p style={{ color: '#64748b' }}>You successfully addressed 2 high-priority skill gaps and achieved 100% adherence to your daily study schedule.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1rem', textAlign: 'center' }}>
          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#4f46e5' }}>4</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Tasks Completed</div>
          </div>
          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>3</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Assessments Taken</div>
          </div>
          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f59e0b' }}>74%</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Current Score</div>
          </div>
        </div>
      </div>
    </div>
  );
}
