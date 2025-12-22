---
description: |
  A simple diagram representing a scattering process in particle physics, where two incoming particles with momenta $p$ and $k$ interact and produce two outgoing particles with momenta $p'$ and $k'$. The principle of detailed balance states that at equilibrium, each scattering process is in equilibrium with its reverse process.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/scattering-detailed-balance"
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

#import "@preview/cetz:0.4.2": canvas, coordinate, draw
#import draw: circle, content, line

#set page(width: auto, height: auto, margin: 8pt)

#canvas({
  // Diagram dimensions
  let circle_radius = 0.3
  let circle_spacing = 3 // distance of circles from center
  let arrow_length = 2
  let arrow_rise = 1 // vertical displacement of arrows
  let equals_size = 24pt // font size for equals sign

  // Colors and styles
  let arrow_style = (
    mark: (start: "stealth", fill: black, scale: 0.5),
    stroke: (thickness: 1.1pt),
  )

  // Draw equals sign at center
  content((0, 0), text(size: equals_size)[=])

  // Draw circles on either side
  circle((-circle_spacing, 0), radius: circle_radius, fill: gray.lighten(50%), stroke: gray, name: "left-circle")
  circle((circle_spacing, 0), radius: circle_radius, fill: gray.lighten(50%), stroke: gray, name: "right-circle")

  // Left node arrows and labels
  line((rel: (arrow_length, arrow_rise), to: "left-circle"), "left-circle", ..arrow_style, name: "left-ne")
  content("left-ne.start", $p'$, anchor: "west")

  line((rel: (arrow_length, -arrow_rise), to: "left-circle"), "left-circle", ..arrow_style, name: "left-se")
  content("left-se.start", $k'$, anchor: "west")

  line("left-circle", (rel: (-arrow_length, arrow_rise), to: "left-circle"), ..arrow_style, name: "left-nw")
  content("left-nw.end", $p$, anchor: "east")

  line("left-circle", (rel: (-arrow_length, -arrow_rise), to: "left-circle"), ..arrow_style, name: "left-sw")
  content("left-sw.end", $k$, anchor: "east")

  // Right node arrows and labels
  line((rel: (arrow_length, arrow_rise), to: "right-circle"), "right-circle", ..arrow_style, name: "right-ne")
  content("right-ne.start", $p$, anchor: "west")

  line((rel: (arrow_length, -arrow_rise), to: "right-circle"), "right-circle", ..arrow_style, name: "right-se")
  content("right-se.start", $k$, anchor: "west")

  line("right-circle", (rel: (-arrow_length, arrow_rise), to: "right-circle"), ..arrow_style, name: "right-nw")
  content("right-nw.end", $p'$, anchor: "east")

  line("right-circle", (rel: (-arrow_length, -arrow_rise), to: "right-circle"), ..arrow_style, name: "right-sw")
  content("right-sw.end", $k'$, anchor: "east")
})

