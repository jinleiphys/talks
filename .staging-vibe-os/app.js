const SAVE_KEY = "vibe-research-sim-save-v2";
const META_KEY = "vibe-research-sim-meta-v2";

const PROJECT_SEEDS = [
  {
    id: "climate",
    field: "Climate Science",
    title: "极端天气归因快速分析",
    summary: "再分析数据、统计模型和媒体周期同时逼近。最容易出现“图比结论成熟”的局面。",
    progress: 28,
    novelty: 41,
    correctness: 52,
    polish: 22,
  },
  {
    id: "bio",
    field: "Biology",
    title: "单细胞图谱的跨组织对比",
    summary: "数据规模巨大，图很容易好看，真正困难的是别把 batch effect 当发现。",
    progress: 18,
    novelty: 55,
    correctness: 47,
    polish: 14,
  },
  {
    id: "history",
    field: "Digital Humanities",
    title: "晚清报刊语料的叙事漂移",
    summary: "OCR 脏、引文密、解释空间大，非常适合一本正经地犯错。",
    progress: 34,
    novelty: 49,
    correctness: 58,
    polish: 30,
  },
  {
    id: "ai",
    field: "AI Research",
    title: "小模型实验室自动化代理",
    summary: "benchmark 一多，最先崩的不一定是模型，而是你对结果含义的耐心。",
    progress: 22,
    novelty: 51,
    correctness: 44,
    polish: 20,
  },
  {
    id: "materials",
    field: "Materials Science",
    title: "高通量材料筛选的失败样本库",
    summary: "实验等待时间和数据清洗量一样可怕。负结果管理不好，项目会像沙漏一样漏光。",
    progress: 25,
    novelty: 46,
    correctness: 50,
    polish: 18,
  },
  {
    id: "social",
    field: "Social Science",
    title: "平台劳动的跨城市比较",
    summary: "访谈、问卷和舆论周期一起挤压。最危险的是把故事感误当因果识别。",
    progress: 20,
    novelty: 58,
    correctness: 43,
    polish: 16,
  },
];

const MODEL_MARKET = [
  {
    id: "campus-mini",
    tier: "Budget",
    name: "Campus Mini",
    copy: "便宜、快、会说人话，但也很会把猜测说得像事实。",
    tokenMult: 0.75,
    progressMult: 0.8,
    correctnessMult: 0.72,
    polishMult: 0.9,
    riskMult: 1.28,
    throughput: 90,
    stallRisk: 0.08,
  },
  {
    id: "queue-pro",
    tier: "Cloud",
    name: "Queue Pro",
    copy: "模型不弱，但平台的 GPU 队列像期刊审稿一样神秘且漫长。",
    tokenMult: 1.05,
    progressMult: 1,
    correctnessMult: 1.05,
    polishMult: 1.02,
    riskMult: 0.96,
    throughput: 24,
    stallRisk: 0.34,
  },
  {
    id: "frontier-pro",
    tier: "Frontier",
    name: "Frontier Pro",
    copy: "贵，但真正难的工作值得交给它。速度、质量和稳定性都在高位。",
    tokenMult: 1.45,
    progressMult: 1.22,
    correctnessMult: 1.24,
    polishMult: 1.2,
    riskMult: 0.8,
    throughput: 120,
    stallRisk: 0.05,
  },
  {
    id: "reasoning-max",
    tier: "Flagship",
    name: "Reasoning Max",
    copy: "最强一档，但慢、贵，而且你最好真的有算力配得上它。",
    tokenMult: 1.82,
    progressMult: 1.08,
    correctnessMult: 1.42,
    polishMult: 1.12,
    riskMult: 0.72,
    throughput: 48,
    stallRisk: 0.12,
  },
  {
    id: "open-chaos",
    tier: "Open",
    name: "Open Chaos 70B",
    copy: "免费得让人动心，随机得让人失眠。常常一半是惊喜，一半是事故。",
    tokenMult: 0.55,
    progressMult: 0.92,
    correctnessMult: 0.7,
    polishMult: 0.84,
    riskMult: 1.42,
    throughput: 62,
    stallRisk: 0.14,
  },
];

const ARCHETYPES = [
  {
    id: "burnt-pi",
    type: "Hard Mode",
    name: "爆肝 PI",
    copy: "你已经很会做判断，但几乎没有生活缓冲。最适合用纯意志力把系统顶出一个洞。",
    buffs: ["Judgment +2", "Reputation +8", "Mental -14", "起始带 1 名资深博后"],
    apply(state) {
      state.judgment += 2;
      state.reputation += 8;
      state.mental -= 14;
      state.members.push(createMember("postdoc"));
      state.feed.push({ week: 1, tag: "origin", text: "你以个人判断力开局，代价是气血已经先欠着了。" });
    },
  },
  {
    id: "compute-dealer",
    type: "Economy",
    name: "算力投机客",
    copy: "你不太信任人，但很信任算力市场和预算表。擅长把钱转成吞吐，再把吞吐转成焦虑。",
    buffs: ["Cash +18000", "Compute +16", "Judgment -1", "Reputation -6"],
    apply(state) {
      state.cash += 18000;
      state.compute += 16;
      state.judgment -= 1;
      state.reputation -= 6;
      state.feed.push({ week: 1, tag: "origin", text: "你以预算优势开局。系统已经闻到一点 GPU 烧焦味了。" });
    },
  },
  {
    id: "soft-mentor",
    type: "People First",
    name: "温柔导师",
    copy: "你没有最高的起点，但你的人不会立刻坏掉。你相信长期主义，也知道情绪价值不是玄学。",
    buffs: ["Mental +10", "Team Stress -12", "起始带 2 名成员", "Tokens -8000"],
    apply(state) {
      state.mental += 10;
      state.teamStress -= 12;
      state.tokens -= 8000;
      state.members.push(createMember("phd"), createMember("ra"));
      state.feed.push({ week: 1, tag: "origin", text: "你以更稳的实验室气氛开局。钱会更紧，但人先不会坏。" });
    },
  },
];

const DAILY_DIRECTIVES = [
  {
    id: "gpu-famine",
    title: "GPU Famine",
    copy: "全平台都在排队。模型更容易卡住，起始算力也更紧。",
    apply(state) {
      state.compute -= 6;
      state.modifiers.providerTax += 0.12;
    },
  },
  {
    id: "audit-month",
    title: "Audit Month",
    copy: "到处都在查图和数据。内部审计更值钱，切片和灰色捷径也更危险。",
    apply(state) {
      state.modifiers.auditBonus += 2;
      state.modifiers.shortcutPenalty += 8;
    },
  },
  {
    id: "grant-winter",
    title: "Grant Winter",
    copy: "钱更难拿，但你会带着一点现金缓冲进场。",
    apply(state) {
      state.cash += 6000;
      state.modifiers.grantPenalty += 0.14;
    },
  },
  {
    id: "soft-mutiny",
    title: "Soft Mutiny",
    copy: "实验室全员低气压。起始压力更高，但安抚动作更有效。",
    apply(state) {
      state.teamStress += 18;
      state.modifiers.mentorBoost += 6;
    },
  },
  {
    id: "open-science-drive",
    title: "Open Science Drive",
    copy: "开放材料和 benchmark 更值钱。你会更累，但更难被追债。",
    apply(state) {
      state.risk += 6;
      state.modifiers.auditBonus += 1;
      state.modifiers.benchmarkBonus += 4;
    },
  },
  {
    id: "metrics-fever",
    title: "Metrics Fever",
    copy: "所有人都在冲数字。灰色捷径更赚钱，也更容易把你送进坏结局。",
    apply(state) {
      state.reputation += 2;
      state.risk += 6;
      state.modifiers.shortcutCash += 3000;
      state.modifiers.shortcutPenalty += 10;
    },
  },
];

const RUN_MODES = [
  {
    id: "career",
    label: "Standard",
    name: "Career",
    copy: "24 周标准局，信息量最完整，适合第一次玩。",
    stats: ["24 周聘期", "每周 3 动作", "没有额外坏消息"],
    apply(state) {
      state.runModeId = "career";
      state.totalWeeks = 24;
      state.baseActionCap = 3;
      state.actionCap = 3;
      state.actionsLeft = 3;
      state.launchDirectiveTitle = "标准 Career";
      state.launchDirectiveCopy = "标准局没有额外 modifier，适合先摸清资源循环。";
    },
  },
  {
    id: "daily",
    label: "Daily",
    name: "每日挑战",
    copy: "每日固定 modifier，聘期更短，但每周多 1 次动作。",
    stats: ["18 周聘期", "每周 4 动作", "带今日 directive"],
    apply(state) {
      const directive = getDailyDirective();
      state.runModeId = "daily";
      state.totalWeeks = 18;
      state.baseActionCap = 4;
      state.actionCap = 4;
      state.actionsLeft = 4;
      state.contract = 18;
      state.launchDirectiveId = directive.id;
      state.launchDirectiveTitle = directive.title;
      state.launchDirectiveCopy = directive.copy;
      directive.apply(state);
      state.feed.push({ week: 1, tag: "daily", text: `今日挑战生效：${directive.title}。${directive.copy}` });
    },
  },
  {
    id: "sprint",
    label: "Arcade",
    name: "速冲局",
    copy: "更像社交平台战报模式。时间更短，动作更多，局势更躁。",
    stats: ["12 周聘期", "每周 4 动作", "高风险高回报"],
    apply(state) {
      state.runModeId = "sprint";
      state.totalWeeks = 12;
      state.baseActionCap = 4;
      state.actionCap = 4;
      state.actionsLeft = 4;
      state.contract = 12;
      state.cash += 12000;
      state.tokens += 12000;
      state.compute += 10;
      state.risk += 10;
      state.teamStress += 8;
      state.launchDirectiveTitle = "速冲局";
      state.launchDirectiveCopy = "更短的计时器，更吵的资源条，更适合冲分和截战报。";
      state.feed.push({ week: 1, tag: "arcade", text: "速冲局生效。你手更快，系统也更快地来讨债。" });
    },
  },
];

const PERK_DEFS = {
  "grant-office": {
    name: "Grant Office Friend",
    copy: "基金到手后更厚一点。以后中标会多带一层现金缓冲。",
  },
  "red-team": {
    name: "Red Team Habit",
    copy: "你已经开始习惯内审。以后做 audit 更省力，也更容易抓出东西。",
  },
  "template-stack": {
    name: "Template Stack",
    copy: "你终于攒出一套能复用的稿件骨架。以后写稿更便宜一点。",
  },
  "lab-culture": {
    name: "Lab Culture",
    copy: "你把组会和安抚做成了稳定流程。以后安抚动作更有效。",
  },
};

const ACTION_META = {
  buyTokens: { tag: "Fuel", label: "购买 tokens", copy: "先补 ideas fuel，让后面的模型动作不至于空转。" },
  buyCompute: { tag: "Fuel", label: "购买算力", copy: "先补真算力，不然很多“结果”都只是会说话的猜测。" },
  grant: { tag: "Fuel", label: "申请基金", copy: "这是最标准的找钱动作，也最标准地容易扑空。" },
  literature: { tag: "Push", label: "文献扫描", copy: "稳一点地推主线，也会顺手抬高一点自信型风险。" },
  prototype: { tag: "Push", label: "代码 / 实验原型", copy: "推进最猛，但也最容易把预算和未来 debug 债一起点燃。" },
  draftPaper: { tag: "Push", label: "写论文初稿", copy: "能迅速形成“像论文”的手感，也会把你往过早投稿那边推。" },
  verify: { tag: "Truth", label: "人工核验", copy: "花判断力把最像真的错误拦在门口。" },
  benchmark: { tag: "Truth", label: "跑 benchmark", copy: "用算力买回一点真实性，也顺手替未来投稿打底。" },
  auditLab: { tag: "Truth", label: "内部审计", copy: "专门查 citation、数据和组内小动作，伤人但省爆炸。" },
  mentor: { tag: "People", label: "安抚学生 / 开组会", copy: "情绪价值不是玄学，是把周结算变便宜的硬动作。" },
  recruit: { tag: "People", label: "招人进组", copy: "可能招来被动增益，也可能招来新的事故源。" },
  rest: { tag: "People", label: "主动休息", copy: "这步不产出论文，但会保住后面还能继续产出的你。" },
  salamiSlice: { tag: "Deadline", label: "切片灌水", copy: "快速涨数字，但它会在未来用更贵的方式找你。" },
  submitPaper: { tag: "Deadline", label: "投稿当前项目", copy: "最像胜利的按钮，也最像一次大额赌博。" },
};

const ACTION_FILTERS = [
  { id: "recommended", label: "推荐" },
  { id: "fuel", label: "补燃料" },
  { id: "push", label: "冲进度" },
  { id: "truth", label: "控风险" },
  { id: "people", label: "管团队" },
  { id: "deadline", label: "赌一把" },
];

const ACTION_ORDER = [
  "buyTokens",
  "buyCompute",
  "grant",
  "literature",
  "prototype",
  "draftPaper",
  "verify",
  "benchmark",
  "auditLab",
  "mentor",
  "recruit",
  "rest",
  "salamiSlice",
  "submitPaper",
];

const REVIEW_DEFS = [
  {
    id: "runway-review",
    week: 4,
    kicker: "Budget",
    title: "系里预算摸底",
    copy: "他们不关心你这几周是不是没睡，只关心这个实验室还有没有 runway。",
    requirement: "Cash 至少 ¥28000，或已经中 1 笔基金。",
    actions: ["grant", "buyTokens", "buyCompute"],
    check() {
      return state.cash >= 28000 || state.grantsWon >= 1;
    },
    onPass() {
      state.cash += 5000;
      state.reputation += 2;
    },
    onFail() {
      state.mental -= 4;
      state.reputation -= 2;
      state.risk += 2;
    },
    passText: "+¥5000 · Reputation +2",
    failText: "Mental -4 · Reputation -2",
  },
  {
    id: "lab-climate-review",
    week: 8,
    kicker: "People",
    title: "匿名实验室气候调查",
    copy: "大家嘴上都说没事，但表单和私聊会替他们说真话。",
    requirement: "Team Stress 不高于 50，且平均 morale 至少 45。",
    actions: ["mentor", "rest", "recruit"],
    check() {
      const avgMorale = average(state.members.map((member) => member.morale));
      return state.teamStress <= 50 && (state.members.length === 0 || avgMorale >= 45);
    },
    onPass() {
      state.judgment += 1;
      state.teamStress -= 6;
    },
    onFail() {
      state.teamStress += 8;
      state.mental -= 4;
      for (const member of state.members) member.burnout += 5;
    },
    passText: "Judgment +1 · Team Stress -6",
    failText: "Team Stress +8 · Mental -4",
  },
  {
    id: "integrity-scan",
    week: 12,
    kicker: "Integrity",
    title: "图表与数据合规抽查",
    copy: "漂亮已经不够了。现在轮到原始记录、图注和 citation 互相对口供。",
    requirement: "Risk 不高于 42，且至少做过 1 次 audit 或 correctness 到 62 以上。",
    actions: ["auditLab", "verify", "benchmark"],
    check() {
      const project = getActiveProject();
      return state.risk <= 42 && (state.auditsRun >= 1 || project.correctness >= 62);
    },
    onPass() {
      state.reputation += 3;
      state.cash += 4000;
    },
    onFail() {
      state.risk += 10;
      state.reputation -= 4;
      state.mental -= 5;
    },
    passText: "Reputation +3 · Cash +¥4000",
    failText: "Risk +10 · Reputation -4",
  },
  {
    id: "dossier-review",
    week: 16,
    kicker: "Career",
    title: "中期聘期材料预审",
    copy: "委员会终于开始翻你的文件夹。他们对成长故事的耐心没有你想得那么多。",
    requirement: "已拿下至少 2 个成果位，或主线项目接近 ready 且 Risk 较低。",
    actions: ["submitPaper", "grant", "benchmark"],
    check() {
      const project = getActiveProject();
      return state.papersPublished + state.grantsWon >= 2 || (project.progress >= 78 && project.correctness >= 64 && state.risk <= 40);
    },
    onPass() {
      state.reputation += 5;
      state.bonusActionsNextWeek += 1;
    },
    onFail() {
      state.mental -= 6;
      state.contract -= 1;
    },
    passText: "Reputation +5 · 下周 +1 Action",
    failText: "Mental -6 · Contract -1W",
  },
  {
    id: "narrative-review",
    week: 20,
    kicker: "Reputation",
    title: "学校宣传部来找成功故事",
    copy: "他们只想听一个干净、清楚、对外可讲的版本。你得先真的有一个。",
    requirement: "Reputation 至少 45，且 Risk 不高于 48。",
    actions: ["submitPaper", "auditLab", "draftPaper"],
    check() {
      return state.reputation >= 45 && state.risk <= 48;
    },
    onPass() {
      state.reputation += 4;
      state.cash += 6000;
    },
    onFail() {
      state.reputation -= 3;
      state.teamStress += 5;
    },
    passText: "Reputation +4 · Cash +¥6000",
    failText: "Reputation -3 · Team Stress +5",
  },
];

const ROLE_DEFS = {
  phd: { label: "PhD", stipend: 1800, progressBias: 1.15, correctnessBias: 1, polishBias: 0.9 },
  ra: { label: "RA", stipend: 1400, progressBias: 1.05, correctnessBias: 0.85, polishBias: 1.15 },
  postdoc: { label: "Postdoc", stipend: 2600, progressBias: 1.1, correctnessBias: 1.25, polishBias: 1.05 },
  engineer: { label: "Engineer", stipend: 3000, progressBias: 0.95, correctnessBias: 1.15, polishBias: 1, computeBias: 1.2 },
};

const FIRST_NAMES = ["陈", "林", "赵", "周", "李", "王", "杨", "吴", "郑", "何", "许", "宋"];
const LAST_NAMES = ["子安", "雨晴", "明哲", "知微", "一帆", "青禾", "书恒", "可欣", "景行", "云舒", "初夏", "怀瑾"];
const MEMBER_QUIRKS = [
  "每次组会都说“我回去再整理一下”。",
  "写出来的 related work 总比实验结果更完整。",
  "看到 reviewer 语气不对就会失眠。",
  "能熬夜，但会把第二天整天都还回去。",
  "图画得极好，统计意识却像彩票。",
  "对新工具永远充满热情，对旧数据永远充满拖延。",
  "每次说“快好了”都意味着还要两天。",
  "最擅长在 deadline 前 18 小时突然进入高产状态。",
];
const MEMBER_TRAITS = {
  "steady-hand": {
    label: "稳手",
    copy: "不会突然拯救你，也不太会突然害死你。",
  },
  "gpu-pyromancer": {
    label: "算力喷火器",
    copy: "参数没想明白，先把队列占满。高峰期尤其危险。",
  },
  "ghost-writer": {
    label: "文风先行者",
    copy: "总能把不确定写得很确定，最擅长把空洞包装成方向。",
  },
  vanisher: {
    label: "静默蒸发型",
    copy: "每次说快好了，通常意味着下周再说。",
  },
  "fragile-genius": {
    label: "脆皮天才",
    copy: "状态好时强得离谱，状态差时全组一起陪他掉线。",
  },
  fabricator: {
    label: "数据炼金术士",
    copy: "结果如果不够漂亮，他会先修结果。",
  },
};
const MEMBER_TRAIT_POOL = {
  phd: ["gpu-pyromancer", "gpu-pyromancer", "ghost-writer", "vanisher", "fragile-genius", "fabricator", "steady-hand"],
  ra: ["gpu-pyromancer", "ghost-writer", "ghost-writer", "vanisher", "fabricator", "steady-hand"],
  postdoc: ["steady-hand", "steady-hand", "fragile-genius", "ghost-writer", "fabricator"],
  engineer: ["gpu-pyromancer", "gpu-pyromancer", "steady-hand", "steady-hand", "fragile-genius", "vanisher"],
};
const ABILITY_LABELS = {
  theory: "理论",
  compute: "算力",
  writing: "写作",
  rigor: "严谨",
  stability: "稳定",
};
const ROLE_ABILITY_RANGES = {
  phd: {
    theory: [52, 82],
    compute: [44, 74],
    writing: [40, 72],
    rigor: [48, 78],
    stability: [34, 68],
  },
  ra: {
    theory: [34, 64],
    compute: [36, 68],
    writing: [48, 82],
    rigor: [40, 70],
    stability: [40, 78],
  },
  postdoc: {
    theory: [58, 88],
    compute: [52, 82],
    writing: [46, 76],
    rigor: [58, 90],
    stability: [42, 74],
  },
  engineer: {
    theory: [34, 64],
    compute: [68, 92],
    writing: [28, 58],
    rigor: [50, 82],
    stability: [44, 76],
  },
};
const ROLE_HIRE_COSTS = {
  phd: [4200, 6200],
  ra: [3600, 5200],
  postdoc: [8200, 11800],
  engineer: [7600, 10800],
};
const TRAIT_SCOUT_NOTES = {
  "steady-hand": "推荐信没有爆点，但几乎没人说坏话。像那种不会突然救你，也不太会突然炸你的候选人。",
  "gpu-pyromancer": "简历里最亮眼的是超算和平台使用记录。会不会把队列当玩具，还得你自己赌。",
  "ghost-writer": "申请材料写得极漂亮，连 cover letter 都像已中过稿。文风有点强得可疑。",
  vanisher: "回邮件偶尔像消失，沟通节奏不算稳。你大概得接受他偶尔处于量子叠加态。",
  "fragile-genius": "大家都提到天赋，也都提到状态起伏。上限很高，维护成本也写在空气里。",
  fabricator: "demo 和样例数据异常顺滑，甚至漂亮得有点让人不安。最好别把信任一次性给满。",
};

