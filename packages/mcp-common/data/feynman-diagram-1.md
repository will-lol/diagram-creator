---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  Basic Feynman diagram showing a dressed propagator (hatched vertex) connecting two external fields φₐ and φᵦ with incoming momentum p₁ and outgoing momentum p₂. The vertex represents the full momentum-dependent two-point Green's function G_k, which includes all quantum corrections. This is a fundamental building block for more complex quantum field theory calculations.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/feynman-diagram-1"
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
#import draw: circle, content

#set page(width: auto, height: auto, margin: 8pt)

// Create hatched pattern for vertices
#let hatched = tiling(size: (.1cm, .1cm))[
  #place(rect(width: 100%, height: 100%, fill: white, stroke: none))
  #place(line(start: (0%, 100%), end: (100%, 0%), stroke: 0.4pt))
]

#canvas({
  // Define styles and constants
  let arrow-style = (
    mark: (end: "stealth", fill: black, scale: .5),
    stroke: (thickness: 0.75pt),
  )

  // Draw main horizontal line
  draw.line((-2.25, 0), (2.25, 0), stroke: 1pt, name: "a-to-b")

  // Add phi labels
  content("a-to-b.start", $phi_a$, anchor: "east", padding: 3pt)
  content("a-to-b.end", $phi_b$, anchor: "west", padding: 3pt)

  // Add momentum arrows
  draw.line((-2, 0.15), (-1, 0.15), ..arrow-style, name: "p1")
  content((rel: (0, 0.3), to: "p1.mid"), $p_1$)

  draw.line((1, 0.15), (2, 0.15), ..arrow-style, name: "p2")
  content((rel: (0, 0.3), to: "p2.mid"), $p_2$)

  // Draw vertex with hatched pattern
  circle((0, 0), radius: 0.25, fill: hatched, name: "vertex")
  content((rel: (0, 0.5), to: "vertex"), $G_(k,a b)(p_1,p_2)$)
})
```
