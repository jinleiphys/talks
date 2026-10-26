# Using AI in Research: Lessons from FUSION

第五届机器学习会议培训班，2026-10-30。金磊。90 分钟，中文，kami 风格。

受众：已经用网页 GPT 聊天，但不了解为什么需要 Codex、Claude Code、OpenCode 的核物理研究生。正文不以数值验证知识为前提。

当前入口：`slides.md`，33 页正文、4 页备用。

## 学习主线

| 时间 | 内容 | 学生应该理解或完成什么 |
|---|---|---|
| 0–12 分钟 | 新闻截图、编造引用、复制粘贴循环 | 为什么需要实际操作和查询 |
| 12–28 分钟 | 六行数据任务、智能体、产品入口 | 为什么用、什么时候用 |
| 28–43 分钟 | 文件夹、安装登录、终端、两条提示词 | 第一次怎样开始 |
| 43–58 分钟 | 看输出、继续改、处理报错、检查 | 从实际文件判断任务是否完成 |
| 58–68 分钟 | 改写任务、权限 | 写清步骤和输出 |
| 68–76 分钟 | literature-search 技能文件、实际查库、生成引用 | 把查文献经验写成可复用规程 |
| 76–78 分钟 | FUSION | 将同样思路用于核物理程序 |
| 78–87 分钟 | 自己的第一份任务、总结、资料 | 带走可以开始执行的小任务 |
| 87–90 分钟 | 问答 | 解决入门障碍 |

核心 takeaway：需要讨论时继续聊；需要反复操作文件和运行程序时，可以让智能体接手操作；完成后打开最终文件检查。

网页、桌面、终端是入口，不与智能体能力绝对对立。软件、模型访问、本地运行环境要分别确认。

## 材料

- `figures/chat-residue-news.png`：用户提供的文章截图，原样保存；第 2 页用 CSS 展示标题和书页局部，点击后显示讨论结论。
- `demo/literature/`：literature-search 中文教学节选、演示任务、本次实时 CrossRef 原始记录与 BibTeX。
- `demo/intro/`：当前入门任务的说明、六行数据、提示词、安装入口、练习单、Julia 参考实现和输出。
- `student-materials.zip`：可直接随课程发放的学生包，含本讲义、`demo/intro/` 内容与 `literature/` 案例，解压后的根目录即工作目录。
- `demo/square_well.jl` 与相关材料：进阶数值案例，仅用于备用页或后续课程。

## 现场

会前准备一个练习副本，安装并登录一个工具，确认 Julia 可执行。正文演示只使用六行数据表。先发送只读提示词，再发送执行任务，最后追加筛选要求。

等待超过 60 秒就切换到参考实现，明确告诉学生这是备课回退，不伪装成现场 AI 响应。进入学生包解压目录执行：

```bash
julia reference/summarize.jl data/input.csv results
julia reference/summarize.jl data/input.csv results 10
```

第二条增加筛选表，已有 comparison/summary 的内容保持一致。图形界面用户直接选目录；终端用户看 `SETUP.md` 的路径说明。

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
