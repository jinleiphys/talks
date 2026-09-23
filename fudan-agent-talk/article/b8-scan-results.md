# B8 扫描结果：跨模型审计的缺陷检出率

**协议** `b8-preregistration.md`（冻结于 2026-07-20，扫描前）
**扫描范围** `~/research-wiki-personal/`（全库 grep + 全部候选文件逐一打开）
**扫描日期** 2026-07-20
**硬排除（已执行，未打开、未计数、未引用）** `reviews/` 全目录；所有 `*.private.md`；`lint-reports/`
**时间截断** 事件必须早于 2026-07-17。2026-07-17 及以后的记录（opticalfisher 上诉信 Codex PASS，2026-07-20；Green's function 论文致谢中的 AI 声明，2026-07-17）已识别并排除。

关键词扫描用词：`Codex`, `DeepSeek`, `GPT`, `cross-check`, `cross-valid`, `交叉验证`, `跨模型`, `single-source`, `单源`, `single-model`, `opencode`, `dual-AI`, `second model`, `two AI`, `three-AI`。命中 34 个文件；其中约 20 个命中是**物理层面**的 cross-check（FRESCO 对撞、Faddeev 对撞、代码互验），不是第二模型，已剔除。

---

## 1. 事件全表（分母）

confid. 列：`public-safe` = 事件绑定的产物已公开（已发表论文或 arXiv 预印本）；`restricted` = 触及未发表手稿、内部记录或保密的编辑工作。

