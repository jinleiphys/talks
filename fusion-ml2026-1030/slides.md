---
theme: seriph
title: 'Using AI in Research: Lessons from FUSION'
titleTemplate: '%s · 金磊'
info: '给仍在网页聊天里使用 AI 的研究生：我平时让 agent 做什么，它怎样做完，又怎样错得很像对。'
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
<div class="signoff"><div class="ui-label">TODAY</div><div class="slip-title">从聊天窗口到 agent</div><div class="row"><span>我平时让它做什么？</span><span>①</span></div><div class="row"><span>现场演示：一句话到实验对比</span><span>②</span></div><div class="row"><span>它怎样错得很像对？</span><span>③</span></div></div>
</div>

<!--
Central message: 今天讲我自己怎么用 agent，不讲产品介绍。
讲述：有多少同学用过网页上的 GPT 或者 DeepSeek？有多少同学让它直接改过你电脑里的文件、跑过你的程序？今天我讲三件事：我最近实际让它做了什么；现场演示一次：一句话，从光学势算到和实验数据对比；最后讲它错的时候是什么样子，这部分最重要。
Timing target: 0:00–1:00。
Transition: 先看一张截图。
-->

---
class: news-example
clicks: 1
---

# 哪句话不该出现在书里？
<div class="subtitle">A chat reply made its way into the finished text</div>

<div class="news-heading"><img src="./figures/chat-residue-news.png" alt="文章截图标题：纸质书中出现 AI 提示词" /></div>
<div class="news-detail"><img src="./figures/chat-residue-news.png" alt="书页截图中残留：需要我再微调部分语句，让整体文风更贴合悬疑灵异的氛围吗？" /></div>
<div v-click="1" class="bottom-line">“需要我再微调部分语句……”是 AI 对用户说的话，被复制进了正文。</div>

<!--
Central message: 聊天窗口的产出，要靠人复制搬运，搬运就会出错。
讲述：［停 20 秒，让学生找。］这句话是 AI 问作者的，怎么进了正文？因为聊天窗口给的是一段文字，从文字到成品，中间全靠人复制。今天的问题就是：这个搬运的活，能不能交给它自己做，做完我们查什么。
Timing target: 1:00–3:00。
Transition: 写代码的时候，我们搬运得更多。
-->

---
clicks: 5
class: scene-slide
---

# 用网页写代码，你在当搬运工
<div class="subtitle">Copy code, run it, paste the error, repeat</div>

<DeskScene mode="web" :step="$clicks" :height="300" cols="1.75fr 1fr" v-slot="{ k }">
<div class="handoff-steps">
<div :class="{ on: k === 1, done: k > 1 }"><span>AI</span><b>给一段代码</b><small>聊天窗口</small></div>
<div :class="{ on: k === 2, done: k > 2 }"><span>你</span><b>复制、保存、运行</b><small>你电脑上的文件</small></div>
<div :class="{ on: k === 3, done: k > 3 }"><span>你</span><b>把报错贴回去</b><small>回到聊天窗口</small></div>
<div :class="{ on: k === 4, done: k > 4 }"><span>AI</span><b>给修改版</b><small>再来一次</small></div>
</div>
</DeskScene>

<div v-click="5" class="bottom-line">它看不到你的文件，跑不了你的程序，也看不到运行结果。它知道的一切，都是你贴给它的。</div>

