// find current day/month/year
var timeDisplayEl = document.querySelector("#time-display");
timeDisplayEl.textContent = moment().format("dddd MMMM Mo YYYY");

// variable to selecting each timeblock and add classes 
var timeBlock = document.getElementById('textarea');

// save tasks to local storage
const saveBtn = document.querySelector('#save');
const getTask = document.querySelector('.textarea');

saveBtn.addEventListener('click', function () {
  localStorage.setItem('task', getTask.value);
});

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
      console.log(elementHour);
      
      if (currentHour > elementHour) {
        timeBlock.classList.add("past");
      
      } else if (currentHour === elementHour) {
        timeBlock.classList.add("present");
      
      } else if (currentHour < elementHour) {
        timeBlock.classList.add("future");
      }
    });
}

checkHour();

