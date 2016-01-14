/// <reference path="../typings/tsd.d.ts" />
"use strict";

namespace JsConsole {
    'use strict';


    export interface IScriptLoader {
        loadScript(scriptName:string):ng.IPromise<ScriptChunk[]>;
    }
    
    export class ScriptLoader implements IScriptLoader {
        static $inject:string[] = ['$http', 'scriptParser','$log'];
        
        constructor(private $http:ng.IHttpService, private scriptParser:IScriptParser,private $log:ng.ILogService) {
        }
                
        loadScript(scriptName:string):ng.IPromise<ScriptChunk[]>{
            var self = this;
            var retVal:ScriptChunk[] = [];

            return self.$http.get(`/slides/${scriptName}`)
                .then(
                    // success return the content of data (it should be a string)
                    (response: { data:string}) => {
                        return self.scriptParser.loadScript( response.data);
                    },
                    (error:any) => {
                        self.$log.error(`Call to ScriptLoader.loadScript(${scriptName}) failed with error: ${error}`);
                        throw(error);
                    });
        }
    }
    angular
        .module('jsConsole')
        .service('scriptLoader', ScriptLoader);
}