const TOAST_DURATION = 1800;
const statConfig = [
  { key: "cash", label: "Cash", max: 150000, format: currency, help: "买 tokens、买算力、给人发钱、给自己续命都靠它。" },
  { key: "tokens", label: "Tokens", max: 150000, format: compact, help: "负责想法、草稿和代码；不负责真正把实验跑完。" },
  { key: "compute", label: "Compute", max: 160, format: raw, help: "真正做计算、跑实验、出结果要烧它，而不是只烧 tokens。" },
  { key: "judgment", label: "Judgment", max: 12, format: raw, help: "最稀缺资源。没有它，只有更快地胡说。" },
  { key: "reputation", label: "Reputation", max: 100, format: raw, help: "帮你赢来机会，也帮你吸引更多审稿人和麻烦。" },
  { key: "mental", label: "Mental HP", max: 100, format: raw, help: "系统不在乎这个，但你不能不在乎。" },
  { key: "risk", label: "Hallucination Risk", max: 100, format: raw, help: "越高越危险。最像真的地方，往往最可能翻车。" },
  { key: "contract", label: "Contract Clock", max: 24, format: weeksLeft, help: "剩余聘期。你不是无限回合制生物。" },
  { key: "teamStress", label: "Team Stress", max: 100, format: raw, help: "学生、合作者、RA 的整体压力。高了就开始集体摆烂或崩掉。" },
];

let meta = loadMeta();
let saveSnapshot = loadSave();
let state = null;
let toastTimer = null;
let selectedRunModeId = "career";
let sharePosterMode = false;
let selectedDrawerTab = "overview";
let activeActionDeckTab = "recommended";
let recruitOverlayOpen = false;

const dom = {
  startOverlay: document.querySelector("#start-overlay"),
  endOverlay: document.querySelector("#end-overlay"),
  recruitOverlay: document.querySelector("#recruit-overlay"),
  modeLabel: document.querySelector("#mode-label"),
  runtimeLabel: document.querySelector("#runtime-label"),
  actionsLeftLabel: document.querySelector("#actions-left-label"),
  careerTitleLabel: document.querySelector("#career-title-label"),
  agentLabel: document.querySelector("#agent-label"),
  modeBadge: document.querySelector("#mode-badge"),
  bestRunBadge: document.querySelector("#best-run-badge"),
  papersBadge: document.querySelector("#papers-badge"),
  grantsBadge: document.querySelector("#grants-badge"),
  headlineStrip: document.querySelector("#headline-strip"),
  terminalLog: document.querySelector("#terminal-log"),
  guideTitle: document.querySelector("#guide-title"),
  guideCopy: document.querySelector("#guide-copy"),
  guideChecklist: document.querySelector("#guide-checklist"),
  guideTags: document.querySelector("#guide-tags"),
  runwayGrid: document.querySelector("#runway-grid"),
  projectFocusCard: document.querySelector("#project-focus-card"),
  modelFocusCard: document.querySelector("#model-focus-card"),
  statGrid: document.querySelector("#stat-grid"),
  missionList: document.querySelector("#mission-list"),
  labRoster: document.querySelector("#lab-roster"),
  labSummary: document.querySelector("#lab-summary"),
  projectGrid: document.querySelector("#project-grid"),
  modelGrid: document.querySelector("#model-grid"),
  eventFeed: document.querySelector("#event-feed"),
  impactBanner: document.querySelector("#impact-banner"),
  impactText: document.querySelector("#impact-text"),
  tacticalGrid: document.querySelector("#tactical-grid"),
  actionFilterBar: document.querySelector("#action-filter-bar"),
  actionDeck: document.querySelector("#action-deck"),
  betCard: document.querySelector("#bet-card"),
  pressureCard: document.querySelector("#pressure-card"),
  comboCard: document.querySelector("#combo-card"),
  perkCard: document.querySelector("#perk-card"),
  opportunityCard: document.querySelector("#opportunity-card"),
  shareKicker: document.querySelector("#share-kicker"),
  shareTitle: document.querySelector("#share-title"),
  shareCopy: document.querySelector("#share-copy"),
  shareMetrics: document.querySelector("#share-metrics"),
  shareCard: document.querySelector("#share-card"),
  continueRun: document.querySelector("#continue-run"),
  wipeSave: document.querySelector("#wipe-save"),
  modeGrid: document.querySelector("#mode-grid"),
  dailyTitle: document.querySelector("#daily-title"),
  dailyCopy: document.querySelector("#daily-copy"),
  archetypeGrid: document.querySelector("#archetype-grid"),
  metaSummary: document.querySelector("#meta-summary"),
  advanceWeek: document.querySelector("#advance-week"),
  clearLog: document.querySelector("#clear-log"),
  togglePoster: document.querySelector("#toggle-poster"),
  copyLiveSummary: document.querySelector("#copy-live-summary"),
  drawerTabs: [...document.querySelectorAll("[data-drawer-tab]")],
  drawerPanels: [...document.querySelectorAll("[data-drawer-panel]")],
  endingTitle: document.querySelector("#ending-title"),
  endingCopy: document.querySelector("#ending-copy"),
  endingGrid: document.querySelector("#ending-grid"),
  copyResult: document.querySelector("#copy-result"),
  restartRun: document.querySelector("#restart-run"),
  recruitTitle: document.querySelector("#recruit-title"),
  recruitCopy: document.querySelector("#recruit-copy"),
  candidateGrid: document.querySelector("#candidate-grid"),
  refreshCandidates: document.querySelector("#refresh-candidates"),
  closeRecruit: document.querySelector("#close-recruit"),
  toast: document.querySelector("#toast"),
  statTemplate: document.querySelector("#stat-template"),
  missionTemplate: document.querySelector("#mission-template"),
  memberTemplate: document.querySelector("#member-template"),
  projectTemplate: document.querySelector("#project-template"),
  modelTemplate: document.querySelector("#model-template"),
  feedTemplate: document.querySelector("#feed-template"),
  archetypeTemplate: document.querySelector("#archetype-template"),
};

bootstrap();

function bootstrap() {
  renderArchetypes();
  renderStartOverlay();

  dom.continueRun.addEventListener("click", continueSavedRun);
  dom.wipeSave.addEventListener("click", wipeSaveOnly);
  dom.advanceWeek.addEventListener("click", () => {
    if (!state || state.ended) return;
    advanceWeek();
  });
  dom.clearLog.addEventListener("click", () => {
    if (!state) return;
    state.feed = state.feed.slice(0, 1);
    setImpact("旧日志已清空。系统原谅你，但历史并没有。");
    persistAndRender();
  });
  dom.copyLiveSummary.addEventListener("click", async () => {
    if (!state) return;
    await copyText(buildLiveSummaryText());
    toast("当前战报已复制。");
  });
  dom.togglePoster.addEventListener("click", () => {
    sharePosterMode = !sharePosterMode;
    renderShareCard();
    toast(sharePosterMode ? "Poster 模式已开启。" : "Poster 模式已关闭。");
  });
  dom.copyResult.addEventListener("click", async () => {
    if (!state || !state.summaryText) return;
    await copyText(state.summaryText);
    toast("结局战报已复制。");
  });
  dom.restartRun.addEventListener("click", () => {
    document.activeElement?.blur?.();
    dom.endOverlay.classList.add("hidden");
    dom.endOverlay.setAttribute("aria-hidden", "true");
    renderStartOverlay();
  });
  dom.refreshCandidates.addEventListener("click", rerollCandidatePool);
  dom.closeRecruit.addEventListener("click", closeRecruitOverlay);
  for (const button of dom.drawerTabs) {
    button.addEventListener("click", () => {
      selectedDrawerTab = button.dataset.drawerTab;
      renderDrawerTabs();
    });
  }

  if (saveSnapshot) {
    state = saveSnapshot;
    hydrateLegacyState();
    renderAll();
  } else {
    renderIdleShell();
  }
}

function renderDrawerTabs() {
  for (const button of dom.drawerTabs) {
    button.classList.toggle("active", button.dataset.drawerTab === selectedDrawerTab);
  }
  for (const panel of dom.drawerPanels) {
    panel.classList.toggle("active", panel.dataset.drawerPanel === selectedDrawerTab);
  }
}

function renderIdleShell() {
  const activeMode = getSelectedRunMode();
  const directive = getDailyDirective();
  recruitOverlayOpen = false;
  dom.advanceWeek.disabled = true;
  selectedDrawerTab = "overview";
  activeActionDeckTab = "recommended";
  dom.modeLabel.textContent = activeMode.name;
  dom.runtimeLabel.textContent = "Week 0";
  dom.actionsLeftLabel.textContent = `0 / ${activeMode.id === "career" ? 3 : 4}`;
  dom.careerTitleLabel.textContent = "待入职";
  dom.agentLabel.textContent = "请选择一个开局";
  dom.modeBadge.textContent = `Mode: ${activeMode.name}`;
  dom.bestRunBadge.textContent = meta.bestTitle ? `Best: ${meta.bestTitle}` : "Best: 暂无";
  dom.papersBadge.textContent = "Papers: 0";
  dom.grantsBadge.textContent = "Grants: 0";
  dom.guideTitle.textContent = "先选一个启动模式";
  dom.guideCopy.textContent = "第一次玩建议用 Career。进局后照着推荐下一步点，先补燃料，再冲进度，再控风险。";
  dom.guideTags.innerHTML = `<span class="guide-tag">${activeMode.name}</span><span class="guide-tag">${directive.title}</span>`;
  dom.guideChecklist.innerHTML = `
    <article class="guide-step current"><strong>1</strong><div><h4>选模式和流派</h4><p>Career 最稳，每日挑战最有变数，速冲局最适合出战报。</p></div></article>
    <article class="guide-step"><strong>2</strong><div><h4>看推荐动作</h4><p>如果资源太低，先买 tokens 或 compute；如果 risk 太高，先做核验或审计。</p></div></article>
    <article class="guide-step"><strong>3</strong><div><h4>按分组点动作</h4><p>动作区已经分成补燃料、冲进度、控风险、管团队和最后赌一把。</p></div></article>
    <article class="guide-step"><strong>4</strong><div><h4>结束本周</h4><p>周结算会让模型和学生的问题自己浮出来。</p></div></article>
  `;
  dom.headlineStrip.innerHTML = `
    <div class="headline-chip"><strong>Launch</strong>买模型、买 GPU、买一点体面。</div>
    <div class="headline-chip"><strong>Warning</strong>学生情绪也是一种硬资源。</div>
    <div class="headline-chip"><strong>Goal</strong>在聘期归零前让你的论文先成熟。</div>
  `;
  dom.betCard.innerHTML = `
    <p class="section-label">Weekly Bet</p>
    <h4>启动后每周会给你 3 张押注</h4>
    <p>从里面挑 1 张作为本周 agenda。周内节奏和结算奖励都会跟着变。</p>
  `;
  dom.pressureCard.innerHTML = `
    <p class="section-label">Pressure Track</p>
    <h4>每隔几周会来一次 review</h4>
    <p>预算、团队、合规和聘期材料会轮流上门。这是这局的 boss 节奏器。</p>
  `;
  dom.comboCard.innerHTML = `
    <p class="section-label">Combo Engine</p>
    <h4>动作顺序会影响收益</h4>
    <p>先补燃料再推进、先推进再核验、先安抚再冲刺，都会比乱点更赚。</p>
  `;
  dom.perkCard.innerHTML = `
    <p class="section-label">Perk Rack</p>
    <h4>里程碑会解锁被动</h4>
    <p>第一笔基金、第一轮内审、第一篇稿和稳定团队都会让 run 开始滚雪球。</p>
  `;
  dom.tacticalGrid.innerHTML = `
    <article class="tactical-card empty">
      <span class="action-tag">Step 1</span>
      <strong>先选一个开局</strong>
      <small>不同流派会把你带进完全不同的资源曲线。</small>
    </article>
    <article class="tactical-card empty">
      <span class="action-tag">Step 2</span>
      <strong>再挑本周押注</strong>
      <small>每周都先定打法，再决定这 3 到 4 个动作怎么出。</small>
    </article>
    <article class="tactical-card empty">
      <span class="action-tag">Step 3</span>
      <strong>最后打一手顺序</strong>
      <small>补燃料、冲进度、做核验的顺序，会决定你这周值不值。</small>
    </article>
  `;
  dom.runwayGrid.innerHTML = "";
  for (const item of [
    { label: "Cash", value: "¥42k", help: "先保 runway" },
    { label: "Compute", value: "18", help: "真结果靠它" },
    { label: "Risk", value: "26", help: "漂亮不等于对" },
    { label: "Stress", value: "28", help: "人也会炸" },
  ]) {
    const card = document.createElement("article");
    card.className = "runway-card";
    card.innerHTML = `<span class="section-label">${item.label}</span><strong>${item.value}</strong><small>${item.help}</small>`;
    dom.runwayGrid.appendChild(card);
  }
  dom.projectFocusCard.innerHTML = `
    <p class="section-label">Main Project</p>
    <h4>先选主线</h4>
    <p>每局先确定一个主线问题，再围绕它烧钱、烧卡、烧判断力。</p>
  `;
  dom.modelFocusCard.innerHTML = `
    <p class="section-label">Lab Pulse</p>
    <h4>学生会随机，能力也会随机</h4>
    <p>这次招来的是战力、情绪雷，还是超算纵火犯，得进局后自己看。</p>
  `;
  renderDrawerTabs();
  renderActions();
  dom.actionDeck.innerHTML = `
    <article class="tactical-card empty">
      <span class="action-tag">Deck Locked</span>
      <strong>进局后这里会变成动作牌库</strong>
      <small>推荐牌会先出现，其余动作按分类放到下面，不再把整页塞满按钮。</small>
    </article>
  `;
  renderShareCard();
}

function renderArchetypes() {
  dom.archetypeGrid.innerHTML = "";
  for (const archetype of ARCHETYPES) {
    const fragment = dom.archetypeTemplate.content.cloneNode(true);
    const button = fragment.querySelector(".archetype-card");
    fragment.querySelector(".archetype-type").textContent = archetype.type;
    fragment.querySelector(".archetype-name").textContent = archetype.name;
    fragment.querySelector(".archetype-copy").textContent = archetype.copy;

    const buffBox = fragment.querySelector(".archetype-buffs");
    for (const buff of archetype.buffs) {
      const row = document.createElement("span");
      row.textContent = buff;
      buffBox.appendChild(row);
    }

    button.addEventListener("click", () => startNewRun(archetype.id));
    dom.archetypeGrid.appendChild(fragment);
  }
}

function renderRunModes() {
  if (!dom.modeGrid) return;
  dom.modeGrid.innerHTML = "";
  for (const mode of RUN_MODES) {
    const button = document.createElement("button");
    button.className = `mode-card ${mode.id === selectedRunModeId ? "active" : ""}`.trim();
    button.innerHTML = `
      <p class="mode-label">${mode.label}</p>
      <h3 class="mode-name">${mode.name}</h3>
      <p class="mode-copy">${mode.copy}</p>
      <div class="mode-stats">${mode.stats.map((item) => `<span>${item}</span>`).join("")}</div>
    `;
    button.addEventListener("click", () => {
      selectedRunModeId = mode.id;
      renderRunModes();
      renderStartOverlay();
    });
    dom.modeGrid.appendChild(button);
  }
}

function renderStartOverlay() {
  saveSnapshot = loadSave();
  meta = loadMeta();
  renderRunModes();
  renderDailyDirective();

  dom.startOverlay.classList.remove("hidden");
  dom.startOverlay.setAttribute("aria-hidden", "false");
  dom.continueRun.disabled = !saveSnapshot;
  dom.metaSummary.textContent = meta.bestTitle
    ? `最佳战绩：${meta.bestTitle}。最高分 ${meta.bestScore}，共玩了 ${meta.runsPlayed} 局。`
    : "尚无最佳战绩。适合现在开始第一局。";
}

function startNewRun(archetypeId) {
  const archetype = ARCHETYPES.find((item) => item.id === archetypeId);
  const runMode = getSelectedRunMode();
  selectedDrawerTab = "overview";
  activeActionDeckTab = "recommended";
  sharePosterMode = false;
  recruitOverlayOpen = false;
  state = createBaseState(archetypeId);
  runMode.apply(state);
  archetype.apply(state);
  state.missions = generateWeeklyMissions();
  state.weeklyBet = null;
  state.weeklyBetOffers = generateWeeklyBetOffers();
  state.currentEvent = generateWeeklyEvent();
  state.candidatePool = generateCandidatePool();
  state.candidateRefreshes = 1;
  state.lastImpact = `${runMode.name} · ${archetype.name} 开局。先看推荐下一步，再决定这周怎么烧。`;
  state.terminal.push({ tone: "prompt", text: `> run started: ${runMode.name} / ${archetype.name}` });
  meta.runsPlayed += 1;
  saveMeta(meta);
  document.activeElement?.blur?.();
  dom.startOverlay.classList.add("hidden");
  dom.startOverlay.setAttribute("aria-hidden", "true");
  normalizeState();
  persistAndRender();
}

function continueSavedRun() {
  saveSnapshot = loadSave();
  if (!saveSnapshot) {
    toast("没有可继续的存档。");
    return;
  }
  state = saveSnapshot;
  hydrateLegacyState();
  selectedRunModeId = state.runModeId || "career";
  selectedDrawerTab = "overview";
  activeActionDeckTab = "recommended";
  recruitOverlayOpen = false;
  document.activeElement?.blur?.();
  dom.startOverlay.classList.add("hidden");
  dom.startOverlay.setAttribute("aria-hidden", "true");
  renderAll();
}

function wipeSaveOnly() {
  clearSave();
  saveSnapshot = null;
  renderStartOverlay();
  toast("存档已清空。黑历史还在。");
}

function createBaseState(archetypeId) {
  return {
    version: 3,
    runId: `run-${Date.now()}`,
    started: true,
    ended: false,
    archetypeId,
    runModeId: selectedRunModeId,
    launchDirectiveId: "",
    launchDirectiveTitle: "",
    launchDirectiveCopy: "",
    week: 1,
    runtime: "Week 1",
    baseActionCap: 3,
    actionCap: 3,
    actionsLeft: 3,
    totalWeeks: 24,
    activeProjectId: "climate",
    selectedModelId: "frontier-pro",
    cash: 42000,
    tokens: 36000,
    compute: 18,
    judgment: 6,
    reputation: 18,
    mental: 74,
    risk: 26,
    contract: 24,
    teamStress: 28,
    papersPublished: 0,
    grantsWon: 0,
    membersLost: 0,
    membersGraduated: 0,
    salamiPapers: 0,
    auditsRun: 0,
    shortcutDeals: 0,
    bonusActionsNextWeek: 0,
    perks: [],
    activeBuffs: [],
    lastCombo: null,
    actionHistoryWeek: [],
    missions: [],
    weeklyBet: null,
    weeklyBetOffers: [],
    currentEvent: null,
    candidatePool: [],
    candidateRefreshes: 1,
    lastImpact: "系统上线。先选模型，再决定这周是烧钱、交稿，还是先别翻车。",
    weekFlags: freshWeekFlags(),
    modifiers: freshModifiers(),
    reviewsPassed: 0,
    reviewsFailed: 0,
    projects: PROJECT_SEEDS.map((project) => ({ ...project })),
    modelIntel: createModelIntel(),
    members: [],
    terminal: [
      { tone: "prompt", text: "> booting vibe科研模拟器..." },
      { tone: "", text: "connected: grant office / reviewer queue / gpu broker / student inbox" },
      { tone: "warn", text: "advice: tokens generate ideas; compute generates actual results" },
    ],
    feed: [
      { week: 1, tag: "init", text: "你接管了一个泛科研 agent 工作台。模型、算力、学生和截止日期同时在烧钱。" },
    ],
    summaryText: "",
    ending: null,
  };
}

