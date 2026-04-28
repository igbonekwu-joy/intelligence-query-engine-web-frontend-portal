import React from 'react';

const STYLES = {
  male:    { background: 'rgba(59,130,246,0.15)',  color: '#60a5fa' },
  female:  { background: 'rgba(244,114,182,0.15)', color: '#f472b6' },
  adult:   { background: 'rgba(167,139,250,0.15)', color: '#a78bfa' },
  youth:   { background: 'rgba(52,211,153,0.15)',  color: '#34d399' },
  senior:  { background: 'rgba(251,191,36,0.15)',  color: '#fbbf24' },
  admin:   { background: 'rgba(255,107,107,0.15)', color: '#ff6b6b' },
  analyst: { background: 'rgba(0,245,160,0.15)',   color: '#00f5a0' },
  active:  { background: 'rgba(0,245,160,0.1)',    color: '#00f5a0' },
  inactive:{ background: 'rgba(255,71,87,0.1)',    color: '#ff4757' },
  default: { background: 'var(--bg-3)',            color: 'var(--text-muted)' },
};

export default function Badge({ type, children }) {
  const style = STYLES[type] || STYLES.default;
  return (
    <span style={{
      ...style,
      display: 'inline-block',
      fontSize: 10,
      fontFamily: 'var(--font-head)',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      padding: '2px 8px',
      borderRadius: 3,
    }}>
      {children}
    </span>
  );
}