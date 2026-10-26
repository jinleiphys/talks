---
theme: seriph
title: '用 AI 做科研：核物理研究生上手指南'
titleTemplate: '%s · 金磊'
info: '面向核物理研究生：AI 工具怎么选、四个日常场景怎么用、结果怎么验收。'
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

<h1>用 AI 做科研<span class="h1-sub">核物理研究生上手指南</span></h1>

<div class="byline">金磊 · Jin Lei</div>
<div class="affiliation">同济大学物理系<br>中国科学院近代物理研究所南方核科学理论研究中心</div>

</div>

<div class="cover-side">
<LiveOnly><HeroNucleus /></LiveOnly>
<div class="signoff">
<div class="ui-label">ACCEPTANCE SLIP</div>
<div class="slip-title">AI 帮你做，结论由你负责</div>
<div class="row"><span>数值结果有独立对照</span><span class="ck">✓</span></div>
<div class="row"><span>参考文献逐条核对原文</span><span class="ck">✓</span></div>
<div class="row"><span>计算约定清楚，使用合乎规范</span><span class="ck">✓</span></div>
<div class="sign"><span>确认</span><span class="line"></span></div>
</div>
</div>

<!--
Central message: 这是一堂上手课，讲怎么用，也讲怎么验。
图示说明：标题页。
讲述：今天不讲 AI 的原理，也不讲我自己的物理结果。讲三件事：有哪些工具、在读文献、写代码、跑程序、写文章这四件日常事情里怎么用、得到的结果怎么检查。全程用核物理的例子，大家回去第二天就能用上。
Timing target: 0:00–1:00，1 分钟。
Transition: 先看它能做什么。我现场给它一个任务。
-->

---

# 现场演示：给它一个任务
<div class="subtitle">Live demo: one prompt, one coding agent</div>

<div class="demo-grid">
<div class="kami-card task-brief task-narrow" data-label="PROMPT · 现场粘贴的原文">
用 Julia 写一个程序：n-p 的 s 波散射，方势阱，半径 R = 2.0 fm。<br>
1. 调势阱深度 V₀，使氘核结合能为 2.2246 MeV；<br>
2. 用 Numerov 方法算 0 到 50 MeV 的相移 δ₀(E)；<br>
3. 和解析解比较，报告最大偏差；<br>
4. 输出三重态散射长度 aₜ，画出 δ₀(E)。
</div>
<div class="scene-box"><LiveOnly><WellWave /></LiveOnly></div>
</div>
<div class="bottom-line">这个任务大家都会做。问题是：它做得对不对，你怎么知道？</div>

<!--
Central message: 先让大家看到编程智能体能独立完成一个完整的小计算。
图示说明：左边任务卡是现场粘贴的提示词原文（demo/prompt.md 版本一）。右边是这个任务本身的三维解析解：方势阱（R = 2 fm，V₀ = 36.567 MeV）中的 u(r)，能量在 1 到 50 MeV 间来回扫，后面一排细线是不同能量的波函数，虚线是无势自由波，右上角实时显示 E 和 δ₀，与参考程序一致到 10⁻³ 度。
讲述：切到终端，打开 Claude Code，粘贴这段话。一边等一边讲：它会自己建文件、写代码、运行、看报错、再改。选方势阱是因为它有解析解，现场就能对答案；而且在座每个人本科都做过。故意没写单位约定和质量取法，后面会回到这一点。如果网络出问题，切到备用页的离线结果。
Timing target: 1:00–4:00，3 分钟（含等待）。
Transition: 先看它给出的结果。
-->

---

# 同一个任务，会前的计算结果
<div class="subtitle">Numerov vs analytic, s-wave n-p, square well R = 2.0 fm</div>

<div class="two">
<div>

<img src="./figures/phase-shift-ok.png" class="kami-img" style="width:100%" />

</div>
<div>

| 量 | 结果 |
|---|---:|
| 势阱深度 V₀ | 36.57 MeV |
| Numerov 与解析解最大偏差 | 0.006° |
| 散射长度 aₜ | 5.36 fm |
| aₜ 实验值 | 5.42 fm |

</div>
</div>
<div class="bottom-line">写代码、运行、画图、检查结果，都可以交给它。我只写了五行要求。</div>
<div class="source">本页数字由会前的参考程序 demo/square_well.jl 算出（Julia，步长 2×10⁻⁴ fm），现场结果以实际运行为准；有一个束缚态，按 Levinson 定理 δ₀(0) = 180°。</div>

<!--
Central message: 编程智能体能给出一个完整、可复现的小计算。
图示说明：左图实线为解析解，圆点为 Numerov；右表为关键数值。这页是会前用参考程序算的，用来和现场 AI 给出的数字对照；先回到终端看它给出了什么，再切到这页。
讲述：念右表。偏差千分之几度，散射长度和实验差 1%，方势阱是粗糙模型，这个差别合理。这里先提一句：Numerov 和解析解吻合，只说明这个方程求解得对；方程本身写没写对，是另一个问题。第二段会专门讲这一点。
Timing target: 4:00–7:00，3 分钟。
Transition: 今天就围绕这件事讲：怎么让它干活，怎么验它干的活。
-->

---

# 今天讲什么
<div class="subtitle">What this lecture covers</div>

<div class="three">
<div class="kami-card"><h3><span class="num">01</span>选工具</h3><p>对话助手、编程智能体、文献检索，各自能做什么</p></div>
<div class="kami-card"><h3><span class="num">02</span>四个场景</h3><p>读文献、写代码、跑程序、写文章：怎么问，容易出什么错</p></div>
<div class="kami-card"><h3><span class="num">03</span>验收</h3><p>数值要有对照，引用要查原文，使用要合乎规范</p></div>
</div>
<div class="bottom-line">AI 帮你做，结论由你负责。</div>

