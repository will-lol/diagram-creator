---
description: |
  A mindmap showing the main branches of physics, including Classical Mechanics, Quantum Mechanics, Relativity, Statistical Mechanics, High-Energy Physics, and Cosmology. Each branch is further divided into subcategories.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/physics-mindmap"
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
#import draw: circle, content, line, on-layer

#set page(width: auto, height: auto, margin: 8pt)
#set text(weight: "bold")

#let node(pos, txt, color: orange, black-text: false, size: 1.0) = {
  circle(pos, radius: size, fill: color, stroke: 2pt + white)
  content(pos, text(
    fill: if black-text { black } else { white },
    size: if size > 1.2 { 11pt } else if size > 1.0 { 9pt } else { 8pt },
    weight: "bold",
    align(center, txt),
  ))
}

#let connect(from, to, color) = on-layer(-1, line(from, to, stroke: 3pt + color))

#canvas({
  let center = (0, 0)
  node(center, [Physics], size: 1.5)

  for (idx, (title, color, is-black, subs)) in (
    (
      [Classical\ Mechanics],
      rgb("#FFD700"),
      true,
      (
        ([Lagrange\ Hamilton], -48deg),
        ([Chaos\ Theory], -16deg),
        ([Gases\ & Fluids], 16deg),
        ([Electro\ dynamics], 48deg),
      ),
    ),
    (
      [High-Energy],
      purple,
      false,
      (([Particle\ Physics], 30deg), ([Quantum\ Field\ Theory], 70deg), ([Nuclear\ Physics], 110deg)),
    ),
    ([Cosmology], rgb("#006400"), false, (([Astronomy], 140deg), ([Early\ Universe], 100deg))),
    (
      [Statistical\ Mechanics],
      red,
      false,
      (([Thermo\ dynamics], 140deg), ([Kinetic\ Gas\ Theory], 180deg), ([Condensed\ Matter], 220deg)),
    ),
    ([Relativity], teal, false, (([Special], 270deg), ([General], 210deg))),
    (
      [Quantum\ Mechanics],
      rgb("#00008B"),
      false,
      (([Atomic\ Physics], 250deg), ([Molecular\ Physics], 290deg), ([Chemistry], 330deg)),
    ),
  ).enumerate() {
    let pos = (calc.cos(idx * 60deg) * 3.75, calc.sin(idx * 60deg) * 3.75)
    node(pos, title, color: color, black-text: is-black, size: 1.2)
    connect(center, pos, color)
    for (sub-title, angle) in subs {
      let sub-pos = (pos.at(0) + calc.cos(angle) * 3, pos.at(1) + calc.sin(angle) * 3)
      node(sub-pos, sub-title, color: color, black-text: is-black, size: 0.8)
      connect(pos, sub-pos, color)
    }
  }
})

