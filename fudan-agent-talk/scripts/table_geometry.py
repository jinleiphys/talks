"""Fixed-layout table geometry helpers for python-docx.

Vendored into this repository on 2026-07-20. The build script previously imported
these from a Codex plugin cache path
(~/.codex/plugins/cache/openai-primary-runtime/documents/<version>/skills/...),
which disappeared when the plugin was removed, breaking the build. Keeping the
three functions here removes the external dependency.

All widths are in dxa (twentieths of a point), the unit Word uses in w:tblW,
w:gridCol and w:tcW.
"""

from docx.oxml.ns import qn
from docx.oxml import OxmlElement


def section_content_width_dxa(section):
    """Usable text width of a section, in dxa."""
    return int(section.page_width.twips - section.left_margin.twips - section.right_margin.twips)


def column_widths_from_weights(weights, total_dxa):
    """Split total_dxa across columns in proportion to weights.

    Rounding error is absorbed by the last column so the widths sum exactly to
    total_dxa; Word renders a ragged right edge if they do not.
    """
    total_weight = float(sum(weights))
    widths = [int(round(total_dxa * w / total_weight)) for w in weights[:-1]]
    widths.append(int(total_dxa) - sum(widths))
    return widths


def _set_or_replace(parent, tag, attrs):
    existing = parent.find(qn(tag))
    if existing is not None:
        parent.remove(existing)
    el = OxmlElement(tag)
    for key, value in attrs.items():
        el.set(qn(key), str(value))
    parent.append(el)
    return el


def _tbl_pr(table):
    tbl = table._tbl
    pr = tbl.find(qn("w:tblPr"))
    if pr is None:
        pr = OxmlElement("w:tblPr")
        tbl.insert(0, pr)
    return pr


def apply_table_geometry(
    table,
    column_widths_dxa,
    table_width_dxa=None,
    indent_dxa=0,
    cell_margins_dxa=None,
):
    """Pin a table to a fixed layout with explicit column widths.

    Word only honours per-column widths when the layout algorithm is fixed and a
    w:tblGrid is present; autofit silently re-flows everything otherwise.
    """
    if table_width_dxa is None:
        table_width_dxa = sum(column_widths_dxa)

    pr = _tbl_pr(table)
    _set_or_replace(pr, "w:tblW", {"w:w": int(table_width_dxa), "w:type": "dxa"})
    _set_or_replace(pr, "w:tblLayout", {"w:type": "fixed"})
    if indent_dxa:
        _set_or_replace(pr, "w:tblInd", {"w:w": int(indent_dxa), "w:type": "dxa"})

    if cell_margins_dxa:
        mar = _set_or_replace(pr, "w:tblCellMar", {})
        for side in ("top", "start", "bottom", "end"):
            if side in cell_margins_dxa:
                el = OxmlElement("w:%s" % side)
                el.set(qn("w:w"), str(int(cell_margins_dxa[side])))
                el.set(qn("w:type"), "dxa")
                mar.append(el)

    table.autofit = False

    grid = table._tbl.find(qn("w:tblGrid"))
    if grid is not None:
        table._tbl.remove(grid)
    grid = OxmlElement("w:tblGrid")
    for width in column_widths_dxa:
        col = OxmlElement("w:gridCol")
        col.set(qn("w:w"), str(int(width)))
        grid.append(col)
    pr.addnext(grid)

    for row in table.rows:
        for idx, cell in enumerate(row.cells):
            if idx >= len(column_widths_dxa):
                continue
            tc_pr = cell._tc.get_or_add_tcPr()
            _set_or_replace(tc_pr, "w:tcW", {"w:w": int(column_widths_dxa[idx]), "w:type": "dxa"})
