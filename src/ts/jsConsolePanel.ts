/// <reference path="../typings/tsd.d.ts" />
"use strict";

namespace JsTutorial {

    export interface IJsConsolePanel{
                
        editorOptions: CodeMirror.EditorConfiguration;
        
        //clears the console content (both editable and readonly)
        clear();
        
        // sets the editable content of console
        setContent( jsContent: string);        
        
        // turns the current content readonly
        makeAllReadOnly();
    }

    class JsConsolePanelController implements IJsConsolePanel{
        api: IJsConsolePanel; //variable to expose the api
        //documentContent: string;
        _editorOptions: CodeMirror.EditorConfiguration;
        editor: CodeMirror.Editor;

        static $inject:string[]=[];

        constructor(){
            var self = this;
            self.api = self;  //expose the API
            
            self._editorOptions = {
                mode: 'javascript',
                smartIndent: true,
                lineNumbers: true,
                indentUnit: 4,
                showCursorWhenSelecting: true,
                autofocus: true,
            }
        }

        public codemirrorLoaded = ( editor : CodeMirror.Editor) =>{
            var self = this;
            
            self.editor = editor;
            self.editor.setSize('100%','100%');
        }        
        
        public get editorOptions(): CodeMirror.EditorConfiguration{
            return this._editorOptions;
        } 
        
        public setContent(jsContentt:string):void{
            var self = this;
        }
        
        public clear():void{
            var self = this;
            if ( self.editor)
                self.editor.getDoc().setValue("");
        }
        
        public makeAllReadOnly():void{
            var self = this;
            if ( self.editor){
                let doc = self.editor.getDoc();
                let numLines = doc.lineCount();
                doc.markText({line:0, ch:0},{line:numLines,ch:0},{readOnly:true, css:"background-color:#eee"});
                
                doc.replaceRange("\nhello",{line:numLines,ch:0},{line:numLines,ch:0});
            }
        }
    }

    interface IJsConsolePanelAttributes extends ng.IAttributes{

    }


    class JsConsolePanelDirective implements ng.IDirective {
        restrict = 'E';
        controllerAs='jc';
        bindToController=true;
        controller= JsConsolePanelController;
        scope = {
           api: '='
        };
        templateUrl = 'js/jsConsolePanel.html';

        static instance():ng.IDirective {
            return new JsConsolePanelDirective();
        }

        link = (scope:ng.IScope, element:ng.IAugmentedJQuery, attrs:IJsConsolePanelAttributes, controller:JsConsolePanelController):void => {
            var self = this;
        }
    }

    angular.module("jsConsole").directive('rwJsConsolePanel', JsConsolePanelDirective.instance);
}
