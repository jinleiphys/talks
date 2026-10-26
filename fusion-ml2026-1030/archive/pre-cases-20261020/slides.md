---
theme: seriph
title: 'Using AI in Research: Lessons from FUSION'
titleTemplate: '%s · 金磊'
info: '给仍在聊天窗口里使用 AI 的研究生：为什么用编程智能体，什么时候用，第一次怎么开始。'
author: '金磊 Jin Lei'
lang: zh-CN
background: none
transition: fade
comark: true
duration: 90min
timer: countdown
exportFilename: using-ai-in-research
fonts:
  provider: none
  sans: 'Inter, PingFang SC'
  serif: 'Newsreader, Source Serif 4, Songti SC, Georgia'
  mono: 'SF Mono, Menlo, Consolas'
drawings:
  persist: false
layout: cover
---

<div class="cover-main">
<div class="kicker">第五届机器学习会议培训班 · 2026.10.30</div>
<h1>Using AI in Research:<span class="h1-sub">Lessons from FUSION</span></h1>
<div class="byline">金磊 · Jin Lei</div>
<div class="affiliation">同济大学物理系</div>
</div>
<div class="cover-side">
<LiveOnly><HeroNucleus /></LiveOnly>
<div class="signoff"><div class="ui-label">YOUR FIRST AGENT TASK</div><div class="slip-title">让 AI 帮你处理文件</div><div class="row"><span>为什么要用这些软件？</span><span>①</span></div><div class="row"><span>哪些操作可以交给它？</span><span>②</span></div><div class="row"><span>第一次怎么用？</span><span>③</span></div></div>
</div>

<!--
Central message: 本课从网页聊天的使用经验出发，带学生完成第一次文件任务。
图示说明：右侧三个问题是今天的学习目标，核图案仅为学科背景。
讲述：有多少同学用过网页上的 GPT？有多少同学让它直接改过电脑里的文件、运行过程序？今天就从这里开始。没有装软件也可以先跟着看，练习用纸笔就能做。
Timing target: 0:00–1:00，1 分钟。
Transition: 先看这张截图。
-->

---
class: news-example
clicks: 1
---

# 哪句话不该出现在书里？
<div class="subtitle">A chat reply made its way into the finished text</div>

<div class="news-heading"><img src="./figures/chat-residue-news.png" alt="用户提供的文章截图标题：纸质书中出现 AI 提示词" /></div>
<div class="news-detail"><img src="./figures/chat-residue-news.png" alt="书页截图中残留：需要我再微调部分语句，让整体文风更贴合悬疑灵异的氛围吗？" /></div>
<div v-click="1" class="bottom-line">“需要我再微调部分语句……”是对用户说的话，却进入了正文。</div>

<!--
Central message: 聊天回答中可能混有不属于最终作品的内容。
图示说明：上方为截图标题，下方放大同一截图中的书页；原图保留在 figures/chat-residue-news.png，没有改写内容。
讲述：［停 20 秒，让学生找。］这句话是 AI 问用户的，怎么进了正文？复制回答时，正文和附加说明可能混在一起。这里先不展开新闻的其他细节；换成智能体，也仍然需要检查最后的文件。
Timing target: 1:00–4:00，3 分钟。
Transition: 写代码也有类似的来回复制。
-->

---

# 复制之前，先把多余的话删掉
<div class="subtitle">An answer still has to become a usable file</div>

<div class="three">
<div class="kami-card"><h3><span class="num">01</span>挑出内容</h3><p>哪些属于正文？<br>哪些只是对话说明？</p></div>
<div class="kami-card"><h3><span class="num">02</span>放进文件</h3><p>复制、保存、排版，<br>放到正确的位置。</p></div>
<div class="kami-card"><h3><span class="num">03</span>打开检查</h3><p>最后交出去的文件，<br>是否符合要求？</p></div>
</div>


<!--
Central message: 从回答到交付物之间存在一段实际的操作过程。
图示说明：三个阶段分别为选择内容、文件操作和最终检查。
讲述：让它改一段文字，拿到回答以后，我们还得挑出要用的部分，放进文件，检查一下。只改一句话，这样很方便。任务一多，这些操作就会花时间。
Timing target: 4:00–5:00，1 分钟。
Transition: 有些错误，光把多余的话删掉还不够。
-->

---

# AI 会编参考文献，能不能让它按规程查？
<div class="subtitle">From a recurring mistake to a reusable skill</div>

<div class="two">
<div class="kami-card"><h3>它可能编得很像</h3><p>作者、题目、期刊、年份、DOI，<br>每一项都有，整篇论文却找不到。</p><p>也可能论文是真的，<br>但根本没有支持它所说的结论。</p></div>
<div class="kami-card"><h3>我把查文献的步骤写成了 skill</h3><p><b>literature-search</b></p><p>先调用数据库，拿到原始记录。<br>核对题目、作者、年份。<br>只用查到的字段生成引用。</p><p>查不到就报告缺项，不往下编。</p></div>
</div>

<div class="bottom-line">后面打开这个 skill，看它怎样把“帮我查文献”变成一次实际检索。</div>

<!--
Central message: 反复遇到的错误可以变成技能中的具体流程和停止条件。
图示说明：左侧提出问题，右侧预告后面展开的 literature-search 案例。
讲述：参考文献编得很像，作者、期刊、DOI 都有，论文却可能不存在。我平时用一个叫 literature-search 的 skill，让智能体先调用数据库，把记录取回来，再生成引用。查不到的字段就留下来，不能靠记忆补齐。后面我们打开文件，看看这些规矩怎么写、工具怎么调。这里也留一个区别：查到论文确实存在，还不等于论文支持你想写的结论。
Timing target: 5:00–7:00，2 分钟。
Transition: 再看写代码时，我们怎样在聊天窗口和电脑之间来回操作。
-->

