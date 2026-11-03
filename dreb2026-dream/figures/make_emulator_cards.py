import math
INK="#1B365D"; TXT="#4d4c48"; LINE="#c9d3df"; CHIP="#E4ECF5"
o=[]
def fs(n): return f'style="font-size:{n}px"'
o.append('<svg viewBox="0 0 600 250" style="width: 100%; height: 12.4rem;" font-family="Newsreader, Georgia, serif">')
o.append(f'<defs><marker id="ar9" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="{INK}"/></marker>'
         f'<filter id="sh9" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#1B365D" flood-opacity="0.13"/></filter></defs>')
Y0,H,TH=6,236,36
def card(x,w,title):
    o.append(f'<g filter="url(#sh9)"><rect x="{x}" y="{Y0}" width="{w}" height="{H}" rx="10" fill="#fff" stroke="{LINE}"/></g>')
    o.append(f'<path d="M{x} {Y0+TH} V{Y0+10} a10 10 0 0 1 10 -10 H{x+w-10} a10 10 0 0 1 10 10 V{Y0+TH} Z" fill="{INK}"/>')
    o.append(f'<text x="{x+w/2}" y="{Y0+TH/2+6}" text-anchor="middle" fill="#fff" {fs(18)}>{title}</text>')
def wave(x0,x1,yc,amp,k,ph,damp=0.0,n=120):
    pts=[]
    for j in range(n+1):
        t=j/n; r=t*(x1-x0)
        y=yc-amp*math.sin(k*t+ph)*(1-damp*math.exp(-6*t))
        pts.append((x0+r,y))
    return pts
def path(pts,w=2,op=1):
    return f'<path d="M'+" L".join(f"{x:.1f} {y:.1f}" for x,y in pts)+f'" fill="none" stroke="{INK}" stroke-width="{w}" stroke-opacity="{op}"/>'
# card A: full solve
ax,aw=2,226
card(ax,aw,"full solve")
pts=wave(ax+18,ax+aw-18,118,30,6*math.pi,0,0.9,240)
o.append(path(pts,1.2,0.35))
for j in range(0,241,6):
    x,y=pts[j]; o.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="2.2" fill="{INK}"/>')
o.append(f'<text x="{ax+aw/2}" y="{Y0+H-40}" text-anchor="middle" fill="{TXT}" {fs(16)}>values at N mesh points</text>')
o.append(f'<text x="{ax+aw/2}" y="{Y0+H-16}" text-anchor="middle" fill="{TXT}" {fs(16)}>N: thousands</text>')
# arrow
o.append(f'<path d="M{ax+aw+6} 124 L{ax+aw+48} 124" stroke="{INK}" stroke-width="2.2" marker-end="url(#ar9)"/>')
# card B: emulator
bx,bw=284,314
card(bx,bw,"emulator")
rows=[(62,4.2*math.pi,0.2),(98,6*math.pi,1.0),(134,8*math.pi,2.1)]
for i,(yc,k,ph) in enumerate(rows):
    cx=bx+44
    if i>0: o.append(f'<text x="{bx+18}" y="{yc+6}" text-anchor="middle" fill="{INK}" {fs(20)}>+</text>')
    o.append(f'<rect x="{cx-14}" y="{yc-13}" width="40" height="26" rx="13" fill="{CHIP}" stroke="{INK}" stroke-width="1.3"/>')
    o.append(f'<text x="{cx+6}" y="{yc+6}" text-anchor="middle" fill="{INK}" font-style="italic" {fs(18)}>c<tspan {fs(12)} dy="4">{i+1}</tspan></text>')
    o.append(f'<text x="{cx+36}" y="{yc+5}" text-anchor="middle" fill="{TXT}" {fs(15)}>×</text>')
    o.append(path(wave(cx+48,bx+bw-20,yc,11,k,ph,0.8),2))
o.append(f'<text x="{bx+18}" y="{166}" text-anchor="middle" fill="{INK}" {fs(20)}>+</text><text x="{bx+44+6}" y="{166}" text-anchor="middle" fill="{INK}" {fs(20)}>…</text>')
o.append(f'<text x="{bx+bw/2}" y="{Y0+H-40}" text-anchor="middle" fill="{TXT}" {fs(16)}>n stored solutions, n ≈ 10</text>')
o.append(f'<text x="{bx+bw/2}" y="{Y0+H-16}" text-anchor="middle" fill="{TXT}" {fs(16)}>new potential: only the weights <tspan font-style="italic">c</tspan></text>')
o.append('</svg>')
print("\n".join(o))