function hydrateLegacyState() {
  if (!state.members) state.members = [];
  if (!state.projects) state.projects = PROJECT_SEEDS.map((project) => ({ ...project }));
  if (!state.weekFlags) state.weekFlags = freshWeekFlags();
  if (!state.modifiers) state.modifiers = freshModifiers();
  if (!state.modelIntel) state.modelIntel = createModelIntel();
  if (typeof state.salamiPapers !== "number") state.salamiPapers = 0;
  if (typeof state.auditsRun !== "number") state.auditsRun = 0;
  if (typeof state.shortcutDeals !== "number") state.shortcutDeals = 0;
  if (typeof state.baseActionCap !== "number") state.baseActionCap = state.actionCap || 3;
  if (typeof state.bonusActionsNextWeek !== "number") state.bonusActionsNextWeek = 0;
  if (!state.perks) state.perks = [];
  if (!state.activeBuffs) state.activeBuffs = [];
  if (!state.actionHistoryWeek) state.actionHistoryWeek = [];
  if (!("lastCombo" in state)) state.lastCombo = null;
  if (typeof state.totalWeeks !== "number") state.totalWeeks = state.contract || 24;
  if (!("weeklyBet" in state)) state.weeklyBet = null;
  if (!state.weeklyBetOffers) state.weeklyBetOffers = generateWeeklyBetOffers();
  if (!state.candidatePool) state.candidatePool = generateCandidatePool();
  if (typeof state.candidateRefreshes !== "number") state.candidateRefreshes = 1;
  if (!state.runModeId) state.runModeId = "career";
  if (!state.launchDirectiveTitle) state.launchDirectiveTitle = "";
  if (!state.launchDirectiveCopy) state.launchDirectiveCopy = "";
  if (typeof state.reviewsPassed !== "number") state.reviewsPassed = 0;
  if (typeof state.reviewsFailed !== "number") state.reviewsFailed = 0;
  for (const model of MODEL_MARKET) {
    if (!state.modelIntel[model.id]) state.modelIntel[model.id] = emptyModelIntel();
  }
  for (const member of state.members) {
    if (!member.traitId) member.traitId = pickMemberTrait(member.role);
    if (!member.abilities) member.abilities = generateMemberAbilities(member.role);
  }
  if (typeof state.compute !== "number") state.compute = 18;
  if (!state.lastImpact) state.lastImpact = "继续上一局。系统对你的问题并没有遗忘。";
}

function renderAll() {
  if (!state) return;
  const activeModel = getActiveModel();

  dom.modeLabel.textContent = getRunModeName();
  dom.runtimeLabel.textContent = state.runtime;
  dom.actionsLeftLabel.textContent = `${state.actionsLeft} / ${state.actionCap}`;
  dom.careerTitleLabel.textContent = getCareerTitle();
  dom.agentLabel.textContent = `${activeModel.name} · ${getModelStatusLine(activeModel)}`;
  dom.modeBadge.textContent = `Mode: ${getRunModeName()}`;
  dom.bestRunBadge.textContent = meta.bestTitle ? `Best: ${meta.bestTitle}` : "Best: 暂无";
  dom.papersBadge.textContent = `Papers: ${state.papersPublished}`;
  dom.grantsBadge.textContent = `Grants: ${state.grantsWon}`;
  dom.impactText.textContent = state.lastImpact;

  renderDrawerTabs();
  renderHeadlines();
  renderGuide();
  renderRunway();
  renderFocusCards();
  renderTerminal();
  renderStats();
  renderMissions();
  renderMembers();
  renderProjects();
  renderModels();
  renderEngine();
  renderTacticalHand();
  renderOpportunity();
  renderFeed();
  renderShareCard();
  renderActions();
  renderRecruitOverlay();
}

function renderHeadlines() {
  const model = getActiveModel();
  const project = getActiveProject();
  const avgMorale = average(state.members.map((member) => member.morale));
  const moraleText = state.members.length
    ? `实验室平均 morale ${Math.round(avgMorale)}，${avgMorale < 45 ? "大家都快进入静默崩溃区了" : "表面上还像能继续"}。`
    : "实验室目前无人。管理成本低得像荒地。";

  dom.headlineStrip.innerHTML = `
    <div class="headline-chip"><strong>Model</strong>${model.name}：${getModelHeadline(model)}</div>
    <div class="headline-chip"><strong>Lab</strong>${moraleText}</div>
    <div class="headline-chip"><strong>Project</strong>主线项目「${project.title}」当前 progress ${project.progress}% / correctness ${project.correctness}%。</div>
  `;
}

function renderRunway() {
  const compactStats = [
    { key: "cash", help: "先保 runway" },
    { key: "compute", help: "真结果靠它" },
    { key: "risk", help: "先别翻车" },
    { key: "teamStress", help: "人也会炸" },
    { key: "reputation", help: "机会与麻烦并存" },
    { key: "contract", help: "聘期在倒数" },
  ];

  dom.runwayGrid.innerHTML = "";
  for (const item of compactStats) {
    const config = statConfig.find((entry) => entry.key === item.key);
    const value = clamp(state[item.key], 0, config.max);
    const card = document.createElement("article");
    card.className = "runway-card";
    card.innerHTML = `
      <span class="section-label">${config.label}</span>
      <strong>${config.format(value)}</strong>
      <small>${item.help}</small>
    `;
    if ((item.key === "risk" && value > 60) || (item.key === "teamStress" && value > 70) || (item.key === "cash" && value < 12000)) {
      card.style.borderColor = "rgba(176, 76, 52, 0.45)";
    }
    dom.runwayGrid.appendChild(card);
  }
}

function renderFocusCards() {
  const project = getActiveProject();
  const model = getActiveModel();
  const topCandidate = getTopCandidate();
  const projectMeta = `
    <div class="focus-meta">
      <span class="focus-pill">Progress ${project.progress}%</span>
      <span class="focus-pill">Correctness ${project.correctness}%</span>
      <span class="focus-pill">Polish ${project.polish}%</span>
    </div>
  `;

  dom.projectFocusCard.innerHTML = `
    <p class="section-label">Main Project</p>
    <h4>${project.title}</h4>
    <p>${project.summary}</p>
    ${projectMeta}
  `;

  const roster = [...state.members].sort((a, b) => getMemberPowerScore(b) - getMemberPowerScore(a));
  const topMember = roster[0];
  const candidateLine = topCandidate
    ? `本周候选里最亮眼的是 ${topCandidate.name}，${describeCandidateProfile(topCandidate)}`
    : "本周候选池已经看空了。";
  const teamCopy = topMember
    ? `组里目前最能打的是 ${topMember.name}。${describeMemberProfile(topMember)} ${candidateLine}`
    : `现在没人替你兜底。当前模型是 ${model.name}，但人手还是 0。${candidateLine}`;

  dom.modelFocusCard.innerHTML = `
    <p class="section-label">Lab Pulse</p>
    <h4>${topMember ? `${topMember.name} · ${getMemberTrait(topMember).label}` : model.name}</h4>
    <p>${teamCopy}</p>
    <div class="focus-meta">
      <span class="focus-pill">${state.members.length} 人在组</span>
      <span class="focus-pill">候选 ${state.candidatePool?.length || 0} 人</span>
      <span class="focus-pill">模型 ${model.name}</span>
      <span class="focus-pill">${getModelStatusLine(model)}</span>
    </div>
  `;
}

function renderTerminal() {
  dom.terminalLog.innerHTML = "";
  for (const line of state.terminal.slice(-12)) {
    const p = document.createElement("p");
    p.className = `terminal-line ${line.tone}`.trim();
    p.textContent = line.text;
    dom.terminalLog.appendChild(p);
  }
  dom.terminalLog.scrollTop = dom.terminalLog.scrollHeight;
}

function renderStats() {
  dom.statGrid.innerHTML = "";
  for (const config of statConfig) {
    const fragment = dom.statTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".stat-card");
    const value = clamp(state[config.key], 0, config.max);

    fragment.querySelector(".stat-name").textContent = config.label;
    fragment.querySelector(".stat-value").textContent = config.format(value);
    fragment.querySelector(".meter-fill").style.width = `${(value / config.max) * 100}%`;
    fragment.querySelector(".stat-help").textContent = config.help;

    if (
      (config.key === "risk" && value > 60) ||
      (config.key === "teamStress" && value > 70) ||
      (config.key === "mental" && value < 30) ||
      (config.key === "cash" && value < 12000)
    ) {
      card.style.borderColor = "rgba(176, 76, 52, 0.45)";
    }

    dom.statGrid.appendChild(fragment);
  }
}

function renderMissions() {
  dom.missionList.innerHTML = "";
  for (const mission of state.missions) {
    const fragment = dom.missionTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".mission-card");

    if (mission.completed) card.classList.add("completed");
    fragment.querySelector(".mission-title").textContent = mission.title;
    fragment.querySelector(".mission-reward").textContent = mission.rewardText;
    fragment.querySelector(".mission-desc").textContent = mission.desc;
    fragment.querySelector(".mission-status").textContent = mission.completed ? "Completed" : "In progress";

    dom.missionList.appendChild(fragment);
  }
}

function renderMembers() {
  dom.labRoster.innerHTML = "";

  if (state.members.length === 0) {
    dom.labSummary.textContent = `你现在是单兵作战。稳定，但没有任何被动增益，也没人替你先崩。本周候选池 ${state.candidatePool?.length || 0} 人。`;
    const empty = document.createElement("article");
    empty.className = "member-card";
    empty.innerHTML = `
      <div class="member-top">
        <div>
          <p class="member-role">Vacant</p>
          <h4 class="member-name">实验室空置</h4>
        </div>
        <span class="member-status warn">空房间</span>
      </div>
      <p class="member-quirk">没有人会拖延，也没有人会突然爆发。缺点是所有事都还是你自己来。</p>
    `;
    dom.labRoster.appendChild(empty);
    return;
  }

  const avgMorale = Math.round(average(state.members.map((member) => member.morale)));
  const avgBurnout = Math.round(average(state.members.map((member) => member.burnout)));
  dom.labSummary.textContent = `当前 ${state.members.length} 人，平均 morale ${avgMorale}，平均 burnout ${avgBurnout}。本周候选池还有 ${state.candidatePool?.length || 0} 人。`;

  for (const member of state.members) {
    const fragment = dom.memberTemplate.content.cloneNode(true);
    const statusNode = fragment.querySelector(".member-status");
    const trait = getMemberTrait(member);
    const ranks = getMemberAbilityRanks(member);
    fragment.querySelector(".member-role").textContent = ROLE_DEFS[member.role].label;
    fragment.querySelector(".member-name").textContent = member.name;
    fragment.querySelector(".member-quirk").textContent = `${trait.copy} ${member.quirk} ${describeMemberProfile(member)}`;

    const status = getMemberStatus(member);
    statusNode.textContent = status.label;
    statusNode.classList.add(status.className);

    const metrics = fragment.querySelector(".member-metrics");
    metrics.appendChild(metricRow("Pattern", trait.label));
    metrics.appendChild(metricRow("Best", `${ranks[0].label} ${ranks[0].value}`));
    metrics.appendChild(metricRow("Weak", `${ranks.at(-1).label} ${ranks.at(-1).value}`));
    metrics.appendChild(metricRow("Skill", `${member.skill}`));
    metrics.appendChild(metricRow("Morale", `${member.morale}`));
    metrics.appendChild(metricRow("Burnout", `${member.burnout}`));
    metrics.appendChild(metricRow("Upkeep", currency(ROLE_DEFS[member.role].stipend)));

    dom.labRoster.appendChild(fragment);
  }
}

function renderProjects() {
  dom.projectGrid.innerHTML = "";
  for (const project of state.projects) {
    const fragment = dom.projectTemplate.content.cloneNode(true);
    const article = fragment.querySelector(".project-card");
    if (project.id === state.activeProjectId) article.classList.add("active");

    fragment.querySelector(".project-field").textContent = project.field;
    fragment.querySelector(".project-title").textContent = project.title;
    fragment.querySelector(".project-summary").textContent = project.summary;
    fragment.querySelector(".select-project").addEventListener("click", () => {
      if (state.ended) return;
      state.activeProjectId = project.id;
      addFeed("focus", `主线项目切换为「${project.title}」。其他项目开始在后台继续制造 guilt。`);
      pushTerminal(`> focus switched: ${project.title}`, "prompt");
      setImpact(`你把主线切到了「${project.title}」。灵感回来了，烂尾也没消失。`);
      refreshWeeklyContent();
      persistAndRender();
    });

    const metrics = fragment.querySelector(".project-metrics");
    metrics.appendChild(metricRow("Progress", `${project.progress}%`));
    metrics.appendChild(metricRow("Novelty", `${project.novelty}%`));
    metrics.appendChild(metricRow("Correctness", `${project.correctness}%`));
    metrics.appendChild(metricRow("Polish", `${project.polish}%`));

    const bars = fragment.querySelector(".project-bars");
    bars.appendChild(barRow("Project completion", project.progress));
    bars.appendChild(barRow("Scientific correctness", project.correctness));
    bars.appendChild(barRow("Narrative polish", project.polish));

    dom.projectGrid.appendChild(fragment);
  }
}

function renderModels() {
  dom.modelGrid.innerHTML = "";
  for (const model of MODEL_MARKET) {
    const fragment = dom.modelTemplate.content.cloneNode(true);
    const article = fragment.querySelector(".model-card");
    const intel = getModelIntel(model.id);
    if (model.id === state.selectedModelId) article.classList.add("active");

    fragment.querySelector(".model-tier").textContent = model.tier;
    fragment.querySelector(".model-name").textContent = model.name;
    fragment.querySelector(".model-copy").textContent = model.copy;
    fragment.querySelector(".select-model").addEventListener("click", () => {
      if (state.ended) return;
      state.selectedModelId = model.id;
      addFeed("model", `你启用了 ${model.name}。宣传页都说自己稳，口碑只能靠组里慢慢试出来。`);
      pushTerminal(`> model switched: ${model.name}`, "prompt");
      setImpact(`当前模型：${model.name}。它到底值不值，得看这几周怎么烧。`);
      persistAndRender();
    });

    const metrics = fragment.querySelector(".model-metrics");
    metrics.appendChild(metricRow("Lab Notes", getModelStatusLine(model)));
    metrics.appendChild(metricRow("Budget Feel", getModelBudgetVibe(model, intel)));
    metrics.appendChild(metricRow("Infra Feel", getModelInfraVibe(model, intel)));
    metrics.appendChild(metricRow("Output Feel", getModelOutputVibe(model, intel)));

    dom.modelGrid.appendChild(fragment);
  }
}

function renderEngine() {
  renderWeeklyBet();
  renderPressureCard();
  renderComboCard();
  renderPerkCard();
}

function renderWeeklyBet() {
  const bet = state.weeklyBet;
  const offers = state.weeklyBetOffers || [];
  if (!bet && offers.length) {
    const offerHtml = offers
      .map(
        (offer, index) => `
          <div class="engine-choice">
            <div class="engine-choice-top">
              <h5>${offer.title}</h5>
              <span class="engine-choice-reward">${offer.rewardText}</span>
            </div>
            <p>${offer.copy}</p>
            <div class="engine-meta">
              <span class="engine-pill">失败：${offer.penaltyText}</span>
            </div>
            <div class="engine-button-row">
              <button class="ghost-button" data-bet-offer="${index}">选这张</button>
            </div>
          </div>
        `
      )
      .join("");

    dom.betCard.innerHTML = `
      <p class="section-label">Weekly Bet</p>
      <h4>先选这周怎么赌</h4>
      <p>每周三选一。你不是在被动做管理，你是在主动定这周的节奏和奖励。</p>
      <div class="engine-choice-grid">${offerHtml}</div>
    `;

    for (const button of dom.betCard.querySelectorAll("[data-bet-offer]")) {
      button.addEventListener("click", () => {
        const picked = offers[Number(button.dataset.betOffer)];
        state.weeklyBet = { ...picked, accepted: true, completed: false, failed: false };
        state.weeklyBetOffers = [];
        addFeed("bet", `你把本周押注定成了「${picked.title}」。这周终于像一手真正要打的牌。`);
        setImpact(`本周押注已选：${picked.title}`);
        persistAndRender();
      });
    }
    return;
  }

  if (!bet) {
    dom.betCard.innerHTML = `
      <p class="section-label">Weekly Bet</p>
      <h4>本周没有押注</h4>
      <p>如果你主动跳过，这周会更稳，但也少一点明确节奏和额外奖励。</p>
    `;
    return;
  }

  const statusText = bet.accepted
    ? bet.completed
      ? "已完成"
      : bet.failed
        ? "已失败"
        : "进行中"
    : "可接受";

  dom.betCard.innerHTML = `
    <p class="section-label">Weekly Bet</p>
    <h4>${bet.title}</h4>
    <p>${bet.copy}</p>
    <div class="engine-meta">
      <span class="engine-pill">${statusText}</span>
      <span class="engine-pill">奖励：${bet.rewardText}</span>
      <span class="engine-pill">失败：${bet.penaltyText}</span>
    </div>
  `;
}

function renderPressureCard() {
  const review = getUpcomingReview();
  if (!review) {
    dom.pressureCard.innerHTML = `
      <p class="section-label">Pressure Track</p>
      <h4>没有下一轮 review 了</h4>
      <p>剩下的就是终局。系统不再提醒你，它只会记总账。</p>
      <div class="engine-meta">
        <span class="engine-pill">Passed ${state.reviewsPassed}</span>
        <span class="engine-pill">Failed ${state.reviewsFailed}</span>
      </div>
    `;
    return;
  }

  const weeksAway = review.week - state.week;
  const healthy = review.check();
  const countdown = weeksAway === 1 ? "下周触发" : `${weeksAway} 周后`;
  const status = healthy ? "当前能过" : weeksAway <= 1 ? "现在会翻车" : "还没准备好";

  dom.pressureCard.innerHTML = `
    <p class="section-label">Pressure Track</p>
    <h4>${review.title}</h4>
    <p>${review.copy}</p>
    <div class="engine-meta">
      <span class="engine-pill">${review.kicker}</span>
      <span class="engine-pill">${countdown}</span>
      <span class="engine-pill">${status}</span>
    </div>
    <div class="engine-list">
      <div class="engine-list-item"><strong>过关条件</strong><span>${review.requirement}</span></div>
      <div class="engine-list-item"><strong>通过 / 翻车</strong><span>${review.passText} / ${review.failText}</span></div>
    </div>
  `;
}

function renderTacticalHand() {
  if (!state) return;
  const hand = getTacticalHand();
  dom.tacticalGrid.innerHTML = "";

  if (!hand.length) {
    if (!state.weeklyBet && state.weeklyBetOffers?.length) {
      dom.tacticalGrid.innerHTML = `
        <article class="tactical-card empty">
          <span class="action-tag">Agenda</span>
          <strong>先在右侧选一张周押注</strong>
          <small>这周的额外奖励和玩法节奏，先由这一步决定。</small>
        </article>
        <article class="tactical-card empty">
          <span class="action-tag">Loop</span>
          <strong>选完再打一手顺序</strong>
          <small>通常是补燃料或冲主线起手，然后立刻接核验或 benchmark。</small>
        </article>
        <article class="tactical-card empty">
          <span class="action-tag">Boss</span>
          <strong>别忘了看阶段 review</strong>
          <small>下一次 budget、lab 或 integrity review 会决定你是不是白忙。</small>
        </article>
      `;
      return;
    }
    dom.tacticalGrid.innerHTML = `
      <article class="tactical-card empty">
        <span class="action-tag">Idle</span>
        <strong>这周没有明确手牌</strong>
        <small>通常说明你该结束本周，等系统出下一手。</small>
      </article>
    `;
    return;
  }

  for (const entry of hand) {
    const meta = ACTION_META[entry.action];
    const button = document.createElement("button");
    button.className = "tactical-card";
    button.disabled = state.actionsLeft === 0 || state.ended;
    button.innerHTML = `
      <span class="action-tag">${meta.tag}</span>
      <strong>${meta.label}</strong>
      <small>${entry.copy}</small>
      ${renderActionPreviewChips(entry.action, true)}
      <div class="tactical-badges">${entry.tags.map((tag) => `<span class="tactical-badge">${tag}</span>`).join("")}</div>
    `;
    button.addEventListener("click", () => handleAction(entry.action));
    dom.tacticalGrid.appendChild(button);
  }
}

function renderComboCard() {
  const lastCombo = state.lastCombo;
  const buffs = state.activeBuffs || [];
  const buffHtml = buffs.length
    ? buffs
        .map((buff) => `<div class="engine-list-item"><strong>${buff.name}</strong><span>${buff.copy}</span></div>`)
        .join("")
    : `<div class="engine-list-item"><strong>本周还没打出连招</strong><span>试试把“补燃料”和“冲进度”连起来，或者在推进后立刻做核验。</span></div>`;

  dom.comboCard.innerHTML = `
    <p class="section-label">Combo Engine</p>
    <h4>${lastCombo ? lastCombo.name : "连招还没启动"}</h4>
    <p>${lastCombo ? lastCombo.copy : "顺序很重要。对的两步连在一起，会比单独点两次更值钱。"}</p>
    <div class="engine-list">${buffHtml}</div>
  `;
}

function renderPerkCard() {
  const perks = state.perks || [];
  const perkHtml = perks.length
    ? perks
        .map((perkId) => {
          const perk = PERK_DEFS[perkId];
          return `<div class="engine-list-item"><strong>${perk.name}</strong><span>${perk.copy}</span></div>`;
        })
        .join("")
    : `<div class="engine-list-item"><strong>还没有永久被动</strong><span>中基金、做内审、稳住团队、发出第一篇之后，run 会开始滚雪球。</span></div>`;

  dom.perkCard.innerHTML = `
    <p class="section-label">Perk Rack</p>
    <h4>${perks.length ? `已解锁 ${perks.length} 个被动` : "成长还没成型"}</h4>
    <p>这些被动会让后续每周更强，也会让 run 更像一局完整的 roguelite。</p>
    <div class="engine-list">${perkHtml}</div>
  `;
}

