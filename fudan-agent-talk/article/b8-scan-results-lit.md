# B8 扫描结果（第二轮）：文献 wiki 的跨模型审计缺陷检出率

**协议** `b8-preregistration.md`（冻结于 2026-07-20，扫描前，本轮未作任何改动）
**本轮扫描范围** `~/research-wiki/`（文献 wiki）**仅此一个**。第一轮 `b8-scan-results.md` 覆盖 `~/research-wiki-personal/`（14 事件 / 5 客观检出）。协议第 1 节把两个 wiki 都算进分母，故第一轮按协议字面定义不完整；本轮补齐。
**扫描日期** 2026-07-20
**硬排除（已执行，未打开、未计数、未引用）** `reviews/` 全目录；所有 `*.private.md`；`lint-reports/`
**时间截断** 事件必须早于 2026-07-17。本轮识别并排除的截断后记录：2026-07-17 Green's function 论文 ingest（含致谢中的 AI 声明）、2026-07-20 两条 lint-fix 条目（均为 Claude + CrossRef，本就无第二模型）。

关键词扫描用词（与第一轮一致）：`Codex`, `DeepSeek`, `GPT`, `cross-check`, `cross-valid`, `交叉验证`, `跨模型`, `single-source`, `单源`, `single-model`, `opencode`, `cross-model`, `dual-AI`, `second model`。命中 49 个文件。**其中 42 个文件的命中全部是物理层面的 cross-check / cross-validation**（Faddeev vs AGS vs HH、CC vs IMSRG vs MBPT、FRESCO 对撞、实验探测器互校、机器学习的 k-fold cross-validation），不是第二模型，已剔除。真正的跨模型记录几乎全部集中在 `log.md`，另有 2 处落在 `synthesis/` 与 `sources/` 页面正文。

`debates/` 与 `synthesis/` 目录已逐页检查：`debates/` 三页全部是**文献中的物理争议**（post-prior 争议、12C+12C THM 速率争议、core-destruction 结合能依赖），与跨模型分歧无关；`synthesis/` 八页中只有 `ec-vs-pod-galerkin-same-method.md` 记录了一次跨模型检查（下表 L3）。

---

## 1. 本轮新增事件全表（分母）

事件编号加前缀 `L` 以避免与第一轮 E1-E14 冲突。列定义、事件定义、客观检出判据、分类体系全部沿用第一轮，未作任何重新表述。

confid. 列：`public-safe` = 事件绑定的产物已公开（已发表论文、arXiv 预印本，或本身就是关于公开文献的记录）；`restricted` = 触及未发表手稿或内部项目代码。

