---
theme: seriph
title: '用 AI 做科研：从一个问题到一个可信的结果'
titleTemplate: '%s · 金磊'
info: '核物理研究生实践课：明确任务、复现计算、判断证据。'
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
<h1>用 AI 做科研<span class="h1-sub">从一个问题<br>到一个可信的结果</span></h1>
<div class="byline">金磊 · Jin Lei</div>
<div class="affiliation">同济大学物理系<br>中国科学院近代物理研究所南方核科学理论研究中心</div>
</div>
<div class="cover-side">
<LiveOnly><HeroNucleus /></LiveOnly>
<div class="signoff">
<div class="ui-label">TODAY'S PRACTICE</div>
<div class="slip-title">今天一起完成一个小计算</div>
<div class="row"><span>把问题交代清楚</span><span class="ck">①</span></div>
<div class="row"><span>把结果重新算出来</span><span class="ck">②</span></div>
<div class="row"><span>说清证据支持什么</span><span class="ck">③</span></div>
</div>
</div>

<!--
Central message: 今天通过一个完整的小计算练习使用 AI 的方法。
图示说明：右侧三项是今天要实际完成的动作。
讲述：不要求大家安装任何软件，纸笔或手机记事本即可参加。会操作工具的同学也请先独立作答。最后每人带走自己的第一份科研任务。
Timing target: 0:00–1:00，1 分钟。
Transition: 怎么知道这堂课有没有学到东西？
-->

---

# 下课前，你要能完成这三件事
<div class="subtitle">Learning outcomes: specify, reproduce, interpret</div>

<div class="three">
<div class="kami-card"><h3><span class="num">01</span>交代任务</h3><p>指出哪些物理选择<br>不能留给 AI 猜</p></div>
<div class="kami-card"><h3><span class="num">02</span>复现结果</h3><p>找到原始输出<br>用同一条命令重算</p></div>
<div class="kami-card"><h3><span class="num">03</span>判断证据</h3><p>解释每个检查<br>排除了哪类错误</p></div>
</div>
<div class="bottom-line">最后请用自己的课题，写一份能执行、能检查的任务。</div>

<!--
Central message: 学习目标是三个可观察的动作。
图示说明：三张卡片对应任务、交付和判断。
讲述：请记住第三项。结果看起来合理，与知道它为什么可信，是两种不同的能力。今天会留出三次作答时间；不以记住产品名字为考核。
Timing target: 1:00–3:00，2 分钟。
Transition: 从一个大家学过的两体问题开始。
-->

---

# 已知一个束缚态，能算出怎样的散射？
<div class="subtitle">One model, one fitted quantity, one prediction</div>

<div class="demo-grid">
<div class="kami-card task-brief task-narrow" data-label="PHYSICS QUESTION">
用方势阱近似中子与质子的相互作用。<br>
固定 R = 2 fm，选最浅的单 s 波束缚态，<br>
调 V₀ 使 B = 2.224575 MeV。<br><br>
接着计算 s 波相移 δ₀(E)，以及<br>
低能散射长度 aₜ。<br>
<span class="note-line">s 波：l = 0；三重态：总自旋为 1。<br>本教学模型省略张量耦合。</span>
</div>
<div class="scene-box"><LiveOnly><WellWave /></LiveOnly></div>
</div>
<div class="source">δ₀：相互作用引起的远处波形相位变化；aₜ：三重态低能散射的长度尺度。动画显示径向波函数 u(r)，虚线是自由波。</div>

<!--
Central message: 一个拟合量确定势阱深度，其他量成为模型的预测。
图示说明：深色势阱内外连接的实线是径向波函数，虚线是无相互作用自由波；能量 E 是质心系动能。动画仅帮助理解任务，不承担数值验证。
讲述：s 波指轨道角动量为零，三重态指两核子总自旋为一。相移告诉我们远处波形相对自由波移动多少，散射长度概括趋近零能时的行为。今天不讨论这套简化模型是否足够描述真实核力。
Timing target: 3:00–6:00，3 分钟。
Transition: 我先给出一个看似已经很完整的任务。
-->

---

# 练习一：你还会补哪三句话？
<div class="subtitle">Exercise 1 · 先独立写，再和旁边同学比较</div>

<div class="kami-card task-brief lesson-prompt" data-label="INITIAL REQUEST">
用 Julia 写中子与质子的方势阱 s 波散射程序。<br>
半径 2 fm，调势阱深度，拟合结合能 2.224575 MeV。<br>
用 Numerov 算 0 到 50 MeV 的相移，与解析解比较。<br>
输出散射长度，并画图。
</div>
<div class="note-line">Numerov：求解径向方程的数值方法。Julia：本次使用的编程语言。</div>
<div class="bottom-line">写下三条补充要求，并说明：不写这一条，会有什么歧义？</div>

<!--
Central message: 在执行前识别尚未明确的物理选择和交付要求。
图示说明：卡片故意缺少质量、能量系、相移分支和交付范围。
讲述：个人写 90 秒，同桌交换 60 秒，再请两位同学各说一条。暂不显示下一页。不要只说“写正确的代码”，要写出可以落实的要求。现场收集的答案优先用于下一页讲解。
Timing target: 6:00–10:00，4 分钟。
Transition: 我会优先补上这些会改变问题本身的选择。
-->

