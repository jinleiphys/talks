---
theme: seriph
title: '用 AI 做科研：从聊天到动手'
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
<h1>用 AI 做科研<span class="h1-sub">从聊天到动手</span></h1>
<div class="byline">金磊 · Jin Lei</div>
<div class="affiliation">同济大学物理系</div>
</div>
<div class="cover-side">
<LiveOnly><HeroNucleus /></LiveOnly>
<div class="signoff"><div class="ui-label">YOUR FIRST AGENT TASK</div><div class="slip-title">会聊天之后，下一步是什么？</div><div class="row"><span>为什么要用这些软件？</span><span>①</span></div><div class="row"><span>它能替我接手哪些操作？</span><span>②</span></div><div class="row"><span>第一次应该怎样开始？</span><span>③</span></div></div>
</div>

<!--
Central message: 本课从网页聊天的使用经验出发，带学生完成第一次文件任务。
图示说明：右侧三个问题是今天的学习目标，核图案仅为学科背景。
讲述：先举手调查：谁用过网页 AI？谁让 AI 直接修改过电脑里的文件并运行程序？不假设学生使用过终端或编程智能体。本课不要求现场购买账号或安装软件，可以全程观察并完成纸笔任务。
Timing target: 0:00–1:00，1 分钟。
Transition: 先看一张很容易看懂的截图。
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
<div class="source">来源：用户提供的文章截图，署“人民日报”，2026-10-14；此处展示标题与书页局部。</div>

<!--
Central message: 聊天回答中可能混有不属于最终作品的内容。
图示说明：上方为截图标题，下方放大同一截图中的书页；原图保留在 figures/chat-residue-news.png，没有改写内容。
讲述：先停 20 秒让学生找到那句话，再问“你复制 AI 回答时有没有遇到过类似的附加说明？”只讲截图看得见的内容，不扩展作者、出版社或处置细节。不要由此推断用编程智能体就能杜绝错误。
Timing target: 1:00–4:00，3 分钟。
Transition: 从一段回答到一份交付物，中间究竟还要做哪些事？
-->

---

# AI 回答之后，工作还没有结束
<div class="subtitle">An answer still has to become a usable file</div>

<div class="three">
<div class="kami-card"><h3><span class="num">01</span>挑出内容</h3><p>哪些属于正文？<br>哪些只是对话说明？</p></div>
<div class="kami-card"><h3><span class="num">02</span>放进文件</h3><p>复制、保存、排版，<br>放到正确的位置。</p></div>
<div class="kami-card"><h3><span class="num">03</span>打开检查</h3><p>最后交出去的文件，<br>是否符合要求？</p></div>
</div>
<div class="bottom-line">聊天给了你材料，后面的操作往往仍由你完成。</div>

<!--
Central message: 从回答到交付物之间存在一段实际的操作过程。
图示说明：三个阶段分别为选择内容、文件操作和最终检查。
讲述：这不是批评网页聊天。讨论概念或修改短句时，这种方式完全够用。今天要关心的是：当后面的操作很多时，能否把其中一部分交给 AI 执行？
Timing target: 4:00–6:00，2 分钟。
Transition: 写代码时，这段过程更熟悉。
-->

---

# 你是不是每天都在做这件事？
<div class="subtitle">Copy code, run it, paste the error, repeat</div>

<div class="handoff-loop">
<div><span>AI</span><b>给一段代码</b><small>聊天窗口</small></div>
<div><span>你</span><b>复制、保存、运行</b><small>电脑上的文件</small></div>
<div><span>你</span><b>把报错贴回去</b><small>回到聊天窗口</small></div>
<div><span>AI</span><b>给修改版</b><small>再来一次</small></div>
</div>
<div class="kami-card lesson-strip"><p>文件多了，还得补充：在哪个目录？哪个版本？谁调用谁？</p></div>
<div class="bottom-line">你既在提问题，也在替 AI 操作文件、传递运行结果。</div>

<!--
Central message: 只传递代码文本时，人承担了文件操作和反馈传递。
图示说明：四格按顺序连接，最后回到保存运行，表示反复循环。
讲述：邀请一位学生描述最近一次复制报错的经历。请大家数一数完成一次修改需要切换几个窗口。这里特指“聊天给代码、人手动运行”的工作方式，不断言所有网页产品只能这样做。
Timing target: 6:00–9:00，3 分钟。
Transition: 能不能让它自己完成中间这些操作？
-->

---

