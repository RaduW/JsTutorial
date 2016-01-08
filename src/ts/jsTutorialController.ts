/// <reference path="../typings/tsd.d.ts" />
"use strict";

namespace JsTutorial {

    class JsTutorialController  {

        static $import = ["$scope"];
        public markdownPanel:IMarkdownPanel; //set from template
        
        constructor( ) {
            var vm = this;
        }
        
        onSetSomeContent(){
            var self = this;
            if ( self.markdownPanel)
                self.markdownPanel.setContent( "# This is a header ");
        }
        
        onPrevious():void {
            var vm = this;
        }
        onNext():void{
            var vm = this;
        }
    }

    angular.module("jsTutorial").controller("jsTutorialController", JsTutorialController);
}

