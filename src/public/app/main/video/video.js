angular.module('lsync.video', ['lsync.services'])
.controller('VideoController', function($scope){

  $scope.alertCurrentTime = function(){
    console.log($scope.player.getCurrentTime());
  };

  $scope.url='https://www.youtube.com/watch?v=lBqiZSemrqg&ab_channel=TimKindberg';

  $scope.alertCurrentTime = function(){
    console.log($scope.player.getCurrentTime());
  };
  $scope.data={
    width: 600,
    height: 480,
    videoid: "M7lc1UVf-VE"
  };
})
.directive('youtube', function($window) {
  return {
    restrict: "E",

    scope: {
      height: "@",
      width: "@",
      videoid: "@"
    },

    template: '<div></div>',

    link: function(scope, element) {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var player;

      $window.onYouTubeIframeAPIReady = function() {

        player = new YT.Player(element.children()[0], {
          playerVars: {
            autoplay: 1,
            html5: 1,
            theme: "light",
            modesbranding: 0,
            color: "white",
            iv_load_policy: 3,
            showinfo: 1,
            controls: 1
          },

          height: scope.height,
          width: scope.width,
          videoId: scope.videoid,

          events:{
            'onStateChange':onPlayerStateChange
          }
        });
      };

      var onPlayerStateChange = function(){
        console.log('CURRENT TIME', player.getCurrentTime());
      };
      setInterval(onPlayerStateChange, 500);
      scope.$watch('videoid', function(newValue, oldValue) {
        if (newValue == oldValue) {
          return;
        }

        player.cueVideoById(scope.videoid);

      });

      scope.$watch('height + width', function(newValue, oldValue) {
        if (newValue == oldValue) {
          return;
        }

        player.setSize(scope.width, scope.height);

      });
    }
  };
});
