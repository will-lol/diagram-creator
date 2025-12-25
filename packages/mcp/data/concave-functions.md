---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  $x \ln(x)$ is convex and $x - 1$ is its tangent, so $x \ln(x) \geq x - 1 \enskip \forall x$.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/concave-functions"
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
    y: (label: (anchor: "north-west", offset: -0.2), mark: (end: "stealth", fill: black)),
    x: (mark: (end: "stealth", fill: black)),
  ))
  plot.plot(
    size: (8, 5),
    x-min: 0,
    x-max: 1,
    x-label: $x$,
    y-tick-step: 0.2,
    x-tick-step: 0.2,
    x-grid: true,
    y-grid: true,
    legend: "inner-north-west",
    legend-style: (stroke: .5pt),
    axis-style: "left",
    {
      // x function
      plot.add(style: (stroke: blue + 1.5pt), domain: (0, 1), label: $x$, x => x)

      // -x ln(x) function
      plot.add(
        style: (stroke: red + 1.5pt),
        domain: (0.01, 1), // avoid x=0 since ln(0) is undefined
        samples: 100,
        label: $-x ln(x)$,
        x => -x * calc.ln(x),
      )
    },
  )
})
```