<!--
Central message: 全场三段：选工具、四个场景、验收。
图示说明：三张卡片对应三段内容。
讲述：中间还有一小段讲怎么让它越用越顺手，放在场景之后。每个场景都按同一个格式讲：怎么问、一个例子、一个典型翻车。翻车比成功更值得讲，因为你回去一定会遇到。
Timing target: 7:00–9:00，2 分钟。
Transition: 先看工具。
-->

---
layout: section
---

<LiveOnly><ParticleField tone="dark" :seed="1" /></LiveOnly>

<div class="part-no">01</div>
<div class="kicker">PART 01 · 第一段</div>

# 选工具

<div class="part-lead">对话助手、编程智能体、文献数据库各自能做什么；什么材料能上传</div>
<div class="part-track"><span class="on"></span><span class=""></span><span class=""></span><span class=""></span><span class=""></span></div>

---

# 三类工具，各有所长
<div class="subtitle">Chat assistants, coding agents, literature search</div>

| 类型 | 例子 | 擅长 | 做不到 |
|---|---|---|---|
| 对话助手 | DeepSeek、Kimi、通义千问、ChatGPT | 解释概念、读 PDF、改文字 | 看不到你的文件，不运行程序 |
| 编程智能体 | Claude Code、Codex、Trae、通义灵码 | 读写项目文件、运行命令、看报错再改 | 不知道你的物理约定，除非你写下来 |
| 文献数据库 | INSPIRE、arXiv | 只收录真实发表的文献 | 不替你判断文章说得对不对 |

<div class="bottom-line">先看任务需要哪类工具，再选具体产品。</div>

<!--
Central message: 工具按任务分三类，不按名气分。
图示说明：表格三行三类，最后一列是最容易被忽视的限制。
讲述：对话助手就是网页上聊天的那种。编程智能体（agent）是今天的重点：它可以在你的项目目录中工作，能自己读文件、跑命令。文献数据库不是 AI，但在 AI 时代比以前更重要，因为核对文献时仍要查数据库和原文。产品名字半年一变，分类不会变。
Timing target: 10:00–13:00，3 分钟。
Transition: 编程智能体和聊天到底差在哪？看它怎么工作。
-->

---
clicks: 4
class: scene-slide
---

# 智能体：会自己动手的 AI
<div class="subtitle">An agent reads files, runs commands, reads the result, and tries again</div>

<div class="scene-definitions">对话助手只回一段文字；智能体会自己执行，看结果，再改，并保存可供复核的材料。</div>
<LiveOnly><StepScene mode="agent" :step="$clicks" :height="310" /></LiveOnly>

<!--
Central message: 智能体与对话助手的区别在于它能执行，并根据结果继续做。
图示说明：五个点击状态：模型给出操作，工具执行，结果返回，根据反馈再做，最后给出可复核的材料。
讲述：对话助手只给你一段文字，你自己复制、运行、再把报错贴回去。智能体把这个循环自己跑完。所以开场演示里我只写了五行字。代价是：它跑得越远，你越需要它给出能复核的东西，而不只是一句"完成了"。最后一步就是这个意思。
Timing target: 13:00–16:00，3 分钟。
Transition: 那具体用哪个？
-->

---

# 国内外工具怎么选
<div class="subtitle">Pick by task, then by what you can access</div>

<div class="two">
<div class="kami-card"><h3>国内可直接使用</h3><p>问概念、读 PDF：DeepSeek、Kimi、通义千问</p><p>写代码：Trae，或 VS Code 加通义灵码</p><p>都有免费额度，具体以官网为准</p></div>
<div class="kami-card"><h3>需要海外账号</h3><p>Claude Code、Codex：我日常用来做长任务</p><p>按月付费</p><p>今天的现场演示用 Claude Code</p></div>
</div>
<div class="small mt-5"><p>一个好习惯：同一个问题让两个不同的模型各答一遍。答案对不上的地方，就是你必须自己查的地方。</p></div>

<!--
Central message: 先从能用的工具开始，重要的问题用两个模型交叉核对。
图示说明：左右两栏，国内与海外。
讲述：不要因为没有海外账号就觉得用不了。今天讲的方法在国内工具上全部适用，提示词可以直接搬过去。交叉核对是我自己的日常做法：一个模型提方案，另一个模型挑错，我再综合。两个模型犯同一个错的概率比一个低得多，但不是零。免费额度和价格经常变，以各家官网为准。
Timing target: 16:00–19:00，3 分钟。
Transition: 选工具时还有一件事比好不好用更重要：什么能上传。
-->

---

# 哪些材料能上传给 AI
<div class="subtitle">Uploading is publishing to a third party</div>

<div class="lane-grid">
<div class="lane-list">
<div class="box-evidence"><h3>可以上传</h3><p>已发表的文章、你自己的代码、公开数据</p></div>
<div class="box-idea"><h3>先看条款</h3><p>未发表的数据、自己的稿件：看服务条款是否把输入用于训练</p></div>
<div class="box-gap"><h3>不能上传</h3><p>审稿时收到的稿件、别人未公开的工作、账号、密码、密钥</p></div>
</div>
<div class="scene-box"><LiveOnly><UploadGate /></LiveOnly></div>
</div>
<div class="bottom-line">上传给 AI，就是交给了第三方。</div>