| # | 日期 | 产物 | 第二模型 | 检查了什么 | 结果 | 锚点类型 | 类 | 判定 | confid. |
|---|------|------|----------|-----------|------|---------|-----|------|---------|
| L1 | 2026-05-19 | EFT_Fisher_info PRC scheme-comparison **代码**（`~/Desktop/code/EFT_Fisher_info`，多个 Python 脚本 + 一份 markdown 总结） | Codex（audit） | 代码与总结里的引文权威性 | **抓到一条捏造引文**：多处把 ³P₀（CC7）contact 提升到 LO 的权威写成 "Bira-Long PRC 77, 014002 (2008)"；该合成作者名不存在，PRC 77, 014002 是 **Yang, Elster, Phillips**（非微扰重整化，2008）。真正的权威链是 NTvK 2005 → Birse 2006/2007（独立 RG 论文，非 Long/Yang 合著）→ Long & Yang PRC 84, 057001 (2011) | 文献元数据核验（DOI 级）+ 数据产物：5 个受影响文件逐一具名订正，`results/phase_vi/tier2_birse_long/summary.json` 重新生成，冻结快照 `_inputs/script_copy.py` 有意不回改以保留审计轨迹 | **C3** | **objective** | restricted |
| L2 | 2026-05-21 | CR10956/Liu 耦合道 Green's function 论文第一轮审稿回复的**引文策略**（现已发表：PRC 114, 014623；arXiv:2604.00471） | Codex（`codex:rescue`） | §I ¶3 对 Surrey 学派 adiabatic + Weinberg-states 线的 4 篇引用是否恰当 | 确认引文策略恰当（PASS）；唯一建议是补 Johnson-Tandy 1974 作为形式主义前身，**被 Jin 否决**（"keep the citation tight"） | none | **C0**（含一条被否决的建议） | narrative | public-safe |
| L3 | 2026-05-26 | `synthesis/ec-vs-pod-galerkin-same-method.md` 的工作论点 + DREAM 的定位主张（DREAM 已在 arXiv:2605.30980） | Codex / GPT-5.x | "EC 与 POD-Galerkin 是同一方法" 论点，以及 DREAM 相对 CC-RBM/EIM 的切割线 | 主论点通过；**抓到一处表述超限**：DREAM 把 Woods-Saxon 深度拉成精确线性系数、只对几何 (R,a) 插值，**这不是相对 EIM 的精度优势**，因为 EIM 的系数 b_i(α)=(U^EIM)⁻¹c^EIM(α) 由真势在配点上求值构成，线性深度 V₀ 直接分解出来 b_i=V₀ b_i^geom，残差同样落在几何上。定位改写为"降维 + 解析导数干净"，不是精度胜出 | none（改的是 synthesis 页 + `sources/2026-prc-cc-rbm-catacora-rios.md` 的文字；纯代数论证，无前后数值、无 commit） | C4 | narrative | public-safe |
| L4 | 2026-05-26 | `1974-npa-johnson-tandy` 源页 ingest（Johnson-Tandy NPA 235, 56；及其易混的 PRC 11, 1152） | Codex（dual-AI cross-validation） | 事实层 (A) 与"是否是两篇不同论文"的判断 (C) | 事实 PASS，两论文判断 PASS（正确拆分 JT74 与 TJ74）；**抓到 3 处缺陷**：`index.md` 源计数 105→106；`weinberg-state-expansion.md` 作者名 "P.M.S. Tandy"→"P.C. Tandy"（既存 typo）；`johnson.md` + `tandy.md` 中 PRC 11, 1152 年份 1974→1975（PRC 卷 11 = 1975，内部不自洽） | 文献元数据核验 + 前后值全部落纸（105→106、P.M.S.→P.C.、1974→1975） | **C3** | **objective** | public-safe |
| L5 | 2026-05-26 | Perey damping-factor 系数（`sources/1966-np-fiedeldey-…` + 4 个 methods 页 + 3 个 entities 页），系在 LG18891CR 第四轮修订期间 | Codex（cross-check） | 2026-05-21 Fiedeldey ingest 记下的闭式系数 | 系数由 ½ 订正为 **⅛**：`f(r)=exp(-⅛a²U_L⁰)`，与标准 μa²/(4ℏ²) 一致；连带推翻了"Austern 1965 的 ⅛ 与经验拟合不符"这个由 ½ 错误制造出来的叙事 | 有可复现前后值（½→⅛）+ 数值代码 `code/fiedeldey_nlo.py` coeff 0.125，**但 wiki 原文写的是 Codex "independently confirmed"，不是 Codex "caught"**；检出功劳在数值代码与 Codex 之间归属不明 | C1 | narrative（**归属歧义 → 按协议取保守判定**） | restricted |
| L6 | 2026-06-02 | EST 谱系 4 篇源页 ingest（1973 / 1974 / 2013 / 2020）+ `synthesis/non-locality-families.md` | Codex（GPT-5.x，dual-AI cross-validation） | 整批 ingest 的物理陈述与标签 | 4 条有效发现全部采纳、1 条过度订正被跳过：(a) 1974 源页 "阈下复耦合" 说法错，论文里阈下 Im γ(E)=0，复的是形状因子；(b) 1973+2013 源页误挂 `half-off-energy-shell` 标签（该概念页是 THM 专用）；(c) 2020 源页误把 "weak intrinsic energy dependence" 归给 Lei 2018 ⁶Li 论文，实际论文归给 Feshbach 1958 + Hlophe-Elster 2016（Ref 30），错误交叉链接已删；(d) synthesis 页 "Two families"→"Three families" | none（无 commit、无数据产物、无前后数值；(c) 虽指名 Ref 30 但未记录任何 DOI 核验动作） | C4（含 C3 误归属） | narrative | public-safe |
| L7 | 2026-06-03 | Lazauskas 2003 PhD + 2019 HDR 两份源页（HDR 公开于 arXiv:1904.04675） | Codex（GPT-5.x），独立用 pdftotext 重读两份 PDF | 全部转写的关键数字与表格 | 数字全部确认（W₁(T=3/2)=-36.14 MeV HDR Table 3.7；3n/4n γ 因子 Tables 3.4/3.5；CS-FY vs Deltuva AGS 三位一致 HDR Sec 5.4；H₂⁺ B=1.125×10⁻⁹ a.u. thesis Table 2.5 p.83/88）。3 条订正：1 条真错（HDR 页给 σ(n-³H)-vs-B³H 关联贴的 "(Tjon-line-like)" 标签是**智能体自造的**，Tjon 是 B(³H)-B(⁴He)、Phillips 是 B(³H)-a(nd)，此关联两者都不是，Lazauskas 本人未命名）；2 条轻微（Phillips 线关联的归属补注、A=4 过束缚与外部约束拆行）。另记 3 条 Codex 的"非问题"对冲 | 核验有页/表锚点，但**订正本身**无 commit、无前后数值、无 DOI 核验动作 | C4 | narrative（锚点歧义 → 保守） | public-safe |
| L8 | 2026-06-09 | 2026-06-09 两批 ingest 的全部 17 个源页 + 词表 | Codex（`codex:codex-rescue`，independent dual-AI check） | 书目元数据 + 物理数字 + 词表槽位 | 数字与元数据大面积 PASS（Machta 342/604；KSW Λ_NN~300；EMN χ²/datum 1.15、triton 8.1 MeV；Gazit c_D/c_E 区间；Elhatisari LO 比 2/3/4/5、λ_∞=0.0(1)；Jiang ρ₀/S₀/L；Nikšić 7→6→5→4 与 data-distance 序列；Efimov s₀≈1.006；MBAM=Transtrum-Qiu 2014）。两类缺陷：**SEVERE** `sources/2016-prc-sloppy-edf-mbam-niksic.md` 缺 `arxiv: 1606.08617`（已补）；**重复槽位回归 6 个**（lee-d / wiringa-rb / ekstrom-a / hagen-g / schwenk-a / kievsky-a 与既存短槽位 lee / wiringa / ekstrom / hagen / schwenk / kievsky 重复；根因是只检了长槽位变体），已合并条目、重指链接、删 6 个文件、删 6 条词表项 | arXiv 标识符核验（1606.08617）+ 前后计数全部落纸（实体净增 +7 而非 +13；合并后条目数 lee 5 / wiringa 5 / ekstrom 6 / hagen 3 / schwenk 3 / kievsky 2，count==bullets） | **C3** | **objective** | public-safe |

