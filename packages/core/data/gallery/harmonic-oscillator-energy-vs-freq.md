---
description: |
  Harmonic oscillator energy $\langle E\rangle/k_\text{B} T$ vs angular frequency $\omega = \sqrt{k/m}$
github_url: "https://github.com/janosh/diagrams/tree/main/assets/harmonic-oscillator-energy-vs-freq"
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

#set page(width: auto, height: auto, margin: 8pt)

#canvas({
  draw.set-style(axes: (
    y: (label: (anchor: "north-west", offset: -0.2), mark: (end: "stealth", fill: black)),
    x: (label: (anchor: "north", offset: 0.1), mark: (end: "stealth", fill: black)),
  ))

  plot.plot(
    size: (8, 5),
    x-min: 0,
    x-max: 11,
    y-min: 0,
    x-label: $omega = sqrt(k/m)$,
    y-label: $chevron.l E chevron.r \/ k_"B" T$,
    x-tick-step: 2,
    y-tick-step: 2,
    axis-style: "left",
    {
      // Define constants from original
      let h = 1
      let b = 1

      // Add the energy expectation value curve
      plot.add(
        style: (stroke: blue + 1.5pt),
        domain: (0.01, 11), // Avoid x=0 due to division
        samples: 200, // More samples for smoother curve
        x => {
          // E = (1/2)hω(1 + 4/(exp(βhω) - 1))
          let hw = h * x
          let exp_term = calc.exp(b * hw)
          (1 / 2) * hw * (1 + 4 / (exp_term - 1))
        },
      )
    },
  )
})

