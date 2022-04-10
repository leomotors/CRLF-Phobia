# CRLF-Phobia

[![](https://img.shields.io/npm/v/crlf-phobia.svg?maxAge=3600)](https://www.npmjs.com/package/crlf-phobia)
 [![](https://img.shields.io/npm/dt/crlf-phobia.svg?maxAge=3600)](https://www.npmjs.com/package/crlf-phobia)

CRLF can cause disaster on your app sometimes.

Run this simple ~~inefficient~~ app to scan your project files and it will warn
you if there is a file with CRLF endings.

This app will ignore files ignored by .gitignore by default if exists, It also ignores binary files.
You cannot add or remove ignore files right now, ~~because I'm lazy~~

### Installation:

```bash
npm i -g crlf-phobia # Global
npm i -D crlf-phobia # To hook with unit test locally
```

### Usage:

```bash
crlf-phobia *.cpp # All CPP
crlf-phobia * # All Files exclude gitignored (for zsh, for PowerShell idk)
```

*Note*: CRLF-Phobia support both shell glob (Glob done by shell before parsing argv into program) and also shipped with glob ~~in case your shell is lazy.~~

### Q: Isn't there already an npm package that can do this?

### A: Yes

### Q: So how is yours different?

### A: Colors and MEMES

#### jk, this one is designed with "crlf-phobia" in mind. 

「駆逐してやる このプロジェックから、一匹残らず」

*I will wipe out every single CRLF from this project.*

## Limitation

- Awful performance: This library check for whole file to make sure **not**
a *single CRLF can survive!*

- Can only detect CRLF, because who use CR nowadays?

## TODO

- Auto-Transform CRLF into LF

- Add/Remove ignore lists

## Advanced Usage

Run before test:

```json
"test": "crlf-phobia * && yarn real-test"
```

Run with GitHub Workflow

```yml
name: CRLF Phobia

on:
  push:

jobs:
  main:
    name: NO CRLF
    runs-on: ubuntu-latest

    steps:
      - name: actions/checkout
        uses: actions/checkout@v2
      - name: Yarn Cache
        uses: c-hive/gha-yarn-cache@v2
      - name: Add CRLF-Phobia
        run: yarn add crlf-phobia
      - name: Run CRLF-Phobia
        run: yarn crlf-phobia *
```