---

# 没写清的物理选择，会进入程序
<div class="subtitle">Specify the physical problem before the implementation</div>

| 需要说清什么 | 本次取法 | 不说明会怎样 |
|---|---|---|
| 动力学质量 | 约化质量 μ = mₙmₚ/(mₙ+mₚ) | 可能把 μ 写成核子质量 |
| 能量与单位 | 质心系；MeV、fm，取 c = 1 | 同一个“50 MeV”含义不同 |
| 相移分支 | 连续取支，零能极限为 180° | 相差 180°可能描述相同散射 |
| 零能处理 | E > 0 算相移；E → 0 取极限 | 直接代 E = 0 可能除零 |

<div class="bottom-line">先明确“算哪个问题”，再决定“用哪种算法”。</div>

<!--
Central message: 物理约定定义了要计算的问题。
图示说明：表格将每一条约定与具体歧义连接。
讲述：本教学模型取一个 s 波束缚态，相移按 Levinson 定理取零能 180 度的分支。S 矩阵是描述散射的复振幅关系，s 波为 exp(2iδ)，所以相差整数倍 180 度不能直接判成数值错。这里只讲为什么要写分支，不要求学生记定理名称。
Timing target: 10:00–13:00，3 分钟。
Transition: 把约定补上，还要告诉它交什么以及怎么检查。
-->

---

# 一份可以执行的任务，分成四块
<div class="subtitle">Question · assumptions · checks · deliverables</div>

<div class="two">
<div class="kami-card"><h3>问题与约定</h3><p>固定 R = 2 fm，用结合能定 V₀。</p><p>使用约化质量与质心系能量。</p></div>
<div class="kami-card"><h3>检查与交付</h3><p>在指定六个能量点比较解析解。</p><p>交程序、命令、原始输出和数据表。</p></div>
</div>
<div class="kami-card lesson-strip"><p><b>六点：</b>E = 0.1、1、5、10、20、50 MeV，最大差 &lt; 0.01°。</p><p><b>边界：</b>只改练习目录；拟合无解时报告并暂停。</p></div>
<div class="bottom-line">完整任务在 demo/prompt.md；上述容差只用于数值检查。</div>

<!--
Central message: 任务同时要定义问题、检查和可复核的交付物。
图示说明：两张卡片分组呈现四块内容，底部是改动边界。
讲述：六个点为 0.1、1、5、10、20、50 MeV，容差 0.01 度是这次练习的数值检查标准，不是模型描述自然的标准。完整常数和边界条件在可复制提示词中。允许 AI 提出建议，但改变物理问题前要说明。
Timing target: 13:00–16:00，3 分钟。
Transition: 现在可以把这件事交给能操作文件的 AI。
-->

---
clicks: 4
class: scene-slide
---

# 智能体会执行任务，也会根据输出再修改
<div class="subtitle">Agent: read, execute, inspect, revise</div>

<div class="scene-definitions">智能体（agent）：获得工具权限后，能读写文件、运行程序并查看结果的 AI。</div>
<LiveOnly><StepScene mode="agent" :step="$clicks" :height="300" /></LiveOnly>
<div class="source">本次使用编程智能体；具体产品不影响本课的任务、交付和检查方法。</div>

<!--
Central message: 智能体能执行一个工作循环，执行记录应当可复核。
图示说明：按点击展示提出操作、执行、读取输出、修改、交付。
讲述：工具权限决定它实际能做什么，不按聊天窗口或终端的外观区分。演示前只给独立目录权限。不要把“能自己跑完”解释成“能自己保证物理正确”。
Timing target: 16:00–19:00，3 分钟。
Transition: 看一遍真实的操作过程。
-->

---

# 现场只看三步：读任务、执行、找到输出
<div class="subtitle">Live demonstration · 有离线回退，不等待网络</div>

<div class="three">
<div class="kami-card"><h3><span class="num">01</span>交任务</h3><p>在练习目录中<br>粘贴完整提示词</p></div>
<div class="kami-card"><h3><span class="num">02</span>看操作</h3><p>它改了哪些文件？<br>执行了什么命令？</p></div>
<div class="kami-card"><h3><span class="num">03</span>找证据</h3><p>打开原始输出<br>找到数值比较</p></div>
</div>
<div class="bottom-line">请记录：结果在哪个文件里，下一位同学怎样重算？</div>

<!--
Central message: 现场演示的观察目标是文件和命令，而不是生成速度。
图示说明：三张卡片是演示的可见步骤。
讲述：会前打开编程智能体和独立练习目录。使用 demo/prompt.md 中的完整任务。等待上限 60 秒，未完成就切换到现有 demo/square_well.jl，明确说明这是会前参考实现，不能冒充刚生成的结果。离线执行 julia demo/square_well.jl。之后按页上的问题让学生指出文件。
Timing target: 19:00–23:00，4 分钟。
Transition: 无论由谁写出来，我都要求拿到同样的东西。
-->

