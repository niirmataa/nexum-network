import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const skillsDir = fileURLToPath(new URL("../skills/", import.meta.url));
const skillNames = readdirSync(skillsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

if (skillNames.length === 0) {
  throw new Error("No agent skills found");
}

for (const name of skillNames) {
  const skillPath = join(skillsDir, name, "SKILL.md");
  if (!existsSync(skillPath)) {
    throw new Error(`Missing SKILL.md for ${name}`);
  }

  const body = readFileSync(skillPath, "utf8");
  for (const required of ["# ", "## When To Use", "## Inputs", "## Workflow", "## Output"]) {
    if (!body.includes(required)) {
      throw new Error(`${name}/SKILL.md missing required section: ${required}`);
    }
  }
}

console.log(`Checked ${skillNames.length} agent skill(s)`);
