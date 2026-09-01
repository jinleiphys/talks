---
theme: default
title: "核物理需要什么样的 agent"
author: "金磊 Jin Lei"
transition: fade
mdc: true
fonts:
  provider: none
drawings:
  persist: false
---

<LiquidGlass />

<div style="display:flex; flex-direction:column; justify-content:center; height:100%; padding: 0 30px; position:relative; z-index:1">

<div class="ui-label plasma" style="margin-bottom:18px">复旦大学 · 2026 年 10 月 8 日</div>

<h1 style="font-size:2.9rem; line-height:1.2; max-width: 760px">核物理需要什么样的 <span style="color:var(--plasma)">agent</span></h1>

<p class="dim" style="font-size:1.15rem; margin-top:6px; max-width:680px">文献能翻回原文，程序能复现基准，还要把每次踩的坑记住</p>

<div class="glass-slot" style="display:inline-flex; gap:26px; align-items:center; margin-top:44px; width:max-content; padding:16px 26px">
<span class="mark" style="font-size:1.5rem"><span class="l">FU</span> <span class="l">▸</span><span class="r">◂</span> <span class="r">SION</span></span>
<span class="faint" style="font-size:.95rem">六万篇离线文献 · 20 个核物理程序的专家技能 · 开源</span>
</div>

<p class="faint" style="margin-top:40px">金磊 　同济大学物理科学与工程学院 　jinl@tongji.edu.cn</p>

</div>

<!--
这页只定一个问题：核物理同行真正需要什么样的 agent。

开场：今天不讲具体的反应理论。我想说说，文献、程序和验证怎么才能真正交给 agent 做一部分。

时间：0:00 到 0:40。
转场：先说清楚 agent 这个词。
-->

---

<div class="ui-label" style="margin-bottom:6px">一 · 什么是 agent</div>

# chatbot 停在答案，agent 会继续往下做

<div style="display:grid; grid-template-columns: 1fr 1.25fr; gap: 22px; margin-top: 22px">

<div class="glass">
<div class="ui-label">chatbot</div>
<p style="margin-top:10px">我问一句，它答一句。答完这一轮它就停了，留下的是一段文字。</p>
</div>

<div class="glass glass-plasma">
<div class="ui-label plasma">agent</div>
<p style="margin-top:10px">多了一层循环。它读完任务，先判断下一步该做什么：打开文件、运行命令，或者查资料。工具返回结果后，它再看一遍，决定继续、换一种做法，还是停下来报告。</p>
</div>

</div>

<div style="display:grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 18px">
<div class="glass" style="padding:14px 18px"><div class="ui-label plasma">模型</div><p style="font-size:.92rem; margin-top:6px">判断下一步</p></div>
<div class="glass" style="padding:14px 18px"><div class="ui-label plasma">工具</div><p style="font-size:.92rem; margin-top:6px">让它能实际操作</p></div>
<div class="glass" style="padding:14px 18px"><div class="ui-label plasma">上下文</div><p style="font-size:.92rem; margin-top:6px">决定它看得到什么</p></div>
<div class="glass" style="padding:14px 18px"><div class="ui-label plasma">循环</div><p style="font-size:.92rem; margin-top:6px">让它连续走很多步</p></div>
</div>

<div class="takeaway">我今天说的 agent，就是多了这个“看完结果再往下做”的循环。</div>

<!--
中心信息：agent 就是把模型放进一个"看结果再决定下一步"的循环里。

讲什么：先讲上面两个框，按真实操作顺序讲 agent 那一栏：读任务，判断，调工具，看返回，再判断。然后指着下面四个小框，一个词一个词过。不要展开讲每个部件，后面会回来。

时间：0:40 到 3:00。
转场：这不是概念，软件界已经在这么用了。
-->

---

<div class="ui-label" style="margin-bottom:6px">一 · 什么是 agent</div>

# 编程 agent 已经进了代码仓库

<div style="display:grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-top: 22px">

<div class="glass">
<div class="ui-label">它在软件界做的事</div>
<p style="margin-top:10px">进入一个代码仓库，自己读代码、改文件、运行测试。测试没过，它根据报错继续改。一项任务常常要走几十步。</p>
</div>

<div class="glass">
<div class="ui-label core">我这一年怎么用它</div>
<p style="margin-top:10px">写代码，让它先找现有实现再动手改。查文献，让它核对出处和数字。论文送出去以前，让它专门找漏洞。</p>
</div>

</div>

<div class="glass glass-plasma" style="margin-top:18px">
<p style="font-size:1.0rem">我通常不让一个模型既出主意又给自己打分。一个模型提方案，换一个模型挑错，最后的判断由我来做。</p>
</div>

<div class="takeaway">我现在已经把它当作日常工具，但不让它自己验收自己。</div>

<!--
中心信息：agent 在软件界已经是日常工具，我自己也在这么用。

讲什么：左框讲清楚"测试没过它会怎么办"，这是 agent 和 chatbot 的分界。右框讲自己的三个用法，讲得具体一点，比如审稿前让它找漏洞找到过什么。下面那句"两个模型互相挑错"是后面验证那一节的伏笔。

时间：3:00 到 5:30。
转场：那么一个 agent 到底由什么决定能干多少事。
-->

