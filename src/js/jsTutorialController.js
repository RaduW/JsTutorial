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
    angular.module("jsTutorial").controller("jsTutorialController", JsTutorialController);
})(JsTutorial || (JsTutorial = {}));