# 把“操作”和“看结果”也接给 AI
<div class="subtitle">The change is access to tools and feedback</div>

<div class="two">
<div class="kami-card"><h3>你熟悉的方式</h3><p>AI 生成文本。</p><p>你保存、运行，转述结果。</p></div>
<div class="kami-card"><h3>今天要学的方式</h3><p>AI 通过工具读取和修改文件。</p><p>调用程序，读取输出，继续处理。</p></div>
</div>
<div class="bottom-line">有了文件、工具和执行反馈，AI 才能接手一段工作过程。</div>
<div class="source">能力示例见 <a href="https://learn.chatgpt.com/docs/codex/cli">Codex CLI 官方文档</a>。可执行范围取决于当前环境、工具和权限。</div>

<!--
Central message: 编程智能体把语言模型与实际操作和反馈连接起来。
图示说明：对比的是两种工作方式，不是界面外观。
讲述：安装一个工具不保证模型变聪明，也不保证每个结果更正确。变化是它可以直接接触任务所需的文件和运行环境。先看一个不需要额外物理知识的小例子。
Timing target: 9:00–12:00，3 分钟。
Transition: 这张表只有六行，大家可以直接看懂最后该得到什么。
-->

---

# 同一个任务：读表、算差、保存结果
<div class="subtitle">Our first task is file processing, not solving a new physics problem</div>

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
<div class="kami-card"><h3>我们要交出的东西</h3><p>增加一列：两列数的绝对差。</p><p>报告最大差及对应能量。</p><p>保存成新表和一段结果说明。</p></div>
</div>
<div class="source">CSV 是逗号分隔的数据表。E_MeV：能量；calc_deg / ref_deg：以度为单位的计算值 / 参考值。数据来自已有方势阱输出，本课此处只做表格处理。</div>

<!--
Central message: 一个简单文件任务就足以展示编程智能体的作用。
图示说明：左边是实际输入的六行数据，右边明确三个交付目标。
讲述：无需推导这几列如何算出，只需理解减法、绝对值和找最大值。先请大家心算 10 MeV 这一行差约 0.0038 度。后面将用它检查结果。
Timing target: 12:00–15:00，3 分钟。
Transition: 如果只让 AI 告诉你怎么做，会停在哪里？
-->

---

# “给我代码”和“替我完成”差在哪？
<div class="subtitle">Same objective, different handoff</div>

<div class="two">
<div class="kami-card"><h3>给我一段处理代码</h3><p>得到程序文本。</p><p>你负责保存文件、找到输入、运行。</p><p>你再处理报错和结果文件。</p></div>
<div class="kami-card"><h3>在这个目录完成任务</h3><p>读取实际的 data/input.csv。</p><p>保存程序并执行。</p><p>交付新表、说明和运行命令。</p></div>
</div>
<div class="bottom-line">最后打开目录：文件真的产生了吗？</div>

<!--
Central message: 任务的交付应从代码文本扩展到可用的实际文件。
图示说明：两栏对应不同的任务边界。
讲述：同一个模型也可能以不同工具权限工作。我们不会仅凭它说“已经完成”来认定任务结束；后面要打开输出目录。这是从开场截图顺下来的同一个问题：最终交出去的究竟是什么？
Timing target: 15:00–18:00，3 分钟。
Transition: 这种能用工具、读结果再继续的工作方式通常叫智能体。
-->

---
clicks: 4
class: scene-slide
---

# 智能体：能动手，并根据结果继续做
<div class="subtitle">Agent = a model working with tools and feedback</div>

<div class="scene-definitions">智能体（agent）：通过工具执行操作，读取结果，再决定下一步的 AI 系统。</div>
<LiveOnly><StepScene mode="agent" :step="$clicks" :height="300" /></LiveOnly>

<!--
Central message: 智能体的关键是执行与反馈循环。
图示说明：五次状态依次为理解任务、调用工具、读取输出、修改、保存交付物；连线表示操作依赖。
讲述：每点击一步，联系六行表格任务：找到 CSV、写程序、运行、发现问题、交付。工具可能是文件读取、编辑或终端命令，不必一次记住全部术语。第一次状态中解释 LLM 即大语言模型。
Timing target: 18:00–21:00，3 分钟。
Transition: 那模型、这些软件和电脑里的工具，各是什么？
-->

---

# 三样东西，先分清
<div class="subtitle">Model · agent software · working environment</div>

