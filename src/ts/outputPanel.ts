/// <reference path="../typings/tsd.d.ts" />
"use strict";
declare interface Window{
    out(vals:any[]):void;
}

namespace JsTutorial {

    export interface IOutputPanel{
        editorOptions: CodeMirror.EditorConfiguration;
        
        //clears the console content (both editable and readonly)
        clear():void;
        
        // adds content to the panel
        addContent(outputContent:string):void;
        
    }

    class OutputPanelController implements IOutputPanel{
        api: IOutputPanel; //variable to expose the api
        //documentContent: string;
        _editorOptions: CodeMirror.EditorConfiguration;
        editor: CodeMirror.Editor;

        static $inject:string[]=[];

        constructor(){
            var self = this;
            self.api = self;  //expose the API
            
            self._editorOptions = {
                mode: {name: "javascript", json: true},
                smartIndent: true,
                indentUnit: 4,
                showCursorWhenSelecting: true,
                autofocus: false,
                readOnly: true
            }
            
            //publish api to be usable from the console
            window.out = self.out.bind(self);
        }

        public codemirrorLoaded = ( editor : CodeMirror.Editor) =>{
            var self = this;
            self.editor = editor;
            self.editor.setSize('100%','100%');
        }        
        
        public get editorOptions(): CodeMirror.EditorConfiguration{
            return this._editorOptions;
        } 
        public out(... vals:any[]):void{
            let self = this;
            let result:string = '';
            for (var val of vals){
                let stringVal = '';
                if ( val === undefined)
                    stringVal = 'undefined';
                else if ( val === null)
                    stringVal = 'null';
                else
                    stringVal = JSON.stringify(val,null, '\t');
                
                result += stringVal+'\n';
            }
            self.addContent(result);
        }
        
        public addContent( outputContent:string):void{
            let self = this;
            if ( self.editor){
                let doc = self.editor.getDoc();
                let lineStart = doc.lineCount();
                outputContent = `${outputContent}\n`;
                doc.replaceRange(outputContent,{line:0,ch:0},{line:0,ch:0});
            }
        }
        
        public clear():void{
            var self = this;
            if ( self.editor){
                let doc =self.editor.getDoc();
                doc.setValue("");
            }
        }
    }

    interface IOutputPanelAttributes extends ng.IAttributes{
    }


    class OutputPanelDirective implements ng.IDirective {
        restrict = 'E';
        controllerAs='op';
        bindToController=true;
        controller= OutputPanelController;
        scope = {
           api: '='
        };
        templateUrl = 'js/outputPanel.html';

        static instance():ng.IDirective {
            return new OutputPanelDirective();
        }

        link = (scope:ng.IScope, element:ng.IAugmentedJQuery, attrs:IOutputPanelAttributes, controller:OutputPanelController):void => {
            var self = this;
        }
    }

    angular.module("jsTutorial").directive('rwOutputPanel', OutputPanelDirective.instance);
}
