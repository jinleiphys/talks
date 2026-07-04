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

### 个人知识库，就是你"带" agent 带出来的东西

<div class="mt-8 text-lg">

**金磊** (Jin Lei)

同济大学物理科学与工程学院

复旦 AI Agent 研讨会 · 2026 年 7 月 4-5 日

</div>

<div class="abs-bl m-6 text-sm" style="color: var(--olive); opacity: 0.8;">
这套 slides，就是我那个"学生"读我的知识库自动写的
</div>

<!--
Central message: 个人知识库不是存档，而是你对 agent 的"培养"沉淀下来的成果；搭知识库等于培养一个好研究生。

开场白：今天换个角度讲个人知识库。在座很多人带过学生，或者正在被导师带。我想说：搭一个给 AI 用的知识库，跟培养一个好研究生，几乎是同一件事。今天分两幕，第一幕讲怎么"带"，第二幕揭开盖子讲这个"学生的脑子"怎么搭。

Time target: 0:00-1:00
过渡：先看看我们手里这个"学生"是什么样的。
-->

---
layout: section
---

# 第一幕　把 agent 当研究生来带
## Act 1: Train your agent like a student

<div style="color: var(--olive);" class="text-lg mt-2">
为什么要带，怎么带，带好了对科研有什么好处
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

今天的 AI agent，就像这么一个新生：

</div>

<v-clicks>

<div class="grid grid-cols-2 gap-3 mt-3 text-base">
<div class="kami-card"><strong>当面交流反应极快</strong>：上百页文献、复杂推理都跟得上</div>
<div class="kami-card"><strong>但换一个对话</strong>，就不认识你的课题组</div>
<div class="kami-card">不记得你做什么方向、读过谁</div>
<div class="kami-card">不记得昨天教过他什么、纠正过什么</div>
</div>

<div class="box-gap mt-4">
<strong>他的记性只撑一次对话。你不写下来，下次他就全忘光。</strong>聪明不等于有用——<strong>攒得住东西</strong>，才算真有用。
</div>

</v-clicks>

<!--
Central message: AI agent 当面交流时反应极快，但换个会话如果没有外部记忆，就不认识你，所以聪明不等于有用，能跨会话积累才有用。

讲点：这正是今天大模型的真相：当面这次交流里它反应极快，上百页都跟得上；可换一个会话，如果没有外部记忆，它对你和你的课题就一无所知。一个这次讨论很聪明、下次又要从头交代背景的学生，你很难把长期课题交给他。今天大多数人用 AI，就是在反复接待这样一个永远的新生。

Time target: 1:00-2:30
过渡：那好导师是怎么把一个新生，带成能独当一面的骨干的？
-->

---
layout: default
---

# <span style="color: var(--ink-blue)">●</span> 培养，不是换一个更聪明的学生
## You don't swap in a smarter student, you train this one

<div class="text-base mt-1">

让学生变有用，靠的不是换一个更聪明的（换模型），而是天天给他<strong>上下文</strong>。这套培养攒下来，就是一个<strong>个人知识库</strong>：

</div>

<div class="mt-3">

| 培养一个好研究生 | 搭一个 agent 知识库 |
|---|---|
| ① 让他读文献，建立领域全景 | 文献库 / 概念页 |
| ② 告诉他方向和你的标准 | 常驻身份层 profile |
| ③ 教他方法，定下标准流程 | 技能 skills |
| ④ 及时反馈，纠错记住 | 记忆 memory |
| ⑤ 让他积累，不重复踩坑 | 失败库 / 想法库 |
| 终点：独当一面、经验可传 | 复利闭环 + 攒下的纯文本家底 |

</div>

<!--
Central message: 让 agent 有用靠的是持续给上下文，这套培养沉淀下来就是知识库；下面五步逐一展开。

讲点：这张表是全场的地图。左边是任何一个好导师都会做的事，右边是它在知识库里对应的零件。接下来五步，每步都先讲"不培养会怎样"，再讲"培养好了对科研有什么用"。第二幕我再把右边这些零件拆开讲实现。

Time target: 2:30-4:30
过渡：第一步，也是最基础的一步：读文献。
-->

---
layout: default
---

<div class="ui-label">第一步 · STEP 1</div>

# <span style="color: var(--color-evidence)">●</span> 让他读文献，建立领域全景
## Make him read until he has a map of the field

<div class="text-base mt-1" style="color: var(--olive)">
好导师都这样干：让学生精读经典、跟踪前沿，脑子里建一张领域地图；再给他办张图书馆借书证。
</div>

<div class="grid gap-5 mt-3" style="grid-template-columns: 3fr 2fr;">

<div>

<v-clicks>

<div class="box-gap">
<strong>不培养：</strong>agent 靠 RAG 现查，每次提问从 PDF 里现翻，读完就忘，给你的是一地碎片，拼不出全景。
</div>

<div class="box-evidence mt-3">
<strong>培养好：</strong>每读一篇，就把它写进对应的概念页。三年下来，每个方法 / 体系页，都是一篇<strong>自动长出来的小综述</strong>。
</div>

<div class="kami-card mt-3" style="border-left: 3px solid var(--ink-blue);">
<strong>再办张借书证：</strong>读过的进 wiki 是他的本事；<strong>没读过</strong>的，让他去全领域语料（~6.2 万篇 nucl-th 全文）里查，投稿前扫一遍漏引。
</div>

<div class="box-idea mt-3">
<span class="takeaway">科研收益：</span>"谁做过 X""我读过的谁和谁矛盾"答案早就攒好了；<strong>写作不漏引</strong>，连没读过、该引的也兜得住。
</div>

</v-clicks>

</div>

<div>

```text
# methods/threshold-anomaly.md
阈异常 (TA)：重离子光学势在
库仑位垒附近的局域能量依赖…

## 用到它的论文 (12)
- [1987] Satchler, NPA 472
- [1991] Satchler, Phys. Rep. 199
- [2011] Deshmukh, EPJA 47
- …每读一篇，自动追加一行
```

<div class="fig-caption">一个真实概念页：12 篇文献自动汇成一页小综述</div>

</div>

</div>

