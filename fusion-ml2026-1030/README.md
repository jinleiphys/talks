# Using AI in Research: Lessons from FUSION

第五届机器学习会议培训班，2026-10-30。金磊。90 分钟，中文，kami 风格。

受众：已经用网页 GPT 聊天，但没用过、也不知道为什么要用 agent 的研究生。

当前入口：`slides.md`，34 页正文、3 页备用。上一版（六行 CSV 入门教程）存于 `archive/pre-cases-20261020/`。

## 主线

| 时间 | 页 | 内容 |
|---|---|---|
| 0–10 | 1–5 | 书里的 AI 残留、网页当搬运工、agent 是什么、什么活值得交给它 |
| 10–24 | 6–11 | 三个真实案例：APS 校样、45 条参考文献复核、过时预印本 |
| 24–49 | 12–20 | 现场：Python 方势阱相移；数值对解析通过，换成核子质量照样通过，a_t 才分开 |
| 49–57 | 21–23 | 它错得很像对：eza 空结果、13+4=17 |
| 57–73 | 24–30 | skill：literature-search、现场查库、FUSION、两程序对照查出 bug；权限 |
| 73–90 | 31–34 | 写自己的任务、总结、材料、问答 |

案例都来自 `~/research-wiki-personal/log.md` 及其原始记录（proof_corrections_2026-10-13.txt、4b-IAV reference-audit/RECHECK-2026-09-28.md、arxiv_2407.20737_v3/README_v3.md、FUSION 失败页）。案例 6 暂不公开程序名（对方工作未发表），也不放 ΔR 数字。

## 材料

- `demo/square-well-task/`：现场任务。README（物理设定和常数，故意不写用哪个质量）、PROMPTS（三条提示词和课后实验）、SETUP（Python 版安装与终端入门）、`reference/square_well.py` 及实际输出。
- `demo/square_well.py`：同一参考程序；与 Julia 原版 `demo/square_well.jl` 逐点对照，120 点最大相对差 5e-12。
- `demo/literature/`：literature-search 中文教学节选、演示提示词、2026-10-20 实时 CrossRef 原始记录与 BibTeX。
- `figures/phase-shift-ok.png`、`phase-shift-slip.png`：第 17、18 页的图，由 `demo/plot_phase_shift.py` 生成。
- `demo/intro/`：上一版六行 CSV 任务，已不在正文中。
- `figures/desk/desk.html`：第 3、4 页的书桌图（Colorfigures 引擎 `core.js`），构建为 `public/desk.html`，由 `components/DeskScene.vue` 嵌入，点击推进。网页模式 5 次点击（第 5 次显示聊天窗口能看到的范围），agent 模式 4 次（第 4 次显示 agent 能看到的范围）。导出 PDF 时换成 `public/desk_<mode>_<k>.png`。改图后重建：原构建脚本 `~/Downloads/colorfigures/scripts/build.py` 已不在；`public/desk.html` 中场景脚本与源文件逐行相同，改源文件后把对应的 `<script>` 段拷过去即可。静态图用 playwright 打开 `desk.html?embed=1&still=1&mode=<mode>&k=<k>`（1000×600）重新截取。
- `student-materials.zip`：square-well-task + literature + 讲义 PDF。

## 现场

会前：一个工具登录好；`python3 -c "import numpy, matplotlib"` 通过；准备一份干净的 `square-well-task/` 副本（不含 reference/ 也可以）。

依次发送三条提示词。等待超过 90 秒就切到参考程序，并说明是备课结果：

```bash
python3 reference/square_well.py
```

第 18 页的核子质量版本是讲者构造的反例，不是 AI 的真实回答，讲的时候要说清楚。

## 预览、导出与备份

```bash
npm run dev
npm run present
npm run build
npm run export
npm run handout
```

预览端口 3038；静态讲义 `using-ai-in-research.pdf`；点击展开讲义 `using-ai-in-research-clicks.pdf`。`dist/` 为本地静态构建，没有发布到外网。

`archive/pre-beginner-20261020/` 保存上一次以数值验证为核心的重构；`archive/pre-restructure-20261020/` 保存更早的主稿；`v1_fusion/` 为历史版本，均非当前入口。

具体检查与来源见 `QA.md`。冷读为同一模型家族独立上下文审阅，不是跨模型科学验证。
