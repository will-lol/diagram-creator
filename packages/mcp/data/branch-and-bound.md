---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  Illustration of a linear-programming (LP)-based branch and bound algorithm. Not knowing how to solve a mixed-integer programming (MIP) problem directly, it first removes all integrality constraints. This results in a solvable LP called the linear-programming relaxation of the original MIP. The algorithm then picks some variable x restricted to be integer, but whose value in the LP relaxation is fractional. Suppose its value in the LP relaxation is x = 0.7. It then excludes this value by imposing the restrictions x ≤ 0 and x ≥ 1, thereby creating two new MIPs. By applying this recursively step and exploring each resulting bifurcation, the globally optimal solution satisfying all constraints can be found.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/branch-and-bound"
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
#import draw: circle, content, line

#set page(width: auto, height: auto, margin: 8pt)

#canvas({
  let node-sep = 1.5 // Horizontal separation between nodes
  let level-sep = 1.5 // Vertical separation between levels
  let node-radius = 0.35
  let arrow-style = (mark: (end: "stealth", fill: black, scale: 0.2, offset: 0.03))

  // Helper to draw a node with label
  let draw-node(pos, label, name: none) = {
    circle(pos, radius: node-radius, name: name)
    content(pos, $#label$)
  }

  // Helper to draw edge label
  let draw-edge-label(from, to, label, left: true) = {
    let anchor = if left { "east" } else { "west" }
    content(
      (rel: (if left { -0.3 } else { 0.3 }, 0), to: from + "-" + to + ".mid"),
      $#label$,
      anchor: anchor,
    )
  }

  // Draw nodes level by level
  // Root (level 0)
  draw-node((0, 0), $P_0$, name: "p0")

  // Level 1
  draw-node((-node-sep, -level-sep), $P_1$, name: "p1")
  draw-node((node-sep, -level-sep), $P_2$, name: "p2")

  // Level 2
  draw-node((0, -2 * level-sep), $P_3$, name: "p3")
  draw-node((2 * node-sep, -2 * level-sep), $P_4$, name: "p4")

  // Level 3
  draw-node((-node-sep, -3 * level-sep), $P_5$, name: "p5")
  draw-node((node-sep, -3 * level-sep), $P_6$, name: "p6")

  // Draw edges
  line("p0", "p1", ..arrow-style, name: "p0-p1")
  line("p0", "p2", ..arrow-style, name: "p0-p2")
  line("p2", "p3", ..arrow-style, name: "p2-p3")
  line("p2", "p4", ..arrow-style, name: "p2-p4")
  line("p3", "p5", ..arrow-style, name: "p3-p5")
  line("p3", "p6", ..arrow-style, name: "p3-p6")

  // Draw edge labels
  draw-edge-label("p0", "p1", $x_1 <= 0$)
  draw-edge-label("p0", "p2", $x_1 >= 1$, left: false)
  draw-edge-label("p2", "p3", $x_2 <= 0$)
  draw-edge-label("p2", "p4", $x_2 >= 1$, left: false)
  draw-edge-label("p3", "p5", $x_3 <= 0$)
  draw-edge-label("p3", "p6", $x_3 >= 1$, left: false)
})
```