---

# “完成了”之后，你应该拿到什么？
<div class="subtitle">A handoff another student can reproduce</div>

| 交付物 | 本课参考文件 | 你用它做什么 |
|---|---|---|
| 源程序 | demo/square_well.jl | 查看公式和参数 |
| 运行命令 | julia demo/square_well.jl | 重新计算 |
| 原始终端输出 | demo/reference-output.txt | 查数值，核对摘要 |
| 逐点数据（CSV 表） | demo/phase_shift.csv | 重画图，查单个点 |

<div class="bottom-line">解压课堂材料包后，在其根目录执行上面的命令。</div>

<!--
Central message: 交付物应该让别人能够重算并定位结果来源。
图示说明：表中路径都对应本项目的实际文件。CSV 是逗号分隔的数据表。
讲述：现场生成文件可以叫别的名字，但要具有这四种内容。图不是原始数据，聊天摘要也不是原始输出。Julia 版本和运行范围记录在 demo/README.md；参考程序只使用 Julia 标准功能。
Timing target: 23:00–26:00，3 分钟。
Transition: 先只读出结果，不急着给它作评价。
-->

---

# 我们算到了什么？
<div class="subtitle">Read the result before interpreting it</div>

<div class="two">
<div><img src="./figures/phase-shift-ok.png" class="kami-img" /></div>
<div class="kami-card"><h3>参考实现的输出</h3><p>势阱深度 V₀ = 36.567 MeV</p><p>散射长度 aₜ = 5.356 fm</p><p>六个检查点的最大偏差<br>约 0.006°</p><p>偏差：Numerov 相移减解析相移</p></div>
</div>
<div class="source">图：E 为质心系能量，δ₀ 为 s 波相移，点为 Numerov，线为解析解。数值步长 h = 2×10⁻⁴ fm；最大偏差仅指指定六点，不是连续能区上界。</div>

<!--
Central message: 数值结果需要带着其比较对象和检查范围一起报告。
图示说明：图来自现有参考程序；六个检查点为 0.1、1、5、10、20、50 MeV。曲线图另采用 120 个点作展示，不能把六点最大偏差称为全区间误差界。
讲述：此时能够说的只是给定实现得到这些数。先不要说模型正确。aₜ 是固定半径并拟合结合能后的模型输出，不是输入。
Timing target: 26:00–29:00，3 分钟。
Transition: 用一个具体能量点走完复现过程。
-->

---

# 用 10 MeV 这一行，把结果追到底
<div class="subtitle">Trace one number from the command to the comparison</div>

```text
$ julia demo/square_well.jl
 E(MeV)   δ_numerov   δ_exact   |diff|    δ_badmass
  10.0     86.5518    86.5556   0.0038    74.9974
```

<div class="two">
<div class="kami-card"><h3>能直接复核</h3><p>86.5518 − 86.5556 ≈ −0.0038°</p><p>找到程序中的质量和势阱深度。</p></div>
<div class="kami-card"><h3>先把问题留下</h3><p>最后一列是预设的错误质量算例。</p><p>它为什么仍给出平滑的结果？</p></div>
</div>
<div class="bottom-line">先追踪一个数，再相信整张图和整段摘要。</div>

<!--
Central message: 一个输出行可以把命令、参数和误差计算连接起来。
图示说明：终端节选来自实际输出，δ_badmass 为错误质量算例的 Numerov 相移。
讲述：打开源程序定位 mu_ok 与 mu_bad，不需要逐行讲数值递推。说明下一段要用错误算例训练判断，它是人为设置的教学反例，并非声称某产品在现场必然犯错。
Timing target: 29:00–32:00，3 分钟。
Transition: 现在给大家两份验收摘要，请决定下一步。
-->

---

# 练习二：两份自查都通过，下一步查什么？
<div class="subtitle">Exercise 2 · 先选择，再说明理由</div>

| 验收摘要 | 计算 A | 计算 B |
|---|---:|---:|
| 拟合结合能 | 2.224575 MeV | 2.224575 MeV |
| Numerov 与解析解最大偏差（六点） | 0.006° | 0.004° |
| 散射长度 aₜ | 5.356 fm | 4.105 fm |

<div class="lesson-choices">
<p><b>①</b> 选 B，因为自查偏差更小</p>
<p><b>②</b> 继续减小步长，直到两个散射长度一致</p>
<p><b>③</b> 先检查两份计算是否实现了同一个物理问题</p>
</div>

<!--
Central message: 自查偏差的大小不足以决定哪份计算实现了指定物理问题。
图示说明：A/B 都重新拟合深度，检查点和步长相同；此页故意不显示质量。
讲述：个人选择 45 秒，同桌解释 60 秒，举手投票后请一位选①或②的同学讲理由。追问：如果计算的是两个不同的方程，减步长能使它们成为同一个方程吗？先收理由，不急着揭晓。
Timing target: 32:00–36:00，4 分钟。
Transition: 打开两份计算的共同设定。
-->

---

