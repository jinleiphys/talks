---
theme: seriph
title: "把 AI Agent 培养成你的研究生"
info: "用培养一个好研究生的思路，讲清楚为什么科研需要个人知识库、它带来什么帮助、以及底层怎么搭"
author: "金磊 Jin Lei"
background: none
transition: fade
mdc: true
fonts:
  sans: 'Inter'
  serif: 'Newsreader, Source Serif 4, TsangerJinKai02, Source Han Serif SC, Songti SC, Georgia, serif'
  mono: 'JetBrains Mono, SF Mono, Consolas, monospace'
  local: 'Newsreader'
drawings:
  persist: false
---

<div class="ui-label" style="margin-bottom: 1.2rem;">复旦 · AI Agent 研讨会 · 2026.07</div>

# 把 AI Agent 培养成你的研究生
## How to Raise Your AI Agent Like a Graduate Student

### 个人知识库，就是你对 agent 的"培养"沉淀下来的成果

<div class="mt-8 text-lg">

**金磊** (Jin Lei)

同济大学物理科学与工程学院

复旦 AI Agent 研讨会 · 2026 年 7 月 4-5 日

</div>

<div class="abs-bl m-6 text-sm" style="color: var(--olive); opacity: 0.8;">
这套 slides，就是我"带"出来的 agent 读我的知识库自动写的
</div>

<!--
Central message: 个人知识库不是存档，而是你对 agent 的"培养"沉淀下来的成果；搭知识库等于培养一个好研究生。

开场白：今天换个角度讲个人知识库。在座很多人带过学生，或者正在被导师带。我想说：搭一个给 AI 用的知识库，跟培养一个好研究生，几乎是同一件事。今天分两幕，第一幕讲怎么"带"，第二幕揭开盖子讲这个"学生的脑子"怎么搭。

Time target: 0:00-1:30
过渡：先看看我们手里这个"学生"是什么样的。
-->

---
layout: section
---

# 第一幕　把 agent 当研究生来带
## Act 1: Train your agent like a student

<div style="color: var(--olive);" class="text-lg mt-2">
为什么要带，怎么带，带好了对科研有什么用
</div>

<!--
过渡：第一幕是故事和动机，全部用带学生的常识来讲。
-->

---
layout: default
---

# <span style="color: var(--color-gap); font-size: 1.05em;">当面什么都懂，转头就不认识你</span>
## Brilliant in the moment, a stranger the next session

<div class="text-lg mt-3">

今天的 AI agent，就像这样一个新生：

</div>

<v-clicks>

<div class="grid grid-cols-2 gap-3 mt-3 text-base">
<div class="kami-card"><strong>当面交流反应极快</strong>：上百页文献、复杂推理都跟得上</div>
<div class="kami-card"><strong>但换一个对话</strong>，就不认识你的课题组</div>
<div class="kami-card">不记得你做什么方向、读过谁</div>
<div class="kami-card">不记得昨天教过他什么、纠正过什么</div>
</div>

<div class="box-gap mt-4">
<strong>他的记性只在当下这次交流里，不写下来，就攒不成长期的东西。</strong>聪明不等于有用，能<strong>跨会话积累</strong>才有用。
</div>

</v-clicks>

<!--
Central message: AI agent 当面交流时反应极快，但换个会话如果没有外部记忆，就不认识你，所以聪明不等于有用，能跨会话积累才有用。

讲点：这正是今天大模型的真相：当面这次交流里它反应极快，上百页都跟得上；可换一个会话，如果没有外部记忆，它对你和你的课题就一无所知。一个这次讨论很聪明、下次又要从头交代背景的学生，你很难把长期课题交给他。今天大多数人用 AI，就是在反复接待这样一个永远的新生。

Time target: 1:30-3:30
过渡：那好导师是怎么把一个新生，带成能独当一面的骨干的？
-->

---
layout: default
---

# <span style="color: var(--ink-blue)">●</span> 培养，不是换一个更聪明的学生
## You don't swap in a smarter student, you train this one

<div class="text-base mt-1">

让学生变得有用，靠的不是换个天才（换模型），而是日复一日地给他<strong>上下文</strong>。这套培养，沉淀下来就是一个<strong>个人知识库</strong>：

</div>

<div class="mt-3">

| 培养一个好研究生 | 搭一个 agent 知识库 |
|---|---|
| ① 让他读文献，建立领域全景 | 文献库 / 概念页 |
| ② 告诉他方向和你的标准 | 常驻身份层 profile |
| ③ 教他方法，定下 SOP | 技能 skills |
| ④ 及时反馈，纠错记住 | 记忆 memory |
| ⑤ 让他积累，不重复踩坑 | 失败库 / 想法库 |
| 终点：独当一面、经验传承 | 复利闭环 + 纯文本长期资产 |

</div>

<!--
Central message: 让 agent 有用靠的是持续给上下文，这套培养沉淀下来就是知识库；下面五步逐一展开。

讲点：这张表是全场的地图。左边是任何一个好导师都会做的事，右边是它在知识库里对应的零件。接下来五步，每步都先讲"不培养会怎样"，再讲"培养好了对科研有什么用"。第二幕我再把右边这些零件拆开讲实现。

Time target: 3:30-5:30
过渡：第一步，也是最基础的一步：读文献。
-->

---
layout: default
---

<div class="ui-label">第一步 · STEP 1</div>

