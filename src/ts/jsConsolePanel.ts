/// <reference path="../typings/tsd.d.ts" />
"use strict";

namespace JsTutorial {

    export interface IJsConsolePanel{
        setContent(documentContent:string):void;
    }

    class JsConsolePanelController implements IJsConsolePanel{
        api: IJsConsolePanel; //variable to expose the api
        //documentContent: string;

        static $inject:string[]=[];

        constructor(){
            var self = this;
            self.api = self;  //expose the API
        }

        public setContent(documentContent:string):void{
            var self = this;
            //self.documentContent = documentContent;//self.$sce.trustAsHtml(documentContent);
        }
    }

    interface IJsConsolePanelAttributes extends ng.IAttributes{

    }


    class JsConsolePanelDirective implements ng.IDirective {
        restrict = 'E';
        controllerAs='mp';
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
