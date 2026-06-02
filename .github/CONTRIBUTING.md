# Contributing

## Setup

Install dependencies:

```bash
npm install
```

## Test

To test the site:

```bash
npm test
```

## Build

To build the site:

```bash
npm run build
```

The built site will be available in the `out` folder.

## Dev

While making updates, the dev script will run a server which auto-refreshes any time a source file is changed.

```bash
npm run dev
```

## Deploy

https://developers.cloudflare.com/pages/get-started/

```bash
npm ci && npm run build
```

## Updates

To update all dependencies, run:

```bash
npm run update
```
