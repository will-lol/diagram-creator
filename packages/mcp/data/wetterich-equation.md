---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  The Wetterich eqn. is a non-linear functional integro-differential equation of one-loop structure that determines the scale-dependence of the flowing action $\Gamma_k$ in terms of fluctuations of the fully-dressed regularized propagator $[\Gamma_k^{(2)} + R_k]^{-1}$. It admits a simple diagrammatic representation as a one-loop equation as shown in this diagram.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/wetterich-equation"
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
#import draw: circle, content, mark

#set page(width: auto, height: auto, margin: 8pt)

// Define styles and constants
#let radius = 1.25 // \lrad in original
#let med-rad = 0.175 * radius // \mrad
#let small-rad = 0.15 * radius // \srad

// Create hatched pattern for vertices
#let hatched = tiling(size: (.1cm, .1cm))[
  #place(rect(width: 100%, height: 100%, fill: white, stroke: none))
  #place(line(start: (0%, 100%), end: (100%, 0%), stroke: 0.4pt))
]

// Helper functions
#let cross(pos, label: none, rel-label: (0, 0), name: none, ..rest) = {
  let txt = text(size: 16pt, baseline: -0.2pt)[$times.o$]
  content(pos, txt, stroke: none, fill: white, frame: "circle", padding: -2.75pt, name: name)
  if label != none {
    let label-pos = if rel-label != none { (rel: rel-label, to: pos) } else { pos }
    content(label-pos, $#label$, ..rest)
  }
}

#let dressed-vertex(pos, label: none, rel-label: none, name: none, radius: med-rad, ..rest) = {
  circle(pos, radius: radius, fill: hatched, name: name, stroke: 0.5pt)
  if label != none {
    let label-pos = if rel-label != none { (rel: rel-label, to: pos) } else { pos }
    content(label-pos, $#label$, ..rest)
  }
}

#canvas({
  // Main loop
  circle((0, 0), radius: radius, stroke: 1pt, name: "loop")

  // Add momentum arrows and labels around loop
  for (ii, pos) in ((1, "0.25"), (2, "0.75")) {
    let angle = float(pos) * 360
    let label-angle = (angle - 3) * 1deg

    // Add momentum labels
    let rel-pos = (0.75 * radius * calc.cos(label-angle), 0.75 * radius * calc.sin(label-angle))
    content(
      (rel: rel-pos, to: "loop"),
      $p_#ii$,
      size: 8pt,
    )

    // Add arrow marks
    mark(
      symbol: "stealth",
      (name: "loop", anchor: angle * 1deg),
      (name: "loop", anchor: (angle + 1) * 1deg),
      ..(width: .25, length: .15, stroke: .7pt, angle: 60deg, scale: .7, fill: black),
    )
  }

  // Add regulator cross with label
  cross(
    (-radius, 0),
    label: $partial_k R_(k,i j)(p_1,p_2)$,
    rel-label: (-0.25, 0),
    name: "regulator",
    anchor: "east",
  )

  // Add dressed vertex with inverse propagator
  dressed-vertex(
    (radius, 0),
    label: $[Gamma_k^((2)) + R_k]_(j i)^(-1)(p_2,p_1)$,
    rel-label: (0.25, 0),
    name: "vertex",
    anchor: "west",
  )
})
```
