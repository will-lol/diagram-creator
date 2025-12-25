---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  The Maxwell-Boltzmann distribution plotted at different temperatures reveals that the most probable velocity $v_p$ of ideal gas particles scales with the square root of temperature.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/maxwell-boltzmann-distribution"
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

// Constants (in SI units)
#let k_B = 1.38e-23 // Boltzmann constant
#let m_u = 1.66e-27 // unified atomic mass unit

// Maxwell-Boltzmann distribution function
#let maxwell_boltzmann(x, T) = {
  let exp = calc.exp(-m_u * calc.pow(x, 2) / (2 * k_B * T))
  let prefactor = calc.pow(m_u / (2 * calc.pi * k_B * T), 3 / 2)
  4 * calc.pi * prefactor * calc.pow(x, 2) * exp
}

#canvas({
  plot.plot(
    size: (10, 6),
    x-label: [$v$ (m/s)],
    y-label: $P(v)$,
    y-max: 0.7e-3,
    x-tick-step: 2000,
    y-tick-step: 2e-4,
    y-format: y => calc.round(10000 * y, digits: 2),
    legend: "inner-north-east",
    x-grid: true,
    y-grid: true,
    legend-style: (stroke: .5pt),
    {
      // Plot distributions for different temperatures
      for (temp, color) in ((100, red), (300, orange), (1000, blue)) {
        plot.add(
          style: (stroke: color + 1.5pt),
          domain: (0, 8000),
          samples: 150,
          x => maxwell_boltzmann(x, temp),
          label: str(temp) + " K",
        )
      }
    },
  )
})
```
