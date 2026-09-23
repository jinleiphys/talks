#!/usr/bin/env python3
"""Build the Nuclear Techniques manuscript from the journal template."""

from __future__ import annotations

import re
import sys
from copy import deepcopy
from pathlib import Path

from docx import Document
from docx.enum.section import WD_SECTION
from docx.enum.style import WD_STYLE_TYPE
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT, WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK, WD_LINE_SPACING, WD_TAB_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Mm, Pt, RGBColor


ROOT = Path(__file__).resolve().parents[1]
BODY_SOURCE = ROOT / "article" / "manuscript_body.md"
FIGURE = ROOT / "figures" / "article" / "five-layer-agent-architecture.png"
OUT_DIR = ROOT / "out" / "manuscript"
OUTPUT = OUT_DIR / "核技术_AI智能体赋能核物理研究_金磊.docx"
JOURNAL_TEMPLATE = ROOT / "投稿模板_Pages.docx"
TEMPLATE = JOURNAL_TEMPLATE if JOURNAL_TEMPLATE.exists() else OUTPUT

sys.path.insert(0, str(Path(__file__).resolve().parent))
from table_geometry import (  # noqa: E402
    apply_table_geometry,
    column_widths_from_weights,
    section_content_width_dxa,
)


TITLE_ZH = "把AI智能体培养成研究生：面向核物理研究的五层个人知识架构"
TITLE_EN = (
    "Training an AI Agent as a Graduate Student: A Five-Layer Personal "
    "Knowledge Architecture for Nuclear-Physics Research"
)

ABSTRACT_ZH = (
    "核物理研究会长期积累已读文献、代码约束、失败路线和验证标准。AI智能体即使在一次会话中"
    "完成复杂任务，换到新会话后也无法自动继承这些信息。为此，本文把会话外的研究记录分为五层。"
    "纯文本文件和版本控制工具保存证据，每次会话先读取一份简短研究档案，再按需"
    "查找带有统一词表的概念笔记。操作和验证方法写成可复用技能，已经纠正的错误另存为反馈记忆。"
    "新资料通过入库、查询和体检写回这些文件。按照预注册方案清点历史记录，共找到22次跨模型"
    "检查，其中8次留下可以独立核对的修正证据。只计算研究产物本身的缺陷时，检出数为5次。"
    "在这22次记录中，没有第二个模型通过阅读源代码发现程序错误。由于许多日常检查没有记录，"
    "这些数目只能看作下界，不能解释为检出率。现有记录支持的结论很有限：跨模型检查适合发现"
    "文字声明、引文和数值叙述的问题；科研代码是否正确，仍要与参考程序、解析极限或已发表"
    "基准独立比对。"
)

ABSTRACT_EN = (
    "[Background]: A session-based AI agent loses the literature, code constraints, failed "
    "approaches, and validation standards that nuclear-physics research accumulates over "
    "time. [Purpose]: This work asks how such context can persist across sessions while "
    "remaining traceable and under the researcher's control. [Methods]: The proposed "
    "architecture has five layers: plain text and version control, an always-loaded "
    "researcher profile, a concept wiki with a controlled vocabulary, reusable skills, and "
    "feedback memory. Three operations, ingest, query, and lint, maintain the read-and-write "
    "cycle. [Results]: A preregistered audit found 22 recorded cross-model checks. Eight left "
    "independently verifiable correction anchors; "
    "five remained when the count was restricted to defects in research artifacts rather "
    "than agent-written records. No check found a code defect. [Conclusions]: The counts are "
    "lower bounds, not rates. Cross-model audits can test textual claims, citations, and "
    "numerical consistency, but generated research code still requires independent numerical "
    "validation against reference implementations, analytic limits, or published benchmarks."
)

