window.onload = function () {

    // DISPLAY CURRENT WEATHER where .on("click") will trigger $.ajax
    $("#search-button").on("click", function (event) {
          event.preventDefault();
          saveToLocalStorage();
          saveToLocalStorage0();
          saveToLocalStorage1();
          saveToLocalStorage2();
          saveToLocalStorage3();
          saveToLocalStorage4();
          searchHistory();

          // take value from search-input
          var city = $("#search-input").val();

          // construct URL
          var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=000401db107b5cbe165fdf198e9f1e47";

          $.ajax({
                url: queryURL,
                method: "GET"

          }).then(function (response) {

                // Constructing HTML containing the weather information for searched city
                var currentDate = new Date();
                var currentDay = " (" + (currentDate.getMonth()) + "/" + (currentDate.getDate()) + "/" + (currentDate.getFullYear()) + ")";
                
                var cityName = $("<h2>").text(response.name).append(currentDay);
                var cityNameList = $("<li>").text(response.name);
                 

                cityNameList.addClass("list-group-item");

                var weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
                var weatherType = $("<p class='bold'>").text(response.weather[0].main);

                // concert kelvin to celsius
                var tempInt = parseInt(response.main.temp);
                var tempC = tempInt -273;
                var cityTemp = $("<p class='temp'>").text(Math.floor(tempC) + "°");
                var cityHumidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
                var cityWindSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + " MPH");

                // Empty the contents of the city-box div, append the current weather of searched city
                $("#city-box").empty();
                $("#city-box").append(cityName, weatherIcon, weatherType, cityTemp, cityHumidity, cityWindSpeed);

                // prepend the searched city onto city-list
                $("#list-group").prepend(cityNameList);

                // UV INDEX
                var lat = response.coord.lat;
                var lon = response.coord.lon;

                // construct URL for UV index
                var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?appid=000401db107b5cbe165fdf198e9f1e47&lat=" + lat + "&lon=" + lon;

                $.ajax({
                      url: queryURL2,
                      method: "GET"

                }).then(function (response2) {

                      var uvIndex = $("<p>").text("UV Index: " + Math.floor(response2.value));
                      $("#city-box").append("<div id='uv-box' class=''></div>");
                      $("#uv-box").append(uvIndex);

                      // UV Index Color Change 
                      if (Math.floor(response2.value) <= 2) {
                            $("#uv-box").addClass("uvFavorable");
                      } if (Math.floor(response2.value) >= 3 && Math.floor(response2.value) <= 8) {
                            $("#uv-box").addClass("uvModerate");
                      } if (Math.floor(response2.value) >= 9) {
                            $("#uv-box").addClass("uvSevere");
                      }

                });
          });

    });

    // DISPLAY FIVE DAY FORECAST
    $("#search-button").on("click", function (event) {
          event.preventDefault();

          var city = $("#search-input").val();
          var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=000401db107b5cbe165fdf198e9f1e47";

          $.ajax ({
                url: queryURL,
                method: "GET"
          }).then(function (response) {
                // Constructing HTML containing the five day forecast for searched city
                // day one
                var date0 = response.list[0].dt_txt;
                var slicedate0 = date0.slice(5, 10);

                var date0 = $("<p>").text(slicedate0);
                var weatherIcon0 = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + ".png");
                var weatherType0 = $("<p class='bold'>").text(response.list[0].weather[0].main);
                
                var tempHighInt0 = parseInt(response.list[0].main.temp_max);
                var tempHighC0 = tempHighInt0 - 273;
                var cityHighTemp0 = $("<p class='temp'>").text(Math.floor(tempHighC0) + "°");

                var humidity0 = $("<p>").text("Humidity: " + response.list[0].main.humidity + "%");

                $("#div0").empty();
                $("#div0").append(date0, weatherIcon0, weatherType0, cityHighTemp0, humidity0);

                // day two
                var date1 = response.list[8].dt_txt;
                var slicedate1 = date1.slice(5, 10);

                var date1 = $("<p>").text(slicedate1);
                var weatherIcon1 = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.list[8].weather[0].icon + ".png");
                var weatherType1 = $("<p class='bold'>").text(response.list[8].weather[0].main);
                
                var tempHighInt1 = parseInt(response.list[8].main.temp_max);
                var tempHighC1 = tempHighInt1 - 273;
                var cityHighTemp1 = $("<p class='temp'>").text(Math.floor(tempHighC1) + "°");

                var humidity1 = $("<p>").text("Humidity: " + response.list[8].main.humidity + "%");

                $("#div1").empty();
                $("#div1").append(date1, weatherIcon1, weatherType1, cityHighTemp1, humidity1);

                // day three
                var date2 = response.list[16].dt_txt;
                var slicedate2 = date2.slice(5, 10);

                var date2 = $("<p>").text(slicedate2);
                var weatherIcon2 = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.list[16].weather[0].icon + ".png");
                var weatherType2 = $("<p class='bold'>").text(response.list[16].weather[0].main);

                var tempHighInt2 = parseInt(response.list[16].main.temp_max);
                var tempHighC2 = tempHighInt2 - 273;
                var cityHighTemp2 = $("<p class='temp'>").text(Math.floor(tempHighC2) + "°");

                var humidity2 = $("<p>").text("Humidity: " + response.list[16].main.humidity + "%");

                $("#div2").empty();
                $("#div2").append(date2, weatherIcon2, weatherType2, cityHighTemp2, humidity2);

                // day four
                var date3 = response.list[24].dt_txt;
                var slicedate3 = date3.slice(5, 10);

                var date3 = $("<p>").text(slicedate3);
                var weatherIcon3 = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.list[24].weather[0].icon + ".png");
                var weatherType3 = $("<p class='bold'>").text(response.list[24].weather[0].main);

                var tempHighInt3 = parseInt(response.list[24].main.temp_max);
                var tempHighC3 = tempHighInt3 - 273;
                var cityHighTemp3 = $("<p class='temp'>").text(Math.floor(tempHighC3) + "°");

                var humidity3 = $("<p>").text("Humidity: " + response.list[24].main.humidity + "%");

                $("#div3").empty();
                $("#div3").append(date3, weatherIcon3, weatherType3, cityHighTemp3, humidity3);

                // day five
                var date4 = response.list[32].dt_txt;
                var slicedate4 = date4.slice(5, 10);

                var date4 = $("<p>").text(slicedate4);
                var weatherIcon4 = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.list[32].weather[0].icon + ".png");
                var weatherType4 = $("<p class='bold'>").text(response.list[32].weather[0].main);

                var tempHighInt4 = parseInt(response.list[32].main.temp_max);
                var tempHighC4 = tempHighInt4 - 273;
                var cityHighTemp4 = $("<p class='temp'>").text(Math.floor(tempHighC4) + "°");

                var humidity4 = $("<p>").text("Humidity: " + response.list[32].main.humidity + "%");

                $("#div4").empty();
                $("#div4").append(date4, weatherIcon4, weatherType4, cityHighTemp4, humidity4);
          });
    });
}