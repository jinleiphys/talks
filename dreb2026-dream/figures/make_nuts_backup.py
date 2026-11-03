# Backup-slide schematic: one real NUTS trajectory on a curved 2D valley.
# U~(x,y) = (y - B x^2)^2 / (2 s1^2) + x^2 / (2 s2^2); leapfrog; doubling with a fixed
# direction sequence; stop at the first U-turn (either end's momentum points back).
import numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt, sys
B,s1,s2=0.9,0.18,0.75
def U(q): x,y=q; return (y-B*x*x)**2/(2*s1*s1)+x*x/(2*s2*s2)
def gU(q):
    x,y=q; r=(y-B*x*x)/(s1*s1)
    return np.array([r*(-2*B*x)+x/(s2*s2), r])
def leap(q,p,eps):
    p=p-0.5*eps*gU(q); q=q+eps*p; p=p-0.5*eps*gU(q); return q,p
seed=int(sys.argv[1]); dirs=[int(c) for c in sys.argv[2]]; eps=float(sys.argv[3])
rng=np.random.default_rng(seed)
q0=np.array([-0.9,B*0.81+0.05]); p0=rng.normal(size=2)
fwd=[(q0,p0)]; bwd=[(q0,p0)]
stop_at=None; sizes=[]
for k,d in enumerate(dirs):
    n=2**k
    for _ in range(n):
        if d>0: q,p=leap(*fwd[-1],eps); fwd.append((q,p))
        else:
            q,p=leap(bwd[-1][0],-bwd[-1][1],eps); bwd.append((q,-p))
    sizes.append((n,d))
    qm,pm=bwd[-1]; qp,pp=fwd[-1]; dq=qp-qm
    if dq@pm<0 or dq@pp<0: stop_at=k; break
path=[x for x in bwd[::-1]]+fwd[1:]
H=np.array([U(q)+0.5*p@p for q,p in path])
w=np.exp(-(H-H.min())); w/=w.sum()
pick=rng.choice(len(path),p=w)
print("stop after doubling",stop_at,"sizes",sizes,"len",len(path),"pick",pick,"H spread",H.max()-H.min())
# contours
xs=np.linspace(-3.5,3.5,600); ys=np.linspace(-1.5,12,800); X,Y=np.meshgrid(xs,ys)
Z=(Y-B*X*X)**2/(2*s1*s1)+X*X/(2*s2*s2)
cs=plt.contour(X,Y,Z,levels=[0.5,2,4.5])
# svg mapping
W,Hh=520,360; x0,x1,y0,y1=-2.2,2.2,-0.4,3.1
sx=lambda x:20+(x-x0)/(x1-x0)*(W-40); sy=lambda y:Hh-20-(y-y0)/(y1-y0)*(Hh-40)
o=[f'<svg viewBox="0 0 {W} {Hh}" style="width: 100%; height: 100%;" font-family="Newsreader, Georgia, serif">']
o.append('<defs><marker id="nA" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#1B365D"/></marker><marker id="nR" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#b53333"/></marker></defs>')
cols=["#9DB2CB","#BCCCDE","#DCE5EF"]
o.append(f'<defs><clipPath id="nC"><rect x="20" y="20" width="{W-40}" height="{Hh-40}"/></clipPath></defs><rect x="20" y="20" width="{W-40}" height="{Hh-40}" fill="#FBFAF6" stroke="#cfccc2"/><g clip-path="url(#nC)">')
for i in range(len(cs.allsegs)-1,-1,-1):
    for s in cs.allsegs[i]:
        d="M"+" L".join(f"{sx(a):.1f} {sy(b):.1f}" for a,b in s[::3])+" Z"
        o.append(f'<path d="{d}" fill="{cols[i]}" stroke="#7F96B2" stroke-width="0.7" stroke-opacity="0.6"/>')
o.append('</g>')
qs=np.array([q for q,_ in path])
o.append('<path d="M'+" L".join(f"{sx(a):.1f} {sy(b):.1f}" for a,b in qs)+'" fill="none" stroke="#1B365D" stroke-width="2"/>')
for j,(a,b) in enumerate(qs):
    o.append(f'<circle cx="{sx(a):.1f}" cy="{sy(b):.1f}" r="3" fill="#1B365D"/>')
# start
o.append(f'<circle cx="{sx(q0[0]):.1f}" cy="{sy(q0[1]):.1f}" r="7" fill="#fff" stroke="#1B365D" stroke-width="2"/>')
o.append(f'<text x="{sx(q0[0])-14:.1f}" y="{sy(q0[1])+6:.1f}" text-anchor="end" fill="#1B365D" style="font-size:16px">start</text>')
# end velocity arrows
qm,pm=bwd[-1]; qp_,pp_=fwd[-1]; dq=qp_-qm
ends=[(qm,-pm,dq@pm<0),(qp_,pp_,dq@pp_<0)]   # growth direction at each end; True = turned back
for q,g,turned in ends:
    v=g/np.linalg.norm(g)*0.5
    o.append(f'<line x1="{sx(q[0]):.1f}" y1="{sy(q[1]):.1f}" x2="{sx(q[0]+v[0]):.1f}" y2="{sy(q[1]+v[1]):.1f}" stroke="#b53333" stroke-width="2.4" marker-end="url(#nR)"/>')
    o.append(f'<circle cx="{sx(q[0]):.1f}" cy="{sy(q[1]):.1f}" r="5" fill="#b53333"/>')
    lab="turns back: stop" if turned else "still growing"
    o.append(f'<text x="{sx(q[0]):.1f}" y="{sy(q[1])-16:.1f}" text-anchor="middle" fill="#b53333" style="font-size:15px">{lab}</text>')
# pick
qp=qs[pick]
o.append(f'<circle cx="{sx(qp[0]):.1f}" cy="{sy(qp[1]):.1f}" r="9" fill="none" stroke="#b07d10" stroke-width="2.6"/>')
o.append(f'<text x="{sx(qp[0])+18:.1f}" y="{sy(qp[1])+22:.1f}" text-anchor="start" fill="#b07d10" style="font-size:16px">next sample</text>')
o.append('</svg>')
open(sys.argv[4],"w").write("\n".join(o))
import json; json.dump({"fwd_end":fwd[-1][0].tolist(),"bwd_end":bwd[-1][0].tolist(),"pick":qp.tolist(),"stop":stop_at,"sizes":sizes},open(sys.argv[4]+".json","w"))
