# Using AI in Research: Lessons from FUSION

第五届机器学习会议培训班，2026-10-30。金磊。90 分钟，中文，kami 风格。

受众：已经用网页 GPT 聊天，但没用过、也不知道为什么要用 agent 的研究生。

当前入口：`slides.md`，32 页正文、3 页备用。上一版（六行 CSV 入门教程）存于 `archive/pre-cases-20261020/`。

## 主线

| 时间 | 页 | 内容 |
|---|---|---|
| 0–10 | 1–5 | 书里的 AI 残留、网页当搬运工、agent 是什么、什么活值得交给它 |
| 10–24 | 6–11 | 三个真实案例：APS 校样、45 条参考文献复核、过时预印本 |
| 24–49 | 12–17 | 现场演示：Claude Code 加 FUSION skill，一句话算 KD02 p+208Pb 30 MeV 并和 EXFOR 对比；同一句话问网页 AI 作对照 |
| 49–57 | 18–20 | 它错得很像对：eza 空结果、13+4=17 |
| 57–73 | 21–29 | skill：参考文献三轮对照、literature-search、现场查库、FUSION、FUSION 访客地图（嵌入 vibeinscience.com/visitors.html，断网用截图）、两程序对照查出 bug；权限 |
| 73–90 | 30–32 | 写自己的任务、总结、课后材料（提示词网页）、问答 |

案例都来自 `~/research-wiki-personal/log.md` 及其原始记录（proof_corrections_2026-10-13.txt、4b-IAV reference-audit/RECHECK-2026-09-28.md、arxiv_2407.20737_v3/README_v3.md、FUSION 失败页）。案例 6 暂不公开程序名（对方工作未发表），也不放 ΔR 数字。

## 材料

- `demo/fusion-live/runs/`：现场演示的两次预演记录与 DeepSeek 对照（未提交，本机备用）。
- `demo/literature/`：literature-search 中文教学节选、演示提示词、2026-10-20 实时 CrossRef 原始记录与 BibTeX。
- `figures/fusion-live-p208pb.png`：第 16 页的图，第二次预演时 agent 自己画的。
- `demo/intro/`：上一版六行 CSV 任务，已不在正文中。
- `figures/desk/desk.html`：第 3、4 页的书桌图（Colorfigures 引擎 `core.js`），构建为 `public/desk.html`，由 `components/DeskScene.vue` 嵌入，点击推进。网页模式 5 次点击（第 5 次显示聊天窗口能看到的范围），agent 模式 4 次（第 4 次显示 agent 能看到的范围）。导出 PDF 时换成 `public/desk_<mode>_<k>.png`。改图后重建：原构建脚本 `~/Downloads/colorfigures/scripts/build.py` 已不在；`public/desk.html` 中场景脚本与源文件逐行相同，改源文件后把对应的 `<script>` 段拷过去即可。静态图用 playwright 打开 `desk.html?embed=1&still=1&mode=<mode>&k=<k>`（1000×600）重新截取。
- `figures/desk/fde-scene.js`：第 2 页的 FDE 工地动画（同一个 `core.js` 引擎：飞机从上海天际线起飞，FDE 工程师跳伞落到工地，接上云端 AI；约 9 秒一轮；`?u=0..1` 定在某一时刻），构建为 `public/fde.html`（把 `public/desk.html` 里的场景 `<script>` 段换成这个文件的内容），由 `components/FdeScene.vue` 嵌入，静态图 `public/fde_0.png` 用 `fde.html?embed=1&still=1`（1000×600）截取。
- `figures/desk/repo-scene.js`（第 8 页：本地仓库推到 GitHub 和 Overleaf）、`figures/desk/lookup-scene.js`（第 26 页：agent 读 SKILL.md，从 CrossRef 柜子取记录卡，写出三个文件）、`figures/desk/giants-scene.js`（第 28 页：站在巨人的肩膀上，论文按年代垒成塔）：同样的构建方式，输出 `public/repo.html`、`public/lookup.html`、`public/giants.html`，静态图 `public/<名字>_0.png`；`FdeScene.vue` 用 `name` 参数选场景。
- `public/prompts.html`：课上提示词网页（第 13、22 页和课后材料页的二维码指向它）。不再发材料包。

## 现场

会前：Claude Code 登录好；fresco、exfor-data、nature-figure 三个 skill 可用，`fresco` 在 PATH 上；网络能访问 EXFOR（IAEA NDS 和 GitHub 镜像）。

讲到第 13 页停下：切到终端，在空文件夹里启动 `claude`，点页面上的“复制提示词”，粘贴发送。两次预演用了 3 分 43 秒和 10 分 54 秒，两次选的数据和做的检查不同。跑的时候回到第 14、15 页，跑完切回终端看结果。失败或太慢时打开 `demo/fusion-live/runs/` 的预演图和记录，说明是备课结果。

方势阱现场任务已于 2026-10-28 移出正文，材料归档在 `archive/square-well-20261028/`。

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
