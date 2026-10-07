import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Target, Activity, Map, Calendar, Terminal, BookOpen, User } from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Select Target Job', path: '/select-job', icon: Target },
    { label: 'Skill Gap Matrix', path: '/skill-gap', icon: Activity },
    { label: 'Roadmap', path: '/roadmap', icon: Map },
    { label: 'Daily Plan', path: '/daily-plan', icon: Calendar },
    { label: 'Resources', path: '/resources', icon: BookOpen },
    { label: 'Practice & Code', path: '/coding-practice', icon: Terminal },
    { label: 'Profile', path: '/profile', icon: User }
  ];

  return (
    <aside style={{ width: '250px', background: '#fff', borderRight: '1px solid #e2e8f0', minHeight: 'calc(100vh - 65px)', padding: '1.5rem 1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 1rem',
                borderRadius: '8px',
                fontWeight: 500,
                color: isActive ? '#4f46e5' : '#64748b',
                background: isActive ? '#eef2ff' : 'transparent',
                textDecoration: 'none'
              })}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}
