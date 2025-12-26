---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  Two Feynman diagrams showing loop corrections to a propagator. Each diagram contains
  a loop with momentum q₀ and two external lines with coupling g. The loops include
  mass terms m₁², m₂² and width terms γ₁², γ₂². The diagrams differ in the position
  of the regulator insertion (cross marker) which appears at the bottom vertex in the
  first diagram and at the top in the second.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/feynman-diagrams-loop-regulator"
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
#import draw: arc, circle, content, group, line, translate

#set page(width: auto, height: auto, margin: 8pt)

#canvas({
  // Define styles and constants
  let radius = 1.5
  let dark-blue = rgb("#4040d9")
  let arrow-style = (
    mark: (end: "stealth", fill: dark-blue, scale: .5),
    stroke: (paint: dark-blue, thickness: 0.75pt),
  )

  // Helper functions
  let cross(pos, name: none) = {
    content(
      pos,
      text(size: 16pt, baseline: -0.5pt)[$times.o$],
      stroke: none,
      fill: white,
      frame: "circle",
      padding: -2.5pt,
      name: name,
    )
  }

  let vertex(pos, label: none, rel-label: (-0.2, -0.2)) = {
    circle(pos, radius: 2pt, fill: black)
    if label != none {
      content((rel: rel-label, to: pos), $#label$)
    }
  }

  let momentum-arrow(start, end, label-pos, anchor: "south") = {
    line(start, end, ..arrow-style)
    content(label-pos, text(fill: dark-blue)[$q_0$], anchor: anchor)
  }

  let draw-diagram(offset: 0, cross-pos: "50%", arc-start: 140deg, arc-stop: 40deg) = {
    group({
      if offset != 0 { translate((offset, 0)) }

      // Main circle and labels
      circle((0, 0), radius: radius, stroke: 1pt, name: "loop")
      content((0, radius), $m_1^2, gamma_1^2$, anchor: "south", padding: (bottom: 7pt))

      // Momentum arrow on loop
      arc(
        (rel: (.23, 0), to: if arc-start > 180deg { "loop.35%" } else { "loop.15%" }),
        radius: 0.85 * radius,
        start: arc-start,
        stop: arc-stop,
        ..arrow-style,
        name: "momentum-arrow",
      )
      content(
        "momentum-arrow.mid",
        text(fill: dark-blue)[$q_0$],
        anchor: if arc-start > 180deg { "south" } else { "north" },
        padding: if arc-start > 180deg { (bottom: 3pt) } else { none },
      )

      // Cross marker
      cross("loop." + cross-pos, name: "cross")
      content("loop.50%", $m_2^2, gamma_2^2$, anchor: "north", padding: (top: 7pt))

      // External lines and vertices
      let ext-len = 2 * radius
      vertex((-radius, 0), label: "g")
      vertex((radius, 0), label: "g", rel-label: (0.2, -0.2))
      line((-ext-len, 0), (-radius, 0), stroke: 1pt)
      line((radius, 0), (ext-len, 0), stroke: 1pt)

      // External momentum arrows
      momentum-arrow(
        (-ext-len + 0.2, 0.15),
        (-radius - 0.2, 0.15),
        (-1.5 * radius, 0.3),
      )
      momentum-arrow(
        (radius + 0.2, 0.15),
        (ext-len - 0.2, 0.15),
        (1.5 * radius, 0.3),
      )
    })
  }

  // Draw diagrams
  draw-diagram()
  content((4, 0), text(size: 18pt)[$+$])
  draw-diagram(
    offset: 8,
    cross-pos: "0%",
    arc-start: 220deg,
    arc-stop: 320deg,
  )
})
```
