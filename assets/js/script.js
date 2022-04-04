// find current day/month/year
var timeDisplayEl = document.querySelector("#time-display");
timeDisplayEl.textContent = moment().format("dddd MMMM Mo YYYY");

// save tasks to local storage upon clicking save icon
$(document).ready(function () { 
  $('.saveBtn').on('click', function () {
    var tasks = $(this).siblings(".textarea").val();
    var time = $(this).parent().attr('id');

    // save tasks
    localStorage.setItem(time, tasks);
  })

  function timeBlocks() {
    // get current hour
    var currentHour = moment().hour();

    // check each time block and reference to current hour
    $(".time-block").each(function () {
      // split id so that hour in timeblock can be used as numerical value
      var timeSplit = parseInt($(this).attr("id").split("-")[1]);

      // timeblock is in the past
      if (timeSplit < currentHour) {
        $(this).removeClass("present");
        $(this).removeClass("future");
        $(this).addClass("past");

      // timeblock is in the present  
      } else if (timeSplit === currentHour) {
        $(this).removeClass("past");
        $(this).removeClass("future");
        $(this).addClass("present");
        
      // timeblock is in the future  
      } else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    })
  }

    // grab tasks from local storage and place them in timeblock upon refresh
    $("#hour-9 .textarea").val(localStorage.getItem("hour-9"));
    $("#hour-10 .textarea").val(localStorage.getItem("hour-10"));
    $("#hour-11 .textarea").val(localStorage.getItem("hour-11"));
    $("#hour-12 .textarea").val(localStorage.getItem("hour-12"));
    $("#hour-13 .textarea").val(localStorage.getItem("hour-13"));
    $("#hour-14 .textarea").val(localStorage.getItem("hour-14"));
    $("#hour-15 .textarea").val(localStorage.getItem("hour-15"));
    $("#hour-16 .textarea").val(localStorage.getItem("hour-16"));
    $("#hour-17 .textarea").val(localStorage.getItem("hour-17"));

// call main function for timeblocks 
timeBlocks();
});


