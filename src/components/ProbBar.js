import React from 'react';
import { toPercent } from '../utils/helpers';

export default function ProbBar({ value }) {
  const pct = toPercent(value);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        flex: 1, height: 4,
        background: 'var(--bg-3)',
        borderRadius: 2, overflow: 'hidden',
      }}>
        <div style={{
          width: `${pct}%`, height: '100%',
          background: 'var(--accent)',
          borderRadius: 2,
          transition: 'width 0.4s ease',
        }} />
      </div>
      <span style={{ fontSize: 11, color: 'var(--text-muted)', minWidth: 36, textAlign: 'right' }}>
        {pct}%
      </span>
    </div>
  );
}