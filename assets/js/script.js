// find current day/month/year
var timeDisplayEl = document.querySelector("#time-display");
timeDisplayEl.textContent = moment().format("dddd MMMM Mo YYYY");

// global variable for current hour
var now = moment();
var currentHour = now.hour();
console.log(currentHour);

// variable for check time, split id string
var checkHour = function() {
    $(".row").each(function() {
      var id = $(this).attr('id');
      var splitId =  id.split("-");
      var elementHour = parseInt(splitId[1]);

      if (elementHour < currentHour ) {

      } else if (elementHour === currentHour) {

      } else if (elementHour > currentHour) {

      }
    });
}