---

# 写代码时，我们常这样来回复制
<div class="subtitle">Copy code, run it, paste the error, repeat</div>

<div class="handoff-loop">
<div><span>AI</span><b>给一段代码</b><small>聊天窗口</small></div>
<div><span>你</span><b>复制、保存、运行</b><small>电脑上的文件</small></div>
<div><span>你</span><b>把报错贴回去</b><small>回到聊天窗口</small></div>
<div><span>AI</span><b>给修改版</b><small>再来一次</small></div>
</div>
<div class="kami-card lesson-strip"><p>文件多了，还得补充：在哪个目录？哪个版本？谁调用谁？</p></div>


<!--
Central message: 只传递代码文本时，人承担了文件操作和反馈传递。
图示说明：四格按顺序连接，最后回到保存运行，表示反复循环。
讲述：写代码时也类似：复制，保存，运行，报错，再贴回去。大家最近有没有这样改过程序？［请一位学生讲一次经历。］文件多了，还要告诉它哪个版本、哪个目录、谁调用谁。这里说的是手动复制代码的用法，有些网页工具也能直接运行。
Timing target: 7:00–9:00，2 分钟。
Transition: 这些操作能不能也交给它？
-->

---

# 让它自己保存、运行、看报错
<div class="subtitle">The change is access to tools and feedback</div>

<div class="two">
<div class="kami-card"><h3>自己运行</h3><p>AI 生成文本。</p><p>你保存、运行，转述结果。</p></div>
<div class="kami-card"><h3>让 AI 运行</h3><p>AI 通过工具读取和修改文件。</p><p>调用程序，读取输出，继续处理。</p></div>
</div>

<div class="source">能力示例见 <a href="https://learn.chatgpt.com/docs/codex/cli">Codex CLI 官方文档</a>。可执行范围取决于当前环境、工具和权限。</div>

<!--
Central message: 编程智能体把语言模型与实际操作和反馈连接起来。
图示说明：对比的是两种工作方式，不是界面外观。
讲述：能不能让它直接读文件、改文件、运行，再自己看到报错？这就是编程智能体能帮忙的地方。要做到这些，得给它相应的工具和权限。装软件本身并不保证模型更聪明，也不保证算得更对。
Timing target: 9:00–12:00，3 分钟。
Transition: 用一张小表试一下。
-->

---

# 试一下：处理这张六行数据表
<div class="subtitle">Example: a six-row data table</div>

<div class="two">
<div>

```csv
E_MeV,calc_deg,ref_deg
0.1,165.1048,165.1075
1.0,136.9283,136.9342
5.0,103.2185,103.2238
10.0,86.5518,86.5556
20.0,68.6480,68.6500
50.0,43.1032,43.1033
```

</div>
<div class="kami-card"><h3>要得到什么</h3><p>增加一列：两列数的绝对差。</p><p>报告最大差及对应能量。</p><p>保存成新表和一段结果说明。</p></div>
</div>
<div class="source">CSV 是逗号分隔的数据表。E_MeV：能量；calc_deg / ref_deg：以度为单位的计算值 / 参考值。数据来自已有方势阱输出，本课此处只做表格处理。</div>

<!--
Central message: 一个简单文件任务就足以展示编程智能体的作用。
图示说明：左边是实际输入的六行数据，右边明确三个交付目标。
讲述：先用这六行数据试一下。三列分别是能量、计算值、参考值。我们只算两列之差，找最大值，保存结果。10 MeV 这一行，大家可以先减一下，差大约 0.0038 度。
Timing target: 12:00–15:00，3 分钟。
Transition: 同一个任务，可以有两种问法。
-->

---

# “给我代码”和“替我完成”差在哪？
<div class="subtitle">Code and output files</div>

<div class="two">
<div class="kami-card"><h3>给我一段处理代码</h3><p>得到程序文本。</p><p>你负责保存文件、找到输入、运行。</p><p>你再处理报错和结果文件。</p></div>
<div class="kami-card"><h3>在这个目录完成任务</h3><p>读取实际的 data/input.csv。</p><p>保存程序并执行。</p><p>保存新表，写清结果和运行命令。</p></div>
</div>


<!--
Central message: 任务的交付应从代码文本扩展到可用的实际文件。
图示说明：两栏对应不同的任务边界。
讲述：左边这句话会让它给出一段代码，接下来还要你保存、运行。右边要求它在这个目录里把事情做完，所以我们要看到新表、说明和运行命令。同一个模型，能调用的工具不同，能做的事也不同。
Timing target: 15:00–18:00，3 分钟。
Transition: 这就要用到工具和运行反馈。
-->

---
clicks: 4
class: scene-slide
---

# 智能体怎样完成这个任务
<div class="subtitle">Agent = a model working with tools and feedback</div>

<div class="scene-definitions">智能体（agent）：通过工具执行操作，读取结果，再决定下一步的 AI 系统。</div>
<LiveOnly><StepScene mode="agent" :step="$clicks" :height="300" /></LiveOnly>

<!--
Central message: 智能体的关键是执行与反馈循环。
图示说明：五次状态依次为理解任务、调用工具、读取输出、修改、保存交付物；连线表示操作依赖。
讲述：［按点击逐步讲。］模型先决定要做什么，工具去执行，运行结果再传回来。有报错，就根据报错修改；做完，把文件留下来。这里的 LLM 就是大语言模型。
Timing target: 18:00–21:00，3 分钟。
Transition: 这里有几个名字需要分开。
-->

---

# 模型、软件、运行环境各做什么
<div class="subtitle">Model · agent software · working environment</div>