<!--
Central message: 上传前先判断材料归谁、是否保密。
图示说明：左边三栏绿、蓝、红，分别表示可以上传、先查条款和不能上传。右边三维示意：绿色文件直接进入第三方服务器；蓝色文件先停在"读服务条款"处再走；红色文件被挡住。
讲述：审稿材料是最容易犯错的：导师让你帮忙看一篇稿子，你顺手丢给 DeepSeek 总结，这违反审稿保密，APS 的政策明确禁止，哪怕只是润色。第二栏要看条款：很多服务默认会用你的输入训练模型，有的可以关掉。密钥放进代码再让 AI 读整个目录，也是常见的泄露方式。
Timing target: 19:00–21:00，2 分钟。
Transition: 工具讲完，进入四个日常场景。
-->

---
layout: section
---

<LiveOnly><ParticleField tone="dark" :seed="2" /></LiveOnly>

<div class="part-no">02</div>
<div class="kicker">PART 02 · 第二段</div>

# 四个日常场景

<div class="part-lead">读文献、写代码、跑老程序、写文章：怎么问，容易出什么错</div>
<div class="part-track"><span class="done"></span><span class="on"></span><span class=""></span><span class=""></span><span class=""></span></div>

---

# 场景一　读文献：让它注明出处
<div class="subtitle">Reading a paper: ask for page and equation numbers</div>

<div class="demo-grid">
<div class="kami-card task-brief task-narrow" data-label="PROMPT · 可直接复制">
（上传 PDF）请：<br>
1. 用三句话说明这篇文章解决什么问题；<br>
2. 解释式 (12) 中每一项的物理意义；<br>
3. 每句话后面标出原文页码或式号；<br>
4. 原文没有写、是你推断的内容，标"推断"。
</div>
<div class="scene-box"><LiveOnly><TraceThreads /></LiveOnly></div>
</div>
<div class="bottom-line">标明页码，才能快速核对每句话的出处。</div>

<!--
Central message: 读文献时，要求 AI 给出处，把核对成本降到最低。
图示说明：左边是可以直接复制的提示词。右边三维示意：每句总结用一根线连到原文的页码或式号，标"推断"的那句没有线。
讲述：现场演示：把一篇 arXiv 文章丢给 Kimi 或 DeepSeek，用这段提示词。重点是第 3、4 条。模型最擅长的是写得像真的；要求它标页码，等于逼它把"读到的"和"自己补的"分开。第 4 条特别有用：它标了"推断"的地方，往往就是文章没讲清、值得你自己推一遍的地方。读综述、读学位论文的前言部分都可以这样用。
Timing target: 22:00–25:00，3 分钟。
Transition: 但如果你让它凭记忆给文献，会发生什么？
-->

---
class: fail
---

# 它给的参考文献查不到
<div class="subtitle">Ask a model for references from memory, then check each one</div>

<div class="shot-slot">
<p>截图位置：figures/fake-ref.png<br>（会前截取：凭记忆列文献，其中查不到的条目用红框标出）</p>
</div>
<div class="bottom-line">作者、期刊、卷号、页码都齐全，格式完美，但这篇文章不存在。</div>

<!--
Central message: 模型凭记忆给出的文献，可能是编造的。
图示说明：会前准备的真实截图：让对话助手不联网列出某方向的代表性文献，红框标出 INSPIRE 查不到的条目。
讲述：先让大家猜：五条里有几条是真的？然后揭晓。编造的文献通常不是乱写，而是把真实作者、真实期刊、相近的题目拼在一起，所以看起来特别可信。打开联网搜索会好很多，但不会降到零。研究生最常见的场景是写开题报告、写论文引言时让 AI 帮忙"补几篇参考文献"，这是最危险的用法。
Timing target: 25:00–28:00，3 分钟。
Transition: 怎么查？
-->

---
clicks: 3
class: scene-slide
---

# 每条引用，都要核对三件事
<div class="subtitle">Exists, correct metadata, actually says it</div>

<LiveOnly><CitationSieve :step="$clicks" :height="298" /></LiveOnly>

<div class="bottom-line">AI 给的引用只当线索：文献是否存在，查数据库；是否支持你的说法，查原文。</div>
<div class="source">INSPIRE 检索示例：find a Ichimura and t inclusive breakup（a 作者，t 标题）</div>

<!--
Central message: 引用核对分三层，第三层最容易漏。
图示说明：三维筛子，四次点击：八条引用落下；第一层拦下两条查不到的（红）；第二层两条信息有错的改正后放行（黄）；第三层拦下一条原文没说这句话的；其余通过（绿）。条目数是教学设定。页脚是 INSPIRE 检索语法示例（a 表示作者，t 表示标题）。
讲述：现场切到 INSPIRE 演示一条。前两项比较简单，几分钟就能查完；BibTeX 永远从数据库导出，不要用 AI 生成的。第三层是：文章真实存在，但它没说你引用的那句话。这一类错误审稿人最容易发现，也最伤信誉。
Timing target: 28:00–31:00，3 分钟。
Transition: 第二个场景，写代码。回到开场的方势阱。
-->

---

# 场景二　写代码：把四件事交代清楚
<div class="subtitle">Goal, conventions, acceptance test, deliverables</div>

| | 开场的任务 | 写清楚的版本 |
|---|---|---|
| 目标 | 算相移，画图 | 同左 |
| 约定 | 没写 | 约化质量 μ = mₙmₚ/(mₙ+mₚ)，ħc = 197.327 MeV fm |
| 验收 | 和解析解比 | 再加一个独立对照：aₜ 与实验值 5.42 fm 比较 |
| 交付 | 没写 | 程序、运行命令、原始输出、图；只改 demo/ 目录 |

<div class="bottom-line">没交代的约定，它会自行选择，却未必告诉你。</div>

