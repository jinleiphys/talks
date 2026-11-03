import math
INK="#1B365D"; RED="#b53333"; TXT="#4d4c48"; LINE="#c9d3df"
W,G,Y0,H,TH=148,22,10,158,36
xs=[2+i*(W+G) for i in range(4)]
o=[]
def fs(n): return f'style="font-size:{n}px"'
o.append(f'<svg viewBox="0 0 660 240" style="width: 100%; height: 11.2rem;" font-family="Newsreader, Georgia, serif">')
o.append(f'<defs><marker id="ar8" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="{INK}"/></marker>'
         f'<filter id="sh8" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#1B365D" flood-opacity="0.13"/></filter></defs>')
titles=["propose θ","solve","compare","accept/reject"]
subs=[["new parameters,","picked at random"],["one optical-model","calculation"],["σ(θ) against the","data gives χ²"],["keep the new θ","or the old one"]]
for i,x in enumerate(xs):
    o.append(f'<g filter="url(#sh8)"><rect x="{x}" y="{Y0}" width="{W}" height="{H}" rx="10" fill="#FFFFFF" stroke="{LINE}"/></g>')
    o.append(f'<path d="M{x} {Y0+TH} V{Y0+10} a10 10 0 0 1 10 -10 H{x+W-10} a10 10 0 0 1 10 10 V{Y0+TH} Z" fill="{INK}"/>')
    o.append(f'<circle cx="{x+18}" cy="{Y0+TH/2}" r="10" fill="#fff"/><text x="{x+18}" y="{Y0+TH/2+5}" text-anchor="middle" fill="{INK}" font-weight="700" {fs(14)}>{i+1}</text>')
    o.append(f'<text x="{x+W/2+12}" y="{Y0+TH/2+6}" text-anchor="middle" fill="#fff" {fs(17)}>{titles[i]}</text>')
    for k,l in enumerate(subs[i]):
        o.append(f'<text x="{x+W/2}" y="{Y0+H-26+k*17}" text-anchor="middle" fill="{TXT}" {fs(14.5)}>{l}</text>')
# icon area centre
cy=Y0+TH+38
# 1 dice
x=xs[0]+W/2; s=46
o.append(f'<rect x="{x-s/2}" y="{cy-s/2}" width="{s}" height="{s}" rx="9" fill="#E4ECF5" stroke="{INK}" stroke-width="1.6" transform="rotate(-10 {x} {cy})"/>')
for dx,dy in [(-12,-12),(12,-12),(0,0),(-12,12),(12,12)]:
    a=math.radians(-10); px=x+dx*math.cos(a)-dy*math.sin(a); py=cy+dx*math.sin(a)+dy*math.cos(a)
    o.append(f'<circle cx="{px:.1f}" cy="{py:.1f}" r="3.6" fill="{INK}"/>')
# 2 potential well (Woods-Saxon) with axis
x0=xs[1]+28; x1=xs[1]+W-22; top=cy-24; base=cy-14
o.append(f'<line x1="{x0}" y1="{base}" x2="{x1}" y2="{base}" stroke="#9aa6b5" stroke-width="1"/>')
pts=[]
for j in range(60):
    r=j/59; v=-1/(1+math.exp((r-0.42)/0.06))
    pts.append(f"{x0+r*(x1-x0):.1f} {base-v*44:.1f}")
o.append(f'<path d="M{x0} {base} L'+" L".join(pts)+f'" fill="none" stroke="{INK}" stroke-width="2.2"/>')
o.append(f'<text x="{x1+2}" y="{base+4}" fill="{TXT}" font-style="italic" {fs(13)}>r</text>')
o.append(f'<text x="{x0+62}" y="{base+40}" fill="{INK}" font-style="italic" {fs(14)}>V(r)</text>')
# 3 sigma vs data
x0=xs[2]+22; x1=xs[2]+W-20; yt=cy-26; yb=cy+24
g=lambda t: 0.10+0.85*math.exp(-2.6*t)*(0.75+0.25*math.cos(13*t))
ix=lambda t:x0+t*(x1-x0); iy=lambda v:yb-v*(yb-yt)
o.append(f'<path d="M'+" L".join(f"{ix(j/50):.1f} {iy(g(j/50)):.1f}" for j in range(51))+f'" fill="none" stroke="{INK}" stroke-width="2"/>')
off=[0.06,-0.08,0.07,-0.05,0.09,-0.06,0.05]
for k,t in enumerate([0.07,0.2,0.34,0.48,0.62,0.77,0.92]):
    v=g(t)*(1+off[k]); X=ix(t); Y=iy(v)
    o.append(f'<line x1="{X:.1f}" x2="{X:.1f}" y1="{Y-5:.1f}" y2="{Y+5:.1f}" stroke="{RED}" stroke-width="1.2"/><circle cx="{X:.1f}" cy="{Y:.1f}" r="2.8" fill="{RED}"/>')
# 4 check and cross
x=xs[3]+W/2
o.append(f'<circle cx="{x-24}" cy="{cy}" r="19" fill="#E4ECF5" stroke="{INK}" stroke-width="1.6"/><path d="M{x-33} {cy} l7 8 l13 -15" fill="none" stroke="{INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>')
o.append(f'<circle cx="{x+24}" cy="{cy}" r="19" fill="#F6E3E1" stroke="{RED}" stroke-width="1.6"/><path d="M{x+17} {cy-7} l14 14 M{x+31} {cy-7} l-14 14" stroke="{RED}" stroke-width="3" stroke-linecap="round"/>')
# arrows between cards
ay=Y0+H/2+8
for i in range(3):
    a=xs[i]+W+3; b=xs[i+1]-3
    o.append(f'<path d="M{a} {ay} L{b} {ay}" stroke="{INK}" stroke-width="2" marker-end="url(#ar8)"/>')
# loop back
xa=xs[3]+W/2; xb=xs[0]+W/2; yb0=Y0+H+3
o.append(f'<path d="M{xa} {yb0} C {xa} {yb0+34}, {xa-40} {yb0+34}, {xa-80} {yb0+34} L {xb+80} {yb0+34} C {xb+40} {yb0+34}, {xb} {yb0+34}, {xb} {yb0+6}" fill="none" stroke="{INK}" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#ar8)"/>')
o.append(f'<rect x="{330-72}" y="{yb0+22}" width="144" height="24" rx="12" fill="#F5F4ED"/>')
o.append(f'<text x="330" y="{yb0+39}" text-anchor="middle" fill="{INK}" font-style="italic" {fs(15)}>repeat many times</text>')
o.append(f'<text x="330" y="{yb0+66}" text-anchor="middle" fill="{RED}" {fs(16.5)}>each step is a random guess; it never uses the slope of χ²</text>')
o.append('</svg>')
print("\n".join(o))