<div class="three">
<div class="kami-card"><h3>模型</h3><p>理解任务，生成内容，<br>提出下一步操作。</p><p>例如 GPT、Claude 模型。</p></div>
<div class="kami-card"><h3>智能体软件</h3><p>连接模型和工具，<br>显示做了什么、结果如何。</p><p>例如 Codex、Claude Code、OpenCode。</p></div>
<div class="kami-card"><h3>工作环境</h3><p>文件、目录、程序，<br>以及允许执行的操作。</p><p>例如本课练习文件夹。</p></div>
</div>
<div class="bottom-line">软件能打开，还要能连上模型；运行今天的程序还需要 Julia。</div>

<!--
Central message: 模型、智能体软件和运行环境承担不同角色。
图示说明：三个卡片解释三个最常混淆的名词。
讲述：这三个名字容易混。GPT、Claude 是模型；Codex、Claude Code、OpenCode 是使用模型来做事的软件；文件和 Julia 这些程序，是它工作的环境。有些产品名称会覆盖几层功能，这里先按作用分开。
Timing target: 21:00–23:00，2 分钟。
Transition: 再看三个常见软件。
-->

---

# Codex、Claude Code、OpenCode 是什么？
<div class="subtitle">Codex · Claude Code · OpenCode</div>

| 软件 | 入门时先知道这一点 | 官方入口 |
|---|---|---|
| Codex | 可在项目里检查、编辑文件并运行命令 | <a href="https://learn.chatgpt.com/docs/codex/cli">Codex CLI</a> |
| Claude Code | 可从项目目录开始，读取代码并完成修改 | <a href="https://code.claude.com/docs/en/quickstart">Quickstart</a> |
| OpenCode | 开源智能体软件，可配置模型服务 | <a href="https://opencode.ai/docs/">Documentation</a> |

<div class="note-line">先选一个你能登录、能正常使用的工具，完成同一个小任务。</div>
<div class="bottom-line">网页也能使用工具。要看当前软件能读哪些文件、执行哪些操作。</div>
<div class="source">以上按各家官方文档核对；入口、账号与安装方式可能更新，课后使用时打开对应文档。</div>

<!--
Central message: 产品提供了工作入口，但入门方法可以迁移。
图示说明：三个官方入口用于课后安装和登录，不列易过期的价格、模型排行榜或免费额度。
讲述：这三个都可以从项目目录开始做事。先选一个能登录、能用的就行。终端只是输入命令的窗口，网页和桌面也可能提供同样的工具。不要按窗口长什么样，判断它能不能操作文件。
Timing target: 23:00–26:00，3 分钟。
Transition: 什么任务需要这么做？
-->

---

# 哪些任务值得这样做？
<div class="subtitle">Choose a workflow for the task</div>

| 你要做的事 | 通常需要什么 |
|---|---|
| 理解概念、讨论思路、改一句话 | 一段对话就能完成 |
| 处理一份已上传的表格 | 能读取表格、生成文件的工具 |
| 在项目中改代码、运行、处理报错 | 文件访问和执行反馈循环 |
| 连续处理一批文件，并保留输出 | 指定目录，批量处理，保存输出 |



<!--
Central message: 是否需要智能体取决于任务中的操作和反馈量。
图示说明：表格按任务需求分层，不按产品评优。
讲述：问个概念、讨论个思路，继续聊天就够了。今天这张小表，带数据工具的网页也能处理。项目里如果有好几个文件，需要反复修改、运行，把整个目录交给它会更方便。
Timing target: 26:00–28:00，2 分钟。
Transition: 我们从文件夹开始。
-->

---

# 准备一个练习文件夹
<div class="subtitle">A project can start as one folder</div>

<div class="two">
<div>

```text
ai-first-task/
  README.md
  data/
    input.csv
```

</div>
<div class="kami-card"><h3>这就是今天的“项目”</h3><p>README.md：说明任务和列含义。</p><p>data/input.csv：原始数据。</p><p>后续新文件也保存在这个目录里。</p></div>
</div>
<div class="bottom-line">先复制一份练习材料；data/ 里的原始数据不改。</div>

<!--
Central message: 明确工作目录能让人和智能体指向同一组文件。
图示说明：文件树表示课堂材料包的根目录，斜杠表示文件夹。
讲述：先建一个练习文件夹，把数据放进去。README.md 是说明文件，md 是普通的 Markdown 文本；input.csv 是原始数据。材料包还有 reference 目录，里面放备用程序，先不用看。先在副本里练，实际能访问哪里还要看软件权限。
Timing target: 28:00–31:00，3 分钟。
Transition: 再检查一下运行环境。
-->

---

# 开始前，检查软件、账号和 Julia
<div class="subtitle">Setup checks before the first task</div>

<div class="three">
<div class="kami-card"><h3><span class="num">01</span>启动软件</h3><p>按官方文档安装。<br>能正常打开界面。</p></div>
<div class="kami-card"><h3><span class="num">02</span>登录或连接</h3><p>完成账号或模型服务设置。<br>先确认能收到回答。</p></div>
<div class="kami-card"><h3><span class="num">03</span>运行环境</h3><p>Julia：本课的编程语言。</p><p>终端输入<br><code class="setup-code">julia --version</code><br>出现版本号即可。</p></div>
</div>
<div class="bottom-line">现场使用装好的环境。课后安装看 SETUP.md。</div>

<!--
Central message: 初次失败应先区分软件、模型访问和运行环境问题。
图示说明：三个检查分别对应软件启动、认证连接和本地解释器。
讲述：软件打开了，未必已经连上模型；模型能回答了，也未必能运行 Julia。这三项分开检查。今天用已经准备好的环境，不现场同时装三套软件。API key 是访问模型服务的凭据，只在认证流程里填写，不要放进共享文件。
Timing target: 31:00–34:00，3 分钟。
Transition: 看终端里怎么启动。
-->

---

