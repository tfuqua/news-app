var app = angular.module('newsApp', ['ngSanitize', 'ngRoute']);


//Featured Ajax Request
app.controller("homeController", function($scope, $http, $sce)  {
  $http.get('/featured', {cache: true}).
    success(function(data, status, headers, config) {
      $scope.aside = data.aside;
      $scope.main = data.main;
      $scope.travel = data.travel;


      //Insert image in middle of story
      for (var i = 0; i < data.opinion.length; i++){
        if (data.opinion[i].numberOfImages > 0){
          var fullStory = data.opinion[i].fullStory;
          fullStory = fullStory.replace('<br><br>', "<br><img class='news-img' src='http://placehold.it/200x150&txt=image' /><br>");
          data.opinion[i].fullStory = fullStory;
        }

      }

      $scope.opinion = data.opinion;
    }).
    error(function(data, status, headers, config) {
      console.log(data, status, headers, config);
    });

    $scope.getTimes=function(n){
     return new Array(n);
   };

   $http.get("/banners",
     { cache: true}
     ).success(function(data, status, headers, config) {
       $scope.banner = data[0].message;
       $scope.details = data[1].message;
     }).
     error(function(data, status, headers, config) {
       console.log(data, status, headers, config);
     });
});


app.controller('headerController', ['$scope', function($scope) {
	$scope.date = new Date();
}]);

//Menu Ajax Request
app.controller("menuController", ['$scope', '$http', '$compile', '$templateCache',
function($scope, $http, $compile, $templateCache) {
  $http.get('/menus'
		).success(function(data, status, headers, config) {
      $scope.menus = data;
    }).
    error(function(data, status, headers, config) {
      console.log(data, status, headers, config);
    });

}]);

app.config(function($routeProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: '/views/pages/home.html',
            controller: 'homeController'
        })

        // categories
        .when('/categories/:id', {
            templateUrl: '/views/pages/categories.html',
            controller: 'articleController'
        });


});

// category controller
app.controller('articleController', function($scope, $http, $routeParams) {

    var id = $routeParams.id;
    $scope.id = id;

    var url = "/categories/" + id;

    $http.get(url,
      { cache: true}
      ).success(function(data, status, headers, config) {
        $scope.main = data.main;
        $scope.aside = data.aside;
        console.log(data);
      }).
      error(function(data, status, headers, config) {

      });

      $scope.getTimes=function(n){
       return new Array(n);
      };

});