REFERENCES = [
    (
        "LEWIS P, PEREZ E, PIKTUS A, et al. Retrieval-Augmented Generation for "
        "Knowledge-Intensive NLP Tasks[C]//Advances in Neural Information Processing "
        "Systems 33. 2020. https://proceedings.neurips.cc/paper/2020/hash/"
        "6b493230205f780e1bc26945df7481e5-Abstract.html."
    ),
    (
        "YAO S, ZHAO J, YU D, et al. ReAct: Synergizing Reasoning and Acting in Language "
        "Models[C]//The Eleventh International Conference on Learning Representations. "
        "2023. https://openreview.net/forum?id=WE_vluYUL-X."
    ),
    (
        "PARK J S, O'BRIEN J C, CAI C J, et al. Generative Agents: Interactive Simulacra "
        "of Human Behavior[C]//Proceedings of the 36th Annual ACM Symposium on User "
        "Interface Software and Technology. New York: ACM, 2023: 1-22. "
        "DOI: 10.1145/3586183.3606763."
    ),
    (
        "SHINN N, CASSANO F, GOPINATH A, et al. Reflexion: Language Agents with Verbal "
        "Reinforcement Learning[C]//Advances in Neural Information Processing Systems 36. "
        "2023. https://proceedings.neurips.cc/paper_files/paper/2023/hash/"
        "1b44b878bb782e6954cd888628510e90-Abstract-Conference.html."
    ),
    (
        "BRAN A M, COX S, SCHILTER O, et al. Augmenting large language models with "
        "chemistry tools[J]. Nature Machine Intelligence, 2024, 6: 525-535. "
        "DOI: 10.1038/s42256-024-00832-8."
    ),
    (
        "BOIKO D A, MACKNIGHT R, KLINE B, et al. Autonomous chemical research with large "
        "language models[J]. Nature, 2023, 624: 570-578. "
        "DOI: 10.1038/s41586-023-06792-0."
    ),
    (
        "LU C, LU C, LANGE R T, et al. The AI Scientist: Towards Fully Automated "
        "Open-Ended Scientific Discovery[EB/OL]. arXiv:2408.06292, 2024[2026-07-17]. "
        "https://arxiv.org/abs/2408.06292."
    ),
    (
        "KARPATHY A. There's a new kind of coding I call \"vibe coding\"[EB/OL]. "
        "2025-02-02[2026-08-05]. "
        "https://x.com/karpathy/status/1886192184808149383."
    ),
    (
        "KARPATHY A. LLM Wiki: A Pattern for Building Personal Knowledge Bases Using "
        "LLMs[EB/OL]. 2026-04-04[2026-07-17]. "
        "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f."
    ),
    (
        "LEI J. research_LLM_wiki: Cross-harness agent skills for maintaining a personal "
        "literature wiki and research portfolio[CP/OL]. 2026[2026-07-17]. "
        "https://github.com/jinleiphys/research_LLM_wiki."
    ),
    (
        "LEI J. High-Dimensional Bayesian Calibration of Expensive Nuclear Models with "
        "Differentiable Emulation[EB/OL]. arXiv:2605.30980, 2026[2026-07-17]. "
        "DOI: 10.48550/arXiv.2605.30980."
    ),
    (
        "LEI J. HPRMAT: A high-performance R-matrix solver with GPU acceleration for "
        "coupled-channel problems in nuclear physics[EB/OL]. arXiv:2512.11590, "
        "2025[2026-07-20]. https://arxiv.org/abs/2512.11590."
    ),
    (
        "LEI J. Bidirectional neural networks for global nucleon-nucleus optical model "
        "calculations[J]. Physical Review C, 2026, 114: 014620. "
        "DOI: 10.1103/qw54-df4l."
    ),
    (
        "APS JOURNALS. Appropriate Use of AI Tools[EB/OL]. 2026-06-17[2026-07-17]. "
        "https://journals.aps.org/authors/appropriate-use-ai-tools."
    ),
]


def set_run_fonts(run, east_asia="宋体", latin="Times New Roman", size=None, bold=None, italic=None):
    run.font.name = latin
    if size is not None:
        run.font.size = Pt(size)
    if bold is not None:
        run.bold = bold
    if italic is not None:
        run.italic = italic
    rpr = run._element.get_or_add_rPr()
    fonts = rpr.get_or_add_rFonts()
    fonts.set(qn("w:ascii"), latin)
    fonts.set(qn("w:hAnsi"), latin)
    fonts.set(qn("w:eastAsia"), east_asia)
    fonts.set(qn("w:cs"), latin)


def set_style_fonts(style, east_asia, latin, size, bold=False):
    style.font.name = latin
    style.font.size = Pt(size)
    style.font.bold = bold
    rpr = style.element.get_or_add_rPr()
    fonts = rpr.get_or_add_rFonts()
    fonts.set(qn("w:ascii"), latin)
    fonts.set(qn("w:hAnsi"), latin)
    fonts.set(qn("w:eastAsia"), east_asia)
    fonts.set(qn("w:cs"), latin)


