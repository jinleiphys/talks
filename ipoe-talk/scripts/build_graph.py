#!/usr/bin/env python3
"""
build_graph.py — scan the research-wiki Obsidian vault and emit a single
self-contained interactive graph webpage (graph.html).

- Nodes  = markdown notes (path without .md)
- Edges  = [[wikilinks]] between notes (resolves full-path, ../relative and
           bare-basename forms; skips links that point outside the vault)
- Node size = link degree; color = top-level folder.

The force-graph UMD bundle is downloaded once and inlined, so graph.html is
fully offline and works by double-click (file://). If the download fails it
falls back to a CDN <script> tag.

Reads the ~/research-wiki vault (read-only) and writes into this talk only;
nothing is created inside the wiki repo.

Usage:  python3 scripts/build_graph.py     (run from the ipoe-talk dir)
Output: public/graph.html  (served at the talk's base path).
"""

import json
import re
import sys
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent          # ipoe-talk/scripts
TALK = HERE.parent                              # ipoe-talk
VAULT = Path.home() / "research-wiki"           # source vault (read-only)
OUT = TALK / "public" / "graph.html"            # served at the talk base path
LIB_CACHE = HERE / ".force-graph.min.js"
LIB_URL = "https://unpkg.com/force-graph/dist/force-graph.min.js"

SKIP_DIRS = {".obsidian", ".git", "scripts", "raw"}
LINK_RE = re.compile(r"\[\[([^\]]+)\]\]")

# top-level folder -> color (clean, distinct, restrained)
DIR_COLORS = {
    "sources":    "#2D5A8A",   # steel blue
    "entities":   "#c87f33",   # warm ochre
    "systems":    "#4a6b3a",   # moss green
    "methods":    "#7a5ba6",   # muted purple
    "observables":"#2f8f8f",   # teal
    "synthesis":  "#b53333",   # warm red
    "debates":    "#c9a227",   # gold
}
DEFAULT_COLOR = "#8a8a82"


def collect_notes():
    """Return list of vault-relative ids (path without .md)."""
    notes = []
    for p in VAULT.rglob("*.md"):
        rel = p.relative_to(VAULT)
        if rel.parts and rel.parts[0] in SKIP_DIRS:
            continue
        notes.append(rel.with_suffix("").as_posix())
    return sorted(notes)


def first_excerpt(path: Path, limit=220):
    """First meaningful prose line, skipping YAML frontmatter and headings."""
    try:
        text = path.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        return ""
    lines = text.splitlines()
    i = 0
    if lines and lines[0].strip() == "---":          # skip frontmatter
        i = 1
        while i < len(lines) and lines[i].strip() != "---":
            i += 1
        i += 1
    for ln in lines[i:]:
        s = ln.strip()
        if not s or s.startswith("#") or s.startswith("!["):
            continue
        s = re.sub(r"[*_`>]", "", s)
        s = re.sub(r"\[\[([^\]|]*\|)?([^\]]+)\]\]", r"\2", s)
        return s[:limit]
    return ""


def build():
    ids = collect_notes()
    idset = set(ids)
    # basename -> list of ids, for bare-link resolution
    by_base = {}
    for nid in ids:
        by_base.setdefault(nid.rsplit("/", 1)[-1], []).append(nid)

    def resolve(link, src_id):
        target = link.split("|")[0].split("#")[0].strip()
        if not target:
            return None
        if target.startswith("/"):          # absolute path -> outside this vault
            return None
        # 1) ../relative to the source file's folder
        if target.startswith("../") or target.startswith("./"):
            base = Path(src_id).parent
            cand = (base / target).as_posix()
            cand = Path(cand).as_posix().replace("/./", "/")
            # normalize .. segments
            parts = []
            for seg in cand.split("/"):
                if seg == "..":
                    if parts:
                        parts.pop()
                elif seg not in ("", "."):
                    parts.append(seg)
            cand = "/".join(parts)
            if cand in idset:
                return cand
            return by_base.get(cand.rsplit("/", 1)[-1], [None])[0]
        # 2) full vault-relative path
        if target in idset:
            return target
        # 3) bare basename (or partial path tail)
        hits = by_base.get(target.rsplit("/", 1)[-1])
        if hits:
            if len(hits) == 1:
                return hits[0]
            # ambiguous: prefer same top-level folder as source
            top = src_id.split("/", 1)[0]
            same = [h for h in hits if h.split("/", 1)[0] == top]
            return (same or hits)[0]
        return None

    deg = {nid: 0 for nid in ids}
    edges = set()
    for nid in ids:
        p = VAULT / (nid + ".md")
        try:
            text = p.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        for m in LINK_RE.finditer(text):
            tgt = resolve(m.group(1), nid)
            if tgt and tgt != nid:
                a, b = sorted((nid, tgt))
                if (a, b) not in edges:
                    edges.add((a, b))
                    deg[a] += 1
                    deg[b] += 1

    nodes = []
    for nid in ids:
        top = nid.split("/", 1)[0] if "/" in nid else ""
        nodes.append({
            "id": nid,
            "name": nid.rsplit("/", 1)[-1],
            "dir": top,
            "deg": deg[nid],
            "color": DIR_COLORS.get(top, DEFAULT_COLOR),
            "desc": first_excerpt(VAULT / (nid + ".md")),
        })
    links = [{"source": a, "target": b} for a, b in sorted(edges)]
    return nodes, links


