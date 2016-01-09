/// <reference path="../typings/tsd.d.ts" />
"use strict";
var JsTutorial;
(function (JsTutorial) {
    var JsTutorialController = (function () {
        function JsTutorialController() {
            var vm = this;
        }
        JsTutorialController.prototype.onSetSomeContent = function () {
            var self = this;
            if (self.markdownPanel)
                self.markdownPanel.setContent("# This is a header ");
        };
        JsTutorialController.prototype.onPrevious = function () {
            var vm = this;
        };
        JsTutorialController.prototype.onNext = function () {
            var vm = this;
        };
        JsTutorialController.$import = ["$scope"];
        return JsTutorialController;
    })();
    var JsTutorialDirective = (function () {
        function JsTutorialDirective() {
            var _this = this;
            this.restrict = 'E';
            this.controllerAs = 'jt';
            this.bindToController = true;
            this.controller = JsTutorialController;
            this.scope = {
                api: '='
            };
            this.templateUrl = 'js/jsTutorial.html';
            this.link = function (scope, element, attrs, controller) {
                var self = _this;
            };
        }
        JsTutorialDirective.instance = function () {
            return new JsTutorialDirective();
        };
        return JsTutorialDirective;
    })();
    angular.module("jsConsole").directive('rwJsTutorial', JsTutorialDirective.instance);
})(JsTutorial || (JsTutorial = {}));