---

<div class="ui-label" style="margin-bottom:6px">一 · 什么是 agent</div>

# 同一个模型，换一套工具就是另一种 agent

<p style="margin-top:8px; max-width: 820px">模型当然重要，但同一个模型接上不同的工具、读到不同的资料，做出来的事会差很多。我把它写成一个很粗的式子：</p>

<div class="glass glass-plasma" style="margin-top:16px; text-align:center; padding: 22px">
<span style="font-size:1.55rem; font-weight:600">agent 的能力 ＝ 模型 × 工具和知识</span>
</div>

<div style="display:grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-top: 20px">

<div class="glass">
<div class="ui-label">模型</div>
<p style="margin-top:8px; font-size:.98rem">几个月换一代。我们实际用的是别人提供的模型。</p>
</div>

<div class="glass glass-core">
<div class="ui-label core">工具和知识</div>
<p style="margin-top:8px; font-size:.98rem">文献怎么整理，程序经验怎么留下，出了错拿什么检查。这些由我们自己写。所谓"技能"，就是一份 Markdown 文档，写清楚某类任务该怎么做，agent 接到任务时把它读进来。</p>
</div>

</div>

<div class="takeaway">模型会换代，自己写下的经验不必清零。</div>

<!--
中心信息：全场论点。模型是租来的，工具和知识是我们自己的。

讲什么：这一页说慢一点。式子写得粗，就说它粗。"技能"这个词今天会反复出现，在这里给定义：一份 Markdown 文档，不是模型，不是插件。

时间：5:30 到 8:00。
转场：接下来把这个式子套到核物理上。
-->

---

<div class="ui-label" style="margin-bottom:6px">二 · 核物理的 agent 长什么样</div>

# 我们一天里到底在忙什么

<div style="display:grid; grid-template-columns: repeat(7, 1fr); gap: 10px; margin-top: 26px">
<div class="glass" style="padding:14px 12px; text-align:center"><div class="ui-label">1</div><p style="font-size:.95rem; margin-top:6px">读文献</p></div>
<div class="glass" style="padding:14px 12px; text-align:center"><div class="ui-label">2</div><p style="font-size:.95rem; margin-top:6px">找实验数据</p></div>
<div class="glass" style="padding:14px 12px; text-align:center"><div class="ui-label">3</div><p style="font-size:.95rem; margin-top:6px">装程序</p></div>
<div class="glass" style="padding:14px 12px; text-align:center"><div class="ui-label">4</div><p style="font-size:.95rem; margin-top:6px">写输入卡</p></div>
<div class="glass" style="padding:14px 12px; text-align:center"><div class="ui-label">5</div><p style="font-size:.95rem; margin-top:6px">跑</p></div>
<div class="glass glass-core" style="padding:14px 12px; text-align:center"><div class="ui-label core">6</div><p style="font-size:.95rem; margin-top:6px">判断对不对</p></div>
<div class="glass" style="padding:14px 12px; text-align:center"><div class="ui-label">7</div><p style="font-size:.95rem; margin-top:6px">写论文</p></div>
</div>

<div style="display:grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-top: 26px">
<div class="glass">
<p style="font-size:.98rem">找源码，等编译，对着 300 页手册（或者没有手册）猜输入格式。这些琐事很容易吃掉大半天，物理判断却没往前走多少。</p>
</div>
<div class="glass glass-core">
<p style="font-size:.98rem">第 6 步最吃物理判断：这个数对不对。这里没有手册，没有报错信息，也没有人自动告诉你。</p>
</div>
</div>

<div class="takeaway">程序能告诉你它跑完了，不会告诉你这个数该不该信。</div>

<!--
这页要停在第 6 步：整条链里，它最需要物理判断，也最缺工具。

讲什么：七个框一口气过完，在第 6 个停下来。问一句：你上次算出一个数，是怎么确定它对的？

时间：8:00 到 10:00。
转场：那把编程 agent 直接拿过来干这七步会怎样。
-->

---

<div class="ui-label" style="margin-bottom:6px">二 · 核物理的 agent 长什么样</div>

# 最危险的错，程序照样给你一张好看的图

<div style="display:grid; grid-template-columns: 1.2fr 1fr; gap: 22px; margin-top: 20px">

<div class="glass">
<div class="ui-label core">一个真实的例子：FRESCO 的半径约定</div>
<p style="margin-top:10px; font-size:.96rem">FRESCO 造半径用 <code>R = r0 (Ap^1/3 + At^1/3)</code>，全局光学势 KD02 和 CH89 定义在 <code>R = r0 At^1/3</code> 上。通用 agent 按后者的习惯写输入卡，漏掉一行 <code>ap=0</code>。</p>
<p style="margin-top:8px; font-size:.96rem">核子入射时每个半径偏大约 <strong>22%</strong>。程序正常结束，退出码 0，图也好看。</p>
</div>

<div class="glass">
<div class="ui-label">还有</div>
<p style="margin-top:10px; font-size:.96rem">编一篇不存在的论文当引用。把训练语料里的旧参数当成当前版本。把一个跑通了的例子当成验证过了。</p>
</div>

</div>

