---
name: create-resume
description: >-
  Draft a new resume from the user's facts as canonical cv-builder/v1 Markdown. Use when the user
  asks to create, write, or build a resume or CV from scratch (English, Russian or Japanese), optionally
  filling a shipped CV Builder skeleton and handing the result to the browser-based CV Builder
  through the open_builder MCP tool.
---

# Create resume

Produce one complete resume as canonical `cv-builder/v1` Markdown. The full grammar lives in
[references/markdown-v1.md](references/markdown-v1.md); read it before composing. When the CV
Builder MCP server is connected, prefer its live `cv-builder://markdown/v1` and
`cv-builder://templates/*` resources; they are the source of truth for these shipped copies.

## Required writing-quality pass

Read [references/writing-quality.md](references/writing-quality.md) before composing or rewriting text. Apply its full contract:
preserve the factual baseline and permitted scope, edit each Russian or English segment in its
language, run the final humanization pass, then compare against the source and validate Markdown.
Keep missing facts and questions outside the resume. When an outcome or metric is unknown, retain
a precise description of the known work rather than inventing an achievement.
The reference ships inside this skill; do not require or invoke separately installed writing skills.

## Workflow

1. **Collect facts.** Ask for what is missing, under these intake prompts: personal information
   (name, contacts, location), target role and a short summary supported by facts, work experience
   (employers, titles, dates, what was done and delivered), education, skills (hard skills and
   tools), projects with the user's role and result, certificates, awards, languages with
   proficiency levels. Never invent employers, dates, or metrics. If the user only wants a demo,
   use a fictional `example.test` persona instead of real data. Tailoring is optional: do not ask
   the user for a job posting unless they asked to tailor the resume to one.
2. **Pick language and format.** Set language: en, ru or ja. Ask about the target country or employer form if it changes the required structure. Use the template index or shipped examples in [references/templates/](references/templates/). Compact is dense, Standard uses familiar sections, Minimal has lighter headings, and Japan uses tables. Other examples provide centered headers, photos, courses and two-column arrangements. The Builder exports A4 through one browser PDF pipeline.

3. **Compose.** Fill the skeleton section by section. Use every section that has content and drop
   sections with none. Write all content under the Writing craft and Style rules below.
4. **Self-check** against the grammar before delivering:
   - frontmatter uses schema: cv-builder/v1 and language: en, ru or ja; optional layout is one-column or two-column;
   - one header name heading and contact details in a paragraph or a table, as appropriate to the requested form;
   - every entry marker (`**Subtitle:**`, `**Start:**`, `**End:**`, `**Location:**`,
     `**Description:**`, `**Link:**`) sits on its own line;
   - every `**Link:**` value is a labeled Markdown link `[Label](https://…)`; a bare URL is
     rejected, and only absolute http(s) links are active;
   - no raw HTML, code fences or renderer settings; tables, columns, images and page breaks must follow the grammar;
   - within limits: 65,536 bytes, 128 blocks, 50,000 Unicode scalar values.
5. **Deliver.** Default: return the Markdown in the chat. If the CV Builder MCP server is
   connected, offer one `open_builder` call with the full document instead. The tool returns a
   link that opens the document in the user's browser CV Builder: the user confirms the import,
   then edits, runs the ATS preflight, and exports the PDF there. The link expires after 5
   minutes. If the server answers `MARKDOWN_INVALID`, fix the named line and resend the full
   document.

## Writing craft

- **Achievements over duties.** Prefer confirmed outcomes to generic responsibilities. Use the XYZ schema only when its facts and causal link are supplied:
  "achieved X, measured by Y, by doing Z."
- **Impact-first bullets.** Lead each bullet with a specific action and a confirmed result when available, or a precise task
  description. One to two lines per bullet; no walls of text.
- **Quantify, never fabricate.** Use real metrics wherever possible (revenue, conversion,
  retention, team size, ratings). If no verified number is available, describe a specific confirmed result. Ask about missing facts outside the final resume.
- **Recruiter mindset.** Write for a recruiter screening hundreds of resumes a day: cut anything
  generic and keep only bullets that prove value. Follow the employer's length requirements. Keep relevant content concise; do not use an experience-years cutoff.
- **Truthful reframing.** Rephrase and reorder to fit the target role, but never add claims the
  experience does not support; flag gaps as questions instead.

## Writing style

Apply the complete language and humanization passes in
[references/writing-quality.md](references/writing-quality.md). Keep professional language direct,
specific and natural while preserving the user's facts, voice and requested form.

## Format and country guidance

Choose the format requested by the employer. The examples in references/templates/ match the editor and use fictional facts. Compact and Standard remain available under the classic-compact and simple-ats filenames. Minimal replaces the redundant USA example. Two columns, Skills left/right and the other column examples are supported now.

Japan is an editable A4 rirekisho example with tables, Japanese text and an explicit page break; set language: ja. It follows the MHLW section structure and is not a government-issued form. Keep education and employment chronological and separate; update name readings, dates, qualifications, motivation and preferences. Sex is optional in the MHLW sample; add a photo when required. A separate shokumu keirekisho may also be requested. Do not convert it to a Western ATS section order.

Use Minimal or Standard for a general USA resume, usually without a photo or unnecessary personal details; check federal and employer-specific instructions separately. Australia includes relevant licences; obtain consent before providing requested referees. Europe uses Europass-style sections, not an official Europass export. Check the employer's form for China and Korea; complete Chinese/Korean font support is not included. Read the country guidance and source links in references/markdown-v1.md.

Use confirmed facts only. When no metric is available, describe a specific non-numeric result. Keep questions and unconfirmed placeholders outside the final resume. Preserve meaningful names, dates, links and supported block attributes when polishing text.

## Never

- Never render, request, receive, or attach a PDF; PDF export exists only inside the browser
  Builder.
- Never select a PDF renderer or its settings. Supported block attributes and containers belong to the document and may be preserved or edited.
- Never fabricate experience, employers, dates, or metrics to fill the skeleton.
- Never show real personal data in examples; any example uses reserved fictional domains (the
  `example.com` / `example.test` family).
