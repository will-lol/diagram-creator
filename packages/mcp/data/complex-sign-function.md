---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  3d surface plot of the complex sign function $s(p_0) = \sign(\Re p_0 \, \Im p_0)$ over the complex plane. Used in the Matsubara summation of thermal quantum field theory to split contour integrals in the complex plane into two parts, the first being branch-cut free and the second evident branch cut structure.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/complex-sign-function"
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
#import "@preview/cetz:0.4.2": canvas, draw, matrix, vector
#import draw: content, group, line, rect, scale, set-transform

#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 8pt)

#canvas({
  draw.set-style(line: (stroke: none))
  // Set up the transformation matrix for 3D perspective
  set-transform(matrix.transform-rotate-dir((1, 1, -2), (0, 2, .3)))
  scale(x: 1.5, z: -1)

  let arrow-style = (mark: (end: "stealth", fill: black, scale: 0.5))

  // Add vertical z-lines at corners and origin
  for (x, y) in ((-1, -1), (1, -1), (-1, 1), (1, 1)) {
    draw.line((x, y, -1.2), (x, y, 1.2), stroke: gray + .3pt)
  }
  draw.line((0, 0, -1.2), (0, 0, 1.2), stroke: gray + .3pt, ..arrow-style)


  // Draw the zero plane (gray, semi-transparent)
  group({
    draw.rect((-1, -1, 0), (1, 1, 0), fill: rgb(128, 128, 128, 20), stroke: none)
  })

  // Draw the blue quadrants (s = -1)
  group({
    draw.on-layer(-1, {
      draw.line((-1, 0, -1), (0, 0, -1), (0, 1, -1), (-1, 1, -1), fill: rgb(173, 216, 230))
      draw.line((0, -1, -1), (1, -1, -1), (1, 0, -1), (0, 0, -1), fill: rgb(173, 216, 230))
    })
  })

  // Draw the orange quadrants (s = 1)
  group({
    draw.line((0, 0, 1), (1, 0, 1), (1, 1, 1), (0, 1, 1), fill: rgb(255, 165, 0))
    draw.line((-1, -1, 1), (0, -1, 1), (0, 0, 1), (-1, 0, 1), fill: rgb(255, 165, 0))
  })

  // Draw grid lines
  for x in range(-1, 2) {
    let style = if x == 0 { arrow-style } else { () }
    draw.line((x, -1, 0), (x, 1, 0), stroke: gray + .3pt, ..style)
  }
  for y in range(-1, 2) {
    let style = if y == 0 { arrow-style } else { () }
    draw.line((-1, y, 0), (1, y, 0), stroke: gray + .3pt, ..style)
  }

  content((1.45, .1, 0), [$"Re"(p_0)$])
  content((0, 1.6, 0), [$"Im"(p_0)$])
  content((0, 0, 1.5), [$s(p_0)$])
})
```
