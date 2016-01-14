/// <reference path="../typings/tsd.d.ts" />
"use strict";
var JsConsole;
(function (JsConsole) {
    'use strict';
    var ScriptLoader = (function () {
        function ScriptLoader($http, scriptParser, $log) {
            this.$http = $http;
            this.scriptParser = scriptParser;
            this.$log = $log;
        }
        ScriptLoader.prototype.loadScript = function (scriptName) {
            var self = this;
            var retVal = [];
            return self.$http.get("/slides/" + scriptName)
                .then(
            // success return the content of data (it should be a string)
            function (response) {
                return self.scriptParser.loadScript(response.data);
            }, function (error) {
                self.$log.error("Call to ScriptLoader.loadScript(" + scriptName + ") failed with error: " + error);
                throw (error);
            });
        };
        ScriptLoader.$inject = ['$http', 'scriptParser', '$log'];
        return ScriptLoader;
    })();
    JsConsole.ScriptLoader = ScriptLoader;
    angular
        .module('jsConsole')
        .service('scriptLoader', ScriptLoader);
})(JsConsole || (JsConsole = {}));
