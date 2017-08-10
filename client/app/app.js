var app=angular.module('myApp', ["ngRoute",]);
app.config(function($routeProvider){
    $routeProvider
    .when("/",{
        templateUrl:"../views/home.html"
    })  
    .when("/list",{
        templateUrl:"../views/list.html"
    })
    .when("/add",{
        templateUrl:"../views/add.html"
    })
    .when("/single/:id",{
        templateUrl:"../views/single.html"
    })
    .when("/user/:user",{
        templateUrl:"../views/user.html"
    })
});
app.controller("HttpPostController",[ "$scope","$http",function($scope,$http){
    console.log('im loaded')
    $scope.Poster = function() {
        console.log('i clicked');
        var data= {
            userid : username.value,
            message : $scope.message,
        };
        $http({ 
            method: 'POST', 
            url: 'http://localhost:3000/api/chirps', 
            data: data 
        })
        .then(function(response){
            $scope.message="";
            $scope.user="";
        })
        .catch(function(res){
            alert('You have goofed, Please enter user name and message')
        })
    };
}]);
app.controller("HttpGetController",function($scope,$http,$location){
    console.log('i have been got')
        console.log('git clicked')
        $http.get('http://localhost:3000/api/chirps')
            .then(function(response){
                console.log(response.data)
                $scope.chirps=response.data
                
    });
        $scope.getId=function(id){
            console.log(id)
            $location.path("/single/" + id)
        };

});
app.controller("SingleController",['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
     var id=$routeParams.id;
    $http.get('http://localhost:3000/api/chirps/one/'+id)
        .then(function(response){
        console.log(response)
        $scope.single=response.data
    });
        $scope.removeItem=function(){
        console.log('delete clicked')
        console.log(single.userid)
    var data=({
        user : $scope.user,
        message : $scope.message,
        id: $scope.id
    })
        $http.delete('http://localhost:3000/api/chirps/one/'+id)
    .then(function(response){
        console.log(response.data)
    })
    window.location.href= "/#/list"
    }
}]);
app.controller("UserController",['$scope','$http','$location',function($scope,$http,$location){
        console.log('git clicked')
        $http.get('http://localhost:3000/api/users')
            .then(function(response){
                console.log(response.data)
                $scope.pizza=response.data     
    });
        $scope.getUser=function(user){
           console.log('clicked');
            $location.path("/user/" + user)
        };

}]);
app.controller("SingleUserController",['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
      var user = $routeParams.user;
      console.log($routeParams)
    $http.get('http://localhost:3000/api/chirps/user/'+ user)
        .then(function(response){
            console.log(user)
        console.log(response)
        $scope.users=response.data
    });
    $scope.removeUser=function(user){
        
        console.log('delete clicked')
    $http.delete('http://localhost:3000/api/chirps/user/'+user)
    .then(function(response){
        alert('User Chirps deleted! Redirecting to Home')
        window.location.href = "/#/";
        console.log(response)
    })
    window.location.href= "/#/list"
    }
}]);

// app.controller("SingleUserController",['$location','$scope', '$routeParams', '$http', function($location, $scope, $routeParams, $http){
//      var user=$routeParams.users;
//      console.log($routeParams.user)
//      console.log(user)
//     $http.get('http://localhost:3000/api/users/' + user)
//         .then(function(response){
            
//         console.log(response)
//         $scope.user=response.data
//     });
// }]);

//]

    //    $scope.removeItem=function(item){
    //         console.log('deleted')
    //         var index=$scope.chirps.indexOf(item);
    //         $scope.chirps.splice(index,1)
    //     }






    //        .success(function(data){
    //     console.log(data)
    //     $scope.chirps=data;
    // })
    // .error(function(data){
    //     alert('Fill in text fields')
    // });
    // 
    // angular.module('MyPosts', [])
//   .controller('HttpGetController', ['$scope', '$http', function ($scope, $http) {
//       $scope.name = {};
//       $scope.message = [];

//       $scope.search = function () {
//           $http.get('/your/url/search', { params: name },
//             function (response) { $scope.message = response; },
//             function (failure) { console.log("failed :(", failure); });
//       }
    
//   }]);
// ,"myPosts","myGets"
//var post=angular.module('myPosts',[]
//var getMod=angular.module('myGets',[]);
// $scope.removeItem=function(id){
//     var id=$routeParams.id;
//             console.log('delete')
//             console.log(id)
//             $http({
//                 method: 'DELETE',
//                 url: 'http://localhost:3000/api/chirps/one/'+id
//             })
            
//             .then(function(response){
//                 var id=$routeParams.id;
//                 var chirps = $scope.chirps;
//                 console.log(chirps);
//                 chirps = chirps.filter(function(chirp){
//                     if (chirp.id !== id){
//                         return chirp;
//                     }
//                 });
//                 $scope.chirps = chirps;
//             //  window.location.reload();
//             });
//         };