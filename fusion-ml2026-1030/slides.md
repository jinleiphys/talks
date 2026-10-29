---
theme: seriph
title: 'Using AI in Research: Lessons from FUSION'
titleTemplate: '%s · 金磊'
info: '给仍在网页聊天里使用 AI 的研究生：我平时让 agent 做什么，它怎样做完，又怎样把规矩写成 skill。'
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
<div class="signoff"><div class="ui-label">TODAY</div><div class="slip-title">从聊天窗口到 agent</div><div class="row"><span>我平时让它做什么？</span><span>①</span></div><div class="row"><span>现场演示：算完和实验比</span><span>②</span></div><div class="row"><span>把规矩写成 skill</span><span>③</span></div></div>
</div>

<!--
Central message: 今天讲我怎么用 agent，不介绍各家产品。
讲述：有多少同学用过网页上的 GPT 或者 DeepSeek？有多少同学让它直接改过你电脑里的文件、跑过你的程序？今天拿我最近做过的几件事来讲，再现场试一次：给它一句话，让它用光学势算出结果，和实验数据比较。我会多讲讲它犯过的错。
Timing target: 0:00–1:00。
Transition: 先聊一件跟找工作有关的事。
-->

---
class: dense
---

# FDE：派到用户身边，把 AI 用起来
<div class="subtitle">Forward deployed engineer: fit a general AI tool into someone's real work</div>

<div class="fde-top">
<div>
<div class="fde-steps">
<div><span>看懂</span><b>坐到用户旁边</b><small>每天怎么干活，用什么数据和程序</small></div>
<div><span>接上</span><b>让 AI 碰得到这些</b><small>能读他们的文件，能跑他们的程序</small></div>
<div><span>验收</span><b>定好怎么算做对</b><small>拿已知结果检查，不靠它自己说</small></div>
</div>
<div class="fde-pay"><b>薪资：</b>美国招聘启事上的底薪约每年 20 万到 30 万美元，股票另算。</div>
</div>
<FdeScene :height="345" />
</div>
<div class="bottom-line">今天就讲怎么给自己的课题当 FDE。</div>
<div class="source">薪资：OpenAI、Anthropic 2025–2026 年公开招聘启事（如 Anthropic Applied AI FDE 20–30 万美元，OpenAI NYC FDE 20–31 万美元加股票）；以官网为准。</div>