<div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 18px">
<div class="glass" style="padding:14px 18px"><p style="font-size:.92rem">它的知识来自训练语料，你审不了，也改不了</p></div>
<div class="glass" style="padding:14px 18px"><p style="font-size:.92rem">没有基准，它没法判断这次输出可不可信</p></div>
<div class="glass" style="padding:14px 18px"><p style="font-size:.92rem">每次对话从零开始，踩过的坑不积累</p></div>
</div>

<div class="takeaway">22% 很尴尬：不至于一眼假，又足以改变物理结论。</div>

<!--
中心信息：通用 agent 的失败方式不是不会做，是做出一个看起来对的错结果。

讲什么：半径那个例子讲透，它是全场唯一一个技术细节。22% 停一下：不是差一个量级那种一眼看出来的错，也不是万分之一那种无所谓的错。下面三个框是根子，后面三样东西一一对应。

时间：10:00 到 12:30。
转场：所以核物理的 agent 得多三样东西。
-->

---

<div class="ui-label" style="margin-bottom:6px">二 · 核物理的 agent 长什么样</div>

# 我希望核物理 agent 随手能拿到这些

<div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-top: 30px">

<div class="glass glass-plasma">
<div class="ui-label plasma">它带着文献</div>
<p style="margin-top:10px; font-size:.98rem">六万篇 nucl-th 论文放在本地，一篇一页，带引用关系。它引的每一篇、每一个数字，都能翻回原文核对。</p>
</div>

<div class="glass">
<div class="ui-label">它会用我们的程序</div>
<p style="margin-top:10px; font-size:.98rem">FRESCO、TALYS、KSHELL、SMASH……每个程序一份写下来的专家经验：怎么装、输入卡里的坑、拿什么已知结果对、容差多少。</p>
</div>

<div class="glass glass-core">
<div class="ui-label core">它记得你做过什么</div>
<p style="margin-top:10px; font-size:.98rem">你的论文、你的合作者、你上次踩的坑，写在一个它每次都读的档案里。换一个模型，档案还在。</p>
</div>

</div>

<div class="takeaway">模型是租来的。我真正想留下的，是文献、程序经验和自己的记录。</div>

<!--
中心信息：核物理 agent 的核心不是模型，是它手边的三样东西。

讲什么：三个框对应上一页的三个根子：训练语料不可审，对应带着文献；没有基准，对应程序经验里的已知结果和容差；不积累，对应档案。

时间：12:30 到 14:30。
转场：这三样东西我做了一个实现。
-->

---

<div class="ui-label" style="margin-bottom:6px">二 · 核物理的 agent 长什么样</div>

# 我把它做成了 FUSION

<div style="display:grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-top: 20px">

<div class="glass glass-plasma">
<div class="ui-label plasma">文献层</div>
<p style="margin-top:8px"><span style="font-size:1.7rem; font-weight:600">61,167</span> <span class="dim">页</span></p>
<p style="font-size:.95rem">61,059 篇 arXiv nucl-th 论文页 + 108 个主题页，加引用层和语义关系层。离线，grep 可读。</p>
</div>

<div class="glass glass-core">
<div class="ui-label core">技能层</div>
<p style="margin-top:8px"><span style="font-size:1.7rem; font-weight:600">26</span> <span class="dim">份技能</span></p>
<p style="font-size:.95rem">20 份各驱动一个核物理程序，1 份拟合，1 份查 EXFOR，1 份查文献库，2 份维护你自己的研究档案，1 份负责安装。</p>
</div>

</div>

<div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 18px">
<div class="glass" style="padding:14px 18px"><div class="ui-label">不绑定 agent</div><p style="font-size:.92rem; margin-top:6px">opencode、Claude Code、Codex 都能直接加载</p></div>
<div class="glass" style="padding:14px 18px"><div class="ui-label">不绑定模型</div><p style="font-size:.92rem; margin-top:6px">DeepSeek、Qwen、GLM 能跑，Claude、GPT 也能跑</p></div>
<div class="glass" style="padding:14px 18px"><div class="ui-label">开源</div><p style="font-size:.92rem; margin-top:6px">MIT · github.com/jinleiphys/FUSION</p></div>
</div>

<div class="takeaway">主体就是 Markdown 和 shell 脚本，换模型时不用搬家。</div>

<!--
中心信息：FUSION 就是上一页三样东西的实现，两层，开源。

讲什么：数字口径：20 是驱动具体程序的技能，26 是全部。第三样东西"档案"就是那两份维护研究档案的技能，今天不展开。

时间：14:30 到 16:00。
转场：先看文献这一层能替你做什么。
-->

---

<div class="ui-label" style="margin-bottom:6px">三 · 文献：它能帮你做什么</div>

# 六万篇论文，就放在一批普通文件里

<div style="display:grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-top: 20px">

<div class="glass glass-plasma">
<div class="ui-label plasma">papers/</div>
<p style="margin-top:8px; font-size:.95rem">61,059 篇，一篇一页。摘要，再加一段读全文写出来的摘要：主张、方法、关键数字、上下文。文末是语料内谁引了它、它引了谁。</p>
</div>

<div class="glass">
<div class="ui-label">topics/</div>
<p style="margin-top:8px; font-size:.95rem">108 个 PhySH 主题页，就是 APS 编辑分类用的那套标题。每页列这个主题里被引最多的论文和最新的论文。</p>
</div>

