---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  Cost vs accuracy trade-off for different quantum mechanics approximations. $N$ denotes the system size, usually the number of electrons. Source: [Frank Noe](https://chemistryworld.com/news/quantum-chemistry-simulations-offers-beguiling-possibility-of-solving-chemistry/4011541.article).
github_url: "https://github.com/janosh/diagrams/tree/main/assets/qm-cost-vs-acc"
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

#let range = 9
#let xy-ratio = 2 / 3

#canvas({
  let arrow-style = (mark: (end: "stealth", scale: .75), fill: black)

  // Draw axes
  line((-0.5, 0), (range, 0), ..arrow-style) // x-axis
  line((0, -0.5), (0, range * xy-ratio), ..arrow-style) // y-axis

  // Add axis labels
  content(
    (range + 0.1, .15),
    [computational complexity],
    anchor: "south-east",
  )
  content(
    (0.2, range * xy-ratio),
    [accuracy],
    anchor: "north-west",
  )

  // Add N^n labels below x-axis
  for n in std.range(1, 9) {
    content(
      (n, -0.3),
      $N^#n$,
      anchor: "north",
    )
  }

  // Add dashed diagonal line
  line((0, 0), (range, range * xy-ratio), stroke: (dash: "dashed", paint: gray, thickness: .75pt))

  // Data points with labels
  let methods = (
    (2, "semi-empirical", "SE"),
    (4, "Hartree-Fock", "HF"),
    (5, "Moller-Plesset 2nd order", "MP2"),
    (6, "Configuration Interaction", "CISD"),
    (7, "Coupled Cluster", "CCSD(T)"),
  )

  // Draw blue dots for standard methods
  for (x, name, abbr) in methods {
    circle(
      (x, x * xy-ratio),
      radius: 2pt,
      fill: rgb("#393998"),
      stroke: none,
    )
    content(
      (x + 0.2, x * xy-ratio - 0.2),
      [#name],
      anchor: "north-west",
    )
  }

  // Special point for DFT
  circle(
    (3, 5 * xy-ratio),
    radius: 2.4pt,
    fill: rgb("#de2626"),
    stroke: none,
  )
  content(
    (2.7, 5 * xy-ratio),
    [DFT],
    anchor: "east",
  )
})
```
