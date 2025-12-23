---
description: |
  This image is a **mapping diagram** illustrating a mathematical relation or function from one set to another. Specifically, it represents an **onto (surjective) function** mapping elements from right to left.
  
  ### 1. Structure and Components
  *   **Sets:** There are two sets depicted as ellipses.
      *   **Domain (Right Set):** Contains elements $\{p, q, r, s, t, u\}$.
      *   **Codomain/Range (Left Set):** Contains elements $\{a, b, d, e\}$. (Note: The letter 'c' is skipped in the sequence).
  *   **Mappings (Directed Edges):** The arrows indicate the direction of the application from the right set to the left set.
  
  ### 2. Functional Analysis
  The diagram defines a function $f: \{p, q, r, s, t, u\} \to \{a, b, d, e\}$ with the following specific assignments:
  *   $f(s) \to a$
  *   $f(q) \to b$
  *   $f(q) \to d$ (See note below)
  *   $f(t) \to e$
  *   Elements **$p, r, u$** in the domain have no assigned values in the codomain.
  
  ### 3. Technical Classification
  *   **In Relation Terms:** If this is viewed as a general relation from right to left, it is **not a function** because the element **$q$** maps to two different outputs ($b$ and $d$), violating the uniqueness requirement of a function.
  *   **Terminology:** The label **"APPLICATION"** at the bottom suggests a mapping or a transformation.
  *   **Surjectivity:** Because every element in the left set (the codomain) is pointed to by at least one arrow, this mapping represents a **surjection** (it is "onto").
  *   **Injective status:** It is **not injective** (not one-to-one) because multiple elements could potentially map to the same value (though in this specific drawing, each codomain element $a, b, d, e$ only has one incoming arrow).
  
  ### 4. Summary of Ordered Pairs
  The relation $R$ defined by this diagram is:
  $$R = \{(s, a), (q, b), (q, d), (t, e)\}$$
github_url: "https://github.com/partrita/typst-examples-book/blob/51d1f35456c54ba79964e175f4b1d5660c926973/src/packages/drawing.md?plain=1#L9"
author: "https://github.com/partrita"
license: |
  MIT License
  
  Copyright (c) 2023 sitandr
  
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
#import "@preview/cetz:0.3.4"

#cetz.canvas({
  let left = (a:2, b:1, d:-1, e:-2)
  let right = (p:2.7, q: 1.8, r: 0.9, s: -.3, t: -1.5, u: -2.4)
  let edges = "as,bq,dq,et".split(",")

  let ell-width = 1.5
  let ell-height = 3
  let dist = 5
  let dot-radius = 0.1
  let dot-clr = blue

  import cetz.draw: *
  circle((-dist/2, 0), radius:(ell-width ,  ell-height))
  circle((+dist/2, 0), radius:(ell-width ,  ell-height))

  for (name, y) in left {
    circle((-dist/2, y), radius:dot-radius, fill:dot-clr, name:name)
    content(name, anchor:"east", pad(right:.7em, text(fill:dot-clr, name)))
  }

  for (name, y) in right {
    circle((dist/2, y), radius:dot-radius, fill:dot-clr, name:name)
    content(name, anchor:"west", pad(left:.7em, text(fill:dot-clr, name)))
  }

  for edge in edges {
    let from = edge.at(0)
    let to = edge.at(1)
    line(from, to)
    mark(from, to, symbol: ">",  fill: black)
  }

  content((0, - ell-height), text(fill:blue)[APPLICATION], anchor:"south")
})
```