# 在练习目录里启动工具
<div class="subtitle">Terminal: a window where you type commands</div>
<div class="scene-definitions">macOS：打开“终端”；Windows：开始菜单搜索 PowerShell。路径获取步骤见材料包 SETUP.md。</div>

<div class="two">
<div>

```bash
cd "你的练习目录的完整路径"
claude
```

<p class="terminal-note">第二行三选一：<br><code>claude</code> / <code>codex</code> / <code>opencode</code></p>

</div>
<div class="kami-card"><h3>每行在做什么？</h3><p>cd：切换到练习目录。<br>输入 <code>pwd</code>，查看当前位置。</p><p>第二行：启动已经装好的软件。</p><p>进入对话后，直接用中文交代任务。</p></div>
</div>
<div class="bottom-line">路径要换成自己的实际路径；看到工作目录后再发任务。</div>
<div class="source">启动示例：<a href="https://code.claude.com/docs/en/quickstart">Claude Code</a>、<a href="https://learn.chatgpt.com/docs/codex/cli">Codex CLI</a>、<a href="https://opencode.ai/docs/">OpenCode</a> 官方文档。图形界面则选中同一练习文件夹。</div>

<!--
Central message: 终端启动的核心动作是确定目录并进入工具会话。
图示说明：左侧两行命令，右侧逐行解释；路径是占位说明，不是可以原样粘贴的真实路径。
讲述：［演示打开终端。］cd 是切换目录，后面写自己的完整路径。用 pwd 看一下当前在哪，再启动已经安装的工具。Mac 和 Windows 的路径写法不同，SETUP.md 里有例子。用图形界面就选同一个文件夹。首次启动可能还要登录。
Timing target: 34:00–37:00，3 分钟。
Transition: 进入工具后，先发这条消息。
-->

---

# 先让它读文件
<div class="subtitle">Start by inspecting the project</div>

<div class="kami-card task-brief lesson-prompt" data-label="PROMPT 1 · 可以直接复制">
请读取 README.md 和 data/input.csv。<br>
告诉我这张表有多少行，三列各是什么意思。<br>
列出你准备怎样完成任务。<br>
现在先不修改文件，也不运行程序。
</div>
<div class="note-line">看它是否读取了实际文件，是否引用了正确的列名和行数。</div>
<div class="bottom-line">核对它读到的文件名、列名和行数。</div>

<!--
Central message: 第一次对话可以先确认文件理解，而不立即修改。
图示说明：可复制提示词只要求读取两份指定材料。
讲述：第一句话先让它看文件。它应该说得出实际列名和行数。如果只泛泛解释什么是 CSV，就追问它到底读了哪个路径。［发送提示词，指给学生看文件读取记录。］
Timing target: 37:00–40:00，3 分钟。
Transition: 确认读对文件，再执行。
-->

---

# 再让它写程序、运行、保存结果
<div class="subtitle">Ask for files and a completed run</div>

<div class="kami-card task-brief lesson-prompt" data-label="PROMPT 2 · 可以直接复制">
用 Julia 读取 data/input.csv，计算 |calc_deg − ref_deg|。<br>
把程序保存为 summarize.jl，并实际运行。<br>
把逐行结果保存到 results/comparison.csv，<br>
把行数、最大差及对应 E 保存到 results/summary.txt。<br>
不改原始数据；完成后告诉我运行命令和输出位置。
</div>
<div class="bottom-line">缺少 Julia 时，让它先报告；没运行就不能说已经算完。</div>

<!--
Central message: 交代路径、操作和交付，能把问答变成可执行任务。
图示说明：提示词沿用实际列名，绝对值符号只表示两列相减取绝对值。
讲述：看对文件了，再让它写程序、运行、保存结果。这里写清输入和输出路径，也要求它告诉我们怎么运行。缺 Julia 就先报告，不能没跑就说算完。这个小程序不需要第三方包。
Timing target: 40:00–43:00，3 分钟。
Transition: 现在打开目录看结果。
-->

---

# 打开文件夹，看它做完了没有
<div class="subtitle">Live demo · open the folder and the output</div>

<div class="two">
<div>

```text
ai-first-task/
  data/input.csv
  summarize.jl
  results/
    comparison.csv
    summary.txt
```

</div>
<div class="kami-card"><h3>参考结果</h3><p>输入：6 行</p><p>最大绝对差：0.0059°</p><p>对应 E：1.0 MeV</p><p>10 MeV 这一行：0.0038°</p></div>
</div>
<div class="bottom-line">另开终端，进入练习目录，用它给出的完整命令再算一次。</div>
<div class="source">参考值已由 reference/summarize.jl 实际计算。无网络时用该程序回退，明确说明它是备课参考实现。图中目录为现场成功交付应有的结构。</div>

<!--
Central message: 任务完成以实际文件和运行结果为证据。
图示说明：左侧是目标目录结构，右侧数字来自实际六行输入的处理。
讲述：［等待最多 60 秒。未完成则明确说：切到备课参考程序。］打开 results，看里面两份文件。表里应该有六行，最大差在 1 MeV。请大家找 10 MeV 那一行，核对是不是 0.0038 度。再用它给出的完整命令运行一次。离线命令见材料包。
Timing target: 43:00–47:00，4 分钟。
Transition: 回头看刚才谁做了哪些事。
-->

---

# 刚才哪些操作由它完成了？
<div class="subtitle">What the agent took over</div>

| 原来的动作 | 这次交给工具执行 | 你现在看什么 |
|---|---|---|
| 复制代码到编辑器 | 保存 summarize.jl | 新文件与改动内容 |
| 自己运行再贴结果 | 执行并读取输出 | 实际运行命令和记录 |
| 手动整理结果 | 写入 results/ | 表格和结果说明 |
| 换个要求再复制一遍 | 在现有文件上继续改 | 修改是否符合新要求 |

