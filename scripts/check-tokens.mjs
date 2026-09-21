// Verifica que app/globals.css declara exactamente los tokens de tokens.md.
// Uso: npm run tokens:check
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const markdown = readFileSync(`${root}/tokens.md`, "utf8");
const css = readFileSync(`${root}/app/globals.css`, "utf8");

const unquote = (cell) => cell.trim().replace(/^`|`$/g, "");

/** Tokens declarados en las tablas de tokens.md */
function readSpec() {
  const spec = new Map();
  for (const line of markdown.split("\n")) {
    if (!line.startsWith("| `--")) continue;
    const cells = line.split("|").slice(1, -1);
    const name = unquote(cells[0]);
    spec.set(name, unquote(cells[1]));
    // La tabla de escala tipográfica lleva el line-height en la 3ª columna
    if (name.startsWith("--text-") && cells.length === 4) {
      spec.set(`${name}--line-height`, unquote(cells[2]));
    }
  }
  return spec;
}

/** Tokens declarados en los bloques @theme de globals.css */
function readCss() {
  const declared = new Map();
  const blocks = css.matchAll(/@theme[^{]*\{([\s\S]*?)\n\}/g);
  for (const [, body] of blocks) {
    const clean = body.replace(/\/\*[\s\S]*?\*\//g, "");
    for (const [, name, value] of clean.matchAll(/(--[\w-]+(?:\*)?)\s*:\s*([^;]+);/g)) {
      if (name.endsWith("*")) continue; // resets `--color-*: initial`
      declared.set(name, value.trim().replace(/\s+/g, " "));
    }
  }
  return declared;
}

const spec = readSpec();
const declared = readCss();
const problems = [];

for (const [name, value] of spec) {
  if (!declared.has(name)) problems.push(`Falta en globals.css: ${name}`);
  else if (declared.get(name) !== value)
    problems.push(`Valor distinto en ${name}: tokens.md "${value}" · globals.css "${declared.get(name)}"`);
}
for (const name of declared.keys()) {
  if (!spec.has(name)) problems.push(`No documentado en tokens.md: ${name}`);
}

if (problems.length) {
  console.error(`✗ ${problems.length} diferencia(s) entre tokens.md y globals.css\n`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`✓ ${spec.size} tokens sincronizados entre tokens.md y globals.css`);
