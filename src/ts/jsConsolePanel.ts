/// <reference path="../typings/tsd.d.ts" />
"use strict";

namespace JsTutorial {

    export interface IJsConsolePanel{
                
        editorOptions: CodeMirror.EditorConfiguration;
        
        //clears the console content (both editable and readonly)
        clear():void;
        
        // sets the editable content of the console
        setContent( jsContent: string):void;        
        
        // gets the editable content of the console
        getContent( ): string;        
        
        // turns the current content readonly
        makeAllReadOnly():void;
        
        // adds console output information
        addConsoleOutput(outputContent:string):void;
        
        // executes the currently typed content
        executeContent():void;
        
        setSandboxMode(sandboxMode:boolean):void;
    }

    class JsConsolePanelController implements IJsConsolePanel{
        api: IJsConsolePanel; //variable to expose the api
        //documentContent: string;
        _editorOptions: CodeMirror.EditorConfiguration;
        editor: CodeMirror.Editor;
        currentReadOnlyArea: CodeMirror.TextMarker;
        sandboxOn:boolean;
        cursor = '>'; // set it to whatever you want to appear as the console cursor

        static $inject:string[]=[];

        constructor(){
            var self = this;
            self.api = self;  //expose the API
            self.sandboxOn = true;
            
            self._editorOptions = {
                mode: 'javascript',
                smartIndent: true,
                lineNumbers: true,
                indentUnit: 4,
                showCursorWhenSelecting: true,
                autofocus: true,
            }
        }

        public setSandboxMode(sandboxOn:boolean):void{
            var self = this;
            self.sandboxOn = sandboxOn;
        }
                
        public codemirrorLoaded = ( editor : CodeMirror.Editor) =>{
            var self = this;
            
            self.editor = editor;
            self.editor.setSize('100%','100%');
            let doc = editor.getDoc();
            doc.replaceRange(`${self.cursor}`,{line:0,ch:0},{line:0,ch:0});
            doc.markText({line:0, ch:0},{line:1,ch:0},{readOnly:true});
        }        
        
        public get editorOptions(): CodeMirror.EditorConfiguration{
            return this._editorOptions;
        } 
        
        public executeContent():void{
            var self = this;
            var retVal:any;
            if (self.editor) {
                let message:any = null;
                var content = self.getContent();
                if (content) {
                    try {
                        if ( self.sandboxOn)
                            retVal = eval.call(window, content);
                        else
                            retVal = eval(content);
                            
                        message = "" + retVal ;
                    }
                    catch (exception) {
                        if ( exception.stack){
                            message = `\n${exception.stack}`;
                        }
                        else{
                            message = `\nError: ${exception}`;
                        }
                    }
                }
                if ( message){
                    self.addConsoleOutput(message);
                }
            }
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
                outputContent = `\n${outputContent}`;
                doc.replaceRange(outputContent,{line:lineStart,ch:0},{line:lineStart,ch:0});
                let lineEnd = doc.lineCount()
                doc.markText({line:0, ch:0},{line:lineEnd,ch:0},{readOnly:true, css:"color:#aaa; font-style:italic", className:"readOnlyText"});
                doc.replaceRange(`\n${self.cursor}`,{line:lineEnd,ch:0},{line:lineEnd,ch:0});
                doc.markText({line:0, ch:0},{line:lineEnd+1,ch:0},{readOnly:true});
            }

        }
        
        public setContent(jsContent:string):void{
            var self = this;
            if ( self.editor){
                let doc = self.editor.getDoc();
                self.clearEditableContent();
                let numLines = doc.lineCount();
                doc.replaceRange(jsContent,{line:numLines,ch:0},{line:numLines,ch:0});
            }
        }
        
        public clearEditableContent():void{
            var self = this;
            if ( self.editor){
                let doc = self.editor.getDoc();
                let startEditable = self.getLastReadonlyPosition();
                let numLines = doc.lineCount();
                doc.replaceRange('', startEditable,{line:numLines, ch:0})
            }
        }
        
        public clear():void{
            var self = this;
            if ( self.editor){
                let doc =self.editor.getDoc();
                doc.setValue(self.cursor);
                doc.markText({line:0, ch:0},{line:1,ch:0},{readOnly:true});
            }
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
                
                doc.replaceRange(`\n${self.cursor}`,{line:numLines,ch:0},{line:numLines,ch:0});
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
