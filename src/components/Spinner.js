import React from 'react';

export default function Spinner({ size = 32, center = false }) {
  const el = (
    <div style={{
      width: size, height: size,
      border: '2px solid var(--border)',
      borderTopColor: 'var(--accent)',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
      flexShrink: 0,
    }} />
  );

  if (!center) return el;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 12, padding: '60px 20px',
      color: 'var(--text-muted)', fontSize: 12,
      fontFamily: 'var(--font-mono)',
    }}>
      {el}
      <span>Loading…</span>
    </div>
  );
}