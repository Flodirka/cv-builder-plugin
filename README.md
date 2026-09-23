# CV Builder plugin

Resume content skills plus the public CV Builder MCP server, packaged as one account-free plugin
in the Claude Code plugin format — installable in Claude Code through its own marketplace and
submittable to the ChatGPT/Codex plugin directory.

The plugin teaches agents to draft, tailor, review, and rewrite resume content as canonical
`cv-builder/v1` Markdown and to hand the result to the browser-based CV Builder through the
public `open_builder` MCP tool. Editing, ATS preflight, and PDF export always happen in the
user's browser. The plugin never renders, stores, or transmits a PDF, and it introduces no
accounts, OAuth, or persistence.

## Skills

| Skill                  | What it does                                                                 |
| ---------------------- | ---------------------------------------------------------------------------- |
| `create-resume`        | Draft a new resume from your facts in a shipped skeleton (EN/RU).            |
| `tailor-resume`        | Adapt an existing resume to a job posting without inventing facts.           |
| `review-resume`        | Critique content, structure, and ATS safety with the Builder's own criteria. |
| `rewrite-achievements` | Rewrite bullets into action-result form with honest quantification.          |

## MCP server

`.mcp.json` binds the remote server `cv-builder` at
`https://cv-builder-relay.flodirka.workers.dev/mcp` (Streamable HTTP, anonymous, no
credentials). Its one tool, `open_builder`, accepts canonical Markdown and returns a 5-minute
link that opens the document in the Builder. The complete grammar and both template skeletons
are also served as the `cv-builder://markdown/v1` and `cv-builder://templates/*` resources; each
skill carries a copy in its `references/`, regenerated from the server source on every release.

The server's own instructions carry the same writing bar as these skills: the content-quality
rules (outcomes over duties, honest user-provided metrics, no invented facts, no AI filler or
promotional wording, the English and Russian wording to avoid), the note that layout and the
single A4 PDF belong to the Builder, and the pointer to the matching skill. They also state that
tailoring is optional, so a host without this plugin asks the user for a job description only
when tailoring was requested and would change the content. Formatting is fixed either way: one
canonical Markdown shape, no presentation parameters.

## Related projects

- [CV Builder Web](https://flodirka.github.io/cv-builder-web/) — the published local-first
  resume editor. Editing, ATS preflight, and PDF export always happen there.
- [cv-builder-web](https://github.com/Flodirka/cv-builder-web) — the public source of the
  editor this plugin hands documents to.

## Install

### Claude Code

```text
/plugin marketplace add Flodirka/cv-builder-plugin
/plugin install cv-builder@cv-builder
```

### ChatGPT and Codex

The same package is submitted through the OpenAI plugin portal (With MCP path) and becomes
available from the directory listing once published.

### Any other MCP client

Add the remote server URL above directly. The skills are plain Markdown and can also be read
without installation.

## Privacy

The only data that leaves the chat is the Markdown document an agent passes to `open_builder`.
The relay holds it in an ephemeral session (5-minute TTL, deleted when the Builder acknowledges
the import), logs no content, and keeps no accounts. The Builder itself keeps the resume in the
browser only.

Read the complete [privacy policy](PRIVACY.md) and [terms of use](TERMS.md).

## Versioning

Semver in `.claude-plugin/plugin.json`; Claude Code delivers updates only when `version`
changes, so every release bumps it.

## Support the project

CV Builder is free and account-free. If it is useful to you, you can support further
development:

- [Boosty](https://boosty.to/gdview_gdbrain/donate)
- [Patreon](https://www.patreon.com/15806620/join)
- [DonationAlerts](https://dalink.to/flodirka)

See [SUPPORT.md](SUPPORT.md) for details. Support is voluntary and never affects the product:
no accounts, no perks, no feature gates.
