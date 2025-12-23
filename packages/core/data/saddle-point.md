---
description: |
  This graph depicts a saddle point in three-dimensional space, which is a point in the domain of a function that is a local minimum in one direction and a local maximum in another. The depicted function $F(T, V)$ is quadratic in $T$ and $V$, and the graph shows the convex and concave nature of the function along different axes.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/saddle-point"
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
#import "@preview/plotsy-3d:0.2.1": plot-3d-surface

#set page(width: auto, height: auto)

#let saddle_func(x, y) = x * x - y * y

// Define a color function for the surface
#let color_func(x, y, z, x_lo, x_hi, y_lo, y_hi, z_lo, z_hi) = {
  return rgb("#00008B").transparentize(50%)
}

// Define domain and scaling
#let domain_size = 2
#let scale_factor = 0.2
#let (x_scale, y_scale, z_scale) = (0.5, 0.3, 0.15)
#let scale_dim = (x_scale * scale_factor, y_scale * scale_factor, z_scale * scale_factor)

// Plot the 3D surface
#plot-3d-surface(
  saddle_func,
  color-func: color_func,
  subdivisions: 8,
  xdomain: (-domain_size, domain_size),
  ydomain: (-domain_size, domain_size),
  // axis-labels: ($V$, $T$, $F(T,V)$), // Compiler error: Unexpected argument
  // axis-step: (1, 1, 2), // Adjust axis steps if needed
  // axis-label-size: 1.2em, // Adjust label size if needed
  // rotation-matrix: ((-2, 2, 4), (0, -1, 0)), // Optional: Adjust view angle
)
```
