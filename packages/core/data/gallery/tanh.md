---
description: |
  Plot of the hyperbolic tangent. tanh(x) goes to +/- 1 for x to +\- infinity while it is approximately linear for abs(x) < 1. Appears in many places in physics, e.g. in the magnetization of an ideal paramagnet of independent spins.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/tanh"
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

#import "@preview/cetz:0.4.2": canvas, draw
#import "@preview/cetz-plot:0.1.3": plot

#set page(width: auto, height: auto, margin: 5pt)

#canvas({
  draw.set-style(axes: (
    y: (mark: (end: "stealth", fill: black), label: (anchor: "north-west", offset: -0.2)),
    x: (mark: (end: "stealth", fill: black), label: (anchor: "south-east", offset: -0.2)),
  ))

  plot.plot(
    size: (8, 5),
    x-label: $x$,
    y-label: $tanh(x)$,
    y-max: 1.25,
    y-min: -1.25,
    x-max: 2,
    x-min: -2,
    x-tick-step: 1,
    y-tick-step: 0.5,
    axis-style: "school-book",
    {
      // Main tanh curve
      plot.add(style: (stroke: blue + 1.5pt), domain: (-2, 2), samples: 100, x => calc.tanh(x))

      // Dashed line y=x from -1 to 1
      plot.add(style: (stroke: (dash: "dashed", paint: blue, thickness: 0.5pt)), samples: 2, domain: (-1.4, 1.4), x => {
        x
      })
    },
  )
})

