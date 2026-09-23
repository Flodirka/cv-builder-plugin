# CV Builder Markdown v1

Complete grammar for the Markdown passed to the open_builder tool. A filled Classic Compact
example closes this document; the Simple ATS skeleton is the cv-builder://templates/simple-ats
resource.

## Limits

- UTF-8 without a BOM, at most 65,536 bytes, 128 blocks, and 50,000 Unicode scalar values.
- Only tab, carriage return, and line feed control characters are allowed.

## Frontmatter

The document starts with YAML frontmatter and no other YAML keys:

```
---
schema: cv-builder/v1
language: en
---
```

`schema` is exactly `cv-builder/v1`; `language` is `en` or `ru`.

## Document structure

- `# Full Name` — exactly one level-one heading, directly after the frontmatter.
- One contact paragraph under the name: email and labeled links separated by ` · `, for example
  `alex.example@example.com · [Portfolio](https://portfolio.example.test)`. Only absolute
  HTTP(S) links are active.
- Everything before the first `##` becomes the header; each `##` heading opens a body section.
- Plain text separated by blank lines is a paragraph. Consecutive `- item` lines form one
  bullet list. `---` outside the frontmatter is a divider.

## Sections

- `## Summary` — one paragraph.
- `## Experience`, `## Education`, `## Projects`, `## Certificates` — entries (see below).
- `## Skills`, `## Languages` — dash bullet lists.
- Additional `##` sections are allowed and import as custom sections.

## Entries

An entry is a `###` heading whose first non-blank line is a metadata row; without one the `###`
stays a plain heading. Every metadata row keeps its exact marker on its own line:

```markdown
### Senior Product Designer
**Subtitle:** Example Studio
**Start:** 2021
**End:** Present
**Location:** Remote
**Description:** Led the fictional design system for an example product.
**Link:** [Case study](https://portfolio.example.test/case-study)
- Raised fictional activation by 20% through an example onboarding redesign.
```

- `**Subtitle:**` — organization (Experience), institution (Education), or issuer (Certificates).
- `**Start:**` / `**End:**` — free-form dates such as `2021`, `05/2021`, or `Present`.
- `**Location:**` and `**Description:**` — optional, single line each.
- `**Link:**` — optional and repeatable; the value must be a Markdown link with a label:
  `**Link:** [Label](https://example.com)`. A bare URL is rejected.
- Dash bullets after the metadata rows belong to the entry.

## Content quality

The format is fixed, and so is the writing bar. The server instructions and the CV Builder
skills (`create-resume`, `tailor-resume`, `review-resume`, `rewrite-achievements`) carry the
same rules; apply them whether or not a skill is installed.

- Write outcomes, not duties: "achieved X, measured by Y, by doing Z".
- Lead every bullet with a strong action verb and a result; keep bullets to one or two lines.
- Quantify only with numbers the user actually provided. When a metric is missing, ask for it
  or leave a bracketed placeholder such as [X%] — never invent numbers, employers, titles,
  dates, tools, or certificates.
- Match the language of the document to the language of the vacancy when there is one.
- One page by default; two pages only with 5+ years of genuinely relevant content.
- Write like a professional, not a model: no assistant filler, no formulaic openings or
  conclusions, no staged sincerity, no unsupported authority ("industry reports say",
  «эксперты считают»), no rhetorical templates ("not just X, but Y" / «не просто X, а Y»),
  no forced triplets, no synonym rotation, no padding or restated points.
- English wording to avoid unless it is exact terminology: delve, robust, pivotal, testament,
  underscore, crucial, multifaceted, intricate, foster, enhance, bolster, garner, showcase,
  tapestry, vibrant, interplay, valuable, and "landscape" used abstractly.
- Russian wording to avoid unless it is exact terminology: «является», «данный», «осуществлять»,
  «в рамках», «представляет собой», «играет ключевую роль», «ключевой», «уникальный»,
  «инновационный», «передовой», «бесшовный».
- Never manufacture human signals: no anecdotes, emotions, idioms, or invented specifics added
  to sound human.

## Rejected constructs

Tables (`|`), raw HTML, code fences, images, block quotes, ordered and task lists, extra YAML
keys, bare URLs in `**Link:**` rows, and layout directives (JSON, IDs, renderer settings,
`layoutId`) are rejected. The server answers MARKDOWN_INVALID with the first broken line;
fix the document and resend it in full.

## Complete example (Classic Compact)

```markdown
---
schema: cv-builder/v1
language: en
---

# Alex Example

alex.example@example.com · [Portfolio](https://portfolio.example.test)

## Summary

Product designer with eight years of fictional experience across example studios.

## Experience

### Senior Product Designer
**Subtitle:** Example Studio
**Start:** 2021
**End:** Present
**Location:** Remote
**Description:** Led the fictional design system for an example product.
**Link:** [Case study](https://portfolio.example.test/case-study)
- Raised fictional activation by 20% through an example onboarding redesign.
- Mentored three example designers.

### Product Designer
**Subtitle:** Sample Agency
**Start:** 2018
**End:** 2021
- Shipped fictional flows for example clients.

## Education

### BA, Design
**Subtitle:** Example University
**Start:** 2014
**End:** 2018

## Projects

### Example Side Project
**Subtitle:** Independent
**Start:** 2023
**End:** Present
**Link:** [Repository](https://code.example.test/example-side-project)
- Built a fictional tool used by an example community.

## Skills

- Fictional product discovery
- Example prototyping

## Languages

- English — native
- Russian — fluent

## Certificates

### Example Design Certification
**Subtitle:** Example Institute
**Start:** 2022
**End:** 2022
```