<div class="mt-2 text-center">
<span class="tag">571 篇精读</span> &nbsp; <span class="tag">365 实体页</span> &nbsp; <span class="tag">195 方法页</span> &nbsp; <span class="tag">6.2万篇全文可查</span> &nbsp; <a href="graph.html" target="_blank" class="tag" style="border-bottom: none;">点开看图谱 ↗ 1425 节点 · 6432 链接</a>
</div>

<!--
Central message: 像要求学生建立领域地图一样，知识库把每篇论文写进概念页，使领域综述随阅读自动累积；再加一张"借书证"——全领域全文语料——补上没读过、该引的。

讲点：571 篇精读不是躺在 571 个 PDF 里，而是沉淀成 365 个实体页、195 个方法页。我真有一个 debates 页记着 post-prior 那个三十年的争论。好学生和复读机的区别：好学生读完会更新他的领域认知，RAG 读完什么都没留下。读文献还有另一半：培养沉淀的是"他读过的"，可写作不漏引还得管"他没读过、但该引的"。所以我还给他办了张图书馆借书证——一层本地全领域全文语料（~6.2 万篇 nucl-th arXiv），投稿前拿关键词、方法名去全领域扫一遍漏引。读过的是他的本事，没读过的是书库的存货，两样都要。（细节：三层栈见 backup。）

现场演示：点"点开看图谱"那个链接，新标签页打开真实的 wiki 关系图谱（1301 节点 · 5814 链接），可以搜索、拖拽、点节点看摘要，给大家看这个"学生的脑子"长什么样，看完关掉标签页回到 slides。

Time target: 4:30-7:00（含现场点开图谱）
过渡：光会读还不够，他得知道往哪读、按什么标准判断好坏。第二步。
-->

---
layout: default
---

<div class="ui-label">第二步 · STEP 2</div>

# <span style="color: var(--color-evidence)">●</span> 告诉他方向和你的标准
## Give him direction and your taste

<div class="text-base mt-1" style="color: var(--olive)">
好导师都这样干：让学生清楚课题组在做什么、好的工作长什么样、规矩在哪。
</div>

<div class="grid gap-5 mt-3" style="grid-template-columns: 3fr 2fr;">

<div>

<v-clicks>

<div class="box-gap">
<strong>不培养：</strong>每次对话都得从头讲一遍背景，agent 给的全是大路货建议，抓不住你真正在意什么。
</div>

<div class="box-evidence mt-3">
<strong>培养好：</strong>一份个人档案<strong>每次对话自动带上</strong>：你的研究方向、硬规矩、有哪些机器和代码、合作者的分量。
</div>

<div class="box-idea mt-3">
<span class="takeaway">科研收益：</span>开口就<strong>进入工作状态</strong>，按你的标准和品味干活，不用每次都从头教。
</div>

</v-clicks>

</div>

<div>

```text
# profile.md（每个会话自动加载）
方向: 核反应理论
  CDCC · 光学势 · 三体 · ML
硬规矩: 物理优先 · 先跑再想 ·
  不用 em-dash · 画图必须走 skill
算力: heliumx 2×5090 ·
  alpha 集群 16×3090 · BSCC
合作者: Moro (博导) · Ren (组长)
  二位的意见加权
```

<div class="fig-caption">真实档案摘录：agent 开口之前就知道这些</div>

</div>

</div>

<!--
Central message: 像让学生理解课题组方向和标准一样，常驻身份层把你的方向、规矩、资源每次对话自动带上。

讲点：一个好学生值钱，不只在于他会的多，更在于他知道"我们组在乎什么、什么算好工作"。这份品味，对 agent 就是一份常驻的个人档案，每次对话第一行就加载。

Time target: 7:00-9:00
过渡：知道方向了，还得会干活的方法。第三步：教他方法、定下标准流程。
-->

---
layout: default
---

<div class="ui-label">第三步 · STEP 3</div>

# <span style="color: var(--color-evidence)">●</span> 教他方法，定下标准流程
## Teach the method, write the procedure

<div class="text-base mt-1" style="color: var(--olive)">
好导师都这样干：教学生科学的方法——怎么读、怎么复现、怎么写——形成一套可复用的流程。
</div>

<v-clicks>

<div class="box-gap mt-3">
<strong>不培养：</strong>每次让 agent 干活都得从头交代步骤，干成什么样全凭它即兴发挥，时好时坏。
</div>

<div class="box-evidence mt-3">
<strong>培养好：</strong>把"怎么做"写成可复用的<strong>技能（skill）</strong>：读一篇论文怎么入库、记一个项目怎么归档，连引用格式、查重、出处都规定死。一句话触发，按固定流程执行。
</div>

<div class="box-idea mt-3">
<span class="takeaway">科研收益：</span>agent <strong>自己按流程维护知识库</strong>，你只管把关和提问，脏活它全包了。
</div>

</v-clicks>

<!--
Central message: 像给学生定标准流程一样，技能把维护知识库的流程写成可复用的规范。

讲点：好导师不是每个任务都手把手，而是教会一套方法，学生以后自己照着做。技能就是这套方法的文本化，它本身也是纯文本，存在库里，可以版本管理、不断迭代，就像实验室的操作规程文档。

Time target: 9:00-10:30
过渡：再好的学生也会犯错，关键看犯错之后。第四步。
-->

---
layout: default
---

<div class="ui-label">第四步 · STEP 4</div>

# <span style="color: var(--color-evidence)">●</span> 及时反馈，纠错，让他记住
## Correct him once, and he never forgets

<div class="text-base mt-1" style="color: var(--olive)">
好导师都这样干：给具体反馈，指出问题，学生改了以后记住，下回不再犯。
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
<span class="takeaway">科研收益：</span>agent 越用越像你，<strong>不用重训模型</strong>，这份默契谁也拿不走。
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

Time target: 10:30-12:30
过渡：第五步，是好学生和普通学生最大的分水岭：会不会积累。
-->

---
layout: default
---

<div class="ui-label">第五步 · STEP 5</div>

# <span style="color: var(--color-evidence)">●</span> 让他积累，不重复踩坑
## Keep a lab notebook, never fall into the same pit twice

<div class="text-base mt-1" style="color: var(--olive)">
好导师都这样干：让学生记实验记录、记下走不通的路、管好时间线。
</div>

<v-clicks>