<!--
Central message: 一份便于检查结果的任务说明包括目标、约定、验收标准和需要提供的文件和结果。
图示说明：左列是开场的一句话任务，右列是改写后的版本（demo/prompt.md 版本二）。
讲述：逐行讲。目标两边一样，差别全在后三行。约定这一行最关键：质量取多少、单位用什么、相移取哪个分支，这些都是物理选择，不能让它替你决定。验收这一行写的是"独立"对照，下一页解释为什么解析解不够。交付这一行让你事后能复核：命令和原始输出在，你随时能重跑。
Timing target: 31:00–34:00，3 分钟。
Transition: 约定没写会怎样？看一个真实会发生的错误。
-->

---
class: fail dense
---

# 自查全通过，物理设定却错了
<div class="subtitle">Same slip in the code and in its own check</div>

<div class="two">
<div>

<img src="./figures/phase-shift-slip.png" class="kami-img" style="width:100%" />

</div>
<div>

| 质量取法 (MeV) | 自查偏差 | aₜ (fm) |
|---|---:|---:|
| 约化质量 469 | 0.006° | 5.36 |
| 误用核子质量 939 | 0.004° | 4.11 |
| 实验 | | 5.42 |

<div class="small"><p>误用质量的那组也能拟合结合能，因为 V₀ 随之调整了。</p></div>

</div>
</div>
<div class="bottom-line">数值程序和解析解用了同一个错误的质量，相互比较也查不出这个错。</div>
<div class="source">两组均由 demo/square_well.jl 计算；错的一组 V₀ = 20.99 MeV，同样拟合到氘核结合能 2.2246 MeV。</div>

<!--
Central message: 用同一套设定写的自查，查不出设定本身的错。
图示说明：绿色为正确的约化质量，粉色为误把 ħ²/2μ 写成 ħ²/2m、m 取核子质量。两组都是实线与圆点重合。
讲述：这个错误很常见：ħ²/2m 写顺手了。它把错的质量一路用到底：用错的质量拟合势阱深度，结合能完美对上；用错的质量写解析解，Numerov 和解析解吻合到千分之四度。所有自查都通过，图也好看。只有散射长度和实验差了 24%。你让它"和解析解比较"，它就真的只比这个。
Timing target: 34:00–38:00，4 分钟。
Transition: 那该怎样检查结果？
-->

---
clicks: 3
class: scene-slide
---

# 检查结果，要有独立对照
<div class="subtitle">An independent check shares nothing with the code</div>

<LiveOnly><SharedInputs :step="$clicks" :height="300" /></LiveOnly>

<div class="bottom-line">对照也沿用了同一个错误设定，就查不出这个错。</div>

<!--
Central message: 有效的验收对照必须独立于被检查的程序。
图示说明：三维依赖图，四次点击：程序和自查采用同一个质量，两者一致；质量写错（939 MeV），自查仍然一致；接入实验值 5.42 fm，程序给 4.11 fm，报警；最后共享的连线变暗，只留独立对照。数值来自 demo/square_well.jl。
讲述：判断标准就一条：这个对照是否沿用了程序中的设定？共享了质量，就查不出质量的错；共享了势参数，就查不出势参数的错。实验值、你自己推的极限、文献数值，是最常用的独立对照。收敛性单独提一句：Numerov 对光滑势是四阶，但方势阱在边界不连续，步长减半偏差只减半。这个现象让它解释，是检验它是否真懂的好问题。备用页有数字。
Timing target: 38:00–41:00，3 分钟。
Transition: 第三个场景：用 AI 跑现成的老程序。
-->

---

# 场景三　跑老程序：改一行，也要懂这一行
<div class="subtitle">Running an existing code: FRESCO, n + ⁹⁰Zr at 50 MeV</div>

```text
! 动力学质量
&PARTITION namep='n' massp=1.0 zp=0  namet='90Zr' masst=90.0 zt=40 ... /

! 势的几何
&POT kp=1 type=0 ap=0.000 at=90.000 rc=1.200000 /
```

<div class="two">
<div class="kami-card"><h3>看起来</h3><p>at = 90 是靶核质量数</p><p>ap = 0 把中子质量设成了 0？</p></div>
<div class="kami-card"><h3>实际上</h3><p>ap 只控制势半径公式里的入射粒子项</p><p>动力学质量在上面的 massp</p><p>改成 ap=1，程序照样能跑</p></div>
</div>
<div class="source">FRESCO：常用的核反应耦合道计算程序。摘自真实输入 examples/fresco-n90zr.in，省略号为未显示字段。</div>

<!--
Central message: 老程序的输入字段有约定，AI 不一定知道。
图示说明：同一份输入里两处看起来都和"质量"有关，作用完全不同。
讲述：FRESCO 这类程序有几十年历史，输入格式紧凑，字段名很短。让 AI 写输入时，它会按字面意思猜。先让大家猜 ap=0 是什么意思。很多人第一反应是"中子质量为零"。按字面理解的人，或者按字面理解的 AI，就可能好心地把它"修正"成 ap=1。下一页看这一改改掉了什么。
Timing target: 41:00–44:00，3 分钟。
Transition: ap 到底控制什么？
-->

---
clicks: 3
class: scene-slide
---

# 改一个字段，势半径相差 22%
<div class="subtitle">Radius convention: R = r₀ Aₜ<sup>1/3</sup> or r₀ (Aₚ<sup>1/3</sup> + Aₜ<sup>1/3</sup>)</div>

<div class="scene-definitions">Aₚ = 1（中子），Aₜ = 90（锆-90），r₀ 为半径系数。加上入射粒子项，半径变为原来的 1 + 90<sup>−1/3</sup> ≈ 1.22 倍。ap=0 就是去掉这一项。</div>
<LiveOnly><StepScene mode="radius" :step="$clicks" :height="310" /></LiveOnly>

