---
description: |
  A representation of a Timed Event Graph, a specific type of Petri net. Uses custom functions to draw places (circles, potentially with tokens) and transitions (bars), connected by directed arcs to model processes or workflows with timing considerations.
github_url: "https://github.com/janosh/diagrams/tree/main/assets/timed-event-graph"
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

#import "@preview/cetz:0.4.2"

#set page(width: auto, height: auto, margin: 8pt)

#let transition(coords, name: none, content: none, color: black) = {
  cetz.draw.group(name: name, {
    let top_pos = (rel: (0, 0.5), to: coords)
    let bottom_pos = (rel: (0, -0.5), to: coords)

    cetz.draw.line(top_pos, bottom_pos, stroke: (thickness: 4pt, paint: color))

    cetz.draw.anchor("default", coords)
    cetz.draw.anchor("center", coords)
    cetz.draw.anchor("left", coords)
    cetz.draw.anchor("right", coords)
    cetz.draw.anchor("top", top_pos)
    cetz.draw.anchor("bottom", bottom_pos)

    if content != none {
      cetz.draw.content((rel: (-0, -1.0), to: coords))[
        #set text(size: 15pt)
        #content
      ]
    }
  })
}

#let place(coords, name: none, content: none, token: false) = {
  cetz.draw.group(name: name, {
    let radius = 0.4

    cetz.draw.arc(coords, start: 0deg, stop: 360deg, radius: radius)

    cetz.draw.anchor("default", coords)
    cetz.draw.anchor("center", coords)
    cetz.draw.anchor("north", (rel: (0, radius), to: coords))
    cetz.draw.anchor("south", (rel: (0, -radius), to: coords))
    cetz.draw.anchor("east", (rel: (radius, 0), to: coords))
    cetz.draw.anchor("west", (rel: (-radius, 0), to: coords))
    cetz.draw.anchor("left", (rel: (-2 * radius, 0), to: coords))
    cetz.draw.anchor("right", (rel: (0, 0), to: coords))
    let diag = radius * calc.cos(45deg)
    cetz.draw.anchor("north-east", (rel: (diag, diag), to: coords))
    cetz.draw.anchor("north-west", (rel: (-diag, diag), to: coords))
    cetz.draw.anchor("south-east", (rel: (diag, -diag), to: coords))
    cetz.draw.anchor("south-west", (rel: (-diag, -diag), to: coords))

    if content != none {
      cetz.draw.arc((rel: (-.1, 0), to: coords), start: 0deg, stop: 360deg, radius: 0.4 - 0.1)
    }

    if token {
      cetz.draw.arc((rel: (-.35, 0), to: coords), start: 0deg, stop: 360deg, radius: 0.4 - 0.35, fill: black)
    }

    if content != none {
      cetz.draw.content((rel: (-0.35, -0.7), to: coords))[
        #set text(size: 15pt)
        #content
      ]
    }
  })
}
#let calc_bend_pt(a, b, e) = {
  let mid_pt = (0, 0)
  mid_pt.at(0) = (a.at(0) + b.at(0)) / 2
  mid_pt.at(1) = (a.at(1) + b.at(1)) / 2

  let orth_vec = (0, 0)
  orth_vec.at(0) = a.at(1) - b.at(1)
  orth_vec.at(1) = b.at(0) - a.at(0)

  let scaled_orth_vec = cetz.vector.scale(orth_vec, e)

  return cetz.vector.add(mid_pt, scaled_orth_vec)
}
#let curve(a, b, mark: none, bend: 0) = {
  cetz.draw.bezier(a, b, ((a, b) => calc_bend_pt(a, b, bend), a, b), mark: mark)
}
#let bent_line(a, b, mark: none, bend: 0) = {
  let s = ((a, b) => calc_bend_pt(a, b, bend), a, b)
  cetz.draw.line(a, s)
  cetz.draw.line(s, b, mark: mark)
}

#cetz.canvas({
  cetz.draw.group(ctx => {
    cetz.draw.scale(1)
    cetz.draw.translate((-0.2, 0.3, 0))
    cetz.draw.set-origin((3, 0.3))

    transition((0, 0), name: "t0", content: $T_frak(I)$)
    transition((4, 0), name: "t2in", content: $T_(2_frak(I))$)
    transition((8, 0), name: "t2out", content: $T_(2_frak(O))$)
    transition((12, 0), name: "t1in", content: $T_(1_frak(I))$)
    transition((16, 0), name: "t1out", content: $T_(1_frak(O))$)
    transition((20, 0), name: "t6", content: $T_frak(O)$)

    place((rel: (2.3, 0), to: "t0.right"), name: "p02", content: $τ_(02)$)
    place((rel: (2.3, -1), to: "t2in.right"), name: "pr2", content: $ρ_(2)$)
    place((rel: (2.3, 1), to: "t2in.right"), name: "p22", content: $τ_(22)$)
    place((rel: (2.3, 0), to: "t2out.right"), name: "p21", content: $τ_(21)$)
    place((rel: (2.3, -1), to: "t1in.right"), name: "pr1", content: $ρ_(1)$)
    place((rel: (2.3, 1), to: "t1in.right"), name: "p11", content: $τ_(11)$)
    place((rel: (2.3, 0), to: "t1out.right"), name: "p16", content: $τ_(16)$)
    place((rel: (3, -4), to: "t2out.right"), name: "p61", content: $τ_(60)$, token: true)

    cetz.draw.line("t0.right", "p02.left", mark: (end: ">"))
    cetz.draw.line("p02.right", "t2in.left", mark: (end: ">"))
    cetz.draw.line("t2in.right", "pr2.left", mark: (end: ">"))
    curve("t2in.right", "p22.left", mark: (end: ">"), bend: 0.3)
    cetz.draw.line("pr2.right", "t2out.left", mark: (end: ">"))
    curve("p22.right", "t2out.left", mark: (end: ">"), bend: 0.3)
    cetz.draw.line("t2out.right", "p21.left", mark: (end: ">"))
    cetz.draw.line("p21.right", "t1in.left", mark: (end: ">"))
    cetz.draw.line("t1in.right", "pr1.left", mark: (end: ">"))
    curve("t1in.right", "p11.left", mark: (end: ">"), bend: 0.3)
    cetz.draw.line("pr1.right", "t1out.left", mark: (end: ">"))
    curve("p11.right", "t1out.left", mark: (end: ">"), bend: 0.3)
    cetz.draw.line("t1out.right", "p16.left", mark: (end: ">"))
    cetz.draw.line("p16.right", "t6.left", mark: (end: ">"))
    bent_line("t6.right", "p61.right", mark: (end: ">"), bend: 0.2)
    bent_line("p61.left", "t0.left", mark: (end: ">"), bend: 0.18)
  })
});