<div class="three">
<div class="kami-card"><h3>模型</h3><p>理解任务，生成内容，<br>提出下一步操作。</p><p>例如 GPT、Claude 模型。</p></div>
<div class="kami-card"><h3>智能体软件</h3><p>组织任务与工具调用，<br>显示操作和结果。</p><p>例如 Codex、Claude Code、OpenCode。</p></div>
<div class="kami-card"><h3>工作环境</h3><p>文件、目录、程序，<br>以及允许执行的操作。</p><p>例如本课练习文件夹。</p></div>
</div>
<div class="bottom-line">装好了软件，还需要模型访问方式，以及任务所需的运行环境。</div>

<!--
Central message: 模型、智能体软件和运行环境承担不同角色。
图示说明：三个卡片解释三个最常混淆的名词。
讲述：软件本身和模型服务不是同一件事。软件能启动不等于已经登录模型服务，模型能回答不等于电脑装好了 Julia。这里说的是角色划分，产品名称本身可能覆盖不止一种角色。
Timing target: 21:00–24:00，3 分钟。
Transition: 现在再看大家听过的三个产品名字。
-->

---

# Codex、Claude Code、OpenCode 是什么？
<div class="subtitle">Three examples, not three things you must install</div>

| 软件 | 入门时先知道这一点 | 官方入口 |
|---|---|---|
| Codex | 可在项目里检查、编辑文件并运行命令 | <a href="https://learn.chatgpt.com/docs/codex/cli">Codex CLI</a> |
| Claude Code | 可从项目目录开始，读取代码并完成修改 | <a href="https://code.claude.com/docs/en/quickstart">Quickstart</a> |
| OpenCode | 开源智能体软件，可配置模型服务 | <a href="https://opencode.ai/docs/">Documentation</a> |

<div class="note-line">先选一个你能登录、能正常使用的工具，完成同一个小任务。</div>
<div class="bottom-line">关键看文件、工具和权限；网页、桌面、终端都是使用入口。</div>
<div class="source">以上按各家官方文档核对；入口、账号与安装方式可能更新，课后使用时打开对应文档。</div>

<!--
Central message: 产品提供了工作入口，但入门方法可以迁移。
图示说明：三个官方入口用于课后安装和登录，不列易过期的价格、模型排行榜或免费额度。
讲述：终端就是输入命令的窗口，稍后会演示。网页也可能提供文件处理或智能体功能，Claude Code 本身也有多种界面。因此不要形成“网页只会聊天，终端才会工作”的误解。本次课堂只示范一种已配置好的入口。
Timing target: 24:00–27:00，3 分钟。
Transition: 并不是每个问题都值得启动一个项目。
-->

---

# 什么时候继续聊天，什么时候交给它操作？
<div class="subtitle">Choose a workflow for the task</div>

| 你要做的事 | 通常需要什么 |
|---|---|
| 理解概念、讨论思路、改一句话 | 一段对话就能完成 |
| 处理一份已上传的表格 | 能读取表格、生成文件的工具 |
| 在项目中改代码、运行、处理报错 | 文件访问和执行反馈循环 |
| 连续处理一批文件，并保留输出 | 明确目录、批量操作和交付记录 |

<div class="bottom-line">当你反复搬运文件和运行结果时，就值得尝试让智能体接手。</div>

<!--
Central message: 是否需要智能体取决于任务中的操作和反馈量。
图示说明：表格按任务需求分层，不按产品评优。
讲述：今天六行表格在带数据工具的网页中也能处理。我们选它是为了低门槛看清操作过程；项目里有多个关联文件、现成程序和多轮修改时，接入工作目录的价值更明显。不要为了用新工具把简单问题复杂化。
Timing target: 27:00–30:00，3 分钟。
Transition: 接下来从第一次打开项目开始走一遍。
-->

---

# 第一步：给它一个明确的工作文件夹
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
<div class="bottom-line">第一次使用，拿练习副本开始，并明确原始数据不能改。</div>

<!--
Central message: 明确工作目录能让人和智能体指向同一组文件。
图示说明：文件树表示课堂材料包的根目录，斜杠表示文件夹。
讲述：README 是普通文本说明，md 是 Markdown 文本文件的扩展名，不需要先学语法。原始材料包还包含 reference 文件夹用于离线回退，现场暂不打开。目录边界不是安全隔离的保证，仍由权限配置控制实际访问。
Timing target: 30:00–33:00，3 分钟。
Transition: 文件准备好了，软件启动之前还有三项要分开确认。
-->

---

