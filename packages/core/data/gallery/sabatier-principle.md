---
description: |
  Illustration of the Sabatier principle in heterogeneous catalysis. Inspired by [From the Sabatier principle to a predictive theory of transition-metal heterogeneous catalysis](https://www.sciencedirect.com/science/article/pii/S0021951714003686).
github_url: "https://github.com/janosh/diagrams/tree/main/assets/sabatier-principle"
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
#import draw: circle, content, hobby, line, rect

#set page(width: auto, height: auto, margin: 8pt)

#canvas({
  // Draw background rectangles
  rect(
    (0, 0),
    (4.5, 4),
    fill: rgb(200, 220, 255), // blue!20
    stroke: none,
  )
  rect(
    (4.5, 0),
    (8, 4),
    fill: rgb(255, 230, 200), // orange!20
    stroke: none,
  )

  // Draw axes
  let arrow-style = (mark: (end: "stealth", fill: black, scale: 0.7))
  let axis-overshoot = -0.75
  line((axis-overshoot, 0), (8, 0), ..arrow-style, name: "x-axis") // x-axis
  line((0, axis-overshoot), (0, 5), ..arrow-style, name: "y-axis") // y-axis

  // Add axis labels
  content((rel: (-axis-overshoot, -0.2), to: "x-axis.6%"), "weak", anchor: "north")
  content((rel: (-axis-overshoot, -0.25), to: "x-axis.50%"), text(weight: "bold")[bond strength], anchor: "north")
  content((rel: (0, -0.2), to: "x-axis.95%"), "strong", anchor: "north")
  content((rel: (0.1, 0), to: "y-axis.95%"), text(weight: "bold")[reaction rate], anchor: "west")

  // Add region labels
  content((2.5, 1), [limited by\ desorption\ of product])
  content((6, 1), [limited by\ activation\ of reactant])

  // Draw Sabatier optimum label
  let ellipse-center = (4.5, 4.2)
  let ellipse-width = 1.2
  let ellipse-height = ellipse-width / 2

  // Draw ellipse background
  circle(
    ellipse-center,
    radius: (ellipse-width, ellipse-height),
    fill: teal,
    stroke: none,
  )

  // Draw volcano curve using hobby spline
  hobby(
    (0, 1),
    (2, 2.6),
    (4.5, 3.7),
    (6, 2.8),
    (8, 1),
    stroke: 1.2pt,
    omega: 1,
  )
  // Add label
  content(
    ellipse-center,
    align(center)[Sabatier\ optimum],
    padding: 2pt,
  )
})