# 错误的质量，同时进入了程序和解析解
<div class="subtitle">A shared assumption survives a numerical cross-check</div>

<div class="two">
<div><img src="./figures/phase-shift-slip.png" class="kami-img" /></div>
<div class="kami-card"><h3>计算 B 的设定</h3><p>把约化质量 μ ≈ 469 MeV<br>替换成核子质量 ≈ 939 MeV。</p><p>重新调深度至 20.986 MeV，<br>结合能仍能拟合。</p><p>解析解也用了错误质量，<br>所以它仍与 Numerov 吻合。</p></div>
</div>
<div class="bottom-line">它们一致地解了另一个问题。</div>
<div class="source">教学反例，由 demo/square_well.jl 显式设置；不是某次模型回答的记录。图中两组各自的点与线均重合。</div>

<!--
Central message: 两种求解方式共享设定错误时，求解对照不能检出该错误。
图示说明：绿线组为约化质量，粉线组为误用核子质量；每组内实线和数值点吻合。两组之间相移不同。
讲述：正确选项是③。这里知道 B 错，是因为从两体相对运动推导得到约化质量，与指定问题不符。散射长度不同只是提醒我们有差异，不能单凭哪一个数更喜欢来定对错。
Timing target: 36:00–39:00，3 分钟。
Transition: 那么到底需要检查哪几层？
-->

---

# 每个检查，都要说清它在查哪一层
<div class="subtitle">Implementation · physical setup · model adequacy</div>

| 检查的问题 | 在本例中怎么查 | 通过后能说什么 |
|---|---|---|
| 方程解得对吗？ | Numerov 对解析解；步长检查 | 所查范围内数值求解符合预期 |
| 方程写对了吗？ | 从两体相对运动核对约化质量 | 动力学设定符合本次任务 |
| 模型描述自然吗？ | 与未用于拟合的观测量比较 | 检验模型对额外信息的描述 |

<div class="bottom-line">先说想排除哪类错误，再选检查方法。</div>

<!--
Central message: 检查应针对具体错误来源，不同层次的证据不能互换。
图示说明：三行从数值实现、物理设定到模型适用性逐层区分。
讲述：第三行需要真实实验资料及误差，不在本次参考计算中自动完成。解析解不会告诉我们省略张量耦合是否可接受；实验失配也不能自动定位为编程错误。
Timing target: 39:00–42:00，3 分钟。
Transition: 特别注意，独立不等于所有东西都不一样。
-->

---

# 独立检查，要针对共同的错误来源
<div class="subtitle">Independent of the error being tested</div>

<div class="two">
<div class="box-evidence"><h3>比较求解方法</h3><p>保持同一个势、同一个质量。</p><p>改变求解方式：数值与解析。</p><p>检查数值实现的偏差。</p></div>
<div class="box-idea"><h3>核对动力学设定</h3><p>回到两体相对运动的推导。</p><p>不能照抄同一个质量变量。</p><p>检查 μ 的来源和定义。</p></div>
</div>
<div class="note-line">质心系中：T = p²/(2μ)，μ = mₙmₚ/(mₙ+mₚ)。<br>p 为相对动量；先由两体动能分解确认 μ，再核对程序。</div>
<div class="bottom-line">独立检查要避开正在排查的共同错误来源。</div>

<!--
Central message: 检查的独立性取决于能否避开被检查的共同错误来源。
图示说明：左右两栏分别控制求解方法与动力学定义。
讲述：修正旧稿的过强说法“对照不能共享任何输入”。比较同一个物理问题恰恰需要共享参数。多个模型的相同回答不是新的物理证据；可以用它们找不同的检查路线，最终回到推导、输出和数据。
Timing target: 42:00–45:00，3 分钟。
Transition: 除了质量，另一件事也经常被重复当作证据。
-->

---

# 拟合过的结合能，不能再算一次预测成功
<div class="subtitle">Fitting and prediction use different information</div>

<div class="three">
<div class="kami-card"><h3><span class="num">01</span>先固定</h3><p>半径 R = 2 fm<br>正确的两体动力学</p></div>
<div class="kami-card"><h3><span class="num">02</span>用来拟合</h3><p>结合能 B<br>确定势阱深度 V₀</p></div>
<div class="kami-card"><h3><span class="num">03</span>额外输出</h3><p>散射长度 aₜ<br>以及相移 δ₀(E)</p></div>
</div>
<div class="bottom-line">拟合量的吻合检查拟合过程；额外观测量提供新的约束。</div>

<!--
Central message: 同一条拟合信息不能当作独立的预测验证再使用一次。
图示说明：三张卡片区分预先固定的设定、用于拟合的信息和预测量。
讲述：提问“结合能精确到六位，为什么仍不能宣布核力模型正确？”请学生用刚才的错误质量反例回答。也不要走到另一个极端：检查拟合是否达标仍然必要，只是它回答的是另一个问题。
Timing target: 45:00–48:00，3 分钟。
Transition: 现在把这些判断写成能放进研究记录的一段话。
-->

---
class: lesson-claim
---

# 从“结果很准”，改成一段可核对的结论
<div class="subtitle">A claim with a stated scope</div>

