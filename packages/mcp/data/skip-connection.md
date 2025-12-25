---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  Illustration of skip connection in a residual block. Inspired by the ResNet paper. [arxiv:1512.03385](https://arxiv.org/abs/1512.03385)
github_url: "https://github.com/janosh/diagrams/tree/main/assets/skip-connection"
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
  let node-sep = 2.5 // Horizontal separation between nodes
  let arrow-style = (mark: (end: "stealth", fill: black, scale: 0.5))


  // Draw main nodes
  content(
    (0, 0),
    [layer 1],
    fill: rgb("#ffd699"),
    name: "l1",
    frame: "rect",
    padding: (3pt, 6pt),
    stroke: none,
  ) // orange!50
  content(
    (node-sep, 0),
    $a(arrow(x))$,
    name: "act1",
    frame: "rect",
    padding: (0, 3pt),
    stroke: none,
  )
  content((rel: (0, -0.3), to: "act1.south"), "activation")
  content(
    (2 * node-sep, 0),
    [layer 2],
    fill: rgb("#7dc3c3"),
    name: "l2",
    frame: "rect",
    padding: (3pt, 6pt),
    stroke: none,
  ) // teal!50
  content(
    (3 * node-sep, 0),
    text(size: 1.8em)[$plus.o$],
    name: "add",
  )
  content((rel: (0, -0.3), to: "add.south"), "add")
  content(
    (3.75 * node-sep, 0),
    $a(arrow(x))$,
    name: "act2",
    frame: "rect",
    padding: (0, 3pt),
    stroke: none,
  )
  content((rel: (0, -0.3), to: "act2.south"), "activation")

  // Draw main flow arrows
  line("l1", "act1", ..arrow-style)
  line("act1", "l2", ..arrow-style)
  line("l2", "add.west", ..arrow-style)
  line("add.east", "act2", ..arrow-style)

  // Draw input arrow
  line(
    (rel: (-2, 0), to: "l1"),
    "l1",
    name: "input",
    mark: (end: "stealth", fill: black, scale: 0.5),
  )
  content((rel: (0, -0.2), to: "input.10%"), $arrow(x)$)

  // Draw skip connection using hobby curve
  hobby(
    (rel: (-1.5, 0), to: "l1"),
    (rel: (0, 2.2), to: "act1"),
    "add.north",
    close: false,
    tension: 0.8,
    ..arrow-style,
    name: "skip",
  )
  content((rel: (0, 0.3), to: "skip.mid"), $arrow(x)$)
  content(
    (rel: (0, -0.3), to: "skip.mid"),
    align(center)[skip connection\ (identity)],
    anchor: "north",
  )

  // Draw F(x) curly brace
  content(
    (rel: (0, -1.2), to: "act1"),
    [#math.underbrace(box(width: 17em), text(size: 1.4em)[$cal(F)(arrow(x))$])],
    name: "fx-brace",
  )

  // Add F(x) + x label
  content(
    (rel: (0.8, 0.8), to: "add"),
    $cal(F)(arrow(x)) + arrow(x)$,
    name: "fx-label",
    frame: "rect",
    stroke: none,
    padding: 1pt,
  )
  line("fx-label.south", "add.north-east", stroke: .2pt, name: "fx-arrow")
})
```