---

## 2. 已在第一轮计数、本轮不重复计入

**重叠识别方法**：对每一条文献 wiki 的跨模型记录，取三元组（日期、被检产物、第二模型），与第一轮 E1-E14 的同一三元组比对；三者全同即判为同一事件的两处落笔。两条命中，均为第一轮已明确点名的情形（第一轮威胁清单第 (vii) 条就预告了 BiLNN 这一条）。

| 第一轮 # | 日期 | 产物 | 第二模型 | 文献 wiki 里的落笔 | 为何判为同一事件 | 本轮处理 |
|---|------|------|----------|-------------------|-----------------|---------|
| E1 / E2 | 2026-05-12 | THM 谱框架 PRC 手稿（sole） | Codex（`codex:rescue`） | `log.md` "[2026-05-12] errata round 3 + ingest"：*"Round triggered by cross-validation of the 2026 PRC THM-IAV manuscript by Claude + Codex (codex:rescue). Two wiki-side problems identified, both fixed"*（deBoer 2021 的 Γ_p₀ 在 11 keV 由 "1.5 meV" 订正为 "1.1×10⁻²⁸ eV"，差 25 个数量级，与项目 `notes/literature_values.md` 的锁定值冲突；以及 Lei-Moro 2018 PRC 97 缺独立源页被补） | 日期、产物、第二模型三者全同：同一次 2026-05-12 的 THM 手稿 Codex 评审。文献 wiki 记的是这次评审在 wiki 侧的下游后果，不是另一次检查 | **不计入新分母。** 见第 6 节 (iv)：这条落笔其实给 E1 提供了第一轮当时没有的前后值锚点，但协议冻结在前、第一轮判定已成文，本轮不回改第一轮判定 |
| E14 | 2026-07-16 | BiLNN 论文（PRC 114, 014620；arXiv:2512.22500）的数字叙事 + wiki 记录 | Codex | `log.md` "[2026-07-16] lint-fix \| 2025-arxiv-bilnn-nucleon-omp-lei \| **Second pass, correcting the first.**"：Codex 推翻当天早些时候写入的 "Version drift" 叙事（实测 RMS 0.940%、比值 1.54 非 2；1.2% 是三月陈旧数字；同 checkpoint 出处不可证；v1 无 ablation 表） | 日期、产物、第二模型三者全同；第一轮 E14 明确写了"同批订正也落在文献 wiki" | **不计入新分母** |