<div class="box-gap"><h3>信息不足</h3><p>AI 高精度复现了氘核，证明这个模型可靠。</p></div>
<div class="box-evidence lesson-strip"><h3>与现有证据相符</h3><p>固定 R = 2 fm，以结合能拟合势阱深度。<br>在六个指定能量点，Numerov 与同设定解析解<br>的最大相移偏差约 0.006°。模型给出 aₜ = 5.356 fm。</p></div>
<div class="bottom-line">这个比较检验了数值求解；模型适用性仍需额外检验。</div>

<!--
Central message: 结论应指明设定、比较对象、范围和尚未完成的检验。
图示说明：上方是待纠正的教学句子，下方是与实际输出相符的替代。
讲述：请学生找出下方新增加的四项信息。既不把拟合残差叫准确度，也不把数值吻合叫自然界验证。这里没有实验比较，所以不要替它加上实验结论。
Timing target: 48:00–51:00，3 分钟。
Transition: 到这里，我们已经走完一次完整任务。
-->

---

# 回看：你刚才替 AI 作了哪些判断？
<div class="subtitle">The decisions that remain yours</div>

<div class="takeaways">
<div class="item"><span class="n">①</span><span class="t">运行前，确定要解的物理问题<small>质量、能量系、单位、边界条件。</small></span></div>
<div class="item"><span class="n">②</span><span class="t">运行后，从输出复核具体的数<small>程序、命令、原始输出、比较范围。</small></span></div>
<div class="item"><span class="n">③</span><span class="t">写结论时，区分不同层次的证据<small>数值求解、物理设定、模型适用性。</small></span></div>
</div>

<!--
Central message: 完整任务的主线是设定、复核和解释。
图示说明：三个动作再次出现，但这次每一项都已有具体经历。
讲述：请一位学生不用看笔记说出错误质量案例教了什么。如果只答“AI 会错”，追问“为什么解析解也没查出来？”答案应包含共同设定。
Timing target: 51:00–54:00，3 分钟。
Transition: 换成组里现成的程序，这套方法还用得上吗？
-->

---

# 换成老程序：字段名字也会让人猜错
<div class="subtitle">Transfer example · FRESCO, a coupled-channel reaction code</div>

```text
! 动力学质量
&PARTITION namep='n' massp=1.0  namet='90Zr' masst=90.0 ... /
! 势半径的几何约定
&POT kp=1 type=0 ap=0.000 at=90.000 rc=1.200000 /
```

<div class="two">
<div class="kami-card"><h3>先判断</h3><p>ap = 0 是否意味着<br>把中子质量设成了零？</p></div>
<div class="kami-card"><h3>核对定义</h3><p>动力学质量在 massp。</p><p>ap 控制势半径中的入射粒子项。</p></div>
</div>
<div class="source">FRESCO 是核反应耦合道计算程序。节选自 examples/fresco-n90zr.in；省略号不是可执行输入。这里只比较字段定义，不报告新截面计算。</div>

<!--
Central message: 输入字段的意义应由程序约定确定，不能凭名称猜测。
图示说明：同一真实输入中动力学质量和半径几何的字段分别出现。
讲述：让学生先遮住右栏判断 20 秒。将这个问题与方势阱质量案例连接：一个字段能让程序正常运行，却改变了计算的问题。这里只讲可迁移原则，不培训 FRESCO 的全部输入格式。
Timing target: 54:00–57:00，3 分钟。
Transition: 怎样把今天学到的方法用于这种程序？
-->

---

# 从已知结果出发，让每次修改都看得见
<div class="subtitle">Start from a verified example, inspect the changes</div>

<div class="three">
<div class="kami-card"><h3><span class="num">01</span>先复现</h3><p>拿组里已有输入<br>重现对应结果</p></div>
<div class="kami-card"><h3><span class="num">02</span>再修改</h3><p>一次只改任务所需项<br>逐项查看前后差异</p></div>
<div class="kami-card"><h3><span class="num">03</span>重新检查</h3><p>核对新配置的定义<br>补上相应数值检查</p></div>
</div>
<div class="bottom-line">旧配置通过，只证明旧配置；改了问题，就要重新确定检查范围。</div>

<!--
Central message: 已验证输入提供起点，但不能替新配置自动背书。
图示说明：三个阶段显示先复现、限制修改和重新检查。
讲述：英文 diff 就是前后差异。靶核、能量变了，不只是替换两个数字，还可能需要新的势参数适用范围和收敛检查。不要说“以前跑通，所以这次也对”。
Timing target: 57:00–60:00，3 分钟。
Transition: 这些反复要做的事，可以保存下来。
-->

---

# 把你确认过的约定，变成下次的起点
<div class="subtitle">Standing instructions and reusable procedures</div>

<div class="two">
<div class="kami-card"><h3>项目说明文件</h3><p>记录通用约定与修改边界。</p><p>例如：两体问题核对约化质量；<br>实验数据目录不改动。</p></div>
<div class="kami-card"><h3>技能文件（skill）</h3><p>记录一类任务的操作流程。</p><p>例如：复现已有输入；<br>查看差异；按配置检查输出。</p></div>
</div>
<div class="bottom-line">写进文件能减少重复说明，执行后仍要检查是否遵守。</div>

