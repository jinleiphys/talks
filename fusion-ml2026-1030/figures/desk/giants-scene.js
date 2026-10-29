/* Standing on the shoulders of giants: a tower of papers built up decade by decade, a researcher on top with a
   telescope. The field's history is the stack; you can only see far by standing on it.
   Parts (each held by another):
     GROUND    a round grassy plinth
     STACK     slabs of papers, one per era, each a little smaller: 1960s journals, 1970s, 1980s, 1992 arXiv, 2000s,
               2010s, 2026; their spines carry the year
     PERSON    the researcher on top, in a blue jacket, holding a telescope pointed up and out
     STAR      a small star far up the telescope's line, twinkling (the new result) */
const KB = '#1B365D', KR = '#b53333';
for (const k of Object.keys(PALS)) delete PALS[k];
PALS.kami = { l:'#E4ECF5', m:'#c9d6e6', d:KB };
const GRASS = { l:'#cfe0b8', m:'#aec793', d:'#6f8a55' }, SKIN = { l:'#f3d2b3', m:'#dcb593', d:'#a6825f' };
const PANT = { l:'#55606e', m:'#3d4652', d:'#262c34' }, JACKET = { l:'#7ea4d6', m:'#5b83ba', d:'#2b4466' };
const BRASS = { l:'#f0cf7a', m:'#c9a24a', d:'#7d6224' };
const ERAS = [['1960s', '#e8dcc4'], ['1970s', '#efe3c9'], ['1980s', '#f2e8d2'], ['1992 arXiv', '#e4ecf5'], ['2000s', '#eaf0f6'], ['2010s', '#f0f4f8'], ['2026', '#fbe9e4']];
const SANS = 'Inter, PingFang SC, sans-serif', MONO = 'SF Mono, Menlo, monospace';
const f2 = v => v.toFixed(1);
function pill(p3, dx, dy, text, on = false, col = KR){
  const k = INK_K, [X, Y] = P(...p3), fs = 11*k, h = fs*1.8;
  const w = [...text].reduce((a, ch) => a + (/[　-鿿＀-￯]/.test(ch) ? 1 : .6), 0)*fs + fs*1.3;
  const cx = X + dx*k, cy = Y + dy*k;
  return `<g><path d="M${f2(X)} ${f2(Y)}L${f2(cx)} ${f2(cy)}" stroke="${INK}" stroke-width="1"/><circle cx="${f2(X)}" cy="${f2(Y)}" r="${f2(1.4*k)}" fill="${INK}"/>`
    + `<rect x="${f2(cx - w/2)}" y="${f2(cy - h/2)}" width="${f2(w)}" height="${f2(h)}" rx="${f2(h/2)}" fill="${on ? '#fbe9e4' : '#fcfbf7'}" stroke="${on ? col : INK}" stroke-width="1.2"/>`
    + `<text x="${f2(cx)}" y="${f2(cy + fs*.36)}" font-size="${f2(fs)}" text-anchor="middle" font-family="${SANS}" font-weight="700" fill="${on ? col : INK}">${text}</text></g>`;
}
const txF = (p, U, V, str, size, col, fam = SANS, weight = 600) =>
  `<text transform="${txM(P(...p), Dv(...U), Dv(...V))}" font-size="${size}" fill="${col}" font-family="${fam}" font-weight="${weight}">${str}</text>`;