<div class="box-gap mt-3">
<strong>不培养：</strong>开题容易撞墙，做了一半发现别人早做过，或者重新捡起一个你半年前就否决过的想法。
</div>

<div class="grid gap-4 mt-3" style="grid-template-columns: 2fr 3fr;">

<div class="flex flex-col gap-2 text-sm text-center">
<div class="kami-card"><strong>失败库</strong> <code>failures/</code><br>走不通的路，登记在案</div>
<div class="kami-card"><strong>想法库</strong> <code>ideas/killed</code><br>已否决的，不再捡回</div>
<div class="kami-card"><strong>时间线</strong> <code>log.md</code><br>什么时候做过什么</div>
</div>

<div>

```text
# ideas/killed/2body-bilnn-hmc.md
status: killed (2026-05-27)
想法: BiLNN + HMC，"水"一篇
  全局光学势的贝叶斯后验
为何毙: 二体正问题毫秒级就解完,
  "贵到必须用模拟器"不成立;
  KDUQ / ELM 已经做过
复活条件: 自由形式 O(100) 参数
  的非参数化光学势
```

<div class="fig-caption">一条真实的已毙想法：连复活条件都登记好了</div>

</div>

</div>

<div class="box-idea mt-3">
<span class="takeaway">科研收益：</span>每次开新题，都站在你<strong>全部历史判断</strong>之上，agent 提方案前先读这些，不让你撞同一堵墙。
</div>

</v-clicks>

<!--
Central message: 像要求学生记录失败和节点一样，失败库、想法库和时间线让每次开题都建立在全部历史判断上。

讲点：科研里最浪费的就是重复踩坑、重复想已经否决的点子。failures 和 ideas/killed 这两栏，是防止你和 AI 一起兴冲冲走回头路的安全带。

Time target: 12:30-14:30
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
<strong>独当一面：</strong>读完就干 → 干完写回库 → 下次起点更高。带得越久越省力，还能帮你起草论文，你读过的相关文献<strong>一篇不漏</strong>。
</div>

<div class="box-gap mt-3">
<strong>但真的研究生会毕业，把经验带走。</strong>三年心血，人一走，课题组又从头带新人。
</div>

<div class="box-idea mt-3">
<span class="takeaway">知识库不会走：</span>它是<strong>本地纯文本 + git</strong>，换电脑、换 agent、换模型都只是一次 <code>git clone</code>。你培养的，是一个<strong>永远不毕业、经验永久沉淀</strong>的研究生。
</div>

<div class="text-center mt-3 text-lg" style="color: var(--ink-blue)">
模型说换就换；<strong>知识库是你攒下的家底，跟你一辈子</strong>。
</div>

</v-clicks>

<!--
Central message: 培养好的 agent 能独当一面并帮你写作不漏引，而且不像真学生会毕业带走经验，知识库是永久沉淀、不被锁定的长期资产。

讲点：这是比喻最有力的一击。带学生最心酸的是好不容易带出来，毕业走了，你又从零带新人。知识库把这件事永久解决了：它是纯文本加 git，一个永远不毕业的学生。

Time target: 14:30-16:00
过渡：空口无凭。先看一个最简单的对比：同一个问题，培养前后差多少。
-->

---
layout: default
---

<div class="ui-label">培养前后 · BEFORE / AFTER</div>

# <span style="color: var(--color-evidence)">●</span> 同一个问题，培养前 vs 培养后
## Same model, with and without the training

<div class="kami-card mt-3 text-base">
<strong>问：</strong>"我读过的文献里，谁的结果和 KD 全局光学势对不上？"
</div>

<div class="grid grid-cols-2 gap-4 mt-3 text-sm">

<div v-click class="box-gap">
<strong>培养前（裸模型）：</strong>不知道你读过什么，只能给教科书式综述："KD 是广泛使用的全局核子光学势，总体表现良好……"再追问具体文献，一本正经编引用的风险就上来了。
</div>

<div v-click class="box-evidence">
<strong>培养后（带知识库）：</strong>先翻索引和概念页，回答带出处："你 5 月入库的 DREAM 校准：d+⁵⁸Ni 数据要求氘核表面吸收比 KD 高约 36% → <code>sources/2026-dream…</code>"；库里没有的，明说没读过。
</div>

</div>

<v-click>

<div class="box-idea mt-4">
<span class="takeaway">注意：</span>两边是<strong>同一个模型</strong>。差别全在上下文，而上下文就是那五步培养攒下来的。
</div>

</v-click>

<!--
Central message: 同一个模型，带不带知识库的回答天差地别，证明价值在培养攒下的上下文，不在模型本身。

讲点：左边不是贬低模型，它说的都对，但都是教科书，跟"我"无关，而且追问引用容易编。右边的回答来自我库里真实的一条：DREAM 贝叶斯校准发现 d+58Ni 数据要求氘核表面吸收比 KD 高约 36%，出处直接指向 source 笔记。重音：模型相同，差别全在上下文。

Time target: 16:00-17:30
过渡：对比看完了，再看一个实战成品：一句话指令，他交回来一篇 58 页综述初稿，而且引用逐条可审计，不是普通 deep research。
-->

---
layout: default
---

<div class="ui-label">实战演示 · ONE PROMPT</div>

# <span style="color: var(--color-evidence)">●</span> 一句话指令，交回一篇 58 页综述初稿
## One prompt in, a 58-page review draft out

<div class="kami-card mt-2 text-sm">
<strong>指令就一句：</strong>"写一篇三体核反应的综述。" 它<strong>先翻我的文献库</strong>定论点、定该引谁，再补检索、逐条在线核实 BibTeX，最后成文。
</div>