# <span style="color: var(--color-evidence)">●</span> 让他读文献，建立领域全景
## Make him read, until the field has a map

<div class="text-base mt-1" style="color: var(--olive)">
好导师都这样：要求学生精读经典、跟踪前沿，在脑子里建一张领域地图。
</div>

<v-clicks>

<div class="box-gap mt-3">
<strong>不培养：</strong>agent 用 RAG，每次提问都从原始 PDF 重新检索，读完就忘，给你的是零碎片段，不是全景。
</div>

<div class="box-evidence mt-3">
<strong>培养好：</strong>每读一篇，就把它编译进对应的概念页。三年下来，每个方法 / 体系页，都是一篇<strong>自动长出来的小综述</strong>。
</div>

<div class="mt-2 text-center">
<span class="tag">571 篇精读</span> &nbsp; <span class="tag">365 实体页</span> &nbsp; <span class="tag">195 方法页</span> &nbsp; <span class="tag">debates / synthesis</span>
</div>

<div class="box-idea mt-2">
<span class="takeaway">科研收益：</span>一句"谁做过 X""我读过的谁和谁矛盾"，答案早就攒好了。
</div>

</v-clicks>

<!--
Central message: 像要求学生建立领域地图一样，知识库把每篇论文编译进概念页，使领域综述随阅读自动累积。

讲点：571 篇精读不是躺在 571 个 PDF 里，而是沉淀成 365 个实体页、195 个方法页。我真有一个 debates 页记着 post-prior 那个三十年的争论。好学生和复读机的区别：好学生读完会更新他的领域认知，RAG 读完什么都没留下。

Time target: 5:30-8:00
过渡：光会读还不够，他得知道往哪读、按什么标准判断好坏。第二步。
-->

---
layout: default
---

<div class="ui-label">第二步 · STEP 2</div>

# <span style="color: var(--color-evidence)">●</span> 告诉他方向和你的标准
## Give him direction and your taste

<div class="text-base mt-1" style="color: var(--olive)">
好导师都这样：让学生清楚课题组在做什么、好的工作长什么样、有哪些规矩。
</div>

<v-clicks>

<div class="box-gap mt-3">
<strong>不培养：</strong>每次对话都要重讲一遍背景，agent 只能给泛泛而谈的建议，抓不住你真正关心的问题。
</div>

<div class="box-evidence mt-3">
<strong>培养好：</strong>一份个人档案<strong>自动注入每个会话</strong>：你的研究方向、硬规矩（物理优先、先跑再想、不写 em-dash）、有哪些机器和代码、合作者的分量。
</div>

<div class="box-idea mt-3">
<span class="takeaway">科研收益：</span>开口就<strong>进入工作状态</strong>，按你的标准和品味干活，不再每次从头教。
</div>

</v-clicks>

<!--
Central message: 像让学生理解课题组方向和标准一样，常驻身份层把你的方向、规矩、资源自动注入每个会话。

讲点：一个好学生值钱，不只在于他会的多，更在于他知道"我们组在乎什么、什么算好工作"。这份品味，对 agent 就是一份常驻的个人档案，每次对话第一行就加载。

Time target: 8:00-10:00
过渡：知道方向了，还得会干活的方法。第三步：教他方法、定 SOP。
-->

---
layout: default
---

<div class="ui-label">第三步 · STEP 3</div>

# <span style="color: var(--color-evidence)">●</span> 教他方法，定下 SOP
## Teach the method, write the SOP

<div class="text-base mt-1" style="color: var(--olive)">
好导师都这样：教学生科学的方法，怎么读、怎么复现、怎么写，形成可复用的流程。
</div>

<v-clicks>

<div class="box-gap mt-3">
<strong>不培养：</strong>每次让 agent 干活都要从头交代步骤，质量全凭它即兴发挥，时好时坏。
</div>

<div class="box-evidence mt-3">
<strong>培养好：</strong>把"怎么做"写成可复用的<strong>技能（skill）</strong>：读一篇论文怎么入库、记一个项目怎么归档，连引用格式、查重、出处都规定死。一句话触发，按 SOP 执行。
</div>

<div class="box-idea mt-3">
<span class="takeaway">科研收益：</span>agent <strong>自己按流程维护知识库</strong>，你只管 curate 和提问，脏活它全包了。
</div>

</v-clicks>

<!--
Central message: 像给学生定方法论 SOP 一样，技能把维护知识库的流程编码成可复用协议。

讲点：好导师不是每个任务都手把手，而是教会一套方法，学生以后自己照着做。技能就是这套方法的文本化，它本身也是纯文本，存在库里，可以版本管理、不断迭代，就像实验室的 SOP 文档。

Time target: 10:00-12:00
过渡：再好的学生也会犯错，关键看犯错之后。第四步。
-->

---
layout: default
---

<div class="ui-label">第四步 · STEP 4</div>

# <span style="color: var(--color-evidence)">●</span> 及时反馈，纠错，让他记住
## Correct him once, and he never forgets

<div class="text-base mt-1" style="color: var(--olive)">
好导师都这样：给具体反馈，指出问题，学生改了之后记住，不再犯第二次。
</div>

<div class="grid gap-6 mt-3" style="grid-template-columns: 3fr 2fr;">

<div>

<v-clicks>

<div class="box-gap">
<strong>不培养：</strong>同样的错犯了一遍又一遍，你纠正一百次，它第一百零一次还那样。
</div>

