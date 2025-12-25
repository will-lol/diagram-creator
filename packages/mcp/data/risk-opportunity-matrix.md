---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  The risk/opportunity matrix is a visual tool used in risk management for prioritizing actions based on the likelihood (probability) and potential impact of identified risks and opportunities.
  It typically plots probability on the Y-axis and impact on the X-axis. The matrix is divided into two mirrored halves: one for risks (negative impact) and one for opportunities (positive impact).
  Items falling into high-probability, high-impact areas (often colored red or orange) require the most urgent attention, while those in low-probability, low-impact areas (often green) require less immediate focus.
  This version is adapted from [Roland Wanner](https://rolandwanner.com/do-you-really-know-the-risk-matrix), featuring a 5x5 grid for both risks and opportunities and an "Arrow of Attention" highlighting the highest priority zones.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/risk-opportunity-matrix"
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
#import "@preview/cetz:0.4.2"
#import cetz.draw: content, line, rect

#set page(width: auto, height: auto, margin: 4mm)
#set text(0.8em)
// #set text(lang: "de")

#let en-de(en, de) = context {
  if text.lang == "de" { de } else { en }
}

#cetz.canvas(length: 1.3cm, {
  // localizable texts
  let intensities = (
    en-de[Very Low][Sehr Klein],
    en-de[Low][Klein],
    en-de[Medium][Mittel],
    en-de[High][Hoch],
    en-de[Very High][Sehr Hoch],
  )

  let probability = en-de[Probability][Eintrittswahrscheinlichkeit]
  let pos-impact = en-de[Positive Impact][Positive Auswirkung]
  let neg-impact = en-de[Negative Impact][Negative Auswirkung]

  let risks = en-de[Risks][Risiken]
  let opportunities = en-de[Opportunities][Chancen]

  let attention-arrow = en-de[Arrow of Attention][Pfeil der Aufmerksamkeit]

  let cell(x, y) = ((x, y), (x + 1, y + 1))

  // main grid of impact/probability assessments
  let (l, m, h) = (
    l: green.saturate(-50%),
    m: yellow.saturate(-50%),
    h: red.saturate(-50%),
  )
  let cells = (
    (m, m, h, h, h),
    (l, m, m, h, h),
    (l, l, m, h, h),
    (l, l, m, m, h),
    (l, l, l, l, m),
  )
  let (width, height) = (2 * cells.first().len(), cells.len())
  for (y, row) in cells.enumerate() {
    y = height - y - 1
    for (x, fill) in row.enumerate() {
      rect(..cell(x, y), fill: fill)
      rect(..cell(width - x - 1, y), fill: fill)
    }
  }

  // risk/opportunity grid labels
  let big-label(..args, label) = content(..args, {
    set text(2.4em, weight: "bold", fill: black, stroke: 0.3pt + gray)
    set align(center + horizon)
    label
  })

  big-label((2, 1.5), risks)
  big-label((width - 2, 1.5), opportunities)

  // intensity grid labels
  for (i, intensity) in intensities.enumerate() {
    let intensity = pad(4pt, align(center + horizon, intensity))
    content(..cell(-1, i), intensity)
    content(..cell(width, i), intensity)
    content(..cell(i, -1), intensity)
    content(..cell(width - i - 1, -1), intensity)
  }

  // axis labeling arrows
  let labeled-arrow(start, end, name, label, dir: ltr, align: top) = {
    assert(dir in (ltr, rtl))
    assert(align in (top, bottom))
    line(start, end, name: name, stroke: gray, mark: (end: ">", fill: gray))
    content(
      (name + ".start", 50%, name + ".end"),
      angle: if dir == ltr { name + ".end" } else { name + ".start" },
      padding: if align == top { (bottom: 0.3) } else { (top: 0.3) },
      anchor: if align == top { "south" } else { "north" },
      text(1.2em, label),
    )
  }

  let arrow-inset = 0.3
  labeled-arrow((-1, arrow-inset), (-1, height - arrow-inset), "probability1", probability, dir: ltr, align: top)
  labeled-arrow(
    (width + 1, arrow-inset),
    (width + 1, height - arrow-inset),
    "probability2",
    probability,
    dir: rtl,
    align: top,
  )

  labeled-arrow((arrow-inset, -1), (width / 2 - arrow-inset, -1), "neg-impact", neg-impact, dir: ltr, align: bottom)
  labeled-arrow(
    (width - arrow-inset, -1),
    (width / 2 + arrow-inset, -1),
    "pos-impact",
    pos-impact,
    dir: rtl,
    align: bottom,
  )

  // arrow of attention
  let cone-start = 1
  let cone-length = height - cone-start + 0.7
  line(
    (width / 2, cone-start),
    (width / 2 - cone-length, cone-start + cone-length),
    (width / 2 + cone-length, cone-start + cone-length),
    close: true,
    fill: gray.transparentize(80%),
    stroke: gray,
  )
  content((5, (5 + (cone-start + cone-length)) / 2), {
    set text(1.7em)
    set align(center + horizon)
    attention-arrow
  })
})
```
