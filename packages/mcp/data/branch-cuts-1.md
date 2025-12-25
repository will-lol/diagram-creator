---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  Propagator branch cuts, i.e. a continuum of singularities, along the real frequency axis extending from $\pm |\vec p|$ out to $\pm \infty$. Pulled from [arxiv:1712.09863](https://arxiv.org/abs/1712.09863).
github_url: "https://github.com/janosh/diagrams/tree/main/assets/branch-cuts-1"
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
#import "@preview/cetz:0.4.2": canvas, decorations, draw
#import draw: circle, content, line

#set page(width: auto, height: auto, margin: 5pt)

#canvas({
  let (xr, yr) = (5, 1)
  let arrow-style = (mark: (end: "stealth", fill: black, scale: 0.5))

  // Draw axes
  line(
    (0, -yr),
    (0, yr),
    ..arrow-style,
    name: "y-axis",
  )
  content(
    (rel: (-0.7, -0.2), to: "y-axis.end"),
    $"Im"(p_0)$,
    name: "y-label",
  )

  // Draw branch points
  let left-point = (-xr / 2, 0)
  let right-point = (xr / 2, 0)

  // Draw branch cut line
  line(left-point, right-point, name: "x-axis", mark: (symbol: "circle", fill: blue, scale: 0.75))
  // Add branch point labels
  content(
    (rel: (0, 0.3), to: "x-axis.start"),
    $-sqrt(arrow(p)^2)$,
    name: "left-label",
  )
  content(
    (rel: (0, 0.3), to: "x-axis.end"),
    $sqrt(arrow(p)^2)$,
    name: "right-label",
  )

  // Draw zigzag lines with decorations
  let zigzag-style = (
    stroke: blue.darken(20%),
    amplitude: 0.2,
    segment-length: 0.3,
  )

  // Left zigzag
  decorations.zigzag(
    line(
      (-xr - 0.5, 0),
      "x-axis.3%",
      ..arrow-style,
    ),
    ..zigzag-style,
    name: "left-zigzag",
  )

  // Right zigzag
  decorations.zigzag(
    line(
      "x-axis.end",
      (xr, 0),
      ..arrow-style,
    ),
    ..zigzag-style,
    name: "right-zigzag",
  )

  // Add Re axis label
  content(
    (rel: (-0.2, 0.3), to: "right-zigzag.end"),
    $"Re"(p_0)$,
    name: "x-label",
  )
})
```
