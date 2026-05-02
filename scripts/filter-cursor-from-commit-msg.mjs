/**
 * commit-msg hook: strip Cursor marketing and Co-authored-by trailers
 * from the message file Git passes as argv[2].
 */
import fs from 'node:fs';

const msgFile = process.argv[2];
if (!msgFile || !fs.existsSync(msgFile)) {
  process.exit(0);
}

let text = fs.readFileSync(msgFile, 'utf8');
const lines = text.split(/\r?\n/);

const shouldDrop = (line) => {
  const t = line.trim();
  if (t === '') {
    return false;
  }
  if (/^co-authored-by:\s*cursor\b/i.test(t)) {
    return true;
  }
  if (/^co-authored-by:.*cursoragent@cursor\.com/i.test(t)) {
    return true;
  }
  if (/^made with\s*\[cursor\]/i.test(t)) {
    return true;
  }
  if (/cursor\.com/i.test(t) && /made with|\[cursor\]/i.test(t)) {
    return true;
  }
  return false;
};

const kept = lines.filter((line) => !shouldDrop(line));
while (kept.length > 0 && kept[kept.length - 1].trim() === '') {
  kept.pop();
}
text = kept.join('\n');
if (text.length > 0 && !text.endsWith('\n')) {
  text += '\n';
}

fs.writeFileSync(msgFile, text, 'utf8');