function renderOpportunity() {
  const event = state.currentEvent;
  if (!event) {
    dom.opportunityCard.innerHTML = "";
    return;
  }

  if (event.resolved) {
    dom.opportunityCard.innerHTML = `
      <div class="opportunity-top">
        <span class="section-label">Weekly Event</span>
        <strong>已处理</strong>
      </div>
      <h4>${event.title}</h4>
      <p>${event.resultText}</p>
    `;
    return;
  }

  const choiceHtml = event.choices
    .map(
      (choice, index) => `
        <button class="choice-button" data-choice-index="${index}">
          <strong>${choice.label}</strong>
          <small>${choice.description}</small>
        </button>
      `
    )
    .join("");

  dom.opportunityCard.innerHTML = `
    <div class="opportunity-top">
      <span class="section-label">Weekly Event</span>
      <strong>${event.kicker}</strong>
    </div>
    <h4>${event.title}</h4>
    <p>${event.body}</p>
    <div class="choice-grid">${choiceHtml}</div>
  `;

  for (const button of dom.opportunityCard.querySelectorAll("[data-choice-index]")) {
    button.addEventListener("click", () => resolveEventChoice(Number(button.dataset.choiceIndex)));
  }
}

function renderFeed() {
  dom.eventFeed.innerHTML = "";
  for (const item of [...state.feed].reverse()) {
    const fragment = dom.feedTemplate.content.cloneNode(true);
    fragment.querySelector(".feed-week").textContent = `Week ${item.week}`;
    fragment.querySelector(".feed-tag").textContent = item.tag;
    fragment.querySelector(".feed-text").textContent = item.text;
    dom.eventFeed.appendChild(fragment);
  }
}

