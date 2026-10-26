# 重跑数据库请求

课堂由智能体加载完整技能并执行 `PROMPT.md`。下面是备课查询所用函数的可重跑命令，便于对照真实返回值。它只重跑数据库这一环，不冒充完整智能体执行过程。

先进入本材料的 `literature/` 目录，需要 Python 3 和网络。`scripts/verify_doi.py` 原样复制自教师的 literature-search 技能，没有修改。

```bash
python3 - <<'PY'
import json
from pathlib import Path
from scripts.verify_doi import fetch_crossref, normalize

out = Path("results-replay")
out.mkdir(exist_ok=True)
record = fetch_crossref("10.1103/PhysRevC.97.011601", use_cache=False)
(out / "crossref-record.json").write_text(
    json.dumps(record, ensure_ascii=False, indent=2) + "\n"
)
fields = normalize(record)
print(json.dumps(fields, ensure_ascii=False, indent=2))
print("原始记录的 article-number:", record["message"].get("article-number"))
print("原始记录已保存:", out / "crossref-record.json")
PY
```

本次备课返回 `pages: null`，但原始记录有 `article-number: "011601"`。打开原始记录确认后，才把这个文章号填到 BibTeX 的 pages 字段。不要从 DOI 字符串推导文章号。

对照 `results/verification.md` 中的字段映射，逐项检查 `results/references.bib`。不需要读完原始记录里附带的参考文献列表。

网络错误表示请求没有完成。不要把网络失败解释为论文不存在，也不要把旧结果改写为新的查询记录。
