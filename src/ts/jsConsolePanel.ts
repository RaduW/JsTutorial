/// <reference path="../typings/tsd.d.ts" />
"use strict";

namespace JsTutorial {

    export interface IJsConsolePanel{
                
        editorOptions: CodeMirror.EditorConfiguration;
        
        //clears the console content (both editable and readonly)
        clear();
        
        // sets the editable content of the console
        setContent( jsContent: string);        
        
        // gets the editable content of the console
        getContent( ): string;        
        
        // turns the current content readonly
        makeAllReadOnly():void;
        
        // adds console output information
        addConsoleOutput(outputContent:string):void;
    }

    class JsConsolePanelController implements IJsConsolePanel{
        api: IJsConsolePanel; //variable to expose the api
        //documentContent: string;
        _editorOptions: CodeMirror.EditorConfiguration;
        editor: CodeMirror.Editor;
        currentReadOnlyArea: CodeMirror.TextMarker;

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
            self.makeAllReadOnly();
        }        
        
        public get editorOptions(): CodeMirror.EditorConfiguration{
            return this._editorOptions;
        } 
        
        private getLastReadonlyPosition(){
            var self = this;
            let lastReadonlyPosition:CodeMirror.Position = { line:0,ch:0};
            
            if ( self.editor){
                let doc = self.editor.getDoc();
                let marks:CodeMirror.TextMarker[] = doc.getAllMarks();
                _.forEach(marks,
                    (current:CodeMirror.TextMarker) =>{
                        let currRange = current.find();
                        let currPos = currRange.to;
                        if ( currPos.line == lastReadonlyPosition.line){
                            if ( currPos.ch > lastReadonlyPosition.ch)
                                lastReadonlyPosition = currPos;
                        }
                        else if ( currPos.line > lastReadonlyPosition.line){
                            lastReadonlyPosition = currPos;
                        }
                    });
            }
            return lastReadonlyPosition;            
        }
        
        // Return the currrently editable content (that can be evaluated)
        public getContent():string{
            var self = this;
            
            if ( self.editor){
                let doc = self.editor.getDoc();
                let lastReadonlyPosition = self.getLastReadonlyPosition();
                let numLines = doc.lineCount();
                return doc.getRange(lastReadonlyPosition,{line:numLines,ch:0});
            }
            return "";
        }
        
        public addConsoleOutput( outputContent:string):void{
            let self = this;
            if ( self.editor){
                let doc = self.editor.getDoc();
                let lineStart = doc.lineCount();
                outputContent = `\n{outputContent}`;
                doc.replaceRange(outputContent,{line:lineStart,ch:0},{line:lineStart,ch:0});
                let lineEnd = doc.lineCount()
                doc.markText({line:0, ch:0},{line:lineEnd,ch:0},{readOnly:true, css:"color:#aaa; font-style:italic", className:"readOnlyText"});
                doc.replaceRange("\n>>>",{line:lineEnd,ch:0},{line:lineEnd,ch:0});
                doc.markText({line:0, ch:0},{line:lineEnd+1,ch:0},{readOnly:true});
            }

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
                let existingMarks = doc.getAllMarks();
                if ( existingMarks)
                    _.forEach(existingMarks, (marker)=> {marker.clear();});
                    
                //TODO remove css entry (only className should be used with a more specific selector)
                doc.markText({line:0, ch:0},{line:numLines,ch:0},{readOnly:true, css:"color:#aaa", className:"readOnlyText"});
                
                doc.replaceRange("\n>>>",{line:numLines,ch:0},{line:numLines,ch:0});
                doc.markText({line:0, ch:0},{line:numLines+1,ch:0},{readOnly:true});
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