function renderGuide() {
  const guide = getGuideState();
  dom.guideTitle.textContent = guide.title;
  dom.guideCopy.textContent = guide.copy;
  dom.guideTags.innerHTML = guide.tags.map((tag) => `<span class="guide-tag">${tag}</span>`).join("");
  dom.guideChecklist.innerHTML = guide.steps
    .map(
      (step, index) => `
        <article class="guide-step ${step.status}">
          <strong>${index + 1}</strong>
          <div>
            <h4>${step.title}</h4>
            <p>${step.copy}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function renderShareCard() {
  if (!state) {
    dom.shareKicker.textContent = "Current Run";
    dom.shareTitle.textContent = "新晋青椒，实验室尚未爆炸";
    dom.shareCopy.textContent = "目前正在用 Frontier Pro 推项目。供应商说得都很好听，实验室还在自己试。";
    dom.shareCard.classList.toggle("poster", sharePosterMode);
    dom.shareCard.dataset.tone = "paper";
    dom.shareMetrics.innerHTML = "";
    return;
  }
  dom.shareKicker.textContent = state.ended ? "Run Result" : "Current Run";
  dom.shareTitle.textContent = buildShareTitle();
  dom.shareCopy.textContent = buildShareBody();
  dom.shareCard.classList.toggle("poster", sharePosterMode);
  dom.shareCard.dataset.tone = getShareTone();
  dom.shareMetrics.innerHTML = "";
  dom.shareMetrics.appendChild(metricRow("Papers", `${state.papersPublished}`));
  dom.shareMetrics.appendChild(metricRow("Grants", `${state.grantsWon}`));
  dom.shareMetrics.appendChild(metricRow("Members", `${state.members.length}`));
  dom.shareMetrics.appendChild(metricRow("Audits", `${state.auditsRun}`));
  dom.shareMetrics.appendChild(metricRow("Shortcuts", `${state.salamiPapers + state.shortcutDeals}`));
  dom.shareMetrics.appendChild(metricRow("Risk", `${state.risk}`));
  dom.shareMetrics.appendChild(metricRow("Contract", `${state.contract}w`));
}

function renderRecruitOverlay() {
  if (!dom.recruitOverlay) return;
  const active = Boolean(state && recruitOverlayOpen && !state.ended);
  dom.recruitOverlay.classList.toggle("hidden", !active);
  dom.recruitOverlay.setAttribute("aria-hidden", active ? "false" : "true");
  if (!active) return;

  const candidates = state.candidatePool || [];
  dom.recruitTitle.textContent = `本周候选池 · ${candidates.length} 人待看`;
  dom.recruitCopy.textContent = `录用才会扣 1 个行动点。你能看到能力分布和推荐信，但真实 trait 要进组后才算真的揭示。剩余刷新 ${state.candidateRefreshes} 次。`;
  dom.refreshCandidates.disabled = state.candidateRefreshes <= 0 || state.ended;

  dom.candidateGrid.innerHTML = "";
  for (const candidate of candidates) {
    const ranks = getMemberAbilityRanks(candidate);
    const hireDisabled = state.actionsLeft === 0 || state.members.length >= 4 || state.cash < candidate.hireCost || state.ended;
    const card = document.createElement("article");
    card.className = "candidate-card";
    card.innerHTML = `
      <div class="candidate-top">
        <div>
          <p class="member-role">${ROLE_DEFS[candidate.role].label}</p>
          <h3>${candidate.name}</h3>
        </div>
        <span class="candidate-cost">签约 ${currency(candidate.hireCost)}</span>
      </div>
      <p class="candidate-copy">${describeCandidateProfile(candidate)}</p>
      <div class="candidate-abilities">
        ${ranks
          .map(
            (item) => `
              <div class="candidate-ability">
                <span>${item.label}</span>
                <strong>${item.value}</strong>
              </div>
            `
          )
          .join("")}
      </div>
      <p class="candidate-note">推荐信：${getCandidateScoutNote(candidate)}</p>
      <div class="candidate-actions">
        <div class="candidate-salary">
          <span class="candidate-cost">Upkeep ${currency(ROLE_DEFS[candidate.role].stipend)}</span>
          <span class="candidate-cost">Skill ${candidate.skill}</span>
        </div>
        <button class="primary-button" data-hire-id="${candidate.id}" ${hireDisabled ? "disabled" : ""}>录用</button>
      </div>
    `;
    dom.candidateGrid.appendChild(card);
  }

  if (!candidates.length) {
    const empty = document.createElement("article");
    empty.className = "candidate-card";
    empty.innerHTML = `
      <p class="overlay-kicker">No Candidates</p>
      <h3>这一周的候选池已经清空</h3>
      <p class="candidate-copy">你可以刷新一次名单，或者先把钱和情绪留到下周。</p>
    `;
    dom.candidateGrid.appendChild(empty);
  }

  for (const button of dom.candidateGrid.querySelectorAll("[data-hire-id]")) {
    button.addEventListener("click", () => hireCandidate(button.dataset.hireId));
  }
}

function renderActionPreviewChips(action, compactMode = false) {
  const preview = getActionPreview(action);
  const items = compactMode ? preview.slice(0, 3) : preview;
  return `
    <div class="action-preview">
      ${items.map((item) => `<span class="action-preview-chip ${item.tone}">${item.label}</span>`).join("")}
    </div>
  `;
}

function renderActions() {
  if (!dom.actionFilterBar || !dom.actionDeck) return;
  const guide = state ? getGuideState() : null;
  const disabled = !state || state.ended;

  dom.actionFilterBar.innerHTML = "";
  for (const filter of ACTION_FILTERS) {
    const button = document.createElement("button");
    button.className = `action-filter ${filter.id === activeActionDeckTab ? "active" : ""}`.trim();
    button.textContent = filter.label;
    button.disabled = !state;
    button.addEventListener("click", () => {
      activeActionDeckTab = filter.id;
      renderActions();
    });
    dom.actionFilterBar.appendChild(button);
  }

  dom.actionDeck.innerHTML = "";
  const actions = getActionDeckActions(activeActionDeckTab, guide);
  for (const action of actions) {
    const meta = ACTION_META[action];
    const button = document.createElement("button");
    const category = getActionDeckCategory(action);
    const classes = ["action-deck-card"];
    if (guide?.recommendedActions.includes(action)) classes.push("recommended");
    if (action === "salamiSlice") classes.push("risk");
    if (action === "submitPaper") classes.push("submit");
    button.className = classes.join(" ");
    button.disabled = disabled;
    button.innerHTML = `
      <span class="action-tag">${meta.tag}</span>
      <strong>${meta.label}</strong>
      <small>${meta.copy}</small>
      ${renderActionPreviewChips(action)}
      <div class="tactical-badges">
        <span class="tactical-badge">${ACTION_FILTERS.find((item) => item.id === category)?.label || meta.tag}</span>
        ${guide?.recommendedActions.includes(action) ? '<span class="tactical-badge">推荐</span>' : ""}
      </div>
    `;
    button.addEventListener("click", () => handleAction(action));
    dom.actionDeck.appendChild(button);
  }

  dom.advanceWeek.disabled = !state || Boolean(state.ended);
}

function handleAction(action) {
  if (!state || state.ended) return;
  if (state.actionsLeft === 0) {
    fail("本周行动点已经用完。你现在只能进入下一周。");
    return;
  }

  if (action === "recruit") {
    openRecruitOverlay();
    return;
  }

  const project = getActiveProject();
  const model = getActiveModel();
  const teamFactor = getTeamFactor();

  const actions = {
    buyTokens() {
      if (state.cash < 5000) {
        fail("现金不足，买不起 tokens。");
        return false;
      }
      state.cash -= 5000;
      state.tokens += 24000;
      state.mental -= 2;
      state.teamStress += 1;
      pushTerminal("> procurement approved: +24000 tokens", "prompt");
      addFeed("finance", "你又把现金换成了 tokens。实验室越来越像高频交易系统。");
      setImpact("你补了一大管 tokens，但 cash 更薄了。");
      return true;
    },
    buyCompute() {
      if (state.cash < 8000) {
        fail("现金不足，租不起像样的算力。");
        return false;
      }
      state.cash -= 8000;
      state.compute += 24;
      state.mental -= 1;
      pushTerminal("> compute lease acquired: +24 GPU-hours", "prompt");
      addFeed("cluster", "你买了一批算力。tokens 负责想法，GPU 负责把想法变成真的账单。");
      setImpact("你补了算力。现在至少能把漂亮想法真的跑一遍。");
      return true;
    },
    literature() {
      const specialist = getActionSpecialistBonus("literature");
      const prep = prepareModelAction({ baseTokens: 1800, mental: 2 }, model);
      if (!prep) return false;
      project.progress += scaled(8, model.progressMult * teamFactor * specialist, prep.outputMult);
      project.novelty += scaled(4, 1, prep.outputMult);
      project.polish += scaled(4, model.polishMult * specialist, prep.outputMult);
      state.risk += scaled(4, model.riskMult, 1);
      state.teamStress += 2;
      pushTerminal(`scan literature --model ${model.id} --project ${project.id}`);
      addFeed("agent", "AI 很快吐出一份像模像样的 related work。问题不是它会不会写，而是你会不会信。");
      setImpact(prep.stalled ? "平台队列卡住了。tokens 在烧，输出在爬。" : "文献扫描推进了项目，也悄悄抬高了幻觉风险。");
      return true;
    },
    prototype() {
      const specialist = getActionSpecialistBonus("prototype");
      const prep = prepareModelAction({ baseTokens: 4200, compute: 8, mental: 4 }, model);
      if (!prep) return false;
      project.progress += scaled(16, model.progressMult * teamFactor * specialist, prep.outputMult);
      project.polish += scaled(5, model.polishMult, prep.outputMult);
      project.correctness += scaled(randomBetween(2, 7), model.correctnessMult * teamFactor * specialist, prep.outputMult);
      state.risk += scaled(12, model.riskMult, 1);
      state.teamStress += 8;
      pushTerminal(`build prototype --model ${model.id} --compute heavy`);
      addFeed("build", "Agent 帮你把 implementation 压缩成几个小时，GPU 帮你把预算压缩成一缕青烟。");
      setImpact(prep.stalled ? "模型本身不差，但对面的卡不够。你花了钱，没拿到该有的速度。" : "你冲了一个大步，同时也给未来的 debug 债加了杠杆。");
      return true;
    },
    draftPaper() {
      const specialist = getActionSpecialistBonus("draftPaper");
      const prep = prepareModelAction({ baseTokens: hasPerk("template-stack") ? 5200 : 6000, mental: 5 }, model);
      if (!prep) return false;
      project.progress += scaled(9, model.progressMult * specialist, prep.outputMult);
      project.polish += scaled(18 + (hasPerk("template-stack") ? 4 : 0), model.polishMult * teamFactor * specialist, prep.outputMult);
      project.correctness += scaled(2, model.correctnessMult * specialist, prep.outputMult);
      state.risk += scaled(10, model.riskMult, 1);
      state.reputation += 1;
      state.teamStress += 6;
      pushTerminal(`draft manuscript --model ${model.id} --target journal`);
      addFeed("writing", "论文初稿的语气已经像要中顶刊。问题是，语言成熟得比证据更快。");
      setImpact(prep.stalled ? "稿子没来得及吐完，平台先告诉你他们今晚 GPU 紧张。" : "稿子更像论文了，但并不自动更像真理。");
      return true;
    },
    verify() {
      const specialist = getActionSpecialistBonus("verify");
      if (!consume({ judgment: 1, mental: 3 })) return false;
      project.correctness += Math.round(12 * specialist);
      state.risk -= Math.round(16 * specialist);
      project.polish -= 2;
      state.weekFlags.verified = true;
      pushTerminal("> manual verification: benchmark, citation, edge-case review");
      addFeed("filter", "你花掉一点 judgment，把一个看起来极合理的错误提前掐死。");
      setImpact("这步不炫，但它能阻止整局朝错误方向高速推进。");
      return true;
    },
    benchmark() {
      const specialist = getActionSpecialistBonus("benchmark");
      if (!consume({ judgment: 1, compute: 10, mental: 6 })) return false;
      project.correctness += scaled(16 + state.modifiers.benchmarkBonus, teamFactor * specialist, 1);
      project.progress += Math.round(4 * specialist);
      state.risk -= Math.round(8 * specialist);
      state.teamStress += 3;
      state.weekFlags.benchmarked = true;
      pushTerminal(`run benchmark --project ${project.id} --compute reserved`);
      addFeed("science", "benchmark 跑完了。结果不一定更好看，但至少更像真的科学。");
      setImpact("你用一点时间和算力，换来了真正更可靠的结果。");
      return true;
    },
    grant() {
      const specialist = getActionSpecialistBonus("grant");
      const prep = prepareModelAction({ baseTokens: 2600, mental: 5 }, model);
      if (!prep) return false;
      const successChance = 0.42 + state.reputation / 260 + (model.correctnessMult - 1) * 0.1 + (specialist - 1) * 0.28 - state.modifiers.grantPenalty;
      if (Math.random() < successChance) {
        const grantOfficeBonus = hasPerk("grant-office") ? 1.18 : 1;
        const award = Math.round(randomBetween(22000, 52000) * grantOfficeBonus * specialist);
        state.cash += award;
        state.reputation += 4 + (hasPerk("grant-office") ? 1 : 0);
        state.grantsWon += 1;
        state.weekFlags.grantWon = true;
        pushTerminal("> grant decision: funded", "prompt");
        addFeed("funding", `基金中了，到账 ${currency(award)}。你短暂地产生了自己正在掌控局面的错觉。`);
        setImpact("基金到账了。你终于能同时买模型、买算力、买一点体面。");
      } else {
        state.mental -= 8;
        state.reputation -= 1;
        state.risk += 2;
        pushTerminal("> grant decision: declined", "error");
        addFeed("funding", prep.stalled ? "基金没中，顺便平台还让你在队列里等了很久。" : "基金没中。系统建议你休息，现实建议你重写摘要。");
        setImpact("基金没中。你没有失去方向，你失去的是气血。");
      }
      return true;
    },
    auditLab() {
      const specialist = getActionSpecialistBonus("auditLab");
      const auditMental = hasPerk("red-team") ? 2 : 4;
      if (!consume({ judgment: 1, mental: auditMental })) return false;
      let catches = 0;
      project.correctness += Math.round((5 + (hasPerk("red-team") ? 2 : 0)) * specialist);
      state.risk -= Math.round(12 * specialist);
      state.auditsRun += 1;
      state.weekFlags.audited = true;

      for (const member of state.members) {
        if (member.traitId === "fabricator" && Math.random() < 0.58) {
          catches += 1;
          state.risk -= 8;
          state.teamStress += 5;
          member.morale -= 5;
          addFeed("audit", `你在内部审计里抓到 ${member.name} 提交的图和原始记录对不上。事故没有公开，但实验室气氛先冷了。`);
        }
        if (member.traitId === "ghost-writer" && Math.random() < 0.34) {
          catches += 1;
          project.polish -= 2;
          project.correctness += 3;
          addFeed("audit", `${member.name} 写得太像回事，反而让你在内审里翻出了几处证据空洞。`);
        }
      }

      pushTerminal("> internal audit: figures / code / authorship / citations", "prompt");
      if (catches) {
        state.reputation += state.modifiers.auditBonus;
        setImpact(`内部审计抓出了 ${catches} 处潜在事故。很伤人，但比上热搜便宜。`);
      } else {
        state.reputation += 1 + state.modifiers.auditBonus;
        setImpact("你做了一轮内部审计，没抓到大雷。心累，但睡得会稍微稳一点。");
      }
      return true;
    },
    salamiSlice() {
      if (project.progress < 48 || project.polish < 18) {
        fail("材料还不够熟，现在连切片灌水都切不出体面来。");
        return false;
      }
      if (!consume({ mental: 3 })) return false;
      state.salamiPapers += 1;
      state.weekFlags.salami = true;
      state.papersPublished += 1;
      state.cash += 3000 + state.modifiers.shortcutCash;
      state.reputation += 2;
      state.risk += 12 + state.modifiers.shortcutPenalty;
      state.teamStress += 5;
      project.progress -= 14;
      project.novelty -= 12;
      project.correctness -= 5;
      project.polish += 4;
      pushTerminal("> salami-slice manuscript queued", "warn");
      addFeed("shortcut", "你把一块还没完全做透的工作切成了一篇可投的小稿。数字涨了，科学不一定。");
      setImpact("你多了一篇，代价是风险和自我说服能力一起上升。");
      return true;
    },
    rest() {
      state.mental += 12;
      state.risk -= 4;
      state.teamStress -= 6;
      for (const member of state.members) {
        member.morale += 4;
        member.burnout -= 4;
      }
      pushTerminal("> scheduled maintenance: sleep / walk / ignore inbox");
      addFeed("recovery", "你终于暂停了几小时。科学没有前进，但至少人还在。");
      setImpact("你没有推进项目，但你保住了后面还能继续推进项目的自己。");
      return true;
    },
    mentor() {
      const specialist = getActionSpecialistBonus("mentor");
      if (!consume({ cash: 2000, mental: 2 })) return false;
      state.teamStress -= Math.round((14 + state.modifiers.mentorBoost + (hasPerk("lab-culture") ? 6 : 0)) * specialist);
      state.reputation += 1;
      state.weekFlags.mentored = true;
      for (const member of state.members) {
        member.morale += Math.round(12 * specialist);
        member.burnout -= Math.round(10 * specialist);
      }
      pushTerminal("> lab meeting scheduled: reassurance mode enabled");
      addFeed("lab", "你花了一个回合安抚学生、开组会、画一点不完全兑现的长期愿景。情绪价值也是 labor。");
      setImpact("你没有产论文，但你阻止了实验室先于项目崩溃。");
      return true;
    },
    submitPaper() {
      const specialist = getActionSpecialistBonus("submitPaper");
      if (project.progress < 72) {
        fail("项目进度太低，现在投稿只会制造新的羞耻。");
        return false;
      }

      state.weekFlags.submitted = true;
      const previousAction = state.actionHistoryWeek[state.actionHistoryWeek.length - 1];
      const truthTimingBonus = getActionCategory(previousAction) === "truth" ? 14 : 0;
      const submissionBuff = consumeBuff("submission-window");
      const score =
        project.correctness +
        project.polish +
        project.novelty -
        state.risk +
        Math.floor(state.reputation / 5) -
        Math.floor(state.teamStress / 6) +
        truthTimingBonus +
        (submissionBuff ? 18 : 0) +
        Math.round((specialist - 1) * 18);

      if (score > 155) {
        state.reputation += 10;
        state.cash += 12000;
        state.mental -= 4;
        state.papersPublished += 1;
        maybeGraduateMember();
        resetProject(project, true);
        pushTerminal("> submission result: accepted with minor revisions", "prompt");
        addFeed("publication", "你安全过稿了。真正的收益不是 paper，而是你没有被漂亮幻觉带沟里。");
        setImpact("接收。你这次不仅快，而且没炸。");
      } else if (score > 125) {
        state.reputation += 4;
        state.mental -= 8;
        project.progress -= 10;
        project.polish += 4;
        state.teamStress += 5;
        pushTerminal("> submission result: revise and resubmit", "warn");
        addFeed("review", "审稿人说思路有趣，但要求你把所有看起来理所当然的东西重新证明一遍。");
        setImpact("大修。论文还活着，但你这周剩下的心态不一定。");
      } else {
        state.reputation -= 5;
        state.mental -= 12;
        state.risk += 8;
        project.progress -= 14;
        state.teamStress += 7;
        pushTerminal("> submission result: rejected", "error");
        addFeed("review", "稿件被拒。坏消息是审稿人抓到了问题。好消息是你还没公开翻车。");
        setImpact("拒稿。现在的问题不是面子，而是接下来要不要把锅重新拆开。");
      }
      if (submissionBuff || truthTimingBonus) {
        setLastCombo("Actually Ready", "你在核验和投稿之间没有发散，这次的提交因此更扎实。");
      }
      return true;
    },
  };

  const success = actions[action]();
  if (!success) return;
  finalizeAction(action, project);
}

function finalizeAction(action, project = getActiveProject()) {
  triggerActionSystems(action, project);
  state.actionsLeft -= 1;
  checkPerkUnlocks();
  normalizeState();
  checkMissionCompletion();
  maybeCheckEnd();
  persistAndRender();
}

function openRecruitOverlay() {
  if (state.members.length >= 4) {
    fail("实验室已经满编。更多人不会自动让系统更可控。");
    return;
  }
  if (!state.candidatePool?.length) {
    state.candidatePool = generateCandidatePool();
    state.candidateRefreshes = Math.max(state.candidateRefreshes, 1);
  }
  recruitOverlayOpen = true;
  renderRecruitOverlay();
}

function closeRecruitOverlay() {
  if (dom.recruitOverlay?.contains(document.activeElement)) {
    document.activeElement.blur();
  }
  recruitOverlayOpen = false;
  renderRecruitOverlay();
}

function rerollCandidatePool() {
  if (!state || state.ended || state.candidateRefreshes <= 0) return;
  if (state.cash < 1500) {
    fail("现金不够刷新候选名单。");
    return;
  }
  state.cash -= 1500;
  state.candidateRefreshes -= 1;
  state.candidatePool = generateCandidatePool();
  addFeed("hiring", "你花了一点钱重刷候选名单。学术招聘像 gacha，只是没有保底。");
  setImpact("候选池已刷新。你买到的是新希望，还是新坑，还得再看。");
  persistAndRender();
}

function hireCandidate(candidateId) {
  if (!state || state.ended) return;
  const candidate = state.candidatePool.find((entry) => entry.id === candidateId);
  if (!candidate) return;
  if (state.members.length >= 4) {
    fail("实验室已经满编。");
    return;
  }
  if (!consume({ cash: candidate.hireCost, mental: 2 })) return;

  const trait = getMemberTrait(candidate);
  state.members.push(candidate);
  state.candidatePool = state.candidatePool.filter((entry) => entry.id !== candidateId);
  state.teamStress += 5;
  state.weekFlags.recruited = true;
  if (dom.recruitOverlay?.contains(document.activeElement)) {
    document.activeElement.blur();
  }
  recruitOverlayOpen = false;
  pushTerminal(`> recruited: ${candidate.name} (${ROLE_DEFS[candidate.role].label}, ${trait.label})`, "prompt");
  addFeed("hiring", `你把 ${candidate.name} 招进了组。${describeMemberProfile(candidate)} 推荐信没有骗你全部，但也没告诉你全部。`);
  setImpact(`新成员 ${candidate.name} 入组。已揭示 trait：${trait.label}。${describeMemberProfile(candidate)}`);
  finalizeAction("recruit");
}

function advanceWeek() {
  recruitOverlayOpen = false;
  if (state.currentEvent && !state.currentEvent.resolved) {
    state.reputation -= 2;
    addFeed("missed", `你跳过了事件「${state.currentEvent.title}」。系统把你的犹豫折算成机会成本。`);
  }

  evaluateWeeklyBet();

  const project = getActiveProject();
  const upkeep = state.members.reduce((sum, member) => sum + ROLE_DEFS[member.role].stipend, 0);

  state.week += 1;
  state.runtime = `Week ${state.week}`;
  state.contract -= 1;
  state.actionCap = state.baseActionCap + state.bonusActionsNextWeek;
  state.actionsLeft = state.actionCap;
  state.bonusActionsNextWeek = 0;
  state.tokens -= 1200;
  state.mental -= 3;
  state.risk += 2;
  state.cash -= upkeep;
  state.teamStress += Math.max(1, state.members.length * 2);

  if (state.cash < 0) {
    state.mental -= 6;
    state.reputation -= 2;
    addFeed("finance", "实验室现金跌破 0。现实世界开始用另一种方式教你什么叫科研独立。");
  }

  runLabCycle(project);
  maybeRunCheckpointReview();

  if (Math.random() < 0.45) {
    addFeed("ambient", sample(ambientEvents()));
  }

  pushTerminal(`> tick week=${state.week} | burn-rate updated`, "prompt");
  state.weekFlags = freshWeekFlags();
  state.actionHistoryWeek = [];
  state.activeBuffs = [];
  state.lastCombo = null;
  refreshWeeklyContent();
  state.weeklyBet = null;
  state.weeklyBetOffers = generateWeeklyBetOffers();
  state.candidatePool = generateCandidatePool();
  state.candidateRefreshes = 1;
  normalizeState();
  maybeCheckEnd();
  persistAndRender();
}

function runLabCycle(project) {
  const removed = [];

  for (const member of state.members) {
    const passive = Math.max(1, Math.round((member.skill / 38) * (member.morale / 100) * (0.78 + (member.abilities.stability || 50) / 180)));
    const role = ROLE_DEFS[member.role];
    const theoryBonus = 0.38 + (member.abilities.theory || 50) / 170;
    const rigorBonus = 0.22 + (member.abilities.rigor || 50) / 220;
    const writingBonus = 0.16 + (member.abilities.writing || 50) / 230;

    project.progress += Math.round(passive * role.progressBias * theoryBonus);
    project.correctness += Math.round(passive * role.correctnessBias * rigorBonus);
    project.polish += Math.round(passive * role.polishBias * writingBonus);
    if (role.computeBias) state.compute += Math.round(role.computeBias * ((member.abilities.compute || 50) / 65));
    applyMemberTrait(member, project);

    const stabilityFactor = clamp(1.22 - (member.abilities.stability || 50) / 170, 0.76, 1.3);
    member.morale -= Math.round((state.teamStress / 18 + randomBetween(0, 3)) * stabilityFactor);
    member.burnout += Math.round((state.teamStress / 14 + randomBetween(1, 4)) * stabilityFactor);

    if (state.weekFlags.mentored) {
      member.morale += 6;
      member.burnout -= 5;
    }

    if (member.burnout >= 92 || member.morale <= 14) {
      removed.push(member.id);
      state.membersLost += 1;
      state.reputation -= 3;
      state.teamStress -= 8;
      addFeed("lab", `${member.name} 选择离开实验室。系统把这叫流动性，你知道这叫损失。`);
    }
  }

  state.members = state.members.filter((member) => !removed.includes(member.id));
}

function refreshWeeklyContent() {
  state.missions = generateWeeklyMissions();
  state.currentEvent = generateWeeklyEvent();
  if (!state.candidatePool) state.candidatePool = generateCandidatePool();
}

function checkMissionCompletion() {
  const project = getActiveProject();
  for (const mission of state.missions) {
    if (mission.completed) continue;
    if (!mission.check(state, project)) continue;
    mission.completed = true;
    mission.reward(state, project);
    pushTerminal(`> mission completed: ${mission.title}`, "prompt");
    addFeed("mission", `完成任务「${mission.title}」，获得奖励：${mission.rewardText}。`);
    setImpact(`任务完成：${mission.title}。${mission.rewardText}。`);
  }
}

function resolveEventChoice(index) {
  const event = state.currentEvent;
  if (!event || event.resolved) return;
  const choice = event.choices[index];
  choice.apply(state, getActiveProject());
  event.resolved = true;
  event.resultText = choice.resultText;
  pushTerminal(`> event resolved: ${event.title}`, "prompt");
  addFeed("event", choice.resultText);
  setImpact(choice.impactText);
  normalizeState();
  checkMissionCompletion();
  maybeCheckEnd();
  persistAndRender();
}

function maybeCheckEnd() {
  const result = evaluateEnding();
  if (!result) return;
  endRun(result);
}

function evaluateEnding() {
  if (state.mental <= 0) {
    return {
      title: "Burnout Cascade",
      copy: "你没有被某一篇论文打倒，你是被整个系统按周结算后慢慢磨空的。",
      key: "burnout",
    };
  }

  if (state.risk >= 100) {
    return {
      title: "Retraction Season",
      copy: "漂亮的输出最终还是追上了你。错误不是突然发生的，它只是终于被看见了。",
      key: "retraction",
    };
  }

  if (state.cash <= 0 && state.compute <= 0 && state.tokens < 1000) {
    return {
      title: "Lab Insolvency",
      copy: "你不是没有 idea，你是买不起把 idea 跑成结果的基础设施了。",
      key: "insolvency",
    };
  }

  if (state.week >= 10 && state.auditsRun >= 3 && state.papersPublished >= 2 && state.risk <= 24) {
    return {
      title: "Reproducibility Goblin",
      copy: "你没有成为最快的人，但你成了最难被追债的人。这个系统里，这已经非常接近胜利。",
      key: "repro",
    };
  }

  if (state.shortcutDeals + state.salamiPapers >= 4 && state.papersPublished >= 5) {
    return {
      title: "Metrics Maximized",
      copy: "你学会了稳定地喂饱系统想看的数字。遗憾的是，系统想要的从来不一定是科学。",
      key: "metrics",
    };
  }

  if (state.contract <= 0) {
    if (state.papersPublished >= 4 && state.reputation >= 72) {
      return {
        title: "Tenure Secured",
        copy: "你把速度、判断力和一点点幸存者偏差一起缝成了 tenure。",
        key: "tenure",
      };
    }
    if (state.papersPublished >= 2 && state.reputation >= 56) {
      return {
        title: "Escaped To A Better Offer",
        copy: "你没等系统来定义你，而是在它结算之前先跳槽了。",
        key: "escape",
      };
    }
    return {
      title: "Contract Expired",
      copy: "非升即走没有文学性，它只会在计时器归零时平静地把你踢出去。",
      key: "expired",
    };
  }

  if (state.papersPublished >= 5 && state.reputation >= 88 && state.grantsWon >= 2) {
    return {
      title: "Field Celebrity",
      copy: "你成了别人嘴里的成功案例。系统不会提你为此烧掉了多少 tokens、GPU 和人情。",
      key: "celebrity",
    };
  }

  if (state.members.length === 0 && state.membersLost >= 3 && state.teamStress >= 70) {
    return {
      title: "Lab Mutiny",
      copy: "实验室没有爆炸，它只是先于你对这套工作方式投了不信任票。",
      key: "mutiny",
    };
  }

  return null;
}

function endRun(result) {
  state.ended = true;
  state.ending = result;
  state.summaryText = buildResultSummary(result);
  updateMetaWithRun(result);
  clearSave();

  dom.endingTitle.textContent = result.title;
  dom.endingCopy.textContent = result.copy;
  dom.endingGrid.innerHTML = "";
  const cards = [
    { label: "Papers", value: `${state.papersPublished}` },
    { label: "Grants", value: `${state.grantsWon}` },
    { label: "Members Left", value: `${state.members.length}` },
    { label: "Final Score", value: `${calculateScore(result)}` },
  ];
  for (const item of cards) {
    const card = document.createElement("article");
    card.className = "ending-card";
    card.innerHTML = `<strong>${item.label}</strong><span>${item.value}</span>`;
    dom.endingGrid.appendChild(card);
  }

  dom.endOverlay.classList.remove("hidden");
  dom.endOverlay.setAttribute("aria-hidden", "false");
  setImpact(`Run ended: ${result.title}`);
  renderAll();
}

function updateMetaWithRun(result) {
  const score = calculateScore(result);
  meta.runsPlayed += 0;
  if (score > meta.bestScore) {
    meta.bestScore = score;
    meta.bestTitle = result.title;
    meta.bestSummary = result.copy;
  }
  saveMeta(meta);
}

function calculateScore(result) {
  const base =
    state.papersPublished * 30 +
    state.grantsWon * 20 +
    state.reputation +
    state.mental +
    state.contract * 2 -
    state.risk -
    state.shortcutDeals * 8 -
    state.salamiPapers * 6 +
    state.auditsRun * 4 -
    state.membersLost * 10;
  if (result.key === "tenure" || result.key === "celebrity") return base + 40;
  if (result.key === "repro") return base + 26;
  if (result.key === "escape") return base + 18;
  if (result.key === "metrics") return base - 24;
  if (result.key === "burnout" || result.key === "retraction") return base - 30;
  return base;
}

function buildResultSummary(result) {
  return [
    `《vibe科研模拟器》本局结局：${result.title}`,
    `模式：${getRunModeName()} / 周数：${state.week} / 论文：${state.papersPublished} / 基金：${state.grantsWon}`,
    `最终资源：Cash ${currency(state.cash)} · Tokens ${compact(state.tokens)} · Compute ${state.compute} · Risk ${state.risk}`,
    `当前模型：${getActiveModel().name} · ${getModelStatusLine(getActiveModel())}`,
    `内审 ${state.auditsRun} 次 / 阶段 review 通过 ${state.reviewsPassed} 次 / 翻车 ${state.reviewsFailed} 次`,
    `切片 ${state.salamiPapers} 篇 / 灰色捷径 ${state.shortcutDeals} 次`,
    `实验室状态：剩余 ${state.members.length} 人，累计离组 ${state.membersLost} 人，团队压力 ${state.teamStress}`,
    result.copy,
  ].join("\n");
}

function buildLiveSummaryText() {
  return [
    `《vibe科研模拟器》当前战报`,
    `当前模式：${getRunModeName()} · ${getCareerTitle()} · Week ${state.week}`,
    `模型：${getActiveModel().name} · ${getModelStatusLine(getActiveModel())}`,
    `主线项目：${getActiveProject().title}`,
    `论文 ${state.papersPublished} / 基金 ${state.grantsWon} / 成员 ${state.members.length}`,
    `内审 ${state.auditsRun} / review 通过 ${state.reviewsPassed} / review 翻车 ${state.reviewsFailed}`,
    `切片 ${state.salamiPapers} / 灰色捷径 ${state.shortcutDeals}`,
    `Cash ${currency(state.cash)} · Tokens ${compact(state.tokens)} · Compute ${state.compute} · Risk ${state.risk}`,
  ].join("\n");
}

function buildShareTitle() {
  if (state.ending) return state.ending.title;
  return `${getCareerTitle()}，实验室${state.teamStress > 70 ? "正在摇晃" : "尚未爆炸"}`;
}

function buildShareBody() {
  const model = getActiveModel();
  const project = getActiveProject();
  if (state.ending) return state.ending.copy;
  return `目前正在用 ${model.name} 推进「${project.title}」，组内对它的评价是“${getModelInfraVibe(model, getModelIntel(model.id))}”。`;
}

function getCareerTitle() {
  if (state.ending?.key === "tenure") return "终身教职";
  if (state.reputation >= 85) return "领域红人";
  if (state.papersPublished >= 3) return "有点名气的 PI";
  if (state.grantsWon >= 1) return "勉强活下来的青椒";
  if (state.week <= 3) return "新晋青椒";
  return "濒临熟练的劳工";
}

function getShareTone() {
  if (state?.ending?.key === "tenure" || state?.ending?.key === "celebrity" || state?.ending?.key === "repro") return "clean";
  if (state?.ending?.key === "metrics" || state?.risk > 70 || state?.teamStress > 75) return "chaos";
  if (state?.runModeId === "sprint") return "arcade";
  return "paper";
}

function getGuideState() {
  const project = getActiveProject();
  const avgMorale = average(state.members.map((member) => member.morale));
  const upcomingReview = getUpcomingReview();
  const steps = [
    {
      title: "补燃料",
      copy: "如果 cash、tokens 或 compute 见底，先补，不然这周很多动作都会卡死。",
      status: "pending",
    },
    {
      title: "冲进度",
      copy: "用文献扫描、原型或写稿把主线项目往前推到可投稿区间。",
      status: "pending",
    },
    {
      title: "控风险",
      copy: "risk 上来以后，用核验、benchmark 或内审把错误拦住。",
      status: "pending",
    },
    {
      title: "保住实验室",
      copy: "team stress 太高就先安抚或休息，不然周结算会替你做更贵的决定。",
      status: "pending",
    },
  ];

  const guide = {
    title: "先把主线往前推",
    copy: "如果你没有明显缺资源，也没有快爆炸的地方，就优先推进主线项目。",
    recommendedActions: ["literature", "prototype"],
    tags: [getRunModeName(), `${state.actionsLeft} 动作剩余`, `Risk ${state.risk}`],
    steps,
  };

  if (state.actionsLeft === 0) {
    guide.title = "这周动作用完了，结束本周";
    guide.copy = "点“结束本周”进入周结算。真正的麻烦和收益通常都会在那个瞬间一起跳出来。";
    guide.recommendedActions = [];
    steps[0].status = "done";
    steps[1].status = "done";
    steps[2].status = state.risk < 45 ? "done" : "pending";
    steps[3].status = state.teamStress < 55 ? "done" : "pending";
    return guide;
  }

  if (!state.weeklyBet && state.weeklyBetOffers?.length) {
    guide.title = "先从 3 张押注里定一个本周打法";
    guide.copy = "这是这局最像牌桌的地方。先选 agenda，再决定这 3 到 4 步怎么出。";
    guide.recommendedActions = [];
    guide.tags = [getRunModeName(), "三选一周押注", `${state.actionsLeft} 动作剩余`];
    steps[0].status = "current";
    return guide;
  }

  if (state.weeklyBet?.accepted && !state.weeklyBet.completed && !state.weeklyBet.failed) {
    const betGuide = getBetGuide(state.weeklyBet);
    if (betGuide) {
      guide.title = betGuide.title;
      guide.copy = betGuide.copy;
      guide.recommendedActions = betGuide.actions;
      guide.tags = [getRunModeName(), "赌约进行中", state.weeklyBet.rewardText];
      return guide;
    }
  }

  if (upcomingReview && upcomingReview.week - state.week <= 1 && !upcomingReview.check()) {
    const reviewGuide = getReviewGuide(upcomingReview);
    guide.title = `${upcomingReview.title} 快到了`;
    guide.copy = `再过 ${upcomingReview.week - state.week === 0 ? "这周" : "1 周"}就会结算。先把 review 要的那块补上。`;
    guide.recommendedActions = reviewGuide.actions;
    guide.tags = [getRunModeName(), "Boss 周期", upcomingReview.kicker];
    steps[reviewGuide.step].status = "current";
    return guide;
  }

  if (state.cash < 8000 && state.tokens < 6000) {
    guide.title = "先去找钱或补 tokens";
    guide.copy = "资源已经太薄了。先点“申请基金”或“购买 tokens”，否则这周会被卡在起跑线。";
    guide.recommendedActions = ["grant", "buyTokens"];
    steps[0].status = "current";
    return guide;
  }

  if (state.compute < 10 && project.correctness < 68) {
    guide.title = "先补一点算力";
    guide.copy = "你现在更缺 compute。没有它，你很难做 benchmark、原型和真正的结果。";
    guide.recommendedActions = ["buyCompute", "grant"];
    steps[0].status = "current";
    return guide;
  }

  if (state.members.length === 0 && (state.candidatePool?.length || 0) > 0 && state.cash >= 4000) {
    guide.title = "先招个人，不然整局都像在徒手推磨";
    guide.copy = "这周候选池已经开了。招人会让你更强，也会把新的事故带进实验室。";
    guide.recommendedActions = ["recruit", "literature"];
    steps[3].status = "current";
    return guide;
  }

  if (state.members.length <= 1 && state.cash >= 9000 && state.week >= 3 && project.progress >= 36) {
    guide.title = "可以扩一手人";
    guide.copy = "项目已经动起来了，单兵作战开始接近极限。候选池里可能有战力，也可能有事故。";
    guide.recommendedActions = ["recruit", "mentor"];
    steps[3].status = "current";
    return guide;
  }

  if (state.teamStress > 62 || (state.members.length && avgMorale < 42)) {
    guide.title = "先安抚团队，别让周结算先出事";
    guide.copy = "实验室已经很紧绷了。现在继续 push，通常会在周结算时以更贵的方式还回来。";
    guide.recommendedActions = ["mentor", "rest"];
    steps[3].status = "current";
    return guide;
  }

  if (state.risk > 58) {
    guide.title = "先压风险";
    guide.copy = "risk 已经偏高。现在最值钱的不是再写一点，而是把明显要炸的地方先拦住。";
    guide.recommendedActions = state.compute >= 10 ? ["auditLab", "benchmark"] : ["verify", "auditLab"];
    steps[2].status = "current";
    return guide;
  }

  if (project.progress >= 72 && project.correctness >= 60 && state.risk < 45) {
    guide.title = "这周可以考虑投稿";
    guide.copy = "主线项目已经接近 ready。先看 risk 和 correctness，合适的话可以点“投稿当前项目”。";
    guide.recommendedActions = ["submitPaper", "verify"];
    steps[1].status = "done";
    steps[2].status = "done";
    return guide;
  }

  if (project.progress < 45) {
    guide.title = "先把项目推过半程";
    guide.copy = "现在最缺的是清晰的项目推进。文献扫描稳一点，原型更猛但更烧。";
    guide.recommendedActions = ["literature", "prototype"];
    steps[1].status = "current";
    return guide;
  }

  if (project.polish < 42) {
    guide.title = "可以先写一版稿子";
    guide.copy = "项目已经有点样子了，先用写稿把结构拉出来，再决定哪些地方要补证据。";
    guide.recommendedActions = ["draftPaper", "verify"];
    steps[1].status = "current";
    return guide;
  }

  steps[1].status = "current";
  return guide;
}

function getBetGuide(bet) {
  switch (bet.id) {
    case "push-project":
      return {
        title: "赌约要求你本周狠狠干主线",
        copy: "这周要把主线至少再推 18%。文献扫描和原型最直接。",
        actions: ["literature", "prototype"],
      };
    case "clean-room":
      return {
        title: "赌约要求你把这周做干净",
        copy: "去做核验、benchmark 或内审，把 risk 压下去，再考虑其他事。",
        actions: ["verify", "benchmark", "auditLab"],
      };
    case "care-loop":
      return {
        title: "赌约要求你先稳住实验室",
        copy: "这周先安抚团队，不然额外行动点你是拿不到的。",
        actions: ["mentor", "rest"],
      };
    case "money-chase":
      return {
        title: "赌约要求你先搞钱",
        copy: "基金或现金缓冲优先。先让实验室多活几周再说。",
        actions: ["grant", "buyTokens"],
      };
    case "clean-hands":
      return {
        title: "赌约要求你别碰脏捷径",
        copy: "这周别切片，老老实实推主线，系统会给你更干净的奖励。",
        actions: ["literature", "prototype", "draftPaper"],
      };
    default:
      return null;
  }
}

function getReviewGuide(review) {
  switch (review.id) {
    case "runway-review":
      return { step: 0, actions: ["grant", "buyTokens"], copy: "先把现金和 runway 稍微做厚一点。" };
    case "lab-climate-review":
      return { step: 3, actions: ["mentor", "rest"], copy: "先把团队从静默崩溃边缘往回拽。" };
    case "integrity-scan":
      return { step: 2, actions: ["auditLab", "verify", "benchmark"], copy: "先把会被抽查炸掉的地方清掉。" };
    case "dossier-review":
      return { step: 1, actions: ["submitPaper", "grant", "benchmark"], copy: "先补成果位，别让 dossier 一片空白。" };
    case "narrative-review":
      return { step: 1, actions: ["submitPaper", "auditLab", "draftPaper"], copy: "先做出一个能讲出去又不太脏的故事。" };
    default:
      return { step: 1, actions: ["literature", "prototype"], copy: "先把主线继续推。" };
  }
}

function getTacticalHand() {
  const guide = getGuideState();
  const upcomingReview = getUpcomingReview();
  const seen = new Set();
  const entries = [];
  const project = getActiveProject();

  function push(action, tags = [], copy = "") {
    if (!ACTION_META[action] || seen.has(action)) return;
    seen.add(action);
    entries.push({
      action,
      tags: tags.slice(0, 3),
      copy: copy || ACTION_META[action].copy,
    });
  }

  for (const action of guide.recommendedActions || []) {
    push(action, ["推荐"], guide.copy);
  }

  if (state.weeklyBet?.accepted && !state.weeklyBet.completed && !state.weeklyBet.failed) {
    const betGuide = getBetGuide(state.weeklyBet);
    for (const action of betGuide?.actions || []) {
      push(action, ["押注"], betGuide.copy);
    }
  }

  if (upcomingReview && upcomingReview.week - state.week <= 1) {
    const reviewGuide = getReviewGuide(upcomingReview);
    for (const action of reviewGuide.actions) {
      push(action, ["Boss"], reviewGuide.copy);
    }
  }

  const comboFollowups = getComboFollowups();
  for (const action of comboFollowups) {
    push(action, ["连招"], "这步会把你上一手动作的收益抬高一点。");
  }

  if (project.progress >= 72 && project.correctness >= 60 && state.risk < 45) {
    push("submitPaper", ["窗口"], "主线已经接近 ready，现在投稿是真的有胜算。");
  }

  if (state.actionsLeft === 0) return [];
  return entries.slice(0, 3);
}

function getComboFollowups() {
  const previousAction = state.actionHistoryWeek[state.actionHistoryWeek.length - 1];
  const previousCategory = previousAction ? getActionCategory(previousAction) : null;
  if (previousCategory === "fuel") return ["literature", "prototype", "draftPaper"];
  if (previousCategory === "people") return ["literature", "prototype"];
  if (previousCategory === "push") return state.compute >= 10 ? ["auditLab", "benchmark", "verify"] : ["verify", "auditLab"];
  if (previousCategory === "truth") return ["submitPaper"];
  if (previousCategory === "gamble") return ["auditLab", "verify"];
  return [];
}

function getReviewSchedule() {
  return REVIEW_DEFS.filter((review) => review.week <= state.totalWeeks);
}

function getUpcomingReview() {
  return getReviewSchedule().find((review) => review.week > state.week) || null;
}

function maybeRunCheckpointReview() {
  const review = getReviewSchedule().find((item) => item.week === state.week);
  if (!review) return;

  pushTerminal(`> review window opened: ${review.id}`, "warn");
  if (review.check()) {
    state.reviewsPassed += 1;
    review.onPass();
    addFeed("review", `你扛过了「${review.title}」。${review.passText}`);
    setImpact(`阶段 review 通过：${review.title}`);
  } else {
    state.reviewsFailed += 1;
    review.onFail();
    addFeed("review", `你在「${review.title}」里被记了一笔。${review.failText}`);
    setImpact(`阶段 review 翻车：${review.title}`);
  }
}

function getActionCategory(action) {
  if (["buyTokens", "buyCompute", "grant"].includes(action)) return "fuel";
  if (["literature", "prototype", "draftPaper"].includes(action)) return "push";
  if (["verify", "benchmark", "auditLab"].includes(action)) return "truth";
  if (["mentor", "rest", "recruit"].includes(action)) return "people";
  if (["salamiSlice"].includes(action)) return "gamble";
  if (["submitPaper"].includes(action)) return "deadline";
  return "misc";
}

function getActionDeckCategory(action) {
  const category = getActionCategory(action);
  if (category === "gamble") return "deadline";
  return category;
}

function getActionDeckActions(filterId, guide) {
  if (!state) return [];
  if (filterId === "recommended") {
    const tactical = getTacticalHand().map((entry) => entry.action);
    const recommended = guide?.recommendedActions || [];
    const fallback = ["literature", "verify", "grant", "mentor"];
    return uniqueList([...tactical, ...recommended, ...fallback]).slice(0, 4);
  }
  return ACTION_ORDER.filter((action) => getActionDeckCategory(action) === filterId);
}

function getEffectiveStallRisk(model) {
  return Math.max(0.01, model.stallRisk + state.modifiers.providerTax - (state.weekFlags.priorityQueue ? 0.08 : 0));
}

function getActionPreview(action) {
  if (!state) return [];
  const project = getActiveProject();
  const model = getActiveModel();
  const teamFactor = getTeamFactor();
  const specialist = getActionSpecialistBonus(action);

  switch (action) {
    case "buyTokens":
      return [
        { tone: "cost", label: "-¥5000" },
        { tone: "gain", label: "+24k Tokens" },
        { tone: "risk", label: "Mental -2" },
      ];
    case "buyCompute":
      return [
        { tone: "cost", label: "-¥8000" },
        { tone: "gain", label: "+24 Compute" },
        { tone: "info", label: "给 benchmark 续命" },
      ];
    case "grant": {
      const tokenCost = Math.max(1, Math.round(2600 * model.tokenMult));
      const successChance = clamp(
        0.42 + state.reputation / 260 + (model.correctnessMult - 1) * 0.1 + (specialist - 1) * 0.28 - state.modifiers.grantPenalty,
        0.08,
        0.95
      );
      return [
        { tone: "cost", label: `-${compact(tokenCost)}T` },
        { tone: "gain", label: `中标 ${Math.round(successChance * 100)}%` },
        { tone: "risk", label: "不中 Mental -8" },
      ];
    }
    case "literature": {
      const tokenCost = Math.max(1, Math.round(1800 * model.tokenMult));
      return [
        { tone: "cost", label: `-${compact(tokenCost)}T` },
        { tone: "gain", label: `+${scaled(8, model.progressMult * teamFactor * specialist)} 主线` },
        { tone: "risk", label: `Risk +${scaled(4, model.riskMult)}` },
      ];
    }
    case "prototype": {
      const tokenCost = Math.max(1, Math.round(4200 * model.tokenMult));
      return [
        { tone: "cost", label: `-${compact(tokenCost)}T -8C` },
        { tone: "gain", label: `+${scaled(16, model.progressMult * teamFactor * specialist)} 主线` },
        { tone: "risk", label: `队列 ${Math.round(getEffectiveStallRisk(model) * 100)}%` },
      ];
    }
    case "draftPaper": {
      const baseTokens = hasPerk("template-stack") ? 5200 : 6000;
      const tokenCost = Math.max(1, Math.round(baseTokens * model.tokenMult));
      return [
        { tone: "cost", label: `-${compact(tokenCost)}T` },
        { tone: "gain", label: `+${scaled(18 + (hasPerk("template-stack") ? 4 : 0), model.polishMult * teamFactor * specialist)} Polish` },
        { tone: "risk", label: `Risk +${scaled(10, model.riskMult)}` },
      ];
    }
    case "verify":
      return [
        { tone: "cost", label: "-1 Judgment" },
        { tone: "gain", label: `Correct +${Math.round(12 * specialist)}` },
        { tone: "gain", label: `Risk -${Math.round(16 * specialist)}` },
      ];
    case "benchmark":
      return [
        { tone: "cost", label: "-10C -1J" },
        { tone: "gain", label: `Correct +${scaled(16 + state.modifiers.benchmarkBonus, teamFactor * specialist)}` },
        { tone: "gain", label: `Risk -${Math.round(8 * specialist)}` },
      ];
    case "auditLab":
      return [
        { tone: "cost", label: "-1 Judgment" },
        { tone: "gain", label: `Risk -${Math.round(12 * specialist)}` },
        { tone: "risk", label: "可能伤士气" },
      ];
    case "mentor":
      return [
        { tone: "cost", label: "-¥2000" },
        { tone: "gain", label: `Stress -${Math.round((14 + state.modifiers.mentorBoost + (hasPerk("lab-culture") ? 6 : 0)) * specialist)}` },
        { tone: "gain", label: `Morale +${Math.round(12 * specialist)}` },
      ];
    case "recruit":
      return [
        { tone: "info", label: `${state.candidatePool?.length || 0} 份候选` },
        { tone: "gain", label: "录用后 -1 Action" },
        { tone: "risk", label: "能力随机 / trait 隐藏" },
      ];
    case "rest":
      return [
        { tone: "info", label: "本周不产出" },
        { tone: "gain", label: "Mental +12" },
        { tone: "gain", label: "Stress -6" },
      ];
    case "salamiSlice":
      return [
        { tone: "gain", label: "+1 Paper" },
        { tone: "gain", label: `+¥${(3000 + state.modifiers.shortcutCash).toLocaleString("zh-CN")}` },
        { tone: "risk", label: `Risk +${12 + state.modifiers.shortcutPenalty}` },
      ];
    case "submitPaper": {
      const previousAction = state.actionHistoryWeek[state.actionHistoryWeek.length - 1];
      const truthTimingBonus = getActionCategory(previousAction) === "truth" ? 14 : 0;
      const score =
        project.correctness +
        project.polish +
        project.novelty -
        state.risk +
        Math.floor(state.reputation / 5) -
        Math.floor(state.teamStress / 6) +
        truthTimingBonus +
        Math.round((specialist - 1) * 18);
      return [
        { tone: "info", label: `当前评分 ${score}` },
        { tone: score > 155 ? "gain" : score > 125 ? "info" : "risk", label: "接收线 156+" },
        { tone: "risk", label: "核验后再投更稳" },
      ];
    }
    default:
      return [];
  }
}

function addBuff(id, name, copy) {
  state.activeBuffs = state.activeBuffs.filter((buff) => buff.id !== id);
  state.activeBuffs.push({ id, name, copy });
}

function hasBuff(id) {
  return state.activeBuffs.some((buff) => buff.id === id);
}

function consumeBuff(id) {
  const found = state.activeBuffs.find((buff) => buff.id === id);
  state.activeBuffs = state.activeBuffs.filter((buff) => buff.id !== id);
  return found;
}

function setLastCombo(name, copy) {
  state.lastCombo = { name, copy };
  addFeed("combo", `${name}：${copy}`);
}

function triggerActionSystems(action, project) {
  const category = getActionCategory(action);
  const previousAction = state.actionHistoryWeek[state.actionHistoryWeek.length - 1];
  const previousCategory = previousAction ? getActionCategory(previousAction) : null;

  if (previousCategory === "fuel" && category === "push") {
    project.progress += 4;
    project.polish += 2;
    setLastCombo("Pipeline Primed", "你先补燃料再推进，项目白赚了一点速度和成稿感。");
  }

  if (previousCategory === "people" && category === "push") {
    project.progress += 3;
    state.teamStress -= 4;
    setLastCombo("Lab In Sync", "先把人稳住再推进，项目会更顺，团队也不那么想逃。");
  }

  if (previousCategory === "push" && category === "truth") {
    addBuff("submission-window", "Actually Ready", "本周下一次投稿会额外获得通过分数。");
    state.risk -= 4;
    setLastCombo("Clean Science", "你没有沉迷继续写，而是及时回头核验。下一次投稿会更像真的 ready。");
  }

  if (previousCategory === "gamble" && category === "truth") {
    project.correctness += 4;
    state.risk -= 10;
    setLastCombo("Panic Cleanup", "你在做脏事之后立刻清理战场。不好看，但比放着烂强。");
  }

  if (previousCategory === "truth" && category === "deadline") {
    setLastCombo("Actually Ready", "你刚做完核验就去投稿，这次更像是有准备地赌。");
  }

  state.actionHistoryWeek.push(action);
}

function getWeeklyBetTemplates() {
  const project = getActiveProject();
  return [
    {
      id: "push-project",
      title: "冲一下主线",
      copy: `把「${project.title}」本周至少再推进 18%。完成后会立刻觉得这局是活的。`,
      rewardText: "+¥7000 · +1 Judgment",
      penaltyText: "Mental -3",
      projectId: project.id,
      startProgress: project.progress,
    },
    {
      id: "clean-room",
      title: "干净一点",
      copy: "本周至少做一次真核验，并把 Risk 压到 35 以下。",
      rewardText: "-8 Risk · +2 Reputation",
      penaltyText: "Reputation -2",
      targetRisk: 35,
    },
    {
      id: "care-loop",
      title: "别把人烧坏",
      copy: "本周至少安抚一次团队，并让 Team Stress 保持在 45 以下。",
      rewardText: "+1 Action 下周生效",
      penaltyText: "Team Stress +6",
      targetStress: 45,
    },
    {
      id: "money-chase",
      title: "弄点 runway",
      copy: "本周要么中一笔基金，要么把现金堆到 ¥60000。",
      rewardText: "+12 Compute",
      penaltyText: "Mental -4",
      targetCash: 60000,
    },
    {
      id: "clean-hands",
      title: "这周别耍花活",
      copy: "不切片、不碰灰色捷径，同时把项目推进至少 12%。",
      rewardText: "+2 Reputation · +4000 Tokens",
      penaltyText: "Risk +6",
      projectId: project.id,
      startProgress: project.progress,
      startShortcuts: state.shortcutDeals,
      startSalami: state.salamiPapers,
    },
  ];
}

function generateWeeklyBet() {
  return { ...sample(getWeeklyBetTemplates()), accepted: false, completed: false, failed: false };
}

function generateWeeklyBetOffers() {
  return shuffle(getWeeklyBetTemplates())
    .slice(0, 3)
    .map((bet) => ({ ...bet, accepted: false, completed: false, failed: false }));
}

function evaluateWeeklyBet() {
  const bet = state.weeklyBet;
  if (!bet || !bet.accepted || bet.completed || bet.failed) return;
  const project = state.projects.find((entry) => entry.id === bet.projectId) || getActiveProject();
  let succeeded = false;

  switch (bet.id) {
    case "push-project":
      succeeded = project.progress - bet.startProgress >= 18;
      break;
    case "clean-room":
      succeeded = (state.weekFlags.verified || state.weekFlags.benchmarked || state.weekFlags.audited) && state.risk <= bet.targetRisk;
      break;
    case "care-loop":
      succeeded = state.weekFlags.mentored && state.teamStress <= bet.targetStress;
      break;
    case "money-chase":
      succeeded = state.weekFlags.grantWon || state.cash >= bet.targetCash;
      break;
    case "clean-hands":
      succeeded =
        state.shortcutDeals === bet.startShortcuts &&
        state.salamiPapers === bet.startSalami &&
        project.progress - bet.startProgress >= 12;
      break;
    default:
      break;
  }

  if (succeeded) {
    bet.completed = true;
    applyWeeklyBetReward(bet);
    addFeed("bet", `你完成了本周赌约「${bet.title}」。这周终于有点像你在主动打牌，不只是被系统收租。`);
    setImpact(`赌约完成：${bet.title}`);
  } else {
    bet.failed = true;
    applyWeeklyBetPenalty(bet);
    addFeed("bet", `本周赌约「${bet.title}」失败。你不是输了全部，只是被系统提醒它真的会记账。`);
    setImpact(`赌约失败：${bet.title}`);
  }
}

function applyWeeklyBetReward(bet) {
  switch (bet.id) {
    case "push-project":
      state.cash += 7000;
      state.judgment += 1;
      break;
    case "clean-room":
      state.risk -= 8;
      state.reputation += 2;
      break;
    case "care-loop":
      state.bonusActionsNextWeek += 1;
      break;
    case "money-chase":
      state.compute += 12;
      break;
    case "clean-hands":
      state.reputation += 2;
      state.tokens += 4000;
      break;
    default:
      break;
  }
}

function applyWeeklyBetPenalty(bet) {
  switch (bet.id) {
    case "push-project":
      state.mental -= 3;
      break;
    case "clean-room":
      state.reputation -= 2;
      break;
    case "care-loop":
      state.teamStress += 6;
      break;
    case "money-chase":
      state.mental -= 4;
      break;
    case "clean-hands":
      state.risk += 6;
      break;
    default:
      break;
  }
}

function hasPerk(id) {
  return state.perks.includes(id);
}

function unlockPerk(id) {
  if (hasPerk(id)) return;
  state.perks.push(id);
  addFeed("perk", `解锁被动「${PERK_DEFS[id].name}」。你的 run 开始有自己的味道了。`);
  pushTerminal(`> perk unlocked: ${PERK_DEFS[id].name}`, "prompt");
}

function checkPerkUnlocks() {
  if (state.grantsWon >= 1) unlockPerk("grant-office");
  if (state.auditsRun >= 1) unlockPerk("red-team");
  if (state.papersPublished >= 1) unlockPerk("template-stack");
  if (state.members.length >= 3 && state.teamStress <= 40) unlockPerk("lab-culture");
}

function generateWeeklyMissions() {
  const project = getActiveProject();
  const templates = [
    {
      title: "拉一下 Expert Filter",
      desc: "本周至少做 1 次人工核验。",
      rewardText: "+1 Judgment",
      check: () => state.weekFlags.verified,
      reward: () => {
        state.judgment += 1;
      },
    },
    {
      title: "跑一个像样 benchmark",
      desc: "本周至少跑 1 次 benchmark。",
      rewardText: "+2 Reputation",
      check: () => state.weekFlags.benchmarked,
      reward: () => {
        state.reputation += 2;
      },
    },
    {
      title: "摸一次内审",
      desc: "本周至少做 1 次内部审计。",
      rewardText: "-8 Risk",
      check: () => state.weekFlags.audited,
      reward: () => {
        state.risk -= 8;
      },
    },
    {
      title: "先活下来",
      desc: "把 Cash 提到 ¥60000。",
      rewardText: "+12 Compute",
      check: () => state.cash >= 60000,
      reward: () => {
        state.compute += 12;
      },
    },
    {
      title: "把科学做对一点",
      desc: `把主线项目「${project.title}」的 Correctness 提到 65 以上。`,
      rewardText: "+3 Reputation",
      check: (_, currentProject) => currentProject.correctness >= 65,
      reward: () => {
        state.reputation += 3;
      },
    },
    {
      title: "别一直准备",
      desc: `把主线项目「${project.title}」的 Progress 提到 60 以上。`,
      rewardText: "+8000 Tokens",
      check: (_, currentProject) => currentProject.progress >= 60,
      reward: () => {
        state.tokens += 8000;
      },
    },
    {
      title: "把自己留住",
      desc: "把 Mental HP 提到 80 以上。",
      rewardText: "-8 Risk",
      check: () => state.mental >= 80,
      reward: () => {
        state.risk -= 8;
      },
    },
    {
      title: "别让组会变事故现场",
      desc: "本周至少安抚团队 1 次。",
      rewardText: "-10 Team Stress",
      check: () => state.weekFlags.mentored,
      reward: () => {
        state.teamStress -= 10;
      },
    },
    {
      title: "去找钱",
      desc: "本周中 1 笔基金。",
      rewardText: "+¥8000",
      check: () => state.weekFlags.grantWon,
      reward: () => {
        state.cash += 8000;
      },
    },
    {
      title: "逼自己交稿",
      desc: "本周完成 1 次投稿。",
      rewardText: "+4 Reputation",
      check: () => state.weekFlags.submitted,
      reward: () => {
        state.reputation += 4;
      },
    },
    {
      title: "扩充战力",
      desc: "本周至少招 1 名新成员。",
      rewardText: "+2 Judgment",
      check: () => state.weekFlags.recruited,
      reward: () => {
        state.judgment += 2;
      },
    },
  ];

  const available = templates.filter((template) => !template.check(state, project));
  return shuffle(available.length >= 3 ? available : templates).slice(0, 3).map((item) => ({ ...item, completed: false }));
}

function generateWeeklyEvent() {
  const candidates = eventFactories().filter((factory) => !factory.when || factory.when(state));
  return sample(candidates).build();
}

function eventFactories() {
  return [
    {
      build() {
        return {
          kicker: "Deadline",
          title: "Special Issue 截稿提前了",
          body: "编辑发来通知：专题提前一周截稿。你可以冲一次短平快，也可以假装没看到。",
          resolved: false,
          resultText: "",
          choices: [
            {
              label: "连夜冲稿",
              description: "Progress +12 · Polish +8 · Risk +10 · Mental -6",
              apply: (_, project) => {
                project.progress += 12;
                project.polish += 8;
                state.risk += 10;
                state.mental -= 6;
                state.teamStress += 5;
              },
              resultText: "你追上了截稿，但系统看见你把未来的验证时间抵押掉了一部分。",
              impactText: "你拿速度换了窗口期，顺便也换来了一点潜在灾难。",
            },
            {
              label: "坚持做 benchmark",
              description: "Correctness +8 · Risk -4 · Compute -4",
              apply: (_, project) => {
                state.compute -= 4;
                state.risk -= 4;
                project.correctness += 8;
              },
              resultText: "你没有追热点，而是继续把底座做扎实。短期不炫，长期可能少挨骂。",
              impactText: "你放弃了快感，换来一点真正站得住脚的东西。",
            },
            {
              label: "让 agent 先做一版",
              description: "Tokens -1800 · Progress +6 · Risk +5",
              apply: (_, project) => {
                state.tokens -= 1800;
                project.progress += 6;
                state.risk += 5;
              },
              resultText: "AI 替你先冲了一版，文风成熟，逻辑还需要你自己擦地。",
              impactText: "你省了时间，但没有省掉责任。",
            },
          ],
        };
      },
    },
    {
      build() {
        return {
          kicker: "Review",
          title: "审稿人要求补一个额外控制实验",
          body: "Reviewer 2 说你的核心结论还缺一个控制。你知道这要求不完全离谱。",
          resolved: false,
          resultText: "",
          choices: [
            {
              label: "老老实实补",
              description: "Compute -6 · Judgment -1 · Correctness +12 · Reputation +2",
              apply: (_, project) => {
                state.compute -= 6;
                state.judgment -= 1;
                project.correctness += 12;
                state.reputation += 2;
                state.teamStress += 3;
              },
              resultText: "你补了控制实验。很累，但从此多了一块能真正站人的地板。",
              impactText: "这步代价很高，但它会让后面的所有解释更稳。",
            },
            {
              label: "强硬 rebuttal",
              description: "Polish +8 · Risk +8 · Reputation -1",
              apply: (_, project) => {
                project.polish += 8;
                state.risk += 8;
                state.reputation -= 1;
              },
              resultText: "你的回复写得极漂亮。审稿人会不会买账是一回事，系统已经先记下风险。",
              impactText: "你赢了语气，未必赢了事实。",
            },
            {
              label: "撤稿止损",
              description: "Mental +4 · Progress -10 · Risk -6",
              apply: (_, project) => {
                state.mental += 4;
                project.progress -= 10;
                state.risk -= 6;
              },
              resultText: "你体面地撤了。疼，但没让错误变成公开事故。",
              impactText: "这是一次退步，也是一次避免更大损失的止损。",
            },
          ],
        };
      },
    },
    {
      when: (run) => run.members.length > 0,
      build() {
        return {
          kicker: "Lab",
          title: "学生凌晨发来长消息",
          body: "有人说自己最近状态很差，觉得怎么做都不够好。你知道这条消息不能完全当作工作通知来处理。",
          resolved: false,
          resultText: "",
          choices: [
            {
              label: "认真回复并改组会节奏",
              description: "Mental -2 · Team Stress -12 · Morale +10",
              apply: () => {
                state.mental -= 2;
                state.teamStress -= 12;
                for (const member of state.members) member.morale += 10;
              },
              resultText: "你花了一个晚上当人而不是当 KPI。产出没涨，但实验室没往坏处再滑一步。",
              impactText: "情绪价值不是虚词，它只是一直没有被写进 grant budget。",
            },
            {
              label: "只回一句先坚持",
              description: "Progress +4 · Team Stress +10",
              apply: (_, project) => {
                project.progress += 4;
                state.teamStress += 10;
              },
              resultText: "短期上看没耽误事，长期上看大家都更懂得别再找你了。",
              impactText: "你保住了一点进度，也消耗了一点信任。",
            },
            {
              label: "转手给博后安抚",
              description: "Postdoc Burnout +8 · Mental +1 · Team Stress -4",
              apply: () => {
                const postdoc = state.members.find((member) => member.role === "postdoc");
                if (postdoc) postdoc.burnout += 8;
                state.mental += 1;
                state.teamStress -= 4;
              },
              resultText: "你把管理劳动外包给实验室里最能扛的人。短期有效，代价也很明确。",
              impactText: "实验室里的情绪劳动从来不会消失，它只会转移。",
            },
          ],
        };
      },
    },
    {
      build() {
        return {
          kicker: "Trend",
          title: "同主题的 viral preprint 爆了",
          body: "社交平台上所有人都在转一篇和你方向相近的 preprint。你必须决定跟不跟。",
          resolved: false,
          resultText: "",
          choices: [
            {
              label: "立刻 pivot",
              description: "Novelty +10 · Correctness -6 · Risk +8",
              apply: (_, project) => {
                project.novelty += 10;
                project.correctness -= 6;
                state.risk += 8;
              },
              resultText: "你追上了话题，但项目底盘开始变轻。短期很性感，长期很危险。",
              impactText: "你跟上了风口，也更靠近把热点误认成科学。",
            },
            {
              label: "冷静 double-check",
              description: "Judgment -1 · Correctness +10 · Risk -6",
              apply: (_, project) => {
                state.judgment -= 1;
                project.correctness += 10;
                state.risk -= 6;
              },
              resultText: "你没去追热度，先确认自己脚下是不是空的。这步很慢，但很像专家。",
              impactText: "你拒绝了立即起飞的诱惑，换来了更稳的姿态。",
            },
            {
              label: "发一串长帖评论",
              description: "Reputation +3 · Mental -2",
              apply: () => {
                state.reputation += 3;
                state.mental -= 2;
              },
              resultText: "你发了一串判断很稳的评论，圈内对你更熟了，但项目本身一点没动。",
              impactText: "你赚到了存在感，但没推进正事。",
            },
          ],
        };
      },
    },
    {
      build() {
        return {
          kicker: "Infra",
          title: "平台商说服务稳定，队列却开始爆炸",
          body: "销售给你的宣传页写着 low latency；真实体验更像投稿后等外审。",
          resolved: false,
          resultText: "",
          choices: [
            {
              label: "加钱买专线",
              description: "Cash -6000 · 本周平台更稳 · Tokens +4000",
              apply: () => {
                state.cash -= 6000;
                state.tokens += 4000;
                state.weekFlags.priorityQueue = true;
              },
              resultText: "你花钱买到了更稳定的吞吐。资本主义再次证明它能把排队变成 SKU。",
              impactText: "这周应该会顺一点，但 cash 也被一起削掉。",
            },
            {
              label: "忍着用",
              description: "Mental -4 · Tokens -1200",
              apply: () => {
                state.mental -= 4;
                state.tokens -= 1200;
              },
              resultText: "你接受了平台的 GPU 现实。tokens 继续燃烧，产出速度继续优雅地爬行。",
              impactText: "模型不一定弱，弱的是对面给你的基础设施。",
            },
            {
              label: "切换廉价模型",
              description: "切到 Open Chaos 70B · Risk +5",
              apply: () => {
                state.selectedModelId = "open-chaos";
                state.risk += 5;
              },
              resultText: "你切到更便宜更快的模型。速度回来了，判断力的负担也一起回来了。",
              impactText: "你拿质量换吞吐，这是现实里很常见的交易。",
            },
          ],
        };
      },
    },
    {
      when: (run) => run.members.length > 0,
      build() {
        return {
          kicker: "Conference",
          title: "你被邀请去做 keynote",
          body: "主办方说这是曝光机会。你知道曝光有时只是更高效地消耗时间。",
          resolved: false,
          resultText: "",
          choices: [
            {
              label: "去，顺便 networking",
              description: "Reputation +6 · Mental -4 · Progress -6",
              apply: (_, project) => {
                state.reputation += 6;
                state.mental -= 4;
                project.progress -= 6;
              },
              resultText: "你扩大了存在感，也把这周真正要做的事往后推了一点。",
              impactText: "你投资了名声，代价是真正的连续工作时间。",
            },
            {
              label: "让博后代讲",
              description: "Postdoc Skill +4 · Team Stress +4",
              apply: () => {
                const postdoc = state.members.find((member) => member.role === "postdoc");
                if (postdoc) postdoc.skill += 4;
                state.teamStress += 4;
              },
              resultText: "你把机会分给了团队。成长和负担往往是一起打包来的。",
              impactText: "这不是偷懒，这是把 spotlight 和压力一起下放。",
            },
            {
              label: "婉拒，留在实验室",
              description: "Correctness +6 · Reputation -1",
              apply: (_, project) => {
                project.correctness += 6;
                state.reputation -= 1;
              },
              resultText: "你把一周重新还给科研本身。外界会少看见你一点，项目会多站稳一点。",
              impactText: "你拒绝了存在感，换来了更扎实的底盘。",
            },
          ],
        };
      },
    },
    {
      build() {
        return {
          kicker: "Consulting",
          title: "产业合作找上门",
          body: "一家平台公司想买你的时间做咨询。他们给钱很快，但会打断学术节奏。",
          resolved: false,
          resultText: "",
          choices: [
            {
              label: "接活回血",
              description: "Cash +12000 · Tokens +6000 · Mental -4 · Reputation -1",
              apply: () => {
                state.cash += 12000;
                state.tokens += 6000;
                state.mental -= 4;
                state.reputation -= 1;
              },
              resultText: "钱到账很快。你知道这不是科研，但你也知道空气和尊严都不能刷卡。",
              impactText: "这次你优先考虑生存，完全合理。",
            },
            {
              label: "换成数据访问",
              description: "Correctness +6 · Novelty +4 · Cash +3000",
              apply: (_, project) => {
                project.correctness += 6;
                project.novelty += 4;
                state.cash += 3000;
              },
              resultText: "你没全盘卖时间，而是换到一点真正能改善研究的东西。",
              impactText: "这是一次相对优雅的交易。",
            },
            {
              label: "直接拒绝",
              description: "Reputation +1 · Mental +1",
              apply: () => {
                state.reputation += 1;
                state.mental += 1;
              },
              resultText: "你守住了学术节奏。钱包没更厚，但你至少没更散。",
              impactText: "你选择不让外部现金定义这一周的节奏。",
            },
          ],
        };
      },
    },
    {
      when: (run) => run.members.length >= 2,
      build() {
        return {
          kicker: "Lab",
          title: "实验室气氛开始发脆",
          body: "连续几周高压后，大家表面还在交活，空气里却开始出现一种危险的安静。",
          resolved: false,
          resultText: "",
          choices: [
            {
              label: "继续 push",
              description: "Progress +10 · Team Stress +18 · Risk +4",
              apply: (_, project) => {
                project.progress += 10;
                state.teamStress += 18;
                state.risk += 4;
              },
              resultText: "项目推进很快，但团队已经开始静悄悄地坏掉。",
              impactText: "你把这周救回来了，可能把下个月毁掉了一部分。",
            },
            {
              label: "请大家喝奶茶并重新画饼",
              description: "Cash -1500 · Team Stress -10 · Reputation +1",
              apply: () => {
                state.cash -= 1500;
                state.teamStress -= 10;
                state.reputation += 1;
              },
              resultText: "你用一杯奶茶和一张更远大的未来蓝图，暂时挽救了组会气氛。",
              impactText: "情绪价值也是 labor，而且经常带一点餐饮预算。",
            },
            {
              label: "给每个人一周缓冲",
              description: "Mental +3 · Team Stress -14 · Progress -6",
              apply: (_, project) => {
                state.mental += 3;
                state.teamStress -= 14;
                project.progress -= 6;
              },
              resultText: "产出慢了一点，但实验室里的人味暂时还没被彻底挤干。",
              impactText: "你主动放慢了进度，换回了更健康的后续局面。",
            },
          ],
        };
      },
    },
    {
      when: (run) => run.members.length > 0,
      build() {
        return {
          kicker: "Authorship",
          title: "快成稿时，挂名作者突然出现",
          body: "一位平时几乎没碰项目的 senior 暗示自己应该顺手上作者列表。你知道这在现实里并不罕见。",
          resolved: false,
          resultText: "",
          choices: [
            {
              label: "加上名字换通路",
              description: "Reputation +4 · Risk +6 · Team Stress +6",
              apply: () => {
                state.reputation += 4;
                state.risk += 6;
                state.teamStress += 6;
              },
              resultText: "你用作者位换了一点资源和保护伞。实验室里的人都看到了，也都学到了点什么。",
              impactText: "短期更稳，长期更脏。",
            },
            {
              label: "按贡献标准硬顶",
              description: "Judgment -1 · Mental -3 · Team Stress -4 · Reputation -1",
              apply: () => {
                state.judgment -= 1;
                state.mental -= 3;
                state.teamStress -= 4;
                state.reputation -= 1;
              },
              resultText: "你把作者标准讲得很清楚，也顺便把关系讲冷了一点。",
              impactText: "你守住了底线，代价是这周会更不好过。",
            },
            {
              label: "给 acknowledgement 台阶",
              description: "Reputation +1 · Risk +1",
              apply: () => {
                state.reputation += 1;
                state.risk += 1;
              },
              resultText: "你用一种含糊但体面的方式把人请下了作者列表。没有完全干净，也没有完全烂掉。",
              impactText: "这是学术政治里的中间选项。",
            },
          ],
        };
      },
    },
    {
      build() {
        return {
          kicker: "Citation",
          title: "审稿意见像一张引用购物清单",
          body: "Reviewer 建议你补引十几篇文献，几乎都来自同一个圈子。你看得出里面有真的相关，也有明显的 KPI 味。",
          resolved: false,
          resultText: "",
          choices: [
            {
              label: "全都引上，先过再说",
              description: "Polish +6 · Reputation +1 · Risk +5",
              apply: (_, project) => {
                project.polish += 6;
                state.reputation += 1;
                state.risk += 5;
              },
              resultText: "稿子看起来更圆滑了。你知道自己在喂系统，但系统也确实因此更喜欢你一点。",
              impactText: "你赢了流程，没赢尊严。",
            },
            {
              label: "只补真正相关的",
              description: "Judgment -1 · Correctness +4 · Risk -2",
              apply: (_, project) => {
                state.judgment -= 1;
                project.correctness += 4;
                state.risk -= 2;
              },
              resultText: "你认真筛了一遍，只留该留的。很慢，但至少还像在写文献综述，不是在交保护费。",
              impactText: "这一步很像专家，不太像高效员工。",
            },
            {
              label: "写信申诉引用绑架",
              description: "Mental -2 · Reputation -1 · Risk -4",
              apply: () => {
                state.mental -= 2;
                state.reputation -= 1;
                state.risk -= 4;
              },
              resultText: "你把话挑明了。编辑不一定喜欢，但你至少没配合把闹剧演完。",
              impactText: "你保住了点原则，也把局面变得更僵。",
            },
          ],
        };
      },
    },
    {
      build() {
        return {
          kicker: "Venue",
          title: "72 小时接收的国际会议找上门",
          body: "对方邮件里全是 'distinguished'、'global'、'indexed'。费用写在最下面，peer review 写得像附赠。",
          resolved: false,
          resultText: "",
          choices: [
            {
              label: "交钱上台刷一行 CV",
              description: "Cash -3500 · Papers +1 · Risk +14 · Reputation -2",
              apply: () => {
                state.cash -= 3500;
                state.papersPublished += 1;
                state.risk += 14;
                state.reputation -= 2;
                state.shortcutDeals += 1;
              },
              resultText: "你买到了一次极速发表体验，也买到了一点以后解释不清的记录。",
              impactText: "数字是涨了，履历的含金量没有一起涨。",
            },
            {
              label: "只拿来练 talk，不投稿",
              description: "Mental -1 · Polish +5 · Cash -1200",
              apply: (_, project) => {
                state.mental -= 1;
                state.cash -= 1200;
                project.polish += 5;
              },
              resultText: "你把它当成一次廉价彩排。不是最体面，但也没把名字彻底挂进去。",
              impactText: "你从骗子的会议里榨出了一点真实用途。",
            },
            {
              label: "直接拉黑",
              description: "Reputation +1",
              apply: () => {
                state.reputation += 1;
              },
              resultText: "你没有上车。钱包没损失，良心也没新增维护成本。",
              impactText: "并不是每个机会都值得被称为机会。",
            },
          ],
        };
      },
    },
    {
      build() {
        return {
          kicker: "Paper Mill",
          title: "有人私信兜售一整套论文服务",
          body: "从图、统计、润色到审稿回复一条龙。对方保证'比自己写快很多'，你相信这句话是真的。",
          resolved: false,
          resultText: "",
          choices: [
            {
              label: "买全套服务",
              description: "Cash -7000 · Progress +18 · Polish +14 · Risk +22",
              apply: (_, project) => {
                state.cash -= 7000;
                project.progress += 18;
                project.polish += 14;
                state.risk += 22;
                state.shortcutDeals += 1;
              },
              resultText: "产出立刻变漂亮了。你知道真正被外包的不只是劳动，还有责任。",
              impactText: "这一步很爽，未来的追债也会很爽。",
            },
            {
              label: "只买 figure cleanup",
              description: "Cash -2200 · Polish +6 · Risk +7",
              apply: (_, project) => {
                state.cash -= 2200;
                project.polish += 6;
                state.risk += 7;
                state.shortcutDeals += 1;
              },
              resultText: "你告诉自己这只是外包美工。系统并不在乎你是怎么给自己讲故事的。",
              impactText: "你没有全卖，但也没完全清白。",
            },
            {
              label: "截图发给朋友吐槽",
              description: "Mental +1 · Reputation +1",
              apply: () => {
                state.mental += 1;
                state.reputation += 1;
              },
              resultText: "你把它当段子传了出去。至少这次好笑的不是你的论文。",
              impactText: "你拒绝了捷径，顺便赚到一点道德优越感。",
            },
          ],
        };
      },
    },
    {
      build() {
        return {
          kicker: "Open Data",
          title: "期刊要求上传数据和代码",
          body: "编辑说可重复性材料是必须项。你知道整理这些东西的痛苦，和真正做研究差不多。",
          resolved: false,
          resultText: "",
          choices: [
            {
              label: "彻底清理后公开",
              description: "Mental -4 · Correctness +10 · Risk -12 · Reputation +3",
              apply: (_, project) => {
                state.mental -= 4;
                project.correctness += 10;
                state.risk -= 12;
                state.reputation += 3;
              },
              resultText: "你把脏线头一根根理顺了。很累，但这类累不会在一年后回来咬你。",
              impactText: "你花了今天，省了未来的麻烦。",
            },
            {
              label: "只上传能过场的版本",
              description: "Polish +3 · Risk +8",
              apply: (_, project) => {
                project.polish += 3;
                state.risk += 8;
              },
              resultText: "文件是传上去了，真正关键的东西还躲在本地文件夹里。",
              impactText: "流程完成了，可重复性没有一起完成。",
            },
            {
              label: "说原始数据涉密或丢了",
              description: "Mental +1 · Reputation -3 · Risk +12",
              apply: () => {
                state.mental += 1;
                state.reputation -= 3;
                state.risk += 12;
                state.shortcutDeals += 1;
              },
              resultText: "你把麻烦推远了一点，也把怀疑一并推近了一点。",
              impactText: "这不是解决问题，这是延期爆炸。",
            },
          ],
        };
      },
    },
    {
      build() {
        return {
          kicker: "AI Review",
          title: "圈内开始流传给 LLM 审稿人下暗令",
          body: "有人建议在文稿里藏白字提示词，专门诱导机器审稿给出更友好的评价。你讨厌它，但你也知道这招可能真有人在用。",
          resolved: false,
          resultText: "",
          choices: [
            {
              label: "偷偷试一次",
              description: "Polish +4 · Risk +16 · Reputation -1",
              apply: (_, project) => {
                project.polish += 4;
                state.risk += 16;
                state.reputation -= 1;
                state.shortcutDeals += 1;
              },
              resultText: "你做了一件技术上新颖、伦理上非常旧的事。短期可能有效，长期很难解释。",
              impactText: "你不是第一个动这种心思的人，也不会是最后一个。",
            },
            {
              label: "拒绝，并补透明材料",
              description: "Correctness +6 · Risk -6 · Mental -2",
              apply: (_, project) => {
                project.correctness += 6;
                state.risk -= 6;
                state.mental -= 2;
              },
              resultText: "你没跟着玩花活，反而把能公开的东西补全了。很土，但站得住。",
              impactText: "你选了最无聊也最可靠的路。",
            },
            {
              label: "写长帖批判这种做法",
              description: "Reputation +3 · Mental -2 · Progress -4",
              apply: (_, project) => {
                state.reputation += 3;
                state.mental -= 2;
                project.progress -= 4;
              },
              resultText: "你在社交平台讲得很对。项目本身没动，但圈内至少知道你在乎这件事。",
              impactText: "你赢了话语权，没赢本周产出。",
            },
          ],
        };
      },
    },
  ];
}

function prepareModelAction(costs, model) {
  const tokenCost = Math.max(1, Math.round(costs.baseTokens * model.tokenMult));
  const payload = { tokens: tokenCost };
  if (costs.compute) payload.compute = costs.compute;
  if (costs.mental) payload.mental = costs.mental;
  if (costs.cash) payload.cash = costs.cash;
  if (!consume(payload)) return null;

  const effectiveStallRisk = Math.max(0.01, model.stallRisk + state.modifiers.providerTax - (state.weekFlags.priorityQueue ? 0.08 : 0));
  const stalled = Math.random() < effectiveStallRisk;
  recordModelUse(model, tokenCost, costs.compute || 0, stalled);
  if (stalled) {
    state.mental -= 2;
    addFeed("latency", `${model.name} 所在平台 GPU 不够，队列暴涨。tokens 在烧，输出在爬。`);
    pushTerminal("> provider queue saturated", "warn");
  }

  return {
    tokenCost,
    outputMult: stalled ? 0.55 : 1,
    stalled,
  };
}

function emptyModelIntel() {
  return {
    uses: 0,
    stalls: 0,
    totalTokens: 0,
    totalCompute: 0,
    lastWeek: 0,
  };
}

function createModelIntel() {
  return Object.fromEntries(MODEL_MARKET.map((model) => [model.id, emptyModelIntel()]));
}

function getModelIntel(modelId) {
  if (!state.modelIntel) state.modelIntel = createModelIntel();
  if (!state.modelIntel[modelId]) state.modelIntel[modelId] = emptyModelIntel();
  return state.modelIntel[modelId];
}

function recordModelUse(model, tokenCost, computeCost, stalled) {
  const intel = getModelIntel(model.id);
  intel.uses += 1;
  intel.totalTokens += tokenCost;
  intel.totalCompute += computeCost;
  intel.lastWeek = state.week;
  if (stalled) intel.stalls += 1;
}

function getModelStatusLine(model) {
  const intel = getModelIntel(model.id);
  if (!intel.uses) return "未充分实测";
  if (intel.uses === 1) return "只跑过 1 次";
  if (intel.uses < 4) return `已试 ${intel.uses} 次`;
  return `组内样本 ${intel.uses} 次`;
}

function getModelHeadline(model) {
  const intel = getModelIntel(model.id);
  if (!intel.uses) return "宣传页说自己稳定，实验室还没替你验证。";
  if (intel.stalls) return `你们已经撞过 ${intel.stalls} 次队列墙，口碑正在形成。`;
  if (intel.uses < 3) return "样本还少，但暂时没被它正面背刺。";
  return `${getModelOutputVibe(model, intel)}；${getModelInfraVibe(model, intel)}。`;
}

function getModelBudgetVibe(model, intel) {
  if (!intel.uses) return "供应商都说自己划算";
  if (intel.uses < 3) return intel.totalTokens > 9000 ? "首轮体感不便宜" : "首轮账单还没吓到你";
  if (model.tokenMult >= 1.6) return "每次调用都像在烧 grant";
  if (model.tokenMult >= 1.2) return "预算会明显变薄";
  if (model.tokenMult <= 0.7) return "表面便宜，代价未必只在账单";
  return "花费大致还在中段";
}

function getModelInfraVibe(model, intel) {
  if (!intel.uses) return "平台承诺低延迟";
  const stallRatio = intel.uses ? intel.stalls / intel.uses : 0;
  if (intel.uses < 3) return intel.stalls ? "首轮就撞上过队列" : "暂时还没撞到墙";
  if (stallRatio >= 0.34) return "排队味很重";
  if (stallRatio >= 0.16) return "偶尔掉进队列坑";
  if (model.throughput >= 90) return "体感挺利索";
  return "速度一般，但没经常掉链子";
}

function getModelOutputVibe(model, intel) {
  if (!intel.uses) return "演示 demo 看起来都很能打";
  if (intel.uses < 3) return "目前只知道它确实会写";
  if (model.correctnessMult >= 1.32) return "难题上比较稳";
  if (model.riskMult >= 1.34) return "很会把猜测说得像结果";
  if (model.polishMult >= 1.12) return "文风成熟得比证据快";
  return "表现中规中矩";
}

function pickMemberTrait(role) {
  return sample(MEMBER_TRAIT_POOL[role] || Object.keys(MEMBER_TRAITS));
}

function getMemberTrait(member) {
  return MEMBER_TRAITS[member.traitId] || MEMBER_TRAITS["steady-hand"];
}

function applyMemberTrait(member, project) {
  const trait = getMemberTrait(member);
  const mentoredShield = state.weekFlags.mentored ? 0.58 : 1;
  const scrutiny = state.weekFlags.verified || state.weekFlags.benchmarked;

  switch (member.traitId) {
    case "steady-hand":
      project.correctness += 1;
      member.burnout -= 1;
      break;
    case "gpu-pyromancer":
      if (Math.random() < 0.24 * mentoredShield) {
        const computeBurn = randomBetween(12, 28);
        const cashBurn = randomBetween(3000, 12000);
        state.compute -= computeBurn;
        state.cash -= cashBurn;
        state.teamStress += 8;
        member.burnout += 8;
        addFeed("cluster", `${member.name} 把一个参数扫成了超算烟花秀。本周近 10 万机时额度被他烧得干干净净。`);
      } else {
        project.progress += 2;
        state.compute -= 1;
      }
      break;
    case "ghost-writer":
      project.polish += 4;
      state.risk += 3;
      if (Math.random() < 0.18 * mentoredShield) {
        addFeed("writing", `${member.name} 又交来一版写得像顶刊摘要的草稿。证据还在路上，语气已经到了。`);
      }
      break;
    case "vanisher":
      if (Math.random() < 0.22 * mentoredShield) {
        project.progress -= 4;
        state.teamStress += 6;
        member.morale -= 6;
        addFeed("lab", `${member.name} 再次处于“快好了”的量子叠加态，直到周会前都没真正出现。`);
      } else {
        project.progress += 1;
      }
      break;
    case "fragile-genius":
      if (member.morale >= 65 && member.burnout < 55) {
        project.correctness += 4;
        project.novelty += 2;
      } else if (Math.random() < 0.18) {
        member.burnout += 10;
        state.teamStress += 7;
        state.mental -= 2;
        addFeed("lab", `${member.name} 本来最能打，状态一掉就把整组空气一起拉低。`);
      }
      break;
    case "fabricator":
      if (Math.random() < (state.teamStress > 55 ? 0.2 : 0.11) * (state.weekFlags.mentored ? 0.65 : 1.22)) {
        if (scrutiny) {
          project.progress -= 2;
          state.risk -= 4;
          state.teamStress += 5;
          member.morale -= 4;
          addFeed("fraud", `你在核验里发现 ${member.name} 的图和表对不上。造假在投稿前被截住了，但信任已经掉了一块。`);
        } else {
          project.progress += 8;
          project.polish += 5;
          state.risk += 18;
          state.reputation -= 2;
          member.burnout += 6;
          addFeed("fraud", `${member.name} 交出了一份漂亮得可疑的数据包。你这周省下的时间，未来多半要连本带利还回去。`);
        }
      } else {
        project.progress += 2;
        project.polish += 1;
        state.risk += 2;
      }
      break;
    default:
      if (trait) project.progress += 1;
      break;
  }
}

function getActionSpecialistBonus(action) {
  if (state.members.length === 0) return 1;
  const mapping = {
    buyTokens: ["writing"],
    buyCompute: ["compute"],
    grant: ["writing", "stability"],
    literature: ["theory", "writing"],
    prototype: ["compute", "rigor"],
    draftPaper: ["writing", "theory"],
    verify: ["rigor"],
    benchmark: ["compute", "rigor"],
    auditLab: ["rigor", "stability"],
    mentor: ["stability"],
    recruit: ["stability"],
    rest: ["stability"],
    salamiSlice: ["writing"],
    submitPaper: ["writing", "rigor"],
  };
  const relevant = mapping[action] || ["rigor"];
  const averages = relevant.map((key) => average(state.members.map((member) => member.abilities?.[key] || 50)));
  return clamp(0.92 + average(averages) / 240, 0.88, 1.24);
}

function getTeamFactor() {
  if (state.members.length === 0) return 1;
  const avgSkill = average(state.members.map((member) => member.skill));
  const avgMorale = average(state.members.map((member) => member.morale));
  const avgBurnout = average(state.members.map((member) => member.burnout));
  const avgStability = average(state.members.map((member) => member.abilities?.stability || 50));
  return clamp(0.88 + avgSkill / 340 + avgMorale / 520 + avgStability / 650 - avgBurnout / 700, 0.8, 1.3);
}

function maybeGraduateMember() {
  if (!state.members.length) return;
  if (Math.random() > 0.34) return;
  const phd = state.members.find((member) => member.role === "phd");
  if (!phd) return;
  state.members = state.members.filter((member) => member.id !== phd.id);
  state.membersGraduated += 1;
  state.reputation += 2;
  addFeed("lab", `${phd.name} 成功毕业。你获得了声望，也失去了一块已经磨合好的生产力。`);
}

function resetProject(project, success) {
  project.progress = success ? 14 : 20;
  project.correctness = success ? 50 : 42;
  project.polish = success ? 16 : 20;
  project.novelty = clamp(project.novelty + randomBetween(-6, 6), 28, 72);
}

function normalizeState() {
  for (const project of state.projects) {
    project.progress = clamp(project.progress, 0, 100);
    project.novelty = clamp(project.novelty, 0, 100);
    project.correctness = clamp(project.correctness, 0, 100);
    project.polish = clamp(project.polish, 0, 100);
  }

  for (const member of state.members) {
    member.skill = clamp(member.skill, 20, 100);
    member.morale = clamp(member.morale, 0, 100);
    member.burnout = clamp(member.burnout, 0, 100);
  }

  state.cash = clamp(state.cash, -40000, 150000);
  state.tokens = clamp(state.tokens, 0, 150000);
  state.compute = clamp(state.compute, 0, 160);
  state.judgment = clamp(state.judgment, 0, 12);
  state.reputation = clamp(state.reputation, -20, 100);
  state.mental = clamp(state.mental, 0, 100);
  state.risk = clamp(state.risk, 0, 100);
  state.contract = clamp(state.contract, 0, state.totalWeeks || 24);
  state.teamStress = clamp(state.teamStress, 0, 100);
}

function consume(costs) {
  for (const [key, value] of Object.entries(costs)) {
    if (state[key] < value) {
      fail(`${key} 不足，动作执行失败。`);
      return false;
    }
  }

  for (const [key, value] of Object.entries(costs)) {
    state[key] -= value;
  }
  return true;
}

function persistAndRender() {
  if (state && !state.ended) saveState(state);
  renderAll();
}

function fail(message) {
  pushTerminal(`> ${message}`, "error");
  addFeed("blocked", message);
  setImpact(message);
  renderAll();
}

function addFeed(tag, text) {
  state.feed.push({ week: state.week, tag, text });
}

function pushTerminal(text, tone = "") {
  state.terminal.push({ text, tone });
}

function setImpact(text) {
  state.lastImpact = text;
  dom.impactBanner.classList.remove("pulse");
  void dom.impactBanner.offsetWidth;
  dom.impactBanner.classList.add("pulse");
}

function generateMemberAbilities(role) {
  const ranges = ROLE_ABILITY_RANGES[role] || ROLE_ABILITY_RANGES.phd;
  return Object.fromEntries(
    Object.entries(ranges).map(([key, [min, max]]) => [key, randomBetween(min, max)])
  );
}

function getCandidateRolePool() {
  const pool = ["phd", "phd", "ra", "ra", "engineer"];
  if (state?.week >= 4 || (state?.reputation || 0) >= 28) pool.push("postdoc");
  if ((state?.reputation || 0) >= 48) pool.push("postdoc", "engineer");
  return pool;
}

function getCandidateHireCost(member) {
  const [minCost, maxCost] = ROLE_HIRE_COSTS[member.role] || ROLE_HIRE_COSTS.phd;
  const abilityAverage = average(Object.values(member.abilities || {}));
  const weighted = minCost + (member.skill - 42) * 42 + (abilityAverage - 50) * 18;
  return clamp(Math.round(weighted), minCost, maxCost);
}

function getCandidateScoutNote(candidate) {
  return TRAIT_SCOUT_NOTES[candidate.traitId] || "推荐信很正常，这反而让人不知道该不该放心。";
}

function describeCandidateProfile(candidate) {
  const ranks = getMemberAbilityRanks(candidate);
  const best = ranks[0];
  const second = ranks[1];
  const weak = ranks.at(-1);
  return `主打 ${best.label}${second ? ` / ${second.label}` : ""}，最弱 ${weak?.label || "稳定"}，开价 ${currency(candidate.hireCost)}。`;
}

function createCandidate(forceRole) {
  const candidate = createMember(forceRole || sample(getCandidateRolePool()));
  candidate.hireCost = getCandidateHireCost(candidate);
  return candidate;
}

function generateCandidatePool(count = 3) {
  return Array.from({ length: count }, () => createCandidate()).sort((a, b) => b.hireCost - a.hireCost);
}

function getMemberAbilityRanks(member) {
  return Object.entries(member.abilities || {})
    .map(([key, value]) => ({ key, value, label: ABILITY_LABELS[key] || key }))
    .sort((a, b) => b.value - a.value);
}

function describeMemberProfile(member) {
  const ranks = getMemberAbilityRanks(member);
  const strengths = ranks.slice(0, 2).map((item) => item.label).join(" / ");
  const weak = ranks.at(-1)?.label || "稳定";
  return `强项 ${strengths}，短板 ${weak}。`;
}

function getMemberPowerScore(member) {
  const ranks = getMemberAbilityRanks(member);
  const topTwo = ranks.slice(0, 2).reduce((sum, item) => sum + item.value, 0);
  return member.skill + topTwo / 3 + member.morale / 4 - member.burnout / 5;
}

function getTopCandidate() {
  if (!state?.candidatePool?.length) return null;
  return [...state.candidatePool].sort((a, b) => getMemberPowerScore(b) - getMemberPowerScore(a))[0];
}

function createMember(forceRole) {
  const role = forceRole || sample(Object.keys(ROLE_DEFS));
  return {
    id: `m-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    role,
    traitId: pickMemberTrait(role),
    abilities: generateMemberAbilities(role),
    name: `${sample(FIRST_NAMES)}${sample(LAST_NAMES)}`,
    skill: randomBetween(role === "postdoc" ? 62 : 42, role === "engineer" ? 88 : 78),
    morale: randomBetween(52, 82),
    burnout: randomBetween(12, 32),
    quirk: sample(MEMBER_QUIRKS),
  };
}

