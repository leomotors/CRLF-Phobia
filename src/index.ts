import chalk from "chalk";
import { program } from "commander";
import { globby } from "globby";
import ignore, { Ignore } from "ignore";

// @ts-ignore
import { isText } from "istextorbinary";

import * as fs from "node:fs/promises";

import { Version } from "./config.g.js";

program
  .name("CRLF Phobia")
  .description("Scared of CRLF, panics if there is any CRLF exists")
  .version(Version);

program.parse();

const files = await globby(process.argv.slice(2));

function shortenFileName(str: string, len: number) {
  if (str.length > len) {
    return (
      str.slice(0, 20) + "..." + str.slice(str.length - len + 23, str.length)
    );
  }
  return str;
}

// @ts-ignore
const ig = ignore() as Ignore;
ig.add(".git");
const ignoreFiles = [".gitignore", ".crlfignore"];

for (const ignoreFile of ignoreFiles) {
  try {
    ig.add(
      (await fs.readFile(ignoreFile, "utf-8"))
        .split("\n")
        .filter((line) => line.length && !line.startsWith("#"))
    );
  } catch (err) {
    // File not exist
  }
}

const filteredFiles = ig.filter(files);

const maxFileLength = Math.min(
  80,
  Math.max(...filteredFiles.map((file) => file.length))
);

const crlflists: string[] = [];

for (const file of filteredFiles) {
  const fileBuffer = await fs.readFile(file);

  if (!isText(null, fileBuffer)) continue;

  const sfile = shortenFileName(file, maxFileLength);

  const isCRLF = fileBuffer
    .toString()
    .split("\n")
    .some((line) => line.endsWith("\r"));

  if (isCRLF) crlflists.push(file);

  console.log(
    `${sfile}${" ".repeat(maxFileLength - sfile.length)} => ${
      isCRLF ? chalk.red("CRLF") : chalk.green("LF")
    }`
  );
}

if (crlflists.length > 0) {
  console.log(`\n${chalk.cyan("PANIC CRLF!!!")}`);
  for (const file of crlflists) {
    console.log(chalk.red(file));
  }
  process.exit(1);
} else {
  console.log(chalk.green("Your folder is CRLF-Free! Yay!"));
  process.exit(0);
}