| # | 日期 | 产物 | 第二模型 | 检查了什么 | 结果 | 锚点类型 | 类 | 判定 | confid. |
|---|------|------|----------|-----------|------|---------|-----|------|---------|
| E1 | 2026-05-12 | THM 谱框架 PRC 手稿（sole） | Codex GPT-5.x（Claude=Reviewer A，Codex=Reviewer B，另加 cross-checker） | 投稿前内部双 AI 全稿评审，27 条 issue 判决 | 指出 (A2) Cauchy-Schwarz 严格化尝试有 3 处数学缺口（连续态归一、单位分解、σ_R 转换）；(A2) 改写为模型依赖的界 | none（有 commit `388569f`，但未与该 3 缺口逐条挂钩） | C4 | narrative | restricted |
| E2 | 2026-05-12 | 同上（同一评审轮） | Codex GPT-5.x | 建议删掉 §V 中 post-form 的物理动机（"prior-form mention"） | **被作者否决**：该论证是承重的 | none | C9-其他（被否决的意见） | narrative | restricted |
| E3 | 2026-05-20 | CDCC channel-importance PRC Letter（CRR1074）第一轮回复稿 | Codex GPT-5.x，两遍 | 回复稿的论证与提交包 | 8 条问题，全部采纳；核心一条：block-decoupling 恒等式在有限维下已给出机器精度等价，故"有限环境维数"解释站不住 | commit `a96b4a7` | C4 | **objective** | restricted |
| E4 | 2026-06-03 | PINN-ECS PRC 定稿（PRC 113, 064618；arXiv:2602.04553） | Codex | 接收后 copy-edit 的 PDF | 指出 sed 引入的双反斜杠 `\\approx` 在 PDF 里渲染成斜体 "approx"；**Claude 错误地把它当作 shell 假象驳回**，最后由 Lei 在 PDF 里抓到 | none | C9-其他（排版/渲染） | narrative | public-safe |
| E5 | 2026-06-09 | HPRMAT 手稿 + 代码（arXiv:2512.11590，MIT 公开仓库） | Codex + 机上 bufferSize 实测 | 单卡 GPU 显存公式 | 论文原写 26 N²、更早一版 48 N²，**都错**；正确值 32 N²（cusolverDnCgetrf 的 Lwork 以"元素"计，N=25600 实测 655364512 ≈ N²） | 数值前后对照 + 实测基准数 | C5 | **objective** | public-safe |
| E6 | 2026-06-17 | EFT_Fisher_info PRL（`paper/main_v2.tex`）规范数字集 | Codex，×3 | a,r 提升为一级观测量后的重算（D_eff 1.2692/1.2694/1.2695，186/192 obs，Q=0.31） | 通过，未报缺陷 | 数字已 pin 在 main_v2.tex（但无缺陷） | **C0** | narrative | restricted |
| E7 | 2026-06-27 | DREAM Schur-condensation idea 页 | Codex | "代数精确 + 便宜"这一 headline 主张 | **降级**：CDCC breakup 耦合本身是被标定的 U_p,U_n 的矩阵元，故非对角块随 Ω 变，不可离线预算；Woods-Saxon 形状因子是局域满秩，不同于使 Heihoff-Filin-Epelbaum 精确且小的低秩可分离 contact | none（改的是 idea 页文字 + 给 Nunes 的回信措辞） | C4 | narrative | restricted |
| E8 | 2026-07-09 | FUSION Phase 0 质量门（三个真实用例） | deepseek-chat（opencode 1.17.15），对照 Claude 参考 | literature-search 的 Typel-Baur 2003 BibTeX；fresco 独立 n+90Zr 输入卡；prc-writing 引文 | 全部通过：BibTeX 精确；fresco 4-5 位有效数字一致，残差归因于半径取整；引文 10/10 零幻觉 | 基准数（4-5 sig figs）——但结果是"无缺陷" | **C0** | narrative | public-safe |
| E9 | 2026-07-10 | Coulomb-bridge PLB 手稿（Liu Hao + Lei + Ren，已被拒） | Codex | 手稿评审（CRediT 行只记 "PLB pivot + Codex review"） | 未记录任何具体结论 | none | C9-其他（无结果记录） | narrative | restricted |
| E10 | 2026-07-14 | opticalfisher PRL LM20073 上诉包（手稿 + 全部数据产物） | Codex，六轮对抗式审计 | 全包：数字一致性、措辞与计算的严格对应、图 | **发现根因缺陷**：`adaptive_lmax = kR+15` 在 E ≳ 100 MeV 未收敛，把 D_eff 最多抬高 0.72（p+²⁰⁸Pb@200 MeV：2.88 → 2.16），该欠收敛自首次投稿即存在，两轮审稿人都没抓到。全部数字重钉：1.7±0.5 → 1.7±0.4；~2.4 → ~2.3-2.5；3.0 → 2.9。另 ~25 处严格身份措辞订正（Igo 方向信息亏损 ~50 而非 10⁵ 等）。终判 PASS | commit `0fa685b` + 数据产物 `data/lmax_certification.json` + 数值前后对照 | C1（子发现含 C4） | **objective** | restricted |
| E11 | 2026-07-14 | 量子淬灭 PRL（LP19345）上诉修订稿 | DeepSeek，两遍，仅给手稿 | 全稿 | 未发现遗留 must-fix | none | **C0** | narrative | restricted |
| E12 | 2026-07-15 | opticalfisher 的 wiki 记录（论文页/项目页/索引） | Codex | 规范章节之外是否残留审计前旧值与旧状态措辞 | 抓到多处残留：Key claim / 项目 Goal / 5 个索引仍是 1.7±0.5、~2.4、3.0；"basket-invariant / near-universal" 措辞；过时的 9 参数 "~1.5"（收敛值 1.72±0.46） | 数值前后对照有，但改动对象是 wiki 记录本身，未给 commit | C5 | narrative | restricted |
| E13 | 2026-07-15 | 编辑筛查中 Lei **自己**的运动学再推导（脱敏后仅作为一般运动学问题外发） | 第二模型（脱敏检查，未含任何稿件身份/作者/结论/文件访问） | 自算的运动学端点 | **抓到真错**：端点自洽值与原值差 0.549 MeV（正是他在批评对方的那个质量差）；根因是把对方（错的）质量取的旁观者能量与自己正确的核质量混在一个表达式里，导致闭式解与 Monte Carlo **两个"独立"确认共享污染输入而一致地错**。结论与主论证不变，信件与记录已订正 | 可复现的数值订正，前后值都记在 `log.md` | C9-其他（自算输入污染） | **objective** | restricted |
| E14 | 2026-07-16 | BiLNN 论文（PRC 114, 014620；arXiv:2512.22500）的数字叙事 + wiki 记录 | Codex | 当天由 Claude 写入 wiki 的中心主张（"1.2% → 0.6% 是误差定义变更，同一 checkpoint，RMS ≈ 2×MAE"） | **反驳并推翻**：(1) 实测比值是 1.54 不是 2（RMS 0.94047% / MAE 0.69096%）；(2) 1.2% 根本不是任何实测量，是三月的陈旧数字；(3) 同 checkpoint 出处不可证（checkpoint 被 gitignore）。同一轮还抓出 Claude 另一处捏造（v1 根本没有 ablation 表，`grep -c tab:ablation` = 0；v1 的单向对照是 1.4% 不是 0.8%）、把 heliumx 捏造成计算主机（真机是 BSCC `gpu_5090`，有作业号）、"SCNT 从投稿起就有"是假的 | 数据产物 `results/ablation/eval_baseline_dual.json` + 数值前后对照 + commit `2e0d53b` | C5（子发现 C3） | **objective** | public-safe（订正对象是已发表论文与公开预印本的数字来历） |

---

## 2. 计数