def ensure_style(doc, name, base="Normal"):
    try:
        return doc.styles[name]
    except KeyError:
        style = doc.styles.add_style(name, WD_STYLE_TYPE.PARAGRAPH)
        style.base_style = doc.styles[base]
        return style


def normalize_styles(doc):
    normal = doc.styles["Normal"]
    set_style_fonts(normal, "宋体", "Times New Roman", 10.5)
    normal.paragraph_format.space_after = Pt(0)
    normal.paragraph_format.line_spacing = Pt(16)

    body = ensure_style(doc, "正文")
    set_style_fonts(body, "宋体", "Times New Roman", 10.5)
    body.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    body.paragraph_format.first_line_indent = Pt(21)
    body.paragraph_format.space_before = Pt(0)
    body.paragraph_format.space_after = Pt(0)
    body.paragraph_format.line_spacing_rule = WD_LINE_SPACING.EXACTLY
    body.paragraph_format.line_spacing = Pt(16)
    body.paragraph_format.widow_control = True

    title = ensure_style(doc, "标题 1")
    set_style_fonts(title, "黑体", "Times New Roman", 18, bold=True)
    title.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    title.paragraph_format.space_before = Pt(2)
    title.paragraph_format.space_after = Pt(3)
    title.paragraph_format.keep_with_next = True

    h2 = ensure_style(doc, "标题 2")
    set_style_fonts(h2, "黑体", "Times New Roman", 12, bold=True)
    h2.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.LEFT
    h2.paragraph_format.first_line_indent = Pt(0)
    h2.paragraph_format.space_before = Pt(6)
    h2.paragraph_format.space_after = Pt(2)
    h2.paragraph_format.keep_with_next = True
    h2.paragraph_format.keep_together = True

    h3 = ensure_style(doc, "标题 3")
    set_style_fonts(h3, "黑体", "Times New Roman", 10.5, bold=True)
    h3.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.LEFT
    h3.paragraph_format.first_line_indent = Pt(0)
    h3.paragraph_format.space_before = Pt(4)
    h3.paragraph_format.space_after = Pt(1)
    h3.paragraph_format.keep_with_next = True
    h3.paragraph_format.keep_together = True

    for name, east, latin, size, bold in [
        ("作者名", "宋体", "Times New Roman", 12, False),
        ("作者单位", "宋体", "Times New Roman", 9, False),
        ("摘要", "宋体", "Times New Roman", 9, False),
        ("外文标题", "Times New Roman", "Times New Roman", 12, True),
        ("作者英文名", "Times New Roman", "Times New Roman", 10.5, False),
        ("英文作者单位", "Times New Roman", "Times New Roman", 8, False),
        ("图标题", "宋体", "Times New Roman", 9, False),
        ("表标题", "宋体", "Times New Roman", 9, False),
        ("表内文字", "宋体", "Times New Roman", 9, False),
        ("参考文献", "黑体", "Times New Roman", 10.5, True),
        ("参考文献列表", "宋体", "Times New Roman", 9, False),
        ("页眉", "宋体", "Times New Roman", 9, False),
        ("页脚", "宋体", "Times New Roman", 8, False),
    ]:
        style = ensure_style(doc, name)
        set_style_fonts(style, east, latin, size, bold=bold)
        style.paragraph_format.space_before = Pt(0)
        style.paragraph_format.space_after = Pt(0)
        if name in {"作者名", "作者单位", "外文标题", "作者英文名", "英文作者单位", "图标题", "表标题"}:
            style.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
        if name in {"摘要", "参考文献列表"}:
            style.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
            style.paragraph_format.line_spacing_rule = WD_LINE_SPACING.EXACTLY
            style.paragraph_format.line_spacing = Pt(13)


def clear_body(doc):
    body = doc._element.body
    sect_pr = body.sectPr
    for child in list(body):
        if child is not sect_pr:
            body.remove(child)


def clear_container(container):
    element = container._element
    for child in list(element):
        element.remove(child)
    p = OxmlElement("w:p")
    element.append(p)


def set_cell_text(cell, text, *, size=8, bold=False, align=WD_ALIGN_PARAGRAPH.CENTER):
    cell.text = ""
    p = cell.paragraphs[0]
    p.alignment = align
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(0)
    p.paragraph_format.line_spacing = Pt(10.5)
    run = p.add_run(text)
    set_run_fonts(run, size=size, bold=bold)
    cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER


