# 从聊天到动手：第一次智能体任务

先读这个文件，再选一个你能正常使用的工具。安装与登录入口见 `SETUP.md`。

材料包的 `literature/` 目录还有第二个课堂案例：literature-search 技能的中文节选、演示提示词和一次真实查询的记录。先读其中的 README.md；它讲如何把重复任务的经验写成技能，节选不是完整技能安装包。

## 你要做什么

这个练习只有六行数据，不需要了解散射理论。任务是读取表格、计算两列的绝对差、保存结果。输入在 `data/input.csv`。

| 列名 | 含义 |
|---|---|
| E_MeV | 质心系能量，单位 MeV |
| calc_deg | 计算值，单位度 |
| ref_deg | 参考值，单位度 |

数值来自讲者已有方势阱程序的终端输出，保留其打印精度。这是教学数据，不是实验测量。此处只练习文件处理，不以这些差值判断模型是否描述自然。

## 从哪里开始

1. 解压 `student-materials.zip`，将解压目录作为你的练习目录。可以将它命名为 `ai-first-task`。
2. 在智能体软件中选择这个目录，或在终端进入此目录后启动工具。
3. 打开 `PROMPTS.md`，依次使用三条提示词。第一条只要求读取，不修改。
4. 观察它实际读了什么、改了什么、执行了什么。
5. 打开结果文件，手算 10 MeV 那一行，再用交付的命令重跑一次。

原始数据 `data/input.csv` 不改动。要求生成的程序为根目录的 `summarize.jl`，输出放在 `results/`。

## 结果应该是什么

- 输入有 6 行数据，不算表头。
- 最大绝对差约 0.0059 度，对应 1.0 MeV。
- 10 MeV 这一行的绝对差约 0.0038 度。
- 第三条任务筛选 E_MeV >= 10，应选出 10、20、50 MeV 三行。
- 绝对差只针对输入的已舍入数值。未舍入的原始求解器结果可能在末位不同。

程序应该交出 `results/comparison.csv`、`results/summary.txt`，第三条任务再增加 `results/high_energy.csv`。输出文字的措辞不需要与参考完全相同。

## 没有账号或现场演示失败

仍然可以先看输入、做 `WORKSHEET.md` 的纸笔练习，并查看 `reference/output/` 的参考结果。

已安装 Julia 时，在练习根目录运行备课参考程序：

```bash
julia reference/summarize.jl data/input.csv results
```

追加筛选任务：

```bash
julia reference/summarize.jl data/input.csv results 10
```

第三个参数是最低能量。参考程序不修改输入，只写结果。Julia 参考环境为 1.11.4，使用标准库 DelimitedFiles、Printf，无第三方依赖。脚本是备课参考实现，不是现场 AI 响应记录。

## 文件清单

- `SETUP.md`：官方安装和登录入口、路径例子。
- `PROMPTS.md`：三条可复制提示词。
- `WORKSHEET.md`：课堂练习和自己的第一份任务。
- `data/input.csv`：六行数据。
- `reference/summarize.jl`、`reference/output/`：离线参考程序与实际运行结果。
- `lecture.pdf`：讲义。
