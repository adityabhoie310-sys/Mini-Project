import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { formatDuration } from '../utils/helpers';

export default function AssessmentTimer({ durationSeconds = 900, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: timeLeft < 120 ? '#dc2626' : '#475569', fontWeight: 600 }}>
      <Clock size={18} />
      <span>{formatDuration(timeLeft)}</span>
    </div>
  );
}
