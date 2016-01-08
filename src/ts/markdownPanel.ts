/// <reference path="../typings/tsd.d.ts" />
"use strict";

namespace JsTutorial {

    export interface IMarkdownPanel{
        setContent(documentContent:string):void;
    }

    class MarkdownPanelController implements IMarkdownPanel{
        api: IMarkdownPanel; //variable to expose the api
        documentContent: string;

        static $inject=['$sce'];

        constructor(private $sce:ng.ISCEService){
            var self = this;
            self.api = self;  //expose the API
            self.documentContent = "# This is a header \n\nthis is some text\n## This is a h2\n\n* a point\n* and another one\n   *";
        }

        public setContent(documentContent:string):void{
            var self = this;
            self.documentContent = documentContent;//self.$sce.trustAsHtml(documentContent);
        }
    }

    interface IMarkdownPanelAttributes extends ng.IAttributes{

    }


    class MarkdownPanelDirective implements ng.IDirective {
        restrict = 'E';
        controllerAs='mp';
        bindToController=true;
        controller= MarkdownPanelController;
        scope = {
           api: '='
        };
        templateUrl = 'js/markdownPanel.html';

        static instance():ng.IDirective {
            return new MarkdownPanelDirective();
        }

        link = (scope:ng.IScope, element:ng.IAugmentedJQuery, attrs:IMarkdownPanelAttributes, controller:MarkdownPanelController):void => {
            var self = this;
        }
    }

    angular.module("jsTutorial").directive('rwMarkdownPanel', MarkdownPanelDirective.instance);
}
