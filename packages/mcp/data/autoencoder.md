---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  Variational autoencoder architecture. Made with <https://github.com/battlesnake/neural>.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/autoencoder"
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
#import draw: content, line

#set page(width: auto, height: auto, margin: 8pt)

#let neuron(pos, fill: white, text: none) = {
  draw.content(pos, text, frame: "circle", fill: fill, stroke: 0.5pt, padding: 1pt)
}

#let connect-layers(start-pos, start-count, end-pos, end-count) = {
  let start-y = start-count / 2 * 0.8
  let end-y = end-count / 2 * 0.8

  for ii in range(start-count) {
    for jj in range(end-count) {
      let start = (start-pos, start-y - ii * 0.8)
      let end = (end-pos, end-y - jj * 0.8)
      draw.line(start, end, stroke: rgb("#aaa") + .5pt)
    }
  }
}

#canvas({
  // Define layer configurations
  let layers = (
    // (x-pos, neuron-count, fill-color, label-prefix, label-superscript, y-offset)
    (0, 8, rgb("#f6db71"), "x", none, 3.2), // Input layer
    (2, 5, rgb("#eee"), "h", "1", 2), // First hidden layer
    (4, 3, rgb("#eee"), "z", none, 1.2), // Latent layer
    (6, 5, rgb("#eee"), "h", "2", 2), // Third hidden layer
    (8, 8, rgb("#cecef9"), "hat(x)", none, 3.2), // Output layer
  )

  // Draw connections first (so they appear behind nodes)
  for idx in range(layers.len() - 1) {
    let (x1, n1, ..) = layers.at(idx)
    let (x2, n2, ..) = layers.at(idx + 1)
    connect-layers(x1, n1, x2, n2)
  }

  // Layer labels
  content((layers.at(0).at(0), 4), align(center)[Input Layer])
  content((layers.at(2).at(0), 2.2), align(center)[Latent\ Representation])
  content((layers.at(-1).at(0), 4), align(center)[Output Layer])

  // Draw all layers
  for (x, count, fill, prefix, sup, y-offset) in layers {
    for idx in range(count) {
      let y-pos = y-offset - idx * 0.8
      let label = if sup != none {
        $prefix^sup_idx$
      } else if prefix == "hat(x)" {
        $hat(x)_idx$
      } else {
        $prefix_idx$
      }
      neuron((x, y-pos), fill: fill, text: label)
    }
  }
})
```
