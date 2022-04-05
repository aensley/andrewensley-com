# Contributing

## Setup

### Template

| Name         | License            | Version | Last Updated | Built With       |
| ------------ | ------------------ | ------- | ------------ | ---------------- |
| [MyResume Pro](https://bootstrapmade.com/free-html-bootstrap-template-my-resume/) | Unlimited Websites | 4.7.0   | 2021-11-21   | Bootstrap v5.1.3 |

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

### Font Awesome

#### Search

Search for icons to use here: https://fontawesome.com/v5/search

#### In Use

Below are the lists of icons currently in use.

##### fab

* fa-garmin-connect (custom, added)
* fa-git-alt
* fa-github
* fa-linkedin
* fa-pluralsight (custom, added)
* fa-stack-overflow

##### fas

* fa-address-card
* fa-bars
* fa-biking-mountain
* fa-chevron-right
* fa-chevron-up
* fa-drum
* fa-envelope
* fa-exchange
* fa-file-chart-line
* fa-file-user
* fa-futbol
* fa-guitar-electric
* fa-hiking
* fa-home
* fa-map-marker-alt
* fa-mobile
* fa-tasks-alt
* fa-times

#### Update

1. Download the latest "Pro For Web" package here: https://fontawesome.com/v5/download
1. From the downloaded .zip, extract the `js/brands.js` file to `/src/assets/vendor/fontawesome/custom.js`
   1. Reduce the set of icons to what is listed above under [fab](#fab)
1. From the downloaded .zip, append the `js/solid.js` file to `/src/assets/vendor/fontawesome/custom.js`
   1. Reduce the set of icons to what is listed above under [fas](#fas)
1. From the downloaded .zip, append the `js/fontawesome.js` file to `/src/assets/vendor/fontawesome/custom.js`
