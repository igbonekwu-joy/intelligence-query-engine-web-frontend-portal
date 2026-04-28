import React from 'react';

export default function Pagination({ page, totalPages, onPage }) {
  if (!totalPages || totalPages <= 1) return null;

  const start = Math.max(1, page - 2);
  const end   = Math.min(totalPages, page + 2);
  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  const btnBase = {
    background: 'var(--bg-2)',
    border: '1px solid var(--border)',
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    padding: '6px 12px',
    borderRadius: 'var(--radius)',
    cursor: 'pointer',
    transition: 'all var(--transition)',
  };

  const btnActive = {
    ...btnBase,
    background: 'var(--accent)',
    borderColor: 'var(--accent)',
    color: '#0a0a0f',
  };

  const btnDisabled = {
    ...btnBase,
    opacity: 0.4,
    cursor: 'not-allowed',
  };

  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 20, flexWrap: 'wrap' }}>
      <button
        style={page <= 1 ? btnDisabled : btnBase}
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
      >‹ Prev</button>

      {start > 1 && (
        <>
          <button style={btnBase} onClick={() => onPage(1)}>1</button>
          {start > 2 && <span style={{ padding: '6px 4px', color: 'var(--text-dim)' }}>…</span>}
        </>
      )}

      {pages.map(p => (
        <button
          key={p}
          style={p === page ? btnActive : btnBase}
          onClick={() => onPage(p)}
        >{p}</button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span style={{ padding: '6px 4px', color: 'var(--text-dim)' }}>…</span>}
          <button style={btnBase} onClick={() => onPage(totalPages)}>{totalPages}</button>
        </>
      )}

      <button
        style={page >= totalPages ? btnDisabled : btnBase}
        disabled={page >= totalPages}
        onClick={() => onPage(page + 1)}
      >Next ›</button>
    </div>
  );
}