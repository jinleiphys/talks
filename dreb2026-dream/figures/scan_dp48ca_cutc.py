#!/usr/bin/env python3
"""Radial localization of 48Ca(d,p)49Ca(g.s.) at E_d = 10 MeV (deck from run_dp48ca.py).
Scan cutc (FRESCO: off-diagonal couplings removed inside this channel radius) and record the
integrated (d,p) cross section and dsigma/dOmega at the 15 deg forward peak. -d sigma/d cutc is
the contribution of each radius. Writes dp48ca_cutc.npz."""
import os, re, subprocess, tempfile, sys
import numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import run_dp48ca as R

HERE = os.path.dirname(os.path.abspath(__file__))
cuts = np.arange(0.0, 14.01, 0.5)
out = {"cut": cuts}
for code in ("kd02", "ch89"):
    tot, pk = [], []
    base = R.deck(code)
    for c in cuts:
        d = base.replace("absend=-1", f"absend=-1 cutc={c:.2f}")
        with tempfile.TemporaryDirectory() as t:
            open(t + "/in", "w").write(d)
            subprocess.run("fresco < in > out", shell=True, cwd=t, check=True)
            o = open(t + "/out").read()
            tot.append(float(re.findall(r"outgoing cross sections in partition 2 :\s*([\d.Ee+-]+)", o)[-1]))
            a = np.array([[float(v) for v in l.split()[:2]] for l in open(t + "/fort.202")
                          if l.strip() and l.split()[0][0] in "0123456789."])
            pk.append(np.interp(15.0, a[:, 0], a[:, 1]))
    out[code + "_tot"], out[code + "_pk"] = np.array(tot), np.array(pk)
    print(code, " ".join(f"{c:.1f}:{s:.1f}" for c, s in zip(cuts, tot)))
np.savez(os.path.join(HERE, "dp48ca_cutc.npz"), **out)
