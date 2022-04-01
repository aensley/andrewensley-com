const { watch, src, dest, series } = require('gulp')
const del = require('del')
const fileInclude = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const replace = require('gulp-replace')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')(require('sass'))
const imagemin = require('gulp-imagemin')
const realFavicon = require('gulp-real-favicon')
const sourcemaps = require('gulp-sourcemaps')
const fs = require('fs')
let packageJson

const paths = {
  cloudflareMeta: {
    src: 'src/_*',
    dest: 'dist/'
  },
  cloudflareFunctions: {
    src: 'src/functions/*.ts',
    dest: 'dist/functions/'
  },
  html: {
    src: 'src/*.html',
    dest: 'dist/'
  },
  htmlinclude: 'src/include/*.html',
  img: {
    src: 'src/assets/img/*',
    dest: 'dist/assets/img/'
  },
  js: {
    src: 'src/assets/js/*.js',
    dest: 'dist/assets/js/'
  },
  scss: {
    src: 'src/assets/scss/*.scss',
    dest: 'dist/assets/css/'
  },
  vendorJs: {
    src: 'src/assets/vendor/**/*.js',
    dest: 'dist/assets/vendor/'
  }
}

// Get Package information from package.json
function getPackageInfo (cb) {
  packageJson = JSON.parse(fs.readFileSync('./package.json'))
  cb()
}

// Wipe the dist directory
function clean (cb) {
  del(['dist/', 'src/faviconData.json'])
  cb()
}

// Copy Cloudflare Pages Meta Info
function cloudflareMeta (cb) {
  src(paths.cloudflareMeta.src).pipe(dest(paths.cloudflareMeta.dest))
  cb()
}

// Minify HTML
function html (cb) {
  src(paths.html.src)
    .pipe(fileInclude())
    .pipe(
      replace(/\{\{([\S]+)\.version\}\}/g, function (match, p1) {
        // See https://mdn.io/string.replace#Specifying_a_function_as_a_parameter
        return packageJson.extLinks[p1]
      })
    )
    .pipe(
      htmlmin({
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        includeAutoGeneratedTags: false,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      })
    )
    .pipe(dest(paths.html.dest))
  cb()
}

// Minify JavaScript
function js (cb) {
  src(paths.js.src)
    .pipe(replace('{commit_hash}', process.env.CF_PAGES_COMMIT_SHA))
    .pipe(replace('{branch_name}', process.env.CF_PAGES_BRANCH))
    .pipe(replace('{environment}', process.env.CF_PAGES_BRANCH === 'main' ? 'production' : 'development'))
    .pipe(replace('{package_name}', packageJson.name))
    .pipe(replace('{package_version}', packageJson.version))
    .pipe(sourcemaps.init())
    .pipe(uglify({ toplevel: true }))
    .pipe(sourcemaps.write('../maps'))
    .pipe(dest(paths.js.dest))
  src(paths.vendorJs.src)
    .pipe(sourcemaps.init())
    .pipe(uglify({ toplevel: true }))
    .pipe(sourcemaps.write('../maps'))
    .pipe(dest(paths.vendorJs.dest))
  cb()
}

// Copy Cloudflare Functions
function cloudflareFunctions (cb) {
  src(paths.cloudflareFunctions.src)
    .pipe(replace('{package_name}', packageJson.name))
    .pipe(replace('{package_version}', packageJson.version))
    .pipe(dest(paths.cloudflareFunctions.dest))
  cb()
}

// Compile SCSS
function scss (cb) {
  src(paths.scss.src)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(dest(paths.scss.dest))
  cb()
}

// Compress images
function img (cb) {
  src(paths.img.src)
    .pipe(
      imagemin([
        imagemin.gifsicle({
          optimizationLevel: 3,
          colors: 128,
          interlaced: true
        }),
        imagemin.mozjpeg({ quality: 70, progressive: true }),
        imagemin.optipng({ optimizationLevel: 7 }),
        imagemin.svgo()
      ])
    )
    .pipe(dest(paths.img.dest))
  cb()
}

// File where the favicon markups are stored
const FAVICON_DATA_FILE = 'src/faviconData.json'

// Generate the favicon
function generateFavicon (cb) {
  return realFavicon.generateFavicon(
    {
      masterPicture: 'src/icon.png',
      dest: 'dist/',
      iconsPath: '/',
      design: {
        ios: {
          pictureAspect: 'backgroundAndMargin',
          backgroundColor: '#ffffff',
          margin: '21%',
          assets: {
            ios6AndPriorIcons: false,
            ios7AndLaterIcons: false,
            precomposedIcons: false,
            declareOnlyDefaultIcon: true
          },
          appName: 'Andrew Ensley'
        },
        desktopBrowser: {
          design: 'raw'
        },
        windows: {
          pictureAspect: 'whiteSilhouette',
          backgroundColor: '#930000',
          onConflict: 'override',
          assets: {
            windows80Ie10Tile: false,
            windows10Ie11EdgeTiles: {
              small: false,
              medium: true,
              big: false,
              rectangle: false
            }
          },
          appName: 'Andrew Ensley'
        },
        androidChrome: {
          pictureAspect: 'shadow',
          themeColor: '#ffffff',
          manifest: {
            startUrl: 'https://andrewensley.com',
            display: 'standalone',
            orientation: 'notSet',
            onConflict: 'override',
            declared: true
          },
          assets: {
            legacyIcon: false,
            lowResolutionIcons: false
          }
        },
        safariPinnedTab: {
          pictureAspect: 'silhouette',
          themeColor: '#930000'
        }
      },
      settings: {
        compression: 5,
        scalingAlgorithm: 'Mitchell',
        errorOnImageTooSmall: false,
        readmeFile: false,
        htmlCodeFile: false,
        usePathAsIs: false
      },
      markupFile: FAVICON_DATA_FILE
    },
    cb
  )
}

// Watch for changes
function watchSrc () {
  console.warn('Watching for changes... Press [CTRL+C] to stop.')
  watch(paths.html.src, html)
  watch(paths.htmlinclude, html)
  watch(paths.img.src, img)
  watch([paths.js.src, paths.vendorJs.src], js)
  watch(paths.scss.src, scss)
}

exports.clean = clean
exports.html = html
exports.js = js
exports.scss = scss
exports.img = img
exports.generateFavicon = generateFavicon
exports.default = series(getPackageInfo, generateFavicon, img, html, cloudflareFunctions, js, scss, cloudflareMeta)
exports.watch = series(getPackageInfo, watchSrc)