function getMemberStatus(member) {
  if (member.burnout >= 80 || member.morale <= 22) return { label: "危险", className: "bad" };
  if (member.burnout >= 55 || member.morale <= 45) return { label: "紧绷", className: "warn" };
  return { label: "可用", className: "good" };
}

function getActiveProject() {
  return state.projects.find((project) => project.id === state.activeProjectId);
}

function getActiveModel() {
  return MODEL_MARKET.find((model) => model.id === state.selectedModelId) || MODEL_MARKET[0];
}

function freshWeekFlags() {
  return {
    benchmarked: false,
    verified: false,
    submitted: false,
    grantWon: false,
    mentored: false,
    recruited: false,
    audited: false,
    salami: false,
    priorityQueue: false,
  };
}

function freshModifiers() {
  return {
    providerTax: 0,
    grantPenalty: 0,
    auditBonus: 0,
    mentorBoost: 0,
    benchmarkBonus: 0,
    shortcutPenalty: 0,
    shortcutCash: 0,
  };
}

function getSelectedRunMode() {
  return RUN_MODES.find((mode) => mode.id === selectedRunModeId) || RUN_MODES[0];
}

function getRunMode() {
  return RUN_MODES.find((mode) => mode.id === state?.runModeId) || RUN_MODES[0];
}

