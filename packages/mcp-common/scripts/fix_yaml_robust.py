# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///

import os
from pathlib import Path


def fix_file(path: Path):
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    if not lines or lines[0].strip() != "---":
        return

    new_lines = []
    in_block = False

    for i, line in enumerate(lines):
        if line.strip() == "---":
            if in_block:
                in_block = False

            new_lines.append(line)

            if i > 0 and len(new_lines) > 1:
                # If we hit second --- (and it's not the first line), we are done with FM
                new_lines.extend(lines[i + 1 :])
                break

        elif line.startswith("license: |") or line.startswith("description: |"):
            new_lines.append(line)
            in_block = True

        elif in_block:
            # Check if this line is a new key (top level)
            if line.strip() and not line.startswith(" ") and ":" in line:
                in_block = False
                new_lines.append(line)
            else:
                # Block content line
                stripped = line.strip()
                if not stripped:
                    new_lines.append("\n")
                else:
                    # Force 2 space indentation
                    new_lines.append("  " + stripped + "\n")

        else:
            new_lines.append(line)

    with open(path, "w", encoding="utf-8") as f:
        f.writelines(new_lines)
    print(f"Processed {path}")


def main():
    data_dir = Path(__file__).parent.parent / "data"
    if not data_dir.exists():
        print(f"Data directory not found: {data_dir}")
        return

    for md_file in data_dir.glob("*.md"):
        try:
            fix_file(md_file)
        except Exception as e:
            print(f"Error processing {md_file}: {e}")


if __name__ == "__main__":
    main()