def add_field(run, instruction):
    begin = OxmlElement("w:fldChar")
    begin.set(qn("w:fldCharType"), "begin")
    instr = OxmlElement("w:instrText")
    instr.set(qn("xml:space"), "preserve")
    instr.text = instruction
    separate = OxmlElement("w:fldChar")
    separate.set(qn("w:fldCharType"), "separate")
    display = OxmlElement("w:t")
    display.text = "1"
    end = OxmlElement("w:fldChar")
    end.set(qn("w:fldCharType"), "end")
    run._r.extend([begin, instr, separate, display, end])


def set_paragraph_top_border(paragraph, color="000000", size="8"):
    ppr = paragraph._p.get_or_add_pPr()
    borders = ppr.find(qn("w:pBdr"))
    if borders is None:
        borders = OxmlElement("w:pBdr")
        ppr.append(borders)
    top = OxmlElement("w:top")
    top.set(qn("w:val"), "single")
    top.set(qn("w:sz"), size)
    top.set(qn("w:space"), "1")
    top.set(qn("w:color"), color)
    borders.append(top)


def set_paragraph_bottom_border(paragraph, color="000000", size="8"):
    ppr = paragraph._p.get_or_add_pPr()
    borders = ppr.find(qn("w:pBdr"))
    if borders is None:
        borders = OxmlElement("w:pBdr")
        ppr.append(borders)
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), size)
    bottom.set(qn("w:space"), "1")
    bottom.set(qn("w:color"), color)
    borders.append(bottom)


def set_table_borders(table, *, top="12", inside="6", bottom="12"):
    tbl_pr = table._tbl.tblPr
    old = tbl_pr.find(qn("w:tblBorders"))
    if old is not None:
        tbl_pr.remove(old)
    borders = OxmlElement("w:tblBorders")
    for edge in ("left", "right", "insideH", "insideV"):
        item = OxmlElement(f"w:{edge}")
        item.set(qn("w:val"), "nil")
        borders.append(item)
    for edge, width in (("top", top), ("bottom", bottom)):
        item = OxmlElement(f"w:{edge}")
        item.set(qn("w:val"), "single")
        item.set(qn("w:sz"), width)
        item.set(qn("w:space"), "0")
        item.set(qn("w:color"), "000000")
        borders.append(item)
    tbl_pr.append(borders)

    header_cells = table.rows[0].cells
    for cell in header_cells:
        tc_pr = cell._tc.get_or_add_tcPr()
        tc_borders = tc_pr.find(qn("w:tcBorders"))
        if tc_borders is None:
            tc_borders = OxmlElement("w:tcBorders")
            tc_pr.append(tc_borders)
        bottom_edge = OxmlElement("w:bottom")
        bottom_edge.set(qn("w:val"), "single")
        bottom_edge.set(qn("w:sz"), inside)
        bottom_edge.set(qn("w:space"), "0")
        bottom_edge.set(qn("w:color"), "000000")
        tc_borders.append(bottom_edge)


def mark_header_row(row):
    tr_pr = row._tr.get_or_add_trPr()
    header = OxmlElement("w:tblHeader")
    header.set(qn("w:val"), "true")
    tr_pr.append(header)


def add_page_footer(footer, *, first_page=False):
    clear_container(footer)
    paragraphs = footer.paragraphs
    if first_page:
        p = paragraphs[0]
        set_paragraph_top_border(p)
        p.style = "页脚"
        p.paragraph_format.space_before = Pt(1)
        lines = [
            "基金项目：国家自然科学基金项目（12475132）资助",
            "第一作者：金磊，男，博士，教授，研究领域为核反应理论及机器学习在核物理中的应用",
            "通讯作者：金磊，E-mail: jinl@tongji.edu.cn",
            "收稿日期：待编辑部填写，修回日期：待编辑部填写",
        ]
        for text in lines:
            q = footer.add_paragraph(style="页脚")
            q.paragraph_format.space_after = Pt(0)
            run = q.add_run(text)
            set_run_fonts(run, size=7.5)
    p = footer.add_paragraph(style="页脚")
    p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    run = p.add_run("XXXXXX-")
    set_run_fonts(run, size=8)
    page_run = p.add_run()
    set_run_fonts(page_run, size=8)
    add_field(page_run, "PAGE")


