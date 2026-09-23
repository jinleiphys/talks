# QFS-RB 2026, Takayama

"How much of spectroscopic quenching belongs to the reaction model?"
Jin Lei, 30 minutes, invited. 25 slides, kami style.

## Run it

    npm install
    npx slidev slides.md --port 3033

`slides.md` carries no comments and no placeholders, by author instruction.
The visual baseline is locked in `style.css`: secondary text is 5.3:1 on the
parchment (the old `--stone` was 3.3:1 and vanished on a projector), the three
callout colours have a fixed meaning written into the file, tables use lining
tabular figures, and nothing renders below 0.84 rem.

## Figures

All three are built by script from production dumps, through the nature-figure
skill. Rebuild with `python make_*.py` inside `figures/`.

| script | output | data it reads |
|---|---|---|
| `make_kick_energy.py` | `kick-energy` | `kickE_p.dat`, `kickE_n.dat`, written by `impulse_kernel.jl` |
| `make_w_profiles.py` | `w-profiles` | `W_{p,n}_{a,b,wlh}.dat` from `d2_rho_eff.jl --dumpw`, plus `bound_*.dat` |
| `make_rs_trend.py` | `rs-trend` | `tg2021_points.dat`, plus the D3.1 f table inline |

`tg2021_points.dat` is 61 points read from the vector drawing operators of
Fig. 1 of Tostevin and Gade, Phys. Rev. C 103, 054610 (2021), calibrated on
that figure's own major ticks and validated against the two points the paper
prints numerically. Error bars are not extracted and must never be drawn.

## Known open items

1. `rs-trend`: the x axis label collides with the first caption line.
2. The chords are **40Si alone**, two channels. The six-system version needs
   D3.4, which is blocked on the 24Si and 12C inputs (see the project repo,
   devlog 23).
3. About ten files in the project repo still quote "GR23 published 38%", which
   is wrong; their published reduction is 62 to 69% (devlog 14c).

`archive/` holds the rejected first version, kept for reference only.
