/* Checking one DOI with a skill: the agent reads SKILL.md, fetches the raw record from the CrossRef cabinet,
   and writes three files from it. Nothing is filled in from memory.
   Parts (each held by another):
     DESK      the desk; on it a monitor (the agent's terminal), SKILL.md pinned on a stand, three files
     CABINET   the CrossRef filing cabinet, back left; its top drawer slides open in each loop
     CARD      the raw record card: it rises out of the drawer, flies along a dashed path to the desk, lands
     FILES     crossref-record.json, references.bib, verification.md appear one after another once the card lands
     MEMORY    a thought bubble over the terminal, "凭记忆猜", crossed out in red
   One loop (about 7 s): drawer opens 0 to .15, card flies .15 to .5, files appear .5 to .8, rest .8 to 1. */
const DW = 64, DD = 90, DH = 4;
const KB = '#1B365D', KR = '#b53333', KG = '#3f8f3a';
for (const k of Object.keys(PALS)) delete PALS[k];
PALS.kami = { l:'#E4ECF5', m:'#c9d6e6', d:KB };
const DESK = { l:'#eadfc8', m:'#d6c7a8', d:'#ab9c7e' }, BODY = { l:'#5d5b56', m:'#3d3d3a', d:'#262624' };
const PAPER = { l:'#fdfcf8', m:'#ebe8df', d:'#c9c5b8' }, STEEL = { l:'#c9d0d6', m:'#9aa3ab', d:'#636b72' };
const NOTE = { l:'#f7e7a6', m:'#e3cd78', d:'#a98f3c' };
const SANS = 'Inter, PingFang SC, sans-serif', MONO = 'SF Mono, Menlo, monospace';
const f2 = v => v.toFixed(1);
const clamp01 = v => Math.max(0, Math.min(1, v));
const txF = (p, U, V, str, size, col, fam = SANS, weight = 600) =>
  `<text transform="${txM(P(...p), Dv(...U), Dv(...V))}" font-size="${size}" fill="${col}" font-family="${fam}" font-weight="${weight}">${str}</text>`;
const txFront = (p, str, size, col, fam, w) => txF(p, [0,-1,0], [0,0,-1], str, size, col, fam, w);
const txTop = (p, str, size, col, fam, w) => txF(p, [0,-1,0], [1,0,0], str, size, col, fam, w);
function pill(p3, dx, dy, text, on = false, col = KR){
  const k = INK_K, [X, Y] = P(...p3), fs = 11*k, h = fs*1.8;
  const w = [...text].reduce((a, ch) => a + (/[　-鿿＀-￯]/.test(ch) ? 1 : .6), 0)*fs + fs*1.3;
  const cx = X + dx*k, cy = Y + dy*k;
  return `<g><path d="M${f2(X)} ${f2(Y)}L${f2(cx)} ${f2(cy)}" stroke="${INK}" stroke-width="1"/><circle cx="${f2(X)}" cy="${f2(Y)}" r="${f2(1.4*k)}" fill="${INK}"/>`
    + `<rect x="${f2(cx - w/2)}" y="${f2(cy - h/2)}" width="${f2(w)}" height="${f2(h)}" rx="${f2(h/2)}" fill="${on ? '#fbe9e4' : '#fcfbf7'}" stroke="${on ? col : INK}" stroke-width="1.2"/>`
    + `<text x="${f2(cx)}" y="${f2(cy + fs*.36)}" font-size="${f2(fs)}" text-anchor="middle" font-family="${SANS}" font-weight="700" fill="${on ? col : INK}">${text}</text></g>`;
}
const bez = (a, c, b, t) => a.map((_, i) => (1-t)*(1-t)*a[i] + 2*(1-t)*t*c[i] + t*t*b[i]);
const dashed = (pts, col) => `<path d="${pd(pts, false)}" fill="none" stroke="${col}" stroke-width="2.2" stroke-dasharray="5 4" stroke-linecap="round"/>`;

