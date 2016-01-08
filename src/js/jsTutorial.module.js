/// <reference path="../typings/tsd.d.ts" />
"use strict";
angular.module('jsTutorial', ['jsConsole', 'ui.layout', 'hc.marked', 'ngMaterial']).config(['markedProvider', function (markedProvider) {
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
    }]);
;
