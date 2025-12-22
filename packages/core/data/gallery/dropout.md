---
description: |
  Illustration of applying dropout with a rate of $p = 0.5$ to a multilayer perceptron.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/dropout"
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
#import draw: circle, content, line

#set page(width: auto, height: auto, margin: 8pt)

#canvas({
  let layer-sep = 2.5 // Horizontal separation between layers
  let node-sep = 1.5 // Vertical separation between nodes
  let arrow-style = (mark: (end: "stealth", scale: 0.7), fill: black)

  // Helper function to draw a layer of nodes
  let draw-layer(x, nodes, prefix: "") = {
    for ii in range(nodes) {
      circle(
        (x, node-sep * (ii + 1)),
        radius: 0.3,
        name: prefix + str(ii + 1),
      )
    }
  }

  // Helper to connect all nodes between layers
  let connect-layers(from-prefix, to-prefix, from-nodes, to-nodes) = {
    for ii in range(from-nodes) {
      for jj in range(to-nodes) {
        line(
          (from-prefix + str(ii + 1)),
          (to-prefix + str(jj + 1)),
          ..arrow-style,
        )
      }
    }
  }

  // Left network (fully connected)
  // Draw all layers
  draw-layer(0, 5, prefix: "i") // Input layer
  draw-layer(layer-sep, 5, prefix: "h1") // First hidden layer
  draw-layer(2 * layer-sep, 5, prefix: "h2") // Second hidden layer

  // Draw output nodes
  circle((3 * layer-sep, 2 * node-sep), radius: 0.3, name: "o1")
  circle((3 * layer-sep, 4 * node-sep), radius: 0.3, name: "o2")

  // Connect all layers
  connect-layers("i", "h1", 5, 5)
  connect-layers("h1", "h2", 5, 5)

  // Connect to output nodes
  for ii in range(5) {
    line(("h2" + str(ii + 1)), "o1", ..arrow-style)
    line(("h2" + str(ii + 1)), "o2", ..arrow-style)
  }

  // Draw dropout arrow
  let mid-x = 4 * layer-sep
  line(
    (3.5 * layer-sep, 3 * node-sep),
    (4.5 * layer-sep, 3 * node-sep),
    ..arrow-style,
    name: "dropout-arrow",
  )
  content(
    "dropout-arrow.mid",
    text(weight: "bold", size: 1.2em)[dropout],
    anchor: "south",
    padding: 3pt,
  )

  // Right network (with dropout)
  // Draw all layers
  draw-layer(mid-x + layer-sep, 5, prefix: "di")
  draw-layer(mid-x + 2 * layer-sep, 5, prefix: "dh1")
  draw-layer(mid-x + 3 * layer-sep, 5, prefix: "dh2")

  // Draw output nodes
  circle((mid-x + 4 * layer-sep, 2 * node-sep), radius: 0.3, name: "do1")
  circle((mid-x + 4 * layer-sep, 4 * node-sep), radius: 0.3, name: "do2")

  // Add dropout X marks
  let x-style = (fill: red, weight: "bold", size: 4em, baseline: -4pt)
  content("di1", text(..x-style)[×])
  content("di3", text(..x-style)[×])
  content("dh11", text(..x-style)[×])
  content("dh13", text(..x-style)[×])
  content("dh14", text(..x-style)[×])
  content("dh22", text(..x-style)[×])
  content("dh24", text(..x-style)[×])

  // Connect remaining nodes (after dropout)
  for ii in (2, 4, 5) {
    for jj in (2, 5) {
      line(("di" + str(ii)), ("dh1" + str(jj)), ..arrow-style)
    }
  }

  for ii in (2, 5) {
    for jj in (1, 3, 5) {
      line(("dh1" + str(ii)), ("dh2" + str(jj)), ..arrow-style)
    }
  }

  for ii in (1, 3, 5) {
    line(("dh2" + str(ii)), "do1", ..arrow-style)
    line(("dh2" + str(ii)), "do2", ..arrow-style)
  }
})

