---
description: |
  This graph illustrates Jensen's Inequality, a fundamental concept in mathematical optimization and probability theory. It compares a convex function (blue curve, representing the natural logarithm function) with a linear function (orange dashed line). The inequality states that for a convex function, the function of an expectation is always less than or equal to the expectation of the function, depicted here by the fact that the dashed line is always above the curve. Equality holds if and only if the random variable is a constant (i.e. there is no randomness).
github_url: "https://github.com/janosh/diagrams/tree/main/assets/jensens-inequality"
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

#canvas({
  let mark = (end: "stealth", fill: black, scale: 0.7)
  draw.set-style(axes: (
    y: (label: (anchor: "north-west", offset: -0.2), mark: mark),
    x: (label: (anchor: "south-east", offset: -0.25), mark: mark),
  ))

  plot.plot(
    size: (8, 6),
    x-label: $x$,
    y-label: $log x$,
    y-min: -1,
    x-tick-step: none,
    y-tick-step: none,
    axis-style: "school-book",
    {
      // Main logarithmic curve
      plot.add(style: (stroke: rgb(0%, 0%, 80%) + 1.5pt), domain: (11, 150), samples: 150, x => calc.ln(x - 10) - 2)

      // Dashed line
      plot.add(
        style: (
          stroke: (paint: orange, thickness: 1.5pt, dash: "dashed"),
        ),
        domain: (8, 120),
        x => 0.2 + (3 - 0.2) * (x - 8) / (120 - 8),
      )
    },
  )
})
```
