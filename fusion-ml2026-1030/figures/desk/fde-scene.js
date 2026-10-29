/* The FDE site: an engineer flown in to a building site, making AI work there.
   Parts (each held by another):
     SITE      sandy ground slab, everything stands on it
     BUILDING  half-built block at the back: concrete ground floor, columns and a slab above, a check-mark sign on its face
     CRANE     yellow mast, jib, counterweight, a hook carrying a steel beam
     FDE       engineer in an orange vest and yellow hard hat, holding up a laptop whose screen says AI
     USER      site worker in a blue vest holding a blueprint
     CITY      a small Shanghai skyline on its own island, far back left (a glass supertower, a stepped tower with a
               spire, a TV tower with pink spheres, a brick block): where the engineer is sent from
     PLANE     a small jet; it takes off over the skyline, flies over the site and on out of the picture,
               leaving a dashed trail
     CHUTE     over the site the engineer jumps and floats down under a parachute, then lands and gets to work
     CLOUD     the model, back right; once the engineer has landed, a dashed line from it to the laptop
   One loop (about 9 s): fly 0 to .55, jump .48 to .78, plane leaves .55 to .8, rest with all labels .8 to 1. */
const SW = 80, SD = 120, SHT = 3;
const KB = '#1B365D', KR = '#b53333', KG = '#4a6b3a';
for (const k of Object.keys(PALS)) delete PALS[k];
PALS.kami = { l:'#E4ECF5', m:'#c9d6e6', d:KB };
const SAND = { l:'#eedcb4', m:'#d7c092', d:'#a99166' }, CONC = { l:'#e6e4de', m:'#c6c3ba', d:'#918d84' };
const YEL = { l:'#f4c63d', m:'#d9a826', d:'#8a6a14' }, ORG = { l:'#f08a3c', m:'#d06d24', d:'#7d3f12' };
const BLU = { l:'#7ea4d6', m:'#5b83ba', d:'#2b4466' }, SKIN = { l:'#f3d2b3', m:'#dcb593', d:'#a6825f' };
const PANT = { l:'#55606e', m:'#3d4652', d:'#262c34' }, WHITE = { l:'#fdfcf8', m:'#ebe8df', d:'#c9c5b8' };
const STEEL = { l:'#b9c0c6', m:'#8f979e', d:'#5d646a' }, DARKC = { l:'#4a4945', m:'#2e2d2b', d:'#1d1c1b' };
const SANS = 'Inter, PingFang SC, sans-serif';
const f2 = v => v.toFixed(1);
function pill(p3, dx, dy, text, on = false){
  const k = INK_K, [X, Y] = P(...p3), fs = 11*k, h = fs*1.8;
  const w = [...text].reduce((a, ch) => a + (/[　-鿿＀-￯①-⑳]/.test(ch) ? 1 : .6), 0)*fs + fs*1.3;
  const cx = X + dx*k, cy = Y + dy*k;
  return `<g><path d="M${f2(X)} ${f2(Y)}L${f2(cx)} ${f2(cy)}" stroke="${INK}" stroke-width="1"/><circle cx="${f2(X)}" cy="${f2(Y)}" r="${f2(1.4*k)}" fill="${INK}"/>`
    + `<rect x="${f2(cx - w/2)}" y="${f2(cy - h/2)}" width="${f2(w)}" height="${f2(h)}" rx="${f2(h/2)}" fill="${on ? '#fbe9e4' : '#fcfbf7'}" stroke="${on ? KR : INK}" stroke-width="1.2"/>`
    + `<text x="${f2(cx)}" y="${f2(cy + fs*.36)}" font-size="${f2(fs)}" text-anchor="middle" font-family="${SANS}" font-weight="700" fill="${on ? KR : INK}">${text}</text></g>`;
}
const bez = (a, c, b, t) => a.map((_, i) => (1-t)*(1-t)*a[i] + 2*(1-t)*t*c[i] + t*t*b[i]);
const dashed = (pts, col = KB) => `<path d="${pd(pts, false)}" fill="none" stroke="${col}" stroke-width="2" stroke-dasharray="5 4" stroke-linecap="round"/>`;

