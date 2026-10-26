# 从编造参考文献讲到 skill

课堂先提出问题，然后打开技能文件，再演示一次真实查询。学生应能说清楚：什么时候用这个技能、它调用什么工具、什么情况下停止、最后保存什么。

- `SKILL-excerpt.md`：原技能的中文教学节选。
- `PROMPT.md`：教师现场演示任务。
- `RUN.md` 和 `scripts/verify_doi.py`：可重跑的数据库调用，脚本直接复用原技能。
- `results/`：备课时实时查询得到的记录和由记录生成的引用。它不是现场智能体对话录像。

教师机器上的完整技能位于 `/Users/jinlei/Desktop/claude_skills/skills/literature-search/SKILL.md`，已有 `literature-wiki` 依赖。课堂打开实际文件，展示 `SKILL.md`、`scripts/`、`references/` 三者的关系。材料包不包含教师的个人文献库。

练习：选一个经常重复的任务，写出何时使用、操作步骤、所需工具、失败处理、输出文件。可以从修改这个节选开始；先试一次，再根据真实失败修改规则。
