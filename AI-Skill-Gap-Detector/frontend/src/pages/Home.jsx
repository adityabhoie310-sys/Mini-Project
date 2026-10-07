import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Target, BarChart3, Terminal } from 'lucide-react';

export default function Home() {
  return (
    <div className="home-container" style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        <span style={{ background: '#eef2ff', color: '#4f46e5', padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 600 }}>
          Next-Gen AI Career Acceleration
        </span>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
          Detect Your Skill Gaps. Bridge Them With AI.
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '650px' }}>
          Pinpoint exact missing competencies for your target dream roles across technical, reasoning, and aptitude domains. Get tailored roadmaps and practice challenges.
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Link to="/select-job" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#4f46e5', color: '#fff', padding: '0.85rem 1.75rem', borderRadius: '8px', fontWeight: 600 }}>
            <span>Explore Target Roles</span>
            <ArrowRight size={18} />
          </Link>
          <Link to="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#f1f5f9', color: '#334155', padding: '0.85rem 1.75rem', borderRadius: '8px', fontWeight: 600 }}>
            <span>View Dashboard</span>
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '5rem', textAlign: 'left' }}>
        <div className="card">
          <Brain color="#4f46e5" size={32} style={{ marginBottom: '1rem' }} />
          <h3>AI Diagnosis</h3>
          <p style={{ color: '#64748b' }}>Precision assessment engine measuring your actual vs required role competency.</p>
        </div>
        <div className="card">
          <Target color="#4f46e5" size={32} style={{ marginBottom: '1rem' }} />
          <h3>Personalized Roadmap</h3>
          <p style={{ color: '#64748b' }}>Weekly structured learning timeline customized to fill your high-priority gaps.</p>
        </div>
        <div className="card">
          <BarChart3 color="#4f46e5" size={32} style={{ marginBottom: '1rem' }} />
          <h3>Realtime Analytics</h3>
          <p style={{ color: '#64748b' }}>Readiness score calculation, progress radar, and performance tracking.</p>
        </div>
        <div className="card">
          <Terminal color="#4f46e5" size={32} style={{ marginBottom: '1rem' }} />
          <h3>Interactive Code Practice</h3>
          <p style={{ color: '#64748b' }}>In-browser JavaScript coding challenges and algorithmic problem sets.</p>
        </div>
      </div>
    </div>
  );
}
