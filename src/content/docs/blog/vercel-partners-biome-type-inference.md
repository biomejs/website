---
title: Biome partners with Vercel to improve type inference
excerpt: Vercel has become a Platinum Sponsor of Biome to further our type inference efforts
authors:
  - arendjr
date: 2025-04-02
cover:
  light: "@/assets/blog/roadmap-2024/banner-light.png"
  dark: "@/assets/blog/roadmap-2024/banner-dark.png"
  alt: The brand of the project. It says "Biome, toolchain of the web"
socialImage: "@/assets/social-logo.png"
featured: true
---

Back at the start of 2024, Biome added an ambitious goal to its
[roadmap](/blog/roadmap-2024): integrate a subset of the
**TypeScript type system** directly into Biome so that type-informed lint rules
can work out of the box.

In order to make this feasible, we first needed better infrastructure. The main
blocker for this was multi-file analysis, which is coming with
[Biome 2.0](/blog/biome-v2-0-beta).

Today, we finally have the technical means to implement this goal, but, as a
project, we need more than only technical means. Which is why we are grateful
to announce Vercel as a partner to help us achieve this goal and push the web
forward.

### Vercel becomes Biome's first platinum sponsor

[Vercel](https://vercel.com/) has contracted me (one of the Biome lead
developers) to work on our type inference effort for many months. Vercel’s goal
with this partnership is to both help improve their own internal linter DX (as
they have recently standardized on Biome) and share those improvements with the
rest of the JavaScript ecosystem.

We aim to have a fully
functioning[(*)](#how-can-you-write-a-type-informed-lint-rule-if-you-dont-know-the-type-information-is-correct)
versions of the [`noFloatingPromises`](https://next.biomejs.dev/linter/rules/no-floating-promises/)
rule and a similar `noMisusedPromises` rule.

## Frequently Asked Questions

Because type inference and type checkers are popular topics in our community,
I have collected a few common questions on this topic.

### Are you reimplementing a type checker in Biome?

No. TypeScript's `tsc` is a complex and fully-featured type checker, and we have
no intention to rebuild it. For type _checking_ you are expected to continue to
use `tsc`.

This work focuses on type _inference_ which is a small subset of the
functionality of a full type checker. The goal is to be able to write lint rules
that act on type information, without needing to prove that this type
information is correct.

### How can you write a type-informed lint rule if you don't know the type information is correct?

Linters have different aims than type checkers. Where a type checker aims to
detect misuse of types, a linter aims to detect common mistakes in general. But
the goal of detecting common mistakes doesn't require 100% correctness when it
comes to the types it operates on. In fact, even the
[TypeScript Design Goals](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Design-Goals)
state they are willing to compromise correctness in favor of productivity.

For a linter, what's most important is that we don't flag _false positives_,
instances where our lint rules may think there's an issue when really there's
not. False positives are a source of frustration for developers, because they 
take time to analyze; time that was wasted when it turns out there really wasn't
an issue to begin with.

On the other hand, _false negatives_ are less problematic. They represent
situations where we wish the lint rule would flag an issue, but didn't. They can
also represent lost productivity (by not flagging the issue early in the
pipeline), but they are not productivity lost due to the rule itself.

Hypothetically, a lint rule that has no false positives, but has 20% false
negatives, still offers 80% of the value of a rule that is always correct. So
our goal is simply: Create lint rules that don't flag false positives,
while trying to get the amount of false negatives down as much as we can.

We cannot say upfront which percentage we will actually achieve, but since
Vercel is sponsoring this work, we'll use their repositories as a benchmark and
try to optimise towards their use cases.

### How does Microsoft's announcement of a Go port for `tsc` influence your work?

It's too early to tell. The Go port is not available to users yet, and the APIs
that should allow it to be used by other tooling aren't expected until the end
of the year. Additionally, even though the Go port is supposedly much faster
than the Node.js version, it will likely still be significantly slower than an
implementation built into Biome's core due to inter-process communication and
the need to do duplicate work such as parsing files in separate processes.

For now, that gives us an opportunity to pursue our own type inference
implementation and see how it goes. When the Go version is available for
integration into other tools, we can always reevaluate our approach.

### Can we follow your progress?

Yes! There's a public project overview that people can inspect:
https://github.com/orgs/biomejs/projects/4/views/2

Note that issues may be continuously added to the project as false negatives
keep popping up.
