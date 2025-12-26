---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  Complex plane visualization of different propagator types in quantum field theory: retarded, advanced, and Feynman propagators. The diagram shows their analytic structure in relation to Matsubara frequencies (dots on imaginary axis). This representation helps understanding causality in quantum field theory and the connection between real-time and imaginary-time (thermal) formalisms.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/qft-propagators"
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

#let re-range = 5
#let im-range = 4
#let arrow-style = (end: "stealth", fill: black, scale: 0.5)

#canvas({
  // Axes
  // Real axis with zigzag decoration
  // TODO: add arrow at the end, requireshttps://github.com/cetz-package/cetz/issues/446
  decorations.zigzag(
    line(
      (-re-range, 0),
      (re-range, 0),
    ),
    amplitude: 0.1,
    segment-length: 0.2,
    name: "x-axis",
  )
  content("x-axis.end", $"Re"(omega)$, anchor: "north-east", padding: (top: 5pt))

  // Imaginary axis
  line(
    (0, -im-range + 1),
    (0, im-range - 1),
    mark: arrow-style,
    name: "y-axis",
  )
  content("y-axis.end", $"Im"(omega)$, anchor: "north-west", padding: (left: 5pt))

  // Matsubara frequencies
  for n in range(-im-range, im-range + 1) {
    circle(
      (0, 2 / 3 * n),
      radius: 0.05,
      fill: black,
      name: "omega" + str(n),
    )
  }
  content((-1.1, 2), align(right)[Matsubara\ frequencies])

  // Propagators
  // Advanced propagator (red)
  line(
    (-re-range, -1),
    (re-range, -1),
    stroke: (paint: red, dash: "dashed"),
    name: "advanced",
  )
  content(
    (rel: (0, -0.4), to: "advanced.start"),
    text(red)[advanced],
    anchor: "south-west",
    padding: (left: 5pt),
  )

  // Retarded propagator (blue)
  line(
    (-re-range, 1),
    (re-range, 1),
    stroke: (paint: blue, dash: "dashed"),
    name: "retarded",
  )
  content(
    "retarded.start",
    text(blue)[retarded],
    anchor: "south-west",
    padding: 2pt,
  )

  // Feynman propagator (orange)
  line(
    (-re-range, -1),
    (re-range, 1),
    stroke: (paint: orange, dash: "dashed"),
    name: "feynman",
  )
  content(
    (rel: (-0.7, -0.55), to: "feynman.end"),
    text(orange)[Feynman],
    padding: 2pt,
  )
})
```
