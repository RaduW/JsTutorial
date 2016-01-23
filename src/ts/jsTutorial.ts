/// <reference path="../typings/tsd.d.ts" />
"use strict";

namespace JsTutorial {

    export interface IJsTutorialController{
        tryGoToSlide(slideId:string):void;
    }

    class JsTutorialController implements IJsTutorialController  {

        public markdownPanel:IMarkdownPanel; //set from template
        public jsConsolePanel : IJsConsolePanel; //set from the template
        public outputPanel: IOutputPanel; // set from the template
        public sandboxOn: boolean;
        private numSlides: number;
        private currentSlide: number;
        private slides: JsConsole.ScriptChunk[];
        
        
        static $import = ['hotkeys','scriptLoader','$state','$stateParams'];
        constructor( hotkeys: ng.hotkeys.HotkeysProvider,
                private scriptLoader:JsConsole.IScriptLoader, 
                private $state: ng.ui.IStateService,
                private $stateParams:ng.ui.IStateParamsService) {
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
                    let slideId = $stateParams['slideId'];
                    self.tryGoToSlide(`${slideId}`);
                }
            });

        }
        
        tryGoToSlide(slideId:string){
            var self = this;
            let requiredSlide = parseInt(slideId)
            if ( isNaN(requiredSlide))
                requiredSlide = 1;
            self.goToPage(requiredSlide-1); 
        }

        goToPage( page:number):void{
            var self = this;
            
            if( self.numSlides == 0)
                return ; //we are proably at startup (we can't navigate)
            
            if ( isNaN(page))
                page = 0;
            if (page < 0)
                page = 0;
            if (page >= self.numSlides)
                page = self.numSlides -1;
                
            if ( page == self.currentSlide)
                return;
            self.currentSlide = page;
            self.diplayCurrentSlide();
            self.$state.go('main.page', {slideId:self.currentSlide+1});
        }
        
        diplayCurrentSlide(){
            var self = this;
            if ( self.currentSlide < self.numSlides)
            {
                if ( self.markdownPanel)
                    self.markdownPanel.setContent(self.slides[self.currentSlide].doc);
                if ( self.jsConsolePanel)
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
            self.goToPage(self.currentSlide -1);
        }
        onNext():void{
            var self = this;
            self.goToPage(self.currentSlide +1);
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
