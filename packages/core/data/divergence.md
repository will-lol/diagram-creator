---
description: |
  Plot of $-\ln(1-z)$ which diverges at $z = 1$.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/divergence"
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
  draw.set-style(axes: (
    y: (mark: (end: "stealth", fill: black, scale: 0.5)),
    x: (mark: (end: "stealth", fill: black, scale: 0.5)),
  ))

  plot.plot(
    size: (8, 5),
    x-label: $z$,
    x-max: 1.1,
    x-tick-step: 0.5,
    y-tick-step: 2,
    axis-style: "left",
    legend: "inner-north-west",
    legend-style: (item: (spacing: 0.2), padding: 0.15, stroke: .5pt),
    {
      plot.add(
        style: (stroke: blue + 1.5pt),
        domain: (0, 0.999), // avoid x=1 since ln(0) is undefined
        samples: 150,
        label: $-ln(1-z)$,
        x => -calc.ln(1 - x),
      )
    },
  )
})
```