# 装好软件、登录模型、能跑程序，是三件事
<div class="subtitle">Setup checks before the first task</div>

<div class="three">
<div class="kami-card"><h3><span class="num">01</span>启动软件</h3><p>按官方文档安装。<br>能正常打开界面。</p></div>
<div class="kami-card"><h3><span class="num">02</span>登录或连接</h3><p>完成账号或模型服务设置。<br>先确认能收到回答。</p></div>
<div class="kami-card"><h3><span class="num">03</span>运行环境</h3><p>Julia：本课的编程语言。</p><p>终端输入<br><code class="setup-code">julia --version</code><br>出现版本号即可。</p></div>
</div>
<div class="bottom-line">本课现场用已准备好的环境；课后安装入口在材料包 SETUP.md。</div>

<!--
Central message: 初次失败应先区分软件、模型访问和运行环境问题。
图示说明：三个检查分别对应软件启动、认证连接和本地解释器。
讲述：不在课堂里同时安装三套软件。账号、地区和机构环境各不相同，学生先跟着看，再按材料包的官方入口配置。API key 是程序访问服务的凭据，不是代码，也不要写入共享练习文件。
Timing target: 33:00–36:00，3 分钟。
Transition: 如果用终端入口，实际上先学两个动作就够了。
-->

---

# 终端里先学会：进入目录，再启动工具
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
讲述：现场展示打开终端与复制目录路径。macOS/Linux 的路径与 Windows 路径不同，材料包给两个例子。用图形界面的同学可以选文件夹达到相同目的，不强迫大家改用终端。首次启动可能还会要求登录。
Timing target: 36:00–39:00，3 分钟。
Transition: 第一条消息先不要让它大改文件。
-->

---

# 第一条消息：先看看你面前有什么
<div class="subtitle">Start by inspecting the project</div>

<div class="kami-card task-brief lesson-prompt" data-label="PROMPT 1 · 可以直接复制">
请读取 README.md 和 data/input.csv。<br>
告诉我这张表有多少行，三列各是什么意思。<br>
列出你准备怎样完成任务。<br>
现在先不修改文件，也不运行程序。
</div>
<div class="note-line">看它是否读取了实际文件，是否引用了正确的列名和行数。</div>
<div class="bottom-line">先对齐它看到的材料，再交代执行。</div>

<!--
Central message: 第一次对话可以先确认文件理解，而不立即修改。
图示说明：可复制提示词只要求读取两份指定材料。
讲述：现场发出第一条提示，让学生在工具记录中找到读取文件的动作。问学生“它如果只泛泛解释 CSV，却说不出列名，你下一步会问什么？”答案是要求确认实际读到的路径与内容。无账号时用已经保存的输入说明完成这一观察，不伪造工具响应。
Timing target: 39:00–42:00，3 分钟。
Transition: 确认它看对文件后，再交给它一个完整的小任务。
-->

---

# 第二条消息：把交付物写进要求里
<div class="subtitle">Ask for files and a completed run</div>

<div class="kami-card task-brief lesson-prompt" data-label="PROMPT 2 · 可以直接复制">
用 Julia 读取 data/input.csv，计算 |calc_deg − ref_deg|。<br>
把程序保存为 summarize.jl，并实际运行。<br>
把逐行结果保存到 results/comparison.csv，<br>
把行数、最大差及对应 E 保存到 results/summary.txt。<br>
不改原始数据；完成后告诉我运行命令和输出位置。
</div>
<div class="bottom-line">输入在哪里、要做什么、结果放哪里，这三件事先说清。</div>

<!--
Central message: 交代路径、操作和交付，能把问答变成可执行任务。
图示说明：提示词沿用实际列名，绝对值符号只表示两列相减取绝对值。
讲述：让学生指出这条要求比“写个处理数据的程序”多了什么。此任务不需要装第三方 Julia 包。若环境缺 Julia，要求报告缺项并停止，不把“写了代码”说成“运行完成”。现场下一页展示生成和运行，等待不超过一分钟。
Timing target: 42:00–45:00，3 分钟。
Transition: 看它怎样把这些要求变成实际文件。
-->

---

# 现场看：文件真的产生了吗？
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
讲述：现场等待上限 60 秒；若智能体未完成，使用 julia reference/summarize.jl data/input.csv results 回退，并明确说“现在切到备课参考实现”。打开 results 两个文件。让学生自己在表中找到 10 MeV 那一行，核算减法。不能把目标目录图称为真实软件截图。
Timing target: 45:00–49:00，4 分钟。
Transition: 它到底接手了我们原来做的哪些操作？
-->

