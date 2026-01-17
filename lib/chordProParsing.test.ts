
import * as fs from 'fs';
import * as path from 'path';
import { parseChordPro } from './chordProParsing';
import assert from 'assert';

const filePath = path.join(__dirname, '..', 'DownToTheRiver-chordsOverLyrics.txt');
const downToTheRiver = fs.readFileSync(filePath, 'utf-8');

console.log(`Running parser test on: ${filePath}`);

try {
    const parsed = parseChordPro(downToTheRiver);

    // Assertions
    // 1. Check for specific converted lines
    assert(parsed.cleanContent.includes('As I went [G]down in the river to pray'), 'First verse conversion failed');
    assert(parsed.cleanContent.includes('[D]Studying about that [G]good old way'), 'Second verse conversion failed');
    assert(parsed.cleanContent.includes('[D]O sisters, [G]let\'s go down'), 'Chorus conversion failed');

    // 2. Check that "Page 1/3" is NOT erroneously merged (it should remain as text)
    // Note: Our current logic leaves "Page 1/3" on its own line because it's not a chord line.
    assert(parsed.cleanContent.includes('Page 1/3'), 'Pagination text should be preserved (or preserved on its own line)');

    // 3. Check for the problematic last verse (Verse 4? or Reprise)
    // "And who shall wear the robe and crown"
    assert(parsed.cleanContent.includes('And [G]who shall wear the robe and crown'), 'Last verse conversion failed');

    console.log("✅ Parser Unit Test Passed!");
    console.log("---------------------------------------------------");
    // console.log(parsed.cleanContent);
} catch (error) {
    console.error("❌ Parser Unit Test Failed:", error);
    process.exit(1);
}
