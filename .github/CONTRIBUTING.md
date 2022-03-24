# Contributing

## Setup

### Template

| Name         | License            | Version | Last Updated | Built With       |
| ------------ | ------------------ | ------- | ------------ | ---------------- |
| MyResume Pro | Unlimited Websites | 4.7.0   | 2021-11-21   | Bootstrap v5.1.3 |

[Download](https://bootstrapmade.com/members/)

### Files

The site's contents are structured like so:

```
├── gulpfile.js        Configuration for the gulp task runner
├── package.json       Project definition and dependencies
├── package-lock.json  Last known working set of dependencies versions
└── src                Site contents source
    ├── assets
    │   ├── img        Images
    │   ├── js         JavaScript
    │   ├── scss       SASS/SCSS
    │   └── vendor     Third-party resources and plugins
    ├── contact.html
    ├── donate.html
    ├── icon.png       Site icon
    ├── include        HTML includes
    └── index.html
```

## Test

To test the site:

```bash
$ npm test
```

## Build

To build the site:

1. Install dependencies:

   ```bash
   $ npm install
   ```

1. Build:

   ```bash
   $ npm run build
   ```

The built site will be available in the `dist` folder.

## Watch

While making updates, the watch script will automatically redeploy changes in the `src` directory to the `dist` directory.

```bash
$ npm run watch
```

## Deploy

https://developers.cloudflare.com/pages/get-started/

```bash
$ npm ci && npm run build
```

## Updates

### Bootstrap Icons

1. Download the latest version from: https://github.com/twbs/icons/releases/latest/
1. Extract the following files to `/src/assets/vendor/bootstrap-icons/`:

   ```
   ├── bootstrap-icons.css
   ├── bootstrap-icons.json
   ├── bootstrap-icons.scss
   ├── fonts
   │   ├── bootstrap-icons.woff
   │   └── bootstrap-icons.woff2
   └── index.html
   ```

### Font Awesome

#### Search

Search for icons to use here: https://fontawesome.com/v5/search

#### Update

1. Download the latest "Pro For Web" package here: https://fontawesome.com/v5/download
1. From the downloaded .zip, extract the `js/all.js` file to `/src/assets/vendor/fontawesome/all.js`