---

## 3. 计数

### 3.1 本轮（文献 wiki）

| 量 | 值 |
|----|----|
| **本轮新增合格事件（分母）** | **8**（L1-L8） |
| **本轮客观缺陷检出（分子）** | **3**（L1, L4, L8） |
| 仅叙述性 | 5 |
| 其中 C0 / PASS（未发现缺陷） | 1（L2） |
| 本轮检出率 | 3 / 8 = 38% |
| 与第一轮重叠、已排除 | 2（E1/E2 一次事件、E14） |

### 3.2 合并（第一轮 + 第二轮，两个 wiki）

| 量 | 值 |
|----|----|
| **合格事件总数（分母）** | **22** = 14 + 8 |
| **客观缺陷检出（headline 分子）** | **8** = 5 + 3（E3, E5, E10, E13, E14 + L1, L4, L8） |
| **headline 检出率** | **8 / 22 = 36%** |
| 仅叙述性 | 14 |
| 其中 C0 / PASS | 4（E6, E8, E11, L2） |

**更严格的分子（只算检出对象是研究产物本身、不算检出对象是 AI 生成记录的）：**

第一轮已按此拆分给出 4（E3, E5, E10, E13；E14 被剔除，因其检的是 Claude 当天写入 wiki 的捏造）。本轮同法拆分：L1 的被检对象是 EFT_Fisher_info 的**项目代码与总结**，属研究产物，保留；**L4 与 L8 的被检对象是文献 wiki 的记录页本身**（源计数、作者名拼写、卷年、arXiv 标识符、槽位去重），属 AI 生成记录，剔除。

| 量 | 值 |
|----|----|
| **严格分子（仅研究产物）** | **5** = 4（E3, E5, E10, E13）+ 1（L1） |
| **严格检出率** | 5 / 22 = 23% |

**预注册失败条件（客观检出 < 3）：两种口径下均未触发**（headline 8 ≥ 3；严格 5 ≥ 3）。

按协议第 6 节，该结果**只**支持"跨模型审计能检出可核查缺陷"一条；不支持五层架构有效、效率提升、研究质量提升或智能体具备判断力。样本为 n=1 部署、事件级 n=22、无对照组。

### 3.3 合并后按缺陷类别

| 类 | 数 | 事件 |
|----|----|------|
| C1 数值收敛/精度 | 2 | E10；L5 |
| C2 代码缺陷 | 0 | — |
| **C3 引用/元数据错误** | **3** | **L1, L4, L8**（第一轮该格为 0，C3 只作为 E14 的子发现出现） |
| C4 物理表述与恒等性超限 | 6 | E1, E3, E7；L3, L6, L7 |
| C5 数据/图表与正文不一致 | 3 | E5, E12, E14 |
| C0 未发现缺陷 | 4 | E6, E8, E11；L2 |
| C9 其他（协议要求单列） | 4 | E2, E4, E9, E13（本轮无新增 C9） |

