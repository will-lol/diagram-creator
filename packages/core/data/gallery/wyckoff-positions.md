---
description: |
  Unit cell representation of a 2D crystal with p4m symmetry and three occupied Wyckoff positions.
  The shaded areas highlight the asymmetric unit and the site-symmetries of the atoms, indicating the region of the unit cell the each atom is constrained to lie in by specifying tis anonymized Wyckoff position. Reproduced from fig. 1 in ["Wyckoff Set Regression for Materials Discovery"](https://ml4physicalsciences.github.io/2020/files/NeurIPS_ML4PS_2020_21.pdf) by Rhys Goodall, inspired by [PyXtal docs](https://pyxtal.readthedocs.io/en/latest/Background.html#wyckoff-positions).
github_url: "https://github.com/janosh/diagrams/tree/main/assets/wyckoff-positions"
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

#import "@preview/cetz:0.4.2": canvas, draw
#import draw: circle, line, rect, rotate

#set page(width: auto, height: auto, margin: 8pt)

#canvas({
  let size = 5 // Base radius/size
  let small-square = 0.3 // Size of small squares
  let circle-radius = 0.3 // Size of circles

  // Define colors
  let colors = (
    teal: rgb("#19d4d4"),
    yellow: rgb("#f3f380"),
    red: rgb("#f36969"),
  )

  // Fill colored regions
  // Teal triangle
  line(
    (0, 0),
    (size, 0),
    (size, -size),
    fill: colors.teal,
    name: "teal-triangle",
    close: true,
    stroke: none,
  )

  // Yellow region
  line(
    (size - .5, -size),
    (0, -.5),
    (0, 0),
    (size, -size),
    fill: colors.yellow,
    name: "yellow-region",
    close: true,
    stroke: none,
  )

  // Red rectangle
  rect((0, 0), (size, 0.35), fill: colors.red, name: "red-rect", stroke: none)

  // Main square outline
  rect((-size, -size), (size, size), name: "main-square")

  // Dashed lines
  let dash-style = (stroke: (dash: "dashed"))
  line((-size, -size), (size, size), ..dash-style, name: "diag1")
  line((size, -size), (-size, size), ..dash-style, name: "diag2")
  line((-size, 0), (size, 0), ..dash-style, name: "horiz")
  line((0, -size), (0, size), ..dash-style, name: "vert")

  // Corner squares (yellow)
  for a in (-0.8 * size, 0.8 * size) {
    for b in (-0.8 * size, 0.8 * size) {
      rect(
        (a - small-square, b - small-square),
        (a + small-square, b + small-square),
        fill: colors.yellow,
        name: "corner-square-" + str(a).replace(".", "p") + "-" + str(b).replace(".", "p"),
      )
    }
  }

  // Red circles on axes
  for a in (-0.7 * size, 0.7 * size) {
    circle((a, 0), radius: circle-radius, fill: colors.red, name: "horiz-circle-" + str(a).replace(".", "p"))
    circle((0, a), radius: circle-radius, fill: colors.red, name: "vert-circle-" + str(a).replace(".", "p"))
  }

  // Rotated teal squares
  rotate(45deg)
  for i in range(8) {
    let angle = i * 360deg / 8 + 22.5deg
    let x = 2 * calc.cos(angle)
    let y = 2 * calc.sin(angle)
    rect(
      (x - small-square, y - small-square),
      (x + small-square, y + small-square),
      fill: colors.teal,
      name: "rot-square-" + str(i).replace(".", "p"),
    )
  }
})

