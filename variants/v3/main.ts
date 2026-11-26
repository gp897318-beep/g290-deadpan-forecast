// Deadpan Forecasts for Cities That Do Not Exist — variant V3.
// Writes one original deadpan forecast line to /output/entry.txt.
// Gate (RULES.txt): UTF-8 text, 1-160 characters, not only whitespace.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
const LINE = "Murkford: a high of 47, a 70 percent chance of rain, and a 100 percent chance the forecast is lying to you again, as it did last Tuesday.";
const chars = [...LINE].length;
if (LINE.trim().length === 0) throw new Error("entry is empty");
if (chars < 1 || chars > 160) throw new Error(`entry must be 1-160 characters, got ${chars}`);
if (LINE.includes("\n") || LINE !== LINE.trim() || / {2,}/.test(LINE)) throw new Error("entry must be a single cleanly-spaced line");
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) throw new Error("round-trip mismatch");
console.log(`wrote /output/entry.txt (${chars} chars, 1 line)`);
