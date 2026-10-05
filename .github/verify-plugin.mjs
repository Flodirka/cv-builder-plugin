import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { lstat, readFile, readdir } from "node:fs/promises";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
// Reviewed publication inventory. New files require an explicit change here.
const approvedFiles = new Set([
  ".claude-plugin/marketplace.json",
  ".claude-plugin/plugin.json",
  ".github/CODEOWNERS",
  ".github/verify-plugin.mjs",
  ".github/workflows/plugin-check.yml",
  ".gitignore",
  ".mcp.json",
  "LICENSE",
  "PRIVACY.md",
  "README.md",
  "SHA256SUMS",
  "SUPPORT.md",
  "TERMS.md",
  "assets/logo.svg",
  "assets/readme/boosty.svg",
  "assets/readme/donation-alerts.svg",
  "assets/readme/editor-preview.png",
  "assets/readme/hero-plugin.svg",
  "assets/readme/install-plugin.svg",
  "assets/readme/open-editor.svg",
  "assets/readme/patreon.svg",
  "assets/readme/support.svg",
  "docs/AUDIT.md",
  "skills/create-resume/SKILL.md",
  "skills/create-resume/references/markdown-v1.md",
  "skills/create-resume/references/templates/australia.md",
  "skills/create-resume/references/templates/centered.md",
  "skills/create-resume/references/templates/classic-compact.md",
  "skills/create-resume/references/templates/compact-with-footer.md",
  "skills/create-resume/references/templates/courses.md",
  "skills/create-resume/references/templates/europe.md",
  "skills/create-resume/references/templates/japan.md",
  "skills/create-resume/references/templates/minimal.md",
  "skills/create-resume/references/templates/photo.md",
  "skills/create-resume/references/templates/simple-ats.md",
  "skills/create-resume/references/templates/skills-left.md",
  "skills/create-resume/references/templates/skills-right.md",
  "skills/create-resume/references/templates/split-left.md",
  "skills/create-resume/references/templates/split-right.md",
  "skills/create-resume/references/templates/two-column.md",
  "skills/create-resume/references/writing-quality.md",
  "skills/review-resume/SKILL.md",
  "skills/review-resume/references/markdown-v1.md",
  "skills/review-resume/references/writing-quality.md",
  "skills/rewrite-achievements/SKILL.md",
  "skills/rewrite-achievements/references/markdown-v1.md",
  "skills/rewrite-achievements/references/writing-quality.md",
  "skills/tailor-resume/SKILL.md",
  "skills/tailor-resume/references/markdown-v1.md",
  "skills/tailor-resume/references/templates/australia.md",
  "skills/tailor-resume/references/templates/centered.md",
  "skills/tailor-resume/references/templates/classic-compact.md",
  "skills/tailor-resume/references/templates/compact-with-footer.md",
  "skills/tailor-resume/references/templates/courses.md",
  "skills/tailor-resume/references/templates/europe.md",
  "skills/tailor-resume/references/templates/japan.md",
  "skills/tailor-resume/references/templates/minimal.md",
  "skills/tailor-resume/references/templates/photo.md",
  "skills/tailor-resume/references/templates/simple-ats.md",
  "skills/tailor-resume/references/templates/skills-left.md",
  "skills/tailor-resume/references/templates/skills-right.md",
  "skills/tailor-resume/references/templates/split-left.md",
  "skills/tailor-resume/references/templates/split-right.md",
  "skills/tailor-resume/references/templates/two-column.md",
  "skills/tailor-resume/references/writing-quality.md"
]);

