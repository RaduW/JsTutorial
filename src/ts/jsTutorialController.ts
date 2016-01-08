/// <reference path="../typings/tsd.d.ts" />
"use strict";

namespace JsTutorial {

    export interface IJsTutorialScope {
    }

    class JsTutorialController implements IJsTutorialScope {

        static $import = ["$scope"];

        constructor($scope:any) {
            var vm = this;
        }

        onPrevious():void {
            var vm = this;
        }
        onNext():void{
            var vm = this;
        }

    }

    angular.module("modificationEditor").controller("modificationEditor", JsTutorialController);
}