<div class="glass">
<div class="ui-label">citations.tsv</div>
<p style="margin-top:8px; font-size:.95rem">70 万条语料内引用边，从 .tex 参考文献解析出来。</p>
</div>

<div class="glass">
<div class="ui-label">relations.tsv</div>
<p style="margin-top:8px; font-size:.95rem">23 万条带类型的引用：uses、compares、extends、contrasts、applies。只有真正在正文里用到、比较或反驳的才记类型。</p>
</div>

</div>

<div class="takeaway">只要能读 Markdown、TSV 和 grep，它就能查这批文献。</div>

<!--
中心信息：文献层不是一个搜索引擎，是一堆本地文本文件，任何 agent 都能直接读。

讲什么：强调"离线"和"grep"。在计算节点上、在没有网的地方、在不想把稿子传出去的时候，它照样能用。

时间：16:00 到 18:00。
转场：这批语料有一个可看的形态。
-->

---

<div class="ui-label" style="margin-bottom:6px">三 · 文献：它能帮你做什么</div>

<div style="display:flex; gap: 26px; align-items:center; margin-top: 6px">
<img src="./figures/corpus-map.png" class="fig" style="max-height: 440px" />
<div style="max-width: 300px">
<div class="glass">
<div class="ui-label plasma">引用关系的二维投影</div>
<p style="font-size:.92rem; margin-top:8px">55,850 篇论文的引用投影。地形是论文密度，一个点是一篇论文，面积正比于语料内被引次数。地名取自 PhySH 主题。</p>
<p class="faint" style="margin-top:8px">一条引用边都没画。这个量级画边一定是毛球。</p>
</div>
</div>
</div>

<!--
中心信息：这批语料是有结构的，而结构能被看见。

讲什么：先让听众看 5 秒。然后指几个他们认识的区域：做反应的那一片在哪，格点 QCD 在哪。QCD 这个主题有七千多篇，横跨全图，所以没有标注，它是通用语言，不是地点。

时间：18:00 到 19:00。
转场：接下来现场跑一个。
-->

---

<div class="ui-label" style="margin-bottom:6px">三 · 文献：它能帮你做什么</div>

# 演示一：断网，只给它一篇 PDF

<div class="glass glass-plasma" style="margin-top: 20px; max-width: 760px">
<div class="ui-label plasma">交给它的原话</div>
<p style="margin-top:10px; font-size:1.05rem">这篇论文（Abu-Ibrahim 等，PRC 77, 034607）在我们的知识库里是哪一篇？它引了谁，谁引了它？摘要里有什么可以直接核对的数字？</p>
</div>

<div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 20px; max-width: 860px">
<div class="glass" style="padding:14px 18px"><div class="ui-label">先定位论文</div><p style="font-size:.92rem; margin-top:6px">它靠标题和作者把 PDF 定位到 <code>0710.4193</code>，没有联网</p></div>
<div class="glass" style="padding:14px 18px"><div class="ui-label">再顺着引用走</div><p style="font-size:.92rem; margin-top:6px">这篇在语料内引了 8 篇，被 5 篇引用，包括同组前作和 <sup>22</sup>C 双中子晕的工作</p></div>
<div class="glass" style="padding:14px 18px"><div class="ui-label">落到可核对的数字</div><p style="font-size:.92rem; margin-top:6px">p+<sup>12</sup>C 在 40 MeV 的 σ<sub>R</sub> = 432 mb，可以直接翻原文</p></div>
</div>

<p class="faint" style="margin-top: 22px">备份录屏：<code>demo-kb.mp4</code></p>

<!--
中心信息：一句自然语言，离线，从一篇 PDF 走到可核对的数字。

演示注意：切屏前先关 Wi-Fi，让听众看到断网。终端字号调大。30 秒没实质进展就切录屏，不解释，不道歉，不现场调试。

时间：19:00 到 23:30，共 4 分半。
转场：回来以后先讲它的两条限制。
-->

---

<div class="ui-label" style="margin-bottom:6px">三 · 文献：它能帮你做什么</div>

# 这批文献不能替你引文

<div style="display:grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-top: 24px">

<div class="glass glass-core">
<div class="ui-label core">页面会错</div>
<p style="margin-top:10px">每页的摘要是模型读全文写出来的。它会漏，也会写错数字。所以规矩是：引论文，不引页面。页面只负责把你带到那篇论文。</p>
</div>

<div class="glass glass-core">
<div class="ui-label core">引用只在语料内</div>
<p style="margin-top:10px">刚才那篇"被引 5 次"，只统计了 nucl-th 内部。RIKEN 的实验论文不在这批语料里，所以这个数低估了真实引用。一个 miss 不是不存在的证据。</p>
</div>

</div>

<div class="takeaway">所以我把它当导航，不当引用来源；一次搜不到，也不能说文献不存在。</div>

<!--
中心信息：文献层的价值在于离线和可核对，它的两条限制要跟能力放在同一页讲。

时间：23:30 到 24:30。
转场：第二样东西，程序。
-->

---

<div class="ui-label" style="margin-bottom:6px">四 · 程序：它能帮你做什么</div>

