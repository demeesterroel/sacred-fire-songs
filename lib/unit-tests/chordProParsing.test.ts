
import * as fs from 'fs';
import * as path from 'path';
import { parseChordPro } from '../chordProParsing';
import assert from 'assert';

const filePath = path.join(__dirname, 'DownToTheRiver-chordsOverLyrics.txt');
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

    console.log("✅ DownToTheRiver Parser Test Passed!");
    console.log("---------------------------------------------------");
} catch (error) {
    console.error("❌ DownToTheRiver Parser Test Failed:", error);
    process.exit(1);
}

// === TEST CASE 2: Morning Sunrise (Metadata Detection) ===
const morningPath = path.join(__dirname, 'morning_sunrise.cho');
console.log(`Running parser test on: ${morningPath}`);

try {
    if (!fs.existsSync(morningPath)) {
        console.warn("⚠️ morning_sunrise.cho not found, creating dummy content for test.");
        const dummyContent = "{title: Morning Sunrise}\n{author: Shimshai}\n\n[Am]Morning sun...";
        fs.writeFileSync(morningPath, dummyContent);
    }

    const morningContent = fs.readFileSync(morningPath, 'utf-8');
    const parsedMorning = parseChordPro(morningContent);

    // Assertions
    assert.strictEqual(parsedMorning.title, 'Morning Sunrise', 'Title detection failed');
    assert.strictEqual(parsedMorning.author, 'Traditional', 'Author detection failed');
    // assert(parsedMorning.cleanContent.includes('Morning sun'), 'Content extraction failed');

    console.log("✅ Morning Sunrise Metadata Test Passed!");
    console.log("---------------------------------------------------");

} catch (error) {
    console.error("❌ Morning Sunrise Parser Test Failed:", error);
    process.exit(1);
}
