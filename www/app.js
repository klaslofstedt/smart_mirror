(function() {
    angular.module('app', ['onsen'])
        .controller('SmartMirrorController', function($scope, $timeout, $http) {
            $scope.tickInterval = 1000;
            var weatherUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%20899981&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"; 
            var forecastUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22norrkoping%2C%20sweden%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
            var tempRaw;
            var forecastRaw= [];

            function FtoC(Fahrenheit){
                var Celcius = (Fahrenheit - 32) * 5 / 9;
                return Math.round(Celcius);
            }

            function weatherResponse(){
                $http({
                    method: 'GET',
                    url: weatherUrl 
                }).then(function weatherSuccessCallback(response) {
                    //console.log(response.data.query.results.channel.item.condition);
                    tempRaw = response.data.query.results.channel.item.condition.temp;
                    // when the response is available
                }, function weatherErrorCallback(response) {
                    console.log("Error: " + response);
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                }); 
            }
            function forecastResponse(){
                $http({
                    method: 'GET',
                    url: forecastUrl 
                }).then(function forecastSuccessCallback(response) {
                    console.log(response.data.query.results.channel.item.forecast);
                    var i;
                    for(i = 0; i < 5; i++){
                        forecastRaw[i] = (response.data.query.results.channel.item.forecast[i]);
                        //console.log(forecastRaw[i].day);
                        if(forecastRaw[i].day == "Mon"){
                            forecastRaw[i].day = "Monday";
                        }else if (forecastRaw[i].day == "Tue"){
                            forecastRaw[i].day = "Tuesday";
                        }else if (forecastRaw[i].day == "Wed"){
                            forecastRaw[i].day = "Wednesday";
                        }else if (forecastRaw[i].day == "Thu"){
                            forecastRaw[i].day = "Thursday";
                        }else if (forecastRaw[i].day == "Fri"){
                            forecastRaw[i].day = "Friday";
                        }else if (forecastRaw[i].day == "Sat"){
                            forecastRaw[i].day = "Saturday";
                        }else if (forecastRaw[i].day == "Sun"){
                            forecastRaw[i].day = "Sunday";
                        }
                    }
                    $scope.day0=(forecastRaw[0].day);
                    $scope.day1=(forecastRaw[1].day);
                    $scope.day2=(forecastRaw[2].day);
                    $scope.day3=(forecastRaw[3].day);
                    $scope.day4=(forecastRaw[4].day);
                    $scope.min0= FtoC(forecastRaw[0].low);
                    $scope.min1= FtoC(forecastRaw[1].low);
                    $scope.min2= FtoC(forecastRaw[2].low);
                    $scope.min3= FtoC(forecastRaw[3].low);
                    $scope.min4= FtoC(forecastRaw[4].low);
                    $scope.max0= FtoC(forecastRaw[0].high);
                    $scope.max1= FtoC(forecastRaw[1].high);
                    $scope.max2= FtoC(forecastRaw[2].high);
                    $scope.max3= FtoC(forecastRaw[3].high);
                    $scope.max4= FtoC(forecastRaw[4].high);

                    //forecast = Math.round(((response.data.query.results.channel.item.condition.temp-32) * 5 / 9));
                    // when the response is available
                }, function forecastErrorCallback(response) {
                    console.log("Error: " + response);
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                }); 
            }

            function displayTemp(){
                $scope.temp = FtoC(tempRaw);
            }

            /*            function displayForecast(){
                          $scope.day0=(forecastRaw[0].day);
                          $scope.day1=(forecastRaw[1].day);
                          $scope.day2=(forecastRaw[2].day);
                          $scope.day3=(forecastRaw[3].day);
                          $scope.day4=(forecastRaw[4].day);
                          $scope.min0= FtoC(forecastRaw[0].low);
                          $scope.min1= FtoC(forecastRaw[1].low);
                          $scope.min2= FtoC(forecastRaw[2].low);
                          $scope.min3= FtoC(forecastRaw[3].low);
                          $scope.min4= FtoC(forecastRaw[4].low);
                          $scope.max0= FtoC(forecastRaw[0].high);
                          $scope.max1= FtoC(forecastRaw[1].high);
                          $scope.max2= FtoC(forecastRaw[2].high);
                          $scope.max3= FtoC(forecastRaw[3].high);
                          $scope.max4= FtoC(forecastRaw[4].high);
                          }*/

            var tick = function() {
                // weather functionality
                weatherResponse();
                displayTemp();
                forecastResponse();
                //displayForecast(); 
                // end of weather functionality
                $scope.clock = Date.now() // get the current time
                    $timeout(tick, $scope.tickInterval); // reset the timer
            }

            // Start the timer
            $timeout(tick, $scope.tickInterval);
        });
})();