<div class="review-wall mt-2" style="display:grid; grid-template-columns:repeat(15,1fr); gap:3px;">
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
<img src="./figures/review-pages/p-15.png" class="review-thumb" />
<img src="./figures/review-pages/p-16.png" class="review-thumb" />
<img src="./figures/review-pages/p-17.png" class="review-thumb" />
<img src="./figures/review-pages/p-18.png" class="review-thumb" />
<img src="./figures/review-pages/p-19.png" class="review-thumb" />
<img src="./figures/review-pages/p-20.png" class="review-thumb" />
<img src="./figures/review-pages/p-21.png" class="review-thumb" />
<img src="./figures/review-pages/p-22.png" class="review-thumb" />
<img src="./figures/review-pages/p-23.png" class="review-thumb" />
<img src="./figures/review-pages/p-24.png" class="review-thumb" />
<img src="./figures/review-pages/p-25.png" class="review-thumb" />
<img src="./figures/review-pages/p-26.png" class="review-thumb" />
<img src="./figures/review-pages/p-27.png" class="review-thumb" />
<img src="./figures/review-pages/p-28.png" class="review-thumb" />
<img src="./figures/review-pages/p-29.png" class="review-thumb" />
<img src="./figures/review-pages/p-30.png" class="review-thumb" />
<img src="./figures/review-pages/p-31.png" class="review-thumb" />
<img src="./figures/review-pages/p-32.png" class="review-thumb" />
<img src="./figures/review-pages/p-33.png" class="review-thumb" />
<img src="./figures/review-pages/p-34.png" class="review-thumb" />
<img src="./figures/review-pages/p-35.png" class="review-thumb" />
<img src="./figures/review-pages/p-36.png" class="review-thumb" />
<img src="./figures/review-pages/p-37.png" class="review-thumb" />
<img src="./figures/review-pages/p-38.png" class="review-thumb" />
<img src="./figures/review-pages/p-39.png" class="review-thumb" />
<img src="./figures/review-pages/p-40.png" class="review-thumb" />
<img src="./figures/review-pages/p-41.png" class="review-thumb" />
<img src="./figures/review-pages/p-42.png" class="review-thumb" />
<img src="./figures/review-pages/p-43.png" class="review-thumb" />
<img src="./figures/review-pages/p-44.png" class="review-thumb" />
<img src="./figures/review-pages/p-45.png" class="review-thumb" />
<img src="./figures/review-pages/p-46.png" class="review-thumb" />
<img src="./figures/review-pages/p-47.png" class="review-thumb" />
<img src="./figures/review-pages/p-48.png" class="review-thumb" />
<img src="./figures/review-pages/p-49.png" class="review-thumb" />
<img src="./figures/review-pages/p-50.png" class="review-thumb" />
<img src="./figures/review-pages/p-51.png" class="review-thumb" />
<img src="./figures/review-pages/p-52.png" class="review-thumb" />
<img src="./figures/review-pages/p-53.png" class="review-thumb" />
<img src="./figures/review-pages/p-54.png" class="review-thumb" />
<img src="./figures/review-pages/p-55.png" class="review-thumb" />
<img src="./figures/review-pages/p-56.png" class="review-thumb" />
<img src="./figures/review-pages/p-57.png" class="review-thumb" />
<img src="./figures/review-pages/p-58.png" class="review-thumb" />
</div>

<div class="fig-caption mt-2">三体核反应综述初稿，58 页 · 199 篇参考文献 · <a href="./threebody-review.pdf" target="_blank">打开完整 PDF</a></div>

<v-click>

<div class="box-evidence mt-3">
<span class="takeaway">这不是普通的 deep research：</span>普通 deep research 全网抓取，引用常常"看着对"却是编的、没出处。这一篇 <strong>199 条引用里 181 条挂着我读过的 wiki 源</strong>（每条一个 wiki-id + 在线核实过的 DOI）；<strong>我没读过的 18 条不藏</strong>，全拎进一份"待精读清单"让我去补；全程留一份 <code>citations-ledger</code>，哪条来自我读的、哪条外部补的、有没有核实，逐条可审计。
</div>

</v-click>

<!--
Central message: 一句话指令，培养好的 agent 先查文献库再成文，交回一篇 58 页、引用逐条可审计的综述初稿；跟普通 GPT deep research 的差别就在这份出处台账。

讲点：这是真实产出，不是摆拍，58 页直接铺出来给大家看个规模。它的动作顺序：先翻我的文献库，把该引的、我读过的列出来，再补检索、逐条在线核实 BibTeX，最后成文。这一页的题眼是跟普通 deep research 的区别：deep research 全网抓，引用经常一本正经编、没出处；我这套 199 条引用里 181 条直接挂着我 wiki 里精读过的源，每条一个 wiki-id、DOI 在线核过；剩下我没读过的 18 条不藏着，自动拎成一份"待精读清单"逼我去补；而且全程留一份 citations-ledger，哪条来自我读的、哪条外部补的、核没核实，逐条可查。这就是个人知识库相对裸用大模型最大的差别：可追溯、可审计。当然这是初稿，物理判断和润色还得我自己来。现场想细看，可以点"打开完整 PDF"。

Time target: 17:30-18:30
过渡：第一幕到这里。很多人会好奇，这个"学生的脑子"到底怎么搭的？第二幕揭开盖子。
-->

---
layout: section
---

# 第二幕　揭开盖子
## Act 2: Under the hood

<div style="color: var(--olive);" class="text-lg mt-2">
刚才讲的是"怎么带"，现在说说这个"学生的脑子"怎么搭的
</div>

<!--
过渡：第二幕给想动手的人，讲底层范式和五层架构的实现。
-->

---
layout: default
---

# <span style="color: var(--ink-blue)">●</span> 核心思路：不是检索，是养一个 wiki
## From RAG to a compounding wiki

<div class="text-base mt-2">

别等提问了才去原始文档里现翻。让 LLM <strong>一篇一篇建、长期维护一个 wiki</strong>，垫在你和原始资料之间。

</div>

<v-clicks>

<div class="grid grid-cols-3 gap-3 mt-3 text-center text-sm">
<div class="kami-card"><strong>raw sources</strong><br>原始资料，只读不改<br><span style="color: var(--olive)">一切以它为准</span></div>
<div class="kami-card"><strong>the wiki</strong><br>LLM 负责写和维护<br><span style="color: var(--olive)">互相链接的笔记</span></div>
<div class="kami-card"><strong>schema</strong><br>告诉 LLM 怎么维护<br><span style="color: var(--olive)">CLAUDE.md</span></div>
</div>

<div class="kami-card-accent mt-4">
知识<strong>只整理一次，往后持续更新</strong>，不必每次提问都从头推一遍。 &nbsp;<span style="color: var(--olive)">你负责找料、提问，脏活累活全归 LLM。</span>
</div>

<div class="box-evidence mt-3">
<span class="takeaway">一句话：</span>Obsidian 是 IDE，LLM 是程序员，<strong>wiki 是代码库</strong>。
</div>

