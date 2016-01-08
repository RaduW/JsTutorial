/// <reference path="../typings/tsd.d.ts" />
"use strict";

namespace JsTutorial {

    export interface IMarkdownPanel{
        //export here the api
    }

    class MarkdownPanelController implements IMarkdownPanel{
        api: IMarkdownPanel; //variable to expose the api
        documentContent: string;

        static $inject=['$sce'];

        constructor(private $sce:ng.ISCEService){
            var self = this;
            self.api = self;  //expose the API
            self.documentContent = self.$sce.trustAsHtml("<div>Initial Content</div>");
        }

        newDoc(documentContent:string){
            var self = this;
            self.documentContent = self.$sce.trustAsHtml(documentContent);
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
