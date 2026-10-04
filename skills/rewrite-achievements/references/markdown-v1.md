# CV Builder Markdown v1

Grammar for Markdown passed to open_builder. The template index and examples match the editor. All sample facts are fictional; replace them before submitting an application.

## Limits

- UTF-8, at most 65,536 bytes, 128 blocks including nested containers and children, and 50,000 Unicode scalar values. Columns nest at most 16 levels.
- Only tab, carriage return, and line feed control characters are allowed.

## Frontmatter

The document starts with YAML frontmatter. Only schema, language and optional layout keys are supported:

```
---
schema: cv-builder/v1
language: en
---
```

`schema` is exactly `cv-builder/v1`; `language` is `en`, `ru`, or `ja`. Optional `layout` is `one-column` or `two-column` for legacy documents.

## Document structure

- Use one level-one name heading in the header. Explicit zone attributes allow blocks to appear elsewhere.
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

## Block formatting

A trailing attribute group sets zone=header|sidebar|main|footer. Heading, paragraph, labeled text, list and table blocks support align=left|center|right. Heading attributes: icon=lucide:name (use a supported local Lucide name), underline=true|false, uppercase=true|false, bold=true|false. A list's first item may set columns=1|2. A labeled text row uses **Label:** text.

Columns contain two or three columns, each with a positive relative width and any supported blocks. Close every column and container explicitly:
~~~markdown
::: columns{zone=main}
::: column width=1
## Skills{zone=main}
- Systems design
::: endcolumn
::: column width=2
## Experience{zone=main}
Confirmed experience goes here.{zone=main}
::: endcolumn
::: endcolumns
~~~

Tables have two to six columns. widths lists positive relative widths. Every row must have the same cell count. An optional separator after row one makes it the header. Escape literal pipes as \|; <br> inside a cell denotes a line break, while escaped \<br\> is literal text. Cell content is plain text, not HTML or active Markdown links.
~~~markdown
::: table{zone=main widths=1,1,6}
| 年 | 月 | 学歴 |
| --- | --- | --- |
| 2019 | 3 | 例示大学 卒業 |
::: endtable
::: pagebreak{zone=main}
~~~

Photos: ![Photo](data:image/png;base64,...){zone=header width=90 height=120 shape=square placement=right}. shape is square, rounded or circle; placement is left, right or above. Width/height are positive pixels. Use complete valid PNG/JPEG data, never this abbreviated example.

## Content quality

The format is fixed, and so is the writing bar. The server instructions and the CV Builder
skills (`create-resume`, `tailor-resume`, `review-resume`, `rewrite-achievements`) carry the
same rules; apply them whether or not a skill is installed.

- Write outcomes, not duties: "achieved X, measured by Y, by doing Z".
- Lead every bullet with a strong action verb and a result; keep bullets to one or two lines.
- Quantify only with numbers the user actually provided. When a metric is missing, ask for it
  or describe a confirmed non-numeric result. Flag unresolved gaps outside the final resume. Never invent numbers, employers, titles,
  dates, tools, or certificates.
- Match the language of the document to the language of the vacancy when there is one.
- Follow employer requirements for length and form. Keep relevant content concise; do not impose a years-of-experience cutoff.
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
- Contacts: Use your name, email, phone and relevant portfolio links. Check every link and omit personal details the employer does not need.
- Summary: Use two or three sentences to explain your role, relevant experience and strongest evidence. Replace generic claims with specific work you have done.
- Experience: For most resumes, list the most recent role first. Include employer, title and consistent dates. Describe your action and the result; use numbers only when you can verify them.
- Skills and education: List skills you can demonstrate, relevant qualifications and required licences. Match the vacancy's wording where it describes your actual experience.
- Before sending: Replace every fictional example with your own facts. Follow the employer's form, language and length requirements. Check the exported PDF for page breaks, readable text and working links.
- Fictional example: Redesigned tutorial progression after six playtests, reducing first-session drop-off from 32% to 24%. Use your own confirmed action and result; a concrete non-numeric result is fine.

## Country guidance

