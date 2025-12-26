---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  This Feynman diagram corresponds to the integrand in this expression for
  $$ \displaystyle \partial_t \Gamma_{k,a}^{(1)}(q) = -\frac{1}{2} \sum_{\substack{i,j\\k,l}}^N \int_{\substack{p_1,p_2\\p_3^\prime,p_4^\prime}} \frac{\partial_t R_{k,ij}(p_1,p_2)}{\Gamma_{k,jk}^{(2)}(p_2,p_3) + R_{k,jk}(p_2,p_3)} \, \frac{\Gamma_{k,akl}^{(3)}(q,p_3,p_4)}{\Gamma_{k,li}^{(2)}(p_4,p_1) + R_{k,li}(p_4,p_1)}. $$
github_url: "https://github.com/janosh/diagrams/tree/main/assets/feynman-diagram-one-point"
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

// Constants
#let radius = 1.2 // Increased for better spacing
#let med-rad = 0.175 * radius // \mrad
#let small-rad = 0.15 * radius // \srad

// Styles
#let arrow-style = (
  mark: (end: "stealth", fill: black, scale: .5),
  stroke: (thickness: 0.75pt),
)
#let label-style = (stroke: gray + 0.3pt)
#let hatched = tiling(size: (.1cm, .1cm))[
  #place(rect(width: 100%, height: 100%, fill: white, stroke: none))
  #place(line(start: (0%, 100%), end: (100%, 0%), stroke: 0.4pt))
]

// Helper functions
#let cross(pos, label: none, rel-label: (6pt, 0), name: none, ..rest) = {
  let txt = text(size: 16pt, baseline: -0.25pt)[$times.o$]
  content(pos, txt, stroke: none, fill: white, frame: "circle", padding: -2.7pt, name: name, ..rest)
  if label != none {
    content((rel: rel-label, to: pos), $#label$, anchor: "west")
  }
}

#let dressed-vertex(pos, label: none, rel-label: (3pt, 0), name: none, radius: small-rad, ..rest) = {
  circle(pos, radius: radius, fill: hatched, name: name, stroke: 0.5pt)
  if label != none {
    let label-pos = if rel-label != none { (rel: rel-label, to: pos) } else { pos }
    content(label-pos, $#label$, ..rest)
  }
}

#canvas({
  // Main loop with momentum labels
  circle((0, 0), radius: radius, stroke: 1pt, name: "loop")

  // Add momentum arrows and labels around loop
  for (ii, pos) in ((2, "0.125"), (3, "0.375"), (4, "0.625"), (1, "0.875")) {
    let angle = float(pos) * 360
    let label-angle = (angle - 3) * 1deg

    // Add momentum labels
    let rel-pos = (0.6 * radius * calc.cos(label-angle), 0.6 * radius * calc.sin(label-angle))
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

  // Add vertices with labels
  cross(
    (radius, 0),
    label: $partial_k R_(k,i j)(p_1,p_2)$,
    rel-label: (0.3, 0),
    name: "regulator",
  )

  dressed-vertex(
    (0, radius),
    label: $G_(k,j k)(p_2,p_3)$,
    rel-label: (0, 0.5),
    name: "vertex-top",
  )

  dressed-vertex(
    (0, -radius),
    label: $G_(k,l i)(p_4,p_1)$,
    rel-label: (0, -0.5),
    name: "vertex-bottom",
  )

  // External line
  draw.line((-2.5 * radius, 0), (-radius, 0), stroke: 1pt, name: "external")
  content((rel: (-0.6 * radius, -0.3), to: "external"), $phi_a$)

  // External momentum arrow
  draw.line(
    (-2.3 * radius, 0.15),
    (-1.5 * radius, 0.15),
    ..arrow-style,
    name: "q-arrow",
  )
  content((rel: (0, 0.3), to: "q-arrow.mid"), $q$)

  // Vertex label with connecting line
  content(
    (-2.2 * radius, 1.2 * radius),
    $Gamma_(k,a k l)^((3))(q,p_3,-p_4)$,
    name: "gamma-label",
  )
  draw.line(
    "gamma-label",
    (-radius, 0),
    ..label-style,
  )

  // Dressed vertex at external line connection
  dressed-vertex(
    (-radius, 0),
    radius: med-rad,
    name: "vertex-external",
  )
})
```
