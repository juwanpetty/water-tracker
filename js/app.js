var user = {
  weight: 0,
  cupSize: 0,
  recommended: 0,
  amountConsumed: 0,
  goalReached: null,
  currentDay: null,
  history: {
    time: [],
    amount: []
  }
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
  localStorage.setItem("Cup Size", user.cupSize);
  localStorage.setItem("Recommended Consumption", user.recommended);
  localStorage.setItem("Amount Consumed", user.amountConsumed);
  localStorage.setItem("History Time", user.history.time);
  localStorage.setItem("History Amount", user.history.amount);
  localStorage.setItem("Goal Reached", user.goalReached);
  localStorage.setItem("Current Day", user.currentDay);
}

// A function to retrieve data in the app
function getData() {
  // get data from the app itself
  //  Weight
  var weight = localStorage.getItem("Weight");
  var weightNumber = $(".show-numbers div");
  if(weight == "0") {
    weightNumber[0].innerHTML = 0;
    weightNumber[1].innerHTML = 0;
    weightNumber[2].innerHTML = 0;
  } else {
    weightNumber[0].innerHTML = (weight.slice(0,1));
    weightNumber[1].innerHTML = (weight.slice(1,2));
    weightNumber[2].innerHTML = (weight.slice(2,3));
  }

  // Cup Size
  var cupSize = localStorage.getItem("Cup Size");
  $(".select-options > div").each(function( i ){
    var cupCard = this.querySelector("p").innerHTML;
    if (Number(cupCard.slice(0,2)) == Number(cupSize)) {
      this.classList.add("selected");
    }
  });

  // History
  if (user.history.time.length > 0) {
    var historyTime = user.history.time;
    var historyAmount = user.history.amount;
    for (var i = 0; i < historyTime.length; i++) {
      $(".history").prepend("<div class=" + "history-card" + "><p id=" + "time" + ">" + historyTime[i] + "</p><p id=" + "amount" + ">" + historyAmount[i] + " oz</p></div>");
    }
    var historyContent = document.getElementById('history-card-content');
    if( historyContent.hasChildNodes()) {
      var historyEmpty = document.getElementById('history-empty-state');
      historyEmpty.style.display = "none";
    }
  }

  // Recommended / Amount Consumed
  var amountConsumed = localStorage.getItem("Amount Consumed");
  var recommended = localStorage.getItem("Recommended Consumption");
  document.getElementById('progress').innerHTML = amountConsumed + " of " + recommended + " oz";

  // Background Progress
  $("#background-progress").css("height", (amountConsumed / recommended)*100 + "vh");
}

function updateUserFromMemory() {
  // Update the weight
  user.weight = localStorage.getItem("Weight");

  // Update custom cup value
  user.cupSize = localStorage.getItem("Cup Size");

  // Update recommended Consumption
  user.recommended = localStorage.getItem("Recommended Consumption");

  //  Update amount consumed
  user.amountConsumed = localStorage.getItem("Amount Consumed");

  // Update current days
  user.currentDay = localStorage.getItem("Current Day");

  // Update history
  if( localStorage.getItem("History Time") == "" && localStorage.getItem("History Amount") == "") {
    user.history.time = [];
    user.history.amount = [];
  } else {
    user.history.time = localStorage.getItem("History Time").split(",");
    user.history.amount = localStorage.getItem("History Amount").split(",");
  }
}

var selector = '.select-options > div';

$(selector).on('click', function(){
    $(selector).removeClass('selected');
    $(this).addClass('selected');
});

$(".top-controls > div:nth-of-type(1)").click(function(){
    var value = $(".show-numbers > div:nth-of-type(1)").html();
    if (Number(value) + 1 == 10) {
      value = Number("0");
    } else {
      value = Number(value) + 1;
    }
    $(".show-numbers > div:nth-of-type(1)").html(value);
});
$(".top-controls > div:nth-of-type(2)").click(function(){
    var value = $(".show-numbers > div:nth-of-type(2)").html();
    if (Number(value) + 1 == 10) {
      value = Number("0");
    } else {
      value = Number(value) + 1;
    }
    $(".show-numbers > div:nth-of-type(2)").html(value);
});
$(".top-controls > div:nth-of-type(3)").click(function(){
    var value = $(".show-numbers > div:nth-of-type(3)").html();
    if (Number(value) + 1 == 10) {
      value = Number("0");
    } else {
      value = Number(value) + 1;
    }
    $(".show-numbers > div:nth-of-type(3)").html(value);
});

