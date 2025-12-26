---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  A plot comparing the identical particle distribution functions of Bose-Einstein, Boltzmann, and Fermi-Dirac statistics as a function of the reduced chemical potential $\beta (\epsilon - \mu)$. This visualization highlights the differences between the three types of distribution functions, which are used to describe the behavior of particles in different statistical systems.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/statistical-energy-distributions"
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

// Distribution functions
#let bose-einstein(x) = 1 / (calc.exp(x) - 1)
#let boltzmann(x) = 1 / calc.exp(x)
#let fermi-dirac(x) = 1 / (calc.exp(x) + 1)

#canvas({
  draw.set-style(axes: (
    y: (mark: (end: "stealth", fill: black), label: (anchor: "north-west", offset: -0.2)),
    x: (mark: (end: "stealth", fill: black), label: (anchor: "south-east", offset: -0.2)),
  ))

  plot.plot(
    size: (8, 5),
    x-label: $beta (epsilon - mu)$,
    y-label: $chevron.l n chevron.r$,
    x-min: -7,
    x-max: 7,
    y-min: 0,
    y-max: 1.8,
    x-tick-step: 2,
    y-tick-step: 0.5,
    axis-style: "school-book",
    x-grid: true,
    y-grid: true,
    legend: "inner-north-east",
    legend-style: (stroke: 0.5pt, scale: 80%),
    {
      // Bose-Einstein distribution
      plot.add(
        style: (stroke: blue + 1.5pt),
        domain: (0.1, 7), // Avoid x=0 since BE diverges there
        samples: 200,
        label: "Bose-Einstein",
        bose-einstein,
      )

      // Boltzmann distribution
      plot.add(
        style: (stroke: orange + 1.5pt),
        domain: (-1, 7),
        samples: 100,
        label: "Boltzmann",
        boltzmann,
      )

      // Fermi-Dirac distribution
      plot.add(
        style: (stroke: red + 1.5pt),
        domain: (-7, 7),
        samples: 100,
        label: "Fermi-Dirac",
        fermi-dirac,
      )
    },
  )
})
```