---

# 这一次，你少做了哪些来回搬运？
<div class="subtitle">What the agent took over</div>

| 原来的动作 | 这次交给工具执行 | 你现在看什么 |
|---|---|---|
| 复制代码到编辑器 | 保存 summarize.jl | 新文件与改动内容 |
| 自己运行再贴结果 | 执行并读取输出 | 实际运行命令和记录 |
| 手动整理结果 | 写入 results/ | 表格和结果说明 |
| 换个要求再复制一遍 | 在现有文件上继续改 | 修改是否符合新要求 |

<div class="bottom-line">你的工作转向：说明目标、查看改动、检查交付。</div>

<!--
Central message: 智能体改变了人与工具之间的分工。
图示说明：逐行对应开场的复制粘贴循环，右列明确人仍需做的检查。
讲述：不宣称节省了具体多少分钟，因为现场环境不同。让学生指出哪一步在自己的课题中最频繁。重点是操作不再必须由人手工搬运，而不是“人从此不用懂代码”。
Timing target: 49:00–52:00，3 分钟。
Transition: 真正的项目通常不会只提一次要求。
-->

---

# 第三条消息：在现有文件上继续做
<div class="subtitle">Continue the task instead of starting from a new code block</div>

<div class="kami-card task-brief lesson-prompt" data-label="PROMPT 3 · 后续修改">
继续修改现有的 summarize.jl。<br>
保持原有两份输出的内容，另外生成 results/high_energy.csv，<br>
只收录 E_MeV ≥ 10 的行，仍保留绝对差列。<br>
重新运行，告诉我新增文件有几行，以及改了哪些地方。
</div>
<div class="note-line">本表应选出 10、20、50 MeV 三行。这是新的筛选要求，不改变原始数据。</div>
<div class="bottom-line">它在同一个项目里继续工作；你查看这一次具体改了什么。</div>

<!--
Central message: 多轮任务可以围绕已有项目增量修改。
图示说明：后续提示词明确保留已有交付，只新增筛选表。
讲述：时间允许则继续现场执行，否则让学生口头指出应新增哪些文件以及什么不能变。本页的三行来自直接数输入表，不声称已经现场生成。后备程序已有可选参数，材料包说明如何做同样筛选。
Timing target: 52:00–55:00，3 分钟。
Transition: 如果运行报错，下一句该怎么说？
-->

---

# 报错时，让它查现场，而不只是猜答案
<div class="subtitle">Use the files and the error message as evidence</div>

<div class="two">
<div class="kami-card"><h3>常见情况</h3><p>找不到输入文件。</p><p>当前目录不对。</p><p>电脑没有所需运行程序。</p></div>
<div class="kami-card"><h3>你可以这样追问</h3><p>先确认当前目录和实际文件路径。</p><p>解释这条报错指向哪里。</p><p>只修复相关问题，再运行一次。</p></div>
</div>
<div class="bottom-line">“环境缺少 Julia”和“数据处理代码写错”，需要不同的处理。</div>

<!--
Central message: 错误处理应利用当前环境中的真实证据。
图示说明：左边为教学情境，不是伪造的真实报错截图；右边为追问方式。
讲述：请学生说遇到文件找不到时第一项检查是什么。正常情况是核对路径，不能让它编出一份替代数据来让程序“跑通”。需要安装环境时先报告，由使用者决定适当安装位置。
Timing target: 55:00–58:00，3 分钟。
Transition: 能运行并不等于你可以不看最后的文件。
-->

---

# 最简单的三项检查，今天就能做
<div class="subtitle">Check the actual handoff</div>

<div class="three">
<div class="kami-card"><h3><span class="num">01</span>看文件</h3><p>结果有没有生成？<br>原始数据有没有被改？</p></div>
<div class="kami-card"><h3><span class="num">02</span>算一行</h3><p>10 MeV：<br>|86.5518 − 86.5556|<br>≈ 0.0038°</p></div>
<div class="kami-card"><h3><span class="num">03</span>再运行</h3><p>用给出的命令执行。<br>能否重现这些输出？</p></div>
</div>
<div class="bottom-line">回到开场：交出去的是最后的文件，所以要打开它检查。</div>