<!--
Central message: ap 改变势半径的定义，合法参数也能描述不同的问题。
图示说明：四个点击状态：只有靶核项；加上入射粒子项；ap=0 去掉这一项；与参考计算采用相同的半径定义。
讲述：常用的全局光学势参数 KD02 规定半径只含靶核项 r₀Aₜ^(1/3)。FRESCO 默认把入射粒子项也加上，所以要写 ap=0 才符合 KD02 的约定。中子质量数是 1，半径比是 1 + 90^(-1/3)，约 1.22。如果把 ap=0 "修正"成 1，程序照样运行，截面照样出来，只是算的是另一个势。注意 22% 是半径的变化，不是截面的误差。
Timing target: 44:00–47:00，3 分钟。
Transition: 那跑老程序时怎么用 AI？
-->

---
clicks: 2
class: scene-slide
---

# 跑老程序：在已验证的输入上修改
<div class="subtitle">Edit a verified input, never write one from memory</div>

<LiveOnly><VerifiedEdit :step="$clicks" :height="300" /></LiveOnly>

<div class="bottom-line">从已验证的输入文件开始，修改后逐项检查。</div>

<!--
Central message: 跑老程序的安全做法是改已验证的输入，并审查每一处差异。
图示说明：三维示意，三次点击：已验证输入和它复现的基准（指针在参考值上）；复制一份只改两行，指针离开参考值；修改版和文献或另一程序比较，通过后盖章。示例差异 E = 50 → 30 MeV 只是示意。
讲述：第一步是关键：凭记忆写一份 FRESCO 输入，AI 会把字段约定猜错；从一份已经跑通、结果已知的输入出发，约定都已经对了，它只需要改能量、靶核这几个数。第二步，差异（diff）就是修改前后对比，一般只有几行，你能逐行看懂。第三步比较时，所有约定都要先统一：质量、半径、自旋轨道项开不开。
Timing target: 47:00–49:00，2 分钟。
Transition: 第四个场景，写文章。
-->

---

# 场景四　写作：它改句子，不改物理
<div class="subtitle">Writing: polish the language, keep the claims</div>

<div class="kami-card task-brief" data-label="PROMPT · 可直接复制">
请润色下面这段英文摘要：<br>
1. 只改语法、用词和句子结构；<br>
2. 不改任何数值、公式、引用和结论的强弱；<br>
3. 列出你改动的每一处，说明原因。
</div>
<div class="bottom-line">让它列出改动，你只需逐项核对，不需要重读全文。</div>

<!--
Central message: 写作时把 AI 限定在语言层面，并要求它列出改动。
图示说明：可直接复制的提示词。
讲述：英文写作是研究生用 AI 最多的地方，也是收益最高的地方。第 2 条是底线：数值、公式、引用不许碰，结论的强弱也不许碰。第 3 条能省下核对的时间：十处改动比两页全文好查得多。审稿回复、邮件、开题报告的中文部分都可以这样用。
Timing target: 49:00–52:00，3 分钟。
Transition: "结论的强弱"是什么意思？看一个翻车。
-->

---
class: fail compact-table
clicks: 3
---

# 润色把结论说强了
<div class="subtitle">Polishing that changes the physics</div>

<div class="dial-table" :class="'hl-' + $clicks">

| 原文 | 润色后 | 改了什么 |
|---|---|---|
| consistent with the data | confirms the mechanism | 吻合变成了证明 |
| a precision of 1% | an accuracy of 1% | 精度变成了准确度 |
| in this model | in nature | 模型结论变成了自然规律 |

</div>
<div class="dial-box"><LiveOnly><ClaimDials :step="$clicks" /></LiveOnly></div>

<div class="bottom-line">这三处看似只是润色，却都改变了物理含义。</div>

<!--
Central message: 润色最常见的危害是悄悄改变结论的强弱和含义。
图示说明：三行典型改写，均为常见模式的示意，不来自某篇具体文章。下方三个表盘，三次点击：每点一次，一行高亮，对应表盘的指针从原文摆到润色后（变红），浅色指针留在原位。第二个表盘不是"更强"，而是换了一个量。
讲述：模型倾向于把句子写得更有力，这在广告里是优点，在论文里是缺陷。第一行，吻合不等于证明。第二行，精度（precision）是结果的离散程度，准确度（accuracy）是离真值多近，两个词不能互换。第三行把模型内的结论说成了自然规律。审稿人一眼就能看出来，而且会怀疑你其他的结论。
Timing target: 52:00–55:00，3 分钟。
Transition: 写作中哪些能交给它，哪些不能？
-->

---

# 写作的分工
<div class="subtitle">What to delegate and what to keep</div>

<div class="two">
<div class="box-evidence"><h3>交给它</h3><p>语法、用词、句子结构</p><p>把你的中文要点写成英文初稿</p><p>审稿回复的格式和语气</p><p>检查前后术语是否一致</p></div>
<div class="box-gap"><h3>自己把关</h3><p>文章的论点和结构</p><p>每一个数、每一条引用</p><p>结论说到什么程度</p><p>对审稿意见的物理回答</p></div>
</div>
<div class="bottom-line">AI 可以帮你组织语言，论点和结论由你把关。</div>

<!--
Central message: 语言层面交给 AI，论点、数值、引用和结论强度自己把关。
图示说明：左绿右红两栏。
讲述：右边四条有一个共同点：错了是你的责任，AI 不能署名，也不承担责任。中文要点写成英文初稿很好用，但要点必须是你自己的。审稿回复里，格式和语气可以交给它，物理上怎么回答审稿人，必须自己想清楚。
Timing target: 55:00–57:00，2 分钟。
Transition: 四个场景讲完。用久了会发现，每次都要重复交代同样的约定。怎么办？
-->