**加入文献 wiki 对类别分布的唯一实质改变是 C3 从 0 变成 3。** 这不是巧合：文献 wiki 的全部内容就是书目与文献陈述，跨模型检查在这里天然只能撞到元数据类缺陷。**C2 依然为零**：合并后 22 条记录里没有一条是第二模型直接读源码抓出代码 bug。

---

## 4. "已声明单源 / 尚未交叉验证"标记（不是事件，是标注纪律的证据）

文献 wiki 中找到 **2 处**独立标记，均在 `log.md`，均是主动自我降级：

1. `log.md`（2026-06-02，16 篇 frontier PRL/RMP 批次之后）：*"**Self-validation note (Codex quota exhausted, single-source check)**: the 16-paper batch introduced NO new slug/alias collisions ... No cleanup needed; wiki AUTO blocks are sound."* —— 值得注意的是它同时记下了这次单源自查里自己抓到的一个**假阳性**（"14 pages with duplicate paper entries" 是审计脚本把别人摘要里的内联引用当成重复条目）。
2. `log.md`（2026-06-02，Lazauskas 2003+2019 ingest 条）：*"**Single-source note**: extraction done by two Claude sub-agents reading the PDFs; **no Codex cross-check this round** (numbers transcribed from the documents with page refs, but flag as single-AI-read)."* —— 次日（2026-06-03）这条标记确实被兑现了，Codex 补做了交叉检查，即上表 L7，并且真的抓到了一条智能体自造的标签。**这是本次审计里唯一一条"声明单源 → 后续补做 → 补做确有产出"的闭环。**

另有一条**策略性而非事件性**的表述：`CLAUDE.md:3` *"This file is read by both Claude Code and Codex when operating on this wiki."* —— 说明这个 wiki 从设计上就假定双模型都会操作它。这是配置，不是标记，不计入。

合并后两个 wiki 共 6 处单源标记（第一轮 4 + 本轮 2）。

---

## 5. 可公开引用的示例（只限已公开产物）

文献 wiki 的记录绝大多数绑定的是**已发表的第三方文献**，因此本轮的公开安全性明显好于第一轮。

**(a) Johnson-Tandy 的卷年不自洽（L4，客观检出，C3）** —— 产物：关于 Johnson & Tandy NPA 235, 56 (1974) 与 Tandy & Johnson PRC 11, 1152 (1975) 两篇公开论文的 wiki 记录。原文（`~/research-wiki/log.md`，2026-05-26 条）：

> "**Codex dual-AI cross-validation of the Johnson-Tandy 1974 ingest.** Facts (A) PASS, two-papers judgment (C) PASS (NPA235 != PRC 11,1152; correctly split JT74 vs TJ74). **Fixed 3 issues Codex caught**: index.md source count 105->106; weinberg-state-expansion.md "P.M.S. Tandy"->"P.C. Tandy" (pre-existing typo); PRC 11,1152 year 1974->1975 (PRC vol 11 = 1975, internal inconsistency)."

可复核性：三处前后值全部落纸；"PRC 卷 11 = 1975" 是任何人查一次期刊卷年表即可判真伪的公开事实。注意其中的作者名 typo 是**既存**的，不是这次 ingest 引入的，第二模型顺带清了历史债。

**(b) Nikšić 源页缺 arXiv 标识符 + 6 个重复实体槽位（L8，客观检出，C3）** —— 产物：关于 Nikšić 等 2016 PRC（arXiv:1606.08617）等 17 篇公开论文的 wiki 记录。原文（`~/research-wiki/log.md`，2026-06-09 条）：

> "**Independent dual-AI check (codex:codex-rescue) of all 17 source pages + vocab.** ... **SEVERE**: sources/2016-prc-sloppy-edf-mbam-niksic.md was missing arxiv: 1606.08617 (now added). **DUPLICATE-SLUG REGRESSION (6)**: the chiral-3NF batch created entities lee-d, wiringa-rb, ekstrom-a, hagen-g, schwenk-a, kievsky-a for authors who ALREADY had pages ... **Root cause: existence-checked only the long-form slug variants, not the canonical short slugs.**"

可复核性：arXiv:1606.08617 是公开标识符；合并后的条目计数（lee 5 / wiringa 5 / ekstrom 6 / hagen 3 / schwenk 3 / kievsky 2，且 count==bullets）在库里可直接重数。这条同时是个**根因被写下来**的例子，不只是症状。

