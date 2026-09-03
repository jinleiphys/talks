#!/bin/bash
# Re-record the two demo casts that the演示 slides play.
#
#   scripts/demos/record.sh kb        -> a raw cast for public/casts/demo-kb.cast
#   scripts/demos/record.sh n90zr     -> a raw cast for public/casts/demo-n90zr.cast
#
# The agent is Claude Code on Opus 5. The model is not cosmetic: the same prompts
# on a weaker model return the right numbers only some of the time, which is the
# failure this talk argues against.
#
# Each run gets a fresh workspace under /private/tmp so nothing from an earlier
# take leaks in, and the parent session's CLAUDE_* variables are cleared or the
# child session inherits them and prints warnings into the recording.
#
# The script stops at the raw cast and prints the timeline: the tail always has
# to be trimmed, because the driver types its way out of the TUI and the exit
# prints a resumable session id. Trim with cast_timeline.py --trim, then pick the
# markers from the same timeline.
set -euo pipefail
cd "$(dirname "$0")/../.."
HERE="$PWD/scripts/demos"

# bash 3.2 on macOS: no arrays with @Q, so these stay plain strings.
UNSET="-u CLAUDE_CODE_MAX_OUTPUT_TOKENS -u AI_AGENT -u CLAUDE_CODE_ENTRYPOINT"
UNSET="$UNSET -u CLAUDE_CODE_MESSAGING_SOCKET -u CLAUDE_CODE_MESSAGING_TOKEN"
UNSET="$UNSET -u CLAUDE_CODE_BRIDGE_SESSION_ID -u CLAUDE_CODE_EXECPATH -u CLAUDECODE"
UNSET="$UNSET -u CLAUDE_CODE_SESSION_ID -u CLAUDE_CODE_CHILD_SESSION -u CLAUDE_PID"
UNSET="$UNSET -u CLAUDE_EFFORT -u CLAUDE_PLUGIN_DATA"

WHICH="${1:?usage: record.sh <kb|n90zr>}"
D="$(mktemp -d /private/tmp/fusion-claude-demo.XXXXXX)"

case "$WHICH" in
  kb)
    SRC=kb-system.txt; SIZE=100x30; SECS=45; OUT=public/casts/demo-kb.cast
    TITLE='FUSION demo: Claude Code local corpus'
    ALLOW='Read,Bash'; DENY='Glob,Grep,WebSearch,WebFetch'
    ASK='这篇论文（Abu-Ibrahim 等，PRC 77, 034607）在我们的知识库里是哪一篇？它引了谁，谁引了它？页面里有哪些数字？把原始摘要和机器生成的 Key numbers 分开说。'
    ;;
  n90zr)
    SRC=fresco-system.txt; SIZE=80x24; SECS=90; OUT=public/casts/demo-n90zr.cast
    TITLE='FUSION demo: Claude Code drives FRESCO'
    ALLOW='Bash'; DENY='Read,Glob,Grep,WebSearch,WebFetch,Write,Edit'
    ASK='算 50 MeV 的 n+90Zr 弹性散射，用 KD02 全局光学势，然后跟 EXFOR 上有的实验数据比一下。'
    ;;
  *) echo "unknown demo: $WHICH" >&2; exit 1 ;;
esac

sed "s#__D__#$D#g" "$HERE/$SRC" > "$D/system.txt"
echo "# workspace: $D"

cat > "$D/run.sh" <<RUN
cd "$D"
exec env $UNSET expect -f "$HERE/rec.exp" $SECS NEVERMATCHTHIS \\
  --setting-sources local --model opus --permission-mode default \\
  --allowedTools '$ALLOW' --disallowedTools '$DENY' \\
  --add-dir /Users/jinlei/Desktop/code/FUSION \\
  --system-prompt-file "$D/system.txt" \\
  '$ASK'
RUN

asciinema rec --headless --overwrite --window-size "$SIZE" \
  --output-format asciicast-v2 -i 1.2 -q -t "$TITLE" \
  -c "bash $D/run.sh" "$D/raw.cast"

python3 scripts/cast_timeline.py "$D/raw.cast" | tail -40
echo
echo "# trim the tail (drop the exit keystrokes and the resume hint), then re-pick markers:"
echo "#   python3 scripts/cast_timeline.py $D/raw.cast --trim <secs> --out $OUT"
