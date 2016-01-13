/// <reference path="../typings/tsd.d.ts" />
"use strict";

angular.module('jsTutorial',['jsConsole','ui.layout', 'hc.marked', 'ngMaterial', 'cfp.hotkeys']).config(['markedProvider','hotkeysProvider', function (markedProvider:any, hotkeysProvider:ng.hotkeys.HotkeysProvider) {
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
  //hotkeysProvider.cheatSheetHotkey = "ctrl+?";
  
}]);;