# FRESCO 那个 22% 的坑，写下来只占一行

<div style="display:grid; grid-template-columns: 1.15fr 1fr; gap: 18px; margin-top: 10px">

<div class="glass" style="padding:16px 20px">
<div class="ui-label nocaps">skills/fresco/SKILL.md，原文</div>
<p style="margin-top:6px; font-family: 'SF Mono', Menlo, monospace; font-size:.72rem; line-height:1.55; color: var(--ink)">
<b>Never report a FRESCO number you have not verified.</b> For any new deck, either reproduce a known case or run the built-in convergence checks. State the agreement explicitly.<br><br>
<b>Start from a verified example, do not hand-write a deck from memory.</b> FRESCO syntax is easy to get subtly wrong, and a wrong deck often still runs and prints plausible garbage.<br><br>
<b>The radius convention.</b> FRESCO builds radii as <code>R = r0*(Ap^1/3 + At^1/3)</code>, while KD02 and CH89 are defined on <code>R = r0*At^1/3</code>. The fix is <code>ap=0</code> in the <code>type=0</code> line, which the script always emits.
</p>
</div>

<div>
<div class="glass glass-plasma" style="padding:16px 20px">
<div class="ui-label plasma nocaps">references/verification.md，锚点表节选</div>
<table class="anchors" style="margin-top:6px; font-size:.8rem"><tbody>
<tr><td>B1 弹性 σ<sub>R</sub></td><td>1575.17495</td><td>参考 1575.17481</td><td>7 位</td></tr>
<tr><td>B2 非弹 2<sup>+</sup></td><td>31.67415</td><td>31.67415</td><td>逐位</td></tr>
<tr><td><sup>11</sup>Be CDCC σ<sub>R</sub></td><td>2758.68730</td><td>2758.68730</td><td>逐位</td></tr>
<tr><td>(d,p) DWBA</td><td>0.26397</td><td>0.26397</td><td>逐位</td></tr>
</tbody></table>
</div>
<p class="faint" style="margin-top:10px">装、写、跑、验，都在这一份文档和它带的脚本里。装是从上游源码编译，不是拷缓存。</p>
</div>

</div>

<div class="takeaway" style="margin-top:14px">下次再写输入卡，脚本会直接给出 <code>ap=0</code>，不靠 agent 临场想起来。</div>

<!--
中心信息：技能不是模型，是一份写着"怎么装、怎么写、怎么验、坑在哪"的文档，agent 需要时读。

讲什么：左边三段原文念一下，特别是第二段"a wrong deck often still runs and prints plausible garbage"。右边锚点表说明"验"是拿什么验：程序自己发行版里的参考输出，对到 7 位或逐位。

时间：24:30 到 26:30。
转场：这样的技能一共写了 20 份。
-->

---

<div class="ui-label" style="margin-bottom:6px">四 · 程序：它能帮你做什么</div>

# 现在有 20 份程序技能

<div style="display:grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 20px">
<div class="glass" style="padding:16px 20px"><div class="ui-label plasma">反应、光学模型</div><p style="font-size:.95rem; margin-top:6px">FRESCO（含 SFRESCO 拟合）、COLOSS、CCFULL、pikoe、NLAT、CNOK、SIDES、SWANLOP</p></div>
<div class="glass" style="padding:16px 20px"><div class="ui-label plasma">结构、从头算</div><p style="font-size:.95rem; margin-top:6px">GSM、KSHELL、NuclearToolkit.jl、Sky3D</p></div>
<div class="glass" style="padding:16px 20px"><div class="ui-label plasma">裂变、统计模型</div><p style="font-size:.95rem; margin-top:6px">CGMF、TALYS</p></div>
<div class="glass" style="padding:16px 20px"><div class="ui-label plasma">核天体、R 矩阵</div><p style="font-size:.95rem; margin-top:6px">AZURE2、SkyNet</p></div>
<div class="glass" style="padding:16px 20px"><div class="ui-label plasma">重离子输运、状态方程</div><p style="font-size:.95rem; margin-top:6px">SMASH、GiBUU、Thermal-FIST、vHLLE</p></div>
<div class="glass" style="padding:16px 20px"><div class="ui-label core">实验数据</div><p style="font-size:.95rem; margin-top:6px">EXFOR 检索与解析</p></div>
</div>

<div class="takeaway">我只收公开可得、能从源码编译、有正式论文的程序。能验到什么程度，每份都明写。</div>

<!--
中心信息：20 个程序，覆盖反应、结构、裂变、核天体、重离子五块，加实验数据。

讲什么：不要一个一个念。指出在座的人可能用的那几个。入选条件那句要说，它解释了为什么有些程序没进来。

时间：26:30 到 27:30。
转场：现场跑一个。
-->

---

<div class="ui-label" style="margin-bottom:6px">四 · 程序：它能帮你做什么</div>

# 演示二：一句话算 n+<sup>90</sup>Zr

<div class="glass glass-plasma" style="margin-top: 20px; max-width: 760px">
<div class="ui-label plasma">交给它的原话</div>
<p style="margin-top:10px; font-size:1.05rem">算 50 MeV 的 n+<sup>90</sup>Zr 弹性散射，用 KD02 全局光学势，然后跟 EXFOR 上有的实验数据比一下。</p>
</div>

