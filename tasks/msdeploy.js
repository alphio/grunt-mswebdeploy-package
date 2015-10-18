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
  var builder = require('xmlbuilder');
  var _ = require("lodash");
  var colors = require("colors");

  function generateManifestXml(options){
    var system_info_xml = builder.create(
      {'msdeploy.iisApp': {
        'iisApp' : {
          '@path' : options.source
        }

        }
      }).end({ pretty: true});

    return system_info_xml;
  }

  function generateParametersXml(options){
    var archive_xml = builder.create({"parameters" : {
    }

    }).end({ pretty: true});
     return archive_xml;
  }

  grunt.registerMultiTask('mswebdeploy',
  'Create Microsoft(TM) web deploy packages with grunt',
  function() {
      var done = this.async();
      var options = this.options(
        {
          verb : "sync",
          dest : "webdeploy/",
          source : 'dist/',
          "package" : 'webdeploy.zip',
          includeAcls : false,
          enabled : true
        });

        if( !_.endsWith(options.source, '/') ){
          options.source = options.source + "/";
        }

        if(!_.endsWith(options.dest, '/') ){
          options.dest = options.dest + "/";
        }

      if(options.enabled){
        mkdirp(options.dest, function(err) {
            grunt.log.writeln("WARNING: Failed to create folder '".yellow + options.dest.red.bold + "' or the directory already exists.".yellow);
        });

        grunt.log.writeln('Creating web deploy package "' + options.dest.magenta + options.package.magenta.bold + '" from the directory "' + options.source.magenta + '"');

        var output = fileSystem.createWriteStream(options.dest + options.package);
        var archive = archiver('zip');

        output.on('close', function () {
          grunt.log.writeln(archive.pointer() + ' total bytes');
          grunt.log.writeln("Archive '" + options.dest.magenta + options.package.magenta.bold + ", created");
          done(true);
        });

        archive.on('error', function(err){
            grunt.log.writeln(err.toString().red);
            done(false);
        });

        archive.pipe(output);
        archive.directory(options.source);
        archive.append(generateParametersXml(options), { name:'parameters.xml' });
        archive.append( generateManifestXml(options), { name:'manifest.xml' });
        archive.finalize();
      }
  });

};