<style>
.fde-top { display: grid; grid-template-columns: 1fr 1.35fr; gap: 14px; align-items: center; margin-top: -10px; }
.fde-steps > div { display: grid; grid-template-columns: 52px 1fr; column-gap: 8px; align-items: baseline; padding: 5px 12px; margin: 5px 0; border-radius: 8px; border: 1px solid #e0ddd2; background: #fcfbf7; }
.fde-steps span { grid-row: span 2; font-size: 18px; color: #1B365D; font-weight: 600; }
.fde-steps b { font-size: 17px; font-weight: 600; color: #141413; }
.fde-steps small { font-size: 13.5px; color: #3d3d3a; }
.fde-pay { margin-top: 10px; padding: 8px 12px; border-left: 4px solid #4a6b3a; background: #eef0e4; border-radius: 6px; font-size: 15.5px; color: #3d3d3a; line-height: 1.5; }
.fde-pay b { color: #4a6b3a; }
</style>

<!--
Central message: FDE 的活就是三步：看懂用户怎么干活，把 AI 接进去，定好怎么验收。今天讲的就是在自己课题里做这三步。
讲述：先聊一件跟找工作有关的事。AI 发展这么快，大家都在想以后做什么。这两年硅谷有个热门岗位，叫 forward deployed engineer，简称 FDE，直译是“派到前线的工程师”。名字听着玄，活其实很具体。公司把你派到用户那里，比如一家药厂、一家银行，你坐在他们旁边，先看懂他们每天怎么干活：数据放在哪，用什么程序，哪一步最费时间。然后把 AI 接上去，让它能读这些文件、跑这些程序。最后跟用户一起定好怎么算做对了，拿已知的结果来检查，不能只听 AI 自己说“做完了”。这个岗位最早是 Palantir 设的，现在 OpenAI、Anthropic 都在招，美国的招聘启事上，底薪大概二三十万美元，股票另算。右边这张图画的就是这件事：飞机从上海起飞，工程师跳伞落到工地，他先看懂工地怎么干活，再把 AI 接上去读图纸、算结构，最后拿已知结果验收。等会儿的现场演示，其实也是一次 FDE 的活：用户是我，活是算一个弹性散射、和实验比，AI 要接上 FRESCO 和 EXFOR，还要先复现已知结果。区别是，FDE 要去懂别人的领域，你们本来就懂自己的课题。今天就讲怎么给自己的课题当 FDE。
来源：Anthropic Applied AI FDE（美国，20–30 万美元）、Federal Civilian FDE（28–32 万美元）；OpenAI FDE NYC（20–31 万美元加股票）、Gov（19.8–25.2 万美元）。均为招聘平台转载的公开启事，部分已关闭，讲之前到官网核一次。“药厂、银行”只是举例，不是具体项目。
Timing target: 1:00–3:00。
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
Central message: 聊天窗口给的文字要靠人复制，复制时就会出错。
讲述：［停 20 秒，让学生找。］这句话是 AI 问作者的，怎么进了正文？聊天窗口只给一段文字，要把它放进成品，全靠人复制。这些操作能不能让它自己做？做完以后，我该查什么？
Timing target: 3:00–5:00。
Transition: 写代码的时候，我们搬运得更多。
-->

---
clicks: 5
class: scene-slide
---

# 在网页里写代码，得来回复制
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
Central message: 在网页里聊天，模型碰不到你电脑上的文件和程序。
图：左边是网页聊天，右边是终端，桌上是装着项目的主机和一台打印机，左上方的云是 AI 模型，网页模式下它只连着聊天窗口。每点一次走一步，红色纸条是你在搬的东西，右上角数你搬了几次（四步下来 5 次）。第 5 次点击显示聊天窗口能看到的范围：只有你贴进去的那几行。可以拖动转桌子。
讲述：大家有没有这样改过程序？［请一位学生说一次经历。］来回十几轮很正常。文件一多，你还得告诉它哪个目录、哪个版本、谁调用谁。你贴了什么，它才知道什么。漏贴的部分，它就猜。
Timing target: 5:00–7:00。
Transition: 那就让它自己去看、自己去跑。
-->

---
clicks: 4
class: scene-slide
---

# agent：让模型自己读文件、跑程序、看结果
<div class="subtitle">Agent = a model working with tools and feedback</div>

<div class="scene-definitions">agent（智能体）：能用工具做事、看结果，再决定下一步的 AI。常见的有 Claude Code、Codex、OpenCode。</div>

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

<div v-click="4" class="bottom-line">第三页要你来回操作的四步，这里它自己做。你写第一行，做完打开图检查。</div>

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
Central message: 原先“你当搬运工”的那些操作，现在由 agent 调工具来做。
图：同一张桌子。点击推进时，云端的模型改连到终端；终端自己伸出虚线去读主机、运行、改 plot_xs.py 第 14 行（主机侧窗上那一行亮起），再跑后 xs.png 从打印机里出来；右上角“你搬了 0 次”。第 4 次点击显示 agent 能看到的范围：终端加主机上的整个项目。注意模型本身仍在云端，读到的文件内容会发给它，这一点在“授权之前”那页再讲。
讲述：［按点击逐步讲。］我只写第一行。它先自己读脚本和数据目录；［点］它自己运行，直接就能看到报错，不用我贴；［点］它看报错找到原因，改了一行；［点］再跑，图出来了，改动和结果都留在我的目录里。［点］对比第三页：复制、运行、贴报错、再复制，这四步全是它做的。用的还是 GPT、Claude 这些模型，只是现在能改文件、看运行结果了。今天不比较软件，三个里哪个能登录就用哪个。这页是示意，后面会现场做一次。
Timing target: 7:00–10:00。
Transition: 那什么活该交给它？
-->

---
class: dense
---

# 什么活适合交给 agent？
<div class="subtitle">Choose the workflow by what the task touches</div>

| 你要做的事 | 网页聊天 | agent |
|---|---|---|
| 理解一个概念、讨论思路、改一段英文 | 够用 | 不必 |
| 对照两个长文件（校样、两版稿子） | 能上传，改完还得你放回去 | 在你的目录里对照、存结果 |
| 改程序、运行、看报错、再改 | 你当搬运工 | 它反复改 |
| 整理一批输出、制表画图 | 贴不下 | 读整个目录 |
| 查文献、核对引用 | 不联网时凭记忆，会编 | 调数据库，存原始记录 |

<div class="bottom-line">看这件事需不需要读写文件、跑程序、查外部数据库。</div>

<!--
Central message: 用不用 agent，要看任务需不需要文件、程序和数据库。
讲述：第一行这些事，继续聊天就够了。后面几行要用到电脑上的文件、程序，或者外部数据库，我平时就把这些活交给它。接下来三个例子都是我最近做过的。
Timing target: 10:00–12:00。
Transition: 第一件：期刊校样。
-->

---
layout: section
---

<LiveOnly><ParticleField tone="dark" :seed="1" /></LiveOnly>

<div class="part-no">01</div>
<div class="kicker">PART 01</div>

# 我最近让它做的三件事

<div class="part-lead">校样、参考文献、预印本：最近做过，网页聊天办不了</div>
<div class="part-track"><span class="on"></span><span></span><span></span></div>

<!--
Timing target: 12:00–12:30。
Transition: 第一件。
-->

---
class: dense
---

# 校样里，<sup>16</sup>O 变成了 <sup>6</sup>O
<div class="subtitle">Case 1 · checking an APS page proof against my source</div>
<div class="case-tag">2026-10-13 · PRC 114, 044620 校样 · 真实记录</div>

<div class="case">
<div class="kami-card"><h3>我怎么交代的（大意）</h3><p>这是 APS 发来的校样 PDF，这是我投稿的 .tex 和 .bib。</p><p>逐处对照，列出必须改的地方；35 条参考文献逐条查库；把给编辑的回复写好。</p></div>
<div class="box-evidence"><h3>它找到的</h3><p>源文件全是 ¹⁶O、⁹³Nb；校样只有首次出现时对，之后质量数都少了第一位：</p><p><span class="hit">⁶O(d,p)¹⁷O</span> → <span class="fix">¹⁶O(d,p)¹⁷O</span></p><p><span class="hit">³Nb(d,pX)</span> → <span class="fix">⁹³Nb(d,pX)</span></p><p>共改 11 处，包括 2 处 “+n” 被排成下标。35 条参考文献都对；公式 (1)–(18) 没变。</p></div>
<div class="kami-card"><h3>我怎么检查</h3><p>每一处都用 300 dpi 放大截图确认。</p><p>每条文献注明查了哪个库：CrossRef、INSPIRE、Springer。</p><p>我定的规矩：只改排版错误，APS 体例的改动不碰。</p></div>
</div>
<div class="why-chat"><b>网页聊天怎么做？</b> 文件能上传，但它读不到源文件目录；你得把结果逐处放回去，再核对原文。</div>

<!--
Central message: agent 能同时打开两个文件，逐处核对，留下证据。
讲述：10 月 13 日，我收到一篇 PRC 的校样，就让它拿校样 PDF 和源文件对照。它发现排版系统把 16O 印成了 6O，93Nb 印成了 3Nb，第一次出现是对的，后面全错。这种错人眼扫一遍很容易漏，因为你脑子里自动补成 16。它说“我检查过了”，我还要看证据：哪一行，截图是什么样，每条文献查了哪个库。给编辑回什么，由我来定：只改错误，不让它顺手“改进”。
Timing target: 12:30–16:00。
Transition: 看它最后交回来的东西。
-->

---
class: dense
---

# 交回的文件：给编辑的回复
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
<div class="kami-card"><h3>文件分成三部分</h3><p><b>参考文献核对表：</b>35 行，每行写明查的哪个库。</p><p><b>必须改的排版错误：</b>11 条，每条带校样行号。</p><p><b>给编辑的回复：</b>可以直接粘贴。</p><p>还有一段<b>“不用管的地方”</b>：APS 体例改动，它列出来，但建议不改。</p></div>
</div>
<div class="note-line">节选自 proof_corrections_2026-10-13.txt。正式出版时，这 11 处都已改正。</div>

<!--
Central message: 它交回一个文件，我能复查，也能直接用。
讲述：这是它交回来的文件原文。它没有只说一句“我检查完了，有几处问题”。文件里每条都有行号和来源，回复可以直接发。它还列了一段建议不改的地方，因为我要求校样阶段只改错误。正式版上这 11 处都改过来了。
Timing target: 16:00–18:00。
Transition: 第二件也和参考文献有关。
-->

---
class: dense
---

# 45 条参考文献，逐条查库
<div class="subtitle">Case 2 · re-checking a bibliography before production</div>
<div class="case-tag">2026-09-28 · PRC 114, 044618 接收后、排版前 · 真实记录</div>

<div class="case">
<div class="kami-card"><h3>我怎么交代的（大意）</h3><p>论文接收了，排版前，把正文引用的文献逐条重新核对。</p><p>不许凭记忆，不许用上次的缓存。</p></div>
<div class="box-evidence"><h3>它怎么做的</h3><p>43 条有 DOI：在线逐条取 CrossRef 记录，核对题目、<b>每位作者的姓及顺序</b>、卷、起始页、年份。</p><p>题目中同位素质量数再单独核对。</p><p>没有 DOI 的 2 条：会议论文查 INSPIRE，Feshbach 的书查 Open Library。</p><p>结果：45/45 确有其文，信息相符。</p></div>
<div class="kami-card"><h3>留下的证据</h3><p>查询脚本和每条原始记录都存进论文目录。</p><p>它还会判断：011601(R) 的 “(R)”是快讯标记，不是错误。</p></div>
</div>
<div class="why-chat"><b>网页聊天怎么做？</b> 它会凭记忆回答“看起来都对”。AI 就这样编出了参考文献。</div>

<!--
Central message: 同一个模型，凭记忆回答和查数据库，结果会不同。
讲述：大家都听说过 AI 编参考文献：作者、期刊、DOI 都有，就是不存在。原因是网页聊天里它只能凭记忆。给它工具以后，我要求它每一条都去数据库取原始记录，逐个字段比，原始返回存下来。45 条全对，我也能拿出 45 份原始记录来核实。我把这套查文献的步骤写成了一个 skill，后面打开给大家看。
Timing target: 18:00–21:00。
Transition: 第三件：一篇公开预印本。
-->

---
class: dense
---

# 预印本里，Kolmogorov 成了 “K. A. N.”
<div class="subtitle">Case 3 · a stale arXiv version nobody had looked at</div>
<div class="case-tag">2026-09-04 · 刘昊、金磊、任中洲，PRC 111, 024316（2025）· 真实记录</div>

<div class="case">
<div class="kami-card"><h3>起因</h3><p>我的笔记里，这篇论文没有记 arXiv 号。</p><p>它用 DOI 去 INSPIRE 查，发现有：arXiv:2407.20737。</p><p>公开的 v2 在接收后第二天上传，早于校样，没补进校样的改正。</p></div>
<div class="box-gap"><h3>公开版里的问题</h3><p>正文说 “Figure 1”，应该是 Fig. 2。</p><p>同一图标签 <code>fig:8</code> 贴在两张图上，正文“见图 9”被链到了图 6。</p><p>Kolmogorov 被印成 <span class="hit">“K. A. N.”</span></p><p>Arnol'd 的论文把文集编者写成了作者。</p><p>Fisher-Yates 洗牌算法没引 1938 年原文，引了 2016 年一个机器证明库条目。</p></div>
<div class="kami-card"><h3>它交回来的</h3><p>用最终源文件重建 v3，在空目录从头编译：0 个未定义引用。</p><p>还查出正式出版版的表 II 把 A<sub>sym</sub> 印成了 A<sub>vol</sub>，放大到 300 dpi 确认。</p></div>
</div>
<div class="why-chat"><b>网页聊天怎么做？</b> 你得先知道有这份预印本，再下载两个版本逐条核对。没人有时间做，公开的 v2 就挂了十九个月。</div>

<!--
Central message: 科研里有很多“没人有时间做”的核对，可以交给 agent。
讲述：这是我学生刘昊的论文。它在整理我的论文记录时，用 DOI 查到一个我自己都没记的 arXiv 号，然后发现公开版本比校样还早。Kolmogorov 被印成了 K. A. N.。这个版本没补进校样的改正，却在 arXiv 上挂了十九个月。这类活不难，就是没人有时间做。
Timing target: 21:00–24:00。
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

<div class="bottom-line">读、查、跑、核对交给它；标准怎么定、结果能否信，我来判断。</div>

<!--
Central message: agent 负责操作，我负责定标准、判断结果。
讲述：三件事都要同时打开好几个文件，调外部数据库或程序，留下可以复查的证据。这三样网页聊天都做不到。右边一列是我的工作：定标准，最后看证据。接下来现场做一个物理计算。
Timing target: 24:00–26:00。
Transition: 现场演示。
-->

---
layout: section
---

<LiveOnly><ParticleField tone="dark" :seed="2" /></LiveOnly>

<div class="part-no">02</div>
<div class="kicker">PART 02</div>

# 现场：算完和实验比

<div class="part-lead">p + ²⁰⁸Pb 弹性散射：同一句话，网页 AI 和 agent 加 FUSION 各做一次</div>
<div class="part-track"><span class="done"></span><span class="on"></span><span></span></div>

<!--
Timing target: 26:00–26:30。
Transition: 现在切到终端演示。
-->

---
class: live-stop
---

# 现场跑一次
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
Central message: 把一句物理问题交给装了 FUSION skill 的 agent。
操作：［切到终端。在一个空文件夹里启动 claude，把提示词粘进去，回车。］看到它第一步调用 fresco skill 再切回来。
讲述：现在来跑一次。这是一句很普通的话，做核反应的研究生都会这样问。文件夹是空的：没有输入，没有数据。它要写好 FRESCO 输入，去 EXFOR 找实验数据，再画图。我先发出去，它要跑十分钟左右，我们边等边看它在干什么。
备用：现场失败或太慢，打开 demo/fusion-live/runs/ 里的预演记录和图。
Timing target: 26:30–29:00。
Transition: 屏幕上它在做什么？
-->

---

# 屏幕上它在做什么？
<div class="subtitle">What to watch while it runs</div>

<div class="watch-steps">
<div><span>①</span><b>读 fresco skill</b><small>用脚本按原文公式算 KD02 参数，填进核对过的 FRESCO 输入，不凭记忆写。</small></div>
<div><span>②</span><b>读 exfor-data skill</b><small>去 EXFOR 找 p + ²⁰⁸Pb 弹性散射数据，查能量、单位、是否从图上扫描。</small></div>
<div><span>③</span><b>跑 FRESCO，查收敛</b><small>改步长、匹配半径、分波数，结果不变才算数。</small></div>
<div><span>④</span><b>画图，写报告</b><small>说清用了哪组数据、排除了什么、做了哪些检查。</small></div>
</div>
<div class="bottom-line">这四步要读文件、查数据库、跑程序，网页 AI 做不了。</div>

<style>
.watch-steps > div { display: grid; grid-template-columns: 34px 1fr; column-gap: 8px; align-items: baseline; padding: 6px 14px; margin: 6px 0; border-radius: 8px; border: 1px solid #e0ddd2; background: #fcfbf7; }
.watch-steps span { grid-row: span 2; font-size: 19px; color: #1B365D; font-weight: 600; }
.watch-steps b { font-size: 20px; font-weight: 600; color: #141413; }
.watch-steps small { font-size: 15px; color: #3d3d3a; line-height: 1.5; }
</style>

<!--
Central message: skill 让它在核对过的输入上改，去原始数据库取数据。
讲述：［切回终端看一眼，指出它调用了哪个 skill。］它从 skill 里那份核对过的例子改出 FRESCO 输入，没有从零写；KD02 参数用脚本算，不靠记忆。然后它去 EXFOR 查数据。这四步，网页上的 AI 一步都做不了。
Timing target: 29:00–32:00。
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
<div class="bottom-line">建议里有错，读着却像全对。要打开 EXFOR 原始条目才能发现。</div>

<!--
Central message: 网页 AI 给了建议，还得你自己核实。
讲述：同一句话我贴给了 DeepSeek，开着联网。它说自己算不了，也取不到数据。它推荐了一组数据，文章和条目都是真的，比刚才编参考文献的情况好一些。但它说这组数据是 30 MeV 的，我打开原始条目一看：铅的截面只有 26.3 MeV，而且是从图上扫描的任意单位。拿它去比 30 MeV 的计算，就错了。这种半对的建议最难发现。
Timing target: 32:00–35:00。
Transition: 回到终端，看它做到哪了。
-->

---

# 切回终端：它交回来的
<div class="subtitle">Live demo · open what it delivered</div>

<div class="two">
<div><img src="./figures/fusion-live-p208pb.png" class="kami-img" /></div>
<div class="kami-card"><h3>它的报告（备课预演）</h3><p>没有 30.0 MeV 的数据，测量在 <b>30.3 MeV</b>；两个能量都算了。</p><p>用 van Oers 1974 的表格数据；同条目里从图扫描的那组，<b>只拿来交叉检查</b>。</p><p>KD02：前角吻合，60° 以后偏高 20–50%。</p></div>
</div>
<div class="source">图：备课预演时它自己画的，3 分 43 秒。另一次预演用了 11 分钟，选的数据和做的检查不完全一样。现场看终端结果。</div>

<!--
Central message: 它交回图，也说明了为什么选这组数据。
讲述：［打开 results 里的图，念它报告里的几句。］这里看三处。数据在 30.3 MeV，它没有只算 30，两个能量都画了。它也区分了表格数据和从图上扫描的数据，后者只用来交叉检查。另一次预演里，它还在 EXFOR 里发现一个点大了十倍，排除并注明，没有自己去“修正”。再看计算结果：全局光学势在前角符合得很好，后角偏高。这合不合理，要你用物理知识判断。两次预演做的事不完全一样，现场这次也会不同。
Timing target: 35:00–42:00。
Transition: 它说“检查过了”，查的是什么？
-->

---

# 这些检查分别能查什么？
<div class="subtitle">Implementation, input, and model adequacy</div>

| 想知道什么 | 它怎么查的 | 查不出什么 |
|---|---|---|
| 它真的跑了吗？ | 打开文件，用它给的命令再跑一次 | 算得对不对 |
| 数值算准了吗？ | 改步长、匹配半径、分波数，结果不变 | 输入有错 |
| 输入对吗？ | KD02 参数两个独立来源对照 | 这个势适不适合这个核 |
| 模型适用吗？ | 两组独立实验数据，带误差 | 偏差来自势还是数据 |

<div class="bottom-line">AI 说“我已经验证过了”，就问它：查的是表里哪一行？</div>

<!--
Central message: 不同的检查回答不同的问题，不能互相代替。
讲述：它报告里列的检查，大部分属于第二、三行：查数值收敛、核对参数。这些检查有用，但回答不了最后一行的问题：KD02 在后角偏高，是势的问题还是数据的问题？这一步需要你作物理判断。以后看到“验证通过”，先问一句：验证的是哪一行。
Timing target: 42:00–51:00（含现场等待的余量）。
Transition: 要让它每次都这样查，就得把规矩写下来。
-->

---
layout: section
---

<LiveOnly><ParticleField tone="dark" :seed="4" /></LiveOnly>

<div class="part-no">03</div>
<div class="kicker">PART 03</div>

# 把改错经验写下来

<div class="part-lead">skill 是它每次开工前读的操作规程：从查文献讲到 FUSION</div>
<div class="part-track"><span class="done"></span><span class="done"></span><span class="on"></span></div>

<!--
Timing target: 51:00–51:30。
Transition: 先做一个对照。
-->

---
class: dense
---

# 5 条参考文献，AI 能查出错吗？
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
<p>两处错误，都没查出来。</p>
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
<p>没联网时，它照着规程编依据；联网后，又把二手引用当原始记录。</p>
</div>
</details>
<details name="ab">
<summary><span>③</span><b>agent 加 skill</b><small>查 CrossRef，打开原始记录核对。</small></summary>
<div class="ab-res">
<div><i>[1][3][5]</i>DOI 原始记录逐字段一致，正确（[1] 就是 32, 431, 1985）</div>
<div class="good"><i>[2]</i>10.1103/RevModPhys.30.257：起始页 <b>257</b>，列表写成 275 <em>有误</em></div>
<div class="good"><i>[4]</i>PRC 96, 064607 是 M. Mirea 的 α 衰变文章；Lei、Moro 2017 年发的是 PRC 95, 044605 <em>编造</em></div>
<p>两处都查出来了，每条都能点开原始记录。</p>
</div>
</details>
</div>
<div class="note-line">5 条里有错。每轮加一样：先加 6 行规程，再加查库工具。</div>
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
Central message: 只给规程，没给工具，AI 会按规程的格式编依据。配上能查库的工具，才查得出错。这三轮每次只加一样东西。
操作：［点下面的链接打开提示词网页，复制第一轮，切到网页 AI（关联网）粘贴。］学生可以扫码跟着做。
讲述：第一轮，我什么都不说，直接问。［预演 2026-10-28，DeepSeek 关联网：[2] 的 275 判“正确，经典文献”；[4] 说“Lei 与 Moro 确实在 PRC 96, 064607 发表过”，“卷号、页码、年份本身是对的”；[5] 先说“有问题”，绕一圈又改口“正确”。］第二轮，新开对话，同一个模型，前面多贴 6 行规程。［预演：它给出一张很规整的表，每条都写“依据 Crossref DOI ……”，五个字段逐一“一致”，[4] 也判“正确”。可它关着联网，什么都没查，这些 Crossref 记录全是编的。］这一轮的表格看起来很严谨，答案却还是错的。它照着规程写出了依据的样子，实际没有去查。［再开联网跑一次第二轮：[2] 和 [4] 都抓到了（它找到了 PRC 95, 044605，但没打开 96, 064607 看那是谁的文章）；可它把对的 [1] 判成“有误”，依据是别人论文参考文献表里写的 “32, 432 (1982)”。它把二手引用当作原始记录，没有按规程第 4 条确认打开的是不是这一篇。］第三轮，切到终端，让 agent 用 literature-search 真的去查。答案：第 2 条起始页是 257，不是 275；第 4 条是编的，PRC 96, 064607 这个 DOI 能打开，但打开的是 Mirea 一篇 α 衰变的文章。Lei 和 Moro 2017 年在 PRC 发的是 95, 044605。光查 DOI 存不存在，就查不出这个错。
预演原文：demo/literature/ab-test/runs/（未提交）。
备用：现场失败时打开 demo/literature/ab-test/ANSWERS.md 和 crossref/ 里的原始记录。
Timing target: 51:30–59:00。
Transition: 第二轮的 6 行规程只是 skill 的一部分，还要配上能查库的工具。接着看完整的。
-->

---

# 把查文献的规矩写成 skill
<div class="subtitle">literature-search: the workflow behind Case 2</div>

<div class="handoff-loop">
<div><span>找线索</span><b>先查已有笔记</b><small>没有线索，再搜文献</small></div>
<div><span>调工具</span><b>取数据库记录</b><small>INSPIRE / CrossRef / arXiv</small></div>
<div><span>核对</span><b>是不是要找的那篇</b><small>题目、作者、年份</small></div>
<div><span>写文件</span><b>生成 BibTeX</b><small>只用记录返回的字段</small></div>
</div>
<div class="two">
<div class="kami-card"><h3>每一步都有规矩</h3><p>笔记用来找线索，仍要查库。<br>缺字段标 UNVERIFIED，不凭记忆补齐。</p></div>
<div class="kami-card"><h3>查不到时怎么办</h3><p>说明没找到、多篇候选或网络故障。<br>没核实的条目，不放进正式引用。</p></div>
</div>

<!--
Central message: 把犯过的错、该怎么做写成操作规程，让它每次都读，就是 skill。
讲述：案例 2 里，它按步骤查库，是因为我事先把查文献的步骤写进了一个文件，叫 skill。每次我说“查一下这篇文献”，它先读这个文件，照着做。只说一句“请认真核对”是没用的，要写清楚：查哪个库、比哪几个字段、查不到怎么办。
Timing target: 51:30–54:00。
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
<div class="kami-card"><h3>三部分怎么用</h3><p><b>名称和说明：</b>告诉它什么时候用。</p><p><b>操作步骤：</b>调什么工具、查什么、何时停。</p><p><b>脚本：</b>实际访问数据库的程序，<br>例如 scripts/verify_doi.py。</p><p>不用训练新模型，<br>把操作方法写给它就行。</p></div>
</div>
<div class="note-line">中文节选；完整 skill 按情况分别处理。</div>

<!--
Central message: skill 就是一份写给 AI 的操作手册，加上它要调的脚本。
讲述：［打开 demo/literature/SKILL-excerpt.md，再打开本机完整的 SKILL.md。］上面两行说明什么时候用，下面写步骤，脚本负责连接数据库。不需要训练模型，把方法写进一份 markdown 文件就行。你们组里有师兄师姐传下来的“跑程序注意事项”吗？那些就能拿来写 skill。
Timing target: 54:00–56:00。
Transition: 现场让它查一篇。
-->

---
class: dense
---

# 现场：用 skill 查论文，存原始记录
<div class="subtitle">Run the lookup and open its files</div>

<div class="kami-card task-brief lesson-prompt" data-label="演示任务">
使用 literature-search，核实 DOI <code>10.1103/PhysRevC.97.011601</code>。<br>
保存数据库原始记录、BibTeX 和核对说明。查不到的字段不要补写。
</div>
<div class="two">
<div class="kami-card"><h3>它交回三个文件</h3><p>crossref-record.json：数据库原始记录。<br>references.bib：只用返回的字段生成。<br>verification.md：查库时间、来源、缺项。</p></div>
<div class="box-gap"><h3>备课时就碰到一个坑</h3><p>脚本给出的页码是<b>空</b>：PRC 用文章号，CrossRef 放在 article-number，脚本只读 page。原始记录里有 011601，从记录取，别照 DOI 猜。</p></div>
</div>
<div class="source">备课查询：2026-10-20，CrossRef，禁用缓存；记录在 demo/literature/results/。断网时打开它，并说明是备课结果。</div>

<!--
Central message: skill 有没有用，要看它调了什么工具、留下什么文件。
讲述：［按 demo/literature/PROMPT.md 发送。］先看它读了哪个 skill，再看它调用了哪个数据库，最后打开文件。备课时就碰到一个问题：脚本说页码是空的，因为 PRC 的文章号放在另一个字段里。如果只看一句“验证成功”，你就会拿到一条没有页码的引用，或者它看着 DOI 猜一个。存下原始记录，就能查清这种问题。查到论文确实存在，也还得读原文，才能知道它支不支持你想写的结论。
Timing target: 56:00–59:00。
Transition: 核物理程序也可以这样写操作规程，这就是 FUSION 做的事。
-->

---

# FUSION：核物理程序的 skill
<div class="subtitle">Edit a verified input, reproduce a known benchmark</div>

<div class="kami-card"><h3>26 个 skill，其中 20 个用来跑公开的核物理程序。</h3><p>FRESCO、TALYS、SKY3D……每个 skill 带一份核对过的输入和一个已知结果。</p></div>
<div class="two">
<div class="kami-card"><h3>它怎么做</h3><p>在核对过的输入上<b>改</b>，不凭记忆<b>写</b>。</p><p>先复现已知结果，达到指定精度。</p></div>
<div class="kami-card"><h3>你来判断</h3><p>复现已知结果，只说明程序装对了、跑对了。</p><p>研究什么、模型合不合适、结果怎么解释，<br>要自己判断。</p></div>
</div>
<div class="source">github.com/jinleiphys/FUSION。今天不要求安装。</div>

<!--
Central message: FUSION 用两条规矩来防前面讲的两类错误。
讲述：我把一些核物理程序的操作方法写成 skill，就有了 FUSION。我要求它从核对过的输入改起，不能凭记忆从零写 FRESCO 输入；还要先复现一个已知结果。这是为了防它“编”和“自说自话”。复现了作者的结果，只能说明程序装对了，你的物理对不对还得另查，就是刚才检查表的最后一行。
Timing target: 59:00–62:00。
Transition: FUSION 里还带了一个知识库。先说为什么需要它。
-->

---
class: dense
---

# 为什么要给它一个知识库
<div class="subtitle">The model forgets, and what it “remembers” it may invent</div>

<div class="three">
<div class="box-gap"><h3>它记不住</h3><p>新开对话，它不知道你做什么课题、上次定了什么。</p></div>
<div class="box-gap"><h3>凭记忆就会编</h3><p>第 19 页那条假的参考文献，就是它凭记忆写出来的。</p></div>
<div class="box-gap"><h3>聊天记录靠不住</h3><p>对话一长，前面的内容会被压缩；换个窗口，就全没了。</p></div>
</div>
<div class="kami-card" style="margin-top:16px"><h3>把资料另存下来</h3><p>它回答之前，先去翻这些资料。</p></div>
<div class="bottom-line">存资料、找资料，有两种做法。</div>

<!--
Central message: 模型记不住，凭记忆又会编，就把资料另存下来，让它查过再答。
讲述：用久了就会发现，它最大的毛病是记不住。每开一个新对话，都得重新跟它介绍课题。凭记忆说文献，它会编，第 19 页那条就是。聊天记录也靠不住，一长就被压缩。所以我把它需要的资料另存下来，让它回答前先翻一遍。怎么存、怎么找，有两种做法。
Timing target: 62:00–63:30。
Transition: 先说用得最多的一种，RAG。
-->

---
class: dense
---

# 做法一：RAG（检索增强生成）
<div class="subtitle">Retrieval-augmented generation: look up chunks at question time</div>

<div class="handoff-loop">
<div><span>切块</span><b>把文献切成小段</b><small>每段几百字</small></div>
<div><span>向量化</span><b>每段换成一串数字</b><small>意思接近，数字也接近</small></div>
<div><span>检索</span><b>找出最接近的几段</b><small>问题也换成数字来比</small></div>
<div><span>生成</span><b>放进提示词再回答</b><small>答完，这几段就丢了</small></div>
</div>
<div class="box-gap rag-bad"><h3>拿来做科研，有四个问题</h3><div class="rag-grid"><p><b>不积累：</b>每次都要拿零散段落重新拼。</p><p><b>丢上下文：</b>切出来只剩“该势”，不知道指哪个。</p><p><b>只认像不像：</b>KD02 和 KD03、<sup>16</sup>O 和 <sup>6</sup>O，向量差别很小。</p><p><b>看不见：</b>两篇结论相反，它不提醒；用了哪几段，你也看不到。</p></div></div>

<style>
.rag-bad { margin-top: 14px; }
.rag-grid { display: grid; grid-template-columns: 1fr 1fr; column-gap: 28px; }
.rag-grid p { font-size: 17px; }
</style>

<!--
Central message: RAG 每次临时找几段文字，能查资料，却没把对这个领域的理解存下来。
讲述：RAG 是这么做的：先把文献切成小段，用模型把每段转成一串数字，意思接近的段落，数字也接近。你一提问，问题也换成数字，找出最接近的几段，放进提示词，让它回答。市面上很多“跟你的 PDF 聊天”的产品就是这么做的。拿来做科研有四个问题。每次都要拿零散段落重新拼，之前整理的东西留不下来。切块还会丢上下文。向量只看意思像不像，可在核物理里，KD02 和 KD03 是两个势，16O 和 6O 是两个核，前面校样那页错的就是这个。还有，你看不到它怎么找的。找到两篇结论相反的文章，它不提醒你；用了哪几段，你也看不到。
Timing target: 63:30–65:30。
Transition: 所以今年很多人换了个做法。
-->

---
class: dense
---

# 后来我改用 wiki
<div class="subtitle">Organize once when a paper comes in, not every time a question is asked</div>

| | RAG | wiki |
|---|---|---|
| 什么时候整理 | 每次提问时临时拼 | 收到文献时整理一次 |
| 整理完以后 | 答完就丢 | 写成页面，一直留着 |
| 文献之间有矛盾 | 看不出来 | 在页面上写明 |
| 怎么找 | 比向量，找最接近的段落 | 先看目录，再顺着链接找 |
| 人能不能检查 | 一串数字，看不懂 | 普通文本，打开就能看、能改 |

<div class="note-line">Karpathy 今年 4 月写了 “LLM Wiki”，介绍这种做法。我的两份 wiki 从 5 月开始建。arXiv 那份的全文检索用关键词，没用向量，因为要找的常常是一个确切的符号或数字。</div>
<div class="bottom-line">文献收到时整理一次，以后提问不用重新整理。</div>

<style>
.slidev-layout table { table-layout: fixed; width: 100%; font-size: 17px; }
.slidev-layout th:first-child, .slidev-layout td:first-child { width: 18%; }
.slidev-layout th, .slidev-layout td { white-space: normal; padding: 7px 12px; line-height: 1.4; }
</style>

<!--
Central message: 文献收到后整理成 wiki 页面，人和模型都能读、能改。
讲述：wiki 的做法是，收到一篇文献，就让模型整理好，写进相关页面：用了什么方法、算了什么体系、跟谁的结论不同。下次提问，先看目录，再顺着链接往下找，不用比向量。我最看重最后一行：这些都是普通文本，我能打开看它写了什么，写错了直接改。Karpathy 今年 4 月写过这个做法，叫 LLM Wiki，现在用的人很多；我的两份是 5 月开始建的。另外，arXiv 那份的全文检索我特意用关键词，没用向量，因为我们要找的常常是一个确切的符号、一个数字。
来源：Karpathy, “LLM Wiki” gist（2026 年 4 月）；research-wiki 和 research-wiki-personal 首次提交均为 2026-05-06；literature-corpus 为 SQLite FTS5/BM25，无 embedding。
Timing target: 65:30–67:30。
Transition: 我现在有三份 wiki，内容完全不一样。
-->

---
class: dense
---

# 我的三份 wiki
<div class="subtitle">Personal, close-reading, and arXiv-wide</div>

| | 个人 wiki | 精读 wiki | arXiv wiki |
|---|---|---|---|
| 存了什么 | 我发表的论文，组里的服务器和计算资源 | 我读过的文献，加上方法、体系的专题页 | arXiv 核理论 1992–2026 年每篇文章的摘要 |
| 多大 | 约 460 页，论文 124 篇 | 836 篇文献，约 1200 个专题页 | 61,059 篇，80 万条引用 |
| 谁写 | agent 根据工作记录写，我来审 | agent 读完全文写，我来审 | DeepSeek 批量生成 |
| 用来查 | 我发过什么文章，哪台机器能跑什么 | 我信得过的文献怎么说，哪里有分歧 | 这个问题谁做过，谁引了谁 |
| 公开吗 | 不公开，审稿记录不进 git | 不公开 | 公开，在 FUSION 里 |

<div class="bottom-line">越往右，收得越广，写得越简略。查之前先选好哪一份。</div>

<style>
.slidev-layout table { table-layout: fixed; width: 100%; font-size: 17px; }
.slidev-layout th:first-child, .slidev-layout td:first-child { width: 11%; }
.slidev-layout th, .slidev-layout td { white-space: normal; padding: 8px 12px; line-height: 1.4; }
</style>

<!--
Central message: 三份 wiki 收录范围不同，写的人不同，可信程度也不同，要按问题来选。
讲述：第一份记我自己的情况：发过哪些论文，组里有哪些服务器、每台什么配置。每开一个新对话，它会先读一页概况。第二份记我读过的八百多篇文献，每篇都连到方法、体系、观测量的专题页，所以可以问“某个方法，我读过的文献里谁跟谁说法不一样”。第三份最大，arXiv 核理论三十多年的文章，六万多篇，每篇一页摘要，还有八十万条引用关系。这一份是 DeepSeek 批量写的，我没有一篇篇审，所以只拿来找线索。
数字（2026-10-29 清点）：个人 457 页；精读 836 篇 source，概念页 entities 515 + methods 275 + systems 272 + observables 111 = 1173；kb-wiki 61,059 篇 + 108 主题页，citations.tsv 809,632 条，typed relations 237,010 条。
Timing target: 67:30–69:00。
Transition: 每份都举一个实际用过的例子。
-->

---
class: dense
---

# 三份 wiki 实际怎么用
<div class="subtitle">One real use of each</div>

<div class="three">
<div class="kami-card"><h3>个人：了解我的情况</h3><p>新开对话，它先读一页概况：我发过的论文，组里的服务器、各有多少核和 GPU。</p><p>我只说“跑一下”，它就知道大计算该在哪台机器跑。</p></div>
<div class="kami-card"><h3>精读：每周自查一遍</h3><p>它每周查一遍，把 wiki 的卷号、页码和数据库核对。</p><p>10 月 26 日查出 7 条不对，逐条到 CrossRef 核实后改了。比如 Jensen 那篇 PLB 32，页码记成 491，实际是 567。</p></div>
<div class="kami-card"><h3>arXiv：找线索</h3><p>查 PRL 122 的预印本，库里有 23 篇文章引用它。</p><p>可这一页的 DOI 栏是空的，其实文章早就发表了。真要引用，还得回数据库查。</p></div>
</div>
<div class="bottom-line">个人和精读这两份我审过，可以直接用；arXiv 那份只用来找线索。</div>

<!--
Central message: 个人 wiki 让它了解我的情况，精读 wiki 存我信得过的文献，arXiv wiki 用来在全领域找线索。
讲述：我最常用个人 wiki 来让它了解我的情况。里面记了我发过的论文和 DOI，写新文章引用自己的工作时，它就不用凭记忆。还记了组里的服务器，每台多少核、几块 GPU。这样我只说一句“跑一下”，它也知道大计算该放到哪台机器，不会在我笔记本上跑。再看精读 wiki。笔记也会出错，所以它每周自己查一遍，把每页记的卷号、页码、arXiv 号跟数据库对一遍。10 月 26 日那次查出 7 条不对，比如 Jensen 那篇 PLB 32，页码记成了 491，实际是 567。它先到 CrossRef 和 arXiv 逐条核实，再改。这跟第 19 页做的是同一件事，只是变成每周自动做。arXiv wiki 这个例子是今天备课时现查的。PRL 122 的预印本 1812.11248，库里有 23 篇文章引用它，其中 2 篇标成“扩展”、3 篇标成“使用”。可这一页的 DOI 栏是空的，这篇明明发在 PRL 上。因为文章在 arXiv 公布时抓了元数据，正式发表后没有补。所以这一份只当线索，真要引用，回到第 20 页的 skill 去查库。
来源：个人 wiki profile.md（发表列表、计算资源表）；精读 wiki log 2026-10-26（weekly lint，7 条 MISMATCHED 逐条核实后改正）；kb-wiki/papers/1812.11248.md、citations.tsv、relations.tsv（2026-10-29 查询）。
Timing target: 69:00–70:00。
Transition: 最后现场试一次，三份 wiki 一起用。
-->

---
class: dense
---

# 现场：读篇新论文，找合作机会
<div class="subtitle">One new arXiv paper, two wikis, one question</div>

<div class="kami-card task-brief lesson-prompt wiki-prompt" data-label="现场原样发送">
<div class="copy-corner"><CopyButton label="复制提示词" text="paper/ 里是我刚从 arXiv 下载的论文。先读原文，再查 arXiv wiki，找这个组以前的文章，梳理他们一直在研究什么，推测下一步可能做什么，并列出支持推测的文献。再查我的个人 wiki，只用我已发表的论文和公开代码，找双方可以合作的问题。每条都注明出处（arXiv 号或我的论文）。" /></div>
读 paper/ 里刚下载的 arXiv 论文，再查 arXiv wiki，梳理这个组以前的研究，推测下一步可能做什么。再查我的个人 wiki，只用已发表的论文和公开代码，找合作机会。推测要有依据，每条注明出处。
</div>

<div class="wiki-steps">
<div><span>①</span><b>读新论文</b><small>作者、方法、结论</small></div>
<div><span>②</span><b>arXiv wiki</b><small>按作者和引用，查这个组以前的研究</small></div>
<div><span>③</span><b>推测下一步</b><small>每条都列出文献依据</small></div>
<div><span>④</span><b>个人 wiki</b><small>从我的论文、代码里找合作机会</small></div>
</div>
<div class="note-line">新论文还没进 arXiv wiki，要直接读原文。下一步做什么、能否合作，都是它的推测，是否靠谱由我判断。</div>

<style>
.wiki-prompt { font-size: 16px; line-height: 1.55; position: relative; }
.wiki-prompt .copy-corner { position: absolute; top: -17px; right: 18px; z-index: 5; }
.wiki-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 14px; }
.wiki-steps > div { display: grid; grid-template-columns: 26px 1fr; column-gap: 6px; align-items: baseline; padding: 8px 12px; border-radius: 8px; border: 1px solid #e0ddd2; background: #fcfbf7; }
.wiki-steps span { grid-row: span 2; font-size: 18px; color: #1B365D; font-weight: 600; }
.wiki-steps b { font-size: 17px; font-weight: 600; color: #141413; }
.wiki-steps small { font-size: 13.5px; color: #3d3d3a; line-height: 1.45; }
</style>

<!--
Central message: 两份 wiki 一起用：查 arXiv wiki 了解对方的研究，再查个人 wiki，看我有哪些工作能用来合作。
操作：［讲之前先从 arXiv 挑一篇当周的 nucl-th 新论文，下载到一个空目录的 paper/ 里。切到终端，在这个目录启动 claude，粘贴提示词。］
讲述：再现场试一次。我刚从 arXiv 下载了一篇这周的新论文，还没进 arXiv wiki，得让它直接读原文。读完再查 wiki，看看这个组以前做过什么，这几年一直在研究哪些问题。然后猜一猜，他们下一步可能做什么？每条都得列出文献依据。再看我的个人 wiki，找找双方能合作的问题。这里只许用我已发表的论文和公开代码，个人 wiki 里那些没发表的东西不能投到屏幕上。这些推测和合作建议都只是它的猜测，哪条值得发邮件去谈，还得我自己判断。
备用：现场太慢或失败，打开备课预演的记录。
Timing target: 70:00–75:00。
Transition: FUSION 和 arXiv wiki 都是公开的，看看都有谁在看。
-->

---

# 哪里有人看 FUSION
<div class="subtitle">vibeinscience.com/visitors.html · live</div>

<div class="vis-frame">
<img class="vis-still" src="./figures/fusion-visitors.png" alt="FUSION 访客地图截图" />
<iframe class="vis-live" src="https://vibeinscience.com/visitors.html" loading="lazy" title="FUSION 访客地图"></iframe>
</div>
<div class="vis-foot">亮点表示那里有人打开过网站。<a href="https://vibeinscience.com/visitors.html" target="_blank">在浏览器里打开</a></div>

<style>
.vis-frame { position: relative; width: 845px; height: 310px; margin: 18px auto 0; border-radius: 10px; overflow: hidden; background: #070b14; }
.vis-still { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: top; }
.vis-live { position: absolute; top: 0; left: 0; width: 1280px; height: 1000px; border: 0; transform: scale(0.66) translateY(-360px); transform-origin: 0 0; pointer-events: none; }
.vis-foot { text-align: center; font-size: 15px; color: #6b6a63; margin-top: 12px; }
.vis-foot a { margin-left: 10px; }
</style>

<!--
Central message: skill 是公开的，别人在用、在看。
讲述：FUSION 的 skill 和 arXiv wiki 都放在公开仓库里。这是 FUSION 网站的实时访客地图。亮点表示这个国家有人打开过网站。计数来自 GoatCounter，它不记 IP，同一个人不同天、不同页面会重复计数，所以这里只说“哪些地方有人看”，不报人数。
操作：嵌入的网页只显示地图、不接收点击，翻页不受影响；要看国家列表和每日曲线，点“在浏览器里打开”。断网时显示的是 2026-10-28 的截图。
Timing target: 75:00–76:00。
Transition: 还有一个案例：两个程序的结果对不上。
-->

---

# 两个程序对不上，查出了公开代码的 bug
<div class="subtitle">Case 4 · disagreement is information</div>
<div class="case-tag">2026-09 · 核反应程序对照 · 真实记录，暂不公开程序名</div>

<div class="three">
<div class="kami-card"><h3>做了什么</h3><p>同一个 (p,n) 反应、同一组输入，用公开的散射程序和 FRESCO 各算一遍。</p></div>
<div class="kami-card"><h3>发现什么</h3><p>对不上。逐项查，发现那个程序漏了自旋翻转项。</p></div>
<div class="kami-card"><h3>后来</h3><p>联系作者，作者独立确认并修好了。</p></div>
</div>
<div class="bottom-line">两个程序对得上，只说明两边算得一样；对不上，就要查原因。<br>运行、比较、找差别，AI 做得快；比什么、信哪个，要靠物理判断。</div>

<!--
Central message: 用 agent 对照两个程序，能很快找到差别；原因是什么，要用物理知识判断。
讲述：再看两边对不上的例子。两个程序算得一样，只说明实现一致。这次对不上，我没有随手调参数去凑。我逐项检查，发现别人的公开代码漏了一项。作者确认了，已经修了。程序名我先不说，作者那边的工作还没发表。跑两个程序、比较、定位这些活，agent 做得很快；比什么、信哪个，还得靠物理判断。
Timing target: 75:00–78:00。
Transition: 自己用之前，说一下权限。
-->

---

# 授权之前，看它准备做什么
<div class="subtitle">Permissions and privacy</div>

<div class="two">
<div class="kami-card"><h3>它会问你要权限</h3><p>读哪些文件、写哪些文件、运行什么命令。</p><p>看不懂就先让它解释，<br>不要一路点“同意”。</p></div>
<div class="kami-card"><h3>文件内容会发给模型服务</h3><p>文件存在本机，内容仍会发出去。</p><p>未发表的数据、审稿稿件、合作者的代码，<br>先确认能不能发。</p></div>
</div>
<div class="bottom-line">第一次先复制一个目录练习。</div>

<!--
Central message: 按任务给权限；哪些数据能发出去，自己判断。
讲述：它执行命令时会问你要权限，看不懂就让它解释这条命令做什么。还有，文件内容会发到模型服务端。我自己审稿的稿件，从来不交给任何外部模型，这是期刊的规定。第一次用，先拿一个副本练。
Timing target: 78:00–80:00。
Transition: 轮到大家了。
-->

---

# 练习：给自己的课题写一条任务
<div class="subtitle">3 分钟写，3 分钟和旁边的同学互换</div>

<div class="kami-card task-brief lesson-prompt" data-label="YOUR FIRST TASK">
<b>读什么：</b>哪个目录、哪些文件？<br>
<b>做什么：</b>具体完成哪一步？<br>
<b>不许做：</b>哪些文件不改？遇到什么先停下？<br>
<b>交什么、怎么验：</b>保存哪些文件？用哪个<b>没参与计算的量</b>来检查？
</div>
<div class="note-line">可以选：整理一批输出画图、给老程序加参数扫描、核对一篇稿子的参考文献。<br>不要选“帮我把论文写完”。</div>

<!--
Central message: 每位同学写一条任务，说明怎么做、怎么检查。
讲述：选你课题里一件小事。最难写的是最后一行：你拿什么来检查结果？刚才现场演示里是 EXFOR 的实验数据，参考文献里是数据库原始记录。［3 分钟写，3 分钟互换。］同桌只问两个问题：我能找到输入吗？做完我怎么知道它对？［请两三位读一下，现场点评。］
Timing target: 80:00–85:00。
Transition: 回去后可以怎么用。
-->

---

# 回去以后
<div class="subtitle">Three things to take home</div>

<div class="takeaways">
<div class="item"><span class="n">①</span><span class="t">要碰文件、跑程序的活，交给 agent<small>讨论概念继续聊天就好；来回复制粘贴的活，让它自己读、自己跑。</small></span></div>
<div class="item"><span class="n">②</span><span class="t">说“验证过了”，还得拿出证据<small>问清查了什么；找一个没参与拟合的量检查物理。</small></span></div>
<div class="item"><span class="n">③</span><span class="t">把改错经验写进 skill<small>写清步骤、工具、什么时候停；试跑，再改。</small></span></div>
</div>

<!--
Central message: 操作交给它，判断自己做，改错的经验写进规程。
讲述：回去可以先把来回复制粘贴的活交给它。它说验证过了，就问清到底查了什么。每次纠正一个错，把怎么改的写进 skill，下次再犯的机会就小一些，但仍然要查。skill 里的规矩就是这样逐条补进去的。
Timing target: 85:00–87:00。
Transition: 材料。
-->

---

# 课后材料
<div class="subtitle">The prompts from today, one scan away</div>

<div class="two">
<div class="qr-box"><img src="./figures/prompts-qr.svg" alt="提示词网页二维码" /><div class="ui-label">扫码拿今天的提示词</div><a href="https://jinlei.fewbody.com/talks/fusion-ml2026-1030/prompts.html" target="_blank">jinlei.fewbody.com/talks/fusion-ml2026-1030/prompts.html</a><small>FUSION 的 skill：github.com/jinleiphys/FUSION</small></div>
<div class="kami-card"><h3>回去先做这个</h3><p>选你课题里一个常用程序，<br>同一句话问两次：</p><p>一次直接问，一次先给它一份核对过的输入和一个已知结果。</p><p>比较两次交回的结果。</p></div>
</div>

<style>
.qr-box { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; }
.qr-box img { width: 200px; height: 200px; border-radius: 10px; box-shadow: 0 0 0 1px #e0ddd2; }
.qr-box a { font-size: 12px; color: #1B365D; white-space: nowrap; }
.qr-box small { font-size: 13px; color: #6b6a63; }
</style>

<!--
Central message: 课后可以马上试一次对照。
讲述：今天用到的提示词都在这个网页上，扫码就能复制。回去做一个对照：挑你课题里一个常用程序，同一句话问两次，一次什么都不给，一次给它一份核对过的输入和一个已知结果，也就是一个最小的 skill。比较两次交回的结果。这样试一次，比看任何产品评测都更能了解它，也能看出 skill 有多少用。
Timing target: 87:00–89:00。
Transition: 提问。
-->

---
layout: center
---

# 问答
<div class="subtitle">你准备让它帮你做的第一件事是什么？</div>

<!--
Central message: 拿同学写的任务，试试今天讲的办法。
讲述：［若没有提问，请一位同学读自己的任务卡，再请另一位说怎么验收。］
Timing target: 89:00–95:00。
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

<div class="note-line">装好一个工具就够了。Python 3 加 numpy、matplotlib 就能跑今天的任务。</div>

<!--
讲述：按自己的系统选一个装好，再登录。具体步骤看 SETUP.md。
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
讲述：skill 管一类任务，这个文件管整个项目。第四条来自一次错误：它从文字总结里抄数字，没去看原始表格，结果抄了错数。
Timing target: 备用。
-->

---
routeAlias: bk-exfor
---

# 备用：实验数据的误差被存成了 0
<div class="subtitle">A parsing defect that inflated a result</div>

<div class="two">
<div class="box-gap"><h3>发生了什么</h3><p>从 EXFOR 读实验数据时，解析程序把 8 组 (p,n) 数据的误差存成了 0。</p><p>误差 0 又被截到 0.5% 的下限：这 8 组只占数据点的 15%，却占了 Fisher 信息迹的 88%。</p><p>一度夸大了结论。</p></div>
<div class="kami-card"><h3>怎么防</h3><p>数据读入后，先打印每组的误差范围。</p><p>出现 0、负数、NaN，先停下来问。</p></div>
</div>

<!--
讲述：2026-09-18 的真实记录（LUCID 项目）。这次错在一个没人检查的中间文件，不在模型推理。
Timing target: 备用。
-->
