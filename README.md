# ts

Simple TypeScript types and (JavaScript) extensions I commonly use.

## Installation

```shell
npm i github:pihart/ts
```

To lock a version (e.g. 2.1.0), use

```shell
npm i github:pihart/ts#v2.1.0
```

<!--
## Files

### [error.ts]

#### `class CustomError extends Error`

**JAVASCRIPT, NOT JUST A TYPE**

Sets custom name for error via constructor.
Extend this if you want custom names in errors.

Note that if you have a minifier which minifies the name of the extending class, this will set the name to the minified name.

#### e

### [misc.ts]

### [network.ts]
-->

## Development

All library file exports are exported via [index.ts].

[error.ts]: src/lib/error.ts
[misc.ts]: src/lib/misc.ts
[network.ts]: src/lib/network.ts
[index.ts]: src/index.ts
