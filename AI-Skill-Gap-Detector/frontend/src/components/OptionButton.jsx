import React from 'react';

export default function OptionButton({ label, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: 'left',
        padding: '0.85rem 1.25rem',
        borderRadius: '8px',
        border: isSelected ? '2px solid #4f46e5' : '1px solid #cbd5e1',
        background: isSelected ? '#eef2ff' : '#fff',
        color: isSelected ? '#3730a3' : '#334155',
        fontWeight: isSelected ? 600 : 400,
        transition: 'all 0.15s ease',
        cursor: 'pointer'
      }}
    >
      {label}
    </button>
  );
}
