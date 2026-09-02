# 复旦报告 · 核物理需要什么样的 agent

2026-09-08，45 分钟 + 提问。主线是 agent，FUSION 是证据。22 页正文 + 4 页备用，每页末尾的注释块是讲稿（中心信息、讲什么、时间、转场）。

| 文件 | 内容 |
|---|---|
| `slides.md` | 全部页面和讲稿 |
| `style.css` | 亮底 Apple 风 liquid glass：近白底上漂移的等离子蓝 `#52b7ff` 和核心橙 `#ffa028` 彩晕，白色磨砂玻璃卡（CSS 层：blur + saturate，内阴影当倒角，不画白边），深色字 |
| `components/LiquidGlass.vue` | 封面用的 WebGL2 双界面折射玻璃（liquid-glass skill 模板改的），只在浏览器里动，PDF 里是静态 |
| `global-bottom.vue` | 页码，正文 22 页才显示 |
| `OUTLINE.md` | 提纲、中心信息、写作硬规则、数字口径 |
| `figures/` | 语料地图、KD02 对 EXFOR 图 |
| `shots/` | 每页的 PNG 导出，改完页面后重新导出 |
| `fusion-fudan.pdf` | PDF 导出（玻璃效果和背景漂移在 PDF 里是静态的） |

`node_modules` 是指向 `~/code/slidev/node_modules` 的符号链接（项目目录在 Nextcloud 里，不放依赖树）。

## 用法

```bash
cd ~/Desktop/code/fusion-talk/fudan
slidev slides.md --open              # 预览
slidev slides.md --presenter         # 演讲者模式，左屏幻灯右屏讲稿
slidev export slides.md --output fusion-fudan.pdf
slidev export slides.md --format png --output shots
```

现场用浏览器放 Slidev 本身，不要放 PDF：玻璃折射和背景漂移只在浏览器里有。

## 结构和时间

| 段 | 页 | 时间 |
|---|---|---|
| 一、什么是 agent（循环、软件界的现状、能力 = 模型 × 工具和知识） | 1-4 | 0:00-8:00 |
| 二、核物理的 agent 长什么样（七步拆开、通用 agent 的 22%、三样东西、FUSION 总览） | 5-8 | 8:00-16:00 |
| 三、文献（怎么放、地图、**演示一**、两条边界） | 9-12 | 16:00-24:30 |
| 四、程序（FRESCO 技能原文、覆盖、**演示二**、四层检查、基准不证明物理） | 13-17 | 24:30-35:30 |
| 五、对研究方式意味着什么（口传经验进仓库、把时间留给判断、还不行的地方、想要的反馈、结尾） | 18-22 | 35:30-44:00 |
| 备用 | 23-26 | 提问用 |

## 两段演示，各 4-5 分钟

**演示一（第 11 页，本地文献检索）**：交给它的原话

> 这篇论文（Abu-Ibrahim 等，PRC 77, 034607）在我们的知识库里是哪一篇？它引了谁，谁引了它？页面里有哪些数字？把原始摘要和机器生成的 Key numbers 分开说。

要点出的三个节点：按 DOI 定位到 `0710.4193`；引它 8 篇、被引 5 篇；原始摘要给出 N=6–16 和 40 AMeV，p+12C 40 MeV σ_R = 432 mb 来自机器生成的 Key numbers，必须回原文核对。模型 API 保持联网，但不调用网络搜索，只查本地文献库。

**演示二（第 15 页）**：交给它的原话

> 算 50 MeV 的 n+⁹⁰Zr 弹性散射，用 KD02 全局光学势，然后跟 EXFOR 上有的实验数据比一下。

要点出的四个节点：参数取自本地 `kd02.f`；它写出 `ap=0`；步长与分波数收敛检查；查 EXFOR 后报告 50 MeV 没有数据。

**两段都必须先录一份剪好的备份**，命名 `public/casts/demo-kb.cast`、`public/casts/demo-n90zr.cast`。现场 30 秒没实质进展就切录屏，不解释，不道歉，不现场调试。

## 数字口径

- **20** = 驱动具体程序的技能；**26** = 全部技能。全场不混用
- 61,167 页 = 61,059 篇论文页 + 108 主题页；地图投影 55,850 篇
- Tier 1 共 14 份，Tier 2 共 6 份
- 第 16 页互检只引 COLOSS 1299.188 / FRESCO 1299.191 这一对；`skills/fresco/SKILL.md` 另有一处同一体系 σ_R = 1301.64017 mb（不同设置，差 0.19%），被问到时要能说清各自条件
