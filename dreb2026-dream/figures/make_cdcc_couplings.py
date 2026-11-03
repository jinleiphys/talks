import math
INK="#1B365D"; RED="#b53333"; TXT="#4d4c48"; LINE="#c9d3df"; GOLD="#b07d10"
o=[]
def fs(n): return f'style="font-size:{n}px"'
o.append('<svg viewBox="0 0 940 330" style="width: 100%; height: 19.5rem;" font-family="Newsreader, Georgia, serif">')
o.append(f'<defs><filter id="sh14" x="-5%" y="-5%" width="110%" height="115%"><feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#1B365D" flood-opacity="0.13"/></filter>'
 f'<marker id="a14" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="{INK}"/></marker>'
 f'<radialGradient id="tg14" cx="40%" cy="38%" r="65%"><stop offset="0" stop-color="#E4ECF5"/><stop offset="1" stop-color="#9DB2CB"/></radialGradient></defs>')
Y0,H,TH=4,322,42
def panel(x,w,title):
    o.append(f'<g filter="url(#sh14)"><rect x="{x}" y="{Y0}" width="{w}" height="{H}" rx="12" fill="#fff" stroke="{LINE}"/></g>')
    o.append(f'<path d="M{x} {Y0+TH} V{Y0+12} a12 12 0 0 1 12 -12 H{x+w-12} a12 12 0 0 1 12 12 V{Y0+TH} Z" fill="{INK}"/>')
    o.append(f'<text x="{x+w/2}" y="{Y0+28}" text-anchor="middle" fill="#fff" {fs(20)}>{title}</text>')
# ---- panel 1: geometry
x1,w1=4,330
panel(x1,w1,"the deuteron sees two potentials")
tx,ty=x1+92,178
o.append(f'<circle cx="{tx}" cy="{ty}" r="56" fill="url(#tg14)" stroke="{INK}" stroke-width="1.5"/>')
o.append(f'<text x="{tx}" y="{ty+7}" text-anchor="middle" fill="{INK}" {fs(20)}><tspan {fs(13)} dy="-8">58</tspan><tspan dy="8">Ni</tspan></text>')
px,py=x1+262,118; nx,ny=x1+282,232
o.append(f'<line x1="{px}" y1="{py}" x2="{nx}" y2="{ny}" stroke="{TXT}" stroke-width="1.4" stroke-dasharray="4 4"/>')
o.append(f'<text x="{(px+nx)/2+12}" y="{(py+ny)/2+5}" fill="{TXT}" font-style="italic" {fs(17)}>r</text>')
for (X,Y,lab,col) in [(px,py,"p",RED),(nx,ny,"n",INK)]:
    L=math.hypot(X-tx,Y-ty); ux,uy=(X-tx)/L,(Y-ty)/L
    o.append(f'<line x1="{tx+ux*56:.1f}" y1="{ty+uy*56:.1f}" x2="{X-ux*16:.1f}" y2="{Y-uy*16:.1f}" stroke="{col}" stroke-width="1.8"/>')
