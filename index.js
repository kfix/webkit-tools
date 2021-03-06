/*
  Copyright (C) 2016 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

var xcode = require('xcode'),
    fs = require('fs'),
    util = require('util');

var projectPath = 'JavaScriptCore.xcodeproj/project.pbxproj';
var project = xcode.project(projectPath);

function addJSCHeaderFile(project, fileName, groupName)
{
    // var group = project.pbxGroupByName('parser');
    // var groupKey = project.findPBXGroupKey({ path: 'parser' });
    // var target = project.pbxTargetByName('JavaScriptCore');
    // var targetKey = project.findTargetKey('JavaScriptCore');

    var groupKey = project.findPBXGroupKey({ path: groupName });
    var targetKey = project.findTargetKey('JavaScriptCore');

    var file = project.addHeaderFile(fileName, {
        target: targetKey
    }, groupKey);
    file.settings = {
        ATTRIBUTES: [ 'Private' ]
    };
}

function addJSCSourceFile(project, fileName, groupName)
{
    var groupKey = project.findPBXGroupKey({ path: groupName });
    var targetKey = project.findTargetKey('JavaScriptCore');

    var file = project.addSourceFile(fileName, {
        target: targetKey
    }, groupKey);
}

// Example.
project.parse(function (err) {
    addJSCHeaderFile(project, 'MachineContext.h', 'runtime');
    // addJSCSourceFile(project, 'ModuleScopeData.cpp', 'parser');
    fs.writeFileSync(projectPath, project.writeSync());
    console.log('new project written');
});

/* vim: set sw=4 ts=4 et tw=80 : */
