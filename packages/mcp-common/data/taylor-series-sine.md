---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  This image is a two-dimensional Cartesian plot illustrating the approximation of the trigonometric function **$\sin x$** using various partial sums of its **Taylor series** (specifically, Maclaurin polynomials).

  ### Co-ordinate System and Scale
  *   **Horizontal Axis (x):** Represented in radians, ranging approximately from $-\pi$ to $\pi$ (roughly $-3.14$ to $3.14$). Major tick marks are labeled at $-\pi, -\frac{1}{2}\pi, 0, \frac{1}{2}\pi$, and $\pi$.
  *   **Vertical Axis (y):** Ranges from roughly $-2.5$ to $2.5$, with major tick marks at intervals of $2$ units.
  *   **Plotting Style:** The graph uses a "filled area" approach (often called a ribbon or shade plot) to visualize the difference (error) between the actual function and its polynomial approximations.

  ### Mathematical Content
  The diagram compares the target function, $\sin x$, against three Taylor polynomial approximations of increasing order:

  1.  **The Base Function (Solid Black Line):**
  *   $f(x) = \sin x$.
  *   This is the reference curve characterized by a period of $2\pi$ and an amplitude of $1$, passing through the origin.

  2.  **3rd Degree Polynomial (Blue Shaded Area):**
  *   $P_3(x) = x - \frac{x^3}{3!}$
  *   The blue area represents the region between $\sin x$ and this cubic approximation. It shows excellent agreement near $x=0$ but diverges significantly as $|x|$ approaches $\pi$.

  3.  **5th Degree Polynomial (Red Shaded Area):**
  *   $P_5(x) = x - \frac{x^3}{3!} + \frac{x^5}{5!}$
  *   Note: The legend in the image contains a typo, showing a minus sign for the $x^5$ term ($x - x^3/3! - x^5/5!$), though the visual plot correctly maps the alternating series. The red shading indicates a much tighter fit to the sine wave over a wider interval (roughly from $-\frac{1}{2}\pi$ to $\frac{1}{2}\pi$) before diverging.

  4.  **7th Degree Polynomial (Green Shaded Area):**
  *   $P_7(x) = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!}$
  *   Note: Like the 5th-degree term, the legend displays minus signs for all previous terms incorrectly. However, the green area shows the highest level of accuracy, staying very close to the black $\sin x$ line across almost the entire visible domain $[-\pi, \pi]$.

  ### Technical Purpose
  The diagram serves as a visual proof of **Taylor's Theorem**. It demonstrates that as the degree of the polynomial increases, the approximation becomes more accurate over a larger interval around the expansion point ($x=0$), and the residual error (represented by the shaded colored areas) decreases.
github_url: "https://github.com/sitandr/typst-examples-book/blob/74ea71e59da16cf19b8ae446ee37bea1b4fd521d/src/packages/index.md?plain=1#L16"
author: "https://github.com/sitandr"
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
#import "@preview/cetz:0.3.4": canvas, draw
#import "@preview/cetz-plot:0.1.1": plot

#set page(width: auto, height: auto, margin: .5cm)

#let style = (stroke: black, fill: rgb(0, 0, 200, 75))

#let f1(x) = calc.sin(x)
#let fn = (
  ($ x - x^3"/"3! $, x => x - calc.pow(x, 3)/6),
  ($ x - x^3"/"3! - x^5"/"5! $, x => x - calc.pow(x, 3)/6 + calc.pow(x, 5)/120),
  ($ x - x^3"/"3! - x^5"/"5! - x^7"/"7! $, x => x - calc.pow(x, 3)/6 + calc.pow(x, 5)/120 - calc.pow(x, 7)/5040),
)

#set text(size: 10pt)

#canvas({
  import draw: *

  // Set-up a thin axis style
  set-style(axes: (stroke: .5pt, tick: (stroke: .5pt)),
            legend: (stroke: none, orientation: ttb, item: (spacing: .3), scale: 80%))

  plot.plot(size: (12, 8),
    x-tick-step: calc.pi/2,
    x-format: plot.formats.multiple-of,
    y-tick-step: 2, y-min: -2.5, y-max: 2.5,
    legend: "inner-north",
    {
      let domain = (-1.1 * calc.pi, +1.1 * calc.pi)

      for ((title, f)) in fn {
        plot.add-fill-between(f, f1, domain: domain,
          style: (stroke: none), label: title)
      }
      plot.add(f1, domain: domain, label: $ sin x  $,
        style: (stroke: black))
    })
})
```
