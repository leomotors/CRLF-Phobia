# CRLF-Phobia

[![](https://img.shields.io/npm/v/crlf-phobia.svg?maxAge=3600)](https://www.npmjs.com/package/crlf-phobia)
 [![](https://img.shields.io/npm/dt/crlf-phobia.svg?maxAge=3600)](https://www.npmjs.com/package/crlf-phobia)

CRLF can cause disaster on your app sometimes.

Run this simple inefficient app to scan your project files and it will warn
you if there is a file with CRLF endings.

Installation:

```
npm i -g crlf-phobia
```

Usage:

```bash
crlf-phobia *.cpp
```

*Note*: CRLF-Phobia support both shell glob (Glob done by shell before parsing argv into program) and also shipped with glob ~~in case your shell is lazy.~~

### Q: Isn't there already an npm package that can do this?

### A: Yes

### Q: So how is yours different?

### A: Colors and MEMES (~~and less efficient~~ to be fixed)

## Limitation (compared to existing)

- Awful performance: This library check for whole file to make sure **not**
a *single CRLF can survive!*

- Cannot only detect CRLF and LF, because who use CR nowadays?

## TODO

- Auto-Transform CRLF into LF