<div class="bottom-line">你还要说明要求、查看修改，并核对结果。</div>

<!--
Central message: 智能体改变了人与工具之间的分工。
图示说明：逐行对应开场的复制粘贴循环，右列明确人仍需做的检查。
讲述：刚才保存代码、执行、读取输出、写结果文件，这些都由工具做了。我们还要说明要求、查看它改了什么，并核对结果。你自己的课题里，哪一步最经常来回复制？
Timing target: 47:00–50:00，3 分钟。
Transition: 继续加一个筛选要求。
-->

---

# 接着改：只保留 E ≥ 10 的行
<div class="subtitle">Continue the task instead of starting from a new code block</div>

<div class="kami-card task-brief lesson-prompt" data-label="PROMPT 3 · 后续修改">
继续修改现有的 summarize.jl。<br>
保持原有两份输出的内容，另外生成 results/high_energy.csv，<br>
只收录 E_MeV ≥ 10 的行，仍保留绝对差列。<br>
重新运行，告诉我新增文件有几行，以及改了哪些地方。
</div>
<div class="note-line">本表应选出 10、20、50 MeV 三行。这是新的筛选要求，不改变原始数据。</div>


<!--
Central message: 多轮任务可以围绕已有项目增量修改。
图示说明：后续提示词明确保留已有交付，只新增筛选表。
讲述：现在加一个要求：只要 E 大于等于 10 的行。让它继续改刚才的程序，不用再复制一份新代码。原来的两份输出内容不变，另外增加筛选表。［有时间就现场继续；否则让学生数出 10、20、50 三行。］备用程序也能做这个筛选，材料包有命令。
Timing target: 50:00–53:00，3 分钟。
Transition: 运行报错时怎么查？
-->

---

# 找不到文件，先查目录和路径
<div class="subtitle">Use the files and the error message as evidence</div>

<div class="two">
<div class="kami-card"><h3>常见情况</h3><p>找不到输入文件。</p><p>当前目录不对。</p><p>电脑没有所需运行程序。</p></div>
<div class="kami-card"><h3>你可以这样追问</h3><p>先确认当前目录和实际文件路径。</p><p>解释这条报错指向哪里。</p><p>只修复相关问题，再运行一次。</p></div>
</div>
<div class="bottom-line">缺少 Julia 要处理运行环境；找不到文件要查路径。</div>

<!--
Central message: 错误处理应利用当前环境中的真实证据。
图示说明：左边为教学情境，不是伪造的真实报错截图；右边为追问方式。
讲述：找不到文件，先看当前目录和实际路径。缺少 Julia，处理的是运行环境。不要让它为了跑通，另编一份输入数据。如果需要安装东西，先说明缺什么，再决定装在哪里。
Timing target: 53:00–55:00，2 分钟。
Transition: 做完后检查这几处。
-->

---

# 文件有了，再检查一下
<div class="subtitle">Open the files and check the results</div>

<div class="three">
<div class="kami-card"><h3><span class="num">01</span>看文件</h3><p>结果有没有生成？<br>原始数据有没有被改？</p></div>
<div class="kami-card"><h3><span class="num">02</span>算一行</h3><p>10 MeV：<br>|86.5518 − 86.5556|<br>≈ 0.0038°</p></div>
<div class="kami-card"><h3><span class="num">03</span>再运行</h3><p>另开终端，进入练习目录，<br>执行它给出的命令。</p></div>
</div>


<!--
Central message: 最终检查对象应该是实际交付物。
图示说明：三项检查均可在六行数据例子上完成。
讲述：先打开文件，核对原始数据没被改，再手算一行。接着用它给出的命令重跑。这只是今天这个小任务的检查。做物理计算时，单位、质量、边界条件和模型本身还得另外核对，备用页有例子。
Timing target: 55:00–58:00，3 分钟。
Transition: 大家试着写一条要求。
-->

---

# 练习：这条要求还缺什么？
<div class="subtitle">2 分钟自己写，2 分钟和同桌比较</div>

<div class="kami-card lesson-focus"><p>原要求：<br><b>“帮我写个程序，把这张表中 E ≥ 10 的行挑出来。”</b></p></div>
<div class="lesson-choices"><p>补上：输入在哪？修改哪个文件？输出在哪？</p><p>再补：需要实际运行吗？什么不能改？完成后交什么？</p></div>
<div class="bottom-line">写完交给旁边的同学，看看他能不能照着做。</div>

<!--
Central message: 学生能把要求从代码文本扩展为一个有交付物的任务。
图示说明：原要求故意省略路径、执行和边界。
讲述：这条要求还缺了什么？用两分钟补全，然后交给旁边同学看两分钟。他能不能知道读哪张表、改什么、把结果放在哪？［先留时间，不提前翻答案。］
Timing target: 58:00–62:00，4 分钟。
Transition: 看一下这份写法。
-->

---

# 可以这样补全
<div class="subtitle">One complete example</div>

<div class="kami-card task-brief lesson-prompt" data-label="WORKED ANSWER">
<b>输入文件：</b>读取 data/input.csv，列含义见 README.md。<br>
<b>怎么处理：</b>修改现有 summarize.jl，另存 E_MeV ≥ 10 的三行。<br>
<b>不要改：</b>不改原始数据；原有两份输出的内容保持不变。<br>
<b>做完以后：</b>实际运行，生成 results/high_energy.csv，<br>
并告诉我运行命令、行数和修改内容。
</div>


<!--
Central message: 一份够用的任务说明由四个具体部分组成。
图示说明：四句答案对应练习缺少的内容。
讲述：可以补成这样：输入在哪里，要改哪个程序，哪些文件不动，做完保存什么。这里说三行，是因为我们已经看过输入。未知的研究结果不能先替它规定好。［让学生修订自己的要求。］
Timing target: 62:00–65:00，3 分钟。
Transition: 执行前，还会遇到权限提示。
-->

