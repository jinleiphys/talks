#!/usr/bin/env python3
"""Print a timeline of an asciicast so markers can be chosen from evidence.

The demo slides are paced by markers: asciinema-player pauses at each one
and the clicker resumes it. Picking those timestamps by guesswork is how
a demo ends up pausing in the middle of a word, so this dumps every line
the recording emitted with the time it appeared, and a --grep mode turns
chosen lines straight into the marker array the slide needs.

    python3 scripts/cast_timeline.py public/casts/demo.cast
    python3 scripts/cast_timeline.py public/casts/demo.cast \
        --grep 'kd02.f::参数有出处' --grep 'EXFOR::没有数据'
"""
import argparse, json, re, sys

ANSI = re.compile(r'\x1b\[[0-9;?]*[A-Za-z]|\x1b\][^\x07]*\x07|\x1b[()][AB012]')


def read(path):
    """asciicast v2: header line, then [time, code, data] per line."""
    lines = open(path, encoding='utf-8').read().splitlines()
    header = json.loads(lines[0])
    events = []
    for ln in lines[1:]:
        if not ln.strip():
            continue
        t, code, data = json.loads(ln)
        if code == 'o':
            events.append((t, data))
    return header, events


def flatten(events):
    """Attribute each emitted text line to the time its first byte arrived."""
    out, buf, start = [], '', 0.0
    for t, data in events:
        for ch in data:
            if not buf:
                start = t
            if ch == '\n':
                text = ANSI.sub('', buf).replace('\r', '').rstrip()
                if text.strip():
                    out.append((start, text))
                buf = ''
            else:
                buf += ch
    if buf.strip():
        out.append((start, ANSI.sub('', buf).rstrip()))
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('cast')
    ap.add_argument('--grep', action='append', default=[],
                    help='PATTERN::LABEL; both sides may contain an equals sign')
    ap.add_argument('--lead', type=float, default=0.0,
                    help='seconds to place the marker before the matched line')
    ap.add_argument('--trim', type=float,
                    help='drop every event after this time and write --out')
    ap.add_argument('--out', help='destination for --trim')
    args = ap.parse_args()

    if args.trim is not None:
        # A recording ends with whatever the driver typed to leave the TUI, plus
        # the resume hint that carries a session id. Cutting the tail is the only
        # edit made to a cast, and it is a truncation, never a splice.
        if not args.out:
            ap.error('--trim needs --out')
        lines = open(args.cast, encoding='utf-8').read().splitlines()
        kept = [lines[0]]
        for ln in lines[1:]:
            if not ln.strip():
                continue
            if json.loads(ln)[0] > args.trim:
                break
            kept.append(ln)
        with open(args.out, 'w', encoding='utf-8') as fh:
            fh.write('\n'.join(kept) + '\n')
        print('%s: %d of %d events, cut at %.2fs'
              % (args.out, len(kept) - 1, len(lines) - 1, args.trim), file=sys.stderr)
        return

    header, events = read(args.cast)
    lines = flatten(events)
    total = events[-1][0] if events else 0
    print('# %s  %dx%d  %.1fs  %d lines'
          % (args.cast, header['width'], header['height'], total, len(lines)),
          file=sys.stderr)

    if not args.grep:
        for t, text in lines:
            print('%8.2f  %s' % (t, text[:140]))
        return

    markers, used = [], set()
    for spec in args.grep:
        # '::', not '=': patterns routinely contain an equals sign
        # (hcm=0.05) and so do labels (ap=0), so splitting on the first
        # one drops the label and splitting on the last one drops the
        # pattern. Both were live bugs before this separator.
        pattern, _, label = spec.partition('::')
        for t, text in lines:
            if pattern in text and t not in used:
                markers.append([round(max(t - args.lead, 0.0), 2), label or pattern])
                used.add(t)
                break
        else:
            print('NO MATCH: %s' % pattern, file=sys.stderr)
    markers.sort()
    print(json.dumps(markers, ensure_ascii=False))


if __name__ == '__main__':
    main()
