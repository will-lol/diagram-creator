---
description: |
  Equivalence of thermodynamic ensembles through Laplace and Legendre transforms.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/thermo-ensemble-trafos"
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
#import draw: content, line, set-style

#let horizontal_dist = 4
#let vertical_dist = 2
#set page(width: auto, height: auto, margin: 8pt)
#let mark_style = (end: "stealth", fill: black)

#canvas(length: 1cm, {
  set-style(content: (frame: "rect", stroke: none, padding: 0.2))

  content((0, 0), [$Z_m (E)$], name: "Zm")
  content((horizontal_dist, 0), [$Z_c(beta)$], name: "Zc")
  content((2 * horizontal_dist, 0), [$Z_g(mu)$], name: "Zg")

  content((0, -vertical_dist), [$sigma = frac(S_m, N)$], name: "Sm")
  content((horizontal_dist, -vertical_dist), [$f = frac(F, N)$], name: "F")
  content((2 * horizontal_dist, -vertical_dist), [$frac(Omega, V)$], name: "O")

  line("Zm", "Sm", mark: mark_style, name: "ZmSm")
  line("Zc", "F", mark: mark_style, name: "ZcF")
  line("Zg", "O", mark: mark_style, name: "ZgO")

  line("Zm", "Zc", mark: mark_style, name: "ZmZc")
  content(("Zm", 0.5, "Zc"), [Laplace in $E$], anchor: "north-west")

  line("Zc", "Zg", mark: mark_style)
  content(("Zc", 2, "Zg"), [Laplace in $N$], anchor: "north")

  line("Sm", "F", mark: mark_style)
  content(("Sm", 2, "F"), [Legendre in $epsilon = frac(E, N)$], anchor: "south")

  line("F", "O", mark: mark_style)
  content(("F", 2, "O"), [Legendre in $rho = frac(N, V)$], anchor: "south")
})

