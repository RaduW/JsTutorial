/// <reference path="../typings/tsd.d.ts" />
"use strict";
var JsTutorial;
(function (JsTutorial) {
    var OutputPanelController = (function () {
        function OutputPanelController() {
            var _this = this;
            this.codemirrorLoaded = function (editor) {
                var self = _this;
                self.editor = editor;
                self.editor.setSize('100%', '100%');
            };
            var self = this;
            self.api = self; //expose the API
            self._editorOptions = {
                mode: { name: "javascript", json: true },
                smartIndent: true,
                indentUnit: 4,
                showCursorWhenSelecting: true,
                autofocus: false,
                readOnly: true
            };
            //publish api to be usable from the console
            window.out = self.out.bind(self);
        }
        Object.defineProperty(OutputPanelController.prototype, "editorOptions", {
            get: function () {
                return this._editorOptions;
            },
            enumerable: true,
            configurable: true
        });
        OutputPanelController.prototype.out = function () {
            var vals = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                vals[_i - 0] = arguments[_i];
            }
            var self = this;
            var result = '';
            for (var _a = 0; _a < vals.length; _a++) {
                var val = vals[_a];
                var stringVal = '';
                if (val === undefined)
                    stringVal = 'undefined';
                else if (val === null)
                    stringVal = 'null';
                else
                    stringVal = JSON.stringify(val, null, '\t');
                result += stringVal + '\n';
            }
            self.addContent(result);
        };
        OutputPanelController.prototype.addContent = function (outputContent) {
            var self = this;
            if (self.editor) {
                var doc = self.editor.getDoc();
                var lineStart = doc.lineCount();
                outputContent = outputContent + "\n";
                doc.replaceRange(outputContent, { line: 0, ch: 0 }, { line: 0, ch: 0 });
            }
        };
        OutputPanelController.prototype.clear = function () {
            var self = this;
            if (self.editor) {
                var doc = self.editor.getDoc();
                doc.setValue("");
            }
        };
        OutputPanelController.$inject = [];
        return OutputPanelController;
    })();
    var OutputPanelDirective = (function () {
        function OutputPanelDirective() {
            var _this = this;
            this.restrict = 'E';
            this.controllerAs = 'op';
            this.bindToController = true;
            this.controller = OutputPanelController;
            this.scope = {
                api: '='
            };
            this.templateUrl = 'js/outputPanel.html';
            this.link = function (scope, element, attrs, controller) {
                var self = _this;
            };
        }
        OutputPanelDirective.instance = function () {
            return new OutputPanelDirective();
        };
        return OutputPanelDirective;
    })();
    angular.module("jsTutorial").directive('rwOutputPanel', OutputPanelDirective.instance);
})(JsTutorial || (JsTutorial = {}));
