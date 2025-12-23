---
description: |
  Illustration of the slow (sequential) forward pass of a Masked Autoregressive Flow (MAF) layer as introduced in [arxiv:1705.07057](https://arxiv.org/abs/1705.07057). Inspired by <https://blog.evjang.com/2018/01/nf2.html>.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/masked-autoregressive-flow"
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
#import draw: content, hobby, line, on-layer, rect

#set page(width: auto, height: auto, margin: 8pt)

#canvas({
  // Define styles and constants
  let node-width = 1
  let node-height = 0.45
  let horiz-sep = 1.2
  let vert-sep = 4
  let arrow-style = (end: "stealth", fill: black, scale: .5)
  let (orange, blue, teal) = (rgb("#e8c268"), rgb("#63a7e390"), rgb("#008080"))
  let input-style = (paint: red, thickness: 1pt)

  // Helper function for boxes
  let box(pos, label, fill: none, name: none, input: false) = {
    rect(
      pos,
      (rel: (node-width, node-height)),
      fill: fill,
      stroke: if input { input-style } else { (thickness: 0.3pt) },
      name: name,
    )
    content(name, text(baseline: -1pt)[#label])
  }

  // Helper function for dots between boxes
  let c-dots(left-name, right-name) = {
    content((left-name, 50%, right-name), text(size: 14pt)[$dots.c$])
  }

  // Create nodes in both rows
  for (y, prefix, colors) in ((0, "x", (blue, rgb(0%, 100%, 0%, 20%))), (-vert-sep, "z", (blue, orange))) {
    // Left group (indices 1, 2, d)
    for (i, x) in ((1, 0), (2, 1), ("d", 3)) {
      box(
        (x * horiz-sep, y),
        $#prefix#sub(str(i))$,
        fill: colors.at(0),
        name: prefix + str(i),
        input: prefix == "x",
      )
    }
    c-dots(prefix + "2", prefix + "d")

    // Right group (indices d+1, D)
    for (ii, x-pos) in (("d+1", 5), ("D", 7)) {
      box(
        (x-pos * horiz-sep, y),
        $#prefix#sub(str(ii))$,
        fill: colors.at(1),
        name: prefix + (if ii == "d+1" { "d-plus-1" } else { ii }),
        input: prefix == "z" and ii == "d+1",
      )
    }
    c-dots(prefix + "d-plus-1", prefix + "D")
  }

  // Single vertical connecting line
  line("zd-plus-1", "xd-plus-1", mark: arrow-style, name: "line-d-plus-1")

  // Function circles and triangles
  for (label, color, pos, rel-pos) in (
    ("t", teal, (4.3 * horiz-sep, 0.4 * -vert-sep), none),
    ("s", orange, none, (-.6, -.75)),
  ) {
    on-layer(
      1, // render above the filled triangles
      content(
        if pos != none { pos } else { (rel: rel-pos, to: "t-circle") },
        text(fill: white, baseline: if label == "s" { -1pt } else { 0pt })[#label],
        frame: "circle",
        name: label + "-circle",
        stroke: none,
        fill: color,
        padding: 2pt,
      ),
    )
    line(
      "x1.south-west",
      label + "-circle",
      "xd.south-east",
      fill: color.transparentize(40%),
      close: true,
      stroke: none,
      name: label + "-triangle",
    )
  }

  // Operation circles
  for (op, (color, label, pos)) in (
    "odot": (orange, $dot.o$, "40%"),
    "oplus": (teal, $plus.o$, "70%"),
  ).pairs() {
    content(
      "line-d-plus-1." + pos,
      text(fill: white, baseline: -.2pt)[#label],
      frame: "circle",
      name: "line-d-plus-1-" + op,
      stroke: none,
      fill: color,
      padding: .1pt,
    )
  }

  // Connect s and t to operations
  for (src, op, color) in (("s", "odot", orange), ("t", "oplus", teal)) {
    hobby(
      src + "-circle",
      "line-d-plus-1-" + op,
      mark: (..arrow-style, offset: 5pt),
      stroke: color + 0.75pt,
      tension: 0.8,
    )
  }
})
```