<!--
Central message: 保存已确认的经验可以降低重复交代的成本。
图示说明：左栏是通用约定，右栏是按任务使用的流程说明。
讲述：不同工具对说明文件的名称和加载方式不同，实际使用前在工具中检查。这里不承诺写进去就不会再犯错，也不讲具体产品配置步骤。
Timing target: 60:00–62:00，2 分钟。
Transition: 我在核物理程序上用的就是这个思路。
-->

---

# FUSION：把可复现的操作流程保存下来
<div class="subtitle">A nuclear-physics example of reusable procedures</div>

<div class="kami-card lesson-focus"><h3>FUSION 是我整理的核物理程序技能集合。</h3><p>从已有输入开始，让智能体执行，<br>保存输出，再与对应参考结果比较。</p></div>
<div class="two">
<div class="kami-card"><h3>可以复用</h3><p>安装步骤、输入范例、检查方法。</p></div>
<div class="kami-card"><h3>仍需你决定</h3><p>模型是否适合、要研究哪个问题。</p></div>
</div>
<div class="source">项目仓库：https://github.com/jinleiphys/FUSION。此处只说明方法，不以项目规模作为教学目标。</div>

<!--
Central message: FUSION 是今天流程的一个应用实例。
图示说明：上方概括流程，下方分开可复用步骤与物理判断。
讲述：大家不必先安装这个项目。对自己组里的常用程序，先把一份输入、一条运行命令和一个已知结果整理好，就能开始。基准匹配只覆盖被实际比较的配置和输出。
Timing target: 62:00–65:00，3 分钟。
Transition: 读文献和写文字，同样可以要求可追踪的证据。
-->

---

# 同一套做法，也适用于文献和写作
<div class="subtitle">Trace the evidence, inspect the changes</div>

<div class="two">
<div class="kami-card"><h3>读文献</h3><p>给出待解释的原文段落。</p><p>要求页码、式号，标明推断。</p><p>打开原文核对是否支持这句话。</p></div>
<div class="kami-card"><h3>改文字</h3><p>保留数值、公式与结论范围。</p><p>要求列出改动及理由。</p><p>对照原文，检查含义是否改变。</p></div>
</div>
<div class="bottom-line">页码可能写错，改动清单也可能漏项；最终核对原材料。</div>

<!--
Central message: 可追溯交付和人工判断可以迁移到非计算任务。
图示说明：两栏沿用任务、交付、核对的相同结构。
讲述：一条真实存在的文献不一定支持这句话；“与数据相容”也不能润色为“证明机制”。只用两个例子点到为止，不另开四个场景抢走主线。涉及非公开材料时先确认授权、保密约定和服务的数据处理条款。
Timing target: 65:00–67:00，2 分钟。
Transition: 轮到大家把方法放进自己的课题。
-->

---

# 练习三：写你明天能交出去的第一份任务
<div class="subtitle">Exercise 3 · 选择一个半小时左右的小任务</div>

<div class="kami-card task-brief lesson-prompt" data-label="YOUR TASK">
<b>问题：</b>我想得到什么？哪些条件已经固定？<br>
<b>起点：</b>给它哪份已有文件或参考材料？<br>
<b>检查：</b>先排除哪类错误？用什么证据？<br>
<b>交付：</b>我要哪些文件，怎样重算或核对？
</div>
<div class="note-line">还没有课题：用今天的正确质量，改变 R 后重新拟合结合能，比较 aₜ。</div>
<div class="bottom-line">请写具体的文件和检查，不要只写“帮我分析数据，保证正确”。</div>

<!--
Central message: 学生把通用方法落实到一份具体任务。
图示说明：四行任务卡可直接写在纸上；后备题只提出问题，不预设变化趋势。
讲述：用两分钟解释题目并给出示例：复现一个已知算例、核对论文的一条推导、重画一张已有数据图均可。不要选“完成我的毕业论文”。下一页会保留五分钟完整写作和互评时间。
Timing target: 67:00–69:00，2 分钟。
Transition: 现在计时，先自己写，再把卡片交给旁边的人。
-->

---

# 同桌只需要追问这三句
<div class="subtitle">3 分钟写任务，2 分钟互相检查</div>

<div class="takeaways">
<div class="item"><span class="n">①</span><span class="t">哪里还需要我替你猜？<small>圈出缺少的设定、输入文件或改动范围。</small></span></div>
<div class="item"><span class="n">②</span><span class="t">什么情况算没通过？<small>要求一项具体检查，并说明它针对哪类错误。</small></span></div>
<div class="item"><span class="n">③</span><span class="t">你拿到文件之后怎么复核？<small>说出第一条命令，或第一处要打开的原文。</small></span></div>
</div>

