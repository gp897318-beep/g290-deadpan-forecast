// Deadpan Forecasts for Cities That Do Not Exist — variant V10.
// Writes one original deadpan forecast line to /output/entry.txt.
// Gate (RULES.txt): UTF-8 text, 1-160 characters, not only whitespace.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
const LINE = "In Nethersnooze, a high of 70 and a low of 69, with a gentle rain of other people's laundry, so bring an umbrella and a laundry basket.";
const chars = [...LINE].length;
if (LINE.trim().length === 0) throw new Error("entry is empty");
if (chars < 1 || chars > 160) throw new Error(`entry must be 1-160 characters, got ${chars}`);
if (LINE.includes("\n") || LINE !== LINE.trim() || / {2,}/.test(LINE)) throw new Error("entry must be a single cleanly-spaced line");
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) throw new Error("round-trip mismatch");
console.log(`wrote /output/entry.txt (${chars} chars, 1 line)`);
