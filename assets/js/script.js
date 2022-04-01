// find current day/time
var timeDisplayEl = document.querySelector("#time-display");
timeDisplayEl.textContent = moment().format("dddd MMMM Mo YYYY");

// assign the correct time vlue to each time block
// add or remove classes based on past/present/future
// add a save button that saves text in each block