<!--
Central message: 让另一个人试着执行任务，可以发现尚未明说的假设。
图示说明：三句追问分别检查歧义、判断标准和复核入口。
讲述：真正静默三分钟，不用讲解填满。提醒还没写的人使用上一页的方势阱后备题。后两分钟同桌交换；独自参加的同学按三问自己检查。收集一份匿名任务用于下一页点评。
Timing target: 69:00–74:00，5 分钟。
Transition: 看一份任务怎样从泛泛要求变成可执行的研究小步。
-->

---

# 一份合格的起步任务，长这样
<div class="subtitle">Worked answer · 改半径后，结合能仍不足以固定所有输出吗？</div>

<div class="kami-card task-brief lesson-prompt" data-label="EXAMPLE ANSWER">
<b>问题：</b>R 取 1.8、2.0、2.2 fm，重新拟合结合能，比较 aₜ。<br>
<b>分支：</b>每次选最浅、仅有一个 s 波束缚态的势阱。<br>
<b>起点：</b>从本课参考程序复制到独立练习目录。<br>
<b>检查：</b>先复现 R = 2 的结果；每个 R 都核对束缚态条件，<br>
并在指定六点与同设定解析相移比较。<br>
<b>交付：</b>改动清单、运行命令、原始输出、R/V₀/aₜ 数据表。
</div>
<div class="bottom-line">这是后续练习题，本课没有计算这组半径扫描，也不预告趋势。</div>

<!--
Central message: 后续任务应改变明确的物理条件，并同步扩大检查范围。
图示说明：四行给出可执行的后备题答案，但没有编造尚未计算的数。
讲述：优先点评刚收到的学生任务，此页作为参照。补充选择最浅的、仅有一个 s 波束缚态的分支；不能只改变 R 而忘记重新定 V₀。研究问题是固定结合能后其他输出受半径选择影响多大，不是再做一个漂亮图。
Timing target: 74:00–77:00，3 分钟。
Transition: 再用一个没有见过的情境检查今天学会了什么。
-->

---

# 离堂小题：两份程序吻合，还缺什么？
<div class="subtitle">Exit ticket · 用一句话说明下一项检查及理由</div>

<div class="kami-card lesson-focus"><p>你让 AI 用两种方法计算同一个散射问题。<br>两份程序相差 0.01%，但都从同一份配置读入参数。<br><br><b>你现在能宣布“物理模型正确”吗？<br>下一步先检查什么，取决于你想排除哪类错误？</b></p></div>
<div class="note-line">请给出一个具体例子；只答“再核对一下”不算完成。</div>

<!--
Central message: 学生能把检查的层次和共同错误来源迁移到新情境。
图示说明：新情境没有规定错误一定在哪里，允许多条合理检查路线。
讲述：给 45 秒写答案，再请一位学生回答。合格答案：不能。若担心参数定义错，回到原始定义核对质量或半径约定；若关心模型适用性，比较未用于拟合的观测量并考虑误差。两方法吻合只为已检查配置提供求解一致性证据。
Timing target: 77:00–79:00，2 分钟。
Transition: 现在可以把今天的经验压成一句真正能使用的话。
-->

---

# 让 AI 做任务，让证据决定你能说什么
<div class="subtitle">Take home: specify the question, trace the result, bound the claim</div>

<div class="takeaways">
<div class="item"><span class="n">①</span><span class="t">运行前：哪些选择需要我定？<small>把物理设定写清楚。</small></span></div>
<div class="item"><span class="n">②</span><span class="t">运行后：检查排除了什么错误？<small>从文件复现，针对错误来源检查。</small></span></div>
<div class="item"><span class="n">③</span><span class="t">得到结果：它支持我说到哪一步？<small>区分求解正确、设定正确和模型适用。</small></span></div>
</div>

<!--
Central message: 学生带走三个可执行的问题，而不是一串警告。
图示说明：三个问题与开场学习目标以及三次练习逐项对应。
讲述：请大家保留刚才的任务卡。明天从它开始，用一个熟悉的小问题走完流程。不要把“我需要负责”停留在态度上，把它落实为可以打开的文件和可以说明的检查。
Timing target: 79:00–81:00，2 分钟。
Transition: 最后告诉大家材料在哪里，留出交流时间。
-->

---

# 课后只做一件事：执行你刚写的任务
<div class="subtitle">Your first reproducible handoff</div>

<div class="two">
<div class="kami-card"><h3>随讲义提供</h3><p>demo/prompt.md：完整提示词</p><p>demo/square_well.jl：参考程序</p><p>demo/worksheet.md：练习与自评</p><p>demo/README.md：运行方法</p></div>
<div class="kami-card"><h3>做完留下三句话</h3><p>我固定了哪些设定？</p><p>我实际做了哪些检查？</p><p>现在还不能得出什么结论？</p></div>
</div>
<div class="bottom-line">随讲义分发 student-materials.zip；解压后先读 README.md。</div>

<!--
Central message: 用一次真实的同伴复核巩固今天的方法。
图示说明：左侧指向实际材料，右侧是交付后的反思记录。
讲述：用四分钟接收一到两份学生任务的现场点评，每份只指出最关键的遗漏。若前面延时，这四分钟可缩短，但保留完整互评和离堂小题。资料随报告目录和讲义分发，无需联网即可查看。
Timing target: 81:00–85:00，4 分钟，含学生任务点评。
Transition: 接下来讨论大家真正遇到的任务。
-->