</v-clicks>

<div class="abs-br m-4 text-xs" style="color: var(--stone);">
A. Karpathy, "LLM Wiki" (gist, 2026)
</div>

<!--
Central message: 用一个持久、可增量维护、能复利的 wiki 取代无状态 RAG，这是整套系统的基本想法。

讲点：诚实交代思想来源。核心区别就一句：RAG 是查询时才检索，wiki 是整理一次、持续更新。这个范式 Karpathy 在他的 LLM Wiki gist 里讲得很清楚，我在他基础上做成了一个科研系统。

Time target: 18:45-20:00
过渡：那这个 wiki，针对科研我拆成了五层，正好对应第一幕的五步。
-->

---
layout: default
---

# <span style="color: var(--ink-blue)">●</span> 培养的五步，拆开来看就是五层
## The five training steps become five layers

<div class="grid gap-2 mt-3">

<div v-click class="kami-card-accent"><span class="tag">L5</span> &nbsp;<strong>记忆 memory</strong> &nbsp;<span style="color: var(--olive)">对应第四步 · 反馈纠错</span></div>
<div v-click class="kami-card-accent"><span class="tag">L4</span> &nbsp;<strong>技能 skills（读写规矩）</strong> &nbsp;<span style="color: var(--olive)">对应第三步 · 标准流程</span></div>
<div v-click class="kami-card-accent"><span class="tag">L3</span> &nbsp;<strong>概念笔记 + 统一词表</strong> &nbsp;<span style="color: var(--olive)">对应第一步读文献 + 第五步积累</span></div>
<div v-click class="kami-card-accent"><span class="tag">L2</span> &nbsp;<strong>常驻身份层 profile</strong> &nbsp;<span style="color: var(--olive)">对应第二步 · 方向与标准</span></div>
<div v-click class="kami-card-accent"><span class="tag">L1</span> &nbsp;<strong>纯文本 + 链接</strong> &nbsp;<span style="color: var(--olive)">所有东西的壳子，人和 agent 共享</span></div>

</div>

<div v-click class="mt-3 text-center">
<span class="tag">1425 文献笔记</span> &nbsp; <span class="tag">571 篇精读</span> &nbsp; <span class="tag">97 篇个人档案</span> &nbsp; <span class="tag">38 位合作者</span>
</div>

<v-click>

<div class="box-evidence mt-3">
<span class="takeaway">概括出来就是一组 skill：</span>五层全是纯文本，怎么建、怎么维护的规矩写成了 skills，<strong>已开源</strong>，clone 下来就能开始带你自己的"学生"。&nbsp;<a href="https://github.com/jinleiphys/research_LLM_wiki" target="_blank" style="color: var(--ink-blue);">github.com/jinleiphys/research_LLM_wiki</a>
</div>

</v-click>

<!--
Central message: 第一幕的五个培养步骤，在实现上就是知识库的五层架构；这一整套已封装成开源 skills，拿去就能用。

讲点：这是第二幕的全部架构，一页讲完。左边层号，右边标着它实现第一幕的哪一步；底部数字是我两个 wiki 的真实规模。重点在最后一击：这五层没有任何黑科技，全是纯文本，维护规矩封装成了 skills，已经开源。每一层的实现细节（为什么纯文本、词表怎么防概念分裂、记忆怎么加载）都在 backup，Q&A 被问到再翻。

Time target: 20:00-21:15
过渡：想动手的话，最小起步长什么样？五个零件。
-->

---
layout: default
---

# <span style="color: var(--ink-blue)">●</span> 怎么起步：五个零件，今晚就能开始
## The minimum viable setup

<div class="grid grid-cols-5 gap-2 mt-4 text-center text-sm">
<div v-click class="kami-card"><strong>① 原始文件</strong><br>PDF · 笔记 · 数据<br><span style="color: var(--olive)">只存不改</span></div>
<div v-click class="kami-card"><strong>② Markdown 库</strong><br>纯文本 + 链接<br><span style="color: var(--olive)">agent 写，你读</span></div>
<div v-click class="kami-card"><strong>③ Obsidian</strong><br>人看的图谱<br><span style="color: var(--olive)">浏览、连线</span></div>
<div v-click class="kami-card"><strong>④ 一个 agent</strong><br>Claude Code / Codex<br><span style="color: var(--olive)">读写主力</span></div>
<div v-click class="kami-card"><strong>⑤ 一份 schema</strong><br>CLAUDE.md / 技能<br><span style="color: var(--olive)">怎么维护</span></div>
</div>

<v-click>

<div class="box-evidence mt-5">
<span class="takeaway">起步成本：</span>新建一个文件夹，写一份"培养规则"，从今天读的论文开始一篇篇喂。复利从第一篇就开始了。
</div>

</v-click>

<div class="abs-br m-4 text-xs" style="color: var(--stone);">
上手：A. Karpathy "LLM Wiki" (gist) · 我的技能已开源 <a href="https://github.com/jinleiphys/research_LLM_wiki" target="_blank" style="color: var(--ink-blue);">github.com/jinleiphys/research_LLM_wiki</a>
</div>

<!--
Central message: 搭一个知识库只需五个零件，起步成本极低，从今天读的第一篇论文就能开始复利。

讲点：别被吓住，最小可行就五样。Karpathy 的 gist 可以直接复制给你的 agent，剩下的它会和你一起长出来。带学生第一天也不用万事俱备，先开始。

Time target: 21:15-22:15
过渡：好处讲完了，丑话也要说在前面。
-->

---
layout: default
---

# <span style="color: var(--color-gap); font-size: 1.05em;">丑话说在前面：这个学生也有毛病</span>
## Honest limitations

<v-clicks>

<div class="grid grid-cols-2 gap-3 mt-3 text-sm">
<div class="kami-card"><strong>摘要会丢细节：</strong>浅读条目就剩个元数据，我库里真有一批标着 "no summary available"。关键论文还得自己精读，浅读的必须老老实实标出来。</div>
<div class="kami-card"><strong>概念会分裂：</strong>词表拦不住所有别名，同一概念会散成几页。得定期 lint：找矛盾、并孤页、补断链。</div>
<div class="kami-card"><strong>维护有成本：</strong>每篇入库几分钟、每月做一次体检。复利的前提是持续喂，断粮它就停长了。</div>
<div class="kami-card"><strong>单源会犯错：</strong>一个模型写进库的结论标"单源"，要紧的换另一个模型交叉验证过再用。</div>
</div>

