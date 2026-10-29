/* One local repository, two remotes: why the agent can open the submitted .tex and .bib at all.
   Parts (each held by another):
     DESK      the local desk; on it the computer and a monitor
     HOST      the computer holding ~/my-paper, one git repository: paper/ (.tex .bib), code/, figures/, .git;
               a window in its face lists them
     MONITOR   a terminal where the agent reads and edits the files on the host
     GITHUB    a server rack, far back left: receives the whole repository with its history
     OVERLEAF  a green document box, far back right: receives only the paper, compiled and shared on the web
     PUSHES    dashed lines from the host to each remote; paper slips run along them in a loop */
const DW = 60, DD = 84, DH = 4;
const KB = '#1B365D', KR = '#b53333', KG = '#3f8f3a';
for (const k of Object.keys(PALS)) delete PALS[k];
PALS.kami = { l:'#E4ECF5', m:'#c9d6e6', d:KB };
const DESK = { l:'#eadfc8', m:'#d6c7a8', d:'#ab9c7e' }, BODY = { l:'#5d5b56', m:'#3d3d3a', d:'#262624' };
const CASE = { l:'#6a6862', m:'#4a4945', d:'#2e2d2b' }, PAPER = { l:'#fdfcf8', m:'#ebe8df', d:'#c9c5b8' };
const RACK = { l:'#4d5560', m:'#353b44', d:'#1f2329' }, OLF = { l:'#7cc36f', m:'#4f9c45', d:'#2b5a26' };
const SANS = 'Inter, PingFang SC, sans-serif', MONO = 'SF Mono, Menlo, monospace';
const f2 = v => v.toFixed(1);
const txF = (p, U, V, str, size, col, fam = SANS, weight = 600) =>
  `<text transform="${txM(P(...p), Dv(...U), Dv(...V))}" font-size="${size}" fill="${col}" font-family="${fam}" font-weight="${weight}">${str}</text>`;
const txFront = (p, str, size, col, fam, w) => txF(p, [0,-1,0], [0,0,-1], str, size, col, fam, w);
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

