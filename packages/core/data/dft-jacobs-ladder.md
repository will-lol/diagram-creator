---
description: |
  A visualization of Perdew's Jacob's ladder of density functional theory (DFT),
  representing a hierarchy of increasingly sophisticated approximations to the
  exchange-correlation energy (E_xc). The ladder spans from simple local density
  approximations at the bottom to accurate but expensive double-hybrid functionals
  near the top, with each rung adding new physical ingredients to improve accuracy
  at the cost of computational complexity.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/dft-jacobs-ladder"
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
#import draw: circle, content, line, rect

#set page(width: auto, height: auto, margin: 8pt)

#canvas({
  let rung-sep = 2 // Vertical separation between rungs
  let width = 8.4 // Width of each rung
  let height = 1 // Height of each rung
  let circle-r = 0.8 // Radius of symbol circles
  let circle-offset = -3.2 // X offset for symbol circles

  // Helper to draw a rung with its symbol
  let draw-rung(y, color, text-content, symbol) = {
    // Draw rung rectangle
    rect(
      (-width / 2, y),
      (width / 2, y + height),
      fill: color,
      stroke: rgb("888") + 0.4pt,
    )

    // Add text content, left-aligned relative to circle and vertically centered
    content(
      (circle-offset + circle-r + 0.2, y + height / 2),
      text(size: 10pt)[#align(horizon)[#text-content]],
      anchor: "west", // Left align text
    )

    // Add symbol circle if provided
    if symbol != none {
      circle(
        (circle-offset, y + height / 2),
        radius: circle-r,
        fill: color,
        stroke: rgb("888") + 0.4pt,
      )
      content((circle-offset, y + height / 2), align(center, symbol))
    }
  }

  // Draw all rungs from bottom to top
  draw-rung(0, rgb("b4a7d6"), [0: *Hartree World*], none)

  draw-rung(rung-sep, rgb("a4c2f4"), [1: *Local Density Approx. (LDA)*\ VWN, GPW92], $rho(bold(r))$)

  draw-rung(
    2 * rung-sep,
    rgb("f9cb9c"),
    [2: *Generalized Gradient Approx. (GGA)*\ PBE, BLYP],
    $nabla rho(bold(r))$,
  )

  draw-rung(3 * rung-sep, rgb("ffe599"), [3: *Meta-GGA*\ (r/r$""^2$)SCAN], [$\ nabla^2rho(bold(r))$ \ $tau(bold(r))$])

  draw-rung(
    4 * rung-sep,
    rgb("b6d7a8"),
    [4: *Occupied Hybrid Methods* \ B3LYP, CAM-B3LYP, M06-2X],
    ${phi_i^"occ"}$,
  )

  draw-rung(5 * rung-sep, rgb("ea9999"), [5: *Virtual Double-Hybrids* \ B2PLYP], ${phi_i^"virt"}$)

  draw-rung(6 * rung-sep, rgb("ffb7c5"), [*Chemical accuracy*], none)

  // Draw vertical lines connecting rungs
  line(
    (-width / 2, 0),
    (-width / 2, 6 * rung-sep + height),
    stroke: 0.7pt,
  )
  line(
    (width / 2, 0),
    (width / 2, 6 * rung-sep + height),
    stroke: 0.7pt,
  )
})
```
