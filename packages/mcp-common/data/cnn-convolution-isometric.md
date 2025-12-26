---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  This diagram is a 3D isometric representation typically used in computer science and machine learning to illustrate **Convolutional Neural Network (CNN)** operations, specifically a **convolutional kernel** or **local receptive field** acting upon an input feature map.

  ### 1. Geometric Dimensions
  *   **Input Map (Main Grid):** The large gray plane consists of a **16 × 16** grid of individual cells (or pixels).
  *   **Kernel/Filter (Red Highlight):** Within the large grid, a **3 × 3** sub-grid is highlighted in red.
  *   **Output Representative (Lower Left):** A separate, isolated **3 × 3** red grid is shown at the bottom left, representing the kernel filter itself or the resulting feature map patch.

  ### 2. Technical Interpretation
  *   **Spatial Extent:** The diagram represents a 2D spatial arrangement $(H \times W)$ with a depth of 1 (single channel).
  *   **Convolution Operation:** The 3 × 3 red area on the large grid signifies the **receptive field**. In a forward pass, this kernel moves across the input map with a specific **stride** (how many cells it moves at a time) to perform element-wise multiplication and summation.
  *   **Padding:** Since the red kernel is positioned away from the edges, the diagram implies a valid convolution or an input map that has not yet accounted for zero-padding.
  *   **Perspective:** The illustration uses a **cabinet projection** or isometric viewpoint to provide a sense of volume, suggesting that these "cells" represent data values stored in a tensor.

  ### 3. Visual Components
  *   **Color Coding:**
  *   **Gray:** Inactive or "background" input data.
  *   **Red:** Active weights or the current area of focus for a mathematical operation.
  *   **Line Work:** The black wireframe defines the boundaries of discrete data points (voxels/pixels), emphasizing the quantized nature of digital image processing.
github_url: "https://github.com/yberreby/typst-snippets/blob/main/3d_tiling.typ"
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
#import "@preview/cetz:0.3.2"
#import cetz.draw: *
#import calc: *

#let draw_token_grid(
  rows: 4,
  cols: 4,
  depth_factor: 0.01,
  camera_y_offset: -200,
  cube_height: 1.0,
  cell_width: 1.0,   // For future uneven patch sizes
  cell_height: 1.0,  // For future uneven patch sizes
  colors: (           // Dictionary mapping "x,y" positions to fill colors.
    // example: "2,1": rgb(100%, 50%, 0%, 30%)
  ),
  default_fill: rgb(50%, 50%, 50%, 30%)
) = {
  // Compute base scale using camera parameters.
  let base_scale = 1.0 + depth_factor * calc.abs(camera_y_offset);

  // --- Isometric projection ---
  let iso_project(x, y, z: 0) = {
    let world_x = x * cell_width;
    let world_y = y * cell_height;
    let iso_x = (world_x - world_y) * calc.cos(30deg);
    let iso_y = (world_x + world_y) * calc.sin(30deg) - z * cube_height;
    (iso_x, iso_y)
  };

  // --- Perspective transformation ---
  let apply_perspective(x, y) = {
    let shifted_y = y - camera_y_offset;
    let scale = 1.0 / (1.0 + depth_factor * shifted_y);
    (x * scale * base_scale, shifted_y * scale * base_scale)
  };

  // Full transformation: grid → isometric → perspective.
  let transform(x, y, z: 0) = {
    let (iso_x, iso_y) = iso_project(x, y, z: z);
    apply_perspective(iso_x, iso_y)
  };

  // --- Draw top faces using the colors dict ---
  for gy in range(0, rows) {
    for gx in range(0, cols) {
      let key = str(gx) + "," + str(gy);
      let color = if key in colors { colors.at(key) } else { default_fill };
      let tl = transform(gx, gy, z: 0);
      let tr = transform(gx + 1, gy, z: 0);
      let br = transform(gx + 1, gy + 1, z: 0);
      let bl = transform(gx, gy + 1, z: 0);
      line(tl, tr, br, bl, tl, fill: color, stroke: none);
    };
  };

  // --- Draw top grid lines ---
  set-style(stroke: black + 1pt);
  // Vertical lines:
  for x in range(0, cols + 1) {
    let start = transform(x, 0, z: 0);
    let end = transform(x, rows, z: 0);
    line(start, end);
  };
  // Horizontal lines:
  for y in range(0, rows + 1) {
    let start = transform(0, y, z: 0);
    let end = transform(cols, y, z: 0);
    line(start, end);
  };

  // --- Draw vertical edges for depth ---
  // Left vertical edges (x = 0):
  for y in range(0, rows + 1) {
    let top = transform(0, y, z: 0);
    let bottom = transform(0, y, z: 1);
    line(top, bottom);
  };
  // Back vertical edges (y = 0):
  for x in range(0, cols + 1) {
    let top = transform(x, 0, z: 0);
    let bottom = transform(x, 0, z: 1);
    line(top, bottom);
  };

  // --- Draw side faces (optional) ---
  // Left side face.
  for y in range(0, rows) {
    let top_front = transform(0, y, z: 0);
    let bottom_front = transform(0, y + 1, z: 0);
    let top_back = transform(0, y, z: 1);
    let bottom_back = transform(0, y + 1, z: 1);
    line(top_front, bottom_front, bottom_back, top_back, top_front, stroke: black + 1pt);
  };
  // Back side face.
  for x in range(0, cols) {
    let left_front = transform(x, 0, z: 0);
    let right_front = transform(x + 1, 0, z: 0);
    let left_back = transform(x, 0, z: 1);
    let right_back = transform(x + 1, 0, z: 1);
    line(left_front, right_front, right_back, left_back, left_front, stroke: black + 1pt);
  };
};