<div class="box-evidence mt-4">
<span class="takeaway">底线：</span>它不是魔法，是个需要管理的学生。但管理的成本，远低于他干活的收益。
</div>

</v-clicks>

<!--
Central message: 主动交代四个真实局限（浅读丢细节、概念分裂、维护成本、单源错误），知识库是需要管理的系统而非魔法。

讲点：在座懂行的人多，这些坑与其被问出来不如自己讲。每条都是我真踩过的："no summary available" 那批条目现在还在库里；概念分裂靠 lint 收拾；单源标记是我跨模型工作流的硬规矩。落点还是那句：像管学生，不像用魔法。

Time target: 22:15-23:15
过渡：毛病交代完了，最后说一句:这么用,期刊认吗?
-->

---
layout: default
---

# <span style="color: var(--ink-blue)">●</span> 这么用，期刊认吗？APS 刚给了答案
## APS 期刊 AI 新政　·　2026 年 6 月 17 日

<v-clicks>

<div class="box-idea mt-2 text-sm">
<span class="takeaway">转向：</span>旧政策只许 AI 做"润色、精简、轻度编辑"；<strong>新政策允许实质性使用</strong>——文献综合、数据分析、科学推理、图表生成、代码、翻译——<strong>条件是披露</strong>。
</div>

<div class="grid grid-cols-2 gap-3 mt-3 text-sm">

<div class="kami-card-accent">
<strong style="color: var(--ink-blue)">作者（Authors）</strong>
<ul class="mt-1" style="line-height:1.5">
<li>AI 不能当作者；准确性、责任<strong>全在人</strong></li>
<li>实质性使用须披露：<strong>工具名 + 版本、如何协助、如何指导与核验</strong></li>
<li>图表由 AI 生成 → 在图注里说明并自验</li>
<li>纯语言润色不必披露</li>
</ul>
</div>

<div class="kami-card-accent">
<strong style="color: var(--color-evidence)">审稿人（Reviewers）</strong>
<ul class="mt-1" style="line-height:1.5">
<li>可用 AI 理顺思路、改语气、翻译</li>
<li><strong>禁止把稿件/报告上传到不受限的 AI 工具</strong>（保密：作者未同意未发表工作进训练集）</li>
<li>超出轻度编辑须在给编辑的note里披露</li>
</ul>
</div>

</div>

<div class="box-evidence mt-3 text-sm">
<span class="takeaway">落点：</span>把 AI 当研究生带、攒个人知识库，正好踩在新政策的三条线内——<strong>人负责、要披露、护保密</strong>。这不是灰色地带，是被官方写进规范的做法。
</div>

</v-clicks>

<!--
Central message: 用 APS 2026-06-17 新政为整套"培养 agent"工作流背书——实质性使用被明确允许，边界是披露+问责+保密，正好对上前面讲的用 agent 做研究。

讲点：这是最近的新闻，时间点正好。旧政策只让 AI 润色，新政策放开到文献综合、数据分析、推理、图表、代码、翻译，前提是披露三件事：工具名版本、怎么帮的、怎么核验的。作者侧：AI 不能署名、责任全在人；审稿侧最硬的一条——不能把别人未发表的稿子喂给不受限的 AI，这是保密红线，跨模型验证时我自己也守这条。结论：把 agent 当研究生用、投 PRC/PRL，这条路是被写进规范的，不是钻空子。

Time target: 23:15-24:00
过渡：规范有了，收个尾。
-->

---
layout: default
---

# <span style="color: var(--ink-blue)">●</span> 总结
## Conclusions

<v-clicks>

1. <span style="color: var(--color-gap)">**为什么需要：**</span> 今天的 agent 当面很聪明，换个对话就全忘了；攒不下东西，长期课题里指望不上。

2. <span style="color: var(--ink-blue)">**怎么办：**</span> 像带研究生一样培养他——读文献、给方向、教方法、纠错、记录。这套培养拆开来看，就是纯文本 + 身份 + 笔记 + 技能 + 记忆的五层知识库。

3. <span style="color: var(--color-evidence)">**对科研的帮助：**</span>
   - 综述自动累积 · 开题不重复劳动 · 写作不漏引
   - agent 真正懂你 · 经验永久沉淀、带得走

</v-clicks>

<v-click>

<div class="box-evidence mt-5">
<strong>一句话：</strong>个人知识库不是存档，是你<strong>对 agent 的培养</strong>。你读过的每一篇、教过的每一次，都长在一个永远不毕业的研究生身上。
</div>

</v-click>

<!--
Central message: 为什么需要、怎么办、对科研有哪些帮助，三句话收束；知识库就是把对 agent 的培养永久沉淀下来。

讲点：回到比喻。agent 像个失忆的天才新生；你要做的是培养他，而不是等一个更聪明的；培养的成果，就是一个会帮你读、想、写、而且永不毕业的研究生。题眼是：知识库就是培养。

Time target: 24:00-24:30
过渡：最后一个小彩蛋。
-->

---
layout: center
class: text-center
---

# 一个小彩蛋 / One last thing

<div class="text-xl max-w-3xl mx-auto leading-relaxed mt-4">

你们刚看的这套 slides，<strong>就是我"带"出来的这个研究生，读我的知识库自动写的</strong>。

<div class="mt-3 text-left mx-auto" style="max-width: 36rem;">

```text
指令就一句（大意）：给复旦 AI Agent 研讨会做一套 slides，
讲个人知识库，用"把 agent 培养成研究生"打比方，素材从我的 wiki 取。
```

</div>

<div class="box-idea mt-4 text-left">
<strong>所以方法和演示是同一回事。</strong>先开始带你的"学生"，他会复利成长；模型只是随时可换的引擎。从今晚读的第一篇论文开始。
</div>

</div>

<div class="box-evidence mt-4 text-left mx-auto" style="max-width: 40rem;">
📖 <strong>《AI 辅助数理建模与应用实践》</strong>（写给本科生的 vibe coding 实践讲义）<span style="color: var(--olive);">，2027 年暑期开课</span>。讲义 PDF：<a href="./vibe-coding-jiangyi.pdf" target="_blank" style="color: var(--ink-blue);">点此打开</a>。
</div>

