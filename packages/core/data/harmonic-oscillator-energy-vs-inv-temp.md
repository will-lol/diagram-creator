---
description: |
  Harmonic oscillator energy vs inverse temperature beta = 1/(kB T)
github_url: "https://github.com/janosh/diagrams/tree/main/assets/harmonic-oscillator-energy-vs-inv-temp"
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

  plot.plot(
    size: size,
    x-min: 0,
    x-max: 11,
    y-min: 0,
    y-max: 2.3,
    x-label: $beta$,
    y-label: $chevron.l E chevron.r \/ planck omega$,
    x-tick-step: 2,
    y-tick-step: 0.5,
    axis-style: "left",
    {
      // Define constants from original
      let (h, w) = (1, 1)

      // Add the energy expectation value curve
      plot.add(
        style: (stroke: blue + 1.5pt),
        domain: (1e-5, 11),
        samples: 200, // More samples for smoother curve
        x => {
          // E = (1/2)hω(1 + 4/(exp(xhω) - 1))
          let hw = h * w
          let exp_term = calc.exp(x * hw)
          (1 / 2) * hw * (1 + 4 / (exp_term - 1))
        },
      )
    },
  )
})
```