<div class="box-evidence mt-3">
<strong>培养好：</strong>每次"不对，应该这样"，都存成一条规则、自动加载。犯过一次的错，<strong>不再犯第二次</strong>。
</div>

<div class="box-idea mt-3">
<span class="takeaway">科研收益：</span>agent 越用越像你，<strong>无需重训模型</strong>，这份个性化属于你。
</div>

</v-clicks>

</div>

<div>

```text
---
name: 不要在目录间预先镜像
type: feedback
---
不要把一个 talk 的改动
镜像到另一个，除非明确点名。

Why: 自作主张同步，被打回。
How: "给 A 加 X" 就只动 A。
```

<div class="fig-caption">一条真实的"批语"：犯错一次，从此改正</div>

</div>

</div>

<!--
Central message: 像学生被纠正后记住一样，记忆机制把每次反馈固化成自动加载的规则。

讲点：这条记忆是真的。某次 agent 自作主张把一个报告的改动同步到另外两个目录，我当场打回。现在这条"批语"以一个文件常驻，它再也不会犯。注意它还记了"为什么"，能迁移到新情境。

Time target: 12:00-14:00
过渡：第五步，是好学生和普通学生最大的分水岭：会不会积累。
-->

---
layout: default
---

<div class="ui-label">第五步 · STEP 5</div>

# <span style="color: var(--color-evidence)">●</span> 让他积累，不重复踩坑
## Keep a lab notebook, so no pit is fallen into twice

<div class="text-base mt-1" style="color: var(--olive)">
好导师都这样：要求记实验记录、记下走不通的路、管理时间节点。
</div>

<v-clicks>

<div class="box-gap mt-3">
<strong>不培养：</strong>开题容易撞墙，做了一半发现别人早做过，或者重新捡起一个你半年前就否决过的想法。
</div>

<div class="grid grid-cols-3 gap-3 mt-3 text-sm text-center">
<div class="kami-card"><strong>失败库</strong><br><code>failures/</code><br>走不通的路，登记在案</div>
<div class="kami-card"><strong>想法库</strong><br><code>ideas/</code> killed<br>已否决的，不再捡回</div>
<div class="kami-card"><strong>时间线</strong><br><code>log.md</code><br>什么时候做过什么</div>
</div>

<div class="box-idea mt-3">
<span class="takeaway">科研收益：</span>每次开新题，都站在你<strong>全部历史判断</strong>之上，agent 提方案前先读这些，不让你撞同一堵墙。
</div>

</v-clicks>

<!--
Central message: 像要求学生记录失败和节点一样，失败库、想法库和时间线让每次开题都建立在全部历史判断上。

讲点：科研里最浪费的就是重复踩坑、重复想已经否决的点子。failures 和 ideas/killed 这两栏，是防止你和 AI 一起兴冲冲走回头路的安全带。

Time target: 14:00-16:00
过渡：五步走完，这个学生该出师了。出师意味着什么？
-->

---
layout: default
---

<div class="ui-label">终点 · THE PAYOFF</div>

# <span style="color: var(--ink-blue)">●</span> 出师：独当一面，而且经验不随人走
## Graduation: independent, and the training stays

<v-clicks>

<div class="box-evidence mt-2">
<strong>独当一面：</strong>读 → 干活 → 把成果<strong>写回库</strong> → 下次起点更高。带得越久越省力，还能帮你起草论文、related work <strong>不漏引</strong>你读过的。
</div>

<div class="box-gap mt-3">
<strong>但真的研究生会毕业，把经验带走。</strong>三年心血，人一走，课题组又从头带新人。
</div>

<div class="box-idea mt-3">
<span class="takeaway">知识库不会走：</span>它是<strong>本地纯文本 + git</strong>，换电脑、换 agent、换模型都只是一次 <code>git clone</code>。你培养的，是一个<strong>永远不毕业、经验永久沉淀</strong>的研究生。
</div>

<div class="text-center mt-3 text-lg" style="color: var(--ink-blue)">
模型是商品，明年就换；<strong>知识库是护城河，跟着你一辈子</strong>。
</div>

</v-clicks>

<!--
Central message: 培养好的 agent 能独当一面并帮你写作不漏引，而且不像真学生会毕业带走经验，知识库是永久沉淀、不被锁定的长期资产。

讲点：这是比喻最有力的一击。带学生最心酸的是好不容易带出来，毕业走了，你又从零带新人。知识库把这件事永久解决了：它是纯文本加 git，一个永远不毕业的学生。

Time target: 16:00-18:00
过渡：空口无凭，看一个真实录屏：一句话，让这个"学生"写出一篇综述。
-->

---
layout: default
---

<div class="ui-label">实战演示 · LIVE DEMO</div>

# <span style="color: var(--color-evidence)">●</span> 一句话，让"学生"写出一篇综述
## review-writing in action

<div class="grid gap-5" style="grid-template-columns: 3fr 2fr;">

<div>

<video controls class="kami-img" style="height: auto; width: 100%; max-height: 21rem; object-fit: contain;" src="./figures/review-writing-demo.mp4"></video>

<div class="fig-caption">真实录屏：调用 review-writing 技能，agent 自动起草一篇综述</div>

</div>

<div class="flex flex-col justify-center">

<v-clicks>