<div class="flex justify-center gap-10 mt-5">
<div class="text-center">
<img src="./figures/qr-gist.png" style="width: 5.2rem; margin: 0 auto;" />
<div class="text-xs mt-1" style="color: var(--olive);">Karpathy "LLM Wiki" gist</div>
</div>
<div class="text-center">
<img src="./figures/qr-repo.png" style="width: 5.2rem; margin: 0 auto;" />
<div class="text-xs mt-1" style="color: var(--olive);">我的技能已开源<br>research_LLM_wiki</div>
</div>
<div class="text-center">
<img src="./figures/qr-talk.png" style="width: 5.2rem; margin: 0 auto;" />
<div class="text-xs mt-1" style="color: var(--olive);">这套 slides + 互动图谱</div>
</div>
</div>

<div class="mt-5 text-2xl">谢谢！ / Thank you!</div>

<div class="text-sm mt-2" style="color: var(--olive);">
金磊 · 同济大学 · jinl@tongji.edu.cn
</div>

<!--
Central message: 这套 slides 本身就是被培养出来的 agent 的产物，自我证明了"培养=知识库"的价值；呼吁听众从今天开始带自己的 agent。

结束语："今天这个报告，我没单独准备素材，是我那个一直在带的 agent，读它自己的知识库写出来的。先开始培养你的学生，他会复利，模型只是随时可换的引擎。谢谢大家。"

Time target: 24:30-25:00（之后 Q&A 5 分钟，backup 有 10 页兜底）
-->

---
layout: default
---

# Backup: 隐私、安全与可移植

<v-clicks>

- **本地优先**：核心知识库是本地纯文本，不上云
- **版本可追溯**：git 记录每次改动，可回滚、可审计
- **分级**：未发表、评审意见放私有库，公开素材单独存
- **可移植**：纯 Markdown，不绑平台；换电脑、换 agent 都是一次 `git clone`
- **诚实标注**：浅读条目、单源结论显式标记，防止以讹传讹写进论文

<div class="box-evidence mt-3">
<span class="takeaway">底线：</span>你的东西，存在你自己管的硬盘和仓库里。
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
- 一组自写技能：维护规范
- Codex / GPT：交叉验证

</div>

<div>

<div class="box-idea">
<strong>多 agent 工作流：</strong>Claude 提方案，Codex 交叉检查，我综合。单一模型审过的，标记为"单源"。
</div>

<div class="box-evidence mt-3">
<span class="takeaway">关键：</span>知识库就是一堆纯文本，谁来读都行，换 agent 不动数据。
</div>

</div>

</div>

<!--
Backup：回答"具体用什么工具""怎么保证可靠"。知识库与具体 agent 解耦，多个"老师"可以共用同一个"学生"、互相验证。
-->

---
layout: default
---

# Backup: 只靠读过的几百篇，会不会漏引？

<div class="text-base mt-1" style="color: var(--olive)">
wiki 只知道你读过的（571 篇）。该引、但你没读过的怎么办？
</div>

<div class="grid gap-6 mt-3" style="grid-template-columns: 3fr 2fr;">

<div>

<v-clicks>

<div class="box-gap">
<strong>缺口：</strong>"一篇不漏"只覆盖读过的。真正危险的是<strong>你根本没读、却该引</strong>的那篇。
</div>

<div class="box-evidence mt-3">
<strong>兜底：</strong>再垫一层<strong>本地全文语料</strong>（~6.2 万篇 nucl-th arXiv 全文，离线、按篇零 token 机械构建）。投稿前拿稿子里的关键词、方法名去全领域<strong>词法扫一遍漏引</strong>，不只扫读过的。
</div>

<div class="box-idea mt-3">
<span class="takeaway">本地扫不到 ≠ 没人做过：</span>语料只有 nucl-th、只按字面匹配，命中"存在"、落空要升级到在线检索再下结论。
</div>

</v-clicks>

</div>

<div>

<v-click>

<div class="kami-card">
<strong>文献三层栈</strong>
<div class="mt-2 text-sm" style="line-height:1.8">
① <strong>发现</strong>　在线<br>
&nbsp;&nbsp;<span style="color: var(--olive)">INSPIRE / arXiv，全世界</span><br>
② <strong>全文语料</strong>　本地<br>
&nbsp;&nbsp;<span style="color: var(--olive)">~6.2 万篇，穷尽、可 grep</span><br>
③ <strong>综合</strong>　读过的<br>
&nbsp;&nbsp;<span style="color: var(--olive)">wiki，几百篇，已消化</span>
</div>
</div>

<div class="fig-caption">literature-corpus 是 wiki 底下的批量层</div>

</v-click>

</div>

</div>

<!--
Backup：回答"你只靠读过的几百篇，会不会漏引你没读过的？"。literature-corpus 是三层栈最底下的批量词法层，本地 6.2 万篇 nucl-th 全文，机械构建、零 token，投稿前做全领域漏引扫描。强调它不属于"培养"（机械灌入，不是带出来的），所以放 backup 不进主线；本地落空不等于新颖，要升级到在线检索。
-->

---
layout: default
---

# Backup: L1　纯文本 + 链接：人和 agent 读同一份文件
## Plain text and links, not an app

<div class="grid gap-6" style="grid-template-columns: 2fr 3fr;">

<div class="text-base">

<v-clicks>

- **人可读**：Obsidian 里是一张可点击的知识图谱
- **Agent 可读**：纯文件，`grep` / `read` 直接拿
- **可 diff**：git 记录每次改了什么，能回滚
- **不绑平台**：纯文本，二十年后还能打开

<div class="box-evidence mt-3">
<span class="takeaway">要点：</span>选纯文本，就是为了让人和 agent 读的<strong>是同一份文件</strong>，不搞两套数据。
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
Central message: 纯文本加链接加 git，让人和 agent 共享同一份能改、不被锁死的东西。

讲点：为什么不是 Notion、不是数据库？那些是给人的 UI 优化的，agent 抓不到。纯 Markdown，对人是图谱，对 agent 是一次 read，对 git 是一个 diff，三方看同一个字节。