- USA: Minimal or Standard is a suitable starting point. Prefer a clear chronology and omit a photo and unnecessary personal details. Federal and other employer-specific applications may have separate instructions. This editor exports A4; use the employer's required page size if it differs. [Source](https://cloudfront.careeronestop.org/JobSearch/Resumes/ResumeGuide/formatting.aspx)
- Australia: Include relevant skills, recent jobs and required licences. Provide referees only when requested and with their consent. Follow the vacancy's length requirements rather than a fixed rule based on years of experience. [Source](https://www.workforceaustralia.gov.au/content/online-learning/course/what-needs-to-be-in-your-resume/assets/Resume%20planner.pdf)
- Europe: The Europe template uses Europass-style sections. It is an editable example, not an official Europass export. Include relevant education, work and language skills; use the official Europass service when that exact format is requested. [Source](https://europass.europa.eu/en/create-europass-cv)
- Japan: Japan is a two-page A4 rirekisho example with editable tables and Japanese text. Keep education and employment in chronological order, grouped separately. Update name readings, dates, qualifications, motivation and preferences. Sex is optional in the MHLW sample; add a photo when required. Use the employer's form when specified. A separate shokumu keirekisho may also be requested. [Source](https://www.hellowork.mhlw.go.jp/member/career_doc01.html)
- Canada and UK: Keep recent, relevant experience and clear contact details. Check local and employer instructions before adding a photo or personal information; do not assume a single required national form. [Source](https://www.jobbank.gc.ca/findajob/resources/write-good-resume)
- China and South Korea: Check the employer's application form and any separate personal statement. There is no claim of compatibility with a universal national form here. The bundled Japanese font does not provide complete Chinese or Korean font coverage. [Source](https://www.work24.go.kr/cm/c/d/0180/retrieveSiteEasyDetailHpcm.do?tycd=E6T00&utzeGuidId=GUID000102)

Unsupported YAML keys are ignored with warnings. Use only the documented frontmatter keys.

## Rejected constructs

Raw HTML, code fences, block quotes, ordered/task lists, bare URLs in Link metadata, and renderer identifiers/settings are unsupported. Fix validation errors and resend the complete document.
Remote photos are blocked by the public editor. Prefer uploading a photo in the browser. Small embedded PNG/JPEG data URLs may fit within relay limits; never fetch a user's photo without authorization.

## Complete example (Compact)

```markdown
---
schema: cv-builder/v1
language: en
layout: one-column
---

# Alex Doe{zone=header}

Senior Game Designer{zone=header}

alex@example.com · Berlin, Germany · Portfolio{zone=header}

Game designer with seven years of experience in progression systems and live operations. Turns playtest findings into feature specifications and measurable improvements to onboarding.{zone=header}

## Experience{zone=main}

### Senior Game Designer{zone=main}
**Subtitle:** Example Studio
**Start:** 2021
**End:** Present
**Location:** Berlin, Germany
**Description:**
- Redesigned tutorial progression after six playtests, reducing first\-session drop\-off from 32% to 24%.
- Wrote specifications for eight seasonal events and coordinated delivery with art, engineering and QA.
- Created an economy dashboard that helped the team review reward balance before each release.

### Game Designer{zone=main}
**Subtitle:** Prototype Team
**Start:** 2019
**End:** 2021
**Location:** Berlin, Germany
**Description:**
- Built and tested three combat prototypes; the team selected one for production.
- Documented progression rules and edge cases, giving engineers a shared reference for implementation.

## Education{zone=main}

### BSc, Computer Systems{zone=main}
**Subtitle:** Example University
**Start:**
**End:** 2019
**Location:**
**Description:**

## Projects{zone=main}

### Progression Simulator{zone=main}
**Subtitle:** Independent project
**Start:** 2023
**End:** 2024
**Location:**
**Description:**
**Link:** [Project](https://example.com/projects/progression)
- Built a browser tool to compare reward curves and shared the source with a community of game designers.

## Skills{zone=main}

- Design: Systems design, Economy, Live ops{zone=main}

## Languages{zone=main}

- English: C1{zone=main}

## Certificates{zone=main}

### Game Economy Design{zone=main}
**Subtitle:** Example Academy
**Start:**
**End:** 2024
**Location:**
**Description:**

## Interests{zone=main}

Writes practical notes on game balancing and runs monthly prototype playtests.{zone=main}
```
