---
description: |
  This diagram illustrates the Kohn-Sham cycle in Density Functional Theory (DFT), a computational quantum mechanical modeling method. The process starts with an initial guess for the electron density, which is used to calculate the effective potential. This potential is then used in the Kohn-Sham Hamiltonian, which is solved to obtain the wavefunctions. These wavefunctions are used to compute a new electron density. If convergence criteria are met, the final electron density is used to calculate the total energy functional. If not, the new electron density is used for the next iteration of the cycle.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/kohn-sham-cycle"
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
#import draw: content, line, on-layer, rect

#set page(width: auto, height: auto, margin: 8pt)

#canvas({
  // Draw dashed enclosure
  rect(
    (-4, -6),
    (4, 3.25),
    frame: "rect",
    stroke: (dash: "dashed"),
    fill: none,
    width: 22em,
    height: 12em,
    name: "enclosure",
    radius: 5pt,
  )

  // Enclosure label
  on-layer(1, content(
    "enclosure.north",
    text(weight: "bold", size: 1.2em)[Kohn-Sham method],
    frame: "rect",
    stroke: .5pt,
    fill: white,
    padding: 3pt,
  ))

  let box-style = (
    frame: "rect",
    stroke: .5pt,
    fill: rgb("#DCDCDC"),
    padding: 8pt,
    width: 15em,
  )

  let arrow-style = (
    mark: (end: "stealth", fill: black, scale: .5),
    stroke: 1pt,
  )

  // Initial density box
  content(
    (rel: (0, 1.25), to: "enclosure.north"),
    [Supply initial density guess\ $rho_"init" (arrow(r))$ to Kohn Sham equations],
    ..box-style,
    fill: rgb("#c6aa0c").lighten(60%),
    width: 20em,
    name: "initial",
    padding: (3pt, 2em, 0),
    radius: 1em,
  )

  // Potential box
  content(
    (rel: (0, -2), to: "initial.south"),
    [$v_("ext,s") (arrow(r))=v_H (arrow(r)) + v_"xc" (arrow(r)) + v_"ext" (arrow(r))$],
    ..box-style,
    name: "potential",
  )

  // Hamiltonian box
  content(
    (rel: (0, -1.25), to: "potential.south"),
    [$hat(H)_"KS"=-frac(planck^2, 2m)arrow(nabla)^2 + v_("ext,s") (arrow(r))$],
    ..box-style,
    name: "hamiltonian",
  )

  // Schrödinger equation box
  content(
    (rel: (0, -1.25), to: "hamiltonian.south"),
    [$hat(H)_"KS" phi_i (arrow(r))= E_i phi_i (arrow(r))$],
    ..box-style,
    name: "schrodinger-eq",
  )

  // Density box
  content(
    (rel: (0, -1.25), to: "schrodinger-eq.south"),
    [$rho (arrow(r))=sum_(i=1)^n f_i |phi_i (arrow(r_i))|^2$],
    ..box-style,
    name: "density",
  )

  // Convergence criterion box
  content(
    (rel: (0, -1.25), to: "density.south"),
    [Convergence criterion satisfied?],
    ..box-style,
    name: "criterion",
  )

  // Final energy box
  content(
    (0, -7.5),
    [Use $rho_"final" (arrow(r))$ to minimize total energy functional\
      $E_(V_"ext")[rho] = T_(e,s)[phi_i {rho}] + V_(e e,H) [rho] + E_"xc" [rho] + V_"eI" [rho]$],
    ..box-style,
    fill: rgb("#54aef8").lighten(30%),
    width: 20em,
    name: "energy",
    padding: (4pt, 2em, 1pt),
  )

  // Draw connecting arrows
  line("initial", "potential", ..arrow-style)
  line("potential", "hamiltonian", ..arrow-style)
  line("hamiltonian", "schrodinger-eq", ..arrow-style)
  line("schrodinger-eq", "density", ..arrow-style)
  line("density", "criterion", ..arrow-style)
  line("criterion", "energy", ..arrow-style, name: "converged-yes")

  // Yes/No labels
  content((rel: (0.1, 0), to: "converged-yes.60%"), [Yes], frame: "rect", stroke: none, anchor: "west", padding: (
    3pt,
    2pt,
  ))

  // No feedback loop
  line(
    "criterion",
    (3.6, -5),
    (3.6, 2),
    "potential",
    ..arrow-style,
    name: "converged-no",
  )
  content("converged-no.13%", [No], frame: none, anchor: "north-east", padding: (-1pt, 2pt))
})

