---
description: |
  Visualization of renormalization group (RG) flow trajectories in the theory space
  of all possible coupling constants (λ₁, λ₂, λ₃, λ₄) allowed by symmetries. The
  diagram shows how different microscopic actions (S₁, S₂, S₃) obey the same symmetries and thus flow to the same
  quantum effective action (Γ) through different paths, each corresponding to a
  different choice of infrared regulator R_k(q). This illustrates the universality
  of the effective action despite different starting points and regulators.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/rg-flow-in-theory-space"
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
#import draw: circle, content, hobby, line

#set page(width: auto, height: auto, margin: 8pt)

#let unit = 5

#canvas({
  let arrow-style = (mark: (end: "stealth", fill: black, scale: 0.5))

  // Define coordinates
  let qea = (-0.225 * unit, -5 / 12 * unit) // quantum effective action
  let ma1 = (0.4 * unit, 0.5 * unit) // microscopic action 1
  let ma2 = (0.6 * unit, 0.33 * unit) // microscopic action 2
  let ma3 = (unit, 0.5 * unit) // microscopic action 3
  let r1 = (0.17 * unit, 0.25 * unit) // regulator 1
  let r2 = (0.4 * unit, 0.1 * unit) // regulator 2
  let r3 = (0.5 * unit, -0.2 * unit) // regulator 3

  // Draw coordinate system
  line((0, 0), (0, 0.67 * unit), ..arrow-style, name: "lambda_1")
  content("lambda_1.end", $lambda_1$, anchor: "south")

  line((0, 0), (-0.5 * unit, -0.5 * unit), ..arrow-style, name: "lambda_2")
  content("lambda_2.end", $lambda_2$, anchor: "north-east")

  line((0, 0), (0.14 * unit, -0.67 * unit), ..arrow-style, name: "lambda_3")
  content("lambda_3.end", $lambda_3$, anchor: "north")

  line((0, 0), (0.83 * unit, -0.5 * unit), ..arrow-style, name: "lambda_4")
  content("lambda_4.end", $lambda_4$, anchor: "north-west")

  line((0, 0), (unit, 0), ..arrow-style)

  // Draw dotted line segment
  hobby((0.75 * unit, -0.3 * unit), (0.82 * unit, -0.2 * unit), (0.83 * unit, -0.1 * unit), stroke: (
    dash: "loosely-dotted",
    thickness: 1.5pt,
  ))

  // Draw flow trajectories using hobby curves
  hobby(ma1, r1, (0, -.8), qea, stroke: (dash: "dashed"))
  content(r1, $R_1$, anchor: "north-west")

  hobby(ma2, r2, (0, -1.7), qea, stroke: (dash: "dashed"))
  content(r2, $R_2$, anchor: "north-west")

  hobby(ma3, r3, qea, stroke: (dash: "dashed"))
  content(r3, $R_3$, anchor: "north-west")

  // Draw points and labels
  let dark-red = rgb("8B0000")
  circle(qea, radius: 0.1, fill: dark-red, stroke: none)
  content((rel: (0, -0.2), to: qea), text(fill: dark-red)[$Gamma_(k=0) = Gamma$], anchor: "north")

  let dark-blue = rgb("00008B")
  circle(ma1, radius: 0.1, fill: dark-blue, stroke: none)
  content((rel: (0, 0.2), to: ma1), text(fill: dark-blue)[$Gamma_(k=Lambda_1) = S_1$], anchor: "south")

  circle(ma2, radius: 0.1, fill: dark-blue, stroke: none)
  content((rel: (0, 0.2), to: ma2), text(fill: dark-blue)[$Gamma_(k=Lambda_2) = S_2$], anchor: "south")

  circle(ma3, radius: 0.1, fill: dark-blue, stroke: none)
  content((rel: (0, 0.2), to: ma3), text(fill: dark-blue)[$Gamma_(k=Lambda_3) = S_3$], anchor: "south")
})

