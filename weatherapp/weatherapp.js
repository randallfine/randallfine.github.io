$(document).ready(function getLocation() {
    $.get('http://ip-api.com/json', function(loc) {

        
      $('#city').text(loc.city + ', ' + loc.region + ', ' + loc.countryCode);
      getWeather(loc.zip);
    })
  })
  //calling the API
function getWeather(zip) {
  var requestAPI = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zip + '&units=imperial' + '&type=accurate' +
    '&APPID=' + '518252916d7bc09761836d7dec5a43d8';
  //getting user temp and weather data
  $.get(requestAPI, function(weatherData) {
    var tempF = weatherData.main.temp.toFixed(0);
    var tempC = ((tempF - 32) * (5 / 9)).toFixed(0);
    $("#theTemp").text(tempF + "° F");
    $("#theTemp").mouseover(function() {
      $("#theTemp").text(tempC + "° C");
    })
    $("#theTemp").mouseout(function() {
      $("#theTemp").text(tempF + "° F");
    })

      //display weather condition   
    $("#condition").html(weatherData.weather[0].description);
    var icon = weatherData.weather[0].icon;
    $("img").attr("src", 'http://openweathermap.org/img/w/' + icon + '.png');
  })
}

//geting the time and date
var curDate = new Date();
var curHour = curDate.getHours();
var marid = "";
if (curHour == 0) {
  curHour = curHour + 12;
  marid = " AM";
} else if (curHour > 12) {
  curHour = curHour - 12;
  marid = " PM";
} else {
  marid = " AM";
}

//fix single digit minutes to double digit
var curMin = curDate.getMinutes();
if (curMin < 10) {
  curMin = "0" + curMin;
}
// display days of the week
$("#time").text(curHour + ":" + curMin + marid);
var curDayOfWeek = curDate.getDay();
var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
// display month
$("#dayOfWeek").text(dayNames[curDayOfWeek])
var curMonth = curDate.getMonth()
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

$("#month").text(monthNames[curMonth]);

var curDay = curDate.getDate();
// //fix single digit date to double digit
if (curDay < 10) {
  curDay = "0" + curDay;
}
$("#day").text(curDay);

var curYear = curDate.getFullYear();
$("#year").text(curYear);
console.log(curMonth,curDay, curYear)
