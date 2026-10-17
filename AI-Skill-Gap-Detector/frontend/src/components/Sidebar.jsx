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
    <aside className="sidebar">
      <div className="sidebar-label">Your workspace</div>
      <div className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
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