/* ---------- people ---------- */
// a standing figure at (x, y) facing +x; vest colour m; returns parts for byDepth
function person(x, y, vest, hat, extra = [], dz = 0){
  const z = SHT + dz, K = 1.8, P0 = [], b = (x0, y0, z0, x1, y1, z1, m, w = 1) => ({ box: [[x + x0*K, y + y0*K, z + z0*K], [x + x1*K, y + y1*K, z + z1*K]], svg: box(x + x0*K, y + y0*K, z + z0*K, x + x1*K, y + y1*K, z + z1*K, m, tone, w) });
  P0.push(b(-1, -2.6, 0, 1, -.4, 10, PANT), b(-1, .4, 0, 1, 2.6, 10, PANT), b(-1.6, -3, 10, 1.6, 3, 20, vest, 1.1), b(-1.5, -1.6, 20, 1.5, 1.6, 24, SKIN));
  if (hat) P0.push({ box: [[x - 2.4*K, y - 2.4*K, z + 24*K], [x + 2.4*K, y + 2.4*K, z + 26.4*K]], svg: cyl(x, y, z + 24*K, z + 24.5*K, 2.4*K, hat, tone, 1) + cyl(x, y, z + 24.5*K, z + 26.4*K, 1.7*K, hat, tone, 1) });
  return P0.concat(extra);
}
const PK = 1.8;
/* ---------- the site ---------- */
function building(){
  const x0 = 6, x1 = 30, y0 = 62, y1 = 104, parts = [];
  parts.push({ box: [[x0, y0, SHT], [x1, y1, SHT + 16]], svg: box(x0, y0, SHT, x1, y1, SHT + 16, CONC, tone, 1.2) });
  parts.push({ box: [[x0, y0, SHT + 16], [x1, y1, SHT + 17.4]], svg: box(x0, y0, SHT + 16, x1, y1, SHT + 17.4, CONC, tone, 1) });
  for (const [cx, cy] of [[x0 + 1.5, y0 + 1.5], [x1 - 1.5, y0 + 1.5], [x0 + 1.5, (y0 + y1)/2], [x1 - 1.5, (y0 + y1)/2]])
    parts.push({ box: [[cx - 1.2, cy - 1.2, SHT + 17.4], [cx + 1.2, cy + 1.2, SHT + 31]], svg: box(cx - 1.2, cy - 1.2, SHT + 17.4, cx + 1.2, cy + 1.2, SHT + 31, CONC, tone, 1) });
  parts.push({ box: [[x0, y0, SHT + 31], [x1, (y0 + y1)/2 + 1.5, SHT + 32.4]], svg: box(x0, y0, SHT + 31, x1, (y0 + y1)/2 + 1.5, SHT + 32.4, CONC, tone, 1) });
  // a sign on the front face: a big green check
  let sg = '';
  if (facing([1,0,0])){
    const X = x1 + .08, q = [[X, y0 + 20, SHT + 4], [X, y0 + 6, SHT + 4], [X, y0 + 6, SHT + 13.5], [X, y0 + 20, SHT + 13.5]];
    sg = shape(q, '#ffffff', 1) + `<path d="${pd([[X + .05, y0 + 17.5, SHT + 9], [X + .05, y0 + 14, SHT + 6], [X + .05, y0 + 8.5, SHT + 12]], false)}" fill="none" stroke="${KG}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  return byDepth(parts) + sg;
}
function crane(){
  const mx = 16, my = 44, top = SHT + 66, parts = [];
  parts.push({ box: [[mx - 1.6, my - 1.6, SHT], [mx + 1.6, my + 1.6, top]], svg: box(mx - 1.6, my - 1.6, SHT, mx + 1.6, my + 1.6, top, YEL, tone, 1) });
  parts.push({ box: [[mx - 1.2, my - 34, top], [mx + 1.2, my + 14, top + 2.4]], svg: box(mx - 1.2, my - 34, top, mx + 1.2, my + 14, top + 2.4, YEL, tone, 1) });
  parts.push({ box: [[mx - 2.4, my + 9, top - 4], [mx + 2.4, my + 14, top]], svg: box(mx - 2.4, my + 9, top - 4, mx + 2.4, my + 14, top, DARKC, tone, 1) });
  const hy = my - 26, hz = SHT + 40;
  const cable = line([[mx, hy, top], [mx, hy, hz + 1.2]], 1);
  const beam = box(mx - 1, hy - 7, hz, mx + 1, hy + 7, hz + 1.2, STEEL, tone, 1);
  return byDepth(parts) + cable + beam;
}
function laptop(x, y, z){
  // held up in front of the engineer, screen toward the viewer (+x), base flat
  let s = box(x, y - 6, z, x + 6, y + 6, z + .8, DARKC, tone, .9);
  s += box(x + 6, y - 6, z, x + 6.8, y + 6, z + 9, DARKC, tone, .9);
  if (facing([1,0,0])){
    const X = x + 6.86, q = [[X, y + 5.2, z + .8], [X, y - 5.2, z + .8], [X, y - 5.2, z + 8.3], [X, y + 5.2, z + 8.3]];
    s += shape(q, '#1d2a26', .6) + tx(X + .02, y, z + 3.8, 'AI ✓', 4.6, '#8af0ae', 800);
  }
  return s;
}
function blueprint(x, y, z){
  const q = [[x, y - 6.5, z], [x + 8, y - 6.5, z], [x + 8, y + 6.5, z], [x, y + 6.5, z]];
  let s = shape(q, '#3d6fb0', .8);
  for (let i = 1; i < 4; i++) s += `<path d="${pd([[x + i*2, y - 5.5, z + .02], [x + i*2, y + 5.5, z + .02]], false)}" stroke="#dbe7f7" stroke-width=".7"/>`;
  return s;
}
/* ---------- the city, the plane, the parachute ---------- */
const GLASS = { l:'#d3e3f0', m:'#a3bfd6', d:'#5f7f9c' }, RED = { l:'#ef6a4c', m:'#cf5038', d:'#4a2219' };
const BRICK = { l:'#d9a07c', m:'#bb7f5c', d:'#7a4c33' }, STONE = { l:'#e9e2d2', m:'#cbc2ad', d:'#8f8672' };
const CITY = { x0: -134, x1: -82, y0: -14, y1: 34 };
function windows(x0, y0, z0, x1, y1, z1){
  let s = '';
  for (let z = z0 + 5; z < z1 - 2; z += 5){
    if (facing([1,0,0])) s += `<path d="${pd([[x1 + .06, y1 - 1, z], [x1 + .06, y0 + 1, z]], false)}" stroke="#ffffff" stroke-width="1.1" stroke-opacity=".75"/>`;
    if (facing([0,1,0])) s += `<path d="${pd([[x0 + 1, y1 + .06, z], [x1 - 1, y1 + .06, z]], false)}" stroke="#ffffff" stroke-width="1.1" stroke-opacity=".75"/>`;
  }
  return s;
}
const tower = (x0, y0, z0, x1, y1, z1, m) => ({ box: [[x0, y0, z0], [x1, y1, z1]], svg: box(x0, y0, z0, x1, y1, z1, m, tone, 1.1) + windows(x0, y0, z0, x1, y1, z1) });
const PEARL = [-90, 10], SPIRE = [-90, 10, SHT + 84];
// a sphere, drawn in screen space at a 3D centre (lit from the upper right, like the rest)
function ball(c, r, col, colD){
  const k = INK_K, [X, Y] = P(...c), R = r*k*CAM_K*1.15;
  return `<circle cx="${f2(X)}" cy="${f2(Y)}" r="${f2(R)}" fill="${colD}" stroke="${INK}" stroke-width="1.6"/>`
    + `<circle cx="${f2(X + R*.18)}" cy="${f2(Y - R*.2)}" r="${f2(R*.72)}" fill="${col}"/>`
    + `<circle cx="${f2(X + R*.38)}" cy="${f2(Y - R*.42)}" r="${f2(R*.18)}" fill="#fff4f6" fill-opacity=".85"/>`;
}
function pearl(){
  // the TV tower: a mast through two pink spheres and a small one, a needle on top
  const [x, y] = PEARL;
  let s = rod([x, y, SHT], [x, y, SHT + 66], 1.3, STONE, tone, 1);
  s += rod([x - 3, y - 3, SHT], [x, y, SHT + 16], .9, STONE, tone, .9) + rod([x + 3, y + 3, SHT], [x, y, SHT + 16], .9, STONE, tone, .9);
  s += ball([x, y, SHT + 18], 8, '#ef8fa6', '#b8566f') + ball([x, y, SHT + 48], 5.4, '#ef8fa6', '#b8566f') + ball([x, y, SHT + 64], 1.8, '#ef8fa6', '#b8566f');
  s += rod([x, y, SHT + 65], SPIRE, .9, STEEL, tone, .9, .2);
  return s;
}
function city(){
  let s = board(CITY.x0, CITY.y0, CITY.x1, CITY.y1, SHT, 6, { l:'#dfe7d6', m:'#c3cfb6', d:'#8d9a80' });
  const parts = [
    // the tallest: a glass supertower with a narrower crown
    { box: [[-131, -11, SHT], [-119, 1, SHT + 104]], svg: box(-131, -11, SHT, -119, 1, SHT + 92, GLASS, tone, 1.1) + windows(-131, -11, SHT, -119, 1, SHT + 92)
        + box(-129, -9, SHT + 92, -121, -1, SHT + 104, GLASS, tone, 1.1) },
    // a stepped tower with a spire
    { box: [[-114, 5, SHT], [-102, 17, SHT + 82]], svg:
        box(-114, 5, SHT, -102, 17, SHT + 40, STONE, tone, 1.1) + windows(-114, 5, SHT, -102, 17, SHT + 40)
      + box(-112, 7, SHT + 40, -104, 15, SHT + 58, STONE, tone, 1.1) + windows(-112, 7, SHT + 40, -104, 15, SHT + 58)
      + box(-110.5, 8.5, SHT + 58, -105.5, 13.5, SHT + 68, STONE, tone, 1.1)
      + rod([-108, 11, SHT + 68], [-108, 11, SHT + 82], 1.3, STEEL, tone, 1, .3) },
    tower(-96, 22, SHT, -86, 31, SHT + 26, BRICK),
    { box: [[-96.5, 3.5, SHT], [-83.5, 16.5, SHT + 84]], svg: pearl() },
  ];
  return s + byDepth(parts);
}
// the flight: up from the skyline, over the site, on out to the right
const F0 = [-84, 18, SHT + 90], F1 = [-30, 30, 114], F2 = [54, 26, 104], F3 = [104, -46, 112];
const flyAt = u => u < .55 ? bez(F0, F1, F2, u/.55) : bez(F2, [80, -10, 106], F3, Math.min(1, (u - .55)/.25));
function plane(p, d, op = 1){
  const f = norm(d), r = norm(cross(f, [0, 0, 1])), up = cross(r, f);
  const at = (a, b, c = 0) => [p[0] + f[0]*a + r[0]*b + up[0]*c, p[1] + f[1]*a + r[1]*b + up[1]*c, p[2] + f[2]*a + r[2]*b + up[2]*c];
  const wing = side => shape([at(6, 0, -.6), at(-1, 16*side, -.6), at(-6, 16*side, -.6), at(-4, 0, -.6)], WHITE.m, 1);
  const tailp = side => shape([at(-17, 0, .4), at(-21, 6*side, .4), at(-23, 6*side, .4), at(-22, 0, .4)], WHITE.m, .9);
  let s = wing(1) + wing(-1) + tailp(1) + tailp(-1);
  s += rod(at(-23, 0, 0), at(21, 0, 0), 3.4, WHITE, tone, 1.2, 1.4);
  s += shape([at(-15, 0, 1.6), at(-23, 0, 1.6), at(-24, 0, 9), at(-19, 0, 9)], RED.m, 1);
  const side = vis(r) ? 1 : -1;
  for (let i = 0; i < 5; i++){ const [X, Y] = P(...at(10 - i*4.4, 3.1*side, .8)); s += `<circle cx="${f2(X)}" cy="${f2(Y)}" r="${f2(1*INK_K)}" fill="${KB}"/>`; }
  return op < 1 ? `<g opacity="${op.toFixed(2)}">${s}</g>` : s;
}
// the canopy, drawn in screen space over a 3D anchor (the engineer's head)
function chute(p3, op = 1){
  const k = INK_K, [X, Y] = P(...p3), w = 34*k, h = 18*k, top = Y - 46*k;
  let s = `<path d="M${f2(X - w)} ${f2(top + h)} Q ${f2(X)} ${f2(top - h)} ${f2(X + w)} ${f2(top + h)} Q ${f2(X + w*.5)} ${f2(top + h*.55)} ${f2(X)} ${f2(top + h)} Q ${f2(X - w*.5)} ${f2(top + h*.55)} ${f2(X - w)} ${f2(top + h)} Z" fill="#ef6a4c" stroke="${INK}" stroke-width="2"/>`;
  s += `<path d="M${f2(X)} ${f2(top - h*.02)} L${f2(X)} ${f2(top + h)}" stroke="#fcfbf7" stroke-width="3"/>`;
  for (const dx of [-w, -w*.5, 0, w*.5, w]) s += `<path d="M${f2(X + dx)} ${f2(top + h)} L${f2(X)} ${f2(Y)}" stroke="${INK}" stroke-width=".9"/>`;
  return op < 1 ? `<g opacity="${op.toFixed(2)}">${s}</g>` : s;
}
function cloudAt(p3, label){
  const k = INK_K, [X, Y] = P(...p3), C = [[-26, 4, 14], [-8, -7, 18], [12, -3, 16], [30, 5, 13], [-40, 10, 10], [44, 11, 9], [2, 10, 13]];
  let s = C.map(([dx, dy, r]) => `<circle cx="${f2(X + dx*k)}" cy="${f2(Y + dy*k)}" r="${f2(r*k)}" fill="#fcfbf7" stroke="${INK}" stroke-width="2.4"/>`).join('');
  s += C.map(([dx, dy, r]) => `<circle cx="${f2(X + dx*k)}" cy="${f2(Y + dy*k)}" r="${f2(r*k - 1.2)}" fill="#fcfbf7"/>`).join('');
  return s + `<text x="${f2(X)}" y="${f2(Y + 7*k)}" font-size="${f2(10*k)}" text-anchor="middle" font-family="${SANS}" font-weight="700" fill="${INK}">${label}</text>`;
}
const CLOUD = [100, -34, 72];

/* ---------- scene ---------- */
const ENG = [60, 34], USR = [54, 68], HEAD = SHT + 49;
const clamp01 = v => Math.max(0, Math.min(1, v));
function scene(st){
  const u = st.u;
  let s = city() + board(0, 0, SW, SD, SHT, 8, SAND);
  const top = boardTop(0, 0, SW, SD, SHT, 8);
  const cube = (x0, y0, x1, y1, z1) => [x0, x1].flatMap(x => [y0, y1].flatMap(y => [[x, y, SHT], [x, y, z1]]));
  const [sx, sy] = yawTurn(SH), sk = SHADOW_LEN/SHADOW_K;
  const shade = pts => fill(sp(hull(pts.map(([x, y, z]) => P(x + (z - SHT)*sx*sk, y + (z - SHT)*sy*sk, SHT)))), '#cdb484');
  // the jump: from the plane's position at u = .48 down to the ground at u = .78
  const J0 = flyAt(.48), jt = clamp01((u - .48)/.3), landed = u >= .78, jumping = u >= .48 && !landed;
  const ex = landed ? ENG[0] : J0[0] + (ENG[0] - J0[0])*ease(jt), ey = landed ? ENG[1] : J0[1] + (ENG[1] - J0[1])*ease(jt);
  const dz = landed ? 0 : (J0[2] - HEAD)*(1 - jt);
  s += clipTo(top, shade(cube(6, 62, 30, 104, SHT + 32)) + shade(cube(14.4, 42.4, 17.6, 45.6, SHT + 66))
     + (landed ? shade(cube(ENG[0] - 3, ENG[1] - 5, ENG[0] + 3, ENG[1] + 5, SHT + 47)) : '') + shade(cube(USR[0] - 3, USR[1] - 5, USR[0] + 3, USR[1] + 5, SHT + 47)));
  const lap = [{ box: [[ex + 3, ey - 6, SHT + 28 + dz], [ex + 9.8, ey + 6, SHT + 37 + dz]], svg: laptop(ex + 3, ey, SHT + 28 + dz) }];
  const ground = [
    { box: [[6, 62, SHT], [30, 104, SHT + 32.4]], svg: building() },
    { box: [[14, 10, SHT], [18, 58, SHT + 69]], svg: crane() },
    ...person(USR[0], USR[1], BLU, WHITE, [{ box: [[USR[0] + 3, USR[1] - 6.5, SHT + 27], [USR[0] + 11, USR[1] + 6.5, SHT + 27.2]], svg: blueprint(USR[0] + 3, USR[1], SHT + 27) }]),
  ];
  if (landed) ground.push(...person(ENG[0], ENG[1], ORG, YEL, lap));
  s += byDepth(ground);
  // in the air: the engineer under the canopy, the plane and its trail
  if (jumping) s += byDepth(person(ex, ey, ORG, YEL, lap, dz)) + chute([ex, ey, HEAD + dz]);
  if (landed && u < .84) s += chute([ENG[0], ENG[1], HEAD], 1 - (u - .78)/.06);
  const pu = Math.min(u, .8), n = Math.max(2, Math.round(pu*60));
  const trail = Array.from({ length: n }, (_, i) => flyAt(pu*i/(n - 1)));
  if (u < .8) s += `<g opacity="${(u < .7 ? 1 : (.8 - u)/.1).toFixed(2)}">${dashed(trail)}</g>`;
  const pp = flyAt(pu), pd2 = sub(flyAt(Math.min(.999, pu + .01)), pp), pop = u < .72 ? 1 : clamp01((.8 - u)/.08);
  if (pop > 0) s += plane(pp, pd2, pop) + (u < .7 ? pill(pp, 26, -22, '派到现场') : '');
  // once landed: the model connects, the labels come up
  s += cloudAt(CLOUD, 'AI 模型（云端）');
  s += pill(SPIRE, -62, 6, '从上海出发');
  if (landed){
    s += dashed([[ENG[0] + 9.8, ENG[1] - 2, SHT + 37], [CLOUD[0] - 4, CLOUD[1] + 4, CLOUD[2] - 10]]);
    s += pill([ENG[0], ENG[1] + 1, SHT + 47], -26, -26, 'FDE');
    s += pill([ENG[0] + 6.8, ENG[1] - 5, SHT + 31], 92, 14, '② 接上：AI 读图纸、算结构', true);
  }
  s += pill([USR[0] + 1, USR[1] - 2, SHT + 30], 70, 72, '① 看懂：用户怎么干活', true);
  s += pill([30, 72, SHT + 9], -26, 30, '③ 验收：对已知结果', true);
  return s;
}
const q0 = new URLSearchParams(location.search);
if (window.parent !== window || q0.get('embed') === '1'){ window.FIG_A = () => .75; window.LBL_U = () => 0; }
const STILL = q0.get('still') === '1' || q0.has('u'), LOOP = 9;   // ?u=0..1 freezes one moment of the loop
const ui = mountFigure({
  fig: '1', title: 'FDE site', turn: 'full', credit: false,
  size: [230, 170, 175], center: [-25, 30], palette: 'kami',
  state: { u: q0.has('u') ? +q0.get('u') : STILL ? .6 : 0 }, scene, buttons: [],
  params(st, q){
    if (q.get('embed') === '1') document.documentElement.classList.add('embed');
    if (q.get('still') === '1') document.documentElement.classList.add('still');
  },
});
if (!STILL) ui.animate(dt => { if (!document.hidden) ui.st.u = (ui.st.u + dt/LOOP) % 1; return true; });
if (window.parent !== window){ document.documentElement.classList.add('embed');
  addEventListener('pointerup', () => setTimeout(() => { try { document.activeElement && document.activeElement.blur(); window.parent.focus(); } catch (e) {} }, 0), true); }