const normalize = (path) => path.split(sep).join("/");
const hash = (buffer) => createHash("sha256").update(buffer).digest("hex");
const textExtensions = /\.(?:md|json|svg|mjs|ya?ml)$/;
const privateKey = new RegExp(["-----BEGIN", "(?:RSA |EC |OPENSSH )?PRIVATE KEY-----"].join(" "));
const secretPatterns = [
  privateKey,
  /gh[pousr]_[A-Za-z0-9]{30,}/,
  /AKIA[A-Z0-9]{16}/,
  /xox[baprs]-[A-Za-z0-9-]{20,}/,
  /sk-[A-Za-z0-9_-]{32,}/,
  /\bBearer\s+[A-Za-z0-9._-]{20,}/,
  /\b\d{8,10}:[A-Za-z0-9_-]{35}\b/,
  /\b[A-Z]:[\\/]Users[\\/]/i
];
const checkFile = (path, buffer) => {
  assert(approvedFiles.has(path), `Unreviewed file: ${path}`);
  assert(!buffer.subarray(0, 5).equals(Buffer.from("%PDF-")), `PDF payload: ${path}`);
  assert(
    !buffer.subarray(0, 15).equals(Buffer.from("SQLite format 3")),
    `Database payload: ${path}`
  );
  if (!textExtensions.test(path)) return;
  const text = buffer.toString("utf8");
  for (const pattern of secretPatterns) assert(!pattern.test(text), `Sensitive content: ${path}`);
  for (const match of text.matchAll(/[A-Z0-9._%+-]+@([A-Z0-9.-]+\.[A-Z]{2,})/gi)) {
    assert(
      /(?:^|\.)example\.(?:com|org|net|test)$/.test(match[1].toLowerCase()),
      `Non-example email: ${path}`
    );
  }
  if (path.endsWith(".svg"))
    assert(
      !/<(?:script|foreignObject)\b|\bon[a-z]+\s*=|(?:href|src)\s*=|javascript:/i.test(text),
      `Active SVG: ${path}`
    );
  if (path.endsWith(".yml")) {
    assert(!/\bpull_request_target\b/.test(text), `Privileged PR trigger: ${path}`);
    for (const match of text.matchAll(/^\s*uses:\s*(\S+)/gm))
      assert(/@[a-f0-9]{40}$/.test(match[1]), `Unpinned action: ${path}`);
  }
};
const walk = async (directory) => {
  const files = [];
  for (const name of await readdir(directory)) {
    if (directory === root && name === ".git") continue;
    const path = resolve(directory, name);
    const info = await lstat(path);
    assert(!info.isSymbolicLink(), `Symbolic link: ${normalize(relative(root, path))}`);
    if (info.isDirectory()) files.push(...(await walk(path)));
    else files.push(normalize(relative(root, path)));
  }
  return files.sort();
};
const scan = async () => {
  const files = await walk(root);
  assert.deepEqual(
    files,
    [...approvedFiles].sort(),
    "Package file set differs from reviewed inventory"
  );
  const buffers = new Map();
  for (const path of files) {
    const buffer = await readFile(resolve(root, path));
    checkFile(path, buffer);
    buffers.set(path, buffer);
  }
  const lines = buffers.get("SHA256SUMS").toString("utf8").trim().split(/\r?\n/);
  const manifestPaths = [];
  for (const line of lines) {
    const match = /^([a-f0-9]{64})  (.+)$/.exec(line);
    assert(
      match && match[2] !== "SHA256SUMS" && buffers.has(match[2]),
      "Invalid integrity manifest entry"
    );
    assert.equal(hash(buffers.get(match[2])), match[1], `Manifest mismatch: ${match[2]}`);
    manifestPaths.push(match[2]);
  }
  assert.deepEqual(
    manifestPaths.sort(),
    files.filter((path) => path !== "SHA256SUMS"),
    "Incomplete integrity manifest"
  );
  const plugin = JSON.parse(buffers.get(".claude-plugin/plugin.json"));
  const marketplace = JSON.parse(buffers.get(".claude-plugin/marketplace.json"));
  assert.equal(plugin.name, "cv-builder");
  assert(/^\d+\.\d+\.\d+$/.test(plugin.version));
  assert.equal(marketplace.version, plugin.version);
  assert.equal(marketplace.plugins.length, 1);
  assert.equal(marketplace.plugins[0].version, plugin.version);
  assert.equal(marketplace.plugins[0].source, "./");
  assert(
    !["hooks", "agents", "commands", "scripts"].some((key) => key in plugin),
    "Unreviewed executable plugin capability"
  );
  assert.deepEqual(
    JSON.parse(buffers.get(".mcp.json")),
    {
      "cv-builder": { type: "http", url: "https://cv-builder-relay.flodirka.workers.dev/mcp" }
    },
    "MCP binding changed: review the public endpoint and authentication contract"
  );
  const skills = ["create-resume", "tailor-resume", "review-resume", "rewrite-achievements"];
  let writing;
  for (const skill of skills) {
    const text = buffers.get(`skills/${skill}/SKILL.md`).toString("utf8");
    assert(
      new RegExp(`^---\\r?\\nname: ${skill}\\r?\\n`).test(text),
      `Skill frontmatter: ${skill}`
    );
    assert(
      text.includes("[references/writing-quality.md](references/writing-quality.md)"),
      `Required writing reference: ${skill}`
    );
    const guide = buffers.get(`skills/${skill}/references/writing-quality.md`);
    writing ??= guide;
    assert(guide.equals(writing), `Writing guidance drift: ${skill}`);
  }
  for (const [path, buffer] of buffers) {
    if (!path.endsWith(".md")) continue;
    const text = buffer.toString("utf8");
    const links = [...text.matchAll(/\]\(([^)]+)\)|src="([^"]+)"/g)];
    for (const match of links) {
      const link = match[1] ?? match[2];
      if (/^(?:https?:|cv-builder:|data:image\/(?:png|jpeg);base64,|#)/.test(link)) continue;
      assert(!/^[a-z]+:/i.test(link), `Unsupported local link: ${path}`);
      const destination = resolve(root, dirname(path), link.split("#")[0]);
      const relativePath = normalize(relative(root, destination));
      assert(!relativePath.startsWith("../"), `Link escapes package: ${path}`);
      assert(
        approvedFiles.has(relativePath) ||
          files.some((file) => file.startsWith(relativePath + "/")),
        `Missing local link: ${path} -> ${link}`
      );
    }
  }
  console.log(
    `Plugin package checks passed: ${files.length} reviewed files, manifest, MCP binding, skills, writing references and local links.`
  );
};
const selfTest = () => {
  const rejected = [
    [".env.local", "placeholder"],
    ["hooks/run.sh", "echo unexpected"],
    ["README.md", "gh" + "p_" + "A".repeat(36)],
    ["README.md", "person@" + "company.invalid"],
    ["assets/logo.svg", "<svg><script>alert(1)</script></svg>"],
    [".github/workflows/plugin-check.yml", "uses: actions/checkout@v6"],
    [".github/workflows/plugin-check.yml", "on: pull_" + "request_target"],
    ["README.md", "%PDF-1.7"]
  ];
  for (const [path, text] of rejected)
    assert.throws(() => checkFile(path, Buffer.from(text)), `Guard did not reject ${path}`);
  checkFile("README.md", Buffer.from("Fictional sample: alex@example.com"));
  console.log(`Plugin negative guards passed: ${rejected.length} checks.`);
};
if (process.argv[2] === "self-test") selfTest();
else await scan();