<div class="box-evidence">
<strong>它先查我的文献库</strong>，框定论点、定好该引谁，再补检索，最后成文。related work <strong>不漏引</strong>读过的。
</div>

<div class="box-idea mt-3">
<span class="takeaway">这就是"出师"：</span>你给一句指令，培养好的"学生"交回一篇初稿。
</div>

</v-clicks>

</div>

</div>

<!--
Central message: 一段真实录屏证明，培养好的 agent 调用 review-writing 技能，能先查文献库再自动起草一篇不漏引的综述。

讲点：这段视频是现场实拍，不是演示文稿。注意它的动作顺序：先去翻我的文献库，把该引的、我读过的先列出来，再补检索，最后成文。这正好印证前面所有的层：文献库提供综述素材，技能提供写作 SOP，身份层提供我的标准。讲的时候可以暂停，指出它在查哪些概念页。

视频时长约 3 分钟，现场按需播放片段即可。

Time target: 18:00-20:00
过渡：那它最后交出来的成品长什么样？就在这里，可以直接翻。
-->

---
layout: default
---

<div class="ui-label">实战演示 · 成品 OUTPUT</div>

# <span style="color: var(--color-evidence)">●</span> 它交出来的成品：一篇 14 页综述初稿

<div class="grid grid-cols-7 gap-2 mt-2">
<img src="./figures/review-pages/p-01.png" class="review-thumb" />
<img src="./figures/review-pages/p-02.png" class="review-thumb" />
<img src="./figures/review-pages/p-03.png" class="review-thumb" />
<img src="./figures/review-pages/p-04.png" class="review-thumb" />
<img src="./figures/review-pages/p-05.png" class="review-thumb" />
<img src="./figures/review-pages/p-06.png" class="review-thumb" />
<img src="./figures/review-pages/p-07.png" class="review-thumb" />
<img src="./figures/review-pages/p-08.png" class="review-thumb" />
<img src="./figures/review-pages/p-09.png" class="review-thumb" />
<img src="./figures/review-pages/p-10.png" class="review-thumb" />
<img src="./figures/review-pages/p-11.png" class="review-thumb" />
<img src="./figures/review-pages/p-12.png" class="review-thumb" />
<img src="./figures/review-pages/p-13.png" class="review-thumb" />
<img src="./figures/review-pages/p-14.png" class="review-thumb" />
</div>

<div class="fig-caption mt-2">三体核反应综述初稿，14 页 · <a href="./threebody-review.pdf" target="_blank">打开完整 PDF</a></div>

<v-click>

<div class="box-evidence mt-3">
<span class="takeaway">关键：</span>结构、主要论点、初步引用都已搭好；引文只从我<strong>已入库</strong>的论文里取，库里没有的就标出来或再去补查，不让它硬编。这是初稿，物理判断和润色还得我自己来。
</div>

</v-click>

<!--
Central message: 演示产出的是一份铺满全宽、14 页的综述初稿，引用受限于已入库论文，输出可追溯、不硬编，而非模型臆造。

讲点：这就是上一页那段录屏的产出物，我把 14 页直接铺出来给大家看个规模。强调一点：引文不是模型随口编的，我要求它只从我读过、已入库的论文里取，库里没有的就标出来或再补查。这正是知识库相对裸用大模型最大的差别，输出可追溯。当然这是初稿，物理判断和润色还得我自己来，但它把最累的搭架子和铺引用做完了。现场想细看，可以点"打开完整 PDF"。

Time target: 20:00-21:30
过渡：把这五步的收益归到一张表上。
-->

---
layout: default
---

# <span style="color: var(--ink-blue)">●</span> 一个好研究生需要什么，知识库就给什么
## What a good student needs, the knowledge base provides

<div class="mt-2">

| 一个好研究生需要 | 知识库对应 | 对科研的帮助 |
|---|---|---|
| 读文献、建全景 | 概念页 / debates | 综述自动累积，随时可查 |
| 知道方向和标准 | 常驻身份 profile | 开口进入工作状态 |
| 一套做事方法 | 技能 skills | agent 自己按 SOP 维护 |
| 挨批能改、记得住 | 记忆 memory | 不重复犯错，越用越像你 |
| 记录、不踩坑 | 失败库 / 想法库 | 开题不重复劳动 |
| 出师、能传承 | 复利闭环 + git | 写作不漏引，长期资产不被锁定 |

</div>

<v-click>

<div class="text-center mt-3 text-lg" style="color: var(--ink-blue);">
一处培养，<strong>处处复用</strong>：同一个"学生"，喂饱了读、想、写、协作全过程。
</div>

</v-click>

<!--
Central message: 好研究生的每一项素质都对应知识库的一个部分，并转化为读、想、写、协作各环节的具体科研收益。

讲点：这张表把比喻和收益钉在一起。重点是这些收益来自同一个库，你只培养一次，它喂饱所有环节，这就是复利。第一幕到此结束。

Time target: 18:30-20:30
过渡：很多人会好奇，这个"学生的脑子"到底怎么搭的？第二幕揭开盖子。
-->

---
layout: section
---

# 第二幕　揭开盖子
## Act 2: Under the hood

<div style="color: var(--olive);" class="text-lg mt-2">
刚才讲的是"怎么带"，现在讲"学生的脑子"怎么实现
</div>

<!--
过渡：第二幕给想动手的人，讲底层范式和五层架构的实现。
-->

---
layout: default
---

