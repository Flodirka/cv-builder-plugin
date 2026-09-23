---
name: create-resume
description: >-
  Draft a new resume from the user's facts as canonical cv-builder/v1 Markdown. Use when the user
  asks to create, write, or build a resume or CV from scratch (English or Russian), optionally
  filling a shipped CV Builder skeleton and handing the result to the browser-based CV Builder
  through the open_builder MCP tool.
---

# Create resume

Produce one complete resume as canonical `cv-builder/v1` Markdown. The full grammar lives in
[references/markdown-v1.md](references/markdown-v1.md) — read it before composing. When the CV
Builder MCP server is connected, prefer its live `cv-builder://markdown/v1` and
`cv-builder://templates/*` resources; they are the source of truth for these shipped copies.

## Workflow

1. **Collect facts.** Ask for what is missing, under these intake prompts: personal information
   (name, contacts, location), objective (career goal in a sentence or two), work experience
   (employers, titles, dates, what was done and delivered), education, skills (hard skills and
   tools), projects with the user's role and result, certificates, awards, languages with
   proficiency levels. Never invent employers, dates, or metrics. If the user only wants a demo,
   use a fictional `example.test` persona instead of real data. Tailoring is optional: do not ask
   the user for a job posting unless they asked to tailor the resume to one.
2. **Pick language and skeleton.** Set frontmatter `language: en` or `ru`. Offer the two shipped
   skeletons and fill the chosen one:
   - **Classic Compact** — dense one column: Summary, Experience, Education, Projects, Skills,
     Languages, Certificates. See
     [references/templates/classic-compact.md](references/templates/classic-compact.md).
   - **Simple ATS** — sparse one column: headline paragraph plus Experience and Skills in a
     parser-friendly order. See
     [references/templates/simple-ats.md](references/templates/simple-ats.md).

   A two-column skeleton is planned but not shipped — never promise it. The Builder always
   renders one deterministic A4 PDF; there is no layout or renderer choice to make.

3. **Compose.** Fill the skeleton section by section. Use every section that has content and drop
   sections with none. Write all content under the Writing craft and Style rules below.
4. **Self-check** against the grammar before delivering:
   - the frontmatter is exactly `schema: cv-builder/v1` plus `language`, with no other YAML keys;
   - exactly one `#` name heading, then one contact paragraph with the email and labeled links;
   - every entry marker (`**Subtitle:**`, `**Start:**`, `**End:**`, `**Location:**`,
     `**Description:**`, `**Link:**`) sits on its own line;
   - every `**Link:**` value is a labeled Markdown link `[Label](https://…)` — a bare URL is
     rejected, and only absolute http(s) links are active;
   - no tables, raw HTML, code fences, images, or layout directives;
   - within limits: 65,536 bytes, 128 blocks, 50,000 Unicode scalar values.
5. **Deliver.** Default: return the Markdown in the chat. If the CV Builder MCP server is
   connected, offer one `open_builder` call with the full document instead. The tool returns a
   link that opens the document in the user's browser CV Builder: the user confirms the import,
   then edits, runs the ATS preflight, and exports the PDF there. The link expires after 5
   minutes. If the server answers `MARKDOWN_INVALID`, fix the named line and resend the full
   document.

## Writing craft

- **Achievements over duties.** Write outcomes, not responsibilities. Use the XYZ schema:
  "achieved X, measured by Y, by doing Z."
- **Impact-first bullets.** Lead each bullet with a strong action verb and a result, not a task
  description. One to two lines per bullet; no walls of text.
- **Quantify, never fabricate.** Use real metrics wherever possible (revenue, conversion,
  retention, team size, ratings). When a number is missing, insert a bracketed placeholder such
  as `[X%]` and flag it — never invent numbers, employers, titles, dates, tools, or
  certificates.
- **Recruiter mindset.** Write for a recruiter screening hundreds of resumes a day: cut anything
  generic and keep only bullets that prove value. One page by default; two pages only with 5+
  years of genuinely relevant content.
- **Truthful reframing.** Rephrase and reorder to fit the target role, but never add claims the
  experience does not support — flag gaps as questions instead.

## Style — no AI slop

Resume text must read as written by a professional, not generated. Apply in both languages:

- Direct verbs and concrete statements; neutral, serious tone. One stable term per concept — no
  synonym rotation for variety.
- No assistant filler, formulaic openings or conclusions, staged sincerity ("to be honest"),
  rhetorical templates ("not just X, but Y" / «не просто X, а Y»), forced triplets, or fake
  ranges whose endpoints are not on the same scale.
- English: avoid unless exact terminology — delve, robust, pivotal, testament, underscore,
  crucial, multifaceted, intricate, foster, enhance, bolster, garner, showcase, tapestry,
  vibrant, interplay, valuable, and "landscape" used abstractly. Never start a sentence with
  "Additionally" or "Notably". Prefer "is" and "are" over "serves as", "boasts", or "features"
  when a simple copula is accurate.
- Russian: avoid inflated or bureaucratic wording — «является», «данный», «осуществлять»,
  «обеспечивать», «способствует», «демонстрирует», «в рамках», «представляет собой», «играет
  ключевую роль», «важно отметить», «ключевой», «значительный», «уникальный», «инновационный»,
  «передовой», «бесшовный», «синергия», and abstract uses of «экосистема» or «ландшафт».
  Replace chains of abstract nouns with direct verbs.
- Never manufacture human signals: no anecdotes, emotions, idioms, or invented specifics added
  to sound human. A clean professional text does not need them.
- In resume text: straight quotation marks, no em dashes, sentence-case headings, no decorative
  bold emphasis.

## Never

- Never render, request, receive, or attach a PDF — PDF export exists only inside the browser
  Builder.
- Never emit a layout identifier, renderer settings, or any other presentation parameter.
- Never fabricate experience, employers, dates, or metrics to fill the skeleton.
- Never show real personal data in examples — any example uses reserved fictional domains (the
  `example.com` / `example.test` family).
