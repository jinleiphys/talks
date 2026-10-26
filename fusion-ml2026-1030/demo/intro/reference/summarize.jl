# Classroom reference: process an existing table, no physics solver required.
using DelimitedFiles, Printf
input = length(ARGS) >= 1 ? ARGS[1] : "data/input.csv"
outdir = length(ARGS) >= 2 ? ARGS[2] : "results"
data, header = readdlm(input, ',', Float64; header=true)
vec(header) == ["E_MeV", "calc_deg", "ref_deg"] || error("Unexpected column names")
size(data, 2) == 3 && size(data, 1) > 0 || error("Expected a nonempty three-column table")
all(isfinite, data) || error("Non-finite values found")
diff = abs.(data[:, 2] .- data[:, 3])
imax = argmax(diff)
mkpath(outdir)
tables = [("comparison.csv", collect(axes(data, 1)))]
if length(ARGS) >= 3
    threshold = parse(Float64, ARGS[3])
    push!(tables, ("high_energy.csv", findall(data[:, 1] .>= threshold)))
end
for (filename, rows) in tables
    open(joinpath(outdir, filename), "w") do io
        println(io, "E_MeV,calc_deg,ref_deg,abs_diff_deg")
        for i in rows
            @printf(io, "%.1f,%.4f,%.4f,%.4f\n", data[i, 1], data[i, 2], data[i, 3], diff[i])
        end
    end
end
open(joinpath(outdir, "summary.txt"), "w") do io
    println(io, "Input: ", input)
    println(io, "Rows: ", size(data, 1))
    @printf(io, "Max absolute difference: %.4f deg at E = %.1f MeV\n", diff[imax], data[imax, 1])
    println(io, "Scope: these input rows only; not a model-validity claim.")
end
print(read(joinpath(outdir, "summary.txt"), String))
