---
description: |
  The state of the 4 Vs of data as they apply to materials informatics: volume, velocity, variety, and veracity.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/four-vs-of-data"
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
#import "@preview/cetz-plot:0.1.3": chart
#import draw: arc, content, line

#set page(width: auto, height: auto, margin: 8pt)

#canvas({
  let radius = 3
  let arrow-radius = radius * 1.15 // Slightly larger for arrows

  // Data structure for 8 slices (4 main + 4 darker sub-slices)
  let data = (
    // Veracity (orange, top right)
    ("veracity-main", 75, "Veracity", rgb("#FFA500").lighten(80%)),
    ("veracity-sub", 15, "", rgb("#FFA500").lighten(60%)),
    // Volume (blue, top left)
    ("volume-main", 75, "Volume", rgb("#0000FF").lighten(80%)),
    ("volume-sub", 15, "", rgb("#0000FF").lighten(60%)),
    // Velocity (green, bottom left)
    ("velocity-main", 75, "Velocity", rgb("#00FF00").lighten(80%)),
    ("velocity-sub", 15, "", rgb("#00FF00").lighten(60%)),
    // Variety (yellow, bottom right)
    ("variety-main", 75, "Variety", rgb("#FFFF00").lighten(80%)),
    ("variety-sub", 15, "", rgb("#FFFF00").lighten(60%)),
  )

  // Draw main pie chart
  chart.piechart(
    data,
    value-key: 1,
    label-key: 2,
    radius: radius,
    slice-style: data.map(itm => itm.at(3)),
    stroke: .5pt,
    inner-label: (
      content: (value, label) => text(weight: "regular")[#label],
      radius: 120%,
    ),
    outer-label: (
      content: (),
    ),
    legend: (label: ()),
  )

  let arrow-style = (
    stroke: .5pt,
    mark: (end: "stealth", fill: black, offset: 5pt, scale: .75),
  )

  // Draw curved arrows using arc
  // Veracity arrow (top right, 0-90°)
  arc(
    (arrow-radius, 0),
    start: 0deg,
    stop: 90deg,
    radius: arrow-radius,
    ..arrow-style,
    name: "veracity",
  )
  content("veracity.5%", text(size: .8em)[high variance], anchor: "south-west", padding: 3pt)
  content("veracity.95%", text(size: .8em)[reference data], anchor: "south-west", padding: 3pt)

  // Volume arrow (top left, 90-180°)
  arc(
    (0, arrow-radius),
    start: 90deg,
    stop: 180deg,
    radius: arrow-radius,
    ..arrow-style,
    name: "volume",
  )
  content("volume.5%", text(size: .8em)[kilobytes], anchor: "south-east")
  content("volume.95%", text(size: .8em)[terabytes], anchor: "south-east", padding: 3pt)

  // Velocity arrow (bottom left, 180-270°)
  arc(
    (-arrow-radius, 0),
    start: 180deg,
    stop: 270deg,
    radius: arrow-radius,
    ..arrow-style,
    name: "velocity",
  )
  content("velocity.5%", text(size: .8em)[static], anchor: "east", padding: 3pt)
  content("velocity.95%", text(size: .8em)[dynamic], anchor: "north-east", padding: 3pt)

  // Variety arrow (bottom right, 270-360°)
  arc(
    (0, -arrow-radius),
    start: 270deg,
    stop: 360deg,
    radius: arrow-radius,
    ..arrow-style,
    name: "variety",
  )
  content("variety.start", text(size: .8em)[clustered], anchor: "north-west", padding: 3pt)
  content("variety.95%", text(size: .8em)[heterogeneous], anchor: "north-west", padding: 3pt)
})