function getRunModeName() {
  return getRunMode().name;
}

function hashString(text) {
  let hash = 0;
  for (const char of text) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return hash;
}

function getDailyDirective(date = new Date()) {
  const dayLabel = date.toLocaleDateString("zh-CN", { month: "short", day: "numeric" });
  const iso = date.toISOString().slice(0, 10);
  const directive = DAILY_DIRECTIVES[hashString(iso) % DAILY_DIRECTIVES.length];
  return {
    ...directive,
    dayLabel,
  };
}

function renderDailyDirective() {
  const mode = getSelectedRunMode();
  const directive = getDailyDirective();
  if (mode.id === "daily") {
    dom.dailyTitle.textContent = `${directive.dayLabel} · ${directive.title}`;
    dom.dailyCopy.textContent = directive.copy;
    return;
  }
  if (mode.id === "sprint") {
    dom.dailyTitle.textContent = "速冲局提示";
    dom.dailyCopy.textContent = "速冲局更适合做高分和社交平台战报，不适合慢慢玩教学局。";
    return;
  }
  dom.dailyTitle.textContent = `${directive.dayLabel} · 今日每日局`;
  dom.dailyCopy.textContent = `如果你切到“每日挑战”，今天会启用「${directive.title}」：${directive.copy}`;
}

