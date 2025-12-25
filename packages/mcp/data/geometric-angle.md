---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  This diagram illustrates a geometric representation of an angle and its counter-clockwise rotation relative to a standard coordinate system.
  
  ### Geometric Components:
  *   **Vertex and Rays:** There are two rays originating from a single common vertex. One ray is horizontal, extending to the right (positioned on the positive x-axis). The other ray is oriented diagonally toward the upper-left quadrant (the second quadrant).
  *   **Obtuse Angle ($\alpha$):** A blue arc with a counter-clockwise arrow indicates the interior angle between the two rays, labeled with the Greek letter alpha ($\alpha$). Based on the geometry, $\alpha = 135^\circ$ (since $360^\circ - 225^\circ = 135^\circ$).
  *   **Reflex Angle ($225^\circ$):** A red arc with a counter-clockwise arrow indicates the exterior or "reflex" angle, explicitly labeled as $225^\circ$. This represents a rotation starting from the positive x-axis, passing through the third quadrant, and ending at the diagonal ray.
  
  ### Mathematical Context:
  *   **Explementary Angles:** The two angles are explementary (or conjugate), meaning their sum is exactly $360^\circ$ (a full rotation).
  *   **Standard Position:** The horizontal ray represents the initial side, while the diagonal ray represents the terminal side. 
  *   **Trigonometric Relationship:** The terminal side lies at $135^\circ$ or $\frac{3\pi}{4}$ radians in standard position. The $225^\circ$ measurement indicates a negative rotation of $-225^\circ$ from the terminal side to the initial side, or a positive rotation starting from the $135^\circ$ mark to complete the circle.
github_url: "https://github.com/partrita/typst-examples-book/blob/51d1f35456c54ba79964e175f4b1d5660c926973/src/packages/drawing.md?plain=1#L9"
author: "https://github.com/partrita"
license: |
  MIT License
  
  Copyright (c) 2023 sitandr
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
---

```typ
#import "@preview/cetz:0.3.4"

#cetz.canvas(length: 1cm, {
  import cetz.draw: *
  import cetz.angle: angle
  let (a, b, c) = ((0,0), (-1,1), (1.5,0))
  line(a, b)
  line(a, c)
  set-style(angle: (radius: 1, label-radius: .5), stroke: blue)
  angle(a, c, b, label: $alpha$, mark: (end: ">"), stroke: blue)
  set-style(stroke: red)
  angle(a, b, c, label: n => $#{n/1deg} degree$,
    mark: (end: ">"), stroke: red, inner: false)
})
```
