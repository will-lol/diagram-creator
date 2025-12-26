# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///

import os
import textwrap
from pathlib import Path


def fix_file(path: Path):
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    if not lines or lines[0].strip() != "---":
        return

    new_lines = []
    license_buffer = []
    state = "BEFORE_FM"  # BEFORE_FM, IN_FM, IN_LICENSE, AFTER_FM

    for i, line in enumerate(lines):
        if state == "BEFORE_FM":
            new_lines.append(line)
            if line.strip() == "---":
                state = "IN_FM"

        elif state == "IN_FM":
            if line.strip() == "---":
                state = "AFTER_FM"
                new_lines.append(line)
            elif line.startswith("license: |"):
                new_lines.append(line)
                state = "IN_LICENSE"
            else:
                new_lines.append(line)

        elif state == "IN_LICENSE":
            if line.strip() == "---":
                # Process buffer
                if license_buffer:
                    dedented = textwrap.dedent("".join(license_buffer))
                    indented = textwrap.indent(dedented, "  ")
                    new_lines.append(indented)
                    license_buffer = []

                new_lines.append(line)
                state = "AFTER_FM"
            elif line.strip() and not line.startswith(" ") and ":" in line:
                # Heuristic: start of a new key (non-indented, contains colon)
                # But be careful about empty lines or text that happens to match
                # For now, assuming license is last or handles indentation correctly-ish
                # But wait, if indentation is BROKEN, we rely on it being indented at least somewhat or detection of next key.
                # In barchart.md, the text IS indented, just wildly.

                # If we encounter a line that is definitely a new key (start of line)
                # We finish the license block.
                if license_buffer:
                    dedented = textwrap.dedent("".join(license_buffer))
                    indented = textwrap.indent(dedented, "  ")
                    new_lines.append(indented)
                    license_buffer = []
                new_lines.append(line)
                state = "IN_FM"
            else:
                license_buffer.append(line)

        elif state == "AFTER_FM":
            new_lines.append(line)

    # In case EOF comes while in LICENSE (shouldn't happen for valid frontmatter but possibly)
    if state == "IN_LICENSE" and license_buffer:
        dedented = textwrap.dedent("".join(license_buffer))
        indented = textwrap.indent(dedented, "  ")
        new_lines.append(indented)

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