/* ---------- the local desk ---------- */
const T = { x0: 26, x1: 40, y0: 34, y1: 70, z1: DH + 34 };
const WX = T.x1 + .06;
function host(){
  let s = box(T.x0, T.y0, DH, T.x1, T.y1, T.z1, CASE, tone, 1.3);
  if (!facing([1,0,0])) return s;
  const q = [[WX, T.y1 - 2, DH + 4], [WX, T.y0 + 2, DH + 4], [WX, T.y0 + 2, T.z1 - 3], [WX, T.y1 - 2, T.z1 - 3]];
  s += shape(q, PAPER.l, .7);
  const Y = T.y1 - 3.4, at = (z, str, size, col, w) => txFront([WX + .02, Y, z], str, size, col, MONO, w);
  s += at(T.z1 - 6.5, '~/my-paper', 3.4, KB, 700);
  s += line([[WX, Y, T.z1 - 8.4], [WX, T.y0 + 3, T.z1 - 8.4]], .4);
  s += at(T.z1 - 12.5, 'paper/  .tex .bib', 3, '#3d3d3a', 700);
  s += at(T.z1 - 17.5, 'code/', 3, '#3d3d3a', 700);
  s += at(T.z1 - 22.5, 'figures/', 3, '#3d3d3a', 700);
  s += at(T.z1 - 27.5, '.git', 3, KR, 700);
  return s;
}
const M = { y0: -2, y1: 24, x0: 22, x1: 25, z0: 16, z1: 40 };
function monitor(){
  const yc = (M.y0 + M.y1)/2, parts = [];
  parts.push({ box: [[14, yc - 6, DH], [28, yc + 6, DH + 1.2]], svg: box(14, yc - 6, DH, 28, yc + 6, DH + 1.2, BODY, toneI, 1) });
  parts.push({ box: [[19, yc - 1.6, DH + 1.2], [22, yc + 1.6, M.z0 + 4]], svg: box(19, yc - 1.6, DH + 1.2, 22, yc + 1.6, M.z0 + 4, BODY, toneI, 1) });
  let pan = box(M.x0, M.y0, M.z0, M.x1, M.y1, M.z1, BODY, tone, 1.3);
  if (facing([1,0,0])){
    const X = M.x1 + .06, q = [[X, M.y1 - 1.2, M.z0 + 1.2], [X, M.y0 + 1.2, M.z0 + 1.2], [X, M.y0 + 1.2, M.z1 - 1.2], [X, M.y1 - 1.2, M.z1 - 1.2]];
    pan += shape(q, '#1d2a26', .7);
    const L = [['终端  ~/my-paper', '#cfe8d6'], ['read paper/main.tex', '#9fc3ea'], ['read paper/refs.bib', '#9fc3ea'], ['git log', '#f0b46a']];
    L.forEach(([t, c], i) => { pan += txFront([X + .02, M.y1 - 2.4, M.z1 - 4.6 - i*4.6], t, 2.3, c, MONO, 600); });
  }
  parts.push({ box: [[M.x0, M.y0, M.z0], [M.x1, M.y1, M.z1]], svg: pan });
  return byDepth(parts);
}
/* ---------- the two remotes ---------- */
const GH = { x0: -64, x1: -50, y0: 30, y1: 44, z1: 40 }, OL = { x0: 14, x1: 30, y0: -66, y1: -50, z1: 26 };
function github(){
  let s = board(GH.x0 - 6, GH.y0 - 6, GH.x1 + 6, GH.y1 + 6, 2, 5, { l:'#e3e6ea', m:'#c6cbd2', d:'#8b939d' });
  s += box(GH.x0, GH.y0, 2, GH.x1, GH.y1, GH.z1, RACK, tone, 1.2);
  if (facing([1,0,0])) for (let z = 6; z < GH.z1 - 2; z += 5){
    const X = GH.x1 + .06;
    s += shape([[X, GH.y1 - 1.5, z], [X, GH.y0 + 1.5, z], [X, GH.y0 + 1.5, z + 3.2], [X, GH.y1 - 1.5, z + 3.2]], '#2a2f36', .5);
    s += fill(pd([[X + .02, GH.y0 + 4, z + 1], [X + .02, GH.y0 + 2.6, z + 1], [X + .02, GH.y0 + 2.6, z + 2.2], [X + .02, GH.y0 + 4, z + 2.2]]), '#5fbf6a');
  }
  return s;
}
function overleaf(){
  let s = board(OL.x0 - 6, OL.y0 - 6, OL.x1 + 6, OL.y1 + 6, 2, 5, { l:'#e2efdd', m:'#c5dbbd', d:'#86a07c' });
  s += box(OL.x0, OL.y0, 2, OL.x1, OL.y1, OL.z1, OLF, tone, 1.2);
  // a sheet of paper standing on top, with lines
  s += box(OL.x0 + 4, OL.y0 + 3, OL.z1, OL.x0 + 5, OL.y1 - 3, OL.z1 + 15, PAPER, toneI, .9);
  if (facing([1,0,0])){ const X = OL.x0 + 5.06;
    for (let i = 0; i < 5; i++) s += `<path d="${pd([[X, OL.y1 - 4.5, OL.z1 + 12 - i*2.3], [X, OL.y0 + 4.5 + (i === 4 ? 4 : 0), OL.z1 + 12 - i*2.3]], false)}" stroke="#8a8780" stroke-width=".8"/>`; }
  return s;
}
/* ---------- the pushes ---------- */
const FROM = [(T.x0 + T.x1)/2, (T.y0 + T.y1)/2 + 4, T.z1 + .5];
const TO_GH = [(GH.x0 + GH.x1)/2, (GH.y0 + GH.y1)/2, GH.z1 + 1], TO_OL = [(OL.x0 + OL.x1)/2, (OL.y0 + OL.y1)/2, OL.z1 + 16];
const C_GH = [-20, 60, 80], C_OL = [40, -10, 66];
function slip(p, col, label){
  const k = INK_K, [X, Y] = P(...p), w = 15*k, h = 11*k;
  return `<g><rect x="${f2(X - w/2)}" y="${f2(Y - h/2)}" width="${f2(w)}" height="${f2(h)}" rx="${f2(1.5*k)}" fill="#ffffff" stroke="${col}" stroke-width="1.6"/>`
    + [0, 1, 2].map(i => `<path d="M${f2(X - w/2 + 3*k)} ${f2(Y - h/2 + (3 + i*2.6)*k)}H${f2(X + w/2 - 3*k)}" stroke="${col}" stroke-width="1"/>`).join('') + `</g>`;
}
function scene(st){
  let s = github() + overleaf() + board(0, 0, DW, DD, DH, 6, DESK);
  s += byDepth([
    { box: [[T.x0, T.y0, DH], [T.x1, T.y1, T.z1]], svg: host() },
    { box: [[14, M.y0, DH], [28, M.y1, M.z1]], svg: monitor() },
  ]);
  const N = 30, lg = Array.from({ length: N }, (_, i) => bez(FROM, C_GH, TO_GH, i/(N - 1))), lo = Array.from({ length: N }, (_, i) => bez(FROM, C_OL, TO_OL, i/(N - 1)));
  s += dashed(lg, KB) + dashed(lo, KG);
  const u = st.u, a = (u*1.0) % 1, b = (u*1.0 + .5) % 1;
  s += slip(bez(FROM, C_GH, TO_GH, ease(a)), KB) + slip(bez(FROM, C_OL, TO_OL, ease(b)), KG);
  s += pill([GH.x0 + 2, GH.y1, GH.z1], -10, -24, 'GitHub：代码 + 论文 + 历史', true, KB);
  s += pill([OL.x1, OL.y0 + 3, OL.z1 + 10], 20, -24, 'Overleaf：只放论文', true, KG);
  s += pill(bez(FROM, C_GH, TO_GH, .5), 0, 0, 'git push');
  s += pill(bez(FROM, C_OL, TO_OL, .5), 0, 0, 'git push');
  s += pill([T.x1, T.y1 - 3, DH + 8], -30, 34, '本地仓库：什么都在');
  s += pill([M.x1, M.y0 + 3, M.z0 + 2], 36, 26, 'agent 直接读');
  return s;
}
const q0 = new URLSearchParams(location.search);
if (window.parent !== window || q0.get('embed') === '1'){ window.FIG_A = () => .75; window.LBL_U = () => 0; }
const STILL = q0.get('still') === '1' || q0.has('u'), LOOP = 3.2;
const ui = mountFigure({
  fig: '1', title: 'Repo and remotes', turn: 'full', credit: false,
  size: [150, 160, 100], center: [-5, 10], palette: 'kami',
  state: { u: q0.has('u') ? +q0.get('u') : STILL ? .35 : 0 }, scene, buttons: [],
  params(st, q){
    if (q.get('embed') === '1') document.documentElement.classList.add('embed');
    if (q.get('still') === '1') document.documentElement.classList.add('still');
  },
});
if (!STILL) ui.animate(dt => { if (!document.hidden) ui.st.u = (ui.st.u + dt/LOOP) % 1; return true; });
if (window.parent !== window){ document.documentElement.classList.add('embed');
  addEventListener('pointerup', () => setTimeout(() => { try { document.activeElement && document.activeElement.blur(); window.parent.focus(); } catch (e) {} }, 0), true); }