<style>
.handoff-steps > div { display: grid; grid-template-columns: 34px 1fr; column-gap: 8px; align-items: baseline; padding: 5px 12px; margin: 2px 0; border-radius: 8px; border: 1px solid transparent; color: #87867f; transition: all .3s; }
.handoff-steps span { grid-row: span 2; font-size: 15px; font-weight: 600; }
.handoff-steps b { font-size: 18px; font-weight: 600; }
.handoff-steps small { font-size: 13px; }
.handoff-steps .done { color: #3d3d3a; }
.handoff-steps .on { color: #141413; background: #fcfbf7; border-color: #1B365D; }
.handoff-steps .on span { color: #1B365D; }
</style>

<!--
Central message: 网页聊天的瓶颈不是模型笨，而是它碰不到你的电脑。
图：左边是网页聊天，右边是终端，桌上是装着项目的主机和一台打印机，左上方的云是 AI 模型，网页模式下它只连着聊天窗口。每点一次走一步，红色纸条是你在搬的东西，右上角数你搬了几次（四步下来 5 次）。第 5 次点击显示聊天窗口能看到的范围：只有你贴进去的那几行。可以拖动转桌子。
讲述：大家有没有这样改过程序？［请一位学生说一次经历。］来回十几轮很正常。文件一多，你还得告诉它哪个目录、哪个版本、谁调用谁。它所有的信息都是你贴进去的，你贴漏了，它就猜。
Timing target: 3:00–5:00。
Transition: 那就让它自己去看、自己去跑。
-->

---
clicks: 4
class: scene-slide
---

# agent：让模型自己读文件、跑程序、看结果
<div class="subtitle">Agent = a model working with tools and feedback</div>

<div class="scene-definitions">agent（智能体）：能调用工具执行操作、读取结果、再决定下一步的 AI。常见的有 Claude Code、Codex、OpenCode。</div>

<DeskScene mode="agent" :step="$clicks" :height="300" cols="1.2fr 1fr">
<div class="agent-term">
<div class="agent-row you"><span class="who">你</span><code>运行 plot_xs.py，把 runs/ 里的截面画成一张图。出错就修好。</code></div>
<div class="agent-row"><span class="act">读</span><code>plot_xs.py（32 行）、runs/ 下 6 个 .out 文件</code></div>
<div v-click="1" class="agent-row"><span class="act">跑</span><code>$ python plot_xs.py</code></div>
<div v-click="1" class="agent-row out"><span class="act"></span><code class="err">ValueError: could not convert string to float: 'E(MeV)'　（第 14 行）</code></div>
<div v-click="2" class="agent-row"><span class="act">看</span><code>每个 .out 第一行是表头，被当成数字读了</code></div>
<div v-click="2" class="agent-row"><span class="act">改</span><code>第 14 行：np.loadtxt(f) → np.loadtxt(f, skiprows=1)</code></div>
<div v-click="3" class="agent-row"><span class="act">再跑</span><code>$ python plot_xs.py　→　写出 xs.png，6 条曲线</code></div>
<div v-click="3" class="agent-row"><span class="act">留下</span><code>改动的那一行 + xs.png，等你检查</code></div>
</div>
</DeskScene>

<div v-click="4" class="bottom-line">第三页你来回搬运的四步，这里它自己做完。你只写第一行，最后打开图检查。</div>

<style>
.agent-term { padding: 7px 12px; background: #faf9f5; border-radius: 10px; box-shadow: 0 0 0 1px #e0ddd2; font-size: 13px; }
.agent-row { display: grid; grid-template-columns: 40px 1fr; align-items: baseline; padding: 1px 0; }
.agent-row code { background: none; padding: 0; font-size: 12px; line-height: 1.3; color: #3d3d3a; }
.agent-row .act { font-size: 13.5px; color: #1B365D; font-weight: 600; }
.agent-row.you { padding-bottom: 10px; margin-bottom: 6px; border-bottom: 1px solid #e0ddd2; }
.agent-row.you .who { font-size: 13.5px; color: #87867f; font-weight: 600; }
.agent-row.you code { font-family: Inter, 'PingFang SC', sans-serif; color: #141413; }
.agent-row .err { color: #b53333; }
</style>

<!--
Central message: agent 就是把“你当搬运工”的那一环交给工具。
图：同一张桌子。点击推进时，云端的模型改连到终端；终端自己伸出虚线去读主机、运行、改 plot_xs.py 第 14 行（主机侧窗上那一行亮起），再跑后 xs.png 从打印机里出来；右上角“你搬了 0 次”。第 4 次点击显示 agent 能看到的范围：终端加主机上的整个项目。注意模型本身仍在云端，读到的文件内容会发给它，这一点在“授权之前”那页再讲。
讲述：［按点击逐步讲。］我只写第一行。它先自己读脚本和数据目录；［点］自己运行，报错直接回到它眼前，不用我贴；［点］它看报错找到原因，改了一行；［点］再跑，图出来了，改动和结果都留在我的目录里。［点］对比第三页：复制、运行、贴报错、再复制，这四步全是它做的。模型还是那些模型，GPT、Claude，区别是它现在能动你的文件、能看到运行结果。软件我今天不比较，三个里哪个能登录就用哪个。这里是示意例子，后面现场会真做一个。
Timing target: 5:00–8:00。
Transition: 那什么活该交给它？
-->

---
class: dense
---

# 什么活值得交给 agent？
<div class="subtitle">Choose the workflow by what the task touches</div>

| 你要做的事 | 网页聊天 | agent |
|---|---|---|
| 理解一个概念、讨论思路、改一段英文 | 够用 | 不必 |
| 对照两个长文件（校样、两版稿子） | 能上传，但改完还得你搬回去 | 直接在你的目录里对照、写结果 |
| 改程序、运行、看报错、再改 | 你当搬运工 | 它自己循环 |
| 一批输出整理成表、画图 | 贴不下 | 读整个目录 |
| 查文献、核对引用 | 不联网时凭记忆，会编 | 调数据库，存原始记录 |

<div class="bottom-line">判断标准只有一个：这件事要不要碰你的文件、跑你的程序、查外面的数据库。</div>

<!--
Central message: 用不用 agent，看任务碰不碰文件、程序和数据库，不看产品。
讲述：第一行，继续聊天就好，不用为了用 agent 而用。后面几行都有一个共同点：要碰你电脑上的东西，或者要查外部数据库。这些就是我平时交给它的活。下面三个都是我最近的真实例子。
Timing target: 8:00–10:00。
Transition: 第一件：期刊校样。
-->

---
layout: section
---

<LiveOnly><ParticleField tone="dark" :seed="1" /></LiveOnly>

<div class="part-no">01</div>
<div class="kicker">PART 01</div>

# 我最近让它做的三件事

<div class="part-lead">校样、参考文献、预印本：都是真实记录，都是网页聊天做不了的</div>
<div class="part-track"><span class="on"></span><span></span><span></span><span></span></div>

<!--
Timing target: 10:00–10:30。
Transition: 第一件。
-->

---
class: dense
---

# 校样里，<sup>16</sup>O 变成了 <sup>6</sup>O
<div class="subtitle">Case 1 · checking an APS page proof against my source</div>
<div class="case-tag">2026-10-13 · PRC 114, 044620 校样 · 真实记录</div>

<div class="case">
<div class="kami-card"><h3>我交给它的事（大意）</h3><p>这是 APS 发来的校样 PDF，这是我投稿的 .tex 和 .bib。</p><p>逐处对照，列出必须改的地方；35 条参考文献逐条查库；把给编辑的回复写好。</p></div>
<div class="box-evidence"><h3>它找到的</h3><p>源文件处处是 ¹⁶O、⁹³Nb；校样只有第一次对，之后质量数都丢了第一位：</p><p><span class="hit">⁶O(d,p)¹⁷O</span> → <span class="fix">¹⁶O(d,p)¹⁷O</span></p><p><span class="hit">³Nb(d,pX)</span> → <span class="fix">⁹³Nb(d,pX)</span></p><p>共 11 条改正，含 2 处 “+n” 被排成下标。35 条参考文献全部正确；公式 (1)–(18) 无变化。</p></div>
<div class="kami-card"><h3>我看的是什么</h3><p>每一处它都放大到 300 dpi 截图确认。</p><p>每条文献写明查的是哪里：CrossRef、INSPIRE、Springer。</p><p>我定的规矩：只改排版错误，APS 体例的改动不碰。</p></div>
</div>
<div class="why-chat"><b>网页聊天怎么做？</b> 文件可以上传，但它碰不到你的源文件目录；结果要你一处处搬回去、对回原文。</div>

<!--
Central message: agent 的价值在于它能同时打开两个真实文件，逐处对照，并留下证据。
讲述：这是 10 月 13 日的真实事情。我的一篇 PRC 校样回来，我让它把校样 PDF 和我的源文件对照。它发现排版系统把 16O 印成了 6O，93Nb 印成了 3Nb，第一次出现是对的，后面全错。这种错人眼扫一遍很容易漏，因为你脑子里自动补成 16。我要看的不是它说“我检查过了”，而是它给的证据：哪一行、放大截图、每条文献查的哪个库。最后发出去的回复是我决定的：只改错误，不让它顺手“改进”。
Timing target: 10:30–14:00。
Transition: 看它最后交回来的东西。
-->

---
class: dense
---

# 它交回来的：一份可以直接发出去的回复
<div class="subtitle">The deliverable is a file, not a chat answer</div>

<div class="two">
<div>

```text
Corrections (typesetting errors: the mass
numbers 16 and 93 have lost their first digit;
the source has ^{16}O and ^{93}Nb throughout):
1. Line 190: "^{6}O(d,p)^{17}O"
           -> "^{16}O(d,p)^{17}O".
 ...
6. Line 386: "^{3}Nb(d,pX)" -> "^{93}Nb(d,pX)".
 ...
Queries:
Q3. The added article titles have been checked
    against the publisher records and are correct.
```

</div>
<div class="kami-card"><h3>这个文件里有三部分</h3><p><b>参考文献核对表：</b>35 行，每行写明查的哪个库。</p><p><b>必须改的排版错误：</b>11 条，每条带校样行号。</p><p><b>给编辑的回复：</b>可以直接粘贴。</p><p>还有一段<b>“不用管的地方”</b>：APS 体例改动，它列出来，但建议不改。</p></div>
</div>
<div class="note-line">原文节选，来自 proof_corrections_2026-10-13.txt。正式出版版上，这 11 处都已改正。</div>

<!--
Central message: 交付物是一个能复查、能直接用的文件。
讲述：这是它交回来的文件原文。注意它不是一句“我检查完了，有几处问题”，而是一个文件：每条有行号、有来源，回复可以直接发。还有一段它列出来但建议不改的：这是我定的规矩，校样阶段只改错误。正式版上这 11 处都改过来了。
Timing target: 14:00–16:00。
Transition: 第二件也和参考文献有关。
-->

---
class: dense
---

# 45 条参考文献，一条一条去查库
<div class="subtitle">Case 2 · re-checking a bibliography before production</div>
<div class="case-tag">2026-09-28 · PRC 114, 044618 接收后、交付生产前 · 真实记录</div>

<div class="case">
<div class="kami-card"><h3>我交给它的事（大意）</h3><p>论文接收了，交付排版前，把正文实际引用的每一条文献重新核对一遍。</p><p>不许凭记忆，不许用上次的缓存。</p></div>
<div class="box-evidence"><h3>它怎么做的</h3><p>43 条有 DOI：逐条在线取 CrossRef 记录，比对题目、<b>每位作者的姓及顺序</b>、卷、起始页、年份。</p><p>题目里的同位素质量数单独再比一遍。</p><p>没有 DOI 的 2 条：会议论文查 INSPIRE，Feshbach 的书查 Open Library。</p><p>结果：45/45 真实，没有不符。</p></div>
<div class="kami-card"><h3>留下的证据</h3><p>查询脚本、每条的原始返回，都存在论文目录里。</p><p>它还会判断：011601(R) 的 “(R)”是快讯标记，不是错误。</p></div>
</div>
<div class="why-chat"><b>网页聊天怎么做？</b> 它会凭记忆回答“看起来都对”。AI 编参考文献，恰恰就是这样编出来的。</div>

<!--
Central message: 同一个模型，凭记忆答和调数据库查，是两回事。
讲述：大家都听说过 AI 编参考文献：作者、期刊、DOI 都有，就是不存在。原因是网页聊天里它只能凭记忆。给它工具以后，我要求它每一条都去数据库取原始记录，逐个字段比，原始返回存下来。45 条全对，这个结论本身不稀奇，稀奇的是我能拿出 45 份原始记录证明它。这个查文献的流程，后面我会打开给大家看，我把它写成了一个 skill。
Timing target: 16:00–19:00。
Transition: 第三件：一篇公开预印本。
-->

---
class: dense
---

# 公开的预印本把 Kolmogorov 写成了 “K. A. N.”
<div class="subtitle">Case 3 · a stale arXiv version nobody had looked at</div>
<div class="case-tag">2026-09-04 · 刘昊、金磊、任中洲，PRC 111, 024316（2025）· 真实记录</div>

<div class="case">
<div class="kami-card"><h3>起因</h3><p>我的笔记里，这篇论文没有记 arXiv 号。</p><p>它用 DOI 去 INSPIRE 查，发现有：arXiv:2407.20737。</p><p>公开的 v2 是接收后第二天传的，比校样早，校样上的改正都没进去。</p></div>
<div class="box-gap"><h3>公开版里的问题</h3><p>正文说 “Figure 1”，应该是 Fig. 2。</p><p>同一个图标签 <code>fig:8</code> 贴在两张图上，正文“见图 9”被链到了图 6。</p><p>Kolmogorov 被印成 <span class="hit">“K. A. N.”</span></p><p>Arnol'd 的论文，作者成了文集编者。</p><p>Fisher-Yates 洗牌算法没引 1938 年原文，引了 2016 年一个机器证明库条目。</p></div>
<div class="kami-card"><h3>它交回来的</h3><p>从最终源文件重建 v3，在空目录里从头编译：0 个未定义引用。</p><p>还查出正式出版版的表 II 把 A<sub>sym</sub> 印成了 A<sub>vol</sub>，放大到 300 dpi 确认。</p></div>
</div>
<div class="why-chat"><b>网页聊天怎么做？</b> 你得先知道有这个预印本，再自己下载两个版本，逐条对。这种活没人有时间做，公开的 v2 就这样挂了十九个月。</div>

<!--
Central message: agent 能去做“没人有时间做”的核对，而这类活在科研里很多。
讲述：这是我学生刘昊的论文。它在整理我的论文记录时，用 DOI 查到一个我自己都没记的 arXiv 号，然后发现公开版本比校样还早。Kolmogorov 被印成了 K. A. N.，大家笑一下就好；问题是这个没带校样改正的版本，在 arXiv 上挂了十九个月。这类活不难，就是没人有时间做。
Timing target: 19:00–22:00。
Transition: 三件事放在一起看。
-->

---
class: dense
---

# 三件事有什么共同点？
<div class="subtitle">What the agent did, and what I still did</div>

| | 它要读的 | 它要调的 | 它留下的证据 | 我做的 |
|---|---|---|---|---|
| 校样 | PDF + .tex + .bib | CrossRef、INSPIRE | 行号、放大截图 | 定规矩：只改错误 |
| 参考文献 | 45 条引用 | CrossRef 43 次 | 脚本、原始返回 | 定标准：逐字段比 |
| 预印本 | 两个版本、源文件 | INSPIRE、编译器 | 编译记录、对照表 | 决定传不传 |

<div class="bottom-line">它做的是读、查、跑、对；要什么标准、结果信不信，是我的事。</div>

<!--
Central message: agent 接手的是操作；标准和判断仍然在人。
讲述：三件事都要同时打开好几个文件，调外部数据库或程序，留下可以复查的证据。这三样网页聊天都做不到。右边一列是我的工作：定标准，最后看证据。下面我们现场做一个，换成物理的。
Timing target: 22:00–24:00。
Transition: 现场演示。
-->

---
layout: section
---

<LiveOnly><ParticleField tone="dark" :seed="2" /></LiveOnly>

<div class="part-no">02</div>
<div class="kicker">PART 02</div>

# 现场：一句话到实验对比

<div class="part-lead">p + ²⁰⁸Pb 弹性散射：同一句话，网页 AI 和 agent 加 FUSION 各做一次</div>
<div class="part-track"><span class="done"></span><span class="on"></span><span></span><span></span></div>

<!--
Timing target: 24:00–24:30。
Transition: 我们停一下，下面现场演示。
-->

---
class: live-stop
---

# 下面现场演示
<div class="subtitle">I switch to the terminal now</div>

<div class="kami-card task-brief lesson-prompt live-prompt" data-label="这一句话，原样发给 Claude Code">
<div class="copy-corner"><CopyButton label="复制提示词" text="用 KD02 光学势算 p + 208Pb 30 MeV 的弹性散射角分布（对卢瑟福之比），和 EXFOR 里的实验数据画在一张图上，用 Python 画图，存成 results/p208pb_30MeV.png。告诉我用了哪组实验数据，以及你做了哪些检查。" /></div>
用 KD02 光学势算 p + ²⁰⁸Pb 30 MeV 的弹性散射角分布（对卢瑟福之比），和 EXFOR 里的实验数据画在一张图上，用 Python 画图，存成 results/p208pb_30MeV.png。告诉我用了哪组实验数据，以及你做了哪些检查。
</div>

<div class="live-row">
<div>

```bash
mkdir p208pb && cd p208pb    # 空文件夹
claude                       # 没有输入、数据、脚本
```

<div class="live-note">两次预演用了 4 到 11 分钟。它跑的时候，我们回到幻灯片。</div>

</div>
<div class="task-qr">
<img src="./figures/task-qr.svg" alt="提示词网页二维码" />
<div class="ui-label">扫码复制</div>
<a href="https://jinlei.fewbody.com/talks/fusion-ml2026-1030/prompts.html#task" target="_blank">prompts.html#task</a>
</div>
</div>


<style>
.live-stop .lesson-prompt { font-size: 19px; line-height: 1.55; }
.live-row { margin-top: 18px; display: grid; grid-template-columns: 1fr 150px; gap: 24px; align-items: center; }
.live-prompt { position: relative; }
.copy-corner { position: absolute; top: -17px; right: 18px; z-index: 5; }
.live-note { font-size: 15px; color: #6b6a63; margin-top: 8px; }
.task-qr { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.task-qr img { width: 112px; height: 112px; border-radius: 8px; box-shadow: 0 0 0 1px #e0ddd2; }
.task-qr a { font-size: 12px; color: #1B365D; }
</style>

<!--
Central message: 一句物理请求，交给装了 FUSION skill 的 agent。
操作：［切到终端。在一个空文件夹里启动 claude，把提示词粘进去，回车。］看到它第一步调用 fresco skill 再切回来。
讲述：好，我们停一下，现场演示。这是一句很普通的话，任何做核反应的研究生都会这么问。文件夹是空的：没有输入，没有数据。它要自己写 FRESCO 输入，自己去 EXFOR 找实验数据，自己画图。我先发出去，它要跑十分钟左右，我们边等边看它在干什么。
备用：现场失败或太慢，打开 demo/fusion-live/runs/ 里的预演记录和图。
Timing target: 24:30–27:00。
Transition: 屏幕上它在做什么？
-->

---

# 屏幕上它在做什么？
<div class="subtitle">What to watch while it runs</div>

<div class="watch-steps">
<div><span>①</span><b>读 fresco skill</b><small>KD02 参数用脚本按原文公式算出，再填进一份核对过的 FRESCO 输入。不凭记忆写。</small></div>
<div><span>②</span><b>读 exfor-data skill</b><small>去 EXFOR 找 p + ²⁰⁸Pb 弹性散射的测量，看能量、单位、是不是从图上扫描的。</small></div>
<div><span>③</span><b>跑 FRESCO，查收敛</b><small>改步长、匹配半径、分波数，结果不变才算数。</small></div>
<div><span>④</span><b>画图，写报告</b><small>说清用了哪组数据、排除了什么、做了哪些检查。</small></div>
</div>
<div class="bottom-line">网页聊天做不到的不是“懂物理”，是这四步里的“去读、去查、去跑”。</div>

<style>
.watch-steps > div { display: grid; grid-template-columns: 34px 1fr; column-gap: 8px; align-items: baseline; padding: 6px 14px; margin: 6px 0; border-radius: 8px; border: 1px solid #e0ddd2; background: #fcfbf7; }
.watch-steps span { grid-row: span 2; font-size: 19px; color: #1B365D; font-weight: 600; }
.watch-steps b { font-size: 20px; font-weight: 600; color: #141413; }
.watch-steps small { font-size: 15px; color: #3d3d3a; line-height: 1.5; }
</style>

<!--
Central message: skill 让它在核对过的输入上改，去原始数据库取数据。
讲述：［切回终端看一眼，指出它调用了哪个 skill。］它没有从零写 FRESCO 输入，而是从 skill 里一份核对过的例子改起；KD02 的参数不是它背出来的，是脚本算的。然后它去 EXFOR 查数据。这四步，网页上的 AI 一步都做不了。
Timing target: 27:00–30:00。
Transition: 同一句话，问网页 AI 会怎样？
-->

---
class: dense
---

# 同一句话，网页 AI 怎么答？
<div class="subtitle">Same sentence, DeepSeek web with search on</div>

<div class="two">
<div class="kami-card"><h3>它说</h3><p>“我无法直接为你生成这张图，当前没有可运行的核反应计算环境，也无法直接访问 EXFOR。”</p><p>推荐 Watson 等，NPA 92, 193 (1967)，EXFOR O0490：<br>“明确给出了 30 MeV 质子被 ²⁰⁸Pb 弹性散射的角分布”。</p><p>然后给了一份五条的检查清单。</p></div>
<div class="box-gap"><h3>我去查了</h3><p>文章是真的，条目也是真的。</p><p>但 O0490 里 ²⁰⁸Pb 的截面角分布只有 <b>26.3 MeV</b>，任意单位，是从文章的图上扫描下来的。</p><p>30 MeV 那组只有极化数据。</p></div>
</div>
<div class="bottom-line">半对的建议，读起来和全对的一样。去 EXFOR 打开原始条目，才看得出来。</div>

<!--
Central message: 网页 AI 给的是建议，而且是需要你自己去核实的建议。
讲述：同一句话我贴给了 DeepSeek，开着联网。它很诚实，说算不了、取不到数据。它推荐了一组数据，文章和条目都是真的，这比我们刚才看参考文献时好。但它说这组数据是 30 MeV 的，我打开原始条目一看：铅的截面只有 26.3 MeV，而且是从图上扫描的任意单位。拿它去比 30 MeV 的计算，就错了。这种半对的建议最难发现。
Timing target: 30:00–33:00。
Transition: 回到终端，看它做到哪了。
-->

---

# 切回终端：它交回来的
<div class="subtitle">Live demo · open what it delivered</div>

<div class="two">
<div><img src="./figures/fusion-live-p208pb.png" class="kami-img" /></div>
<div class="kami-card"><h3>它报告的（备课预演）</h3><p>没有 30.0 MeV 的数据，测量在 <b>30.3 MeV</b>；两个能量都算了。</p><p>用 van Oers 1974 的表格数据；同条目从图上扫描的那组，<b>只拿来交叉检查</b>。</p><p>KD02：前角吻合，60° 以后偏高 20–50%。</p></div>
</div>
<div class="source">图：备课预演时它自己画的，3 分 43 秒。另一次预演用了 11 分钟，选的数据和做的检查不完全一样。现场以终端为准。</div>

<!--
Central message: 交回来的不只是一张图，还有它为什么这样选。
讲述：［打开 results 里的图，念它报告里的几句。］注意三件事。第一，它发现数据在 30.3 MeV，没有硬算 30，两条都画了。第二，它分得清表格数据和从图上扫描的数据，扫描的只拿来交叉检查。另一次预演里，它还在 EXFOR 里发现一个点大了十倍，排除并注明，没有自己去“修正”。第三，物理结果：全局光学势在前角很好，后角偏高。这一句是物理，要你来判断是不是合理。两次预演做的事不完全一样，现场这一次也会不一样，这本身就值得说一句。
Timing target: 33:00–40:00。
Transition: 它说“检查过了”，查的是什么？
-->

---

# 每一种检查，各回答一个问题
<div class="subtitle">Implementation, input, and model adequacy</div>

| 想知道什么 | 它怎么查的 | 查不出什么 |
|---|---|---|
| 它真的跑了吗？ | 打开文件，用它给的命令再跑一次 | 算得对不对 |
| 数值算准了吗？ | 改步长、匹配半径、分波数，结果不变 | 输入本身错了 |
| 输入对吗？ | KD02 参数两个独立来源对照 | 这个势适不适合这个核 |
| 模型够用吗？ | 两组独立实验数据，带误差 | 偏差来自势还是数据 |

<div class="bottom-line">AI 说“我已经验证过了”，要问它：验证的是这一列里的哪一行？</div>

<!--
Central message: 不同的检查回答不同的问题，不能互相代替。
讲述：它报告里列了一串检查。大部分是第二、三行：数值收敛、参数核对。这些很有用，但它们查不出最后一行：KD02 在后角偏高，是势的问题还是数据的问题？这一步是物理，是你的事。以后看到“验证通过”，先问一句：验证的是哪一行。
Timing target: 40:00–49:00（含现场等待的余量）。
Transition: 下面两个是我自己碰到的，它错得更像对。
-->

---
layout: section
---

<LiveOnly><ParticleField tone="dark" :seed="3" /></LiveOnly>

<div class="part-no">03</div>
<div class="kicker">PART 03</div>

# 它也会错，而且错得很像对

<div class="part-lead">两次真实的错：不是胡编，是合理地读错了证据</div>
<div class="part-track"><span class="done"></span><span class="done"></span><span class="on"></span><span></span></div>

<!--
Timing target: 49:00–49:30。
Transition: 第一个。
-->

---
class: dense
---

# 它说“检查从六月起就坏了”，坏的是它自己的检查
<div class="subtitle">Case 4 · an empty result read as “nothing there”</div>
<div class="case-tag">2026-09-09 · 我的文献 wiki 每周自动检查 · 真实记录（页底是今天备课时同一条命令的报错）</div>

<div class="case">
<div class="kami-card"><h3>它的报告</h3><p>每周自动检查从 6 月 29 日起就静默失败了，两个多月没有出报告。</p><p>听起来很具体，还附了“佐证”。</p></div>
<div class="box-gap"><h3>实际情况</h3><p>这台电脑上的 <code>ls</code> 被换成了另一个工具 eza，<code>-t</code> 参数意思不同。报错被丢掉，结果是<b>空</b>。</p><p>它把“空”读成了“没有报告”。“佐证”按字母排序，碰巧只显示 6 月的文件。</p><p>最新报告其实是 9 月 7 日的，检查一直正常。</p></div>
<div class="kami-card"><h3>我学到的</h3><p>失败时也返回空的检查，和“确实没有”分不出来。</p><p>先在一个确定有东西的地方，试一下检查本身。</p></div>
</div>
<div class="term-err">eza: Flag -t needs a value (choices: modified, changed, accessed, created)</div>

<!--
Central message: agent 的错往往不是瞎编，而是合理地读错了一个证据。
讲述：它跟我说，自动检查两个多月没跑。说得很具体，还给了证据。实际上是它用的 ls 命令在我这台机器上被换掉了，返回空，它把空当成没有。这个错误的结构值得记住：一个失败时也返回空的检查，跟“确实什么都没有”长得一模一样。好笑的是，今天备课的时候，同一条命令又报了一次错，就是屏幕下面这行。
Timing target: 49:30–53:00。
Transition: 第二个，四份记录一致，全错。
-->

---
class: dense
---

# 四份记录说法一致，四份都错
<div class="subtitle">Case 5 · a cleanup that spread the error it was sent to remove</div>
<div class="case-tag">2026-09-04 · FUSION 项目 README · 真实记录</div>

<div class="case">
<div class="kami-card"><h3>背景</h3><p>FUSION 里有 20 个核物理程序的安装脚本。</p><p>8 月，我在一台干净的服务器上把 20 个全部从零装了一遍，结果记在一张表里。</p><p>9 月，我让它更新 README 里过时的说法。</p></div>
<div class="box-gap"><h3>它做了什么</h3><p>没去读那张表，而是抄了开发日志里的一句文字总结：</p><p><b>“13 个干净通过，4 个缺依赖停下”</b></p><p>写进了中英文两个 README 和 TODO。连同原来的日志，四份记录互相一致。</p><p>发现靠的是算术：13 + 4 = 17，不是 20。</p></div>
<div class="box-evidence"><h3>表里的实际结果</h3><p>8 个无人值守直接通过</p><p>4 个缺依赖，正确地拒绝安装</p><p>5 个修了可移植性问题后通过</p><p>3 个是测试框架的问题，与脚本无关</p></div>
</div>
<div class="why-chat"><b>规矩：</b> 数字要从产生它的原始结果里取；一致不等于正确。这一次，凑巧加起来不等于 20，才被发现。</div>

<!--
Central message: 越是“修正错误”的操作，越容易把错误传播开。
讲述：这个是我觉得最危险的一类。它做的事完全正确：找到过时的句子，找到新的记录，抄进去。问题是它抄的是一段文字总结，不是原始表格，而那段总结本身就错了。结果四份记录说法一致，任何后来的人看了都会觉得被反复确认过。发现它是靠一次算术：13 加 4 等于 17。如果那个错数碰巧加起来是 20，这个错就永远留下了。
Timing target: 53:00–57:00。
Transition: 那怎么让它少犯这类错？把规矩写下来。
-->

---
layout: section
---

<LiveOnly><ParticleField tone="dark" :seed="4" /></LiveOnly>

<div class="part-no">04</div>
<div class="kicker">PART 04</div>

# 把吃过的亏写下来

<div class="part-lead">skill：一份它每次都会读的操作规程。从查文献，到 FUSION</div>
<div class="part-track"><span class="done"></span><span class="done"></span><span class="done"></span><span class="on"></span></div>

<!--
Timing target: 57:00–57:30。
Transition: 先做一个对照。
-->

---
class: dense
---

# 让 AI 核对 5 条参考文献，它能找出错吗？
<div class="subtitle">Ask once, then again with six lines of rules, then let the agent look it up</div>

<div class="two qr-slide">
<div>
<div class="ab-steps">
<details name="ab">
<summary><span>①</span><b>直接问</b><small>网页 AI，关掉联网：“帮我检查这些参考文献对不对。”</small></summary>
<div class="ab-res">
<div><i>[1][3]</i>“正确” ✅</div>
<div class="bad"><i>[2]</i>“正确，经典文献” ✅ <em>页码 275 是错的</em></div>
<div class="bad"><i>[4]</i>“Lei 与 Moro 确实在 PRC 96, 064607 发表过，卷号、页码、年份本身是对的” <em>这篇是编的</em></div>
<div><i>[5]</i>先说“有问题”，绕一圈又改口“正确”</div>
<p>两处错，一处也没抓到。</p>
</div>
</details>
<details name="ab">
<summary><span>②</span><b>先给规程，再问</b><small>新对话，同一个 AI，前面加 6 行规程。关联网、开联网各跑一次。</small></summary>
<div class="ab-res">
<div class="sub">关联网</div>
<div class="bad"><i>[2][4]</i>“依据 Crossref …，逐字段一致”，判正确 <em>记录是编的</em></div>
<div class="sub">开联网</div>
<div class="good"><i>[2][4]</i>都抓到：起始页应为 257；Lei、Moro 2017 年发的是 PRC 95, 044605 <em>对</em></div>
<div class="bad"><i>[1]</i>判“有误”：别人参考文献表里写的是 32, 432 (1982) <em>误判，这条是对的</em></div>
<p>没联网，规程只教会它编依据；联了网，它拿二手引用当原始记录。</p>
</div>
</details>
<details name="ab">
<summary><span>③</span><b>agent 加 skill</b><small>真的去查 CrossRef，打开原始记录对答案。</small></summary>
<div class="ab-res">
<div><i>[1][3][5]</i>DOI 原始记录逐字段一致，正确（[1] 就是 32, 431, 1985）</div>
<div class="good"><i>[2]</i>10.1103/RevModPhys.30.257：起始页 <b>257</b>，列表写成 275 <em>有误</em></div>
<div class="good"><i>[4]</i>PRC 96, 064607 是 M. Mirea 的 α 衰变文章；Lei、Moro 2017 年发的是 PRC 95, 044605 <em>编造</em></div>
<p>两处都查出来了，每条都能点开原始记录。</p>
</div>
</details>
</div>
<div class="note-line">5 条里有错。每轮只多一样：先是 6 行规程，再是真能查的工具。</div>
</div>
<div class="qr-box">
<img src="./figures/prompts-qr.svg" alt="提示词网页二维码" />
<div class="ui-label">扫码复制提示词</div>
<a href="https://jinlei.fewbody.com/talks/fusion-ml2026-1030/prompts.html" target="_blank">jinlei.fewbody.com/talks/fusion-ml2026-1030/prompts.html</a>
</div>
</div>

<style>
.ab-steps details { margin: 6px 0; border-radius: 8px; border: 1px solid #e0ddd2; background: #fcfbf7; }
.ab-steps details[open] { border-color: #1B365D; }
.ab-steps summary { list-style: none; cursor: pointer; display: grid; grid-template-columns: 30px 1fr; column-gap: 8px; align-items: baseline; padding: 8px 12px; }
.ab-steps summary::-webkit-details-marker { display: none; }
.ab-steps summary span { grid-row: span 2; font-size: 18px; color: #1B365D; font-weight: 600; }
.ab-steps summary b { font-size: 18px; font-weight: 600; color: #141413; }
.ab-steps summary small { font-size: 14px; color: #3d3d3a; line-height: 1.45; }
.ab-steps details[open] summary small { display: none; }
.ab-res { padding: 0 12px 8px 50px; font-size: 13.5px; line-height: 1.45; color: #3d3d3a; }
.ab-res > div { margin: 2px 0; }
.ab-res i { font-style: normal; font-weight: 600; color: #1B365D; margin-right: 6px; }
.ab-res em { font-style: normal; font-size: 12px; padding: 0 6px; border-radius: 4px; margin-left: 4px; white-space: nowrap; }
.ab-res .bad em { background: #f3e0dc; color: #9b3b2a; }
.ab-res .good em { background: #e2ebdb; color: #4a6b3a; }
.ab-res > div.sub { margin: 4px 0 0; font-size: 13px; font-weight: 600; color: #6b6a63; }
.ab-res p { margin: 5px 0 0; font-weight: 600; color: #141413; font-size: 14px; }
.qr-slide { align-items: center; grid-template-columns: 1.75fr 1fr !important; }
.qr-slide .note-line { margin-top: 8px; font-size: 17px; }
.qr-box { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.qr-box img { width: 190px; height: 190px; border-radius: 10px; box-shadow: 0 0 0 1px #e0ddd2; }
.qr-box a { font-size: 11.5px; white-space: nowrap; color: #1B365D; word-break: break-all; text-align: center; }
</style>

<!--
Central message: 只有规程、没有工具，AI 会照着规程的格式编出依据；规程加上真能查的工具，才查得出错。三轮每次只多一样东西。
操作：［点下面的链接打开提示词网页，复制第一轮，切到网页 AI（关联网）粘贴。］学生可以扫码跟着做。
讲述：第一轮，我什么都不说，直接问。［预演 2026-10-28，DeepSeek 关联网：[2] 的 275 判“正确，经典文献”；[4] 说“Lei 与 Moro 确实在 PRC 96, 064607 发表过”，“卷号、页码、年份本身是对的”；[5] 先说“有问题”，绕一圈又改口“正确”。］第二轮，新开对话，同一个模型，前面多贴 6 行规程。［预演：它给出一张很规整的表，每条都写“依据 Crossref DOI ……”，五个字段逐一“一致”，[4] 也判“正确”。可它关着联网，什么都没查，这些 Crossref 记录全是编的。］这一轮最要紧：规程让输出看起来更严谨，却没让它更对。它学会了依据长什么样，没学会去查。［再开联网跑一次第二轮：[2] 和 [4] 都抓到了（它找到了 PRC 95, 044605，但没打开 96, 064607 看那是谁的文章）；可它把对的 [1] 判成“有误”，依据是别人论文参考文献表里写的 “32, 432 (1982)”。二手引用当成了原始记录，违反规程第 4 条的精神：要确认打开的就是这一篇。］第三轮，切到终端，让 agent 用 literature-search 真的去查。答案：第 2 条起始页是 257，不是 275；第 4 条是编的，PRC 96, 064607 这个 DOI 能打开，但打开的是 Mirea 一篇 α 衰变的文章。Lei 和 Moro 2017 年在 PRC 发的是 95, 044605。只查 DOI 存不存在，会放过它。
预演原文：demo/literature/ab-test/runs/（未提交）。
备用：现场失败时打开 demo/literature/ab-test/ANSWERS.md 和 crossref/ 里的原始记录。
Timing target: 57:30–65:00。
Transition: 第二轮那 6 行，就是 skill 的一半；另一半是让它真的能查的工具。看完整版。
-->

---

# 把查文献的规矩写成 skill
<div class="subtitle">literature-search: the workflow behind Case 2</div>

<div class="handoff-loop">
<div><span>找线索</span><b>先查已有笔记</b><small>没有线索，再搜候选</small></div>
<div><span>调工具</span><b>取数据库记录</b><small>INSPIRE / CrossRef / arXiv</small></div>
<div><span>核对</span><b>是不是要找的那篇</b><small>题目、作者、年份</small></div>
<div><span>写文件</span><b>生成 BibTeX</b><small>只用记录返回的字段</small></div>
</div>
<div class="two">
<div class="kami-card"><h3>每一步都有规矩</h3><p>笔记只给线索，也要重新查库。<br>缺字段标 UNVERIFIED，不凭记忆补齐。</p></div>
<div class="kami-card"><h3>查不到时怎么办</h3><p>报告无匹配、多个候选或网络失败。<br>没核实的条目，不混进正式引用。</p></div>
</div>

<!--
Central message: skill 是把一次次吃亏得来的经验，写成它每次都会读的操作规程。
讲述：案例 2 里它那么规矩地查库，不是因为模型突然变认真了，是因为我把查文献的步骤写成了一个文件，叫 skill。每次我说“查一下这篇文献”，它先读这个文件，照着做。只说一句“请认真核对”是没用的，要写清楚：查哪个库、比哪几个字段、查不到怎么办。
Timing target: 57:30–60:00。
Transition: 打开文件看看。
-->

---
class: dense
---

# SKILL.md 长什么样
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
<div class="kami-card"><h3>三部分各做什么</h3><p><b>名称和说明：</b>告诉它什么时候用。</p><p><b>操作步骤：</b>调什么工具、查什么、何时停。</p><p><b>脚本：</b>实际访问数据库的程序，<br>例如 scripts/verify_doi.py。</p><p>没有训练新模型，<br>只是把做事的方法交给它。</p></div>
</div>
<div class="note-line">中文教学节选；完整 skill 还有分支流程。</div>

<!--
Central message: skill 就是一份写给 AI 的操作手册，加上它要调的脚本。
讲述：［打开 demo/literature/SKILL-excerpt.md，再打开本机完整的 SKILL.md。］上面两行说什么时候用，下面是步骤，脚本负责真正去连数据库。这就是全部，没有训练模型，是一份 markdown 文件。你们组里有师兄师姐传下来的“跑程序注意事项”吗？那就是 skill 的原材料。
Timing target: 60:00–62:00。
Transition: 现场让它查一篇。
-->

---
class: dense
---

# 现场：让 skill 查一篇论文，存下原始记录
<div class="subtitle">Run the lookup and open its files</div>

<div class="kami-card task-brief lesson-prompt" data-label="演示任务">
使用 literature-search，核实 DOI <code>10.1103/PhysRevC.97.011601</code>。<br>
保存数据库原始记录、BibTeX 和核对说明。查不到的字段不要补写。
</div>
<div class="two">
<div class="kami-card"><h3>它交回三个文件</h3><p>crossref-record.json：数据库原样返回。<br>references.bib：只用返回的字段生成。<br>verification.md：查了哪里、何时、缺什么。</p></div>
<div class="box-gap"><h3>备课时就碰到一个坑</h3><p>脚本给出的页码是<b>空</b>：PRC 用文章号，CrossRef 放在 article-number，脚本只读 page。原始记录里有 011601，从那里取，不看着 DOI 猜。</p></div>
</div>
<div class="source">备课查询：2026-10-20，CrossRef，禁用缓存；记录在 demo/literature/results/。断网时打开它，并说明是备课结果。</div>

<!--
Central message: skill 的效果，要看它实际调了什么、留下了什么文件。
讲述：［按 demo/literature/PROMPT.md 发送。］先看它读了哪个 skill，再看它调用了哪个数据库，最后打开文件。备课时真实碰到一个坑：脚本说页码是空的，因为 PRC 的文章号放在另一个字段里。如果只看一句“验证成功”，你就会拿到一条没有页码的引用，或者它看着 DOI 猜一个。这就是为什么要存原始记录。注意：查到论文存在，不等于这篇论文支持你想写的结论，那要读原文。
Timing target: 62:00–65:00。
Transition: FUSION 就是把这件事做到核物理程序上。
-->

---

# FUSION：核物理程序的 skill
<div class="subtitle">Edit a verified input, reproduce a known benchmark</div>

<div class="kami-card"><h3>26 个 skill，其中 20 个驱动公开的核物理程序。</h3><p>FRESCO、TALYS、SKY3D……每个 skill 带一份核对过的输入和一个已知结果。</p></div>
<div class="two">
<div class="kami-card"><h3>它照着做</h3><p>在核对过的输入上<b>改</b>，不凭记忆<b>写</b>。</p><p>跑完先复现已知结果，到指定精度。</p></div>
<div class="kami-card"><h3>它替不了的</h3><p>复现已知结果，只说明程序装对了、跑对了。</p><p>研究什么、模型合不合适、结果怎么解释，<br>还是你的判断。</p></div>
</div>
<div class="source">github.com/jinleiphys/FUSION。今天不要求安装。</div>

<!--
Central message: FUSION 的两条核心规矩，正是前面两类错误的解药。
讲述：FUSION 是我把一些核物理程序的操作写成 skill。两条规矩：第一，它不凭记忆从零写 FRESCO 输入，而是在一份核对过的输入上改；第二，跑完先复现一个已知结果。这两条防的是“编”和“自说自话”。但要说清楚：复现了作者的结果，只说明程序装对了，不说明你的物理对了，这就是刚才那张检查表的最后一行。
Timing target: 65:00–68:00。
Transition: 最后一个案例，两个程序对不上的时候。
-->

---

# 两个程序对不上，查出了一个公开代码的 bug
<div class="subtitle">Case 6 · disagreement is information</div>
<div class="case-tag">2026-09 · 核反应程序对照 · 真实记录，暂不公开程序名</div>

<div class="three">
<div class="kami-card"><h3>做了什么</h3><p>同一个 (p,n) 反应，同一组输入，一个公开的散射程序和 FRESCO 各算一遍。</p></div>
<div class="kami-card"><h3>发现什么</h3><p>对不上。逐项排查，那个程序漏掉了自旋翻转项。</p></div>
<div class="kami-card"><h3>后来</h3><p>联系作者，作者独立确认，已经修复。</p></div>
</div>
<div class="bottom-line">两个程序对上，只说明实现一致；对不上，本身就是信息。<br>AI 负责跑、比、定位；比什么、信哪个，靠物理。</div>

<!--
Central message: 用 agent 做交叉对照，对不上时它能帮你快速定位，但判断是物理。
讲述：这是一个反过来的例子。两个程序对上了，也只说明它们的实现一致；这里两边对不上，我们没有随手调参数把它凑上，而是逐项查，查出别人公开代码里漏了一项。作者确认了，已经修了。程序名我先不说，作者那边的工作还没发表。跑两个程序、比较、定位这些活，agent 做得很快；决定比什么、相信哪个，还是物理。
Timing target: 68:00–71:00。
Transition: 自己用之前，说一下权限。
-->

---

# 授权之前，看它准备做什么
<div class="subtitle">Permissions and privacy</div>

<div class="two">
<div class="kami-card"><h3>它会问你要权限</h3><p>读哪些文件、写哪些文件、运行什么命令。</p><p>看不懂就先让它解释，<br>不要一路点“同意”。</p></div>
<div class="kami-card"><h3>文件内容会发给模型服务</h3><p>文件在你电脑上，不等于内容不出门。</p><p>未发表的数据、审稿稿件、合作者的代码，<br>先确认能不能给。</p></div>
</div>
<div class="bottom-line">第一次先在一个副本目录里练。</div>

<!--
Central message: 权限跟着任务走；数据出不出门要自己判断。
讲述：两件事。第一，它要执行命令时会问你，看不懂就问它这条命令干什么。第二，文件会发到模型服务端。我自己审稿的稿件，从来不交给任何外部模型，这是期刊的规定。第一次用，先拿一个副本练。
Timing target: 71:00–73:00。
Transition: 轮到大家了。
-->

---

# 练习：用你自己的课题写一条任务
<div class="subtitle">3 分钟写，3 分钟和旁边的同学互换</div>

<div class="kami-card task-brief lesson-prompt" data-label="YOUR FIRST TASK">
<b>读什么：</b>哪个目录、哪些文件？<br>
<b>做什么：</b>具体完成哪一步？<br>
<b>不许做：</b>哪些文件不改？遇到什么先停下？<br>
<b>交什么、怎么验：</b>保存哪些文件？用哪个<b>没参与计算的量</b>来检查？
</div>
<div class="note-line">可以选：整理一批输出画图、改一个老程序加参数扫描、核对一篇稿子的参考文献。<br>不要选“帮我把论文写完”。</div>

<!--
Central message: 学生带走一条能执行、能验收的任务。
讲述：选你课题里一件小事。最后一行最难：你用什么来检查它？刚才现场演示里是 EXFOR 的实验数据，参考文献里是数据库原始记录。［3 分钟写，3 分钟互换。］同桌只问两个问题：我能找到输入吗？做完我怎么知道它对？［请两三位读一下，现场点评。］
Timing target: 73:00–80:00。
Transition: 最后总结。
-->

---

# 回去以后
<div class="subtitle">Three things to take home</div>

<div class="takeaways">
<div class="item"><span class="n">①</span><span class="t">要碰文件、跑程序的活，交给 agent<small>讨论概念继续聊天就好；来回复制粘贴的活，让它自己读、自己跑。</small></span></div>
<div class="item"><span class="n">②</span><span class="t">看证据，不看它说“验证过了”<small>问一句验证的是哪一种；物理上找一个没参与拟合的量。</small></span></div>
<div class="item"><span class="n">③</span><span class="t">吃过的亏，写成 skill<small>写清步骤、工具、什么时候停；试跑，再改。</small></span></div>
</div>

<!--
Central message: 用它做操作，自己做判断，把经验写下来。
讲述：三句话。第一，复制粘贴的活交出去。第二，它说验证过了，你问验证的是哪一种。第三，每次它犯了一个错，你纠正一次，就把这次纠正写进 skill，下次再犯的机会就小一些，但还是要查。skill 就该这么一条条长出来。
Timing target: 80:00–82:00。
Transition: 材料。
-->

---

# 课后材料
<div class="subtitle">The prompts from today, one scan away</div>

<div class="two">
<div class="qr-box"><img src="./figures/prompts-qr.svg" alt="提示词网页二维码" /><div class="ui-label">扫码拿今天的提示词</div><a href="https://jinlei.fewbody.com/talks/fusion-ml2026-1030/prompts.html" target="_blank">jinlei.fewbody.com/talks/fusion-ml2026-1030/prompts.html</a><small>FUSION 的 skill：github.com/jinleiphys/FUSION</small></div>
<div class="kami-card"><h3>回去先做这个</h3><p>选你课题里一个常用程序，<br>同一句话问两次：</p><p>一次直接问，一次先给它一份核对过的输入和一个已知结果。</p><p>比一比两次交回来的东西。</p></div>
</div>

<style>
.qr-box { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; }
.qr-box img { width: 200px; height: 200px; border-radius: 10px; box-shadow: 0 0 0 1px #e0ddd2; }
.qr-box a { font-size: 12px; color: #1B365D; white-space: nowrap; }
.qr-box small { font-size: 13px; color: #6b6a63; }
</style>

<!--
Central message: 课后有一个能马上做的任务。
讲述：今天用到的提示词都在这个网页上，扫码就能复制。回去做一个对照：挑你课题里一个常用程序，同一句话问两次，一次什么都不给，一次给它一份核对过的输入和一个已知结果，也就是一个最小的 skill。比一比两次交回来的东西。这个实验比任何产品评测都能让你了解它，也能让你看到 skill 值多少。
Timing target: 82:00–84:00。
Transition: 提问。
-->

---
layout: center
---

# 问答
<div class="subtitle">你准备让它帮你做的第一件事是什么？</div>

<!--
Central message: 用听众自己的任务检验今天的方法。
讲述：［若没有提问，请一位同学读自己的任务卡，再请另一位说怎么验收。］
Timing target: 84:00–90:00。
-->

---
routeAlias: bk-setup
---

# 备用：从官方入口安装和登录
<div class="subtitle">Follow the guide for your operating system</div>

| 工具 | 安装与首次配置 | 已装好之后 |
|---|---|---|
| Codex | <a href="https://learn.chatgpt.com/docs/codex/cli">官方 CLI 入口</a>，按账号提示配置 | 练习目录中运行 codex |
| Claude Code | <a href="https://code.claude.com/docs/en/quickstart">官方 Quickstart</a>，按系统选择安装方式 | 运行 claude，完成首次登录 |
| OpenCode | <a href="https://opencode.ai/docs/">官方文档</a>，选择版本并配置模型服务 | 运行 opencode，按文档连接服务 |

<div class="note-line">只需要一个工具能用。Python 3 加 numpy、matplotlib 即可跑今天的任务。</div>

<!--
讲述：按自己的系统装一个，登录。细节在 SETUP.md。
Timing target: 备用。
-->

---
routeAlias: bk-instructions
---

# 备用：项目说明文件的例子
<div class="subtitle">Standing instructions the agent reads every time</div>

```markdown
# 本项目的工作约定
- data/ 存放原始数据，不修改。
- 新结果保存到 results/。
- 运行后报告命令、输出位置和做了哪些检查。
- 数字从原始输出里取，不从文字总结里抄。
- 缺少环境或不清楚定义时，先说明，不编造数据。
```

<div class="note-line">Claude Code 读 CLAUDE.md，Codex 读 AGENTS.md；放在项目根目录，确认它实际读到了。</div>

<!--
讲述：skill 是某一类任务的规程，这个文件是整个项目的规矩。第四条就是案例 5 换来的。
Timing target: 备用。
-->

---
routeAlias: bk-exfor
---

# 备用：实验数据的误差被存成了 0
<div class="subtitle">A parsing defect that inflated a result</div>

<div class="two">
<div class="box-gap"><h3>发生了什么</h3><p>从 EXFOR 读实验数据时，解析程序把 8 组 (p,n) 数据的误差存成了 0。</p><p>误差 0 又被截到 0.5% 的下限：这 8 组只占数据点的 15%，却占了 Fisher 信息迹的 88%。</p><p>结论一度被放大。</p></div>
<div class="kami-card"><h3>怎么防</h3><p>读进来的数据，先打印每组的误差范围。</p><p>出现 0、负数、NaN，先停下来问。</p></div>
</div>

<!--
讲述：2026-09-18 的真实记录（LUCID 项目）。错不在模型推理，在一个没人看的中间文件。
Timing target: 备用。
-->