def get_lib():
    if LIB_CACHE.exists():
        return LIB_CACHE.read_text(encoding="utf-8"), True
    try:
        print(f"downloading {LIB_URL} ...")
        data = urllib.request.urlopen(LIB_URL, timeout=30).read().decode("utf-8")
        LIB_CACHE.write_text(data, encoding="utf-8")
        return data, True
    except Exception as e:
        print(f"  download failed ({e}); HTML will load the lib from CDN instead.")
        return None, False


def write_html(nodes, links, lib, have_lib):
    data_js = json.dumps({"nodes": nodes, "links": links},
                         ensure_ascii=False, separators=(",", ":"))
    lib_block = (f"<script>{lib}</script>" if have_lib
                 else f'<script src="{LIB_URL}"></script>')
    legend = "".join(
        f'<span class="lg"><i style="background:{c}"></i>{d}</span>'
        for d, c in DIR_COLORS.items())
    html = f"""<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>research-wiki · 关系图谱</title>
<style>
  :root {{ --bg:#f5f4ed; --panel:#faf9f5; --ink:#1B365D; --text:#141413; --mut:#5e5d59; --line:#e0ddd2; }}
  * {{ box-sizing:border-box; }}
  html,body {{ margin:0; height:100%; background:var(--bg); color:var(--text);
    font-family:"Inter","Newsreader","PingFang SC","Microsoft YaHei",sans-serif; }}
  #graph {{ position:fixed; inset:0; }}
  #hud {{ position:fixed; top:14px; left:14px; z-index:5; background:var(--panel);
    border:1px solid var(--line); border-radius:6px; padding:10px 12px; width:300px;
    box-shadow:0 0 0 1px #d1cfc5; }}
  #hud h1 {{ font:600 14px/1.2 "Newsreader",serif; margin:0 0 8px; color:var(--ink); }}
  #q {{ width:100%; padding:6px 8px; border:1px solid var(--line); border-radius:4px;
    font-size:13px; background:#fff; color:var(--text); }}
  #stat {{ font-size:11px; color:var(--mut); margin-top:6px; }}
  #legend {{ display:flex; flex-wrap:wrap; gap:6px 10px; margin-top:8px; }}
  .lg {{ font-size:11px; color:var(--mut); display:flex; align-items:center; gap:4px; }}
  .lg i {{ width:9px; height:9px; border-radius:50%; display:inline-block; }}
  #info {{ position:fixed; bottom:14px; left:14px; z-index:5; width:340px; max-height:42vh;
    overflow:auto; background:var(--panel); border:1px solid var(--line); border-left:3px solid var(--ink);
    border-radius:4px; padding:12px 14px; box-shadow:0 0 0 1px #d1cfc5; display:none; }}
  #info .t {{ font:600 14px/1.3 "Newsreader",serif; color:var(--ink); word-break:break-all; }}
  #info .p {{ font-size:11px; color:var(--mut); margin:3px 0 8px; word-break:break-all; }}
  #info .d {{ font-size:12.5px; line-height:1.5; color:var(--text); }}
  #info .nb {{ font-size:11px; color:var(--mut); margin-top:8px; }}
  #info a {{ color:var(--ink); }}
  #info .x {{ float:right; cursor:pointer; color:var(--mut); font-size:16px; line-height:1; }}
</style>
</head>
<body>
<div id="graph"></div>
<div id="hud">
  <h1>research-wiki · 关系图谱</h1>
  <input id="q" placeholder="搜索节点 (标题关键词)…" autocomplete="off">
  <div id="stat"></div>
  <div id="legend">{legend}</div>
</div>
<div id="info"></div>
{lib_block}
<script>
const DATA = {data_js};
const elInfo = document.getElementById('info');
const elStat = document.getElementById('stat');
elStat.textContent = DATA.nodes.length + ' 节点 · ' + DATA.links.length + ' 连接';

const adj = new Map();
DATA.nodes.forEach(n => adj.set(n.id, new Set()));
DATA.links.forEach(l => {{
  const s = l.source.id || l.source, t = l.target.id || l.target;
  adj.get(s) && adj.get(s).add(t);
  adj.get(t) && adj.get(t).add(s);
}});

let sel = null, hl = new Set(), q = '';
const sized = n => Math.max(1.2, Math.sqrt((n.deg||0)+1)*1.4);

const G = ForceGraph()(document.getElementById('graph'))
  .graphData(DATA)
  .backgroundColor('#f5f4ed')
  .nodeId('id')
  .nodeRelSize(3)
  .nodeVal(sized)
  .linkColor(() => 'rgba(120,118,110,0.20)')
  .linkWidth(l => (sel && (hl.has((l.source.id||l.source)) && hl.has((l.target.id||l.target)))) ? 1.4 : 0.4)
  .nodeCanvasObjectMode(() => 'after')
  .nodeColor(n => {{
    if (q) return n.name.toLowerCase().includes(q) ? n.color : 'rgba(160,160,150,0.18)';
    if (sel) return (n.id===sel || hl.has(n.id)) ? n.color : 'rgba(160,160,150,0.15)';
    return n.color;
  }})
  .nodeCanvasObject((n, ctx, scale) => {{
    const r = sized(n);
    const big = (n.deg||0) >= 12;
    const active = (sel && (n.id===sel || hl.has(n.id))) || (q && n.name.toLowerCase().includes(q));
    if ((big || active || scale > 3) ) {{
      const fs = Math.min(5, 10/scale);
      ctx.font = `${{fs}}px Inter, sans-serif`;
      ctx.fillStyle = active ? '#141413' : 'rgba(40,40,38,0.55)';
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillText(n.name, n.x + r + 1, n.y);
    }}
  }})
  .onNodeClick(n => {{ select(n); G.centerAt(n.x, n.y, 600); G.zoom(4, 600); }})
  .onBackgroundClick(() => {{ sel=null; hl=new Set(); elInfo.style.display='none'; }});

function select(n) {{
  sel = n.id; hl = adj.get(n.id) || new Set();
  const nbrs = [...hl].sort();
  elInfo.style.display = 'block';
  elInfo.innerHTML =
    '<span class="x" onclick="document.getElementById(\\'info\\').style.display=\\'none\\'">×</span>'
    + '<div class="t">'+n.name+'</div>'
    + '<div class="p">'+n.id+'.md · '+(n.dir||'root')+' · '+(n.deg||0)+' 链接</div>'
    + (n.desc ? '<div class="d">'+n.desc.replace(/</g,'&lt;')+'</div>' : '')
    + '<div class="nb"><b>相邻 ('+nbrs.length+'):</b><br>'
    + nbrs.slice(0,40).map(id=>'<a href="#" onclick="return jump(\\''+id.replace(/'/g,"\\\\'")+'\\')">'+id.split('/').pop()+'</a>').join(' · ')
    + (nbrs.length>40 ? ' …' : '') + '</div>';
}}
window.jump = id => {{ const n = DATA.nodes.find(x=>x.id===id); if(n){{ select(n); G.centerAt(n.x,n.y,600); G.zoom(4,600);}} return false; }};

document.getElementById('q').addEventListener('input', e => {{
  q = e.target.value.trim().toLowerCase();
  G.nodeColor(G.nodeColor());   // trigger repaint
}});

// gentle de-clutter for a large graph
G.d3Force('charge').strength(-40);
G.d3Force('link').distance(28);
</script>
</body>
</html>
"""
    OUT.write_text(html, encoding="utf-8")


def main():
    print(f"vault: {VAULT}")
    nodes, links = build()
    print(f"  {len(nodes)} nodes, {len(links)} edges")
    lib, have = get_lib()
    write_html(nodes, links, lib, have)
    size_mb = OUT.stat().st_size / 1e6
    print(f"wrote {OUT}  ({size_mb:.1f} MB){'  [lib inlined, offline]' if have else '  [lib via CDN]'}")


if __name__ == "__main__":
    sys.exit(main())