---

# 授权之前，看看它准备做什么
<div class="subtitle">Permissions belong to the task</div>

<div class="two">
<div class="kami-card"><h3>这次任务需要</h3><p>读取练习目录中的说明和数据。</p><p>写程序与结果文件。</p><p>运行本地数据处理程序。</p></div>
<div class="kami-card"><h3>这次任务不需要</h3><p>修改原始数据，清空别的目录。</p><p>读取与练习无关的私人文件。</p><p>把账号凭据写进输出。</p></div>
</div>
<div class="bottom-line">阅读操作与授权提示；不清楚作用时，先让它解释。</div>
<div class="source">文件内容可能发到模型服务端，第一次用公开练习材料。写在提示词里的限制，还要配合软件的权限设置。</div>

<!--
Central message: 权限应与当前任务所需操作对应。
图示说明：左右列围绕本次小任务划定范围，不作泛化风险清单。
讲述：软件问你要权限时，看看它准备做什么。这次需要读练习数据、写结果、运行程序，不需要动别的目录。第一次用公开练习材料；文件在本机，不代表内容不会发到模型服务端。其他材料能否分享，要看授权、保密约定和服务条款。
Timing target: 65:00–68:00，3 分钟。
Transition: 经常要说的话可以写下来。
-->

---

# literature-search：把查文献的步骤写下来
<div class="subtitle">A skill tells the agent how to carry out a recurring task</div>

<div class="handoff-loop">
<div><span>找线索</span><b>先查已有笔记</b><small>没有线索，再搜索候选</small></div>
<div><span>调工具</span><b>取数据库记录</b><small>INSPIRE / CrossRef / arXiv</small></div>
<div><span>核对</span><b>是不是要找的论文</b><small>题目、作者、年份</small></div>
<div><span>写文件</span><b>生成 BibTeX</b><small>只用记录返回的字段</small></div>
</div>
<div class="two">
<div class="kami-card"><h3>每一步都有规矩</h3><p>笔记只提供线索，也要重新查库。<br>缺字段就标 UNVERIFIED，不凭记忆补齐。</p></div>
<div class="kami-card"><h3>查不到时怎么做</h3><p>报告无匹配、多个候选或网络失败。<br>没有核实的条目，不混进正式引用。</p></div>
</div>

<!--
Central message: skill 将领域经验写成智能体可以反复读取和执行的任务规程。
图示说明：四步是原 literature-search 的课堂简图。完整流程还包括相关文献参考列表收集和笔记差异报告。
讲述：现在回到前面那条假参考文献。只说“请认真核对”，没有告诉它怎么做。我的 skill 写的是具体步骤：先查 literature-wiki，就是已有文献笔记。有这篇的线索，也要重新向数据库取记录；没有就搜索。接着核对是不是要找的那篇，再用返回字段生成 BibTeX。发现笔记和数据库不一致，要报告差异。这个文件保存的是我查文献时的经验，以后同类任务可以再用。
Timing target: 68:00–71:00，3 分钟。
Transition: 打开文件，看它实际长什么样。
-->

---
class: dense
---

# SKILL.md 里，写的是这些具体要求
<div class="subtitle">A teaching excerpt from literature-search</div>

<div class="two">
<div>

```yaml
name: literature-search
description: 搜索并核实科学文献；
  查论文、DOI 或生成 BibTeX 时使用。
```

```text
先查已有文献笔记，取得候选线索。
调用数据库工具，读取原始记录。
核对题目、作者、年份是否匹配。
引用字段只取自本次查询结果。
缺项标 UNVERIFIED，不猜 DOI。
保存引用、记录链接和检索日期。
```

</div>
<div class="kami-card"><h3>三部分各做什么</h3><p><b>名称和说明：</b>告诉智能体何时使用。</p><p><b>操作步骤：</b>告诉它调用什么工具、检查什么。</p><p><b>脚本：</b>负责实际访问数据库，<br>例如 scripts/verify_doi.py。</p></div>
</div>
<div class="note-line">中文教学节选，完整技能还有分支流程。工具负责执行，SKILL.md 负责说明怎么做。</div>

<!--
Central message: skill 文件可以把触发条件、操作步骤、脚本和失败处理组织在一起。
图示说明：左侧是中文节选，不是完整可安装技能；右侧解释三个组成部分。
讲述：这是原文件的中文节选。上面写叫什么、什么时候用，下面写怎么查、什么情况不能继续。脚本是实际访问数据库的程序，技能文件告诉智能体什么时候调用它。长的规则按需要放在 references 里。［打开 demo/literature/SKILL-excerpt.md，再打开本机的完整 SKILL.md。］这里没有训练一个新模型，是把做事的方法交给已有模型。文件写了还不够，我们接着看工具有没有真的执行。
Timing target: 71:00–73:00，2 分钟。
Transition: 用一篇有明确标识符的论文，演示从记录到引用。
-->

---
class: dense
---

# 演示：让 skill 查一篇论文，保存引用
<div class="subtitle">Run the lookup and inspect its files</div>

<div class="kami-card task-brief lesson-prompt" data-label="演示任务">
使用 literature-search，核实 DOI <code>10.1103/PhysRevC.97.011601</code>。<br>
保存数据库原始记录、BibTeX 和核对说明。查不到的字段不要补写。
</div>
<div class="two">
<div class="kami-card"><h3>打开实际查询结果</h3><p>crossref-record.json：数据库返回值。<br>references.bib：由返回字段生成。<br>verification.md：核对和缺项说明。</p></div>
<div class="kami-card"><h3>这次查到了什么</h3><p>Jin Lei、Antonio M. Moro<br>Physical Review C，97，011601，2018</p><p>题目：Post-prior equivalence for transfer<br>reactions with complex potentials</p></div>
</div>
<div class="note-line">本页演示已知 DOI 的核实。备课记录已附材料包；现场断网时，明确说明后再切换。</div>

