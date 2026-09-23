---
name: review-resume
description: >-
  Review a resume's content, structure, and ATS safety using the same criteria as the CV
  Builder's preflight. Use when the user asks to review, critique, check, or give feedback on a
  resume or CV.
---

# Review resume

Assess the resume and report concrete, fixable findings. If the document is canonical
`cv-builder/v1` Markdown, also check it against the grammar in
[references/markdown-v1.md](references/markdown-v1.md). The review itself is a findings list —
revise the document only when the user asks.

## What to check

Mirror the CV Builder's ATS preflight criteria:

- **Identity and contacts** — exactly one H1 name in plain text; a header contact row with a
  valid email (its absence is a warning), a phone number of 7–15 digits, and labeled http(s)
  links; contacts belong in the header, not the body.
- **Section structure** — an H2 section heading before any body content; the usual ATS reading
  order (Summary, Experience, Education, Projects, Skills, Languages, Certificates); no empty
  sections and no duplicated section headings.
- **Entry hygiene** — every entry has a title; dates are parseable (`2021`, `05/2021`,
  `Present`) and the start is not after the end; no empty bullets and no empty entries.
- **Content quality** — bullets lead with action verbs and carry honest, user-provided
  quantification (achievements over duties: "achieved X, measured by Y, by doing Z");
  consistent tense (past for finished roles, present for the current one); no first-person
  filler; Skills and Languages stay dash bullet lists.
- **Style and AI slop** — flag generic duty statements with no outcome, promotional or
  bureaucratic wording ("robust", "pivotal", "showcase", «является», «осуществлять», «в
  рамках», «ключевой», «инновационный»), rhetorical templates ("not just X, but Y" / «не просто
  X, а Y»), forced triplets, walls of text, and unsupported superlatives. Resume text should
  read as written by a professional, not generated.
- **Length and skimmability** — one page by default (two only with 5+ years of genuinely
  relevant content); short bullets, clear hierarchy, nothing generic that does not serve the
  target role.
- **Grammar (canonical Markdown only)** — entry markers each on their own line; `**Link:**`
  values are labeled Markdown links, never bare URLs; no tables, raw HTML, code fences, images,
  or layout directives.

## Output

Group findings by severity — errors first (what the Builder's preflight flags as errors), then
warnings — each with its location and a concrete fix. Close with a one-paragraph overall
assessment. Offer to apply the fixes as revised canonical Markdown; when the user accepts,
compose it per the grammar and, if the CV Builder MCP server is connected, offer one
`open_builder` call. Editing, ATS preflight, and PDF export stay in the browser Builder.

## Never

- Never "fix" content by inventing employers, dates, or metrics — raise them as questions or
  bracketed placeholders instead.
- Never render, request, or receive a PDF; never choose a renderer; never emit a layout
  identifier or any other presentation parameter.
- Never show real personal data in examples — any example uses reserved fictional domains (the
  `example.com` / `example.test` family).
