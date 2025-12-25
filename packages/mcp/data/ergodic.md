---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  Phase space diagram showing two types of trajectories in a 2D oscillator system: a non-ergodic trajectory R (in red) for rational frequency ratio ω = 2 which forms a closed orbit, and an ergodic region R (in orange) for irrational frequency ratio ω ∉ ℚ which densely fills the available phase space P (blue ellipse). The diagram illustrates how ergodicity depends on the rationality of frequency ratios.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/ergodic"
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
#import draw: circle, content, hobby, line, rect

#set page(width: auto, height: auto, margin: 3pt)

#canvas({
  let rx = 5
  let ry = 3
  let arrow-style = (mark: (end: "stealth", fill: black), stroke: 1pt)

  // Axes
  line((-rx - 0.5, 0), (rx + 0.5, 0), ..arrow-style)
  content((rx + 0.5, 0), $q_1$, anchor: "west", padding: 2pt)

  line((0, -ry - 0.5), (0, ry + 0.5), ..arrow-style)
  content((0, ry + 0.5), $q_2$, anchor: "south", padding: 2pt)

  // Ellipse
  circle(
    (0, 0),
    radius: (rx, ry),
    stroke: blue,
    fill: rgb(0%, 0%, 100%, 5%),
    name: "ellipse",
  )

  // Labels for radii
  content((rx + .2, 1), $sqrt(2E \/ m)$, anchor: "south-west", padding: 1pt, name: "r1")
  line((rx, 0), "r1.south", stroke: 0.2pt)
  content((0.5, ry + .5), $sqrt(2E \/ k)$, anchor: "south-west", padding: 1pt, name: "r2")
  line((0, ry), "r2.south-west", stroke: 0.2pt)

  // Label P
  content((rx - 0.6, 0.2), text(fill: blue)[$P$])

  let rect-scale = calc.sqrt(2) / 2 // scale rectangle so corners touch ellipse
  rect(
    (-rx * rect-scale, -ry * rect-scale),
    (rx * rect-scale, ry * rect-scale),
    stroke: rgb("#ffa500"),
    fill: rgb(100%, 65%, 0%, 10%),
    name: "rect",
  )
  content((-rx / 4, ry / 2), text(fill: rgb("#ffa500"))[$R$ for $omega in.not QQ$])

  // Trajectory
  hobby(
    (-rx * rect-scale, ry * rect-scale),
    (-1.1, -ry * rect-scale + 0.4),
    (-.5, -ry * rect-scale + 0.1),
    (.1, -ry * rect-scale + 0.4),
    (rx * rect-scale, ry * rect-scale),
    omega: 0,
    stroke: red,
  )
  hobby(
    (-rx * rect-scale, ry * rect-scale),
    (-.1, -ry * rect-scale + 0.4),
    (.5, -ry * rect-scale + 0.1),
    (1.1, -ry * rect-scale + 0.45),
    (rx * rect-scale, ry * rect-scale),
    omega: 0,
    stroke: red,
  )
  content((2.5, -1.3), align(center, text(fill: red)[$R$ for\ $omega = 2 in QQ$]))
})
```
