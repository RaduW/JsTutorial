/// <reference path="../typings/tsd.d.ts" />
"use strict";

namespace JsTutorial {

    export interface IJsTutorialController{
    }

    class JsTutorialController implements IJsTutorialController  {

        public markdownPanel:IMarkdownPanel; //set from template
        public jsConsolePanel : IJsConsolePanel; //set from the template
        public outputPanel: IOutputPanel; // set from the template
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
                combo: "alt+p",
                description: "Previous slide",
                callback: (event, hotkey) => { self.onPrevious()},
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA']

            });
            hotkeys.add({
                combo: "alt+n",
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
            
            self.scriptLoader.loadScript('course.js').then((response: JsConsole.ScriptChunk[]) => {
                if ( response){
                    self.slides = response;
                    self.numSlides = response.length;
                    self.currentSlide = 0;
                    self.diplayCurrentSlide();
                }
            });

        }
        
        diplayCurrentSlide(){
            var self = this;
            if ( self.currentSlide < self.numSlides)
            {
                self.markdownPanel.setContent(self.slides[self.currentSlide].doc);
                self.jsConsolePanel.setContent(self.slides[self.currentSlide].script);
            }
        }
       
        onMenu(){
            var self = this;
            if ( self.markdownPanel)
                self.markdownPanel.setContent( "# This is a header ");
        }
        
        onPrevious():void {
            var self = this;
            if ( self.currentSlide > 0){
                self.currentSlide--;
                self.diplayCurrentSlide();
            }
        }
        onNext():void{
            var self = this;
            if ( self.currentSlide < self.numSlides-1){
                self.currentSlide++;
                self.diplayCurrentSlide();
            }
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

    angular.module("jsTutorial").directive('rwJsTutorial', JsTutorialDirective.instance);
}
