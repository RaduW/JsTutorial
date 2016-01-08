/// <reference path="../typings/tsd.d.ts" />
"use strict";

angular.module('jsTutorial',['jsConsole','ui.layout', 'hc.marked', 'ngMaterial']).config(['markedProvider', function (markedProvider:any) {
  markedProvider.setOptions({
    gfm: true,
    tables: true,
    highlight: function (code:any, lang:any) {
      if (lang) {
        return hljs.highlight(lang, code, true).value;
      } else {
        return hljs.highlightAuto(code).value;
      }
    }
  });
}]);;