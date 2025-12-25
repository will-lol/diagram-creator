---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  Diagram of Potential Triangle.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/potential-triangle"
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
#import draw: circle, content, line

#set page(width: auto, height: auto, margin: 8pt)
#set text(size: 10pt)

#canvas({
  let node_radius = 0.8
  let colors = (
    "enthalpy": rgb("#FFA500"),
    "free-energy": rgb("#008080"),
    "entropy": rgb("#00008B").darken(40%),
  )

  for (name, label, pos) in (
    ("enthalpy", [$H$\ Enthalpy], (2, 0)),
    ("free-energy", [$G$\ Free\ Energy], (-2, 0)),
    ("entropy", [$S$\ Entropy], (0, -3)),
  ) {
    let fill = colors.at(name)
    circle(pos, radius: node_radius, fill: fill, name: name, stroke: none)
    content(pos, align(center, text(fill: white, label)))
  }

  for (start, end, name, dir) in (
    ("enthalpy", "free-energy", "h-g", rtl),
    ("entropy", "enthalpy", "s-h", btt),
    ("free-energy", "entropy", "g-s", ltr),
  ) {
    let stroke = 3pt + gradient.linear(dir: dir, colors.at(start), colors.at(end))
    line(start, end, stroke: stroke, name: name)
  }

  for (name, label, anchor) in (
    ("h-g", [reactivity], "south"),
    ("s-h", [heat], "west"),
    ("g-s", [disorder], "east"),
  ) {
    content(name, align(center, label), anchor: anchor, padding: 4pt)
  }
})
```
