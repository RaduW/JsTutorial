/// <reference path="../typings/tsd.d.ts" />
"use strict";
var JsTutorial;
(function (JsTutorial) {
    var MarkdownPanelController = (function () {
        function MarkdownPanelController() {
            var self = this;
            self.api = self; //expose the API
            self.documentContent = "";
        }
        MarkdownPanelController.prototype.setContent = function (documentContent) {
            var self = this;
            self.documentContent = documentContent; //self.$sce.trustAsHtml(documentContent);
        };
        MarkdownPanelController.$inject = [];
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
