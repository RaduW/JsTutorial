var JsTutorial;
(function (JsTutorial) {
    var PageChanger = (function () {
        function PageChanger($stateParams, $scope) {
            //get the current slide according to the current state
            var slideId = $stateParams['slideId'];
            //try set the current slide received from the state 
            //NOTE: the following works like this:
            //PageChanger is the controller of the main.page state.
            //The ui-view of this controller is contained in the ui-view of the jsTutorial component
            //therefore the current scope will be prototypically derived from the scope containing the JsTutorialController
            //this is the ONLY reason why we will find in $scope a variable called 'jt' of type JsTutorialController
            //So once again the scope for the JsTutorial contains a variable jt because the directive has a controllerAs:'jt'
            //The current scope is derived from the JsTutorial scope because the JsTutorial template contains a <ui-view> embedded in itself
            //So in our $scope we will find the inharited js variable pointing to the JsTutorialController.
            var jsTutorialController = $scope['jt'];
            jsTutorialController.tryGoToSlide("" + slideId);
        }
        PageChanger.$import = ['$stateParams', '$scope'];
        return PageChanger;
    })();
    JsTutorial.PageChanger = PageChanger;
})(JsTutorial || (JsTutorial = {}));
