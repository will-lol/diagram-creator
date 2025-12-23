---
description: |
  Spontaneous magnetization $m$ in an Ising ferromagnet appears below the critical temperature $T_c$. The derivative of $m$ diverges in the limit $T \to T_c^-$.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/spontaneous-magnetization"
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

#let arcsinh(x) = calc.ln(x + calc.sqrt(calc.pow(x, 2) + 1))

// Magnetization function
#let magnetization(x) = {
  if x >= 0 and x < 1 {
    calc.pow(1 - calc.pow(calc.sinh(arcsinh(1) / x), -4), 1 / 8)
  } else {
    0
  }
}

#canvas({
  draw.set-style(axes: (
    y: (mark: (end: "stealth", fill: black), label: (anchor: "north-west", offset: -0.2)),
    x: (mark: (end: "stealth", fill: black), label: (anchor: "south-east", offset: -0.2)),
  ))

  plot.plot(
    size: (8, 5),
    x-label: $T / T_c$,
    y-label: $m(0,T)$,
    y-max: 1.5,
    x-tick-step: 0.5,
    y-tick-step: 0.5,
    axis-style: "left",
    x-grid: true,
    y-grid: true,
    {
      // Main magnetization curve
      plot.add(
        style: (stroke: blue + 1.5pt),
        domain: (0.01, 2), // Avoid x=0 due to division
        samples: 300,
        magnetization,
      )

      // Dashed line y=x from 0 to 1
      plot.add(style: (stroke: (dash: "dashed", thickness: 1pt)), domain: (0, 1), x => x)
    },
  )
})
```
