/*
 * grunt-mswebdeploy-package
 * https://github.com/alphio/grunt-mswebdeploy-package
 *
 * Copyright (c) 2015 NOAH HAMBAYI
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('webdeploy', 
  'Create Microsoft(TM) web deploy packages with grunt', 
  function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      "packageName" : "webdeploy.zip"
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
        grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
