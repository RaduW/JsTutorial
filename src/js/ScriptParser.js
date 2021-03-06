/// <reference path="../typings/tsd.d.ts" />
"use strict";
var JsConsole;
(function (JsConsole) {
    'use strict';
    var ScriptChunk = (function () {
        function ScriptChunk(doc, script) {
            this.doc = doc;
            this.script = script;
        }
        return ScriptChunk;
    })();
    JsConsole.ScriptChunk = ScriptChunk;
    var ScriptParser = (function () {
        function ScriptParser() {
        }
        ScriptParser.prototype.loadScript = function (script) {
            var retVal = [];
            if (!script)
                return retVal;
            var position = 0;
            var scriptLength = script.length;
            while ((position = script.indexOf("/*--", position)) != -1) {
                position += 4;
                var addPreviousComment = script[position] == '+';
                var beginOfDoc = script.indexOf("\n", position) + 1;
                var endOfDoc = script.indexOf("*/", beginOfDoc);
                position = endOfDoc + 3;
                var beginOfScript = position;
                var endOfScript = script.indexOf('/*--', position);
                var scriptChunk = null;
                if (endOfScript < 0)
                    scriptChunk = script.substring(beginOfScript);
                else
                    scriptChunk = script.substring(beginOfScript, endOfScript);
                var docChunk = script.substring(beginOfDoc, endOfDoc);
                if (addPreviousComment) {
                    //additive comment (the previous comment plus current comment, used in presentation style slides)
                    if (retVal.length > 0) {
                        //add the previous comment to the current one
                        docChunk = retVal[retVal.length - 1].doc + "\n\n\n" + docChunk;
                    }
                }
                retVal.push(new ScriptChunk(docChunk.trim(), scriptChunk.trim()));
            }
            return retVal;
        };
        return ScriptParser;
    })();
    JsConsole.ScriptParser = ScriptParser;
    angular
        .module('jsConsole')
        .service('scriptParser', ScriptParser);
})(JsConsole || (JsConsole = {}));
