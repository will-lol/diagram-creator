---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  This Feynman diagram contains two propagators forming a loop carrying the external energy $q_0$. $m_{1,2}$ denote the masses of the propagators and $\gamma_{1,2}$ their decay width which, for an expansion in Minkowski space, are non-zero only around a real and positive on-shell frequency $p_0 > 0$.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/feynman-diagram-propagator-loop"
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
#import draw: arc, circle, content, line

#set page(width: auto, height: auto, margin: 8pt)

#canvas({
  // Define styles and constants
  let radius = 1.5
  let dark-blue = rgb("#4040d9")
  let arrow-style = (
    mark: (end: "stealth", fill: dark-blue, scale: .5),
    stroke: (paint: dark-blue, thickness: 0.75pt),
  )

  // Draw loop circle
  circle((0, 0), radius: radius, name: "loop")

  // Add labels for masses/widths
  content("loop.0%", $m_1^2, gamma_1^2$, anchor: "south", padding: 3pt)
  content("loop.50%", $m_2^2, gamma_2^2$, anchor: "north", padding: 3pt)

  // Draw momentum arrow on loop
  arc(
    (rel: (.23, 0), to: "loop.15%"),
    radius: 0.85 * radius,
    start: 140deg,
    stop: 40deg,
    ..arrow-style,
    name: "momentum-arrow",
  )
  content(
    "momentum-arrow.mid",
    text(fill: dark-blue)[$q_0$],
    anchor: "north",
  )

  // Draw external lines
  let ext-len = 2.2 * radius

  // Left external line
  circle("loop.25%", radius: 2pt, fill: black, name: "left-vertex")
  line((-ext-len, 0), "left-vertex", stroke: 1pt, name: "left-line")

  // Right external line
  circle("loop.75%", radius: 2pt, fill: black, name: "right-vertex")
  line("right-vertex", (ext-len, 0), stroke: 1pt, name: "right-line")

  // Add momentum arrows on external lines
  line(
    (rel: (0.15, 0.15), to: "left-line.start"),
    (rel: (-0.15, 0.15), to: "left-line.end"),
    ..arrow-style,
    name: "left-momentum",
  )
  content("left-momentum", text(fill: dark-blue)[$q_0$], anchor: "south", padding: 3pt)

  line(
    (rel: (0.15, 0.15), to: "right-line.start"),
    (rel: (-0.15, 0.15), to: "right-line.end"),
    ..arrow-style,
    name: "right-momentum",
  )
  content("right-momentum", text(fill: dark-blue)[$q_0$], anchor: "south", padding: 3pt)
})
```
