# foozle

> A text adventure game engine built with TypeScript.

## Installation

To run the app locally, clone it down and install dependencies:

```bash
git clone https://github.com/akuny/foozle.git
cd foozle
npm install
```

Now you can start it up:

```bash
npm start
```

## Structure

foozle's `index.js` file is a very simple server that exposes the
bundled app. Most of the action is in the `src/` directory.

As-is, foozle expects to load `src/disk.json` when it runs. The `disk` object
is the game itself, which comprises two properties:

```json
"player": {
    "alive": true,
    "inventory": []
}

"rooms": [
    {
        "name": "The Room's Name",
        "hasPlayer": true,
        "connections": [],
        "roomStates": [],
        "items": []
    }
]
```

You'll find definitions of connections, roomStates, and items in `src/ts/types/index.js`.

## Inspiration

foozle's design was largely pieced together using examples from Michael J. Roberts'
[TADS 2 Author's Manual](https://www.tads.org/t2doc/doc/index.html) and
the original [Zork source code](https://github.com/devshane/zork).