<!--
Central message: 最终检查对象应该是实际交付物。
图示说明：三项检查均可在六行数据例子上完成。
讲述：这三项只是入门示例，不是所有科研任务的完整验证。代码进入真实物理计算后，还要核对模型、单位、边界条件和对照范围，备用页保留方势阱案例。今天先学会不要仅凭聊天总结认定完成。
Timing target: 58:00–61:00，3 分钟。
Transition: 轮到大家把一个模糊要求改成可以交出去的任务。
-->

---

# 练习：把“给我代码”改成“完成这件事”
<div class="subtitle">2 分钟自己写，2 分钟和同桌比较</div>

<div class="kami-card lesson-focus"><p>原要求：<br><b>“帮我写个程序，把这张表中 E ≥ 10 的行挑出来。”</b></p></div>
<div class="lesson-choices"><p>补上：输入在哪？修改哪个文件？输出在哪？</p><p>再补：需要实际运行吗？什么不能改？完成后交什么？</p></div>
<div class="bottom-line">不用背术语，用你平时说话的方式写完整。</div>

<!--
Central message: 学生能把要求从代码文本扩展为一个有交付物的任务。
图示说明：原要求故意省略路径、执行和边界。
讲述：保持两分钟静默写作，再同桌交换两分钟。没有电脑也可以参加。别先翻到答案。评分只看另一人是否能据此开始并知道何时完成，不看提示词是否长。
Timing target: 61:00–65:00，4 分钟。
Transition: 对照一份够用的答案，看看你的任务少了什么。
-->

---

# 不需要复杂提示词，四句话就够开始
<div class="subtitle">Input · action · boundary · handoff</div>

<div class="kami-card task-brief lesson-prompt" data-label="WORKED ANSWER">
<b>材料：</b>读取 data/input.csv，列含义见 README.md。<br>
<b>任务：</b>修改现有 summarize.jl，另存 E_MeV ≥ 10 的三行。<br>
<b>边界：</b>不改原始数据；原有两份输出的内容保持不变。<br>
<b>交付：</b>实际运行，生成 results/high_energy.csv，<br>
并告诉我运行命令、行数和修改内容。
</div>
<div class="bottom-line">材料、任务、边界、交付，这四项可以迁移到你的课题。</div>

<!--
Central message: 一份够用的任务说明由四个具体部分组成。
图示说明：四句答案对应练习缺少的内容。
讲述：这里预先知道三行，是因为输入只有六行，便于练手；真实任务不应凭空要求一个未知正确答案。不要要求它“必须得到某个物理结论”。请学生对自己的答案做一次修订。
Timing target: 65:00–68:00，3 分钟。
Transition: 当软件真的可以操作文件时，任务边界就需要落实到权限。
-->

---

# 它要动手，你要看清允许它做什么
<div class="subtitle">Permissions belong to the task</div>

<div class="two">
<div class="kami-card"><h3>这次任务需要</h3><p>读取练习目录中的说明和数据。</p><p>写程序与结果文件。</p><p>运行本地数据处理程序。</p></div>
<div class="kami-card"><h3>这次任务不需要</h3><p>修改原始数据，清空别的目录。</p><p>读取与练习无关的私人文件。</p><p>把账号凭据写进输出。</p></div>
</div>
<div class="bottom-line">阅读操作与授权提示；不清楚作用时，先让它解释。</div>
<div class="source">本地操作不等于内容始终留在本机；首次练习用公开材料。可操作范围由配置与权限决定，“不要改”不等于系统级隔离。</div>

<!--
Central message: 权限应与当前任务所需操作对应。
图示说明：左右列围绕本次小任务划定范围，不作泛化风险清单。
讲述：模型读取内容可能涉及服务端处理，能访问文件不等于数据始终离开不了电脑。第一次只用公开教学材料。具体材料是否可分享遵循已有授权、保密约定和所用服务条款。不要把不明授权全部点同意当作教程。
Timing target: 68:00–71:00，3 分钟。
Transition: 用熟以后，总有几句话每次都要重复。
-->

---

# 常说的约定，写下来就能复用
<div class="subtitle">Project instructions and skills, after your first successful task</div>

<div class="two">
<div class="kami-card"><h3>项目说明</h3><p>记录这个目录的通用约定：</p><p>data/ 是原始数据，不改动。<br>结果放 results/。<br>完成后给运行命令。</p></div>
<div class="kami-card"><h3>技能（skill）</h3><p>记录一类任务的操作步骤：</p><p>读说明，确认格式。<br>执行处理，保存结果。<br>检查行数和一条样例。</p></div>
</div>
<div class="bottom-line">先做成一次，再把有用的约定和步骤保存下来。</div>

