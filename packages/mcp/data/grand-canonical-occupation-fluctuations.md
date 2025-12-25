---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  Number fluctuations of the occupation probability〈nk〉of a single mode k in an ideal Bose and Fermi gas in the grand canonical ensemble. Used in Exercise Sheet 11 of Statistical Physics by Manfred Salmhofer (2016), available at <https://janosh.dev/physics/statistical-physics>.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/grand-canonical-occupation-fluctuations"
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
#import "@preview/cetz-plot:0.1.3": plot

#set page(width: auto, height: auto, margin: 8pt)

#let size = (8, 5)

#canvas({
  draw.set-style(axes: (
    y: (label: (anchor: "north-west", offset: -0.2), mark: (end: "stealth", fill: black)),
    x: (label: (anchor: "north", offset: 0.1), mark: (end: "stealth", fill: black)),
  ))

  // First plot (Bose fluctuations)
  plot.plot(
    size: size,
    x-min: 0,
    x-max: 4.2,
    y-min: 0,
    x-label: $T$,
    y-label: $Delta n_k^+$,
    x-tick-step: 1,
    y-tick-step: 10,
    axis-style: "left",
    name: "bose-plot",
    {
      // Define constants
      let (ek, mu) = (1, 0)

      // Add the Bose fluctuation curve
      plot.add(
        style: (stroke: blue + 1.5pt),
        domain: (0.01, 4.2), // Avoid x=0 due to division
        samples: 200, // More samples for smoother curve
        x => {
          let beta = 1 / x
          let sinh_term = calc.sinh(beta / 2 * (ek - mu))
          1 / (2 * sinh_term * sinh_term)
        },
      )
    },
  )

  // Second plot (Fermi fluctuations)
  draw.translate((size.at(0) + 2.5, 0))

  plot.plot(
    size: size,
    x-min: 0,
    x-max: 4.2,
    y-min: 0,
    y-max: 0.28,
    x-label: $T$,
    y-label: $Delta n_k^-$,
    x-tick-step: 1,
    y-tick-step: 0.05,
    axis-style: "left",
    name: "fermi-plot",
    {
      // Define constants
      let (ek, mu) = (1, 0)

      // Add the Fermi fluctuation curve
      plot.add(
        style: (stroke: blue + 1.5pt),
        domain: (0.01, 4.2), // Avoid x=0 due to division
        samples: 200, // More samples for smoother curve
        x => {
          let beta = 1 / x
          let cosh_term = calc.cosh(beta * (ek - mu))
          1 / (2 + 2 * cosh_term)
        },
      )
    },
  )
})
```