def add_first_page_header(header, section):
    clear_container(header)
    lines = [
        (header.paragraphs[0], "第XX卷 第X期", "核    技    术", "Vol.XX, No.X", 9),
        (header.add_paragraph(), "20XX年X月", "NUCLEAR TECHNIQUES", "XXX 20XX", 8.5),
    ]
    for p, left, center, right, size in lines:
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(0)
        p.paragraph_format.line_spacing = Pt(10.5)
        tabs = p.paragraph_format.tab_stops
        tabs.add_tab_stop(Mm(85), WD_TAB_ALIGNMENT.CENTER)
        tabs.add_tab_stop(Mm(170), WD_TAB_ALIGNMENT.RIGHT)
        r = p.add_run(left)
        set_run_fonts(r, size=size)
        r.add_tab()
        r = p.add_run(center)
        set_run_fonts(r, size=size, bold=True)
        r.add_tab()
        r = p.add_run(right)
        set_run_fonts(r, size=size)
    set_paragraph_top_border(lines[0][0], size="8")
    set_paragraph_bottom_border(lines[1][0], size="8")


def add_running_header(header, text, align):
    clear_container(header)
    p = header.paragraphs[0]
    p.style = "页眉"
    p.alignment = align
    p.paragraph_format.space_after = Pt(0)
    run = p.add_run(text)
    set_run_fonts(run, size=8.5)
    set_paragraph_top_border(p, color="000000", size="4")


def set_section_geometry(section):
    section.page_width = Mm(210)
    section.page_height = Mm(297)
    section.top_margin = Mm(22)
    section.bottom_margin = Mm(29)
    section.left_margin = Mm(23)
    section.right_margin = Mm(16)
    section.header_distance = Mm(10.5)
    section.footer_distance = Mm(12)


def enable_even_odd_headers(doc):
    settings = doc.settings._element
    if settings.find(qn("w:evenAndOddHeaders")) is None:
        settings.append(OxmlElement("w:evenAndOddHeaders"))


def set_page_number_start(section, start=None):
    sect_pr = section._sectPr
    old = sect_pr.find(qn("w:pgNumType"))
    if old is not None:
        sect_pr.remove(old)
    if start is not None:
        node = OxmlElement("w:pgNumType")
        node.set(qn("w:start"), str(start))
        sect_pr.append(node)


def add_front_matter(doc):
    p = doc.add_paragraph(style="标题 1")
    run = p.add_run("把AI智能体培养成研究生：")
    set_run_fonts(run, east_asia="黑体", size=18, bold=True)
    run.add_break()
    run = p.add_run("面向核物理研究的五层个人知识架构")
    set_run_fonts(run, east_asia="黑体", size=18, bold=True)

    p = doc.add_paragraph(style="作者名")
    p.add_run("金  磊")
    sup = p.add_run("1,2")
    sup.font.superscript = True
    for run in p.runs:
        set_run_fonts(run, size=12)

    p = doc.add_paragraph(style="作者单位")
    p.add_run("1（同济大学物理科学与工程学院  上海 200092）")
    p.add_run().add_break()
    p.add_run("2（中国科学院近代物理研究所南方核科学理论研究中心  广东惠州 516000）")
    for run in p.runs:
        set_run_fonts(run, size=9)

    p = doc.add_paragraph(style="摘要")
    label = p.add_run("摘要  ")
    set_run_fonts(label, east_asia="黑体", size=9, bold=True)
    content = p.add_run(ABSTRACT_ZH)
    set_run_fonts(content, size=9)
    p.paragraph_format.first_line_indent = Pt(0)

    p = doc.add_paragraph(style="摘要")
    label = p.add_run("关键词  ")
    set_run_fonts(label, east_asia="黑体", size=9, bold=True)
    content = p.add_run("AI智能体；vibe coding；个人知识库；核物理科研工作流；可复现研究")
    set_run_fonts(content, size=9)
    p.paragraph_format.first_line_indent = Pt(0)

    p = doc.add_paragraph(style="摘要")
    label = p.add_run("中图分类号  ")
    set_run_fonts(label, east_asia="黑体", size=9, bold=True)
    content = p.add_run("TL99；TP18")
    set_run_fonts(content, size=9)
    p.paragraph_format.first_line_indent = Pt(0)

    p = doc.add_paragraph(style="外文标题")
    run = p.add_run(TITLE_EN)
    set_run_fonts(run, east_asia="Times New Roman", size=12, bold=True)

    p = doc.add_paragraph(style="作者英文名")
    p.add_run("JIN Lei")
    sup = p.add_run("1,2")
    sup.font.superscript = True
    for run in p.runs:
        set_run_fonts(run, east_asia="Times New Roman", size=10.5)

    p = doc.add_paragraph(style="英文作者单位")
    p.add_run("1(School of Physics Science and Engineering, Tongji University, Shanghai 200092, China)")
    p.add_run().add_break()
    p.add_run(
        "2(Southern Center for Nuclear-Science Theory (SCNT), Institute of Modern Physics, "
        "Chinese Academy of Sciences, Huizhou 516000, Guangdong Province, China)"
    )
    for run in p.runs:
        set_run_fonts(run, east_asia="Times New Roman", size=8)

    p = doc.add_paragraph(style="摘要")
    label = p.add_run("Abstract  ")
    set_run_fonts(label, east_asia="Times New Roman", size=8.5, bold=True)
    content = p.add_run(ABSTRACT_EN)
    set_run_fonts(content, east_asia="Times New Roman", size=8.5)
    p.paragraph_format.first_line_indent = Pt(0)
    p.paragraph_format.line_spacing = Pt(11.5)

    p = doc.add_paragraph(style="摘要")
    label = p.add_run("Key words  ")
    set_run_fonts(label, east_asia="Times New Roman", size=8.5, bold=True)
    content = p.add_run(
        "AI agent; Vibe coding; Personal knowledge base; "
        "Nuclear physics research workflow; Reproducible research"
    )
    set_run_fonts(content, east_asia="Times New Roman", size=8.5)
    p.paragraph_format.first_line_indent = Pt(0)


