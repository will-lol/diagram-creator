---
description: |
  Diagram of Feynman Diagram 4.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/feynman-diagram-4"
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
    mark: (end: "stealth", fill: black, scale: .3),
    stroke: (thickness: 0.5pt),
  )

  // Apply 45-degree rotation to all coordinates
  let rot45(x, y) = ((x - y) / calc.sqrt(2), (x + y) / calc.sqrt(2))

  // Draw main lines
  draw.line(rot45(-2, 0), rot45(2, 0), name: "horiz")
  draw.line(rot45(0, 2), rot45(0, -2), name: "vert")

  // Add phi labels
  content("horiz.start", $phi_a$, anchor: "north-east", padding: -1pt)
  content("horiz.end", $phi_c$, anchor: "south-west", padding: 1pt)
  content("vert.start", $phi_b$, anchor: "south-east", padding: 1pt)
  content("vert.end", $phi_d$, anchor: "north-west", padding: 1pt)

  // Add momentum arrows
  let (x1, y1) = rot45(-1.7, 0.15)
  let (x2, y2) = rot45(-0.7, 0.15)
  draw.line((x1, y1), (x2, y2), ..arrow-style, name: "p1")
  content((rel: (-0.1, 0.3), to: "p1"), $p_1$)

  let (x1, y1) = rot45(0.7, 0.15)
  let (x2, y2) = rot45(1.7, 0.15)
  draw.line((x2, y2), (x1, y1), ..arrow-style, name: "p3")
  content((rel: (-0.1, 0.3), to: "p3"), $p_3$)

  let (x1, y1) = rot45(0.15, 1.7)
  let (x2, y2) = rot45(0.15, 0.7)
  draw.line((x1, y1), (x2, y2), ..arrow-style, name: "p2")
  content((rel: (0.3, 0.2), to: "p2"), $p_2$)

  let (x1, y1) = rot45(0.15, -0.7)
  let (x2, y2) = rot45(0.15, -1.7)
  draw.line((x2, y2), (x1, y1), ..arrow-style, name: "p4")
  content((rel: (0.3, 0.1), to: "p4"), $p_4$)

  // Draw vertex with hatched pattern
  circle(rot45(0, 0), radius: 0.25, fill: hatched, name: "vertex")
  content((rel: (0.35, -.05), to: "vertex"), $Gamma_(k,a b c d)^((4))(p_1,p_2,p_3,p_4)$, anchor: "west")
})
```