# <span style="color: var(--ink-blue)">●</span> 核心范式：不是检索，是增量维护一个 wiki
## From RAG to a compounding wiki

<div class="text-base mt-2">

不要在提问时才去检索原始文档，而是让 LLM <strong>增量地建并维护一个持久 wiki</strong>，它坐落在你和原始资料之间。

</div>

<v-clicks>

<div class="grid grid-cols-3 gap-3 mt-3 text-center text-sm">
<div class="kami-card"><strong>raw sources</strong><br>原始资料，不可变<br><span style="color: var(--olive)">真相之源</span></div>
<div class="kami-card"><strong>the wiki</strong><br>LLM 拥有并维护<br><span style="color: var(--olive)">交叉引用的笔记</span></div>
<div class="kami-card"><strong>schema</strong><br>告诉 LLM 怎么维护<br><span style="color: var(--olive)">CLAUDE.md</span></div>
</div>

<div class="kami-card-accent mt-4">
"知识被<strong>编译一次，然后持续更新</strong>，而不是每次提问重新推导。" &nbsp;<span style="color: var(--olive)">你负责 sourcing 和提问，LLM 负责所有 grunt work。</span>
</div>

<div class="box-evidence mt-3">
<span class="takeaway">一句话：</span>Obsidian 是 IDE，LLM 是程序员，<strong>wiki 是代码库</strong>。
</div>

</v-clicks>

<div class="abs-br m-4 text-xs" style="color: var(--stone);">
A. Karpathy, "LLM Wiki" (gist, 2026)
</div>

<!--
Central message: 用一个持久、增量维护、可复利的 wiki 取代无状态 RAG，这是整套系统的思想原点。

讲点：诚实交代思想来源。核心区别就一句：RAG 是查询时才检索，wiki 是编译一次、持续更新。这个范式 Karpathy 在他的 LLM Wiki gist 里讲得很清楚，我在他基础上做成了一个科研系统。

Time target: 20:30-22:30
过渡：那这个 wiki，针对科研我拆成了五层，正好对应第一幕的五步。
-->

---
layout: default
---

# <span style="color: var(--ink-blue)">●</span> 培养的五步，落到实现就是五层
## The five training steps become five layers

<div class="grid gap-2 mt-3">

<div v-click class="kami-card-accent"><span class="tag">L5</span> &nbsp;<strong>记忆 memory</strong> &nbsp;<span style="color: var(--olive)">对应第四步 · 反馈纠错</span></div>
<div v-click class="kami-card-accent"><span class="tag">L4</span> &nbsp;<strong>技能 skills（读写协议）</strong> &nbsp;<span style="color: var(--olive)">对应第三步 · 方法 SOP</span></div>
<div v-click class="kami-card-accent"><span class="tag">L3</span> &nbsp;<strong>原子笔记 + 受控词表</strong> &nbsp;<span style="color: var(--olive)">对应第一步读文献 + 第五步积累</span></div>
<div v-click class="kami-card-accent"><span class="tag">L2</span> &nbsp;<strong>常驻身份层 profile</strong> &nbsp;<span style="color: var(--olive)">对应第二步 · 方向与标准</span></div>
<div v-click class="kami-card-accent"><span class="tag">L1</span> &nbsp;<strong>纯文本 + 链接</strong> &nbsp;<span style="color: var(--olive)">一切的载体，人和 agent 共享</span></div>

</div>

<div v-click class="mt-4 text-center">
<span class="tag">1425 文献笔记</span> &nbsp; <span class="tag">571 篇精读</span> &nbsp; <span class="tag">97 篇个人档案</span> &nbsp; <span class="tag">38 位合作者</span>
</div>

<!--
Central message: 第一幕的五个培养步骤，在实现上对应知识库的五层架构，下面逐层拆开。

讲点：这是连接两幕的桥。左边的层号，右边标着它实现的是哪一步。底部数字是我两个 wiki 的真实规模。接下来五页，一层一层看实现。

Time target: 22:30-24:00
过渡：从最底下的载体讲起：为什么是纯文本。
-->

---
layout: default
---

# <span style="color: var(--ink-blue)">●</span> L1　纯文本 + 链接：人和 agent 读同一份真相
## Plain text and links, not an app

<div class="grid gap-6" style="grid-template-columns: 2fr 3fr;">

<div class="text-base">

<v-clicks>

- **人可读**：Obsidian 里是一张可点击的知识图谱
- **Agent 可读**：纯文件，`grep` / `read` 直接拿
- **可 diff**：git 记录每次演化，能回滚
- **无锁定**：纯文本，二十年后还能打开

<div class="box-evidence mt-3">
<span class="takeaway">要点：</span>选纯文本，是为了让人和 agent 读<strong>同一份真相</strong>，不是两套数据。
</div>

</v-clicks>

</div>

<div>

```text
research-wiki-personal/
├── profile.md         # L2 常驻身份层
├── projects/          # active / paused / done
├── papers/            # 97
├── ideas/             # promising / killed
├── failures/          # 死路登记
├── methods-mine/      # 自有代码 (8)
├── collaborators/     # 38
└── index/             # by-topic / method ...
```

<div class="fig-caption">同一份目录：我在 Obsidian 浏览，agent 用文件系统读写</div>

</div>

</div>

<!--
Central message: 纯文本加链接加 git，让人和 agent 共享同一份可演化、无锁定的真相。