<!--
Central message: 项目说明和技能帮助复用已经实践过的经验。
图示说明：左边是项目通用约定，右边是针对一类任务的步骤说明。
讲述：不同软件的说明文件名称、加载位置和技能支持按官方文档配置，备用页列入口。不要求学生今天建立技能体系。写进文件可以减少重复说明，但仍要看实际执行是否遵守。
Timing target: 71:00–74:00，3 分钟。
Transition: 在核物理老程序上，也可以积累这样的操作经验。
-->

---

# FUSION：把核物理程序的操作经验交给智能体
<div class="subtitle">An example of reusable research workflows</div>

<div class="kami-card lesson-focus"><h3>我把核物理程序的操作步骤整理成了技能。</h3><p>从已有输入出发，调用程序，检查输出，<br>把运行过程和结果交回来。</p></div>
<div class="two">
<div class="kami-card"><h3>可以先复用</h3><p>怎样操作程序、怎样复现已知结果。</p></div>
<div class="kami-card"><h3>仍然需要判断</h3><p>研究什么、模型是否适合、结果说明什么。</p></div>
</div>
<div class="source">FUSION 项目：github.com/jinleiphys/FUSION。此处介绍已有工作方式，不要求初学者先安装整套项目。</div>

<!--
Central message: FUSION 是从日常文件任务进一步走向研究程序操作的实例。
图示说明：上方概括工作方式，下方区分可复用操作与研究判断。
讲述：这就是为什么我会做这个项目。但今天的第一步小得多：让智能体在一个目录里替你完成一次数据处理。先掌握这一步，日后再扩展到组里的程序。
Timing target: 74:00–76:00，2 分钟。
Transition: 现在把今天的四句话换成你自己的任务。
-->

---

# 写下你明天要交给它的一件小事
<div class="subtitle">3 分钟写任务，2 分钟互相检查</div>

<div class="kami-card task-brief lesson-prompt" data-label="YOUR FIRST TASK">
<b>材料：</b>我给它哪个目录、哪些文件？<br>
<b>任务：</b>我要它实际完成哪一步？<br>
<b>边界：</b>哪些东西不能改？遇到什么先停下？<br>
<b>交付：</b>最后有哪些文件？我打开什么来检查？
</div>
<div class="note-line">可选：整理已有计算输出、修改一个小程序、检查一批文件。<br>还没有课题：完成本课六行数据表任务。</div>

<!--
Central message: 学生带走一份自己的首个可执行任务。
图示说明：四行结构与刚做的练习相同，便于直接填写。
讲述：真留三分钟写作、两分钟互评。让同桌问“我知道要读哪个文件吗？最后怎样算完成？”不要挑需要新物理结论的大任务，不要选“写完论文”。纸笔任务同样有效，不以现场是否能登录付费工具为门槛。
Timing target: 76:00–81:00，5 分钟。
Transition: 用一句话说清今天究竟改变了什么。
-->

---

# 当任务需要反复操作，就让 AI 接手操作
<div class="subtitle">Take home: move from requesting text to assigning work</div>

<div class="takeaways">
<div class="item"><span class="n">①</span><span class="t">需要讨论，就继续聊<small>不必把所有问题都变成一个项目。</small></span></div>
<div class="item"><span class="n">②</span><span class="t">需要动文件、跑程序，就给它工作环境<small>说清材料、任务、边界和交付。</small></span></div>
<div class="item"><span class="n">③</span><span class="t">完成之后，打开最终文件检查<small>软件接手操作，结果仍需要证据。</small></span></div>
</div>

<!--
Central message: 根据任务选择工作方式，并检查实际交付物。
图示说明：三条分别回答什么时候用、怎么交代、怎么判断完成。
讲述：请一位学生用自己的话说出为什么有时需要 Codex、Claude Code、OpenCode。合格答案应提到访问项目文件、执行、读取反馈，不是“因为比网页聪明”。再回扣新闻截图：最后交出去的文件要打开看。
Timing target: 81:00–83:00，2 分钟。
Transition: 课后只需要把刚写的任务执行一次。
-->

---

# 材料已经准备好，课后从一个目录开始
<div class="subtitle">Download the class package, then choose one tool</div>