<div style="display:grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 20px">
<div class="glass" style="padding:14px 18px"><div class="ui-label">参数有出处</div><p style="font-size:.9rem; margin-top:6px">直接读本地的 Koning 原始 <code>kd02.f</code>，不凭记忆拼公式</p></div>
<div class="glass" style="padding:14px 18px"><div class="ui-label">半径约定</div><p style="font-size:.9rem; margin-top:6px">输入卡里明确写出 <code>ap=0</code></p></div>
<div class="glass" style="padding:14px 18px"><div class="ui-label">收敛</div><p style="font-size:.9rem; margin-top:6px">步长减半，分波数加倍，再算一遍</p></div>
<div class="glass" style="padding:14px 18px"><div class="ui-label">EXFOR</div><p style="font-size:.9rem; margin-top:6px">查完如实报告：50 MeV 没有数据</p></div>
</div>

<p class="faint" style="margin-top: 22px">这句话里没有任何一个文件名、路径或者参数。备份录屏：<code>demo-n90zr.mp4</code></p>

<!--
中心信息：一句自然语言，覆盖找参数、写输入、编译、运行、解析、找数据、作图。

讲什么：把那句话念出来，停两秒再切屏。四个节点在演示过程中点出来，第四个最重要：它没有编一组数据出来，它说没有。

演示注意：30 秒没实质进展切录屏。

时间：27:30 到 32:00，共 4 分半。
转场：回来以后讲凭什么信它。
-->

---

<div class="ui-label" style="margin-bottom:6px">四 · 程序：它能帮你做什么</div>

# 我怎么知道它没有偷偷跑错

<div class="tight" style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px">

<div class="glass">
<div class="ui-label plasma">1 · 对着已知答案</div>
<p style="font-size:.92rem; margin-top:6px"><b>Tier 1</b>，14 份：程序发行版自带参考值，技能复现它，几份逐位相同。<b>Tier 2</b>，6 份：程序不带参考输出，改用跨平台复现、物理恒等式或解析解钉住。vHLLE 对的是闭式 Gubser 流，不是它自己的输出。</p>
</div>

<div class="glass">
<div class="ui-label plasma">2 · 两个平台</div>
<p style="font-size:.92rem; margin-top:6px">macOS/ARM 和 Linux/x86 各建一遍。SMASH 同一种子下部分多重性两边差到 25%，重子数 B = 788 和电荷 Q = 316 两边都是精确整数。于是验证器改锚在守恒律上。</p>
</div>

<div class="glass">
<div class="ui-label plasma">3 · 第二个求解器</div>
<p style="font-size:.92rem; margin-top:6px">n+<sup>90</sup>Zr，50 MeV：COLOSS（复标度 Lagrange-Laguerre）1299.188 mb，FRESCO（Numerov）1299.191 mb，6 位一致。两个程序不共享一行代码。收敛只证明算稳了，独立实现一致才证明算对了。</p>
</div>

<div class="glass glass-core">
<div class="ui-label core">4 · 另一个 AI 来拆台</div>
<p style="font-size:.92rem; margin-top:6px">发布前让第二个模型读技能、跑脚本、专门找茬。它抓到过：TALYS 的运行脚本跑了一份旧输入卡然后报告成功；GiBUU 的一个自检永远不可能触发；SMASH 的测试在伪造自己的输入。</p>
</div>

</div>

<div class="takeaway" style="margin-top:16px">TALYS 那次最刺眼：脚本跑的是旧输入卡，却很自信地报告成功。</div>

<!--
中心信息：可信度是分层的、公开的、逐条可查的，不是一句"我们测试过了"。

讲什么：第 3 层对做数值的听众最有说服力。第 4 层要主动讲，它是自己揭自己的短，也是最能建立信任的地方。如果有人问"审查者本身怎么保证"，答：保证不了，所以有另外三层，任何单层都不够。

时间：32:00 到 34:30。
转场：讲完这些，必须说一句最重要的限制。
-->

---

<div class="ui-label" style="margin-bottom:6px">四 · 程序：它能帮你做什么</div>

<div style="display:flex; flex-direction:column; justify-content:center; height:88%">

<h1 style="font-size:2.3rem; max-width: 900px">基准过了，只能说这次构建复现了已知结果</h1>
<h1 style="font-size:2.3rem; color: var(--core); max-width: 900px">离“这次物理算对了”还差一步</h1>

<div class="glass" style="margin-top: 30px; max-width: 720px">
<p>选哪个光学势，连续态怎么切，能量范围合不合适，这些还是你的事。</p>
<p style="margin-top:6px"><strong>这一步，我不交给 agent。</strong></p>
</div>

</div>

<!--
中心信息：验证有边界。它验的是构建，不是你的物理。

讲什么：这一页只有两句话，说完停一下。

时间：34:30 到 35:30。
转场：最后讲这件事对我们的研究方式意味着什么。
-->

---

<div class="ui-label" style="margin-bottom:6px">五 · 这对研究方式意味着什么</div>

# 很多关键经验，手册里根本没写

<div style="display:grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-top: 22px">