$(".bottom-controls > div:nth-of-type(1)").click(function(){
    var value = $(".show-numbers > div:nth-of-type(1)").html();
    if (Number(value) - 1 == -1) {
      value = Number("9");
    } else {
      value = Number(value) - 1;
    }
    $(".show-numbers > div:nth-of-type(1)").html(value);
});
$(".bottom-controls > div:nth-of-type(2)").click(function(){
    var value = $(".show-numbers > div:nth-of-type(2)").html();
    if (Number(value) - 1 == -1) {
      value = Number("9");
    } else {
      value = Number(value) - 1;
    }
    $(".show-numbers > div:nth-of-type(2)").html(value);
});
$(".bottom-controls > div:nth-of-type(3)").click(function(){
    var value = $(".show-numbers > div:nth-of-type(3)").html();
    if (Number(value) - 1 == -1) {
      value = Number("9");
    } else {
      value = Number(value) - 1;
    }
    $(".show-numbers > div:nth-of-type(3)").html(value);
});

function updateUserSettings() {
  // Update user weight
  user.weight = $(".show-numbers > div:nth-of-type(1)").html() + $(".show-numbers > div:nth-of-type(2)").html() + $(".show-numbers > div:nth-of-type(3)").html();
  user.weight = Number(user.weight);

  // Update cup size
  $(".select-options > div").each(function( i ) {
    if (this.classList.contains("selected")) {
      user.cupSize = this.querySelector("p").innerHTML;
      user.cupSize = user.cupSize.slice(0, user.cupSize.length - 2);
    }
  });

  // Update recommended
  var element = $(".show-numbers div");
  var x = element[0].innerHTML;
  var y = element[1].innerHTML;
  var z = element[2].innerHTML;
  var userWeight = x + y + z;
  user.weight = userWeight;
  user.recommended = (user.weight * 2/3).toFixed(0);

  document.getElementById('progress').innerHTML = user.amountConsumed +" of " + user.recommended + " oz";

  // Save the user objects to localStorage
}

function getCurrentTime() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var meridiem  = date.toLocaleTimeString();

  if (hours > 12) {
    hours = hours - 12;
  } else if (hours == 0) {
    hours = 12;
  } else {
    hours = date.getHours();
  }

 if (minutes < 10) {
   minutes = "0" + date.getMinutes();
 } else {
   minutes = date.getMinutes();
 }

 meridiem = meridiem.slice(8);

 return hours + ":" + minutes + " " + meridiem;
}

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

      $(".modal-text h1").html("Today is a new day!");
      $(".modal-text p").html("");
      $("#modal").css("display", "flex");
      $("#overlay").css("display", "flex");
      $("#modal").addClass("animated fadeIn");

      $(".button-modal p").click(function(){
        $("#modal").css("display", "none");
        $("#overlay").css("display", "none");
        $("#modal").removeClass("animated fadeIn");
      });

      console.log("Changed currentDay value...");
      // If the days are different, update user.currentDay
      user.currentDay = date.getDay();
      // reset user data
      user.amountConsumed = 0;
      user.history.time = [];
      user.history.amount = [];
    }
  }
  setData();
}

function noCupSelected() {
  $('#image-modal').attr("src", "assets/icons/empty-cup.svg");
  $(".modal-text h1").html("Half empty or half full?");
  $(".modal-text p").html("It seems like you didn't choose a cup size. <br><br> Head to the settings to update your cup size.");
  $("#modal").css("display", "flex");
  $("#modal").css("background", "#EF5350");
  $("#modal").css("color", "#FFFFFF");
  $("#overlay").css("display", "flex");
  $("#modal").addClass("animated fadeIn");

  $(".button-modal p").css("background", "#EF9A9A");
  $(".button-modal p").css("border-color", "#EF9A9A");

  $(".button-modal p").click(function(){
    $("#modal").css("display", "none");
    $("#modal").css("background", "#FFFFFF");
    $("#modal").css("color", "#3F3F3F");
    $("#overlay").css("display", "none");
    $("#modal").removeClass("animated fadeIn");

    $(".button-modal p").css("background", "#32BAFA");
    $(".button-modal p").css("border-color", "#32BAFA");
});
};


function backgroundProgress() {
  $("#background-progress").css("height", (user.amountConsumed / user.recommended)*100 + "vh");
}

function addHistoryToArray() {
  var time = getCurrentTime();
  var amount = user.cupSize;

  user.history.time.push(time);
  user.history.amount.push(amount);
}