**(c) 自造的 "Tjon-line-like" 标签（L7，叙述性，C4）** —— 产物：Lazauskas HDR，公开于 arXiv:1904.04675。原文（`~/research-wiki/log.md`，2026-06-03 条）：

> "HDR page: removed the "(Tjon-line-like)" label on the n-³H cross-section vs B³H correlation. **Tjon = B(³H)-B(⁴He) [two binding energies]; Phillips = B(³H)-a(nd); the σ(n-³H)-vs-B³H pattern is neither, and Lazauskas gives no named-line label (agent-introduced error).** Rephrased neutrally."

价值不在检出强度（判为叙述性），而在**缺陷种类**：第一模型给一个真实的物理关联贴了一个听起来专业、实际不存在的行业标签。这是"读起来对"的错误，人工审读最容易放过。它也正好是第 4 节那条"声明单源 → 次日补做"闭环的产出。

**(d) 阴性结果：CR10956 引文策略（L2，C0）** —— 产物：现已发表为 PRC 114, 014623 / arXiv:2604.00471。Codex 确认引文策略恰当，唯一建议（补 Johnson-Tandy 1974）被作者否决。适合用来说明分母里包含什么：**跨模型检查的常见结局是"没问题，外加一条你不采纳的建议"。**

L1（EFT_Fisher_info 捏造引文）虽然是本轮最硬的一条检出，但绑定的项目手稿仍在 drafts 阶段，只能进聚合计数；可公开陈述的部分仅限"PRC 77, 014002 是 Yang-Elster-Phillips"这一条书目事实。L5 绑定 LG18891CR（在投），同样只进计数。

---

## 6. 这个计数在哪里会错（本轮特有的威胁）

**(i) 文献 wiki 结构性地拿不到 commit 锚点。** `git log` 显示整个 `~/research-wiki/` 只有一个提交（`f42825a initial scaffold`）。协议列出的五种锚点里，**commit hash 这一种在本轮全库不可得**。第一轮 5 条客观检出里有 2 条（E3、E14）是靠 commit hash 定的，本轮没有任何一条能走这条路。这意味着本轮 3/8 的检出率**相对第一轮被系统性压低**，压低量不可测。反过来说，本轮 3 条能判客观，全靠元数据核验与前后计数这两种锚点，而这两种恰好是文献工作天然会留下的。

**(ii) 本轮 8 条里有 6 条的被检对象是 wiki 记录，不是研究本身。** 只有 L1（项目代码）和 L5（在投手稿修订中的物理系数）触及研究产物，且 L5 判为叙述性。第一轮的第 (iv) 条威胁在本轮**放大**了：文献 wiki 本质是一份 AI 写的文献笔记，对它做跨模型审计检出的几乎必然是 AI 记录缺陷。这正是第 3.2 节必须给出严格分子的原因，也是我判断"加入这个 wiki 不改变第一轮结论"的主要依据。

**(iii) L5 的检出归属不明，我按保守判成叙述性。** wiki 原文是 *"Independently confirmed by the SMOOTHIE/Fiedeldey numerical code (coeff 0.125) **and** a Codex cross-check"* —— "confirmed" 不是 "caught"，而且数值代码与 Codex 并列。若这次其实是 Codex 先发现，则它满足客观判据（前后值 ½→⅛ + 代码常数 0.125 双锚点），本轮分子变 4、合并 headline 变 9/22 = 41%、严格分子变 6。**单条判定翻转就动 4 个百分点，说明这个率对判断边界很敏感。**

**(iv) 重叠条（E1/E2）本可以升级第一轮的判定，我没有升级。** 文献 wiki 的 2026-05-12 条给出了第一轮当时没有的东西：一个具名的、可复核的前后数值（deBoer Γ_p₀ 在 11 keV，1.5 meV → 1.1×10⁻²⁸ eV，与项目 `notes/literature_values.md` 的锁定值对照）。但 (a) 该条只写"Round triggered by cross-validation"，**没有说这两个 wiki 侧问题是 Codex 指出的**，归属同样不明；(b) 协议冻结在扫描前，回头把第一轮的 narrative 改成 objective 属于"按发现调整规则"，明令禁止。故保持原判并在此披露。**若将来有人认为该升级成立，合并 headline 分子为 9、严格分子为 6。**

