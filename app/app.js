(function () {
    angular.module('homeCinema', ['common.core', 'common.ui'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'components/home/index.html',
                controller: 'indexCtrl'
            })
            .when("/login", {
                templateUrl: "components/account/login.html",
                controller: "loginCtrl"
            })
            .when("/register", {
                templateUrl: "components/account/register.html",
                controller: "registerCtrl"
            })
            .when("/customers", {
                templateUrl: "components/customers/index.html",
                controller: "customersCtrl"
            })
            .when("/customers/register", {
                templateUrl: "components/customers/register.html",
                controller: "customersRegCtrl"
            })
            .when("/movies", {
                templateUrl: "components/movies/index.html",
                controller: "moviesCtrl"
            })
            .when("/movies/add", {
                templateUrl: "components/movies/add.html",
                controller: "movieAddCtrl"
            })

            .when("/movies/:id", {
                templateUrl: "components/movies/details.html",
                controller: "movieDetailsCtrl",
                resolve: {
                    isAuthenticated: isAuthenticated
                }
            })
            .when("/movies/edit/:id", {
                templateUrl: "components/movies/edit.html",
                controller: "movieEditCtrl"
            })
            .when("/rental", {
                templateUrl: "components/rental/rental.html",
                controller: "rentStatsCtrl"
            }).otherwise({
                redirectTo: "/"
            });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];

    function run($rootScope, $location, $cookieStore, $http) {
        // handle page refreshes
        $rootScope.repository = $cookieStore.get('repository') || {};
        if ($rootScope.repository.loggedUser) {
            $http.defaults.headers.common['Authorization'] = $rootScope.repository.loggedUser.authdata;
        }

        $(document).ready(function () {
            $(".fancybox").fancybox({
                openEffect: 'none',
                closeEffect: 'none'
            });

            $('.fancybox-media').fancybox({
                openEffect: 'none',
                closeEffect: 'none',
                helpers: {
                    media: {}
                }
            });

            $('[data-toggle=offcanvas]').click(function () {
                $('.row-offcanvas').toggleClass('active');
            });
        });
    }

    isAuthenticated.$inject = ['membershipService', '$rootScope', '$location'];

    function isAuthenticated(membershipService, $rootScope, $location) {
        if (!membershipService.isUserLoggedIn()) {
            $rootScope.previousState = $location.path();
            $location.path('/login');
        }
    }

})();