<!--
Central message: 技能的效果体现在实际工具调用与可追溯的输出文件中。
图示说明：左边列出交付文件，右边来自本次 CrossRef 实时返回，非模型补写。DOI 是查询输入，也是已返回的标识符。
讲述：［按 demo/literature/PROMPT.md 发送任务。］先看它读了哪个 skill，再看它调用了哪个数据库，最后打开文件。这里从已有 DOI 开始，演示的是核实；如果只有研究问题，还要先搜索和筛选候选。备课时真实查过这条记录：脚本给出的 pages 是空值，但原始记录里有 article-number，011601。我们读原始记录取这个字段，不能自己看着 DOI 猜。这个例子也说明为什么要保留原始记录，不能只看一行“验证成功”。如果断网，打开注明日期的备课结果，不把它说成现场查询。今天只演示书目信息，是否支持某个物理结论，还要读原文。
Timing target: 73:00–76:00，3 分钟。
Transition: 同样的做法，也能用于运行核物理程序。
-->

---

# FUSION：给 AI 用的核物理程序操作说明
<div class="subtitle">An example of reusable research workflows</div>

<div class="kami-card lesson-focus"><h3>我把核物理程序的操作步骤整理成了技能。</h3><p>从核对过的输入出发，调用程序，检查输出，<br>把运行过程和结果交回来。</p></div>
<div class="two">
<div class="kami-card"><h3>照着说明操作</h3><p>怎样改输入、运行程序、复现已知结果。</p></div>
<div class="kami-card"><h3>研究上自己判断</h3><p>要研究什么，模型是否适合，结果怎么解释。</p></div>
</div>
<div class="source">FUSION 项目：github.com/jinleiphys/FUSION。此处介绍已有工作方式，不要求初学者先安装整套项目。</div>

<!--
Central message: FUSION 是从日常文件任务进一步走向研究程序操作的实例。
图示说明：上方概括工作方式，下方区分可复用操作与研究判断。
讲述：FUSION 做的就是这件事：我把一些核物理程序的操作步骤写成技能，让智能体按说明改输入、运行、检查输出。研究什么、模型合不合适、结果怎么解释，仍然要自己判断。从查文献到跑程序，都是把熟悉的操作步骤、所需工具和检查办法写进 skill。
Timing target: 76:00–78:00，2 分钟。
Transition: 换成你自己的课题试试。
-->

---

# 练习：用你自己的课题写一条要求
<div class="subtitle">3 分钟写任务，2 分钟互相检查</div>

<div class="kami-card task-brief lesson-prompt" data-label="YOUR FIRST TASK">
<b>输入文件：</b>读取哪个目录、哪些文件？<br>
<b>怎么处理：</b>具体要完成哪一步？<br>
<b>不要改：</b>哪些文件不改？遇到什么先停下？<br>
<b>做完以后：</b>保存哪些文件？我要检查哪一项？
</div>
<div class="note-line">可选：整理已有计算输出、修改一个小程序、检查一批文件。<br>也可以选查文献：写下它该查哪里、何时停止、保存什么。</div>

<!--
Central message: 学生带走一份自己的首个可执行任务。
图示说明：四行结构与刚做的练习相同，便于直接填写。
讲述：选自己课题里的一件小事，写清输入、处理步骤、哪些不改、做完保存什么。没有课题就用今天这张表。［给三分钟写、两分钟互评。］同桌只问：我能找到输入吗？做完怎么检查？不要选“把论文写完”这样的大任务。
Timing target: 78:00–83:00，5 分钟。
Transition: 大家写的任务，准备怎么检查？
-->

---

# 回去以后，可以从哪里用起？
<div class="subtitle">Discussion, file processing, and checks</div>

<div class="takeaways">
<div class="item"><span class="n">①</span><span class="t">问概念、讨论思路<small>继续用熟悉的聊天方式就可以。</small></span></div>
<div class="item"><span class="n">②</span><span class="t">改文件、跑程序、处理报错<small>选好项目目录，说清要做什么、保存什么。</small></span></div>
<div class="item"><span class="n">③</span><span class="t">反复要做的事，整理成 skill<small>写清步骤、工具和失败处理，试跑后再改。</small></span></div>
</div>

<!--
Central message: 从聊天到操作，再把重复任务的经验写成可复用技能。
图示说明：三条对应讨论、实际操作和复用经验。
讲述：［请一位学生说说，什么情况下会用编程智能体。］问概念可以继续聊。要改文件、跑程序，就让它在项目里操作。同一件事反复做，像刚才查文献，就把步骤、工具和失败处理写成 skill。写完要试跑，看看它有没有真查库、生成的文件能不能用，再根据问题改规则。
Timing target: 83:00–85:00，2 分钟。
Transition: 材料都在这个包里。
-->

---

# 课后练习材料
<div class="subtitle">Download the class package, then choose one tool</div>

<div class="two">
<div class="kami-card"><h3>随讲义分发</h3><p>student-materials.zip（含本讲义）</p><p>解压后先读 README.md。</p><p>SETUP.md：官方安装和登录入口。</p><p>PROMPTS.md：三条课堂提示词。</p></div>
<div class="kami-card"><h3>做完后检查</h3><p>读的是不是你给的输入文件？</p><p>程序有没有运行、保存输出？</p><p>你能不能复核其中一条结果？</p></div>
</div>
<div class="bottom-line">材料包随课程发放，里面有本讲义、数据、参考程序和查文献 skill 的教学案例。</div>

