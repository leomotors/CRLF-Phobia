import { program } from "commander";

import globby from "globby";
import * as fs from "node:fs";
import chalk from "chalk";

program.parse();

const files = globby.sync(process.argv.slice(2));

function shortenFileName(str: string, len: number) {
    if (str.length > len) {
        return (
            str.slice(0, 10) + "..." + str.slice(str.length - 37, str.length)
        );
    }
    return str;
}

const maxFileLength = Math.min(
    50,
    Math.max(...files.map((file) => file.length))
);

const crlflists: string[] = [];

for (const file of files) {
    const sfile = shortenFileName(file, 50);

    const isCRLF = fs
        .readFileSync(file)
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
}