<div class="glass">
<div class="ui-label">靠口头传</div>
<p style="margin-top:10px; font-size:.98rem">核物理程序里很多经验不在手册里。某一行输入为什么必须这样写，哪个默认值不能信，一次计算该拿什么结果来检查，只有实际用过的人知道。这些话在课题组里口传。学生毕业，电脑换了，很多细节就断了。</p>
</div>

<div class="glass glass-plasma">
<div class="ui-label plasma">写进仓库</div>
<p style="margin-top:10px; font-size:.98rem">写成仓库里的 Markdown。别人可以直接读，可以指出哪一句有问题，也可以提交修改。下次 agent 再遇到同一个坑，读到的是已经改过的版本。</p>
</div>

</div>

<div class="takeaway">我想留下的，就是这些手册里找不到的一句话。</div>

<!--
这页讲我最在意的变化：那些口头经验终于有了可以检查、修改和继续用的形式。

时间：35:30 到 37:30。
转场：那一天的工作会变成什么样。
-->

---

<div class="ui-label" style="margin-bottom:6px">五 · 这对研究方式意味着什么</div>

# 我不想再把大半天花在找文件和猜格式上

<div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap: 18px; margin-top: 22px">

<div class="glass">
<div class="ui-label">早上</div>
<p style="margin-top:8px; font-size:.95rem">给 agent 一个具体的物理问题。它先查文献，找到计算条件和可以核对的数字；再准备输入，跑两三个程序，把结果放在一起比。</p>
</div>

<div class="glass">
<div class="ui-label">中间</div>
<p style="margin-top:8px; font-size:.95rem">不会全顺。程序可能装不上，输入卡可能报错，两个求解器可能不一致。它继续查文件、改输入、补收敛检查，把过程留下来。</p>
</div>

<div class="glass glass-core">
<div class="ui-label core">到我这里</div>
<p style="margin-top:8px; font-size:.95rem">问题应该已经收缩成几项清楚的判断：物理模型选得对不对，近似能不能用，差异意味着什么。</p>
</div>

</div>

<div class="takeaway">到了物理模型、近似和结果解释，还是我来定。</div>

<!--
这页别讲成全自动流水线。agent 负责把问题缩小，物理判断留给我。

讲什么：中间那一栏要讲，别把它说成流水线。真实计算会报错、会不一致，agent 的价值是把这些过程留下来给你看。

时间：37:30 到 39:00。
转场：说完它能做什么，说它现在做不到的。
-->

---

<div class="ui-label" style="margin-bottom:6px">五 · 这对研究方式意味着什么</div>

# v0.1.0 还有这些硬伤

<div style="display:grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 20px">
<div class="glass"><div class="ui-label core">冷启动安装</div><p style="font-size:.95rem; margin-top:6px">只完整验过 FRESCO 能从空缓存装起来。其余 19 个程序没有逐个做同样的测试，别的机器上大概率缺依赖。</p></div>
<div class="glass"><div class="ui-label core">国内网络</div><p style="font-size:.95rem; margin-top:6px">校园网直连 GitHub，我试了六次，六次都失败，需要代理。镜像还没做。</p></div>
<div class="glass"><div class="ui-label core">磁盘与平台</div><p style="font-size:.95rem; margin-top:6px">TALYS 要 11 GB，其中 8.6 GB 是结构数据库，不要拿它当第一个试。Windows 没有构建。</p></div>
<div class="glass"><div class="ui-label core">用过的人</div><p style="font-size:.95rem; margin-top:6px">v0.1.0 是第一个公开版本。我每天在用，除我之外还没有人用过。</p></div>
</div>

<div class="takeaway">演示能顺利跑完，不等于别人的机器上也能开箱即用。</div>

<!--
中心信息：把已知的坑一次说完，不留给听众自己去踩。

讲什么：语速可以快，一条都不省。国内网络那条在座大多数人真去试都会先撞上。

时间：39:00 到 40:30。
转场：所以我最想要什么反馈。
-->

---

<div class="ui-label" style="margin-bottom:6px">五 · 这对研究方式意味着什么</div>

# 如果它算错了，请直接告诉我

<div class="glass glass-core" style="margin-top: 20px; max-width: 820px">
<p style="font-size:1.02rem">对我最有用的反馈，是一个看起来合理、图也画得很好，但物理上其实错了的结果。请告诉我错在哪里，为什么现有基准没有拦住它。</p>
</div>

<div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 18px; max-width: 900px">
<div class="glass" style="padding:14px 18px"><div class="ui-label">装不上</div><p style="font-size:.92rem; margin-top:6px">留下系统、编译器版本、报错位置和你试过的办法</p></div>
<div class="glass" style="padding:14px 18px"><div class="ui-label">别扭</div><p style="font-size:.92rem; margin-top:6px">操作过程里任何让你觉得别扭的地方</p></div>
<div class="glass" style="padding:14px 18px"><div class="ui-label">缺一份</div><p style="font-size:.92rem; margin-top:6px">你常用的程序还没有技能，直接提</p></div>
</div>

<div class="takeaway">对我来说，一个真的失败样例，比“很好用”有价值得多。</div>

<!--
中心信息：把最有价值的反馈类型说清楚，降低反馈门槛。

讲什么：第一种反馈是这个项目最怕的失败，也是最不容易被报告出来的失败，因为按定义它看起来是成功的。

