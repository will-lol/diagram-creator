---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  A plot illustrating the temperature-dependent phase transitions of a material as a function of the critical temperature ($T_c$). The blue curve represents the low-temperature phase, the red curve represents the high-temperature phase, and the orange curve shows the critical mass ($m_c$) as a function of temperature. This visualization helps to understand the behavior of materials as they undergo phase transitions due to changes in temperature.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/critical-temperature"
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

#let tc = 1

// Define the three functions
#let f1(x) = {
  if x == tc { return 0 }
  calc.sqrt(3) * calc.pow(tc / x - 1, 1 / 2)
}

#let f2(x) = calc.sqrt(3) * calc.pow(x / tc, 3 / 2)

#let f3(x) = {
  if x == tc { return 0 }
  calc.sqrt(3) * calc.pow(x / tc, 3 / 2) * calc.pow(tc / x - 1, 1 / 2)
}

#canvas({
  draw.set-style(axes: (
    y: (label: (anchor: "north-west", offset: -0.2), mark: (end: "stealth", fill: black)),
    x: (label: (anchor: "north", offset: 0.2), mark: (end: "stealth", fill: black)),
  ))

  plot.plot(
    size: (10, 8),
    x-label: $T$,
    x-min: 0,
    x-max: 1.1,
    y-min: 0,
    y-max: 2.8,
    axis-style: "left",
    x-tick-step: 0.2,
    y-tick-step: 0.5,
    legend: (6.5, 8.5),
    legend-style: (item: (spacing: 0.15), padding: 0.25, stroke: .5pt),
    {
      // First function (blue)
      plot.add(
        style: (stroke: blue + 1.5pt),
        samples: 100,
        domain: (0.01, 1),
        f1,
        label: $sqrt(3)(T_c \/ T - 1)^(1 / 2)$,
      )

      // Second function (red)
      plot.add(
        style: (stroke: red + 1.5pt),
        samples: 50,
        domain: (0, 1.1),
        f2,
        label: $sqrt(3)(T \/ T_c)^(3 / 2)$,
      )

      // Third function (orange)
      plot.add(
        style: (stroke: orange + 1.5pt),
        samples: 125,
        domain: (0.01, 1),
        f3,
        label: $m_c(T)$,
      )
    },
  )
})
```
