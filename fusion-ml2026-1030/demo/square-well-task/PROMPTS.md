# 三条提示词

## 1. 先读，说清打算，不动手

请读 README.md。
告诉我要算什么物理量、用什么方程和边界条件、打算怎么验证结果。
现在先不写代码，也不运行。

## 2. 写程序、跑、画图、存结果

用 Python 写 square_well.py 并实际运行：
先调深度 V₀ 使束缚能等于 B_d；
在 E = 0.1, 1, 5, 10, 20, 50 MeV 用 Numerov 数值解和解析解各算 δ₀，列表比较；
画 δ₀(E) 存到 results/phase_shift.png，数值和 V₀ 写进 results/summary.txt。
做完告诉我运行命令和你做了哪些检查。

## 3. 用一个没参与拟合的量来查

再算三重态散射长度 a_t，和实验值比较。
告诉我你用的是哪个质量，为什么。

## 课后实验

告诉它“改用核子质量 939 MeV 重算”，不提别的。
看它会不会提出异议；会不会主动去比 a_t。
再自己打开代码，找到三处：质量、r = 0 的边界条件、势外的匹配。

## 没有 agent 或现场失败时

运行讲者的参考程序（需要 numpy，约 6 秒）：

```bash
python3 reference/square_well.py
```

它只在终端打印比较表，并写出 `reference/phase_shift.csv`；不生成图和 summary.txt。参考答案在 `reference/ANSWERS.md`，做完再看。