时间：40:30 到 42:00。
转场：最后回到开头那个问题。
-->

---

<div style="display:flex; flex-direction:column; justify-content:center; height:100%; padding: 0 30px">

<div class="mark" style="font-size:1.6rem; margin-bottom:30px"><span class="l">FU</span> <span class="l">▸</span><span class="r">◂</span> <span class="r">SION</span></div>

<h1 style="font-size:2.4rem; max-width: 860px">跑起来不难，难的是知道它跑对了</h1>

<div class="glass" style="margin-top: 22px; max-width: 800px">
<p style="font-size:1.0rem">程序返回退出码 0，图也画出来了，还不够。你得知道输入约定有没有弄错，数值收敛了没有，能不能复现已知基准，这套物理在当前条件下能不能用。我做 FUSION，是想把这些能写清楚的经验留下来。人可以读，agent 也可以读；哪句写错了，别人还能直接改。</p>
</div>

<p style="margin-top: 30px; font-size:1.15rem; font-weight:500">模型是租来的；文献、程序经验和档案，是我们自己的。</p>

<p class="faint" style="margin-top: 26px">github.com/jinleiphys/FUSION　·　vibeinscience.com　·　MIT　·　jinl@tongji.edu.cn</p>

</div>

<!--
中心信息：收在全场那一句上。

讲什么：不要再复述技能数量或者语料规模。念完那一句就停，进入提问。

时间：42:00 到 44:00，然后提问。
-->

---

<div class="ui-label" style="margin-bottom:6px">备用</div>

# 26 份技能的完整清单

<div style="display:grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 18px; font-size:.9rem">
<div class="glass" style="padding:16px 20px">
<div class="ui-label plasma">驱动程序，20 份</div>
<p style="margin-top:6px; font-size:.9rem">fresco · sfresco · coloss · ccfull · pikoe · nlat · cnok · sides · swanlop · gsm · kshell · nucleartoolkit · sky3d · cgmf · talys · azure2 · skynet · smash · gibuu · thermal-fist · vhlle</p>
</div>
<div class="glass" style="padding:16px 20px">
<div class="ui-label core">其余 6 份</div>
<p style="margin-top:6px; font-size:.9rem">exfor-data（实验数据）· kb-search（离线文献库）· literature-wiki（你读过的文献）· research-profile（你的研究档案）· fusion-setup（安装与初始化）</p>
<p class="faint" style="margin-top:8px">sfresco 算在 20 份里作为 FRESCO 的拟合伴侣；这里按目录数。</p>
</div>
</div>

---

<div class="ui-label" style="margin-bottom:6px">备用</div>

# 安装与网络

<div style="display:grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-top: 18px">
<div class="glass" style="font-family: 'SF Mono', Menlo, monospace; font-size:.82rem; line-height:1.8">
git clone https://github.com/jinleiphys/FUSION.git && cd FUSION<br>
curl -fsSL .../releases/latest/download/fusion-darwin-arm64.tar.gz | tar -xz<br>
xattr -d com.apple.quarantine fusion &nbsp;&nbsp;# macOS<br>
./fusion
</div>
<div class="glass">
<p style="font-size:.95rem">只有前两条命令需要 GitHub。之后每个程序从它自己的上游取源码，知识库已经在 clone 里。clone 约 256 MB，落盘约 950 MB，几乎全是知识库。</p>
<p style="font-size:.95rem; margin-top:8px">已经在用 Claude Code 或 Codex 的人，clone 下来直接用，不需要那个二进制。</p>
</div>
</div>

---

<div class="ui-label" style="margin-bottom:6px">备用</div>

# 语料地图是怎么算出来的

<div style="display:grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-top: 18px">
<div class="glass">
<div class="ui-label plasma">布局</div>
<p style="font-size:.95rem; margin-top:6px">引用邻接矩阵，截断 SVD 降到 32 维，t-SNE 投到二维。最小度数 2，perplexity 200。61k 个节点约 90 秒。</p>
</div>
<div class="glass">
<div class="ui-label plasma">渲染</div>
<p style="font-size:.95rem; margin-top:6px">密度场分箱加高斯模糊得到地形；点面积正比于语料内被引次数；地名从 PhySH 主题里按离散度比值 ≤ 0.78 筛出来，不是人工挑的。纯 Python 标准库。</p>
</div>
</div>

---

<div class="ui-label" style="margin-bottom:6px">备用</div>

# 这跟通用 AI 编程助手有什么区别

<div style="display:grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-top: 18px">
<div class="glass">
<div class="ui-label">通用助手</div>
<p style="font-size:.95rem; margin-top:6px">知识来自训练语料，审不了改不了。没有基准，判断不了这次输出可不可信。每次从零开始，错误不积累修正。</p>
</div>
<div class="glass glass-plasma">
<div class="ui-label plasma">技能</div>
<p style="font-size:.95rem; margin-top:6px">知识是仓库里的 Markdown，可读可审可改。每份带一个已知答案和明确容差。一次发现的坑写进文档，之后所有人受益。</p>
</div>
</div>

<div class="takeaway">我关心的是知识放在哪里，能不能被审，以及出错以后谁来改。</div>
