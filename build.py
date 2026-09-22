import sys
import re

src1 = r"C:\Users\AaronAndrew\.gemini\antigravity-ide\brain\9fe9d0b3-d847-456a-a10e-db81eabf1f88\.system_generated\steps\152\content.md"
src2 = r"C:\Users\AaronAndrew\.gemini\antigravity-ide\brain\9fe9d0b3-d847-456a-a10e-db81eabf1f88\.system_generated\steps\155\content.md"
dest = r"d:\Andrew\Portfolio-Page [1 page one]\main.js"

def read_content(path):
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()
    start = 0
    for i, line in enumerate(lines):
        if line.strip() == "---":
            start = i + 1
            break
    return "".join(lines[start:])

content1 = read_content(src1)
content2 = read_content(src2)

content2 = re.sub(r"const\s+roles\s*=\s*\[.*?\];", "const roles = [\"PROGRAMMER\", \"CODER\", \"DEVELOPER\", \"ENGINEER\"];", content2, flags=re.DOTALL)
content2 = re.sub(r"const\s+words\s*=\s*\[.*?\];", "const words = [\"PROGRAMMER\", \"CODER\", \"DEVELOPER\", \"ENGINEER\"];", content2, flags=re.DOTALL)

with open(dest, "w", encoding="utf-8") as f:
    f.write("// 3D Background\n")
    f.write(content1)
    f.write("\n\n// Main Script\n")
    f.write(content2)

print("Successfully created main.js")