def add_body_paragraph(doc, text):
    p = doc.add_paragraph(style="正文")
    run = p.add_run(text)
    set_run_fonts(run, size=10.5)
    return p


def add_heading(doc, text, level):
    style = "标题 2" if level == 1 else "标题 3"
    p = doc.add_paragraph(style=style)
    run = p.add_run(text)
    set_run_fonts(run, east_asia="黑体", size=12 if level == 1 else 10.5, bold=True)
    return p


def add_table_caption(doc, index, chinese, english):
    p = doc.add_paragraph(style="表标题")
    p.paragraph_format.keep_with_next = True
    r1 = p.add_run(f"表{index}  {chinese}")
    set_run_fonts(r1, east_asia="黑体", size=9, bold=True)
    r1.add_break()
    r2 = p.add_run(f"Table {index}  {english}")
    set_run_fonts(r2, east_asia="Times New Roman", size=9)


TABLE_CAPTIONS = {
    1: ("研究生培养动作与智能体知识架构的对应关系", "Mapping from graduate-student training to the agent knowledge architecture"),
    2: ("知识库三类操作及其审查关口", "Three knowledge-base operations and their review gates"),
}


def add_markdown_table(doc, rows, index, section):
    chinese, english = TABLE_CAPTIONS[index]
    add_table_caption(doc, index, chinese, english)
    table = doc.add_table(rows=len(rows), cols=len(rows[0]))
    table.alignment = WD_TABLE_ALIGNMENT.LEFT
    for r, row in enumerate(rows):
        for c, text in enumerate(row):
            align = WD_ALIGN_PARAGRAPH.CENTER
            if r > 0 and c in {0, len(row) - 1}:
                align = WD_ALIGN_PARAGRAPH.LEFT
            set_cell_text(table.cell(r, c), text, size=8.6, bold=(r == 0), align=align)
    weights = {
        1: [0.25, 0.34, 0.41],
        2: [0.16, 0.23, 0.34, 0.27],
        3: [0.25, 0.22, 0.53],
    }[index]
    width = section_content_width_dxa(section)
    apply_table_geometry(
        table,
        column_widths_from_weights(weights, width),
        table_width_dxa=width,
        indent_dxa=120,
        cell_margins_dxa={"top": 75, "bottom": 75, "start": 120, "end": 120},
    )
    set_table_borders(table)
    mark_header_row(table.rows[0])
    after = doc.add_paragraph(style="正文")
    after.paragraph_format.first_line_indent = Pt(0)
    after.paragraph_format.space_after = Pt(0)
    return table


