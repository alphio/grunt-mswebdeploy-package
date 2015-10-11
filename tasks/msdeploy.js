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
  
  function generateSystemInfoXml(){
    var system_info_xml = builder.create(
      {'systemInfo': {
          '@osVserion' : '6.3',
          '@winDir' : 'c:\\windows',
          '@machineName' : 'NODE-MACHINE',
          '@processorArchitecture' : 'x64',
          '@msdeployVersion' :'1.0',
          '@buildVersion' :'7.1.1955.0',
          'iisSystemInfo': {
            '@iisMajorVersion': '0',
            '@iisMinorVersion' : '0',
            'aspNetVersionInfo' : {
              'aspNetVersion' : {'@version' : '2.0.50727.0'}
            }
          }
        }
      }).end({ pretty: true});
          
    return system_info_xml;
  }
  
  function generateArchiveXml(){
    var archive_xml = builder.create({"MSDeploy.contentPath" : {
      "contentPath" : {
        "MSDeploy.dirPath" : {
          "@path" : "c:\\home"
        }
      }
    }
      
    }).end({ pretty: true});
     return archive_xml;
  }
  
  grunt.registerMultiTask('msdeploy', 
  'Create Microsoft(TM) web deploy packages with grunt', 
  function() {
      var done = this.async();
      var options = this.options(
        { 
          verb : "sync",
          dest : "webdeploy/",
          source : 'dist',
          "package" : 'webdeploy.zip',
          includeAcls : false,
          enabled : true
        });
        
      if(options.enabled){
        mkdirp(options.outputPath, function(err) { 
            grunt.log.writeln("failed to create folder " + options.outputPath);
        });
        
        grunt.log.writeln('Creating web deploy package "' + options.output + options.package + '" from the directory "' + options.sourcePath + '"');
        
        var output = fileSystem.createWriteStream(options.outputPath + options.package);
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
        archive.append(generateArchiveXml(), { name:'archive.xml' });
        archive.append( generateSystemInfoXml(), { name:'systeminfo.xml' });
        archive.finalize();      
      }
  });

};
