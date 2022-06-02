import chalk from "chalk";
import { program } from "commander";
import globby from "globby";
import ignore from "ignore";
import { isText } from "istextorbinary";
import * as fs from "node:fs";

import { Version } from "./config.g";

program
    .name("CRLF Phobia")
    .description("Scared of CRLF, panics if there is any CRLF exists")
    .version(Version);

program.parse();

const files = globby.sync(process.argv.slice(2));

function shortenFileName(str: string, len: number) {
    if (str.length > len) {
        return (
            str.slice(0, 20) +
            "..." +
            str.slice(str.length - len + 23, str.length)
        );
    }
    return str;
}

const ig = ignore();
const ignoreFiles = [".gitignore", ".crlfignore"];

for (const ignoreFile of ignoreFiles) {
    if (!fs.existsSync(ignoreFile)) continue;

    ig.add(
        fs
            .readFileSync(ignoreFile)
            .toString()
            .split("\n")
            .filter((line) => line.length && !line.startsWith("#"))
    );
}

const filteredFiles = ig.filter(files);

const maxFileLength = Math.min(
    80,
    Math.max(...filteredFiles.map((file) => file.length))
);

const crlflists: string[] = [];

for (const file of filteredFiles) {
    const fileBuffer = fs.readFileSync(file);

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
