import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Target, BarChart3, Terminal, CheckCircle2, Sparkles, TrendingUp } from 'lucide-react';
import '../styles/home.css';

const features = [
  { icon: <Brain />, title: 'Know what matters', text: 'A practical diagnosis shows the skills that will make the biggest difference for your chosen role.' },
  { icon: <Target />, title: 'Learn with direction', text: 'A personalized weekly roadmap turns your gaps into small, achievable next steps.' },
  { icon: <BarChart3 />, title: 'See your growth', text: 'Track readiness and performance over time, so your effort always has a visible payoff.' },
  { icon: <Terminal />, title: 'Build confidence', text: 'Put concepts into practice with focused coding and problem-solving challenges.' }
];

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={15} /> AI-powered career planning</span>
          <h1>Turn your next career move into a clear plan.</h1>
          <p>Understand the exact skills your dream role requires, see where you stand, and follow an adaptive roadmap built around you.</p>
          <div className="hero-actions">
            <Link to="/select-job" className="hero-primary">Find your target role <ArrowRight size={18} /></Link>
            <Link to="/dashboard" className="hero-secondary">View my dashboard</Link>
          </div>
          <div className="hero-proof"><CheckCircle2 size={17} /> Start with a focused assessment in under 10 minutes</div>
        </div>
        <div className="hero-preview" aria-label="Example readiness snapshot">
          <div className="preview-top"><span>Career readiness</span><span className="live-dot">Updated today</span></div>
          <div className="score-row"><div className="score-ring"><strong>72</strong><small>/100</small></div><div><strong>Great momentum</strong><p>You're closer than you think.</p></div></div>
          <div className="skill-list">
            <div><span>JavaScript</span><b><i style={{ width: '82%' }} /></b><em>82%</em></div>
            <div><span>Problem solving</span><b><i style={{ width: '68%' }} /></b><em>68%</em></div>
            <div><span>System design</span><b><i style={{ width: '42%' }} /></b><em>42%</em></div>
          </div>
          <div className="next-step"><TrendingUp size={18} /><span><small>Next best step</small>Practice system design basics</span><ArrowRight size={17} /></div>
        </div>
      </section>
      <section className="home-section">
        <div className="section-heading"><span>Everything in one place</span><h2>From uncertainty to measurable progress.</h2></div>
        <div className="feature-grid">
          {features.map((feature) => <article className="feature-card" key={feature.title}><div className="feature-icon">{feature.icon}</div><h3>{feature.title}</h3><p>{feature.text}</p><span>Explore <ArrowRight size={15} /></span></article>)}
        </div>
      </section>
    </div>
  );
}
