/// <reference path="../typings/tsd.d.ts" />
"use strict";
var JsTutorial;
(function (JsTutorial) {
    var JsConsolePanelController = (function () {
        function JsConsolePanelController() {
            var self = this;
            self.api = self; //expose the API
        }
        JsConsolePanelController.prototype.setContent = function (documentContent) {
            var self = this;
            //self.documentContent = documentContent;//self.$sce.trustAsHtml(documentContent);
        };
        //documentContent: string;
        JsConsolePanelController.$inject = [];
        return JsConsolePanelController;
    })();
    var JsConsolePanelDirective = (function () {
        function JsConsolePanelDirective() {
            var _this = this;
            this.restrict = 'E';
            this.controllerAs = 'mp';
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
