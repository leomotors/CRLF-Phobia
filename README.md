# CRLF-Phobia

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

*Note*: CRLF-Phobia use your shell to glob files

### Q: Isn't there already an npm package that can do this?

### A: Yes

### Q: So how is yours different?

### A: Colors and MEMES (~~and less efficient~~ to be fixed)

## TODO

- Make it efficient

- Auto-Transform

- Auto ignore gitignored files
