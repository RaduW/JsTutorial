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
            self.documentContent = `# This is a header 

this is some text
## This is a h2

* a point
* and another one
   * inside

\`\`\`js
    /*
        some comment here
    */
    function f(){
        //a line comment
        this.a= 33;
        var x = "abc";
        return 145;
    }
\`\`\`
Some text goes here

`;
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
