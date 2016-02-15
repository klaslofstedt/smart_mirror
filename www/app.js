(function() {
    angular.module('app', ['onsen'])
        .controller('SmartMirrorController', function($scope, $timeout) {
            $scope.$on("$destroy", function(){
                $("body").css('background-color', 'red');
            });
/*            $scope.styles= [{
                backgroundColor: 'red',
                width:'100px',
                height: 'auto',
                display: 'block'}];*/
            $scope.something = 'nice';
            $scope.tickInterval = 1000;
            var tick = function() {
                $scope.clock = Date.now() // get the current time
                    $timeout(tick, $scope.tickInterval); // reset the timer
            }

            // Start the timer
            $timeout(tick, $scope.tickInterval);
        });
})();
