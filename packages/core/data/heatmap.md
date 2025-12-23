---
description: |
  Posted as an answer to <https://tex.stackexchange.com/q/44868>.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/heatmap"
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
#import draw: content, rect

#set page(width: auto, height: auto, margin: 3pt)

#canvas({
  let cell-size = .7 // Size of each heatmap cell
  let cell-data = (
    (74, 25, 39, 20, 3, 3, 3, 3, 3),
    (25, 53, 31, 17, 7, 7, 2, 3, 2),
    (39, 31, 37, 24, 3, 3, 3, 3, 3),
    (20, 17, 24, 37, 2, 2, 6, 5, 5),
    (3, 7, 3, 2, 12, 1, 0, 0, 0),
    (3, 7, 3, 2, 1, 36, 0, 0, 0),
    (3, 2, 3, 6, 0, 0, 45, 1, 1),
    (3, 3, 3, 5, 0, 0, 1, 23, 1),
    (3, 2, 3, 5, 0, 0, 1, 1, 78),
  )
  let row-labels = "abcdefghi".split("").slice(1)

  // Draw column labels (1-9)
  for col in range(9) {
    content(
      ((col + 1) * cell-size, 0),
      str(col + 1),
      name: "col-label-" + str(col + 1),
    )
  }

  // Draw row labels (a-i)
  for row in range(9) {
    content(
      (0, -(row + 1) * cell-size),
      row-labels.at(row),
      name: "row-label-" + row-labels.at(row),
    )
  }

  // Draw heatmap cells
  for row in range(9) {
    for col in range(9) {
      let value = cell-data.at(row).at(col)
      rect(
        ((col + 1) * cell-size - cell-size / 2, -(row + 1) * cell-size - cell-size / 2),
        ((col + 1) * cell-size + cell-size / 2, -(row + 1) * cell-size + cell-size / 2),
        fill: rgb(
          // Purple (90%, 70%, 90%) to Yellow (90%, 90%, 70%)
          90%, // Red stays constant at 90% for pastel effect
          50% + value / 78 * 20%, // Green increases with value
          50% - value / 78 * 20%, // Blue decreases with value
        ),
        name: "cell-" + str(row) + "-" + str(col),
      )
      content(
        ((col + 1) * cell-size, -(row + 1) * cell-size),
        text(fill: if value < 40 { white } else { black }, str(value)),
        name: "value-" + str(row) + "-" + str(col),
      )
    }
  }
})
```
