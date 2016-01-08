/// <reference path="../typings/tsd.d.ts" />
"use strict";
var JsTutorial;
(function (JsTutorial) {
    var JsTutorialController = (function () {
        function JsTutorialController($scope) {
            var vm = this;
        }
        JsTutorialController.prototype.onPrevious = function () {
            var vm = this;
        };
        JsTutorialController.prototype.onNext = function () {
            var vm = this;
        };
        JsTutorialController.$import = ["$scope"];
        return JsTutorialController;
    })();
    angular.module("modificationEditor").controller("modificationEditor", JsTutorialController);
})(JsTutorial || (JsTutorial = {}));
