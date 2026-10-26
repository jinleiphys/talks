# 备课查询记录

检索时间：2026-10-20 08:43:40 UTC。

查询输入：`10.1103/PhysRevC.97.011601`。

已有文献笔记预查：Hit，`2018-prc-post-prior-complex-potentials-lei-moro`。这是单篇查询，只取候选标识符，不扩展参考文献列表。笔记的题目、作者、年份、卷号和文章号，与本次数据库记录一致；姓名全写、期刊全称和 DOI 大小写属于表示差异。

本次工具环境没有独立 Skill 调用接口，因此读取 literature-wiki 协议并按其查询步骤执行预查，再执行数据库调用。未修改文献库。

实时请求：[CrossRef 原始记录](https://api.crossref.org/works/10.1103/PhysRevC.97.011601)。

复用原技能 `scripts/verify_doi.py` 的 `fetch_crossref(..., use_cache=False)`，明确禁用缓存。响应保存于 `crossref-record.json`，整理后的字段保存于 `verified-fields.json`。

| 输出字段 | 原始记录字段 |
|---|---|
| author | author[].given + author[].family |
| title | title[0] |
| journal | container-title[0] |
| volume | volume |
| pages（文章号） | article-number |
| year | issued.date-parts[0][0] |
| doi | DOI |
| url | URL |

发现的脚本限制：原脚本的 normalize 只读取 page，本条记录使用 article-number，所以它最初返回 pages=null。此次从已获取的原始记录读取 article-number=011601，没有从 DOI 推导，也没有改动全局技能脚本。这个细节用于课堂说明保留原始记录的价值。

Stage2 evidence: 本次 Python 调用 fetch_crossref(use_cache=False) → CrossRef DOI 记录 → 作者、题目、期刊、卷号、文章号、年份、DOI、URL。原始响应保存在本目录。

本例没有剩余的引用字段缺项。未读取论文全文，也未验证任何物理结论。

Sources consulted: CrossRef. Retrieved 2026-10-20.
Records fetched: 1. Records rejected on verification: 0.
