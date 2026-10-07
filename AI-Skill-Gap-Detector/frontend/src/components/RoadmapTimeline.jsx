import React from 'react';
import RoadmapCard from './RoadmapCard';

export default function RoadmapTimeline({ roadmap = [] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
      {roadmap.map((item, idx) => (
        <RoadmapCard
          key={idx}
          week={idx + 1}
          title={item.title}
          tasks={item.tasks}
          completed={item.completed}
        />
      ))}
    </div>
  );
}
