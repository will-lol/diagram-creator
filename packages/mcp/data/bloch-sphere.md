---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  A Bloch sphere of radius |a| = 1 contains all possible states of a two-state quantum system (qubit). Each Bloch vector fully determines a spin-1/2 density matrix. Used in Exercise Sheet 10 of Statistical Physics by Manfred Salmhofer (2016), available at <https://janosh.dev/physics/statistical-physics>.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/bloch-sphere"
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
#import "@preview/cetz:0.4.2": angle, canvas, draw
#import draw: circle, content, line

#set page(width: auto, height: auto, margin: 8pt)

#canvas({
  // Helper coordinates
  let rad = 2.5
  let vec-a = (rad / 3, rad / 2)
  let phi-point = (rad / 3, -rad / 5)
  let mark = (end: "stealth", fill: black)

  // Bloch vector
  line((0, 0), vec-a, mark: (start: "circle", end: "circle", fill: black, scale: .5, anchor: "center"))

  // Dashed line forming angle
  line((0, 0), phi-point, style: "dashed")
  line(phi-point, vec-a, style: "dashed")
  // Axes
  let arrow-extend = 1.15
  line((0, 0), (-rad / 5 * 1.2, -rad / 3 * 1.2), mark: mark, name: "x1")
  content("x1.end", [$x_1$], anchor: "north")

  line((0, 0), (arrow-extend * rad, 0), mark: mark, name: "x2")
  content("x2.end", [$x_2$], anchor: "west")

  line((0, 0), (0, arrow-extend * rad), mark: mark, name: "x3")
  content("x3.end", [$x_3$], anchor: "south")

  // Angles
  angle.angle(
    (0, 0),
    (-1, -calc.tan(60deg)),
    (1, -calc.tan(30deg)),
    label: [$phi$],
    stroke: (paint: gray, thickness: .5pt),
    mark: (end: "stealth", fill: gray, scale: .7),
  )

  angle.angle(
    (0, 0),
    (1, calc.tan(60deg)),
    (1, calc.tan(90deg)),
    label: [$theta$],
    stroke: (paint: gray, thickness: .5pt),
    mark: (start: "stealth", fill: gray, scale: .7),
    label-radius: 0.75,
  )

  // Sphere
  circle((0, 0), radius: rad)
  circle((0, 0), radius: (rad, rad / 3), stroke: (dash: "dashed"), fill: gray.transparentize(70%))
})
```
