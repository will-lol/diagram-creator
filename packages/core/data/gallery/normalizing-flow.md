---
description: |
  A chain of bijections $f = f_1 \circ \dots \circ f_k$ constituting a normalizing flow which step by step transforms a simple distribution $p_0(\vec z_0)$ into a complex one $p_k(\vec z_k)$. The bijections are trained to fit $p_k(\vec z_k)$ to some target distribution $p_x(\vec x)$. Inspired by [Lilian Weng](https://lilianweng.github.io/lil-log/2018/10/13/flow-based-deep-generative-models).
github_url: "https://github.com/janosh/diagrams/tree/main/assets/normalizing-flow"
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
#import draw: circle, content, group, line, translate

#set page(width: auto, height: auto, margin: 8pt)

// Helper functions for probability distributions
#let gaussian(x, mu: 0, sigma: 0.2) = (
  (1 / (sigma * calc.sqrt(2 * calc.pi))) * calc.exp(-0.5 * calc.pow((x - mu) / sigma, 2))
)

#let mixture(x, params) = {
  let sum = 0
  for (weight, mu, sigma) in params {
    sum += weight * gaussian(x, mu: mu, sigma: sigma)
  }
  return sum
}

// Distribution functions
#let p0(x) = 0.55 * gaussian(x, mu: 0, sigma: 0.2)
#let pi(x) = mixture(x, ((0.6, -0.3, 0.2), (0.4, 0.4, 0.25)))
#let pk(x) = mixture(x, ((0.4, -0.4, 0.15), (0.3, 0, 0.12), (0.3, 0.4, 0.15)))

// Helper function to draw distribution plots
#let draw-distro(x, y, dist-fn, name: none) = {
  // Draw circle outline
  circle((x, y + 0.3), radius: 1, stroke: (dash: "dashed"), name: name)

  // Draw coordinate axes
  line((x - 0.8, y), (x + 0.8, y), mark: (end: ">", scale: 0.5, fill: black))
  line((x, y - 0.5), (x, y + 1.1), mark: (end: ">", scale: 0.5, fill: black))

  let plot-size = (1.6, 1.1)

  group({
    translate((x - 0.8, y))
    plot.plot(size: plot-size, axis-style: none, y-min: 0, y-max: 1.5, {
      plot.add(style: (stroke: blue.darken(20%) + 1.2pt), domain: (-0.8, 0.8), samples: 100, dist-fn)
    })
  })
}

#canvas({
  // Constants for layout
  let node-spacing = 3
  let y-base = 0
  let y-distro = y-base - 2 // vertical offset for distributions

  // Helper function for z-nodes
  let z-node(x, label, special: none, name: none, ..rest) = {
    circle(
      fill: gray.transparentize(70%),
      (x, y-base),
      radius: 0.4,
      stroke: if special != none { special } else { none },
      name: name,
    )
    content(name, label, ..rest)
  }

  // Draw all nodes first
  z-node(0, $z_0$, special: red, name: "z0")
  z-node(node-spacing, $z_1$, name: "z1")
  z-node(2 * node-spacing, $z_i$, name: "zi")
  z-node(3 * node-spacing, $z_(i+1)$, name: "zi1")
  z-node(4 * node-spacing, $z_k$, special: rgb("#2d862d"), name: "zk")

  // Then add dots
  content((rel: (0.7, 0), to: "z1"), $dots.c$, name: "dots1", padding: 4pt)
  content((rel: (0.7, 0), to: "zi1"), $dots.c$, name: "dots2", padding: 4pt)
  content((rel: (0.9, 0), to: "zk"), $= x$)

  // Draw arrows and labels
  let arrow-style = (end: ">", fill: black, scale: 0.8, offset: 0.1)
  line("z0", "z1", mark: arrow-style, name: "z0-z1")
  content("z0-z1.mid", $f_1(z_0)$, name: "f1", anchor: "south", padding: (bottom: 3pt))

  line("dots1.east", "zi", mark: arrow-style, name: "z1-zi")
  content("z1-zi.30%", $f_i (z_1)$, name: "fi", anchor: "south", padding: (bottom: 3pt))

  line("zi", "zi1", mark: arrow-style, name: "zi-zi1")
  content("zi-zi1.mid", $f_(i+1) (z_i)$, name: "fi1", anchor: "south", padding: (bottom: 3pt))

  line("dots2.east", "zk", mark: arrow-style, name: "zi1-zk")
  content("zi1-zk.30%", $f_k (z_(k-1))$, name: "fk", anchor: "south", padding: (bottom: 3pt))

  // Draw distributions
  draw-distro(0, y-distro, p0, name: "d0")
  content("d0.south", $z_0 ~ p_0(z_0)$, anchor: "north", padding: (top: 3pt))

  draw-distro(2 * node-spacing, y-distro, pi, name: "di")
  content("di.south", $z_i ~ p_i(z_i)$, anchor: "north", padding: (top: 3pt))

  draw-distro(4 * node-spacing, y-distro, pk, name: "dk")
  content("dk.south", $z_k ~ p_k(z_k)$, anchor: "north", padding: (top: 3pt))
})

