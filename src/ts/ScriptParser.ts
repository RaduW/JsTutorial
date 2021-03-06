/// <reference path="../typings/tsd.d.ts" />
"use strict";

namespace JsConsole {
    'use strict';

    export class ScriptChunk{
        constructor( public doc: string, public script: string){}
    }

    export interface IScriptParser {
        loadScript(script:string):ScriptChunk[];
    }
    export class ScriptParser implements IScriptParser {
        constructor() {
        }
                
        loadScript(script:string):ScriptChunk[]{
            var retVal:ScriptChunk[] = [];
            
            if ( ! script)
                return retVal;
                
            var position:number = 0;
            var scriptLength: number = script.length
            
            while((position=script.indexOf("/*--",position)) != -1)
            {
                position +=4;
                let addPreviousComment:boolean = script[position]=='+';
                
                let beginOfDoc = script.indexOf("\n",position) + 1;
                let endOfDoc = script.indexOf("*/",beginOfDoc);
                position = endOfDoc + 3;
                
                let beginOfScript = position;
                let endOfScript = script.indexOf('/*--',position) ;
                let scriptChunk:string = null;
                if ( endOfScript < 0)
                    scriptChunk = script.substring(beginOfScript);
                else
                    scriptChunk = script.substring(beginOfScript,endOfScript);
                let docChunk = script.substring(beginOfDoc, endOfDoc);
                if ( addPreviousComment){
                    //additive comment (the previous comment plus current comment, used in presentation style slides)
                    if ( retVal.length > 0){
                        //add the previous comment to the current one
                        docChunk = retVal[retVal.length-1].doc + "\n\n\n" + docChunk;
                    }
                }
                retVal.push( new ScriptChunk( docChunk.trim(),scriptChunk.trim()));
            }
            return retVal;
        }
    }
    angular
        .module('jsConsole')
        .service('scriptParser', ScriptParser);
}
