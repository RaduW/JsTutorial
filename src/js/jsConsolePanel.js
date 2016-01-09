/// <reference path="../typings/tsd.d.ts" />
"use strict";
var JsTutorial;
(function (JsTutorial) {
    var JsConsolePanelController = (function () {
        function JsConsolePanelController() {
            var _this = this;
            this.codemirrorLoaded = function (editor) {
                var self = _this;
                self.editor = editor;
                self.editor.setSize('100%', '100%');
            };
            var self = this;
            self.api = self; //expose the API
            self._editorOptions = {
                mode: 'javascript',
                smartIndent: true,
                lineNumbers: true,
                indentUnit: 4,
                showCursorWhenSelecting: true,
                autofocus: true,
            };
        }
        Object.defineProperty(JsConsolePanelController.prototype, "editorOptions", {
            get: function () {
                return this._editorOptions;
            },
            enumerable: true,
            configurable: true
        });
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
                doc.markText({ line: 0, ch: 0 }, { line: numLines, ch: 0 }, { readOnly: true, css: "background-color:#eee" });
                doc.replaceRange("\nhello", { line: numLines, ch: 0 }, { line: numLines, ch: 0 });
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