const txFront = (p, str, size, col, fam, w) => txF(p, [0,-1,0], [0,0,-1], str, size, col, fam, w);
/* ---------- the stack ---------- */
const SLAB = 7, CT = [30, 30];
function stack(){
  const parts = [];
  ERAS.forEach(([yr, col], i) => {
    const r = 20 - i*1.6, z0 = 3 + i*SLAB, z1 = z0 + SLAB - .4, m = matOf(col);
    let s = box(CT[0] - r, CT[1] - r, z0, CT[0] + r, CT[1] + r, z1, m, tone, 1.1);
    if (facing([1,0,0])){
      const X = CT[0] + r + .06;
      for (let j = 1; j < 4; j++) s += `<path d="${pd([[X, CT[1] + r - .5, z0 + j*1.6], [X, CT[1] - r + .5, z0 + j*1.6]], false)}" stroke="${m.d}" stroke-width=".5" stroke-opacity=".6"/>`;
      s += txFront([X + .02, CT[1] + r - 2.5, z0 + 5], yr, 4.4, '#3d3d3a', MONO, 700);
    }
    parts.push({ box: [[CT[0] - r, CT[1] - r, z0], [CT[0] + r, CT[1] + r, z1]], svg: s });
  });
  return parts.map(p => p.svg).join('');
}
const TOP = 3 + ERAS.length*SLAB;
/* ---------- the researcher with a telescope ---------- */
const HAIR = { l:'#5a4636', m:'#3f3127', d:'#241b15' }, SHOE = { l:'#4a4945', m:'#2e2d2b', d:'#1d1c1b' };
// a shaded sphere in screen space at a 3D centre
function ball(c, r, m){
  const [X, Y] = P(...c), [X2, Y2] = P(c[0], c[1], c[2] + r), R = Math.hypot(X2 - X, Y2 - Y);
  return `<circle cx="${f2(X)}" cy="${f2(Y)}" r="${f2(R)}" fill="${m.d}" stroke="${INK}" stroke-width="1.6"/>`
    + `<circle cx="${f2(X + R*.15)}" cy="${f2(Y - R*.15)}" r="${f2(R*.8)}" fill="${m.m}"/>`
    + `<circle cx="${f2(X + R*.3)}" cy="${f2(Y - R*.32)}" r="${f2(R*.45)}" fill="${m.l}"/>`;
}
// telescope geometry (shared with the sight line): eyepiece near the face, objective up and out
const TX = CT[0], TY = CT[1], TZ = TOP;
const EYE = [TX + 4.2, TY - 2, TZ + 34], OBJ = [TX + 19, TY - 11, TZ + 45];
function person(){
  const x = TX, y = TY, z = TZ, parts = [];
  // legs and shoes
  for (const dy of [-1.6, 1.6]){
    parts.push(cyl(x - .5, y + dy, z, z + 1.2, 1.5, SHOE, tone, 1) + rod([x, y + dy, z + 1], [x, y + dy, z + 15], 1.25, PANT, tone, 1, 1.35));
  }
  // torso: a rounded jacket, a little wider at the shoulders
  parts.push(rod([x, y, z + 14], [x, y, z + 27], 3.4, JACKET, tone, 1.2, 4));
  // back arm (left), then the head, then the telescope, then the front arm (right) over it
  const shL = [x, y + 3.6, z + 26], shR = [x, y - 3.6, z + 26];
  const handA = [EYE[0] + (OBJ[0] - EYE[0])*.25, EYE[1] + (OBJ[1] - EYE[1])*.25, EYE[2] + (OBJ[2] - EYE[2])*.25 - 1];
  const handB = [EYE[0] + (OBJ[0] - EYE[0])*.55, EYE[1] + (OBJ[1] - EYE[1])*.55, EYE[2] + (OBJ[2] - EYE[2])*.55 - 1];
  parts.push(rod(shL, handA, 1.2, JACKET, tone, 1) + ball(handA, 1.2, SKIN));
  parts.push(rod([x, y, z + 27], [x, y, z + 29], 1.1, SKIN, tone, .9));                // neck
  parts.push(ball([x - .9, y + .5, z + 33.6], 3.7, HAIR));                             // hair, behind and above the face
  parts.push(ball([x + .3, y - .3, z + 32.6], 3.6, SKIN));                                // head
  { const [ex, ey] = P(x + 2.6, y - 2.4, z + 33.4); parts.push(`<circle cx="${f2(ex)}" cy="${f2(ey)}" r="${f2(.9*INK_K)}" fill="${INK}"/>`); }   // eye
  { const [mx, my] = P(x + 3, y - 1.6, z + 31); parts.push(`<path d="M${f2(mx - 3*INK_K)} ${f2(my)}q${f2(3*INK_K)} ${f2(2.4*INK_K)} ${f2(6*INK_K)} 0" fill="none" stroke="${INK}" stroke-width="1.3" stroke-linecap="round"/>`); }  // smile
  parts.push(rod(EYE, OBJ, 1.1, BRASS, tone, 1.1, 1.9));                                  // telescope, held off the face
  parts.push(rod(shR, handB, 1.2, JACKET, tone, 1) + ball(handB, 1.2, SKIN));
  return parts.join('');
}
const STAR = [CT[0] + 56, CT[1] - 36, TOP + 74];
function star(u){
  const k = INK_K, [X, Y] = P(...STAR), r = (6 + 2.2*Math.sin(u*2*Math.PI))*k;
  const pts = Array.from({ length: 10 }, (_, i) => { const a = -Math.PI/2 + i*Math.PI/5, rr = i % 2 ? r*.45 : r; return `${f2(X + rr*Math.cos(a))},${f2(Y + rr*Math.sin(a))}`; }).join(' ');
  return `<polygon points="${pts}" fill="#f4c63d" stroke="${INK}" stroke-width="1.4"/>`;
}
function scene(st){
  let s = board(CT[0] - 28, CT[1] - 28, CT[0] + 28, CT[1] + 28, 3, 20, GRASS);
  s += stack() + person();
  const [ax, ay] = P(...OBJ), [bx, by] = P(...STAR);
  s += `<path d="M${f2(ax)} ${f2(ay)}L${f2(bx)} ${f2(by)}" stroke="${KB}" stroke-width="2" stroke-dasharray="5 5" stroke-linecap="round"/>`;
  s += star(st.u);
  s += pill([TX - 1, TY + 3, TOP + 38], -40, -12, '你');
  s += pill(STAR, -10, 30, '新的问题', true, KB);
  s += pill([CT[0] - 14, CT[1] + 14, 3 + 3*SLAB], -46, 8, '前人的论文', true);
  return s;
}
const q0 = new URLSearchParams(location.search);
if (window.parent !== window || q0.get('embed') === '1'){ window.FIG_A = () => .75; window.LBL_U = () => 0; }
const STILL = q0.get('still') === '1' || q0.has('u'), LOOP = 2.4;
const ui = mountFigure({
  fig: '1', title: 'Shoulders of giants', turn: 'full', credit: false,
  size: [64, 64, 120], center: [50, 6], palette: 'kami',
  state: { u: q0.has('u') ? +q0.get('u') : .25 }, scene, buttons: [],
  params(st, q){
    if (q.get('embed') === '1') document.documentElement.classList.add('embed');
    if (q.get('still') === '1') document.documentElement.classList.add('still');
  },
});
if (!STILL) ui.animate(dt => { if (!document.hidden) ui.st.u = (ui.st.u + dt/LOOP) % 1; return true; });
if (window.parent !== window){ document.documentElement.classList.add('embed');
  addEventListener('pointerup', () => setTimeout(() => { try { document.activeElement && document.activeElement.blur(); window.parent.focus(); } catch (e) {} }, 0), true); }
