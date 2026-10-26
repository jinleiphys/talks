# 输出检查反例

2026-10-11，用 FUSION 原始 check_xsec.py 制作只含一个共有量的输出，与含三项的参考比较。
两个文件均为人工构造。reaction 数值取既有记录，但 absorption=1000、outgoing=299.19061 只是测试值，无科学含义。
运行返回 0，stdout 保存为 observed.txt。
这说明原脚本不能验收“必需交齐三项”的任务，不等于其共有量比较算法算错。
没有修改 FUSION 原始仓库。

```bash
python3 check_xsec.snapshot.py missing-fields.out --ref reference.out --sigfig 6
```

脚本为制作当天原始文件的副本，不表示已经完成讲稿提出的修复。
