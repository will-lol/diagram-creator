---
description: A circle
attribution: https://github.com/will-lol/.dotfiles
---
```typ
#import "@preview/cetz:0.3.1"

#cetz.canvas({
  import cetz.draw: *

  // circle((x, y), radius: r)
  circle((0, 0), radius: 1, stroke: 1pt + black, fill: blue.lighten(80%))

  // Optional: Add a center point
  content((0,0), [$\cdot$])
})
```