讲点：为什么不是 Notion、不是数据库？那些是给人的 UI 优化的，agent 抓不到。纯 Markdown，对人是图谱，对 agent 是一次 read，对 git 是一个 diff，三方看同一个字节。

Time target: 24:00-25:30
过渡：载体之上，第一块常驻内容是身份层。
-->

---
layout: default
---

# <span style="color: var(--ink-blue)">●</span> L2　常驻身份：profile.md 每次对话第一行
## The always-loaded identity layer

<div class="grid gap-6" style="grid-template-columns: 3fr 2fr;">

<div class="text-base">

一行 `@import`，让个人档案<strong>自动注入每个会话</strong>：

```text
# ~/.claude/CLAUDE.md
@~/research-wiki-personal/profile.md
```

<v-click>

<div class="kami-card mt-2">
档案里是 agent 必须随时知道的"你"：<br>
· 研究方向、正在投的稿子<br>
· 硬规矩：不用 em-dash、物理优先、先跑再想<br>
· 算力清单、合作者权重
</div>

</v-click>

</div>

<div>

<v-click>

<div class="box-idea">
<strong>小而精的常驻上下文，胜过巨大的 RAG dump。</strong><br><br>
身份层是"无条件在场"，不是"问到了才检索"。
</div>

</v-click>

</div>

</div>

<!--
Central message: 用 @import 把小而精的个人档案常驻注入每个会话，等于给 agent 一个你掌控的 system prompt。

讲点：注意它和检索的区别。研究方向、硬规矩、算力，这些每个任务都用得到，不该靠检索碰运气，要钉死在上下文最前面。

Time target: 25:30-27:00
过渡：身份之外，读过的几百篇怎么存？这是 L3，也是整套系统最值钱的一层。
-->

---
layout: default
---

# <span style="color: var(--ink-blue)">●</span> L3　原子笔记 + 受控词表：综述怎么长出来
## Atomic notes and a controlled vocabulary

<div class="grid gap-6" style="grid-template-columns: 3fr 2fr;">

<div>

```text
 raw/paper.pdf
      │ 读一遍，抽要点 + 关键数字
      ▼
 sources/<paper>.md   摘要·数字·tags·出处
      │ 按词表查重，自动追加引用
      ▼
 methods/  systems/  entities/
   每个概念页底部："用到它的论文 (N)"
```

</div>

<div>

```yaml
methods:
  threshold-anomaly:
    canonical: "Threshold anomaly (TA): ..."
    aliases: ["TA", "threshold anomaly",
      "dispersion-relation OMP"]
```

<v-click>

<div class="box-evidence mt-2 text-sm">
<span class="takeaway">关键：</span>受控词表让四种写法解析到<strong>同一页</strong>。先查重再新建，概念不分裂，综述才能累积。这是 RAG 给不了的。
</div>

</v-click>

</div>

</div>

<!--
Central message: 每篇论文被编译进概念页，受控词表保证同一概念归并到一页，使综述随阅读自动累积。

讲点：关键动作是查重加追加。读完一篇讲 CDCC 的论文，去 methods/cdcc.md 底部追加一行。受控词表是综述能不能积累的技术前提，没有它，一个概念会因为五种写法散成五页。

Time target: 27:00-28:30
过渡：这些维护动作谁来做？L4：把方法写成技能。
-->

---
layout: default
---

# <span style="color: var(--ink-blue)">●</span> L4　技能：把 SOP 变成一句话能触发的协议
## Skills are the read/write protocol

<v-clicks>

<div class="grid grid-cols-2 gap-3 mt-2">
<div class="kami-card-accent">
<strong>literature-wiki</strong><br>
读论文 → 写 source 笔记 → 更新概念页 → 标矛盾
</div>
<div class="kami-card-accent">
<strong>research-profile</strong><br>
记 project / paper / idea / failure，刷新 profile
</div>
</div>

<div class="box-idea mt-3">
<strong>协议强制四件事：</strong>统一 schema、每条声明带出处、不用 em-dash、<strong>先查重再新建</strong>。
</div>

<div class="kami-card mt-3" style="border-left: 3px solid var(--ink-blue);">
三类操作：<strong>ingest</strong>（入库）· <strong>query</strong>（提问，好答案归档回库）· <strong>lint</strong>（体检，找矛盾与孤儿页）。
</div>

</v-clicks>

<!--
Central message: 把维护知识库的流程编码成可一句话触发的技能，agent 就按统一规范自动维护。

讲点：这是从 Karpathy 的 schema 文档再往前一步：不只写规则，而是封装成 ingest / query / lint 这类一句话触发的技能。技能本身也是纯文本，在库里，可版本管理、可迭代。

Time target: 28:30-30:00
过渡：最后一层，让系统记住你的脾气：L5 记忆，以及它带来的复利闭环。
-->

---
layout: default
---

# <span style="color: var(--ink-blue)">●</span> L5　记忆 + 闭环：越用越强
## Memory and the compounding loop

<div class="grid gap-6 mt-2" style="grid-template-columns: 2fr 3fr;">

<div class="text-base">

每个纠正 → 一个文件 → `MEMORY.md` 索引<strong>自动加载</strong>。系统不重训模型，却持续对齐你。

</div>

<div>

