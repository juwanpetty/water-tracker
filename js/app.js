//  Menu Animation
$( document ).ready(function() {
  $('.open-menu').click(function() {
    $('#settings').toggleClass('menu-active');
    $('#settings').removeClass('menu-inactive');
  });

  $('main, .close-menu i').click(function() {
    if ( $('#settings').hasClass('menu-active') ) {
      $('#settings').addClass('menu-inactive');
      $('#settings').removeClass('menu-active');
    } else {
      // do nothing
    }
  });
});

// Variable object for user
var user = {
  weight: 0,
  weightUnit: "",
  volumeUnit: "",
  customValue: 0,
  recommendedConsumption: 0,
  amountConsumed: 0,
  progress: 0,
  currentDay: null
}

var date = new Date();

// Update current day
function getCurrentDay() {
  // If there is no value in currentDay
  if (user.currentDay == null) {
    // Set a day to the value field
    date = new Date();
    user.currentDay = date.getDay();
  } else { // else
    // Get the current day
    date = new Date();
    // Compare it to the stored day
    if (user.currentDay != date.getDay()) {
      alert("Today is a new day!");
      console.log("Changed currentDay value...");
      // If the days are different, update user.currentDay
      user.currentDay = date.getDay();
      // reset amount consumed
      user.amountConsumed = 0;
    }
  }
  setData();
}

// A function to delete all storage
function clearMemory() {
  localStorage.clear();
  return("USER DATA HAS BEEN RESET");
}

// A function to take values from the user and put it in localStorage
function setData() {
  // set data for the key and values for user
  localStorage.setItem("Weight", user.weight);
  localStorage.setItem("Weight Unit", user.weightUnit);
  localStorage.setItem("Volume Unit", user.volumeUnit);
  localStorage.setItem("Custom Value", user.customValue);
  localStorage.setItem("Recommended Consumption", user.recommendedConsumption);
  localStorage.setItem("Amount Consumed", user.amountConsumed);
  localStorage.setItem("Progress", user.progress);
  localStorage.setItem("Current Day", user.currentDay);
}

// A function to retrieve data in the app
function getData() {
  // get data from the app itself
  document.getElementById('weight').value = localStorage.getItem("Weight");
  document.getElementById('weight-unit').value = localStorage.getItem("Weight Unit");
  document.getElementById('volume-unit').innerHTML = localStorage.getItem("Volume Unit");
  document.getElementById('custom-value').value = localStorage.getItem("Custom Value");
  document.getElementById('recommended').innerHTML = localStorage.getItem("Recommended Consumption");
  document.getElementById('amount-consumed').innerHTML = localStorage.getItem("Amount Consumed");
  document.getElementById('progress').innerHTML = localStorage.getItem("Progress") + " " +  user.volumeUnit + " to go";;
}

// Update the data in object user
function updateUser() {
  // Update the weight
  user.weight = Number(document.getElementById('weight').value);

  // Update Weight Unit
  user.weightUnit = document.getElementById('weight-unit').value;

  // Update the volume unit
  user.volumeUnit = (user.weightUnit == "lb") ? "oz" : "ml";
  document.getElementById('volume-unit').innerHTML = user.volumeUnit;

  // Update custom cup value
  user.customValue = Number(document.getElementById('custom-value').value);

  // Update recommended Consumption
  if (user.weight != "") {
    user.recommendedConsumption = user.weightUnit == "lb" ? (user.weight * (2/3)).toFixed(0) : (user.weight / (0.0625)).toFixed(0);
  } else {
    user.recommendedConsumption = 0;
  }
  document.getElementById('recommended').innerHTML = user.recommendedConsumption + " " + user.volumeUnit;

  // Updates the DOM for the amount consumed
  document.getElementById('amount-consumed').innerHTML = user.amountConsumed;

  // Update progress
  user.progress = Number(user.recommendedConsumption) - Number(user.amountConsumed);
  document.getElementById('progress').innerHTML = user.progress <= 0 && user.amountConsumed > 0 ? "You reached today's goal!" : user.progress.toFixed(0) + " " + user.volumeUnit + " to go";

  // A microinteraction function: gives a visual on the progress the user has
  // made daily based on viewport height
  document.getElementById('progress-level').style.height = isNaN(user.amountConsumed / user.recommendedConsumption) ? "0vh" : ((user.amountConsumed / user.recommendedConsumption) * 100) + "vh";
}

function updateUserFromMemory() {
  // Update the weight
  user.weight = localStorage.getItem("Weight");

  // Update Weight Unit
  user.weightUnit = localStorage.getItem("Weight Unit");

  // Update the volume unit
  user.volumeUnit = localStorage.getItem("Volume Unit");

  // Update custom cup value
  user.customValue = localStorage.getItem("Custom Value");

  // Update recommended Consumption
  user.recommendedConsumption = localStorage.getItem("Recommended Consumption");

  //  Update amount consumed
  user.amountConsumed = localStorage.getItem("Amount Consumed");

  // Update progress
  user.progress = localStorage.getItem("Amount Consumed");

  // Update current days
  user.currentDay = localStorage.getItem("Current Day");
}

// A function to add a drink (based on volume amount) when the user hits "Add Drink"
function addDrink() {
  console.log("Added drink");
  user.amountConsumed = Number(user.amountConsumed) + Number(user.customValue);
  updateUser();
  setData();
}

// A function to subtract a drink (based on volume amount) when the user clicks "Undo"
function undoDrink() {
  console.log("Undo drink");
  // Makes sure that the comsumed never goes under 0 when clicking "Undo"
  if (Number(user.amountConsumed) - Number(user.customValue) < 0) {
    user.amountConsumed = 0;
  } else {
    user.amountConsumed = Number(user.amountConsumed) - Number(user.customValue);
  }
  updateUser();
  setData();
}

document.getElementById('form').addEventListener("focus", function(event) {
  document.getElementById('form').addEventListener("keyup", function(event) {
    updateUser();
    setData();
  }, true);
}, true);

// Initialize
function app() {
  console.log("Started app");
  console.log("");

  if (window.localStorage.length > 0) {
    updateUserFromMemory();
    console.log("User data updated from memory...");
    getData();
    console.log("Got data...");
    console.log("");
  }
  getCurrentDay();
  console.log("Updated current day...");
  console.log("");

  updateUser();
  console.log("Updated user data...");
  console.log("");

  setData();
  console.log("Data has been set...");
  console.log("");
}

app();