def add_figure(doc):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.SINGLE
    p.paragraph_format.keep_with_next = True
    p.paragraph_format.space_before = Pt(3)
    p.paragraph_format.space_after = Pt(1)
    run = p.add_run()
    inline = run.add_picture(str(FIGURE), width=Mm(160))
    inline._inline.docPr.set(
        "descr",
        "Five-layer architecture and compounding loop for a research AI agent, with a human control plane.",
    )

    cap = doc.add_paragraph(style="图标题")
    cap.paragraph_format.keep_together = True
    cap.paragraph_format.space_after = Pt(3)
    r1 = cap.add_run(
        "图1  面向核物理研究的五层AI智能体知识架构与写回循环。图形结构在AI辅助下起草，"
        "作者用Python脚本生成图件，并逐项核对"
    )
    set_run_fonts(r1, east_asia="黑体", size=9, bold=True)
    r1.add_break()
    r2 = cap.add_run(
        "Fig.1  Five-layer knowledge architecture and write-back loop for a nuclear-physics "
        "research agent. The layout was drafted with AI assistance, generated with a Python "
        "script, and verified by the author"
    )
    set_run_fonts(r2, east_asia="Times New Roman", size=8.5)


def add_numbering_definition(doc):
    numbering = doc.part.numbering_part.element
    abstract_nums = numbering.findall(qn("w:abstractNum"))
    num_nodes = numbering.findall(qn("w:num"))
    abstract_id = max([int(n.get(qn("w:abstractNumId"))) for n in abstract_nums] + [0]) + 1
    num_id = max([int(n.get(qn("w:numId"))) for n in num_nodes] + [0]) + 1

    abstract = OxmlElement("w:abstractNum")
    abstract.set(qn("w:abstractNumId"), str(abstract_id))
    multi = OxmlElement("w:multiLevelType")
    multi.set(qn("w:val"), "singleLevel")
    abstract.append(multi)
    lvl = OxmlElement("w:lvl")
    lvl.set(qn("w:ilvl"), "0")
    start = OxmlElement("w:start")
    start.set(qn("w:val"), "1")
    num_fmt = OxmlElement("w:numFmt")
    num_fmt.set(qn("w:val"), "decimal")
    lvl_text = OxmlElement("w:lvlText")
    lvl_text.set(qn("w:val"), "[%1]")
    suff = OxmlElement("w:suff")
    suff.set(qn("w:val"), "space")
    ppr = OxmlElement("w:pPr")
    tabs = OxmlElement("w:tabs")
    tab = OxmlElement("w:tab")
    tab.set(qn("w:val"), "num")
    tab.set(qn("w:pos"), "360")
    tabs.append(tab)
    ind = OxmlElement("w:ind")
    ind.set(qn("w:left"), "360")
    ind.set(qn("w:hanging"), "360")
    ppr.extend([tabs, ind])
    lvl.extend([start, num_fmt, lvl_text, suff, ppr])
    abstract.append(lvl)
    numbering.append(abstract)

    num = OxmlElement("w:num")
    num.set(qn("w:numId"), str(num_id))
    abstract_ref = OxmlElement("w:abstractNumId")
    abstract_ref.set(qn("w:val"), str(abstract_id))
    num.append(abstract_ref)
    numbering.append(num)
    return num_id


def apply_numbering(paragraph, num_id):
    ppr = paragraph._p.get_or_add_pPr()
    num_pr = OxmlElement("w:numPr")
    ilvl = OxmlElement("w:ilvl")
    ilvl.set(qn("w:val"), "0")
    num_id_el = OxmlElement("w:numId")
    num_id_el.set(qn("w:val"), str(num_id))
    num_pr.extend([ilvl, num_id_el])
    ppr.append(num_pr)


def add_references(doc):
    p = doc.add_paragraph(style="参考文献")
    p.paragraph_format.keep_with_next = True
    run = p.add_run("参考文献")
    set_run_fonts(run, east_asia="黑体", size=10.5, bold=True)
    for index, ref in enumerate(REFERENCES, start=1):
        p = doc.add_paragraph(style="参考文献列表")
        p.paragraph_format.left_indent = Pt(18)
        p.paragraph_format.first_line_indent = Pt(-18)
        p.paragraph_format.keep_together = True
        run = p.add_run(f"[{index}] {ref}")
        set_run_fonts(run, size=8.5)