//
// --- Define small grid parameters and compute crop_colors ---
//
// small_grid_info is a tuple: (center_i, center_j, small_cols, small_rows)
#let small_grid_info = (3, 5, 3, 3);
#let (center_i, center_j, small_cols, small_rows) = small_grid_info;
#let small_grid_color = rgb(100%, 0%, 0%, 100%);

// Compute offsets (assuming odd dimensions so that center_i, center_j is the center)
#let offset_x = (small_cols - 1) / 2;
#let offset_y = (small_rows - 1) / 2;
#let start_x = center_i - offset_x;
#let start_y = center_j - offset_y;

// Build the colors dictionary for the crop region (the 3x3 block around center_i, center_j).
#let crop_colors = (
  str(start_x) + "," + str(start_y): small_grid_color,
  str(start_x + 1) + "," + str(start_y): small_grid_color,
  str(start_x + 2) + "," + str(start_y): small_grid_color,
  str(start_x) + "," + str(start_y + 1): small_grid_color,
  str(start_x + 1) + "," + str(start_y + 1): small_grid_color,
  str(start_x + 2) + "," + str(start_y + 1): small_grid_color,
  str(start_x) + "," + str(start_y + 2): small_grid_color,
  str(start_x + 1) + "," + str(start_y + 2): small_grid_color,
  str(start_x + 2) + "," + str(start_y + 2): small_grid_color
);



// Autoscale output, without margins.
#set page(width: auto, height: auto, margin: 0%)

//
// --- Draw the Big Grid with highlighted crop region ---
#cetz.canvas(length: 3em, {
  draw_token_grid(
    rows: 14,
    cols: 14,
    depth_factor: 0.01,
    camera_y_offset: -40,
    cube_height: 0.5,
    colors: crop_colors,
    default_fill: rgb(50%, 50%, 50%, 30%)
  )
});

//
// --- Draw the Small Grid ("crop") ---
// The small grid uses its dimensions and a default_fill of small_grid_color.
#cetz.canvas(length: 1em, {
  draw_token_grid(
    rows: small_rows,
    cols: small_cols,
    depth_factor: 0.01,
    camera_y_offset: -40,
    cube_height: 0.5,
    colors: (),
    default_fill: small_grid_color
  )
});
```
