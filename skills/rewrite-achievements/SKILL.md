---
name: rewrite-achievements
description: >-
  Rewrite resume bullets or entries into action-result form with honest quantification. Use when
  the user asks to improve, strengthen, or rewrite experience bullets, achievements, or role
  descriptions.
---

# Rewrite achievements

Turn duty-style bullets ("responsible for X") into achievement bullets (action → outcome) while
staying strictly truthful. Output preserves the canonical `cv-builder/v1` entry convention from
[references/markdown-v1.md](references/markdown-v1.md).

## Rules

1. **Structure** — each bullet names a strong action verb, what was done, and the result (the XYZ
   schema: "achieved X, measured by Y, by doing Z"). One to two lines per bullet.
2. **Honest quantification** — use only numbers the user provided. When a metric clearly exists
   but is unknown, ask for it or insert a bracketed placeholder such as `[X%]` and flag it in
   your reply. Never fabricate figures.
3. **Tense and voice** — past tense for finished roles, present tense for the current one; no
   first person; drop filler ("various", "multiple", "responsible for") unless it is factual.
4. **Scope preservation** — a rewrite may reorder, split, or merge the user's facts but never
   adds employers, dates, titles, or skills.
5. **Style, no AI slop** — direct verbs and concrete statements; no promotional or bureaucratic
   wording ("robust", "pivotal", "showcase", «является», «осуществлять», «в рамках»,
   «инновационный», «ключевой»), no rhetorical templates ("not just X, but Y" / «не просто X, а
   Y»), no forced triplets, no manufactured anecdotes or emotions. One stable term per concept;
   straight quotes and no em dashes in resume text.

## Workflow

1. Take the input: one or more entries, a bullet list, or pasted text.
2. Rewrite each bullet under the rules above. When full entries were given, keep the entry
   metadata markers (`**Subtitle:**`, `**Start:**`, `**End:**`, `**Location:**`,
   `**Description:**`, `**Link:**`) untouched, each on its own line, and return valid canonical
   Markdown.
3. Return the rewritten bullets or entries, then one short note per bullet explaining what
   changed, flagging any placeholders that still need the user's numbers.
4. If the user wants the whole document updated, compose the revised canonical Markdown per the
   grammar and, when the CV Builder MCP server is connected, offer one `open_builder` call —
   editing, ATS preflight, and PDF export happen in the browser Builder.

## Never

- Never invent metrics, employers, dates, or outcomes.
- Never render, request, or receive a PDF; never choose a renderer; never emit a layout
  identifier or any other presentation parameter.
- Never show real personal data in examples — any example uses reserved fictional domains (the
  `example.com` / `example.test` family).