---
layout: section
---

<LiveOnly><ParticleField tone="dark" :seed="3" /></LiveOnly>

<div class="part-no">03</div>
<div class="kicker">PART 03 · 第三段</div>

# 让它越用越顺手

<div class="part-lead">项目说明文件与技能：把约定和流程写下来</div>
<div class="part-track"><span class="done"></span><span class="done"></span><span class="on"></span><span class=""></span><span class=""></span></div>

---
class: dense
---

# 项目说明文件：每次对话自动读入
<div class="subtitle">CLAUDE.md / AGENTS.md: the project's standing instructions</div>

<div class="code-scene">
<div>

```markdown
# CLAUDE.md（放在项目根目录）

## 物理约定
- 单位：MeV、fm；ħc = 197.327 MeV fm
- 两体问题一律用约化质量
- 光学势半径 R = r0 * At^(1/3)（全局光学势 KD02 的约定）

## 工作规则
- 改程序输入前，先找组里已验证的输入
- 任何数值结果都要给出对照和偏差
- 不许改 data/ 下的实验数据
```

</div>
<div class="scene-box"><LiveOnly><MemoryBeacon /></LiveOnly></div>
</div>

<div class="bottom-line">写一次，以后每次对话它都先读这份文件。</div>

<!--
Central message: 把反复交代的约定写进项目说明文件，减少重复说明。
图示说明：左边一份示例说明文件，内容正是今天前面翻车的那几条。右边三维示意：每个新对话先向说明文件取一次信息，再开始干活。
讲述：Claude Code 读 CLAUDE.md，Codex 读 AGENTS.md，Trae 等工具有类似的规则文件。开场演示的质量错误，写进这份文件就不会再发生。每次它犯一个错，你纠正之后，问自己：这条值不值得写进说明文件？这样文件会越来越长，它也越来越像一个懂你课题的师弟师妹。
Timing target: 58:00–61:00，3 分钟。
Transition: 约定之外，还有流程。
-->

---

# 技能：把一套流程写成文件
<div class="subtitle">A skill is a written procedure the agent loads on demand</div>

<div class="code-scene">
<div>

```markdown
# skills/fresco/SKILL.md

用途：写、运行、检查 FRESCO 输入
1. 从 examples/ 里最接近的输入出发
2. 只改能量、靶核、势参数
3. 运行后检查输出文件 fort.16 是否完整
4. 总反应截面与参考值比较
```

<div class="kami-card skill-diff"><p><b>说明文件</b>：每次都读，记录通用约定</p><p><b>技能</b>：用到时才读，说明这类任务的操作步骤</p></div>

</div>
<div class="scene-box"><LiveOnly><SkillShelf /></LiveOnly></div>
</div>

<!--
Central message: 技能把一类任务的标准流程写成文件，需要时自动调用。
图示说明：左边是一个简化的技能文件和它与说明文件的区别。右边三维示意：任务进来，只读取与当前任务有关的技能文件，其余不读。书脊上的名字只是示例。
讲述：技能（skill）就是一份写给 AI 的操作手册。你组里师兄口头传下来的经验，"跑 FRESCO 先看 fort.16"，写成技能以后，新来的同学和 AI 都能用。fort.16 是 FRESCO 的一个输出文件。技能目前在 Claude Code 里最成熟，其他工具也在跟进。
Timing target: 61:00–64:00，3 分钟。
Transition: 我把这个思路做到了核物理程序上。
-->

---

# 一个例子：FUSION
<div class="subtitle">我整理的一套技能，用于操作常用的公开核物理程序</div>

<div class="fusion-grid">
<div class="fusion-stats">
<div class="kami-card"><div class="stat">26<small>个技能</small></div><p>覆盖反应、结构等常用的公开核物理程序</p></div>
<div class="kami-card"><div class="stat">20<small>个程序</small></div><p>每个程序对应一个技能，从已验证的输入开始修改</p></div>
<div class="kami-card kami-card-accent"><div class="stat">✓<small>每个都有基准</small></div><p>复现已知结果，偏差在给定容差内</p></div>
</div>
<div class="fusion-scene"><LiveOnly><SkillConstellation /></LiveOnly></div>
</div>
<div class="bottom-line">就是把场景三的三步做法，写成了 20 份技能。</div>

<!--
Central message: FUSION 是把"改已验证输入加基准验收"系统化的一个例子。
图示说明：三张卡片：规模、做法、验收。
讲述：FUSION 是我做的一套技能集合，覆盖反应、结构等常用公开程序，比如前面的 FRESCO。每个技能做两件事：从一份验证过的输入出发，跑完和一个已知结果比较。大家不需要用它，重点是这个思路：你组里常用的程序，也可以这样写成技能。文章已提交 arXiv。
Timing target: 64:00–67:00，3 分钟。
Transition: 但它也有边界，而且这个边界对所有 AI 工具都成立。
-->

---
clicks: 1
class: scene-slide
---

# 基准测试检查程序的安装与运行
<div class="subtitle">A benchmark certifies the build, not the physics</div>

<LiveOnly><BenchmarkGate :step="$clicks" :height="300" /></LiveOnly>
<div class="bottom-line">物理判断，任何技能都替代不了。</div>

