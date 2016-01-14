/// <reference path="../typings/tsd.d.ts" />
"use strict";
var JsTutorial;
(function (JsTutorial) {
    var JsTutorialController = (function () {
        function JsTutorialController(hotkeys, scriptLoader) {
            this.scriptLoader = scriptLoader;
            var self = this;
            self.sandboxOn = true;
            self.currentSlide = 0;
            self.numSlides = 0;
            hotkeys.add({
                combo: "ctrl+enter",
                description: "Execute javascript",
                callback: function (event, hotkey) { self.onRun(); },
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA']
            });
            hotkeys.add({
                combo: "alt+p",
                description: "Previous slide",
                callback: function (event, hotkey) { self.onPrevious(); },
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA']
            });
            hotkeys.add({
                combo: "alt+n",
                description: "Next slide",
                callback: function (event, hotkey) { self.onNext(); },
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA']
            });
            hotkeys.add({
                combo: "alt+del",
                description: "clear javascript panel",
                callback: function (event, hotkey) { self.onClear(); },
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA']
            });
            self.scriptLoader.loadScript('js/course.js').then(function (response) {
                if (response) {
                    self.slides = response;
                    self.numSlides = response.length;
                    self.currentSlide = 0;
                    self.diplayCurrentSlide();
                }
            });
        }
        JsTutorialController.prototype.diplayCurrentSlide = function () {
            var self = this;
            if (self.currentSlide < self.numSlides) {
                self.markdownPanel.setContent(self.slides[self.currentSlide].doc);
                self.jsConsolePanel.setContent(self.slides[self.currentSlide].script);
            }
        };
        JsTutorialController.prototype.onMenu = function () {
            var self = this;
            if (self.markdownPanel)
                self.markdownPanel.setContent("# This is a header ");
        };
        JsTutorialController.prototype.onPrevious = function () {
            var self = this;
            if (self.currentSlide > 0) {
                self.currentSlide--;
                self.diplayCurrentSlide();
            }
        };
        JsTutorialController.prototype.onNext = function () {
            var self = this;
            if (self.currentSlide < self.numSlides - 1) {
                self.currentSlide++;
                self.diplayCurrentSlide();
            }
        };
        JsTutorialController.prototype.onSandbox = function (sandboxOn) {
            var self = this;
            self.sandboxOn = sandboxOn;
            if (self.jsConsolePanel)
                self.jsConsolePanel.setSandboxMode(sandboxOn);
        };
        JsTutorialController.prototype.onClear = function () {
            var self = this;
            if (self.jsConsolePanel)
                self.jsConsolePanel.clear();
        };
        JsTutorialController.prototype.onRun = function () {
            var self = this;
            if (self.jsConsolePanel)
                self.jsConsolePanel.executeContent();
        };
        JsTutorialController.$import = ['hotkeys', 'scriptLoader'];
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
