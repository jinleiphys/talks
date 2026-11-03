import math
INK="#1B365D"; RED="#b53333"; TXT="#4d4c48"; LINE="#c9d3df"
o=[]
def fs(n): return f'style="font-size:{n}px"'
def ws(r,V,R,a): return -V/(1+math.exp((r-R)/a))
o.append('<svg viewBox="0 0 940 322" style="width: 100%; height: 19rem;" font-family="Newsreader, Georgia, serif">')
o.append(f'<defs><filter id="sh10" x="-5%" y="-5%" width="110%" height="115%"><feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#1B365D" flood-opacity="0.13"/></filter>'
         f'<marker id="a10r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="{RED}"/></marker></defs>')
W,H,Y0,TH=458,314,4,42
def panel(x,col,title):
    o.append(f'<g filter="url(#sh10)"><rect x="{x}" y="{Y0}" width="{W}" height="{H}" rx="12" fill="#fff" stroke="{LINE}"/></g>')
    o.append(f'<path d="M{x} {Y0+TH} V{Y0+12} a12 12 0 0 1 12 -12 H{x+W-12} a12 12 0 0 1 12 12 V{Y0+TH} Z" fill="{col}"/>')
    o.append(f'<text x="{x+W/2}" y="{Y0+28}" text-anchor="middle" fill="#fff" {fs(21)}>{title}</text>')
def curve(x0,y0,w,h,V,R,a,col,sw=2.4,Vmax=60):
    pts=[]
    for j in range(121):
        r=10*j/120; pts.append(f"{x0+r*w/10:.1f} {y0-ws(r,V,R,a)/Vmax*h:.1f}")
    return f'<path d="M'+" L".join(pts)+f'" fill="none" stroke="{col}" stroke-width="{sw}"/>'
def eqrow(x,col,shape_curves,shape_label):
    cy=118
    o.append(f'<text x="{x+26}" y="{cy+8}" fill="{INK}" font-style="italic" {fs(26)}>U</text><text x="{x+44}" y="{cy+8}" fill="{INK}" {fs(26)}>(<tspan font-style="italic">r</tspan>) =</text>')
    o.append(f'<rect x="{x+112}" y="{cy-20}" width="40" height="40" rx="20" fill="#E4ECF5" stroke="{INK}" stroke-width="1.5"/><text x="{x+132}" y="{cy+8}" text-anchor="middle" fill="{INK}" font-style="italic" {fs(24)}>V</text>')
    o.append(f'<text x="{x+168}" y="{cy+8}" text-anchor="middle" fill="{TXT}" {fs(24)}>×</text>')
    bx,by,bw,bh=x+188,cy-44,240,88
    o.append(f'<rect x="{bx}" y="{by}" width="{bw}" height="{bh}" rx="8" fill="#FBFAF6" stroke="{col}" stroke-width="1.5" stroke-dasharray="{"none" if col==INK else "5 4"}"/>')
    o.append(f'<line x1="{bx+14}" y1="{by+16}" x2="{bx+bw-12}" y2="{by+16}" stroke="#b9c2cc" stroke-width="1"/>')
    for (R,c) in shape_curves: o.append(curve(bx+14,by+16,bw-26,62,60,R,0.6,c))
    o.append(f'<text x="{bx+bw/2}" y="{by+bh+24}" text-anchor="middle" fill="{col}" {fs(18)}>{shape_label}</text>')
# panel A
xa=4; panel(xa,INK,"affine: depth  V  only multiplies")
eqrow(xa,INK,[(5,INK)],"one fixed shape")
o.append(f'<line x1="{xa+24}" y1="196" x2="{xa+W-24}" y2="196" stroke="{LINE}" stroke-dasharray="3 4"/>')
# small matrix icon
mx,my,c=xa+40,222,15
for i in range(4):
    for j in range(4):
        o.append(f'<rect x="{mx+j*c}" y="{my+i*c}" width="{c-2}" height="{c-2}" rx="2" fill="{INK}" fill-opacity="{0.25+0.18*((i+j)%3)}"/>')
o.append(f'<text x="{mx+30}" y="{my+84}" text-anchor="middle" fill="{TXT}" {fs(15)}>n × n</text>')
o.append(f'<text x="{xa+130}" y="{my+20}" fill="#2b2a27" {fs(19)}>project the shape on the stored</text>')
o.append(f'<text x="{xa+130}" y="{my+44}" fill="#2b2a27" {fs(19)}>solutions <tspan font-weight="700" fill="{INK}">once</tspan>, offline</text>')
o.append(f'<text x="{xa+130}" y="{my+72}" fill="{INK}" {fs(19)}>new V: rescale a small matrix</text>')
# panel B
xb=478; panel(xb,RED,"non-affine: radius  R,  diffuseness  a  reshape")
eqrow(xb,RED,[(4,"#E2A39D"),(5,"#C96A61"),(6,RED)],"shape changes with R and a")
o.append(f'<line x1="{xb+24}" y1="196" x2="{xb+W-24}" y2="196" stroke="{LINE}" stroke-dasharray="3 4"/>')
# dense mesh icon + loop arrow
gx,gy=xb+30,220
for i in range(6):
    for j in range(16):
        o.append(f'<circle cx="{gx+j*5.2:.1f}" cy="{gy+i*9}" r="1.7" fill="{RED}" fill-opacity="0.75"/>')
o.append(f'<text x="{gx+42}" y="{gy+84}" text-anchor="middle" fill="{TXT}" {fs(15)}>N mesh points</text>')
o.append(f'<text x="{xb+138}" y="{my+20}" fill="#2b2a27" {fs(19)}>every new R or a: rebuild on</text>')
o.append(f'<text x="{xb+138}" y="{my+44}" fill="#2b2a27" {fs(19)}>the full mesh, project again</text>')
o.append(f'<text x="{xb+138}" y="{my+72}" fill="{RED}" {fs(19)}>the <tspan font-weight="700">main online cost</tspan></text>')
o.append('</svg>')
print("\n".join(o))
