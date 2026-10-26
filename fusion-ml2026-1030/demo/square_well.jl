# s-wave n-p scattering on an attractive square well: Numerov vs analytic.
# Reference solution for the live demo (offline backup).
const hbarc = 197.3269804          # MeV fm
const mn, mp = 939.56542, 938.27209 # MeV
const B_d = 2.224575                # deuteron binding energy, MeV
const R = 2.0                       # well radius, fm

# depth that binds the deuteron at B_d:  K cot(KR) = -kappa
function depth(mu)
    f(V) = (K = sqrt(2mu*(V - B_d))/hbarc; κ = sqrt(2mu*B_d)/hbarc; K*cot(K*R) + κ)
    lo, hi = 20.0, 60.0
    for _ in 1:200; mid = (lo+hi)/2; f(lo)*f(mid) <= 0 ? (hi = mid) : (lo = mid); end
    (lo+hi)/2
end

delta_exact(E, V, mu) = (k = sqrt(2mu*E)/hbarc; K = sqrt(2mu*(E+V))/hbarc; atan(k/K*tan(K*R)) - k*R)

function delta_numerov(E, V, mu; h=2e-4, rmax=10.0)
    k2 = 2mu*E/hbarc^2
    w(r) = r < R ? 2mu*(E + V)/hbarc^2 : k2
    n = round(Int, rmax/h); u = zeros(n+1); u[2] = h
    for i in 2:n
        r0, r1, r2 = (i-2)*h, (i-1)*h, i*h
        u[i+1] = (2u[i]*(1 - 5h^2*w(r1)/12) - u[i-1]*(1 + h^2*w(r0)/12)) / (1 + h^2*w(r2)/12)
    end
    k = sqrt(k2); r1, r2 = (n-1)*h, n*h
    # u = A sin(kr+δ): tan δ from two outer points
    t = (u[n]*sin(k*r2) - u[n+1]*sin(k*r1)) / (u[n+1]*cos(k*r1) - u[n]*cos(k*r2))
    atan(t)
end

wrap(x) = mod(x, π)   # one bound state: Levinson, δ(0) = π, so δ lives in [0, π)
a_scatt(V, mu) = (K = sqrt(2mu*V)/hbarc; R - tan(K*R)/K)

mu_ok  = mn*mp/(mn+mp)        # reduced mass
mu_bad = (mn+mp)/2            # "nucleon mass" slip: hbar^2/2m with m = m_N

V = depth(mu_ok)
Vb = depth(mu_bad)   # the slip carried through consistently: depth refit with the wrong mass
println("Configuration: E in center-of-mass MeV, lengths in fm, R = ", R, " fm")
println("Numerov: h = 0.0002 fm, rmax = 10.0 fm; six check energies listed below")
for (label, mu, v) in (("correct mass", mu_ok, V), ("bad mass", mu_bad, Vb))
    K = sqrt(2mu*(v - B_d))/hbarc
    kappa = sqrt(2mu*B_d)/hbarc
    println("Bound-state residual K*cot(KR)+kappa (", label, ") = ",
            K*cot(K*R) + kappa, " fm^-1")
end
println("V0 (reduced mass) = ", round(V, digits=3), " MeV")
println("a_t (reduced mass) = ", round(a_scatt(V, mu_ok), digits=3), " fm")
println("V0 (nucleon mass) = ", round(Vb, digits=3), " MeV")
println("a_t (nucleon mass) = ", round(a_scatt(Vb, mu_bad), digits=3), " fm")
println()
println(" E(MeV)   δ_numerov   δ_exact   |diff|    δ_badmass")
maxd = 0.0
for E in (0.1, 1.0, 5.0, 10.0, 20.0, 50.0)
    dn = rad2deg(wrap(delta_numerov(E, V, mu_ok))); de = rad2deg(wrap(delta_exact(E, V, mu_ok)))
    db = rad2deg(wrap(delta_numerov(E, Vb, mu_bad)))
    global maxd = max(maxd, abs(dn-de))
    println(lpad(E,6), "  ", lpad(round(dn,digits=4),9), "  ", lpad(round(de,digits=4),9), "  ",
            lpad(round(abs(dn-de),sigdigits=2),7), "  ", lpad(round(db,digits=4),9))
end
# the bad-mass run checked against an analytic formula written with the same bad mass
dbad = maximum(abs(rad2deg(wrap(delta_numerov(E,Vb,mu_bad))) - rad2deg(wrap(delta_exact(E,Vb,mu_bad)))) for E in (0.1,1.0,5.0,10.0,20.0,50.0))
println("\nmax |numerov-exact| (correct mass) = ", round(maxd, sigdigits=2), " deg")
println("max |numerov-exact| (bad mass, same slip in both) = ", round(dbad, sigdigits=2), " deg")
open(joinpath(@__DIR__, "phase_shift.csv"), "w") do io
    println(io, "E,num_ok,exact_ok,num_bad,exact_bad")
    for E in range(0.05, 50, length=120)
        println(io, join((E, rad2deg(wrap(delta_numerov(E,V,mu_ok))), rad2deg(wrap(delta_exact(E,V,mu_ok))),
                          rad2deg(wrap(delta_numerov(E,Vb,mu_bad))), rad2deg(wrap(delta_exact(E,Vb,mu_bad)))), ","))
    end
end
