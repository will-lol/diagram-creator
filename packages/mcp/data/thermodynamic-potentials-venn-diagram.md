---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  A Venn diagram illustrating the relationships between thermodynamic potentials, forces, and flows. The diagram shows three main regions (Mechanical, Thermal, Chemical) and their intersections, representing different thermodynamic potentials. The subscript μ denotes an N-to-μ Legendre transform of the indicated potential (U, H, F, or G). The diagram helps visualize how different thermodynamic quantities are related through Legendre transforms.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/thermodynamic-potentials-venn-diagram"
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
#import "@preview/cetz-venn:0.1.4": venn3
#import draw: circle, content, scale

#set page(width: auto, height: auto, margin: 8pt)

#canvas({
  // Scale up the diagram
  scale(2.5)

  // Create Venn diagram with three overlapping circles
  venn3(
    name: "venn",
    a-fill: blue.transparentize(40%), // Mechanical (blue)
    b-fill: red.transparentize(40%), // Thermal (red)
    c-fill: green.transparentize(40%), // Chemical (green)
    ab-fill: purple.transparentize(40%), // Overlap
    bc-fill: yellow.transparentize(40%), // Overlap
    ac-fill: teal.transparentize(40%), // Overlap
    abc-fill: gray.transparentize(70%), // Center
  )

  // Add outer labels for main potentials
  content("venn.a", [Mechanical\ $F_[mu] = -P V$], anchor: "center", name: "mechanical")
  content("mechanical.south", text(.8em)[(Grand\ potential)], anchor: "north", padding: (top: 4pt))

  content("venn.b", [Thermal\ $H_[mu] = T S$], anchor: "center")

  content("venn.c", [Chemical\ $G = mu N$], anchor: "center")

  // Add labels for overlapping regions
  content("venn.ab", align(center, $U_[mu] =\ T S - P V$), anchor: "center", offset: (0, 0.3))

  content("venn.abc", text(.8em, align(center, $U = T S -\ P V + mu N$)))

  content("venn.ac", align(center, $F =\ -P V + mu N$), anchor: "center", offset: (-0.3, -0.3))

  content("venn.bc", align(center, $H =\ T S + mu N$), anchor: "center", offset: (0.3, -0.3))

  // Add outer circle label
  content((0, 1.6), $G_[mu]$)
  content((0, 1.4), text(.8em)[(Gibbs-Duhem)])
  circle((0, 0), radius: 1.75, fill: rgb(70%, 70%, 90%, 20%), stroke: rgb(0%, 0%, 0%))
})
```
