/// <reference path="../typings/tsd.d.ts" />
"use strict";

namespace JsTutorial {

    export interface IJsTutorialController{
    }

    class JsTutorialController implements IJsTutorialController  {

        public markdownPanel:IMarkdownPanel; //set from template
        public jsConsolePanel : IJsConsolePanel; //set from the template
        public sandboxOn: boolean;
        private numSlides: number;
        private currentSlide: number;
        private slides: JsConsole.ScriptChunk[];
        
        
        static $import = ['hotkeys','scriptLoader'];
        constructor( hotkeys: ng.hotkeys.HotkeysProvider,private scriptLoader:JsConsole.IScriptLoader) {
            var self = this;
            self.sandboxOn = true;
            
            self.currentSlide = 0;
            self.numSlides = 0;
            
            hotkeys.add({
                combo: "ctrl+enter",
                description: "Execute javascript",
                callback: (event, hotkey) => { self.onRun()},
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA']

            });
            hotkeys.add({
                combo: "ctrl+<",
                description: "Previous slide",
                callback: (event, hotkey) => { self.onPrevious()},
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA']

            });
            hotkeys.add({
                combo: "ctrl+>",
                description: "Next slide",
                callback: (event, hotkey) => { self.onNext()},
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA']

            });
            hotkeys.add({
                combo: "alt+del",
                description: "clear javascript panel",
                callback: (event, hotkey) => { self.onClear()},
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA']

            });
            
            self.scriptLoader.loadScript('js/course.js').then((response: JsConsole.ScriptChunk[]) => {
                if ( response){
                    self.slides = response;
                    self.numSlides = response.length;
                }
            });

        }
       
        onMenu(){
            var self = this;
            if ( self.markdownPanel)
                self.markdownPanel.setContent( "# This is a header ");
        }
        
        onPrevious():void {
            var self = this;
        }
        onNext():void{
            var self = this;
        }
        
        onSandbox(sandboxOn:boolean){
            var self = this;
            self.sandboxOn = sandboxOn;
            if ( self.jsConsolePanel)
                self.jsConsolePanel.setSandboxMode(sandboxOn);
        }
        
        onClear():void{
            var self = this;
            if ( self.jsConsolePanel)
                self.jsConsolePanel.clear();
        }
        onRun():void{
            var self = this;
            if ( self.jsConsolePanel)
                self.jsConsolePanel.executeContent();
        }
    }


    interface IJsTutorialAttributes extends ng.IAttributes{
    }

    class JsTutorialDirective implements ng.IDirective {
        restrict = 'E';
        controllerAs='jt';
        bindToController=true;
        controller= JsTutorialController;
        scope = {
           api: '='
        };
        templateUrl = 'js/jsTutorial.html';

        static instance():ng.IDirective {
            return new JsTutorialDirective();
        }

        link = (scope:ng.IScope, element:ng.IAugmentedJQuery, attrs:IJsTutorialAttributes, controller:JsTutorialController):void => {
            var self = this;
        }
    }

    angular.module("jsConsole").directive('rwJsTutorial', JsTutorialDirective.instance);
}
