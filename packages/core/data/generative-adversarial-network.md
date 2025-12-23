---
description: |
  Generative adversarial network (GAN) architecture. A GAN has two parts. The discriminator $D$ acts as a classifier that learns to distinguish fake data produced by the generator $G$ from real data. $G$ incurs a penalty when $D$ detects implausible results. This signal is backpropagated through the generator weights such that $G$ learns to produce more realistic samples over time, eventually fooling the discriminator if training succeeds.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/generative-adversarial-network"
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
#import draw: circle, content, group, hobby, line, on-layer

#set page(width: auto, height: auto, margin: 8pt)

#canvas({
  // Style definitions
  let node-style = (
    stroke: none,
    fill: rgb("#66B2B2"), // teal!60 equivalent
    radius: 0.53,
  )
  let arrow-style = (
    stroke: 0.8pt,
    mark: (end: "stealth", scale: 0.4, fill: black),
  )

  let (y-real, y-fake) = (2, 0)

  // Draw nodes
  // z_in node
  circle((0, y-fake), name: "zin", ..node-style)
  content("zin", $arrow(z)_"in"$)

  // x_fake node
  circle((3, y-fake), name: "fake", ..node-style)
  content("fake", $arrow(x)_"fake"$)

  // x_real node
  circle((3, y-real), name: "real", ..node-style)
  content("real", $arrow(x)_"real"$)

  // x node (discriminator input)
  circle((6, y-real / 2), name: "D", ..node-style, radius: 0.4)
  content("D", $arrow(x)$)

  // Output node
  content((9, y-real / 2), text(size: 0.9em, baseline: -1pt)[real?], name: "out", padding: 2pt)

  // Draw arrows and their labels
  // Generator input arrow
  line((-2.5, y-fake), "zin", ..arrow-style, name: "zin-line")
  content("zin-line.mid", $p_theta (arrow(z))$, anchor: "south", padding: 0.1)
  content("zin-line.mid", text(size: 0.8em)[latent noise], anchor: "north", padding: 0.1)

  // Generator arrow
  line("zin", "fake", ..arrow-style, name: "fake-line")
  content("fake-line.mid", $G(arrow(x))$, anchor: "south", padding: 0.1)
  content("fake-line.mid", text(size: 0.8em)[generator], anchor: "north", padding: 0.1)

  // Real data arrow
  line((-2, y-real), "real", ..arrow-style, name: "real-line")
  content("real-line.mid", $p_"data" (arrow(x))$, anchor: "south", padding: 0.1)

  // Connection points with names
  circle((4.5, y-fake), radius: 0.06, fill: black, name: "dot1")
  circle((4.5, y-real), radius: 0.06, fill: black, name: "dot2")
  on-layer(1, circle((4.25, 2 * y-real / 3), radius: 0.12, fill: orange, stroke: none, name: "dot3"))

  // Draw connecting lines with names
  line("fake", "dot1", ..arrow-style, name: "conn1")
  line("real", "dot2", ..arrow-style, name: "conn2")
  line("dot3", "D", ..arrow-style, name: "conn3")

  // Draw dashed curve using named points
  hobby(
    "dot1",
    (4.2, (y-real - y-fake) / 2),
    "dot2",
    stroke: (dash: "dashed"),
    omega: 2,
    name: "dashed-curve",
  )

  // Discriminator arrow and labels
  line("D", "out", ..arrow-style, name: "disc-line")
  content("disc-line.mid", $D(arrow(x))$, anchor: "south", padding: 0.1)
  content("disc-line.mid", text(size: 0.8em)[discriminator], anchor: "north", padding: 0.15)
})
```