function ambientEvents() {
  return [
    "合作作者发来消息：'这个图很美，但为什么和正文不一致？'",
    "模型开始忘记三周前定下的约束，连续两次把同一个 bug 重新引入。",
    "你被邀请去做一个 AI for Science 报告，但你其实只想安静跑 benchmark。",
    "学院群里有人转发了新的 GPU 采购通知，大家都知道最后排队的人还是你。",
    "学生说最近睡眠有点乱，顺便问你下周 deadine 能不能再缓 48 小时。",
  ];
}

function metricRow(label, value) {
  const row = document.createElement("div");
  row.className = label.includes("completion") || label.includes("correctness") || label.includes("polish") ? "project-metric" : "member-metric";
  row.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
  return row;
}

function barRow(label, value) {
  const wrapper = document.createElement("div");
  const labelRow = document.createElement("div");
  labelRow.className = "project-bar-label";
  labelRow.innerHTML = `<span>${label}</span><strong>${value}%</strong>`;

  const meter = document.createElement("div");
  meter.className = "meter";
  const fill = document.createElement("div");
  fill.className = "meter-fill";
  fill.style.width = `${value}%`;
  meter.appendChild(fill);

  wrapper.appendChild(labelRow);
  wrapper.appendChild(meter);
  return wrapper;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
}

function toast(text) {
  dom.toast.textContent = text;
  dom.toast.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    dom.toast.classList.add("hidden");
  }, TOAST_DURATION);
}

function saveState(runState) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(runState));
  } catch {
    // Ignore storage failures in local file contexts.
  }
}

function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function clearSave() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    // Ignore.
  }
}

function saveMeta(nextMeta) {
  try {
    localStorage.setItem(META_KEY, JSON.stringify(nextMeta));
  } catch {
    // Ignore.
  }
}

function loadMeta() {
  try {
    const raw = localStorage.getItem(META_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Ignore.
  }
  return {
    runsPlayed: 0,
    bestScore: 0,
    bestTitle: "",
    bestSummary: "",
  };
}

function shuffle(values) {
  const next = [...values];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [next[index], next[swap]] = [next[swap], next[index]];
  }
  return next;
}

function sample(values) {
  return values[Math.floor(Math.random() * values.length)];
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function uniqueList(values) {
  return [...new Set(values)];
}

function scaled(base, multiplier = 1, outputMultiplier = 1) {
  return Math.round(base * multiplier * outputMultiplier);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function currency(value) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    maximumFractionDigits: 0,
  }).format(value);
}

function compact(value) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function raw(value) {
  return `${Math.round(value)}`;
}

function weeksLeft(value) {
  return `${value}w`;
}