| 量 | 值 |
|----|----|
| **合格事件总数（分母）** | **14** |
| **客观缺陷检出（分子）** | **5**（E3, E5, E10, E13, E14） |
| 仅叙述性 | 9 |
| 其中 C0 / PASS（未发现缺陷） | 3（E6, E8, E11） |
| **客观检出率** | **5 / 14 = 36%** |

**预注册失败条件（客观检出 < 3）：未触发。** 5 ≥ 3。

按协议第 6 节，该结果**只**支持"跨模型审计能检出可核查缺陷"一条；不支持五层架构有效、效率提升、研究质量提升或智能体具备判断力。样本为 n=1 部署、事件级 n=14，无对照组。

---

## 3. 按缺陷类别

| 类 | 数 | 事件 |
|----|----|------|
| C1 数值收敛/精度 | 1 | E10 |
| C2 代码缺陷 | 0 | — |
| C3 引用/元数据错误 | 0（仅作为 E14 的子发现出现） | — |
| C4 物理表述与恒等性超限 | 3 | E1, E3, E7 |
| C5 数据/图表与正文不一致 | 3 | E5, E12, E14 |
| C0 未发现缺陷 | 3 | E6, E8, E11 |
| **C9 其他（按协议单列）** | 4 | E2（意见被作者否决）、E4（LaTeX 渲染缺陷）、E9（有检查无结果记录）、E13（自算中共享污染输入，闭式解与 MC 一致地错） |

C9 的四条互不同质，协议禁止扫描后新增类别，故一律归 C9 并在此逐条说明。特别注意 **C2 为零**：库中没有一条记录是第二模型直接读源码抓出代码 bug。E10 的收敛缺陷发端于陈旧数字追溯，E5 的显存公式错在文档而非代码。

---

## 4. "已声明单源 / 尚未交叉验证"标记（不是事件，是标注纪律的证据）

共找到 **4 处**独立标记（一处在两个文件重复出现）：

1. `profile.md:193`（工作规则本身）：*"Cross-AI validation. Default workflow is multi-agent: Claude proposes, Codex/GPT cross-checks, then I synthesize. **If only one model has reviewed something, flag it as single-source.**"*
2. `ideas/promising/quantum-hydrodynamics-semiclassical-parent.md:36`：*"**Single-model judgement (Claude only); not yet cross-checked by Codex.**"*（同一标记也写进了 `log.md` 2026-06-09 条目：*"Single-model (Claude only) judgement, not yet Codex-cross-checked."*）
3. `profile.md:152`（Professional service）：*"manuscripts under review are analyzed locally only, never sent to any external model or service ... so editorial verdicts are **single-source by design** and the default Claude-proposes / Codex-cross-checks workflow does NOT apply."*
4. `log.md` 2026-07-15 编辑筛查条：*"the verdict is single-source by design; the argument was built to be analytic precisely because it could not be cross-validated."*

读法：标注规则是显式的、被真正执行了（第 2 条是一条主动的自我降级），且**保密约束优先于交叉验证规则**（第 3、4 条）。这是关于*标注纪律*的证据，不是关于*检出能力*的证据。

---

## 5. 可公开引用的示例（只限已公开产物）

以下三条绑定的产物已经公开（已发表论文或 arXiv 预印本 + 公开仓库），可以在期刊文章里描述而不泄露任何未发表内容：

**(a) HPRMAT 显存公式（E5，客观检出，C5）** — 产物：arXiv:2512.11590 + MIT 开源仓库 `github.com/jinleiphys/HPRMAT`。wiki 原文（`methods-mine/hprmat.md:36`）：

> "KEY: cusolverDnCgetrf_bufferSize returns Lwork = N² ELEMENTS (measured at N=25600: 655364512 ≈ N²), so the FP32 workspace is a full 8 N², not negligible. (The paper's original 26 N² and an earlier 48 N² were both wrong; **32 N² verified 2026-06-09 by Codex cross-check + on-box bufferSize query**.)"

可复核性：前值 26 N²、后值 32 N²、实测量 655364512 全部落纸；任何人可在同型号卡上重跑 bufferSize 查询。

**(b) BiLNN 数字来历（E14，客观检出，C5+C3）** — 产物：PRC 114, 014620 + arXiv:2512.22500 + 本地数据产物。wiki 原文（`log.md` 2026-07-16 lint-fix 条）：

> "**Codex cross-check refuted the central claim I had written into these pages the same day.** ... (1) **The measured ratio is 1.54, not 2.** `results/ablation/eval_baseline_dual.json` gives RMS(phys) 0.94047%, MAE(phys) 0.69096%, MAE(all) 0.61028%. (2) **The 1.2% is not any measured quantity.** ... (3) **Same-checkpoint provenance is unprovable** ..."

