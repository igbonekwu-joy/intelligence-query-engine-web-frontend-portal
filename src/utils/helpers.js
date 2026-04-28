// ── Date formatting ───────────────────────────────────────────
export function formatDate(ts) {
  if (!ts) return '—';
  return new Date(ts).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

export function formatDateTime(ts) {
  if (!ts) return '—';
  return new Date(ts).toLocaleString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

// ── Short UUID display ────────────────────────────────────────
export function shortId(id) {
  return id ? id.slice(0, 8) + '…' : '—';
}

// ── Probability as percentage ─────────────────────────────────
export function toPercent(val) {
  return Math.round((val || 0) * 100);
}

// ── Badge class maps ──────────────────────────────────────────
export function genderClass(g) {
  return g === 'male' ? 'badge-male' : g === 'female' ? 'badge-female' : 'badge-default';
}

export function ageGroupClass(g) {
  const map = { adult: 'badge-adult', youth: 'badge-youth', senior: 'badge-senior' };
  return map[g] || 'badge-default';
}

export function roleClass(r) {
  return r === 'admin' ? 'badge-admin' : 'badge-analyst';
}

// ── Build API query string from filter state ──────────────────
export function buildQuery(state) {
  const params = new URLSearchParams();
  Object.entries(state).forEach(([k, v]) => {
    if (v !== '' && v !== null && v !== undefined) params.set(k, v);
  });
  return params.toString();
}