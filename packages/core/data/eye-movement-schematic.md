---
description: |
  A schematic diagram illustrates the localization of a visual target relative to eye movement in a two-dimensional Cartesian coordinate system.
  
  The horizontal axis (x-axis) and vertical axis (y-axis) intersect at the origin $(0, 0)$. An eye movement, designated as a "Rightward saccade," is represented as taking place along the x-axis starting at time $t = 0 \text{ ms}$.
  - The starting position of the saccade is indicated by a white circle labeled "**S**" at $(0, 0)$.
  - The ending position is indicated by a white circle labeled "**E**" at $(8, 0)$.
  - A bold arrow pointing from left to right along the x-axis reinforces the direction of movement.
  
  At the top of the diagram, a visual stimulus is represented by a set of sun-like icons positioned along the horizontal line $y = 10$.
  - The "**True position**" of the stimulus is marked by a solid orange icon at coordinates $(0, 10)$, directly above the saccade starting point.
  - Two semi-transparent icons represent errors in perception relative to the timing of the eye movement:
      - "**Perceived backward**": located to the left of the true position at $(-3.5, 10)$.
      - "**Perceived forward**": located to the right of the true position at $(3.5, 10)$.
  
  This technical illustration likely describes a perisaccadic mislocalization experiment, showing how the perceived location of a brief stimulus is shifted (either compressed or translated) depending on its onset time relative to the initiation of a rapid eye movement.
github_url: "https://github.com/yberreby/typst-snippets/blob/main/pbm.typ"
author: "https://github.com/yberreby"
license: |
  MIT License
  
  Copyright (c) 2025 Yohaï-Eliel Berreby
  
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
// This file builds a SVG/PDF diagram, no other text.
// Intended to be embedded.
// Not the best code, but does the job.
// Invoke as:
// `typst compile img/task_diagram.typ -f svg --input saccade_amplitude=8`

#import "@preview/cetz:0.3.2"
#import cetz.draw: *
#import calc: *

// General layout parameters.
#set page(width: auto, height: auto, margin: 0cm, fill: white)
#set text(size: 16pt)

// Can be specified via CLI.
#let sac_end_x = float(sys.inputs.at("saccade_amplitude", default: 8))

// For text annotations next to a visual element.
#let label_offset_xy = (x: 1.5, y: 1.25);
#let annotation_size = 14pt

#let annotate_location(loc) = {
  content(
    (loc.x + label_offset_xy.x, loc.y + label_offset_xy.y),
    text(size: annotation_size, [(#loc.x, #loc.y)])
  );
}


#let draw-flash-marker(pos, alpha: 100%) = {
  let circle-radius = 0.35;
  let ray-length = 0.5;
  let num-rays = 10;

  // Orange with some transparency as needed
  let color = oklab(79.08%, 0.1567, 64.63%, alpha)
  circle(pos, radius: circle-radius, stroke: 0.4pt + color, fill: color);
  for i in range(0, num-rays) {
    let angle = i * 360deg / num-rays;
    let start = (
      pos.x + circle-radius * calc.cos(angle),
      pos.y + circle-radius * calc.sin(angle)
    );
    let end = (
      pos.x + (circle-radius + ray-length) * calc.cos(angle),
      pos.y + (circle-radius + ray-length) * calc.sin(angle)
    );
    line(start, end, stroke: 1pt + color);
  }
};



#let draw_real_flash(pos) = draw-flash-marker(pos, alpha: 100%)
#let draw_ghost_flash(pos) = draw-flash-marker(pos, alpha: 50%)

#let fixation(content, ..extra) = text(
  size: 20pt,
  weight: "bold",
  font: "DejaVu Sans",
  ..extra,
  content
)


// Autoscale output, without margins.
#set page(width: auto, height: auto, margin: 0%)

#cetz.canvas(
length: 0.75cm,
  {
  import cetz.draw: *

  let start_content = fixation("S")
  let end_content = fixation("E", fill: rgb("#008000"))

  let main_arrow_thickness = 4pt;
  let sac_start = (x: 0, y: 0);
  let sac_end   = (x: sac_end_x, y: 0);

  let max_x = sac_end_x + 3
  let max_y = 13.5

  set-style(
    mark: (fill: black, scale: 2),
    stroke: (thickness: 0.4pt, cap: "round")
  );

  // Draw x, y axes, with arrows at the end, and x/y labels
  let axis_overflow = 2
  line((-axis_overflow, 0), (max_x, 0), mark: (end: "stealth"), stroke: 1.5pt);
  content((max_x - 0.5, -0.8), $x$);
  line((0, -axis_overflow), (0, max_y), mark: (end: "stealth"), stroke: 1.5pt);
  content((0.8, max_y - 0.5), $y$);

  // Draw start and end fixations.
  // Both are a single big letter within a circle, with coordinate annotations
  let draw_fixation(loc, inner) = {
      circle(loc, fill: white, radius: 1);
      content(loc, inner);
      annotate_location(loc);

  }
  draw_fixation(sac_start, start_content)
  draw_fixation(sac_end, end_content)


  // Draw the fat saccade arrow.
  let draw_fat_arrow(start, end) = {
    line(
      start,
      end,
      mark: (end: "stealth"),
      stroke: (thickness: main_arrow_thickness)
    );
  }
  draw_fat_arrow(
    (x: 1.1, y: - 1),
    (x: sac_end_x - 1.1, y: - 1)
  )

  // Annotate that arrow
  content(
    (
      // Centered
      sac_end_x / 2,
      //  under the arrow
      -3
    ),
    align(center)[Rightward saccade \ at $t = 0$ ms]
  )


  // Draw the flashes
  let real_flash_pos = (x: 0, y: 10);
  let max_misloc = 3.5
  let forward_flash_pos = (x: max_misloc, y: real_flash_pos.y)
  let backward_flash_pos = (x: -max_misloc, y: real_flash_pos.y)

  let box_annot(body, loc) = {
    content(
      (loc.x, loc.y - 2),
      box(
        align(
          center + horizon,
          text(
            body,
          )
        ),
        fill: white,
        //stroke: black,
        radius: 2pt,
        inset: 3pt
      )
    )
  }

  // Real flash
  draw_real_flash(real_flash_pos)
  annotate_location(real_flash_pos)
  box_annot([True \ position], real_flash_pos)


  // Forward ghost
  draw_ghost_flash(forward_flash_pos)
  annotate_location(forward_flash_pos)
  box_annot([Perceived \ forward], forward_flash_pos)

  // Backward ghost
  draw_ghost_flash(backward_flash_pos)
  annotate_location(backward_flash_pos)
  box_annot([Perceived \ backward], backward_flash_pos)
})
```
