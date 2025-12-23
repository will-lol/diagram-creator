---
description: |
  Architecture of a sparse autoencoder showing the encoding-decoding process
  with sparse hidden layer activations. The diagram illustrates how sparsity
  constraints in the hidden layer (shown in green with varying transparency
  indicating activation strength) lead to more efficient and interpretable
  feature representations. Input and output layers are shown in blue, with the
  sparse hidden layer demonstrating selective activation patterns that encourage
  the network to learn meaningful, sparse representations of the input data.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/sparse-autoencoder"
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
#import "@preview/suiji:0.4.0"

#set page(width: auto, height: auto, margin: 8pt)

#canvas({
  import draw: circle, line, on-layer

  // Layer configuration
  let (n-input-neurons, n-hidden-neurons) = (6, 12)
  let (input-len, hidden-len) = (20, 30)
  let sparsity = 0.3

  // Generate activations
  let input-rng = suiji.gen-rng(43)
  let (input-rng, input-activations) = suiji.uniform(input-rng, size: n-input-neurons)

  let hidden-rng = suiji.gen-rng(47)
  let (hidden-rng, uniform-values) = suiji.uniform(hidden-rng, size: n-hidden-neurons)
  let (hidden-rng, hidden-activations) = suiji.uniform(hidden-rng, size: n-hidden-neurons)
  let is-alive = uniform-values.map(x => x < sparsity)

  // Draw neurons
  on-layer(1, {
    // Input layer
    for ii in range(n-input-neurons) {
      circle(
        (0, ii * input-len / (n-input-neurons - 1)),
        radius: 1,
        fill: blue.transparentize(input-activations.at(1 - ii) * 100%),
        stroke: blue.darken(30%) + 2pt,
        name: "in-" + str(ii),
      )
    }
    // Hidden layer
    for ii in range(n-hidden-neurons) {
      let y-offset = (input-len - hidden-len) / 2
      circle(
        (10, ii * hidden-len / (n-hidden-neurons - 1) + y-offset),
        radius: 1,
        fill: green.transparentize(100% * (1 - float(is-alive.at(ii)) * hidden-activations.at(ii))),
        stroke: green.darken(30%) + 2pt,
        name: "hidden-" + str(ii),
      )
    }
    // Output layer
    for ii in range(n-input-neurons) {
      circle(
        (20, ii * input-len / (n-input-neurons - 1)),
        radius: 1,
        fill: blue.transparentize(input-activations.at(1 - ii) * 100%),
        stroke: blue.darken(30%) + 2pt,
        name: "out-" + str(ii),
      )
    }
  })

  // Draw connections
  on-layer(0, {
    for ii in range(n-input-neurons) {
      for jj in range(n-hidden-neurons) {
        line("in-" + str(ii), "hidden-" + str(jj), stroke: gray + 1.5pt)
      }
    }
    for ii in range(n-hidden-neurons) {
      for jj in range(n-input-neurons) {
        line("hidden-" + str(ii), "out-" + str(jj), stroke: gray + 1.5pt)
      }
    }
  })
})
```