function addDrink() {
  var historyContent = document.getElementById('history-card-content');
  if (historyContent.hasChildNodes() && user.cupSize != 0) {

    var historyEmpty = document.getElementById('history-empty-state');
    historyEmpty.style.display = "none";

    $(".history").prepend("<div class=" + "history-card" + "><p id=" + "time" + ">" + getCurrentTime() + "</p><p id=" + "amount" + ">" + user.cupSize + " oz</p></div>");
    addHistoryToArray();

    user.amountConsumed = (Number(user.amountConsumed));
    user.amountConsumed += Number(user.cupSize);
    document.getElementById('progress').innerHTML = user.amountConsumed  + " of " + user.recommended + " oz";

    backgroundProgress();
    goalReached();
  } else {
    noCupSelected();
  }
}

function checkSettingsCup() {
  $(".select-options > div").each(function( i ) {
    if (this.classList.contains("selected")) {
      var selectedCup = this.querySelector("p").innerHTML;
      selectedCup = selectedCup.slice(0, selectedCup.length - 2);

      if(Number(selectedCup) != Number(user.cupSize)) {
        $("#save").removeClass("btn-secondary");
        $("#save").addClass("btn-primary");
        $("#save").addClass("animated pulse");
      } else {
        $("#save").removeClass("btn-primary");
        $("#save").addClass("btn-secondary");
        $("#save").removeClass("animated pulse");
      }
    }
  });
}

function shakeSettings() {
  if( user.cupSize == 0 && user.weight == 0) {
    $('#settings-button').addClass('animated tada');
  } else {
    $('#settings-button').removeClass('animated tada');
  }
}


$("#save").click(function() {
  if($("#save").hasClass("btn-primary")) {
    updateUserSettings();
    setData();
    checkSettings();
    shakeSettings();
  }
});

function checkSettingsWeight() {
  // record current weight in settings
  var weightNumber = $(".show-numbers div");
  var weightSettings = weightNumber[0].innerHTML + weightNumber[1].innerHTML + weightNumber[2].innerHTML;

  // get user weight
  var userWeight = user.weight;

  // If the number is any different that from what was recorded
  if(weightSettings != user.weight) {
    $("#save").removeClass("btn-secondary");
    $("#save").addClass("btn-primary");
    $("#save").addClass("animated pulse");
  } else {
    $("#save").removeClass("btn-primary");
    $("#save").addClass("btn-secondary");
    $("#save").removeClass("animated pulse");
  }
}

function checkSettings() {
  checkSettingsWeight();
  checkSettingsCup();
}

function goalReached() {
  var today = new Date().toLocaleDateString();

  // if this function already ran today, do not continue.
  if( localStorage.goalReached == today ) return;

  if(user.amountConsumed >= user.recommended) {
    $('#image-modal').attr("src", "assets/icons/cup.svg");
    $(".modal-text h1").html("You reached your daily goal!");
    $(".modal-text p").html("Great job! You drank " + user.amountConsumed + " oz of water. <br><br> Keep it up!");
    $("#modal").css("display", "flex");
    $("#overlay").css("display", "flex");
    $("#modal").addClass("animated fadeIn");

    $(".button-modal p").click(function(){
      $("#modal").css("display", "none");
      $("#overlay").css("display", "none");
      $("#modal").removeClass("animated fadeIn");
    });

    // save today's date on the client's computer
    localStorage.goalReached = today;
  }
}

// Move settings menu
var settings = document.getElementById('settings-button');
settings.addEventListener("click", function() {
    $("#settings").addClass("settings-active");
    $("#history").removeClass("history-active");
    $("#overlay").css("display", "flex");
}, true);

var settingsClose = document.getElementById('settings-close');
settingsClose.addEventListener("click", function() {
    $("#settings").removeClass("settings-active");
    $("#overlay").css("display", "none");
}, true);

// Move history menu
var appHistory = document.getElementById('history-button');
appHistory.addEventListener("click", function() {
    $("#history").addClass("history-active");
    $("#settings").removeClass("settings-active");
    $("#overlay").css("display", "flex");
}, true);

var historyClose = document.getElementById('history-close');
historyClose.addEventListener("click", function() {
    $("#history").removeClass("history-active");
    $("#overlay").css("display", "none");
}, true);

var overlay = document.getElementById('overlay');
overlay.addEventListener("click", function() {
  if($("#history").hasClass("history-active") || $("#settings").hasClass("settings-active")) {
    $("#history").removeClass("history-active");
    $("#settings").removeClass("settings-active");
    $("#overlay").css("display", "none");
  }
}, true);

$(".top-controls div, .bottom-controls div").click(function(){
  checkSettingsWeight();
});

$(".select-options div").click(function(){
  checkSettingsCup();
});

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

  setData();
  console.log("Data has been set...");
  console.log("");

  shakeSettings();
}

app();