<div class="grid grid-cols-4 gap-2 text-center text-sm">
<div class="kami-card"><strong>① 读库</strong><br>身份+检索</div>
<div class="kami-card"><strong>② 干活</strong><br>读写画</div>
<div class="kami-card"><strong>③ 写回</strong><br>新笔记/记忆</div>
<div class="kami-card"><strong>④ 更高</strong><br>下次更省力</div>
</div>

<div class="text-center text-xl my-2" style="color: var(--ink-blue);">① → ② → ③ → ④ → ①</div>

</div>

</div>

<v-click>

<div class="box-evidence mt-2">
<span class="takeaway">复利：</span>关键是第三步"写回"。大多数人用 AI 是开环的，问完即走；闭环让每次有价值的交互都沉淀回库，成为下次起点。
</div>

</v-click>

<!--
Central message: 记忆自动加载加上读、干、写回、更高起点的闭环，让 agent 越用越强。

讲点：复利的关键是写回。Karpathy 也强调，好答案应该归档回 wiki，而不是消失在聊天记录里。这样你的探索也在复利。

Time target: 30:00-31:30
过渡：五层拼起来，是这样一张全景。
-->

---
layout: default
---

# <span style="color: var(--ink-blue)">●</span> 全景：原始文件如何变成 agent 的工作记忆
## The full stack, end to end

<div class="grid gap-2 mt-3 text-center">

<div class="kami-card-accent"><strong>AGENT</strong> &nbsp;<span style="color: var(--olive)">读 + 写，干活</span></div>
<div class="text-xl" style="color: var(--ink-blue)">▲ &nbsp; 常驻注入 + 按需检索 &nbsp; ▼ &nbsp; 经 skill 写回</div>
<div class="grid grid-cols-2 gap-2">
<div class="kami-card"><strong>profile + memory</strong><br><span style="color: var(--olive)">L2 + L5　常驻身份与对齐</span></div>
<div class="kami-card"><strong>skills</strong><br><span style="color: var(--olive)">L4　读写协议</span></div>
</div>
<div class="kami-card"><strong>wiki：原子笔记 + 受控词表 + index</strong> &nbsp;<span style="color: var(--olive)">L3　复利综合</span></div>
<div class="kami-card"><strong>raw files</strong>：PDF · 代码 · 数据 &nbsp;<span style="color: var(--olive)">L1　纯文本，git 管版本</span></div>

</div>

<div v-click class="text-center mt-4 text-lg" style="color: var(--ink-blue);">
人在 Obsidian 这侧 curate，agent 在文件这侧读写，git 是共同的真相。
</div>

<!--
Central message: 五层拼成一条从原始文件到 agent 工作记忆的链路，人与 agent 在两侧操作同一份 git 管理的真相。

讲点：从下往上读：原始文件是地基，wiki 编译成概念，profile 和 memory 常驻，skills 是协议，最上面 agent 干活。箭头双向：向下注入检索，向上经技能写回。

Time target: 31:30-33:00
过渡：架构讲完了。那我自己怎么开始带的？比你想的简单。
-->

---
layout: default
---

# <span style="color: var(--ink-blue)">●</span> 怎么起步：五个零件，今晚就能开始
## The minimum viable setup

<div class="grid grid-cols-5 gap-2 mt-4 text-center text-sm">
<div v-click class="kami-card"><strong>① 原始文件</strong><br>PDF · 笔记 · 数据<br><span style="color: var(--olive)">不可变</span></div>
<div v-click class="kami-card"><strong>② Markdown 库</strong><br>纯文本 + 链接<br><span style="color: var(--olive)">agent 写，你读</span></div>
<div v-click class="kami-card"><strong>③ Obsidian</strong><br>人看的图谱<br><span style="color: var(--olive)">浏览、连线</span></div>
<div v-click class="kami-card"><strong>④ 一个 agent</strong><br>Claude Code / Codex<br><span style="color: var(--olive)">读写主力</span></div>
<div v-click class="kami-card"><strong>⑤ 一份 schema</strong><br>CLAUDE.md / 技能<br><span style="color: var(--olive)">怎么维护</span></div>
</div>

<v-click>

<div class="box-evidence mt-5">
<span class="takeaway">起步成本：</span>新建一个文件夹，写一份"培养规则"，从今天读的论文开始一篇篇喂。复利从第一篇就开始。
</div>

</v-click>

<div class="abs-br m-4 text-xs" style="color: var(--stone);">
上手：A. Karpathy "LLM Wiki" (gist) · 我的 literature-wiki / research-profile 技能
</div>

<!--
Central message: 搭一个知识库只需五个零件，起步成本极低，从今天读的第一篇论文就能开始复利。

讲点：别被吓住，最小可行就五样。Karpathy 的 gist 可以直接复制给你的 agent，剩下的它会和你一起长出来。带学生第一天也不用万事俱备，先开始。

Time target: 33:00-34:30
过渡：那日常"带"起来长什么样？
-->

---
layout: default
---

# <span style="color: var(--ink-blue)">●</span> 日常长什么样：读一篇、问一句
## A day with your student: ingest one, ask one

<div class="grid grid-cols-2 gap-4 mt-3 text-sm">

<div>

**读一篇（教他入库）**

```text
你：把这篇加进文献库
agent：
  · 写一页摘要 + 关键数字 + 出处
  · 按词表查重，更新相关概念页
  · 与旧结论比对，标出矛盾
  · 追加一条时间线日志
```

</div>

<div>

**问一句（用他的积累）**

