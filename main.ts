// Deadpan Forecasts for Cities That Do Not Exist — one original forecast line.
// Writes the winning forecast to /output/entry.txt, checked against the
// competition gate (1-160 characters, non-whitespace, single line).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Winner of 10 compared variants (see ../deadpan-variants.md):
// the Gravelmouth forecast — a real broadcast structure (temperature,
// freezing drizzle, black ice) with a two-beat deadpan twist: the ice is
// on every road except the one you need, and that road is closed.
const FORECAST =
  "In Gravelmouth, 41 degrees and freezing drizzle, with black ice on every road except the one you actually need, which is closed.";

// The gate (RULES.txt): entry.txt must be UTF-8 text of 1-160 characters,
// not only whitespace. A forecast that spans lines is not one line, so refuse
// newlines, edge whitespace and double spaces outright.
const chars = [...FORECAST].length;
if (FORECAST.trim().length === 0) throw new Error("entry is empty");
if (chars < 1 || chars > 160) {
  throw new Error(`entry must be 1-160 characters, got ${chars}`);
}
if (FORECAST.includes("\n") || FORECAST !== FORECAST.trim() || / {2,}/.test(FORECAST)) {
  throw new Error("entry must be a single cleanly-spaced line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", FORECAST, "utf8");

// Round-trip: what the grader reads must be byte-identical to FORECAST.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== FORECAST) {
  throw new Error("round-trip mismatch: /output/entry.txt differs from FORECAST");
}

console.log(`wrote /output/entry.txt (${chars} chars, 1 line)`);
