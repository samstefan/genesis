# Genesis
---

Genesis is a grunt tool for easing the build of static websites; by allowing you to code with Jade templates and Stylus.

If you haven't used Grunt before you should checkout the [getting started guide]http://gruntjs.com/getting-started.

Genesis also comes with a few extras, such as a local web server and Javascript minifying.

Dependency:
  - [node.js](http://nodejs.org) `>= 0.8.0`
  - [grunt.js](http://gruntjs.com) `~0.4.0`

## Getting started
---

```
git clone git@github.com:synthmedia/genesis
cd genesis
npm install
grunt
```

## Options
---

The default Grunt task will compile the Jade, Stylus and Javascript in pretty mode, watch for file changes and run the local http server.

`grunt build` will compile the code in pretty mode, but will not run the server or watch the files for changes.

`grunt server` will just run the http server.

`grunt deploy` will minify the CSS, Jade and javascript.

## Release History
---

* v0.1.1 Updated to Grunt 0.4.0, added javascript minifying with debugging and deployment settings.
* v0.1.0 Work in progress, not yet officially released.
