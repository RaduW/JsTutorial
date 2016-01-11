/// <reference path="../typings/tsd.d.ts" />
"use strict";

namespace JsTutorial {

    export interface IJsTutorialController{
    }

    class JsTutorialController implements IJsTutorialController  {

        static $import = ["$scope"];
        public markdownPanel:IMarkdownPanel; //set from template
        public jsConsolePanel : IJsConsolePanel; //set from the template
        public sandboxOn: boolean
        
        constructor( ) {
            var self = this;
            self.sandboxOn = true;
        }
        
        onSetSomeContent(){
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