```text
你：我读过的谁在 d+58Ni 上
    和 KD 光学势不一致？
agent：
  · 读索引 + 相关概念页
  · 给出带出处的回答
  · 好答案归档回库，成为新页
```

</div>

</div>

<v-click>

<div class="box-idea mt-4">
<span class="takeaway">闭环：</span>读 → 干活 → 把成果<strong>写回库</strong> → 下次起点更高。和带学生一样，每一次都让下一次更省力。
</div>

</v-click>

<!--
Central message: 日常使用就是教 agent 入库和用它的积累两个动作，加上把好结果写回库。

讲点：用起来非常朴素。读一篇就一句"加进文献库"。关键一步：好回答要归档回库，不要消失在聊天记录里，跟学生写组会纪要一个道理。

Time target: 34:30-36:00
过渡：收个尾。
-->

---
layout: default
---

# <span style="color: var(--ink-blue)">●</span> 总结
## Conclusions

<v-clicks>

1. <span style="color: var(--color-gap)">**为什么需要：**</span> 今天的 agent 当面很聪明，换个会话却要从头交代，聪明但不跨会话积累，长期课题里就不够用。

2. <span style="color: var(--ink-blue)">**怎么办：**</span> 像带研究生一样培养他，读文献、给方向、教方法、纠错、记录；这套培养落到实现，就是纯文本 + 身份 + 笔记 + 技能 + 记忆的五层知识库。

3. <span style="color: var(--color-evidence)">**对科研的帮助：**</span>
   - 综述自动累积 · 开题不重复劳动 · 写作不漏引
   - agent 真正懂你 · 经验永久沉淀、不被锁定

</v-clicks>

<v-click>

<div class="box-evidence mt-5">
<strong>一句话：</strong>个人知识库不是存档，是你<strong>对 agent 的培养</strong>。它让你读过的每一篇、教过的每一次，都变成一个永远不毕业的研究生身上的能力。
</div>

</v-click>

<!--
Central message: 为什么需要、怎么办、对科研有哪些帮助，三句话收束；知识库就是把对 agent 的培养永久沉淀下来。

讲点：回到比喻。agent 像个失忆的天才新生；你要做的是培养他，而不是等一个更聪明的；培养的成果，就是一个会帮你读、想、写、而且永不毕业的研究生。题眼是：知识库就是培养。

Time target: 36:00-37:30
过渡：最后一个小彩蛋。
-->

---
layout: center
class: text-center
---

# 一个小彩蛋 / One last thing

<div class="text-xl max-w-3xl mx-auto leading-relaxed mt-6">

你们刚看的这套 slides，<strong>就是我"带"出来的这个研究生，读我的知识库自动写的</strong>。

<div class="mt-4" style="color: var(--olive);">
This deck was written by the very student I have been training, reading its own knowledge base.
</div>

<div class="box-idea mt-6 text-left">
<strong>所以方法和演示是同一件事。</strong>先开始带你的"学生"，他会复利成长；模型只是随时可换的引擎。从今晚读的第一篇论文开始。
</div>

</div>

<div class="mt-10 text-2xl">谢谢！ / Thank you!</div>

<div class="text-sm mt-2" style="color: var(--olive);">
金磊 · 同济大学 · jinl@tongji.edu.cn
</div>

<!--
Central message: 这套 slides 本身就是被培养出来的 agent 的产物，自我证明了"培养=知识库"的价值；呼吁听众从今天开始带自己的 agent。

结束语："今天这个报告，我没单独准备素材，是我那个一直在带的 agent，读它自己的知识库写出来的。先开始培养你的学生，他会复利，模型只是随时可换的引擎。谢谢大家。"

Time target: 37:30-39:00（留 Q&A）
-->

---
layout: default
---

# Backup: 隐私、安全与可移植

<v-clicks>

- **本地优先**：核心知识库是本地纯文本，不强制上云
- **版本可追溯**：git 记录每次改动，可回滚、可审计
- **分级**：未发表、评审意见放私有库，公开素材另存
- **可移植**：纯 Markdown，不绑平台；换电脑、换 agent 都是一次 `git clone`
- **诚实标注**：浅读条目、单源结论显式标记，防止以讹传讹写进论文

<div class="box-evidence mt-3">
<span class="takeaway">底线：</span>你的知识资产，存在你自己掌控的硬盘和仓库里。
</div>

</v-clicks>

<!--
Backup：回答"上传给 AI 安不安全""会不会被锁定"。本地纯文本加 git 加分级，是相对 SaaS 工具的结构性优势。
-->

---
layout: default
---

# Backup: 多 agent 与跨模型验证

<div class="grid grid-cols-2 gap-4 text-base">

<div>

**工具栈**
- Markdown + git + Obsidian
- Claude Code：主力读写
- 一组自写技能：维护协议
- Codex / GPT：交叉验证

</div>

<div>

<div class="box-idea">
<strong>多 agent 工作流：</strong>Claude 提方案，Codex 交叉检查，我综合。单一模型审过的，标记为"单源"。
</div>

<div class="box-evidence mt-3">
<span class="takeaway">关键：</span>知识库是中立纯文本层，谁来读都行，换 agent 不动数据。
</div>

</div>

</div>

<!--
Backup：回答"具体用什么工具""怎么保证可靠"。知识库与具体 agent 解耦，多个"老师"可以共用同一个"学生"、互相验证。
-->