**(v) 事件边界仍是我划的。** L8 把"1 条 SEVERE 元数据缺失 + 6 条重复槽位回归"合成一条（压低分子），L3/L4/L5 三条同为 2026-05-26 但被拆成三条（抬高分母，理由是三者产物完全不同：synthesis 论点 / Johnson-Tandy 源页 / Perey 系数）。换一种划法，本轮分母可以在 6 到 12 之间摆动。

**(vi) 分母仍被系统性低估，与第一轮同因。** 事件进入 log.md 的条件是当天有人写了一条 ingest / lint 记录；例行的跨模型检查大多不触发。文献 wiki 的 log 有 650+ 源页的 ingest 记录，但只有 8 次跨模型检查被写下来 —— **这个比例本身就说明大量检查（以及大量未检查）没有留痕**。未记录的事件里 PASS 与琐碎意见的占比应更高，故真实检出率大概率**低于**报告值。

**(vii) `lint-reports/` 的排除在本轮代价更大。** DeepSeek 周度 lint 自 2026-07-13 起在**两个 wiki 上都跑**，2026-07-20 的 log 条目还记录了 cron 被改成"在外部模型退出后追加确定性全库与 tier-1 引文输出，并强制要求一节网络引文审计"。这是一条持续运行的跨模型管线，若计入会显著增大分母、并几乎肯定再增若干 C3 检出。这是协议自己造成的偏差，不是扫描误差，且方向明确：**排除它同时抬高了报告的检出率、压低了分母**。

**(viii) 本轮同样没有负例记录。** 8 条里只有 L2 的一条被否决建议、L6 的一条被跳过的过度订正、L7 的三条"非问题"对冲。没有任何一条记录形如"某次交叉验证提了 N 条意见、全部无效"。合并后 22 条里，明确记下的被否决/无效意见仍只有 4 处，真实分布几乎肯定不是这个样子。

---

## 7. 合并后的分母是否可靠可重建？（协议第 5 节第 2 款）

**协议覆盖范围现已完整，但分母仍是便利样本，不是可靠重建的总体。**

- **覆盖范围**：协议第 1 节要求的两个 wiki 现已全部扫描，第一轮的第 (vii) 条缺口已闭合。就"协议字面规定的检索范围"而言，本次测量不再不完整。
- **总体可重建性**：**否。** 判据是第 6 节的 (vi) 与 (vii) 两条 —— 事件进入分母的充要条件不是"发生过"，而是"当天有人为别的目的写了一条日志顺手提了一句"，且一条持续运行的跨模型管线（DeepSeek 周度 lint）被协议整体排除在外。E9（CRediT 行只留 "PLB pivot + Codex review" 五个词、无任何结论）与本轮 650+ 源页 ingest 对 8 条跨模型记录的比例，都是"做了但没写"是常态的直接证据。真实总体不可数，因此 22 是**已记录事件的完整计数**，不是**合格事件的完整计数**。

**我的建议（判断，非协议规定）：** 协议第 5 节第 2 款的字面后果是"本测量作废，不进稿件"。我认为更诚实且不违反预注册精神的处理是：**不把 8/22 = 36% 当作一个率来报**，因为分母不可重建时率没有意义；改为报"在两个 wiki 的书面记录中，共找到 22 次跨模型检查，其中 8 次（严格口径 5 次）留下了独立可核查的缺陷订正"，并明写这是记录事件的下界、不是发生事件的普查。若不接受这一降级，则应按第 5 节第 2 款作废本测量。**这个决定应该由作者做，不应由扫描者在报告里替作者做掉。**

---

*报告生成于 2026-07-20。所有引用均来自 `~/research-wiki/` 中的非保密文件（`log.md`、`synthesis/`、`sources/`、`CLAUDE.md`）；`reviews/`、`*.private.md`、`lint-reports/` 未被打开、未被计数、未被引用。第一轮结果 `b8-scan-results.md` 未作任何修改。*
