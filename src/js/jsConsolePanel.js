/// <reference path="../typings/tsd.d.ts" />
"use strict";
var JsTutorial;
(function (JsTutorial) {
    var JsConsolePanelController = (function () {
        function JsConsolePanelController() {
            var _this = this;
            this.cursor = '>'; // set it to whatever you want to appear as the console cursor
            this.codemirrorLoaded = function (editor) {
                var self = _this;
                self.editor = editor;
                self.editor.setSize('100%', '100%');
                var doc = editor.getDoc();
                doc.replaceRange("" + self.cursor, { line: 0, ch: 0 }, { line: 0, ch: 0 });
                doc.markText({ line: 0, ch: 0 }, { line: 1, ch: 0 }, { readOnly: true });
            };
            var self = this;
            self.api = self; //expose the API
            self.sandboxOn = true;
            self._editorOptions = {
                mode: 'javascript',
                smartIndent: true,
                lineNumbers: true,
                indentUnit: 4,
                showCursorWhenSelecting: true,
                autofocus: true,
            };
        }
        JsConsolePanelController.prototype.setSandboxMode = function (sandboxOn) {
            var self = this;
            self.sandboxOn = sandboxOn;
        };
        Object.defineProperty(JsConsolePanelController.prototype, "editorOptions", {
            get: function () {
                return this._editorOptions;
            },
            enumerable: true,
            configurable: true
        });
        JsConsolePanelController.prototype.executeContent = function () {
            var self = this;
            var retVal;
            if (self.editor) {
                var message = null;
                var content = self.getContent();
                if (content) {
                    try {
                        if (self.sandboxOn)
                            retVal = eval.call(window, content);
                        else
                            retVal = eval(content);
                        message = "" + retVal;
                    }
                    catch (exception) {
                        if (exception.stack) {
                            message = "\n" + exception.stack;
                        }
                        else {
                            message = "\nError: " + exception;
                        }
                    }
                }
                if (message) {
                    self.addConsoleOutput(message);
                }
            }
        };
        JsConsolePanelController.prototype.getLastReadonlyPosition = function () {
            var self = this;
            var lastReadonlyPosition = { line: 0, ch: 0 };
            if (self.editor) {
                var doc = self.editor.getDoc();
                var marks = doc.getAllMarks();
                _.forEach(marks, function (current) {
                    var currRange = current.find();
                    var currPos = currRange.to;
                    if (currPos.line == lastReadonlyPosition.line) {
                        if (currPos.ch > lastReadonlyPosition.ch)
                            lastReadonlyPosition = currPos;
                    }
                    else if (currPos.line > lastReadonlyPosition.line) {
                        lastReadonlyPosition = currPos;
                    }
                });
            }
            return lastReadonlyPosition;
        };
        // Return the currrently editable content (that can be evaluated)
        JsConsolePanelController.prototype.getContent = function () {
            var self = this;
            if (self.editor) {
                var doc = self.editor.getDoc();
                var lastReadonlyPosition = self.getLastReadonlyPosition();
                var numLines = doc.lineCount();
                return doc.getRange(lastReadonlyPosition, { line: numLines, ch: 0 });
            }
            return "";
        };
        JsConsolePanelController.prototype.addConsoleOutput = function (outputContent) {
            var self = this;
            if (self.editor) {
                var doc = self.editor.getDoc();
                var lineStart = doc.lineCount();
                outputContent = "\n" + outputContent;
                doc.replaceRange(outputContent, { line: lineStart, ch: 0 }, { line: lineStart, ch: 0 });
                var lineEnd = doc.lineCount();
                doc.markText({ line: 0, ch: 0 }, { line: lineEnd, ch: 0 }, { readOnly: true, css: "color:#aaa; font-style:italic", className: "readOnlyText" });
                doc.replaceRange("\n" + self.cursor, { line: lineEnd, ch: 0 }, { line: lineEnd, ch: 0 });
                doc.markText({ line: 0, ch: 0 }, { line: lineEnd + 1, ch: 0 }, { readOnly: true });
            }
        };
        JsConsolePanelController.prototype.setContent = function (jsContentt) {
            var self = this;
        };
        JsConsolePanelController.prototype.clear = function () {
            var self = this;
            if (self.editor)
                self.editor.getDoc().setValue("");
        };
        JsConsolePanelController.prototype.makeAllReadOnly = function () {
            var self = this;
            if (self.editor) {
                var doc = self.editor.getDoc();
                var numLines = doc.lineCount();
                var existingMarks = doc.getAllMarks();
                if (existingMarks)
                    _.forEach(existingMarks, function (marker) { marker.clear(); });
                //TODO remove css entry (only className should be used with a more specific selector)
                doc.markText({ line: 0, ch: 0 }, { line: numLines, ch: 0 }, { readOnly: true, css: "color:#aaa", className: "readOnlyText" });
                doc.replaceRange("\n" + self.cursor, { line: numLines, ch: 0 }, { line: numLines, ch: 0 });
                doc.markText({ line: 0, ch: 0 }, { line: numLines + 1, ch: 0 }, { readOnly: true });
            }
        };
        JsConsolePanelController.$inject = [];
        return JsConsolePanelController;
    })();
    var JsConsolePanelDirective = (function () {
        function JsConsolePanelDirective() {
            var _this = this;
            this.restrict = 'E';
            this.controllerAs = 'jc';
            this.bindToController = true;
            this.controller = JsConsolePanelController;
            this.scope = {
                api: '='
            };
            this.templateUrl = 'js/jsConsolePanel.html';
            this.link = function (scope, element, attrs, controller) {
                var self = _this;
            };
        }
        JsConsolePanelDirective.instance = function () {
            return new JsConsolePanelDirective();
        };
        return JsConsolePanelDirective;
    })();
    angular.module("jsConsole").directive('rwJsConsolePanel', JsConsolePanelDirective.instance);
})(JsTutorial || (JsTutorial = {}));
