---
description: |
  This spider diagram compares three computational chemistry methods: Classical Force Fields, Foundational ML Force Fields, and Density Functional Theory (DFT). The comparison is based on three key attributes:
  
  1. Accuracy: The precision and reliability of the method's predictions.
  2. Speed: The computational efficiency and time required for simulations.
  3. Generalizability: The ability to be applied across diverse chemical systems and material classes.
  
  - Classical Force Fields (red): Highest speed, medium accuracy, lowest generalizability.
  - DFT (green): Highest accuracy and generalizability, but lowest speed.
  - Foundational ML Force Fields (blue): Balanced performance across all attributes, positioned between classical methods and DFT.
  
  This diagram shows common trade-offs, highlighting how Foundational ML Force Fields aim to bridge the gap between the speed of classical methods and the accuracy of DFT, while offering improved generalizability over classical force fields.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/dft-mlff-cff-speed-accuracy-transfer"
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
#import draw: content, line

#set page(width: auto, height: auto, margin: 8pt)

#canvas({
  // Define coordinates
  let acc = (0, 4)
  let speed = (-3.464, -2) // -2*sqrt(3), -2
  let transfer = (3.464, -2) // 2*sqrt(3), -2
  let origin = (0, 0)

  // Helper function to draw dotted triangles
  let draw-dotted-triangle(r) = {
    let x = 0.866 * r // sqrt(3)/2 * r
    let y = -0.5 * r
    line((0, r), (-x, y), (x, y), (0, r), stroke: (dash: "dotted", paint: gray))
  }

  // Draw gray axes
  line(origin, acc, stroke: gray)
  line(origin, speed, stroke: gray)
  line(origin, transfer, stroke: gray)

  // Draw dotted triangles
  for r in range(1, 5) {
    draw-dotted-triangle(r)
  }

  // Label axes
  content(acc, "Accuracy", anchor: "south")
  content(speed, "Speed", anchor: "north-east")
  content(transfer, "Transferability", anchor: "north-west")

  // Draw colored regions
  // Classical Force Fields (red)
  let cff-acc = (0, 2)
  let cff-color = rgb("#ff0000")
  line(cff-acc, speed, (0.87, -0.5), cff-acc, stroke: cff-color + .5pt, fill: cff-color.transparentize(90%))
  // ML Force Fields (blue)
  let mlff-blue = rgb("#5a5adc")
  line((0, 3), (-2.598, -1.5), (2.598, -1.5), (0, 3), stroke: mlff-blue + .5pt, fill: mlff-blue.transparentize(85%))
  // DFT (green)
  let dft-green = rgb("#4c9900")
  line(acc, (-0.866, -0.5), transfer, acc, stroke: dft-green + .5pt, fill: dft-green.transparentize(80%))

  // // Add rotated labels
  content(
    (-1.7, 0.4),
    text(fill: cff-color)[Classical Force Fields],
    angle: 48.5deg,
  )
  content((0, -1.75), text(fill: mlff-blue)[Foundational ML Force Fields])
  content((1.9, 1.2), text(fill: dft-green)[DFT], angle: -60deg)
})