/* ---------- the CrossRef cabinet ---------- */
const CB = { x0: -36, x1: -20, y0: 40, y1: 62, z1: 44 };
function cabinet(open){
  let s = board(CB.x0 - 6, CB.y0 - 6, CB.x1 + 6, CB.y1 + 6, 2, 5, { l:'#e3e6ea', m:'#c6cbd2', d:'#8b939d' });
  s += box(CB.x0, CB.y0, 2, CB.x1, CB.y1, CB.z1, STEEL, tone, 1.3);
  if (!facing([1,0,0])) return s;
  const X = CB.x1 + .06;
  for (let i = 0; i < 3; i++){                       // three drawer fronts; the top one slides out
    const z0 = 6 + i*12.5, z1 = z0 + 10.5, dx = i === 2 ? open*10 : 0;
    if (dx > .2){
      s += box(CB.x1, CB.y0 + 1.5, z0, CB.x1 + dx, CB.y1 - 1.5, z1, STEEL, tone, 1.1);
      // record cards standing inside the open drawer
      for (let j = 0; j < 4; j++) s += box(CB.x1 + 1.5 + j*2, CB.y0 + 3.5, z1 - 1, CB.x1 + 2.1 + j*2, CB.y1 - 3.5, z1 + 3, PAPER, toneI, .6);
    }
    const XF = X + dx;
    s += shape([[XF, CB.y1 - 1.5, z0], [XF, CB.y0 + 1.5, z0], [XF, CB.y0 + 1.5, z1], [XF, CB.y1 - 1.5, z1]], STEEL.l, 1);
    s += shape([[XF + .05, (CB.y0 + CB.y1)/2 + 3, z0 + 6.5], [XF + .05, (CB.y0 + CB.y1)/2 - 3, z0 + 6.5], [XF + .05, (CB.y0 + CB.y1)/2 - 3, z0 + 8], [XF + .05, (CB.y0 + CB.y1)/2 + 3, z0 + 8]], BODY.m, .5);
  }
  return s;
}
/* ---------- the desk: monitor, SKILL.md, the three files ---------- */
const M = { y0: 4, y1: 32, x0: 16, x1: 19, z0: 16, z1: 40 };
function monitor(){
  const yc = (M.y0 + M.y1)/2, parts = [];
  parts.push({ box: [[8, yc - 7, DH], [22, yc + 7, DH + 1.2]], svg: box(8, yc - 7, DH, 22, yc + 7, DH + 1.2, BODY, toneI, 1) });
  parts.push({ box: [[13, yc - 1.6, DH + 1.2], [16, yc + 1.6, M.z0 + 4]], svg: box(13, yc - 1.6, DH + 1.2, 16, yc + 1.6, M.z0 + 4, BODY, toneI, 1) });
  let pan = box(M.x0, M.y0, M.z0, M.x1, M.y1, M.z1, BODY, tone, 1.3);
  if (facing([1,0,0])){
    const X = M.x1 + .06;
    pan += shape([[X, M.y1 - 1.2, M.z0 + 1.2], [X, M.y0 + 1.2, M.z0 + 1.2], [X, M.y0 + 1.2, M.z1 - 1.2], [X, M.y1 - 1.2, M.z1 - 1.2]], '#1d2a26', .7);
    [['read SKILL.md', '#9fc3ea'], ['GET CrossRef', '#f0b46a'], ['page: (空)', '#ff7b6e'], ['article: 011601', '#8af0ae']]
      .forEach(([t, c], i) => { pan += txFront([X + .02, M.y1 - 2.4, M.z1 - 4.6 - i*4.8], t, 3, c, MONO, 600); });
  }
  parts.push({ box: [[M.x0, M.y0, M.z0], [M.x1, M.y1, M.z1]], svg: pan });
  return byDepth(parts);
}
function skillNote(){
  // a yellow note on a small stand, beside the monitor
  const x0 = 10, x1 = 11, y0 = 70, y1 = 86, z0 = DH + 6, z1 = DH + 26;
  let s = box(10, 76, DH, 11, 80, z0, BODY, toneI, .8) + box(x0, y0, z0, x1, y1, z1, NOTE, tone, 1);
  if (facing([1,0,0])){ const X = x1 + .06;
    s += txFront([X, y1 - 1.5, z1 - 3.6], 'SKILL.md', 2.8, KB, MONO, 700);
    ['1 先查库', '2 逐项比对', '3 缺了就空着'].forEach((t, i) => { s += txFront([X, y1 - 1.2, z1 - 8 - i*3.8], t, 2.3, '#3d3d3a', SANS, 600); }); }
  return s;
}
const FILES = [['crossref-record.json', 34, '#1B365D'], ['references.bib', 50, '#3f8f3a'], ['verification.md', 66, '#b8566f']];
function file(name, y, col, k){
  if (k <= 0) return '';
  const e = ease(k), x0 = 34, x1 = 50, z = DH + .05 + 6*(1 - e), w = 13;
  let s = box(x0, y - w/2, z, x1, y + w/2, z + .5, PAPER, toneI, .9);
  const zt = z + .52;
  s += fill(pd([[x0 + 1.5, y + w/2 - 1, zt], [x0 + 4.5, y + w/2 - 1, zt], [x0 + 4.5, y - w/2 + 1, zt], [x0 + 1.5, y - w/2 + 1, zt]]), col, 'opacity=".85"');
  for (let i = 0; i < 4; i++) s += `<path d="${pd([[x0 + 6.5 + i*2.2, y + w/2 - 1.5, zt], [x0 + 6.5 + i*2.2, y - w/2 + 1.5 + (i === 3 ? 4 : 0), zt]], false)}" stroke="#a9a59a" stroke-width=".7"/>`;
  return `<g opacity="${e.toFixed(2)}">${s}</g>`;
}
/* ---------- the flying record card ---------- */
const C0 = [CB.x1 + 8, (CB.y0 + CB.y1)/2, CB.z1 + 4], C2 = [42, 50, DH + 8], C1 = [6, 50, 78];
function recordCard(p, op = 1){
  const k = INK_K, [X, Y] = P(...p), w = 26*k, h = 17*k;
  return `<g opacity="${op.toFixed(2)}"><rect x="${f2(X - w/2)}" y="${f2(Y - h/2)}" width="${f2(w)}" height="${f2(h)}" rx="${f2(2*k)}" fill="#ffffff" stroke="${KB}" stroke-width="1.8"/>`
    + `<text x="${f2(X)}" y="${f2(Y - h/2 + 6.5*k)}" font-size="${f2(5.4*k)}" text-anchor="middle" font-family="${MONO}" font-weight="700" fill="${KB}">DOI 记录</text>`
    + [0, 1].map(i => `<path d="M${f2(X - w/2 + 3*k)} ${f2(Y + (1.5 + i*4)*k)}H${f2(X + w/2 - 3*k)}" stroke="#9aa3ab" stroke-width="1"/>`).join('') + `</g>`;
}
function memoryBubble(){
  const k = INK_K, [X0, Y0] = P(M.x1, M.y0 + 6, M.z1 + 8), X = X0 + 10*k, Y = Y0 - 34*k;
  const C = [[-20, 2, 11], [-4, -6, 13], [12, -1, 11], [24, 5, 8], [0, 7, 10]];
  let s = `<circle cx="${f2(X0 + 2*k)}" cy="${f2(Y0 - 6*k)}" r="${f2(2.2*k)}" fill="#fcfbf7" stroke="${INK}" stroke-width="1.4"/><circle cx="${f2(X0 + 6*k)}" cy="${f2(Y0 - 14*k)}" r="${f2(3.4*k)}" fill="#fcfbf7" stroke="${INK}" stroke-width="1.6"/>`;
  s += C.map(([dx, dy, r]) => `<circle cx="${f2(X + dx*k)}" cy="${f2(Y + dy*k)}" r="${f2(r*k)}" fill="#fcfbf7" stroke="${INK}" stroke-width="2"/>`).join('');
  s += C.map(([dx, dy, r]) => `<circle cx="${f2(X + dx*k)}" cy="${f2(Y + dy*k)}" r="${f2(r*k - 1)}" fill="#fcfbf7"/>`).join('');
  s += `<text x="${f2(X + 2*k)}" y="${f2(Y + 4*k)}" font-size="${f2(9*k)}" text-anchor="middle" font-family="${SANS}" font-weight="700" fill="#87867f">凭记忆猜</text>`;
  s += `<path d="M${f2(X - 18*k)} ${f2(Y + 1*k)}L${f2(X + 22*k)} ${f2(Y + 1*k)}" stroke="${KR}" stroke-width="${f2(2.2*k)}" stroke-linecap="round"/>`;
  return s;
}
/* ---------- scene ---------- */
function scene(st){
  const u = st.u, open = u < .15 ? ease(u/.15) : u > .9 ? 1 - ease((u - .9)/.1) : 1;
  let s = cabinet(open) + board(0, 0, DW, DD, DH, 6, DESK);
  const fk = i => clamp01((u - .5 - i*.1)/.1);
  s += byDepth([
    { box: [[8, M.y0, DH], [22, M.y1, M.z1]], svg: monitor() },
    { box: [[10, 70, DH], [11, 86, DH + 26]], svg: skillNote() },
    ...FILES.map(([n, y, c], i) => ({ box: [[34, y - 6.5, DH], [50, y + 6.5, DH + 1]], svg: file(n, y, c, fk(i)) })),
  ]);
  const N = 30, path = Array.from({ length: N }, (_, i) => bez(C0, C1, C2, i/(N - 1)));
  s += dashed(path, KB);
  if (u >= .1 && u < .55){ const t = clamp01((u - .15)/.35); s += recordCard(bez(C0, C1, C2, ease(t)), u > .5 ? 1 - (u - .5)/.05 : 1); }
  s += memoryBubble();
  s += pill([CB.x1, CB.y0 + 2, CB.z1], -24, -18, 'CrossRef 数据库');
  s += pill([11, 78, DH + 26], -10, -22, '先读 skill');
  FILES.forEach(([n, y], i) => { if (fk(i) >= 1) s += pill([50, y, DH + 1], 30 - i*16, 26 + i*12, n, true, KB); });
  return s;
}
const q0 = new URLSearchParams(location.search);
if (window.parent !== window || q0.get('embed') === '1'){ window.FIG_A = () => .75; window.LBL_U = () => 0; }
const STILL = q0.get('still') === '1' || q0.has('u'), LOOP = 7;
const ui = mountFigure({
  fig: '1', title: 'DOI lookup', turn: 'full', credit: false,
  size: [76, 92, 72], center: [12, 46], palette: 'kami',
  state: { u: q0.has('u') ? +q0.get('u') : STILL ? .88 : 0 }, scene, buttons: [],
  params(st, q){
    if (q.get('embed') === '1') document.documentElement.classList.add('embed');
    if (q.get('still') === '1') document.documentElement.classList.add('still');
  },
});
if (!STILL) ui.animate(dt => { if (!document.hidden) ui.st.u = (ui.st.u + dt/LOOP) % 1; return true; });
if (window.parent !== window){ document.documentElement.classList.add('embed');
  addEventListener('pointerup', () => setTimeout(() => { try { document.activeElement && document.activeElement.blur(); window.parent.focus(); } catch (e) {} }, 0), true); }