<!--
Central message: 课后有具体的材料入口与完成标准。
图示说明：左边是材料包实际文件名，右边是首次任务的验收。
讲述：材料包里有这份讲义、六行数据、提示词和参考程序。literature 目录是刚才的技能教学案例，附了真实查询的原始记录和 BibTeX。先读 README，再按 SETUP 选一个工具。没账号也可以先看数据和技能节选，做纸笔练习。
Timing target: 85:00–87:00，2 分钟。
Transition: 大家可以提问了。
-->

---
layout: center
---

# 问答
<div class="subtitle">你想让它帮你做什么？</div>

<!--
Central message: 用听众的真实小任务检验今天的方法是否落地。
图示说明：问答页。
讲述：大家有没有哪一步还没弄清？也可以说说自己准备让它做什么。［若没有提问，请一位同学读任务卡，再请另一位指出一处不够明确的地方。］
Timing target: 87:00–90:00，3 分钟。
Transition: 需要时看后面的备用页。
-->

---
routeAlias: bk-setup
---

# 备用：从官方入口安装和登录
<div class="subtitle">Follow the guide for your operating system</div>

| 工具 | 安装与首次配置 | 已装好之后 |
|---|---|---|
| Codex | <a href="https://learn.chatgpt.com/docs/codex/cli">官方 CLI 入口</a>，按安装指引及账号提示配置 | 练习目录中运行 codex |
| Claude Code | <a href="https://code.claude.com/docs/en/quickstart">官方 Quickstart</a>，按系统选择安装方式 | 运行 claude，完成首次登录 |
| OpenCode | <a href="https://opencode.ai/docs/">官方文档</a>，选择版本并配置模型服务 | 运行 opencode，按文档连接服务 |

<div class="note-line">CLI：命令行界面。账号、计费与模型服务按所用产品确认。<br>本课只需要一个工具能正常工作，不统一要求购买某个订阅。</div>

<!--
Central message: 初次配置依赖操作系统和账号，官方入口比固定安装截图可靠。
图示说明：表格给出当前核对过的官方文档入口。
讲述：按自己的系统选安装方式，再登录。OpenCode 不同主要版本共用命令名称，安装时看清版本。这里只需要装一个工具。具体路径和排错入口在 SETUP.md。
Timing target: 备用，不计入正文。
Transition: 回到练习。
-->

---
routeAlias: bk-instructions
---

# 备用：项目说明文件的例子
<div class="subtitle">Example project instructions</div>

```markdown
# 本项目的工作约定
- data/ 存放原始数据，不修改。
- 新结果保存到 results/。
- 运行后报告命令、行数和结果文件位置。
- 缺少环境或不清楚列定义时，先说明，不编造数据。
```

<div class="note-line">上面是内容示例。文件名称、放置位置和加载方式，<br>按所用软件的官方说明配置；并确认它实际读到了。</div>

<!--
Central message: 常用约定可以变成明确的项目文本。
图示说明：示例只写本课实际需要的四条，不扩展成复杂规则系统。
讲述：这四条就是本目录的约定。文件叫什么、放在哪里，按工具的说明配置，并确认它读到了。写了说明也要检查实际修改，不必在第一次练习前做一套复杂规则。
Timing target: 备用，不计入正文。
Transition: 回到项目说明。
-->

---
routeAlias: bk-physics
---

# 备用：两份程序也可能用错同一个质量
<div class="subtitle">Two solvers can share the same wrong assumption</div>

<div class="two">
<div><img src="./figures/phase-shift-slip.png" class="kami-img" /></div>
<div class="kami-card"><h3>一个方势阱教学反例</h3><p>数值求解和解析解，<br>都误用了核子质量。</p><p>它们仍然彼此吻合，<br>却没有实现指定的两体动力学。</p><p>相对运动应使用约化质量。</p></div>
</div>
<div class="bottom-line">这两组计算都运行成功了，但只有一组用了正确的质量。</div>
<div class="source">由本项目 demo/square_well.jl 构造并验证的教学反例；不是某个产品的失败记录。横轴 E 为质心系能量，纵轴 δ₀ 为 s 波相移，点为数值解、线为解析解。</div>

<!--
Central message: 数值一致不能排除共同的物理设定错误。
图示说明：绿色为约化质量，粉色为误用核子质量；各组内的点线重合，两组之间不同。
讲述：这两组都重新拟合了结合能，数值解和解析解又用了同一个质量，所以各自都能吻合。但两体相对运动应该用约化质量。这个错误要回到动力学定义去查，不能只看两条曲线是否重合。
Timing target: 备用，不计入正文。
Transition: 其他检查也要分开看。
-->

---
routeAlias: bk-evidence
---

# 备用：你想查的是哪一种错误？
<div class="subtitle">Implementation, setup, and model adequacy</div>

| 想知道什么 | 可以怎么查 |
|---|---|
| 文件处理做对了吗？ | 对照输入，手算一行，核对行数和路径 |
| 方程求解符合预期吗？ | 同设定解析解、收敛检查、参考程序 |
| 物理设定符合任务吗？ | 核对单位、质量、边界条件的定义 |
| 模型是否描述观测？ | 对比未用于拟合的数据，并考虑误差 |

<div class="bottom-line">两个程序算得一样，还不能排除它们共享了错误的设定。</div>

<!--
Central message: 不同问题需要不同证据，检查不能互相代替。
图示说明：从本课表格任务逐步扩展到实际科研计算。
讲述：先想清楚你在查什么：文件有没有处理对，方程有没有解对，设定有没有写对，还是模型能不能描述实验。两个程序可以用相同参数比较求解方法；要查参数定义，就得回到原始定义。今天表里的差值不能当成模型对实验的准确度。
Timing target: 备用，不计入正文。
Transition: 回到问答。
-->
