---
description: |
  A pie chart showing the 3 main research areas covered by the diagrams in <https://github.com/janosh/diagrams>: physics (Ψ), chemistry (ΔG), and machine learning (∑). The symbols represent wave functions, Gibbs free energy, and linear algebra, respectively.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/pie-physics-chemistry-ml"
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
#import "@preview/cetz:0.4.2": canvas
#import "@preview/cetz-plot:0.1.3": chart

#set page(width: auto, height: auto, margin: 0pt)

#canvas({
  // Data for pie chart (equal thirds)
  let data = (
    ("physics", 1, "Ψ", rgb("#4a90e2")),
    ("chemistry", 1, "ΔG", rgb("#50c878")),
    ("ml", 1, "∑", rgb("#ff7f50")),
  )

  // Draw pie chart
  chart.piechart(
    data,
    value-key: 1,
    label-key: 2,
    radius: 3,
    slice-style: data.map(itm => itm.at(-1)),
    stroke: white + .2pt,
    inner-label: (content: (value, label) => [#text(label, size: 4em)], radius: 120%),
    outer-label: (content: ()), // hide outer labels
    legend: (label: ()), // hide legend
  )
})
```
