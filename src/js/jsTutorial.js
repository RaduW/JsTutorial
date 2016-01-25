/// <reference path="../typings/tsd.d.ts" />
"use strict";
var JsTutorial;
(function (JsTutorial) {
    var JsTutorialController = (function () {
        function JsTutorialController(hotkeys, scriptLoader, $state, $stateParams) {
            this.scriptLoader = scriptLoader;
            this.$state = $state;
            this.$stateParams = $stateParams;
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
            hotkeys.add({
                combo: "shift+alt+del",
                description: "clear output panel",
                callback: function (event, hotkey) { self.onClearOutput(); },
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA']
            });
            self.scriptLoader.loadScript('course.js').then(function (response) {
                if (response) {
                    self.slides = response;
                    self.numSlides = response.length;
                    var slideId = $stateParams['slideId'];
                    self.tryGoToSlide("" + slideId);
                }
            });
        }
        JsTutorialController.prototype.tryGoToSlide = function (slideId) {
            var self = this;
            var requiredSlide = parseInt(slideId);
            if (isNaN(requiredSlide))
                requiredSlide = 1;
            self.goToPage(requiredSlide - 1);
        };
        JsTutorialController.prototype.goToPage = function (page) {
            var self = this;
            if (self.numSlides == 0)
                return; //we are proably at startup (we can't navigate)
            if (isNaN(page))
                page = 0;
            if (page < 0)
                page = 0;
            if (page >= self.numSlides)
                page = self.numSlides - 1;
            if (page == self.currentSlide)
                return;
            self.currentSlide = page;
            self.diplayCurrentSlide();
            self.$state.go('main.page', { slideId: self.currentSlide + 1 });
        };
        JsTutorialController.prototype.diplayCurrentSlide = function () {
            var self = this;
            if (self.currentSlide < self.numSlides) {
                if (self.markdownPanel)
                    self.markdownPanel.setContent(self.slides[self.currentSlide].doc);
                if (self.jsConsolePanel)
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
            self.goToPage(self.currentSlide - 1);
        };
        JsTutorialController.prototype.onNext = function () {
            var self = this;
            self.goToPage(self.currentSlide + 1);
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
        JsTutorialController.prototype.onClearOutput = function () {
            var self = this;
            if (self.outputPanel)
                self.outputPanel.clear();
        };
        JsTutorialController.prototype.onRun = function () {
            var self = this;
            if (self.jsConsolePanel)
                self.jsConsolePanel.executeContent();
        };
        JsTutorialController.$import = ['hotkeys', 'scriptLoader', '$state', '$stateParams'];
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
    angular.module("jsTutorial").directive('rwJsTutorial', JsTutorialDirective.instance);
})(JsTutorial || (JsTutorial = {}));
