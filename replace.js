// replace.js
import fs from "fs";
import path from "path";

function findFiles(dir, extensions = [".ts", ".svelte"]) {
  const files = [];

  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      files.push(...findFiles(full, extensions));
    } else if (extensions.includes(path.extname(item))) {
      files.push(full);
    }
  }

  return files;
}

const files = findFiles("./src");

for (const file of files) {
  let code = fs.readFileSync(file, "utf8");

  const oldLine = "import { minimalData } from '$lib/data/minimalData';";
  const newLine = "import { masterData } from '$lib/data/masterData';";

  if (code.includes(oldLine)) {
    const updated = code.replace(oldLine, newLine);
    fs.writeFileSync(file, updated, "utf8");
    console.log(`✔ Updated: ${file}`);
  }
}
