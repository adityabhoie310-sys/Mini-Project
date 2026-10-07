import React from 'react';
import OptionButton from './OptionButton';

export default function QuestionCard({ question, currentAnswer, onSelectOption, index, total }) {
  if (!question) return null;

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '2rem' }}>
      <div style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem' }}>
        Question {index + 1} of {total}
      </div>
      <h3 style={{ fontSize: '1.2rem', color: '#1e293b', marginBottom: '1.5rem', lineHeight: 1.4 }}>
        {question.prompt || question.title}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {question.options?.map((opt, idx) => (
          <OptionButton
            key={idx}
            label={opt}
            isSelected={currentAnswer === opt || currentAnswer === idx}
            onClick={() => onSelectOption(opt, idx)}
          />
        ))}
      </div>
    </div>
  );
}