<div class="two">
<div class="kami-card"><h3>随讲义分发</h3><p>student-materials.zip（含本讲义）</p><p>解压后先读 README.md。</p><p>SETUP.md：官方安装和登录入口。</p><p>PROMPTS.md：三条课堂提示词。</p></div>
<div class="kami-card"><h3>第一次完成的标志</h3><p>它读到了你的实际输入。</p><p>它执行并生成了输出文件。</p><p>你能找到文件、复核一条结果。</p></div>
</div>
<div class="bottom-line">材料包由讲者随课程发放；先选一个工具，把一件小事做完。</div>

<!--
Central message: 课后有具体的材料入口与完成标准。
图示说明：左边是材料包实际文件名，右边是首次任务的验收。
讲述：材料包含六行数据、提示词、练习单和离线参考程序；没有账号也能看输入与参考输出理解流程。安装按照当前官方文档，不让同学照着过时截图找按钮。
Timing target: 83:00–85:00，2 分钟。
Transition: 最后讨论大家卡在哪一步。
-->

---
layout: center
---

# 问答
<div class="subtitle">你的第一份任务，准备让它做什么？</div>

<!--
Central message: 用听众的真实小任务检验今天的方法是否落地。
图示说明：问答页。
讲述：优先回答“为什么用”“怎么开始”“怎么判断它真的做了”，避免把问答变成模型排行榜。若冷场，请一位学生展示四句话任务卡，让另一位指出一处不够具体的地方。
Timing target: 85:00–90:00，5 分钟。
Transition: 以下备用页用于进一步说明。
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
讲述：OpenCode 官方文档提示不同版本共享命令名称，安装时按自己使用的版本说明。不要同时执行三套安装命令。本课材料包 SETUP.md 给出路径例子和排错入口。
Timing target: 备用，不计入正文。
Transition: 回到第一次任务。
-->

---
routeAlias: bk-instructions
---

# 备用：把练习目录的约定写下来
<div class="subtitle">An instruction file is plain text, not a guarantee</div>

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
讲述：这是课后熟练后的下一步，不是第一次任务的前置条件。即使加载了说明，仍需查看执行与交付，不承诺“写一次就不会再错”。
Timing target: 备用，不计入正文。
Transition: 回到复用流程的讨论。
-->

---
routeAlias: bk-physics
---

# 备用：到了物理计算，还要检查共同设定
<div class="subtitle">Two solvers can share the same wrong assumption</div>

<div class="two">
<div><img src="./figures/phase-shift-slip.png" class="kami-img" /></div>
<div class="kami-card"><h3>一个方势阱教学反例</h3><p>数值求解和解析解，<br>都误用了核子质量。</p><p>它们仍然彼此吻合，<br>却没有实现指定的两体动力学。</p><p>相对运动应使用约化质量。</p></div>
</div>
<div class="bottom-line">检查程序是否运行，和检查物理设定是否正确，是两件事。</div>
<div class="source">由本项目 demo/square_well.jl 构造并验证的教学反例；不是某个产品的失败记录。横轴 E 为质心系能量，纵轴 δ₀ 为 s 波相移，点为数值解、线为解析解。</div>

<!--
Central message: 数值一致不能排除共同的物理设定错误。
图示说明：绿色为约化质量，粉色为误用核子质量；各组内的点线重合，两组之间不同。
讲述：仅在学生问到科学验证时展开。两组都重新拟合结合能，错误不会由拟合自动揭露；独立推导两体动力学才指出所需质量。本课正文不再要求学生先掌握这个反例才能理解智能体。
Timing target: 备用，不计入正文。
Transition: 把不同层次的检查分开。
-->

---
routeAlias: bk-evidence
---

# 备用：每个检查都有自己的范围
<div class="subtitle">Implementation, setup, and model adequacy</div>

| 想知道什么 | 可以怎么查 |
|---|---|
| 文件处理做对了吗？ | 对照输入，手算一行，核对行数和路径 |
| 方程求解符合预期吗？ | 同设定解析解、收敛检查、参考程序 |
| 物理设定符合任务吗？ | 核对单位、质量、边界条件的定义 |
| 模型是否描述观测？ | 对比未用于拟合的数据，并考虑误差 |

<div class="bottom-line">先明确要排除的错误，再选择检查方法。</div>

<!--
Central message: 不同问题需要不同证据，检查不能互相代替。
图示说明：从本课表格任务逐步扩展到实际科研计算。
讲述：两个程序可以共享物理参数来比较求解方法；要检查某个参数定义错误时，就不能照抄同一个错误来源。表格任务的 0.0059 度是输入数据的差值，不能直接推出模型对实验的准确度。
Timing target: 备用，不计入正文。
Transition: 返回问答。
-->