o.append(f'<circle cx="{px}" cy="{py}" r="14" fill="#F6E3E1" stroke="{RED}" stroke-width="1.6"/><text x="{px}" y="{py+6}" text-anchor="middle" fill="{RED}" {fs(17)}>p</text>')
o.append(f'<circle cx="{nx}" cy="{ny}" r="14" fill="#E4ECF5" stroke="{INK}" stroke-width="1.6"/><text x="{nx}" y="{ny+6}" text-anchor="middle" fill="{INK}" {fs(17)}>n</text>')
o.append(f'<text x="{x1+168}" y="{py-14}" fill="{RED}" {fs(18)}><tspan font-style="italic">U</tspan><tspan {fs(13)} dy="4">p</tspan><tspan dy="-4">(</tspan><tspan font-style="italic">R</tspan><tspan {fs(13)} dy="4">p</tspan><tspan dy="-4">, </tspan><tspan font-style="italic">a</tspan><tspan {fs(13)} dy="4">p</tspan><tspan dy="-4">)</tspan></text>')
o.append(f'<text x="{x1+150}" y="{ny+36}" fill="{INK}" {fs(18)}><tspan font-style="italic">U</tspan><tspan {fs(13)} dy="4">n</tspan><tspan dy="-4">(</tspan><tspan font-style="italic">R</tspan><tspan {fs(13)} dy="4">n</tspan><tspan dy="-4">, </tspan><tspan font-style="italic">a</tspan><tspan {fs(13)} dy="4">n</tspan><tspan dy="-4">)</tspan></text>')
o.append(f'<text x="{x1+w1/2}" y="{Y0+H-14}" text-anchor="middle" fill="{TXT}" {fs(16)}>each nucleon potential has its own <tspan font-style="italic">R</tspan> and <tspan font-style="italic">a</tspan></text>')
# arrow between panels
o.append(f'<path d="M{x1+w1+6} 170 L{x1+w1+38} 170" stroke="{INK}" stroke-width="2.2" marker-end="url(#a14)"/>')
# ---- panel 2: coupling matrix
x2=x1+w1+46; w2=940-4-x2
panel(x2,w2,"one total-J block of the coupling matrix")
o.append(f'<text x="{x2+24}" y="{Y0+TH+34}" fill="{INK}" {fs(19)}><tspan font-style="italic">U</tspan><tspan {fs(13)} dy="5" font-style="italic">ij</tspan><tspan dy="-5">(</tspan><tspan font-style="italic">R</tspan><tspan>) = ⟨ bin </tspan><tspan font-style="italic">i</tspan><tspan> | </tspan><tspan font-style="italic" fill="{RED}">U</tspan><tspan {fs(13)} dy="4" fill="{RED}">p</tspan><tspan dy="-4"> + </tspan><tspan font-style="italic">U</tspan><tspan {fs(13)} dy="4">n</tspan><tspan dy="-4"> | bin </tspan><tspan font-style="italic">j</tspan><tspan> ⟩</tspan></text>')
gx,gy,cs,n=x2+24,Y0+TH+58,42,4
for i in range(n):
    for j in range(n):
        cx,cy=gx+j*(cs+4),gy+i*(cs+4)
        diag=(i==j); d=abs(i-j)
        o.append(f'<rect x="{cx}" y="{cy}" width="{cs}" height="{cs}" rx="4" fill="{"#E4ECF5" if diag else "#F4F6F9"}" stroke="{LINE}"/>')
        pts=[]
        for k in range(31):
            t=k/30; xx=cx+4+t*(cs-8)
            if diag: v=-1/(1+math.exp((t-0.55)/0.08))
            else:
                e=math.exp((t-0.6)/0.07); v=((-1)**(i+j))*e/(1+e)**2*4*(0.85**d)
            pts.append(f"{xx:.1f} {cy+cs/2-v*cs*0.38:.1f}")
        o.append(f'<path d="M'+" L".join(pts)+f'" fill="none" stroke="{INK}" stroke-width="1.5"/>')
o.append(f'<text x="{gx+n*(cs+4)+4}" y="{gy+2.5*(cs+4)+6}" fill="{TXT}" {fs(22)}>⋯</text>')
# right text
rx=gx+n*(cs+4)+42; ry=gy+14
lines=[(f'up to <tspan font-weight="700" fill="{INK}">151 channels</tspan> per block',"#2b2a27"),
       (f'one such block for every <tspan font-style="italic">J</tspan> ≤ 30',"#2b2a27"),
       ("each element: both potentials,","#2b2a27"),
       ("folded over the deuteron","#2b2a27")]
yy=ry
for k,(t,c) in enumerate(lines):
    o.append(f'<text x="{rx}" y="{yy}" fill="{c}" {fs(18)}>{t}</text>'); yy+=26 if k!=1 else 40
o.append(f'<line x1="{rx}" y1="{yy-8}" x2="{x2+w2-20}" y2="{yy-8}" stroke="{LINE}" stroke-dasharray="3 4"/>')
o.append(f'<text x="{rx}" y="{yy+22}" fill="{RED}" {fs(19)}>change <tspan font-style="italic">R</tspan> or <tspan font-style="italic">a</tspan>:</text>')
o.append(f'<text x="{rx}" y="{yy+48}" fill="{RED}" {fs(19)}><tspan font-weight="700">every element changes</tspan></text>')
o.append(f'<text x="{gx}" y="{Y0+H-14}" fill="{TXT}" {fs(15)}>diagonal: potential-like · off-diagonal: peaked at the surface (schematic)</text>')
o.append('</svg>')
print("\n".join(o))