<!--
Central message: 自动验收只能保证数值实现正确，不能保证物理正确。
图示说明：三维示意，一次点击：程序穿过基准门，门变绿，三项打勾；点击后门后升起三根柱子：模型适合吗、参数合理吗、物理意义，红色虚线标出基准测试无法判断的问题。
讲述：这是我做 FUSION 学到的最重要的一课，也是最容易被误读的一点。基准通过了，说明你的 FRESCO 装得没问题、输入格式对；它不说明 KD02 适合你的能区，也不说明耦合道该开几个。和场景二是同一个道理：检查程序若沿用了同一个错误设定，也查不出这个错。
Timing target: 67:00–69:00，2 分钟。
Transition: 最后一段，底线。
-->

---
layout: section
---

<LiveOnly><ParticleField tone="dark" :seed="4" /></LiveOnly>

<div class="part-no">04</div>
<div class="kicker">PART 04 · 第四段</div>

# 守住底线

<div class="part-lead">用独立对照检查结果，按期刊要求说明 AI 的使用</div>
<div class="part-track"><span class="done"></span><span class="done"></span><span class="done"></span><span class="on"></span><span class=""></span></div>

---

# 数值结果，都要有独立对照
<div class="subtitle">Every number needs a reference it does not share inputs with</div>

<div class="two">
<div class="box-evidence"><h3>可用的独立对照</h3><p>自己推导的解析极限</p><p>相同约定下，另一程序的结果</p><p>相同计算设置下，已发表的数值</p><p>实验数据</p></div>
<div class="box-gap"><h3>这些还不够</h3><p>它说"我检查过了，结果正确"</p><p>AI 自己编写的检查程序</p><p>"程序跑通了"</p></div>
</div>

<div class="bottom-line">没有独立对照的数，不要写进论文。</div>

<!--
Central message: 写进论文的每个数都需要一个独立对照。
图示说明：左栏四类有效对照，右栏是不算数的自我报告。
讲述：这是全场最重要的一页，把前面几个场景串起来。解析极限：比如方势阱、纯库仑、零耦合。另一个程序：注意"同一约定"，场景三讲过。已发表数值：配置要完全一样。实验：最终的对照，但实验和模型的差别不一定是代码错误。AI 说"我检查过了，结果正确"，不算对照。
Timing target: 70:00–73:00，3 分钟。
Transition: 第二条底线，学术规范。
-->

---
class: compact-table
---

# 期刊怎么说：APS 的 AI 政策
<div class="subtitle">APS journals, updated AI policy, June 2026</div>

| 情况 | 要求 |
|---|---|
| 只做语言润色 | 不需要声明 |
| 推导、代码、数据分析、画图 | 必须声明：工具及版本、怎么用的、怎么核对的 |
| 声明放在哪 | 图注、方法或致谢；PRC 编辑部还要求写进投稿信 |
| AI 能不能署名 | 不能，作者对全部内容负责 |
| 审稿 | 稿件不得上传到通用 AI 工具 |

<div class="source">American Physical Society, "Appropriate Use of AI Tools", journals.aps.org/authors/ai-based-writing-tools；PRC（Physical Review C）投稿信一条为其编辑部 2026 年 7 月的要求，不在公开页面上。</div>

<!--
Central message: 实质性使用 AI 是允许的，但必须声明并由作者负责。
图示说明：APS 2026 年 6 月更新政策的要点表。
讲述：审稿一行的完整说法是：只有条款明确保证不用输入训练的工具才可以用，我自己的做法是审稿材料一律不上传。好消息是，APS 现在允许实质性使用 AI，包括写代码、推导、分析数据。条件是声明清楚三件事：用了什么、怎么用、怎么核对。"怎么核对"这一项，正好就是今天讲的对照。投稿信那一条是 PRC 编辑部直接告诉我的，比公开页面的写法更严。其他期刊和国内期刊的政策各不相同，投稿前查一下目标期刊的规定。
Timing target: 73:00–77:00，4 分钟。
Transition: 最后，回去怎么开始。
-->

---
layout: section
---

<LiveOnly><ParticleField tone="dark" :seed="5" /></LiveOnly>

<div class="part-no">05</div>
<div class="kicker">PART 05 · 第五段</div>

# 回去怎么开始

<div class="part-lead">用任务模板，从一个小练习开始</div>
<div class="part-track"><span class="done"></span><span class="done"></span><span class="done"></span><span class="done"></span><span class="on"></span></div>

---

# 把任务写清楚：一份可用的模板
<div class="subtitle">A task template you can copy</div>

<div class="kami-card task-brief" data-label="TASK CARD · 照着填" style="font-size:22px !important; line-height:1.85 !important;">
<b>目标</b>：我要算 / 写 / 查的是 ______<br>
<b>约定</b>：单位 ___，质量取法 ___，用到的参数来源 ___<br>
<b>起点</b>：从 ______（已验证的输入或程序）改起<br>
<b>验收</b>：和 ______（独立对照）比较，偏差小于 ___<br>
<b>交付</b>：程序、运行命令、原始输出、图；只许改 ___ 目录<br>
<b>暂停条件</b>：遇到 ______ 先停下来问我
</div>

<!--
Central message: 每个任务都按六项写清楚，再交给 AI。
图示说明：可直接复制的任务卡，六项对应今天讲过的内容。
讲述：逐项对应：约定来自场景二的质量翻车；起点来自场景三；验收和对照来自底线那一页；交付让你能复核；停下这一项防止它在你没注意的时候改掉重要的东西。最后一项很多人不写，但对长任务最有用。这张卡片放在讲稿 demo/prompt.md 里，课后可以拿到。
Timing target: 78:00–81:00，3 分钟。
Transition: 这周就可以做的一小步。
-->

---

# 这周就选一个小问题试试
<div class="subtitle">One step this week</div>

