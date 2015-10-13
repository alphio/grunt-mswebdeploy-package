# grunt-mswebdeploy

> Create Microsoft(TM) Web Deploy Packages With Grunt on Any Platform

## Introduction
grunt-mswebdeploy allows you to bundle you site file into a Microsoft(TM) compatible web deploy file that can be used to publish to IIS. It is useful for creating build for JavaScript \ HTML project that are built and publish with Visual Studio Online of TFS.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-mswebdeploy --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mswebdeploy');
```

## The "mswebdeploy" task

### Overview
In your project's Gruntfile, add a section named `mswebdeploy` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  mswebdeploy: {
    options: {
      options : {
          'dest' : 'build/',
          'source' : 'test',
          'package' : 'test.zip',
          }
    }
  },
});
```
This sample creates a web deploy package using the files in 'test' in a folder called 'build' named 'test.zip' The folder structure of the source folder will be maintained in the package. There is currently no way to add individual files.
### Options

#### options.source
Type: `String`
Default value: `'dist/'`

The folder containg the source to package.

#### options.dest
Type: `String`
Default value: `'deploy/'`

The folder in which the package will be written.

#### options.package
Type: `String`
Default value: `'webdeploy.zip`

The name of the web deploy package

### Usage Examples

#### Default Options
This example will package all the files in the 'dist' folder into a file called webdeploy.zip and place it in the 'deploy' folder.

```js
grunt.initConfig({
  mswebdeploy: {
    options: {},
  },
});
```

#### Custom Options
This sample creates a web deploy package using the files in 'test' in a folder called 'build' named 'test.zip' The folder structure of the source folder will be maintained in the package. There is currently no way to add individual files.

```js
grunt.initConfig({
  mswebdeploy: {
    options: {
      options : {
          'dest' : 'build/',
          'source' : 'test',
          'package' : 'test.zip',
          }
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.10.0 : Beta Release

0.10.1 : Updated documentation
# grunt-mswebdeploy