---
layout: center
---

# 问答
<div class="subtitle">你的第一份任务，卡在哪一步？</div>

<!--
Central message: 用听众自己的任务检查方法能否落地。
图示说明：问答页。
讲述：优先回答任务定义、交付、检查方面的问题。工具选型可简短回答，但不占掉对具体任务的讨论。若无问题，邀请一位学生展示任务卡，请另一位同学指出第一项检查。
Timing target: 85:00–90:00，5 分钟。
Transition: 以下为备用材料，按问题调用。
-->

---
routeAlias: bk-offline
---

# 备用：无需网络，重现今天的关键结果
<div class="subtitle">Offline reference · Julia standard features only</div>

```text
$ julia demo/square_well.jl
V0 (reduced mass) = 36.567 MeV
a_t (reduced mass) = 5.356 fm
V0 (nucleon mass) = 20.986 MeV
a_t (nucleon mass) = 4.105 fm
max |numerov-exact| (correct mass) = 0.0059 deg
max |numerov-exact| (bad mass, same slip in both) = 0.0037 deg
```

<div class="note-line">reduced mass：约化质量；nucleon mass：故意误用核子质量。<br>六个检查点：0.1、1、5、10、20、50 MeV。</div>

<!--
Central message: 离线回退保留相同的证据链。
图示说明：真实终端输出节选，完整记录见 demo/reference-output.txt。
讲述：这是参考实现，现场 AI 未完成时明确切换，不能把它描述为现场生成。
Timing target: 备用，不计入正文。
Transition: 回到交付物或练习二。
-->

---
routeAlias: bk-mass
---

# 备用：为什么相对运动必须用约化质量？
<div class="subtitle">Check the setup from two-body mechanics</div>

<div class="kami-card">

$$T=\frac{P^2}{2(m_n+m_p)}+\frac{p^2}{2\mu},\qquad \mu=\frac{m_n m_p}{m_n+m_p}.$$

<p>P 是质心动量，p 是相对动量。</p>
<p>质心系中 P = 0，径向方程描述相对运动。</p>
<p>两个近似等质量的核子，μ 约为单个核子质量的一半。</p>
</div>
<div class="bottom-line">这一步来自问题的动力学定义，不来自两份程序的相互吻合。</div>

<!--
Central message: 约化质量由质心与相对运动的分解决定。
图示说明：一个方程把总动能拆成质心和平动之外的相对运动。
讲述：解释为什么 μ 约 469 MeV，而不是约 939 MeV。c=1 的单位约定沿用正文。
Timing target: 备用，不计入正文。
Transition: 回到检查的三层。
-->

---
routeAlias: bk-radius
---

# 备用：ap 改变了哪一个半径？
<div class="subtitle">Radius definitions must match the potential parameters</div>

<div class="two">
<div class="kami-card"><h3>仅含靶核项</h3><p>R = r₀ Aₜ<sup>1/3</sup></p><p>输入取 ap = 0，at = 90。</p></div>
<div class="kami-card"><h3>加上入射粒子项</h3><p>R = r₀ (Aₚ<sup>1/3</sup> + Aₜ<sup>1/3</sup>)</p><p>输入取 ap = 1，at = 90。</p></div>
</div>
<div class="note-line">Aₚ、Aₜ 为入射粒子和靶核质量数；r₀ 为半径系数。</div>
<div class="bottom-line">半径比为 1 + 90<sup>−1/3</sup> ≈ 1.22；这不是截面的误差。</div>

<!--
Central message: 字段约定会改变势的几何，而不一定触发运行错误。
图示说明：两栏展示同一半径系数下的两种定义。
讲述：从参数来源核对究竟使用哪一种半径定义，不能凭数值看起来合理决定。此例没有计算两种设置的截面差。
Timing target: 备用，不计入正文。
Transition: 回到从已验证输入修改的流程。
-->

---
routeAlias: bk-reading
---

# 备用：读文献任务的四块内容
<div class="subtitle">The same task structure, without writing code</div>

<div class="kami-card task-brief lesson-prompt" data-label="READING TASK">
<b>问题：</b>解释这篇文章从式 (11) 到式 (12) 用了哪些近似。<br>
<b>起点：</b>提供可分享的原文和相关定义，不凭记忆补出处。<br>
<b>检查：</b>逐项核对符号、量纲与原文；补出的步骤标“推导”。<br>
<b>交付：</b>页码、式号、推导步骤、尚不确定的地方。
</div>
<div class="bottom-line">用原文检查回答，也用自己的推导检查原文。</div>

<!--
Central message: 非计算任务也可以具有明确的输入、检查与交付。
图示说明：四项结构与课堂计算任务一致。
讲述：这是一份通用任务模板，式号为示例，不指某篇文献。分享材料前确认授权和保密要求；署名、披露等要求按所在单位与目标期刊规定处理。
Timing target: 备用，不计入正文。
Transition: 返回问答。
-->
