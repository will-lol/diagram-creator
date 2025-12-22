---
description: |
  A Sierpiński triangle is a fractal with the overall shape of an equilateral triangle, subdivided recursively into smaller equilateral triangles. The diagram shows a fifth-order Sierpiński triangle, which was experimentally realized out of Fe/C3PC molecules on a reconstructed Au(100)-(hex) in [10.1021/jacs.7b05720](https://doi.org/10.1021/jacs.7b05720).
  
  The visualization shows a yellow Sierpiński triangle (representing Fe/C3PC molecules) with a gold border (representing BPyB molecules) on a background of red dots arranged in a hexagonal close-packed pattern (representing the Au(100) substrate atoms). Previous molecular Sierpiński triangle fractals were limited to fourth-order due to kinetic growth constraints.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/sierpinski-triangle"
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

#import "@preview/fractusist:0.3.0": lsystem, lsystem-use

#set page(width: auto, height: auto, margin: 0pt)
#set text(fill: white, size: 6pt)

// Sierpiński triangle with Au(100) surface background
#box({
  let triangle_size = 128pt
  let margin = 12pt
  let canvas_width = triangle_size + 2 * margin
  let canvas_height = triangle_size * calc.pow(3, 0.5) / 2 + 2 * margin

  rect(
    width: canvas_width,
    height: canvas_height,
    fill: rgb(50, 50, 50),
    {
      // Gold atoms in hexagonal close-packed arrangement
      let horizontal_spacing = 2.5pt
      let vertical_spacing = 2.2pt
      let dot_radius = 1pt
      let rows = int(canvas_height / vertical_spacing)
      let cols = int(canvas_width / horizontal_spacing)

      for y in range(-3, rows + 3) {
        let offset = if calc.odd(y) { horizontal_spacing / 2 } else { 0pt }

        for x in range(-3, cols + 3) {
          place(
            dx: x * horizontal_spacing + offset,
            dy: y * vertical_spacing,
            circle(
              radius: dot_radius,
              fill: rgb(200, 50, 50),
              stroke: none,
            ),
          )
        }
      }

      // Sierpiński triangle
      place(
        dx: margin / 2,
        dy: margin / 2,
        {
          lsystem(
            ..lsystem-use("Sierpinski Triangle"),
            order: 5,
            step-size: 4,
            start-angle: 1,
            fill: rgb(255, 230, 100),
            stroke: 0.5pt + rgb(200, 140, 0),
          )
        },
      )

      // 10nm scale bar
      let scale_bar_width = horizontal_spacing * 8
      let (scale_bar_height, scale_bar_margin) = (2pt, 12pt)

      place(
        dx: canvas_width - scale_bar_width - scale_bar_margin,
        dy: scale_bar_margin / 5,
        rect(width: scale_bar_width, height: scale_bar_height, fill: white),
      )

      place(
        dx: canvas_width - scale_bar_width - scale_bar_margin + scale_bar_width / 2 - 7pt,
        dy: scale_bar_margin / 5 + scale_bar_height + 2pt,
        [10 nm],
      )

      // Legend
      let color_square_size = 4pt

      place(
        block(
          inset: (x: 3pt, y: 2pt),
          radius: 2pt,
          fill: rgb(30, 30, 30),
          {
            grid(
              columns: (color_square_size, auto),
              column-gutter: 2.5pt,
              row-gutter: 3pt,
              rect(width: color_square_size, height: color_square_size, fill: rgb(200, 50, 50), radius: 1pt), [Au(100)],
              rect(width: color_square_size, height: color_square_size, fill: rgb(255, 230, 100), radius: 1pt),
              [Fe/C3PC],

              rect(width: color_square_size, height: color_square_size, fill: rgb(200, 140, 0), radius: 1pt), [BPyB],
            )
          },
        ),
      )
    },
  )
})

