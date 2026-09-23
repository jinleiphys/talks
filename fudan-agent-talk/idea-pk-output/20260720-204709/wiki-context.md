# Wiki precheck (literature-wiki query, read-only, 2026-07-20)

Wiki: `~/research-wiki/` — 653 source pages, 221 method pages.

## Read entries (papers / methods already in the user's wiki on this topic)

### (1) 机器学习 + 核物理：覆盖很厚，可直接支撑综述章节

**115 个 source 页**带有 ML / emulator / 贝叶斯 方法标签。按方法页统计已读论文数：

- `bayesian-uq` — **53 篇**（最厚的一条线）
- `neural-network-quantum-states` — 33 篇
- `eigenvector-continuation` — 22 篇
- `reduced-basis-method` — 20 篇
- `gp-emulation` — 19 篇
- `supervised-ml-nuclear-observables` — 15 篇
- `neural-network-emulator` — 11 篇
- `bayesian-omp-uq` — 8 篇（光学势贝叶斯推断，正是稿件 §4.1 案例所在方向）
- `physics-informed-neural-network` — 6 篇
- `neural-pfaffian` — 4；`bayesian-neural-network` — 3；`kolmogorov-arnold-network` — 2；`neural-network-density-functional` — 2；`neural-backflow` — 2
- 单篇页：`complex-energy-rbm-emulator`、`mep-emulator`、`lse-woodbury-emulator`、`neural-scattering-state`、`bayesian-model-discrepancy`、`bayesian-mc-data-evaluation`

相关 synthesis 页（用户已做过跨文献综合，非单篇笔记）：
- `synthesis/ec-vs-pod-galerkin-same-method.md` — EC 与 POD-Galerkin 实为同一方法
- `synthesis/affine-vs-nonaffine-emulation.md`
- `synthesis/dream-vs-ccrbm-complexity.md`
- `synthesis/schur-complement-unification.md`
- `synthesis/aies-fails-high-dim-vs-hmc.md` — 高维下 AIES 失效 vs HMC

**结论：综述里"核物理中的 AI/ML 现状"一节有 100+ 篇已精读文献做底，且已有 5 个跨文献综合页。这一节可以快速、可追溯地写出来，不需要新读文献。**

### (2) LLM / AI agent / AI4Science：wiki 中几乎为空

紧口径检索（large language model / ChemCrow / Coscientist / AI Scientist / retrieval-augmented / GPT-4 / GPT-5）扫 sources + methods + synthesis + entities：

**命中 0 个 source 页。**（唯一一个文件命中是 `synthesis/ec-vs-pod-galerkin-same-method.md`，属附带匹配，与 LLM 无关。）

即：现稿参考文献 11 条里的 RAG[1]、ReAct[2]、Generative Agents[3]、Reflexion[4]、ChemCrow[5]、Coscientist[6]、AI Scientist[7]、Karpathy LLM Wiki[8]、APS AI 政策[11]，**没有一条进过用户的文献 wiki**。这些是为写这篇稿子临时引的，不是长期阅读积累。

**这是本次 stuck-point 最重要的不对称：综述的"核物理 ML"半边有 100+ 篇已读支撑，"LLM 智能体"半边是 0。任何要求大幅扩充 AI-agent 侧文献的方案，成本要按"从零精读几十篇"估，不能按"整理已读"估。**

### (3) wiki 中已记录的、与本 stuck-point 相关的矛盾 / 未决问题

`debates/` 目录只有 3 个页，均为核反应物理争议，与本 stuck-point 无关：
- `post-prior-controversy.md`
- `12c-12c-thm-fusion-rate-controversy.md`
- `core-destruction-binding-energy-dependence.md`

**wiki 未记录任何关于"AI 智能体在科研中的效果 / 评价方法 / 体裁定位"的争议或未决问题。** 该主题在用户的文献体系里是空白区，没有已读文献可用来支撑或反驳稿件中的规范性主张（如"本地词法未命中不是新颖性证明"、"自我引用式确信"）。这些主张目前是纯经验断言，无文献锚点。

## 对候选方案的直接约束

- 任何"扩充 AI-agent 文献综述"的候选，须按 0 基础计价。
- 任何"用已读文献支撑核物理 ML 现状章节"的候选，可按已有资产计价，成本低。
- 任何"引用已有研究证明知识库有效"的候选，wiki 里没有这类文献，站不住。
