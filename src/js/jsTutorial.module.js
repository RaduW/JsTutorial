/// <reference path="../typings/tsd.d.ts" />
"use strict";
angular.module('jsTutorial', ['jsConsole', 'ui.layout', 'hc.marked', 'ngMaterial', 'cfp.hotkeys', 'ui.router'])
    .config(['markedProvider', 'hotkeysProvider', '$stateProvider', '$urlRouterProvider',
    function (markedProvider, hotkeysProvider, $stateProvider, $urlRouterProvider) {
        markedProvider.setOptions({
            gfm: true,
            tables: true,
            highlight: function (code, lang) {
                if (lang) {
                    return hljs.highlight(lang, code, true).value;
                }
                else {
                    return hljs.highlightAuto(code).value;
                }
            }
        });
        //hotkeysProvider.cheatSheetHotkey = "ctrl+?";
        //redirect to state slide 1 for anything unknown
        $urlRouterProvider.otherwise("/1");
        $stateProvider.
            state('main', {
            url: "/",
            template: "<rw-js-tutorial/>"
        }).
            state('main.page', {
            url: ":slideId",
            template: "<span/>",
            controller: JsTutorial.PageChanger
        });
    }]);
;
