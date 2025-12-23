---
description: |
  A plot illustrating the Fermi-Dirac distribution function for different temperatures relative to the chemical potential ($\epsilon/\mu$). The plot demonstrates how the occupation number ($n(\epsilon)$) changes as the temperature increases from zero to higher values. The visualization also highlights the effect of thermal fluctuations, which increase with higher temperatures.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/fermi-dirac-distro"
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
#import draw: bezier, content, line

#set page(width: auto, height: auto, margin: 8pt)

// Fermi-Dirac distribution function
#let n_F(x, beta, mu: 1) = {
  1 / (calc.exp(beta * (x - mu)) + 1)
}

#canvas({
  draw.set-style(axes: (
    y: (label: (anchor: "south-west")),
    x: (label: (anchor: "north-east")),
  ))

  plot.plot(
    size: (8, 7),
    x-label: [$epsilon$ / $mu$],
    y-label: $n(epsilon)$,
    x-min: 0,
    x-max: 2.3,
    y-min: 0,
    y-max: 1.2,
    x-tick-step: .5,
    y-tick-step: .5,
    y-ticks: (0.5, 1),
    axis-style: "left",
    legend: (5.5, 2.5),
    legend-style: (item: (spacing: 0.2), padding: 0.15),
    {
      // Plot distributions for different temperatures
      let chem-pot = 1

      // T = μ/5k_B (red curve)
      plot.add(
        style: (stroke: red + 1.5pt),
        domain: (0, 2.3),
        samples: 150,
        x => n_F(x, 5),
        label: $k_"B" T = 1 / 5 mu$,
      )

      // T = μ/25k_B (orange curve)
      plot.add(
        style: (stroke: orange + 1.5pt),
        domain: (0, 2.3),
        samples: 150,
        x => n_F(x, 25),
        label: $k_"B" T = 1 / 25 mu$,
      )

      // T = 0 (blue step function)
      let points = ((0, 1), (chem-pot, 1), (chem-pot, 0), (2.3, 0))
      plot.add(
        style: (stroke: blue + 1.5pt),
        points,
        label: $T = 0$,
      )

      plot.add-vline(0.8, style: (stroke: (dash: "dashed", thickness: 0.5pt)))
      plot.add-vline(1.2, style: (stroke: (dash: "dashed", thickness: 0.5pt)))

      // Add thermal fluctuation indicators
      plot.add-hline(1.1, min: 0.8, max: 1.2, style: (
        stroke: (thickness: 0.5pt),
        mark: (symbol: "stealth", stroke: 0.5pt, fill: black, scale: .1),
      ))
    },
  )

  content(
    (3.5, 6.5),
    $prop 1 / beta$,
    anchor: "south",
  )
})
```
