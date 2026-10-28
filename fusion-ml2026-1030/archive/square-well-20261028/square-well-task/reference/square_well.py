# s-wave n-p scattering on an attractive square well: Numerov vs analytic.
# Reference solution for the live demo (offline backup). Needs only numpy.
# Run:  python3 demo/square_well.py
import math
from pathlib import Path

import numpy as np

HBARC = 197.3269804           # MeV fm
MN, MP = 939.56542, 938.27209  # MeV
B_D = 2.224575                 # deuteron binding energy, MeV
R = 2.0                        # well radius, fm


def depth(mu):
    """Well depth V0 that binds the deuteron at B_D: K cot(KR) = -kappa.

    The single s-wave bound state lies on the branch pi/2 < K R < pi, so bracket
    the root there (no cot pole inside) and check the sign change first.
    """
    kappa = math.sqrt(2 * mu * B_D) / HBARC

    def v_of(kr):
        return B_D + (HBARC * kr / R) ** 2 / (2 * mu)

    def f(v):
        k_in = math.sqrt(2 * mu * (v - B_D)) / HBARC
        return k_in / math.tan(k_in * R) + kappa

    lo, hi = v_of(math.pi / 2 + 1e-9), v_of(math.pi - 1e-9)
    assert f(lo) > 0 > f(hi), "no sign change on the single-bound-state branch"
    for _ in range(200):
        mid = (lo + hi) / 2
        if f(lo) * f(mid) <= 0:
            hi = mid
        else:
            lo = mid
    return (lo + hi) / 2


def delta_exact(e, v, mu):
    k = math.sqrt(2 * mu * e) / HBARC
    k_in = math.sqrt(2 * mu * (e + v)) / HBARC
    return math.atan(k / k_in * math.tan(k_in * R)) - k * R


def delta_numerov(e, v, mu, h=2e-4, rmax=10.0):
    k2 = 2 * mu * e / HBARC**2
    n = round(rmax / h)
    r = np.arange(n + 1) * h
    w = np.where(r < R, 2 * mu * (e + v) / HBARC**2, k2)
    c = 1 + h**2 * w / 12
    u = np.zeros(n + 1)
    u[1] = h
    for i in range(1, n):
        u[i + 1] = (2 * u[i] * (1 - 5 * h**2 * w[i] / 12) - u[i - 1] * c[i - 1]) / c[i + 1]
    k = math.sqrt(k2)
    r1, r2 = r[n - 1], r[n]
    # u = A sin(kr + delta): tan(delta) from the two outermost points
    t = (u[n - 1] * math.sin(k * r2) - u[n] * math.sin(k * r1)) / (
        u[n] * math.cos(k * r1) - u[n - 1] * math.cos(k * r2))
    return math.atan(t)


def wrap_deg(x):
    """Branch choice for this model and energy range: with one bound state, delta(0) = pi
    (Levinson) and delta falls monotonically below pi over 0-50 MeV, so mod pi picks the
    continuous branch here. Not a general substitute for tracking the branch."""
    return math.degrees(x % math.pi)


def a_scatt(v, mu):
    k_in = math.sqrt(2 * mu * v) / HBARC
    return R - math.tan(k_in * R) / k_in


mu_ok = MN * MP / (MN + MP)   # reduced mass
mu_bad = (MN + MP) / 2        # slip: hbar^2/2m with m = nucleon mass

V = depth(mu_ok)
Vb = depth(mu_bad)            # the slip carried through consistently: depth refit with the wrong mass
CHECK_E = (0.1, 1.0, 5.0, 10.0, 20.0, 50.0)

print(f"Configuration: E in center-of-mass MeV, lengths in fm, R = {R} fm")
print("Numerov: h = 0.0002 fm, rmax = 10.0 fm; six check energies listed below")
for label, mu, v in (("correct mass", mu_ok, V), ("bad mass", mu_bad, Vb)):
    k_in = math.sqrt(2 * mu * (v - B_D)) / HBARC
    kappa = math.sqrt(2 * mu * B_D) / HBARC
    print(f"Bound-state residual K*cot(KR)+kappa ({label}) = {k_in / math.tan(k_in * R) + kappa:.3e} fm^-1")
print(f"V0 (reduced mass) = {V:.3f} MeV")
print(f"a_t (reduced mass) = {a_scatt(V, mu_ok):.3f} fm")
print(f"V0 (nucleon mass) = {Vb:.3f} MeV")
print(f"a_t (nucleon mass) = {a_scatt(Vb, mu_bad):.3f} fm")
print()
print(" E(MeV)   d_numerov    d_exact    |diff|   d_badmass")
maxd = maxbad = 0.0
for e in CHECK_E:
    dn = wrap_deg(delta_numerov(e, V, mu_ok))
    de = wrap_deg(delta_exact(e, V, mu_ok))
    db = wrap_deg(delta_numerov(e, Vb, mu_bad))
    dbe = wrap_deg(delta_exact(e, Vb, mu_bad))
    maxd = max(maxd, abs(dn - de))
    maxbad = max(maxbad, abs(db - dbe))
    print(f"{e:6.1f}  {dn:10.4f} {de:10.4f}  {abs(dn - de):8.2g}  {db:10.4f}")
print(f"\nmax |numerov-exact| (correct mass) = {maxd:.2g} deg")
print(f"max |numerov-exact| (bad mass, same slip in both) = {maxbad:.2g} deg")

out = Path(__file__).with_name("phase_shift.csv")
with out.open("w") as f:
    f.write("E,num_ok,exact_ok,num_bad,exact_bad\n")
    for e in np.linspace(0.05, 50, 120):
        e = float(e)
        f.write(",".join(str(x) for x in (
            e,
            wrap_deg(delta_numerov(e, V, mu_ok)), wrap_deg(delta_exact(e, V, mu_ok)),
            wrap_deg(delta_numerov(e, Vb, mu_bad)), wrap_deg(delta_exact(e, Vb, mu_bad)))) + "\n")
print(f"wrote {out}")