<div class="three">
<div class="kami-card"><h3><span class="num">01</span>练手</h3><p>挑一个你已经知道答案的小计算</p><p>按任务卡交给 AI</p></div>
<div class="kami-card"><h3><span class="num">02</span>观察</h3><p>检查它给出的结果</p><p>记下它在哪里替你做了选择</p></div>
<div class="kami-card"><h3><span class="num">03</span>写下来</h3><p>把这些选择写进项目说明文件</p><p>下次就不用再交代</p></div>
</div>
<div class="bottom-line">先在知道答案的问题上练手，再用到不知道答案的问题上。</div>

<!--
Central message: 从已知答案的小问题开始建立对 AI 的判断力。
图示说明：三步。
讲述：为什么要挑知道答案的问题？因为只有这样你才能看出它哪里错了。比如你课程作业里的一个散射问题、组里已经发表的一个数。做过三五次，你就知道它在哪类事情上可靠、在哪类事情上要盯紧。然后再用到你真正的课题上。
Timing target: 81:00–83:00，2 分钟。
Transition: 总结一下。
-->

---

# 总结
<div class="subtitle">Three things to take home</div>

<div class="takeaways">
<div class="item"><span class="n">01</span><span class="t">按任务选工具，上传前确认保密要求<small>对话助手、编程智能体、文献数据库，各有所长</small></span></div>
<div class="item"><span class="n">02</span><span class="t">写清计算约定、检查标准和所需文件<small>没交代的约定，它会自行选择，却未必告诉你</small></span></div>
<div class="item"><span class="n">03</span><span class="t">数值要有独立对照，引用要逐条核对原文<small>AI 自己编写的检查程序，也可能沿用原有的错误设定</small></span></div>
</div>
<div class="bottom-line">AI 帮你做，结论由你负责。</div>

<!--
Central message: 选对工具、写清任务、独立验收。
图示说明：三条要点，对应全场的三段。
讲述：三句话就够了。AI 会越来越强，今天讲的具体产品明年可能都换了，但这三条不会变：因为你要对结果负责。
Timing target: 83:00–85:00，2 分钟。
Transition: 欢迎提问。
-->

---
layout: center
---

<LiveOnly><ParticleField tone="light" :seed="9" :count="110" /></LiveOnly>

# 问答

<div class="subtitle">你的课题里，哪一步最想交给 AI？</div>

<!--
Central message: 把问答引向听众自己的课题。
讲述：如果冷场，先问：在座有谁已经用 AI 写过代码？遇到过什么问题？常见问题准备：(1) 用 AI 会不会让研究生不会编程？答：不会写就不会审，所以基本功更重要。(2) 哪个模型最好？答：按任务选，两个交叉核对。(3) 毕业论文能不能用？答：看学校规定，按 APS 的标准声明清楚。
Timing target: 85:00–90:00，5 分钟。
-->

---
routeAlias: bk-offline
---

# 备用：现场演示失败时的离线结果

```text
$ julia demo/square_well.jl
V0 (reduced mass) = 36.567 MeV
a_t (reduced mass) = 5.356 fm
V0 (nucleon mass) = 20.986 MeV
a_t (nucleon mass) = 4.105 fm

 E(MeV)   δ_numerov   δ_exact   |diff|    δ_badmass
   1.0   136.9283   136.9342   0.0059   132.9729
  10.0    86.5518    86.5556   0.0038    74.9974
  50.0    43.1032    43.1033  0.00017    29.7509
```

<div class="source">参考实现 demo/square_well.jl，运行约 1 秒；输出节选。</div>

<!--
Central message: 网络或账号出问题时，用会前算好的结果继续讲。
讲述：说明这是会前用同一个任务跑出来的参考结果，然后回到第 3 页继续。
-->

---
routeAlias: bk-convergence
---

# 备用：方势阱计算中，Numerov 仅呈一阶收敛

| 步长 h (fm) | 与解析解最大偏差 |
|---:|---:|
| 1×10⁻³ | 0.030° |
| 2×10⁻⁴ | 0.006° |

<div class="small mt-5"><p>Numerov 对光滑势是四阶方法，步长减半误差应降为 1/16。</p><p>方势阱在 r = R 处不连续，误差只随步长线性下降。</p><p>可以接着问 AI：为什么这里不是四阶？</p></div>

<!--
Central message: 收敛阶本身是一个检验，偏离预期要有物理解释。
讲述：步长缩小 5 倍，偏差也缩小约 5 倍，所以是一阶。原因是势在边界处有跳跃。这是一个好的追问题：能解释清楚的 AI 才是真的懂了这段代码。
-->

---
routeAlias: bk-seed
---

# 备用：固定随机种子，结果仍可能不同
<div class="subtitle">Monte Carlo checks need a stated statistical scope</div>

| 同一源代码、同一种子、同一配置 | macOS | Linux |
|---|---:|---:|
| SMASH，两事件的粒子记录数 | 990 | 978 |
| 净重子数，两事件合计 | 788 | 788 |
| 净电荷数，两事件合计 | 316 | 316 |

<div class="small mt-5"><p>SMASH：重离子碰撞的输运模拟程序。舍入差异会改变随机分支。</p><p>守恒量要逐事件一致；比较产额时，需要足够的事件数，并考虑统计误差。</p></div>

<!--
Central message: 随机模拟的跨平台验收要区分守恒约束和统计量。
讲述：如果有人问"AI 跑的蒙特卡罗结果和我的不一样，是不是错了"，用这页。同一种子在不同平台上可能走出不同的随机轨迹，这不代表程序坏了。守恒量（重子数、电荷）每个事件都必须守恒；产额这样的统计量要比分布和误差，不能比两个事件。
-->