同条还留下了这次部署里最坦白的一句自评：

> "**Meta-lesson: I asserted a causal chain from one partial read of one file and presented it to the user as the session's headline finding. Codex is the only reason it is not now the wiki's permanent record.**"

**(c) PINN-ECS 的 `\\approx` 渲染缺陷（E4，叙述性，C9）** — 产物：PRC 113, 064618 + arXiv:2602.04553。价值不在检出本身，而在**方向**：第二模型对了，第一模型（Claude）把它当 shell 假象驳回，最终靠人在 PDF 里抓到。这是"交叉验证不是自动生效"的干净例子。

**(d) 可选，FUSION Phase 0（E8，C0）** — 产物：`github.com/jinleiphys/FUSION`。deepseek-chat 独立生成的 n+90Zr FRESCO 输入卡与 Claude 参考在 4-5 位有效数字上一致，残差完全归因于半径取整选择。这是一条**阴性**结果（未检出缺陷），适合用来说明分母里包含了什么。

其余 10 条全部涉及未发表手稿、内部记录或保密编辑工作，只能进聚合计数。

---

## 6. 这个计数在哪里会错

**(i) 分母几乎肯定被系统性低估，且低估量不可测。** 事件进入 wiki 的条件是"当天有人做了一次 research-profile 归档"。跨模型检查是日常操作，绝大多数不触发归档。E9 是活证据：CRediT 行里只留了 "PLB pivot + Codex review" 五个词，没有任何结论——说明"做了但没写"是常态，而这一条只是碰巧留了个残影。真实分母可能是记录值的数倍，且**未记录的事件里 PASS 与琐碎意见的比例应该更高**（人只在有戏剧性时才写），所以真实检出率大概率**低于** 36%。

**(ii) 分子受同样的偏差，方向相反。** 有可核查锚点的检查更容易被写下来（因为写下来的动机就是"这次改了东西"）。5 条客观检出全部来自留下了 commit / 数据产物 / 前后数值的场合，这不是巧合。

**(iii) 协议排除掉的两类事件是真实存在的。** `lint-reports/`（DeepSeek 周度 lint，2026-07-13 起在跑，2026-07-14 的手动 lint 确实修好了 nonlocality Letter 的空 `submitted:` 字段）和 `reviews/`（保密）都被硬排除。前者若计入会显著增大分母、并至少增加一条元数据类（C3）检出。这是协议自己造成的偏差，不是扫描误差。

**(iv) 两条客观检出的"产物"是 AI 写的记录，不是研究本身。** E12 和 E14 检的是 wiki 记录（其中 E14 检的正是 Claude 当天写入的捏造）。它们符合预注册的"数值结果"定义，但把它们和 E10（真实的物理收敛缺陷）并列，会让"跨模型审计检出研究缺陷"读起来比实情强。**诚实的拆分是：14 个事件中，检出对象是研究产物本身的客观检出为 3 条（E3, E5, E10），检出对象是 AI 生成记录的为 2 条（E12 计叙述性、E14 计客观）。若只算前者，分子 = 4（E3, E5, E10, E13），仍 ≥ 3，失败条件仍不触发。**

**(v) 单条事件的边界是我划的，不是协议划的。** E10 的"六轮审计"内部至少含三个可独立成条的发现（陈旧 Sn 数字、收敛缺陷、Igo 因子 10⁵→50），我按"一次针对一个产物的检查 = 一个事件"合成一条，这压低了分子。E1/E2 相反，我把同一轮评审里"被采纳的 3 个数学缺口"和"被否决的 post-form 建议"拆成两条，这抬高了分母。两处都是判断，换一种划法计数会变。

**(vi) E8（FUSION Phase 0）是边界纳入。** 它更像"用研究产物当测试用例评测模型"，而不是"用模型审计研究产物"。剔除它，分母变 13、率变 5/13 = 38%，结论不变。已在表内保留并标注。

**(vii) 未扫描 `~/research-wiki/`（文献 wiki）。** 预注册第 1 节把两个 wiki 都算进分母，本次任务只指定了 personal wiki。文献 wiki 至少有 BiLNN 条目（E14 的同批订正也落在那里）会贡献事件。**按预注册的字面定义，本次分母是不完整的。**

**(viii) 不存在负例记录。** wiki 里没有"某次交叉验证提了 N 条意见，全部无效"的完整记录（E2 是唯一被明确记下的否决意见，且只有一条）。这可能是因为无效意见根本不值得写。所以"提出但被否决"这一格在真实分布里几乎肯定不是 1 条。

---

*报告生成于 2026-07-20。所有引用均来自 `~/research-wiki-personal/` 中非保密文件；`reviews/`、`*.private.md`、`lint-reports/` 未被打开。*
