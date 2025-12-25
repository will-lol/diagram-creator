---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  Illustration of the real-valued non-volume preserving (RNVP) affine coupling layer as introduced in [arxiv:1605.08803](https://arxiv.org/abs/1605.08803). Inspired by <https://blog.evjang.com/2018/01/nf2.html>.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/rnvp-affine-coupling-layer"
author: "Janosh Riebesell"
license: |
  MIT License
  
  Copyright (c) 2021 Janosh Riebesell
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
  
  The software is provided "as is", without warranty of any kind, express or
  implied, including but not limited to the warranties of merchantability,
  fitness for a particular purpose and noninfringement. In no event shall the
  authors or copyright holders be liable for any claim, damages or other
  liability, whether in an action of contract, tort or otherwise, arising from,
  out of or in connection with the software or the use or other dealings in the
  software.
---

```typ
#import "@preview/cetz:0.4.2": canvas, draw
#import draw: content, hobby, line, rect

#set page(width: auto, height: auto, margin: 8pt)

#canvas({
  // Define styles and constants
  let node-width = 1
  let node-height = 0.6
  let horiz-sep = 1.2
  let vert-sep = 4
  let arrow-style = (end: "stealth", fill: black, scale: .5)
  let (orange, blue, teal) = (rgb("#e8c268"), rgb("#63a7e390"), rgb("#008080"))

  // Helper function for boxes
  let box(pos, text, fill: none, name: none) = {
    rect(
      pos,
      (rel: (node-width, node-height)),
      fill: fill,
      stroke: 0.3pt,
      name: name,
    )
    content(name, text)
  }

  // Top row x nodes
  box((0, 0), $x_1$, fill: blue, name: "x1")
  box((horiz-sep, 0), $x_2$, fill: blue, name: "x2")
  box((3 * horiz-sep, 0), $x_d$, fill: blue, name: "xd")
  content(("x2", 50%, "xd"), text(size: 14pt)[$dots.c$], name: "xdots1")

  // Green boxes with more spacing
  box((5 * horiz-sep, 0), $x_(d+1)$, fill: orange, name: "xd-plus-1")
  box((7 * horiz-sep, 0), $x_D$, fill: orange, name: "xD")
  content(("xd-plus-1", 50%, "xD"), text(size: 14pt)[$dots.c$], name: "xdots2")

  // Bottom row z nodes
  box((0, -vert-sep), $z_1$, fill: blue, name: "z1")
  box((horiz-sep, -vert-sep), $z_2$, fill: blue, name: "z2")
  box((3 * horiz-sep, -vert-sep), $z_d$, fill: blue, name: "zd")
  content(("z2", 50%, "zd"), text(size: 14pt)[$dots.c$], name: "zdots1")

  // Orange boxes
  box((5 * horiz-sep, -vert-sep), $z_(d+1)$, fill: orange, name: "zd-plus-1")
  box((7 * horiz-sep, -vert-sep), $z_D$, fill: orange, name: "zD")
  content(("zd-plus-1", 50%, "zD"), text(size: 14pt)[$dots.c$], name: "zdots2")

  // Vertical connecting lines
  line("z1", "x1", mark: arrow-style, name: "line1")
  line("z2", "x2", mark: arrow-style, name: "line2")
  line("zd", "xd", mark: arrow-style, name: "lined")
  line("zd-plus-1", "xd-plus-1", mark: arrow-style, name: "line-d-plus-1")
  line("zD", "xD", mark: arrow-style, name: "lineD")

  // Scale and translate functions
  let mid-x = 4 * horiz-sep
  let mid-y = -vert-sep / 2

  // Function triangles and circles
  // Draw t triangle with lines
  content(
    (4.3 * horiz-sep, 0.4 * -vert-sep),
    text(fill: white)[t],
    frame: "circle",
    name: "t-circle",
    stroke: none,
    fill: teal,
    padding: 2pt,
  )
  line(
    "z1.north-west",
    "t-circle",
    "zd.north-east",
    fill: teal.transparentize(40%),
    close: true,
    stroke: none,
    name: "t-triangle",
  )

  // Draw s triangle with lines
  content(
    (rel: (.6, -.75), to: "t-circle"),
    text(fill: white, baseline: -1pt)[s],
    frame: "circle",
    name: "s-circle",
    stroke: none,
    fill: orange,
    padding: 2pt,
  )
  line(
    "z1.north-west",
    "s-circle",
    "zd.north-east",
    fill: orange.transparentize(30%),
    close: true,
    stroke: none,
    name: "s-triangle",
  )

  // Operation circles
  for line-name in ("line-d-plus-1", "lineD") {
    for (op, (color, label, pos)) in (
      "odot": (orange, $dot.o$, "40%"),
      "oplus": (teal, $plus.o$, "70%"),
    ).pairs() {
      content(
        line-name + "." + pos,
        text(fill: white, baseline: -.2pt)[#label],
        frame: "circle",
        name: line-name + "-" + op,
        stroke: none,
        fill: color,
        padding: .1pt,
      )
    }
  }

  // Connect s and t to operations
  for line-name in ("line-d-plus-1", "lineD") {
    hobby(
      "s-circle",
      line-name + "-odot",
      mark: (..arrow-style, offset: 5pt),
      stroke: orange + 0.75pt,
    )
    hobby(
      "t-circle",
      line-name + "-oplus",
      mark: (..arrow-style, offset: 5pt),
      stroke: teal + 0.75pt,
    )
  }
})
```