-->

---
layout: default
---

# Backup: L2　常驻身份：profile.md 每次对话第一行
## The always-loaded identity layer

<div class="grid gap-6" style="grid-template-columns: 3fr 2fr;">

<div class="text-base">

一行 `@import`，让个人档案<strong>每次对话自动带上</strong>：

```text
# ~/.claude/CLAUDE.md
@~/research-wiki-personal/profile.md
```

<v-click>

<div class="kami-card mt-2">
档案里装着 agent 每次都得知道的"你"：<br>
· 研究方向、正在投的稿子<br>
· 硬规矩：不用 em-dash、物理优先、先跑再想<br>
· 算力清单、合作者权重
</div>

</v-click>

</div>

<div>

<v-click>

<div class="box-idea">
<strong>一页小而精的档案，每次对话都带着，比一大坨现查出来的零碎好用。</strong><br><br>
身份层是"一直带着"，不是"问到了才翻"。
</div>

</v-click>

</div>

</div>

<!--
Central message: 用 @import 把小而精的个人档案每次对话都带上，等于给 agent 一个你掌控的 system prompt。

讲点：注意它和检索的区别。研究方向、硬规矩、算力，这些每个任务都用得到，不该靠检索碰运气，要钉死在上下文最前面。

-->

---
layout: default
---

# Backup: L3　概念笔记 + 统一词表：综述怎么长出来
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
<span class="takeaway">关键：</span>统一词表让四种写法都归到<strong>同一页</strong>。先查重再新建，概念不散架，综述才攒得起来。这是 RAG 给不了的。
</div>

<div class="mt-3 text-center">
<a href="graph.html" target="_blank" class="tag" style="border-bottom: none;">点开真实图谱 ↗ 1425 节点 · 6432 链接</a>
</div>

</v-click>

</div>

</div>

<!--
Central message: 每篇论文被写进概念页，统一词表保证同一概念归并到一页，使综述随阅读自动累积。

讲点：关键动作是查重加追加。读完一篇讲 CDCC 的论文，去 methods/cdcc.md 底部追加一行。统一词表是综述能不能积累的技术前提，没有它，一个概念会因为五种写法散成五页。

-->

---
layout: default
---

# Backup: L4　技能：把标准流程变成一句话触发
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
<strong>四条硬规矩：</strong>统一 schema、每条声明带出处、不用 em-dash、<strong>先查重再新建</strong>。
</div>

<div class="kami-card mt-3" style="border-left: 3px solid var(--ink-blue);">
三类操作：<strong>ingest</strong>（入库）· <strong>query</strong>（提问，好答案归档回库）· <strong>lint</strong>（体检，找矛盾与孤儿页）。
</div>

</v-clicks>

<!--
Central message: 把维护知识库的流程写成可一句话触发的技能，agent 就按统一规范自动维护。

讲点：这是从 Karpathy 的 schema 文档再往前一步：不只写规则，而是封装成 ingest / query / lint 这类一句话触发的技能。技能本身也是纯文本，在库里，可版本管理、可迭代。

-->

---
layout: default
---

# Backup: L5　记忆 + 闭环：越用越强
## Memory and the compounding loop

<div class="grid gap-6 mt-2" style="grid-template-columns: 2fr 3fr;">

<div class="text-base">

每个纠正 → 一个文件 → `MEMORY.md` 索引<strong>自动加载</strong>。模型一个参数没动，它却越来越懂你的规矩。

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
<span class="takeaway">复利：</span>关键是第三步"写回"。大多数人用 AI 是开环的——问完就走，什么都没留下。闭环就是把每次问出来的好东西写回库里，垫高下次的起点。
</div>

</v-click>

<!--
Central message: 记忆自动加载加上读、干、写回、更高起点的闭环，让 agent 越用越强。

讲点：复利的关键是写回。Karpathy 也强调，好答案应该归档回 wiki，而不是消失在聊天记录里。这样你的探索也在复利。

-->

---
layout: default
---

# Backup: 全景：原始文件怎么变成 agent 的脑子
## The full stack, end to end

<div class="grid gap-2 mt-3 text-center">

<div class="kami-card-accent"><strong>AGENT</strong> &nbsp;<span style="color: var(--olive)">读 + 写，干活</span></div>
<div class="text-xl" style="color: var(--ink-blue)">▲ &nbsp; 始终加载 + 按需检索 &nbsp; ▼ &nbsp; 经 skill 写回</div>
<div class="grid grid-cols-2 gap-2">
<div class="kami-card"><strong>profile + memory</strong><br><span style="color: var(--olive)">L2 + L5　常驻身份 + 纠错记忆</span></div>
<div class="kami-card"><strong>skills</strong><br><span style="color: var(--olive)">L4　读写规矩</span></div>
</div>
<div class="kami-card"><strong>wiki：概念笔记 + 统一词表 + index</strong> &nbsp;<span style="color: var(--olive)">L3　综合，越攒越厚</span></div>
<div class="kami-card"><strong>raw files</strong>：PDF · 代码 · 数据 &nbsp;<span style="color: var(--olive)">L1　纯文本，git 管版本</span></div>

</div>

<div v-click class="text-center mt-4 text-lg" style="color: var(--ink-blue);">
人在 Obsidian 这头整理，agent 在文件那头读写，git 里存的是同一本账。
</div>

<!--
Central message: 五层拼成一条从原始文件到 agent 脑子的链路，人与 agent 在两侧操作同一份 git 管理的真相。

讲点：从下往上读：原始文件是地基，wiki 整理成概念，profile 和 memory 始终加载，skills 是规范，最上面 agent 干活。箭头双向：向下加载检索，向上经技能写回。

-->

---
layout: default
---

# Backup: 日常长什么样：读一篇、问一句
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
<span class="takeaway">闭环：</span>读 → 干活 → 把成果<strong>写回库</strong> → 下次起点更高。跟带学生一样，每一次都让下一次更省力。
</div>

</v-click>

<!--
Central message: 日常使用就是教 agent 入库和用它的积累两个动作，加上把好结果写回库。

讲点：用起来非常朴素。读一篇就一句"加进文献库"。关键一步：好回答要归档回库，不要消失在聊天记录里，跟学生写组会纪要一个道理。

-->
