/// <reference path="../typings/tsd.d.ts" />
"use strict";
var JsTutorial;
(function (JsTutorial) {
    var MarkdownPanelController = (function () {
        function MarkdownPanelController($sce) {
            this.$sce = $sce;
            var self = this;
            self.api = self; //expose the API
            self.documentContent = "# This is a header \n\nthis is some text\n## This is a h2\n\n* a point\n* and another one\n   * inside\n\n```js\n    /*\n        some comment here\n    */\n    function f(){\n        //a line comment\n        this.a= 33;\n        var x = \"abc\";\n        return 145;\n    }\n```\nSome text goes here\n\n";
        }
        MarkdownPanelController.prototype.setContent = function (documentContent) {
            var self = this;
            self.documentContent = documentContent; //self.$sce.trustAsHtml(documentContent);
        };
        MarkdownPanelController.$inject = ['$sce'];
        return MarkdownPanelController;
    })();
    var MarkdownPanelDirective = (function () {
        function MarkdownPanelDirective() {
            var _this = this;
            this.restrict = 'E';
            this.controllerAs = 'mp';
            this.bindToController = true;
            this.controller = MarkdownPanelController;
            this.scope = {
                api: '='
            };
            this.templateUrl = 'js/markdownPanel.html';
            this.link = function (scope, element, attrs, controller) {
                var self = _this;
            };
        }
        MarkdownPanelDirective.instance = function () {
            return new MarkdownPanelDirective();
        };
        return MarkdownPanelDirective;
    })();
    angular.module("jsTutorial").directive('rwMarkdownPanel', MarkdownPanelDirective.instance);
})(JsTutorial || (JsTutorial = {}));
