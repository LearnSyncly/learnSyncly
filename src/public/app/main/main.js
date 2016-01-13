//main controller
angular.module('lsync.main', [])
  .controller('MainController', function($scope, $interval, AppState) {
    angular.extend($scope, AppState);
    // This controller will hold the main app logic and can display slightly
    // different options depending on if it's in create or view mode.
    $scope.socket.connect();
    $scope.init();
    //$interval helps angular run the digest cycle when slideview changes
    //regular setInterval isn't synced to digest cycle and can prevent angular from
    //noticing changes in $scope vars
    var mainInterval = $interval(function() {
      if ($scope.checkTime()) {        
        $scope.toggleSlideView();
      }
    }, 500);

    //interval and timeout persist even after scope is destroyed!!!
    //cancel on destroy prevents potential problems
    $scope.$on(
      "$destroy",
      function(event) {
        $interval.cancel(mainInterval);
      }
    );

  });
