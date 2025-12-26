---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  Cartoon of the AlCoCrFeNi high entropy alloy (HEA) with body-centered cubic (BCC) lattice. HEAs also come in face-centered cubic (FCC) and (less frequently) hexagonal close packing (HCP). BCC HEAs typically have high yield strength and low ductility, vice versa for FCC HEAs. [Wiki article](https://wikipedia.org/wiki/High_entropy_alloys).
github_url: "https://github.com/janosh/diagrams/tree/main/assets/high-entropy-alloy"
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
#import draw: circle, content

#set page(width: auto, height: auto, margin: 5pt)

// Define the atom function with nice 3D shading
#let atom(pos, color, radius: 0.3, element: none, name: none) = {
  // Draw base circle with the main color
  circle(pos, radius: radius, stroke: none, fill: color)

  // Draw gradient overlay for 3D shading effect
  circle(pos, radius: radius, stroke: none, fill: gradient.radial(
    color.lighten(75%),
    color,
    color.darken(15%),
    focal-center: (30%, 25%),
    focal-radius: 5%,
    center: (35%, 30%),
  ))

  // Add element label if provided
  if element != none {
    content(
      pos,
      text(fill: white, weight: "bold", size: 10pt)[#element],
      anchor: "center",
      name: name,
    )
  }
}

#canvas({
  // Define colors for the high-entropy alloy (equivalent to the LaTeX colors but toned down)
  let colors = (
    rgb("#cc3333"),
    rgb("#006666"),
    rgb("#3333cc"),
    rgb("#cc8000"),
    rgb("#aaaaee"),
  )

  // Function to get a "random" color from the colors array
  // Since Typst doesn't have a random function, we'll use a deterministic pattern
  // based on position to create a random-looking distribution
  let pseudo-random-color(i, j, k) = {
    let index = calc.rem(i * 3 + j * 5 + k * 7, colors.len())
    colors.at(index)
  }

  // viewing angle parameters
  let x-factor = 0.3
  let y-factor = -0.18
  let z-spacing = 1.1

  // Draw the alloy structure
  // This is equivalent to the nested foreach loops in the LaTeX code
  for i in range(12) {
    for j in range(4) {
      // First set of atoms (equivalent to the first nested loop in LaTeX)
      for k in range(4) {
        atom((-i + x-factor * j, y-factor * j + z-spacing * k), pseudo-random-color(i, j, k))
      }

      // Second set of atoms (equivalent to the second nested loop in LaTeX)
      for k in range(3) {
        atom((-i + 0.5 + x-factor * j, y-factor * j + z-spacing * k + 0.65), pseudo-random-color(i, j, k + 10))
      }
    }
  }

  // Draw the legend (moved further down)
  let elements = (
    ("Al", rgb("#cc3333")), // red!80 (toned down)
    ("Co", rgb("#3333cc")), // blue!80 (toned down)
    ("Cr", rgb("#006666")), // teal (toned down)
    ("Fe", rgb("#cc8000")), // orange (toned down)
    ("Ni", rgb("#aaaaee")), // blue!20 (toned down)
  )

  // Position the legend further down
  let legend-y-start = 3
  let legend-spacing = 0.8

  for (idx, (element, color)) in elements.enumerate() {
    // Draw atom with element symbol
    atom(
      (2.5, legend-y-start - idx * legend-spacing),
      color,
      element: element,
    )
  }
})
```