def parse_body(doc, section):
    lines = BODY_SOURCE.read_text(encoding="utf-8").splitlines()
    table_index = 0
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if not line:
            i += 1
            continue
        if line == "[[FIGURE_1]]":
            add_figure(doc)
            i += 1
            continue
        if line.startswith("# "):
            add_heading(doc, line[2:].strip(), 1)
            i += 1
            continue
        if line.startswith("## "):
            add_heading(doc, line[3:].strip(), 2)
            i += 1
            continue
        if line.startswith("|"):
            block = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                block.append(lines[i].strip())
                i += 1
            parsed = []
            for raw in block:
                cells = [c.strip() for c in raw.strip("|").split("|")]
                if all(re.fullmatch(r":?-{3,}:?", c) for c in cells):
                    continue
                parsed.append(cells)
            table_index += 1
            add_markdown_table(doc, parsed, table_index, section)
            continue
        add_body_paragraph(doc, line)
        i += 1


def configure_headers_footers(doc, first, body):
    enable_even_odd_headers(doc)
    first.different_first_page_header_footer = False
    body.different_first_page_header_footer = False
    for section in (first, body):
        title_page = section._sectPr.find(qn("w:titlePg"))
        if title_page is not None:
            section._sectPr.remove(title_page)

    for section in (first, body):
        section.header.is_linked_to_previous = False
        section.even_page_header.is_linked_to_previous = False
        section.first_page_header.is_linked_to_previous = False
        section.footer.is_linked_to_previous = False
        section.even_page_footer.is_linked_to_previous = False
        section.first_page_footer.is_linked_to_previous = False

    clear_container(first.header)
    clear_container(first.even_page_header)
    clear_container(first.first_page_header)
    clear_container(first.footer)
    clear_container(first.even_page_footer)
    clear_container(first.first_page_footer)
    clear_container(body.header)
    clear_container(body.even_page_header)
    clear_container(body.first_page_header)
    clear_container(body.footer)
    clear_container(body.even_page_footer)
    clear_container(body.first_page_footer)

    add_first_page_header(first.header, first)
    add_page_footer(first.footer, first_page=True)

    short_title = "金磊：把AI智能体培养成研究生：面向核物理研究的五层个人知识架构"
    add_running_header(body.header, short_title, WD_ALIGN_PARAGRAPH.CENTER)
    add_running_header(body.even_page_header, "核  技  术   20XX, XX: XXXXXX", WD_ALIGN_PARAGRAPH.CENTER)
    add_page_footer(body.footer)
    add_page_footer(body.even_page_footer)


def main():
    if not TEMPLATE.exists():
        raise FileNotFoundError(TEMPLATE)
    if not FIGURE.exists():
        raise FileNotFoundError(FIGURE)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    doc = Document(TEMPLATE)
    clear_body(doc)
    normalize_styles(doc)

    props = doc.core_properties
    props.title = TITLE_ZH
    props.subject = "AI Agent and vibe coding for nuclear-physics research"
    props.author = "Jin Lei"
    props.keywords = "AI agent, nuclear physics, personal knowledge base, vibe coding"
    props.comments = "Prepared for the Nuclear Techniques AI Agent and Vibe Coding special issue."

    front_section = doc.sections[0]
    set_section_geometry(front_section)
    set_page_number_start(front_section, 1)
    add_front_matter(doc)

    doc.add_section(WD_SECTION.NEW_PAGE)
    first, body = doc.sections[0], doc.sections[1]
    set_section_geometry(first)
    set_page_number_start(first, 1)
    set_section_geometry(body)
    set_page_number_start(body, None)
    configure_headers_footers(doc, first, body)

    parse_body(doc, body)

    p = doc.add_paragraph(style="正文")
    p.paragraph_format.first_line_indent = Pt(0)
    label = p.add_run("致谢  ")
    set_run_fonts(label, east_asia="黑体", size=10.5, bold=True)
    disclosure = p.add_run(
        "作者在论文结构整理、初稿生成、后续修订、参考文献格式核查、图形脚本起草和Word排版中使用"
        "Anthropic Claude（Opus 4.8）与OpenAI Codex（GPT-5）。"
        "预注册清点由智能体按照事先冻结的判据执行。作者复核了全部计数和修正证据，确认"
        "保密材料已经排除，并对清点中说明的方案偏离负责。作者依据原始记录和权威数据库逐段核对文本、"
        "数据、图件和文献，并对全部科学判断和最终内容承担责任。"
    )
    set_run_fonts(disclosure, size=10.5)

    add_references(doc)

    doc.save(OUTPUT)
    print(OUTPUT)


if __name__ == "__main__":
    main()
