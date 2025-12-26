---
# yaml-language-server: $schema=../frontmatter.schema.json
description: |
  The Receiver Operating Characteristic (ROC) curve is a widely used evaluation tool in statistics that plots the True Positive Rate (Sensitivity) against the False Positive Rate (1-Specificity) at various classification thresholds.

  This visualization compares classifiers of different performance levels, from near-perfect (AUC = 0.99) to poor (AUC = 0.65), with a random classifier (AUC = 0.5) as baseline. The Area Under the Curve (AUC) serves as a threshold-independent measure of classifier performance, with values closer to 1.0 indicating better discrimination ability.

  ROC curves are particularly valuable in domains requiring careful trade-off between sensitivity and specificity, such as medical diagnostics (balancing false negatives vs. false positives), fraud detection (minimizing false alerts while catching true fraud), and information retrieval (evaluating ranking algorithms). They provide insights into model behavior across all possible decision thresholds, allowing practitioners to select operating points that best align with application requirements and costs of different types of errors.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/roc-curve"
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
#import "@preview/cetz-plot:0.1.3": plot

#set page(width: auto, height: auto, margin: 8pt)

// ROC curve functions for different classifiers
#let perfect_classifier(x) = {
  if x == 0 { return 0 }
  if x == 1 { return 1 }
  if x > 0 { return 0.99 }
  return 0
}

#let excellent_classifier(x) = {
  if x <= 0 { return 0 }
  if x >= 1 { return 1 }
  return calc.pow(x, 0.15)
}

#let good_classifier(x) = {
  if x <= 0 { return 0 }
  if x >= 1 { return 1 }
  return calc.pow(x, 0.3)
}

#let fair_classifier(x) = {
  if x <= 0 { return 0 }
  if x >= 1 { return 1 }
  return calc.pow(x, 0.6)
}

#let poor_classifier(x) = {
  if x <= 0 { return 0 }
  if x >= 1 { return 1 }
  return 0.2 * x + 0.8 * x * x
}

#let random_classifier(x) = x

#canvas({
  let mark = (end: "stealth", fill: black, scale: 0.7)
  draw.set-style(axes: (
    y: (label: (anchor: "south-east", offset: 1.2, angle: 90deg), mark: mark),
    x: (label: (anchor: "south-east", offset: 1.2), mark: mark),
  ))

  plot.plot(
    size: (8, 8),
    x-label: "False Positive Rate (1-Specificity)",
    y-label: "True Positive Rate (Sensitivity)",
    x-min: 0,
    x-max: 1,
    y-min: 0,
    y-max: 1,
    x-tick-step: 0.25,
    y-tick-step: 0.25,
    x-grid: true,
    y-grid: true,
    axis-style: "left",
    legend: "inner-north",
    legend-style: (item: (spacing: 0.15), padding: 0.15, stroke: none, offset: (7.8, 0.3)),
    {
      plot.add(
        style: (stroke: gray),
        domain: (0, 1),
        samples: 2,
        random_classifier,
        label: "Random Guess (AUC = 0.5)",
      )

      plot.add(
        style: (stroke: green),
        domain: (0, 1),
        samples: 50,
        perfect_classifier,
        label: "Near-Perfect Classifier (AUC = 0.99)",
      )

      plot.add(
        style: (stroke: blue),
        domain: (0, 1),
        samples: 100,
        excellent_classifier,
        label: "Excellent Classifier (AUC = 0.93)",
      )

      plot.add(
        style: (stroke: purple),
        domain: (0, 1),
        samples: 100,
        good_classifier,
        label: "Good Classifier (AUC = 0.85)",
      )

      plot.add(
        style: (stroke: orange),
        domain: (0, 1),
        samples: 100,
        fair_classifier,
        label: "Fair Classifier (AUC = 0.73)",
      )

      plot.add(
        style: (stroke: red),
        domain: (0, 1),
        samples: 100,
        poor_classifier,
        label: "Poor Classifier (AUC = 0.65)",
      )
    },
  )
})
```
