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

  var fileSystem = require("fs");
  var archiver = require('archiver');
  var mkdirp = require('mkdirp');
  
  grunt.registerMultiTask('webdeploy', 
  'Create Microsoft(TM) web deploy packages with grunt', 
  function() {
      var done = this.async();
      var options = this.options(
        { 
          enabled : true,
          outputPath : 'webdeploy/',
          sourcePath : 'dist',
          packageName : 'webdeploy.zip'
        });
        
        
        mkdirp(options.outputPath, function(err) { 
            grunt.log.writeln("failed to create folder " + options.outputPath);
        });
      
      if(options.enabled){
        grunt.log.writeln('Creating web deploy package "' + options.outputPath + options.packageName + '" from the directory "' + options.sourcePath + '"');
        
        var output = fileSystem.createWriteStream(options.outputPath + options.packageName);
        var archive = archiver('zip');
        
        output.on('close', function () {
          grunt.log.writeln(archive.pointer() + ' total bytes');
          grunt.log.writeln(options.outputPath + options.packageName + ' created');
          done(true);
        });

        archive.on('error', function(err){
            grunt.log.writeln(err.toString());
            done(false);
        });

        archive.pipe(output);
        grunt.log.writeln('starting archive...');
        archive.directory(options.sourcePath);
          
        archive.finalize();      
      }
  });

};
