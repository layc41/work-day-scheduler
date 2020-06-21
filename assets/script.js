
//set current date at top - done 
var today = document.querySelector("#currentDay")
var currentDate = moment();
today.textContent = currentDate.format("dddd, MMMM Do")

//save button
$(".saveBtn").on("click", function (event) {
    // confirm that this function is activated when the save button is clicked
    // console.log(this)

    // prevent refreshing the page 
    event.preventDefault();
    
    // taskD is the value of the description the user inputs
    var taskD = $(this).siblings(".description").val()

    // taskH is the id that is connected to the task within the block
    var taskH = $(this).siblings(".description").attr("id")
    
    // confirm the values pulled for taskH ex: (H-9) and taskD ex: task description
    // console.log("key and value", taskH, taskD)

    localStorage.setItem(taskH, taskD)
})

// function to audit time to make red or green etc
var auditTime = function () { 

    // pulls current military time from moment.js
    var currentHour = moment().hours();
    // console.log(currentHour) - confirm the hour
 
    //loops through each timeblock with class description and runs this function to audit and render last task
    $(".description").each(function () {
        // pulls task from local storage to create persistence when page is refreshed
        // this is referring to the element with class description
        $(this).val(localStorage.getItem($(this).attr("id")))

        // pulls id from the same block (H-9), splits it to an array ex: [H, 9], and calls the hour value [1] for comparison 
        var hour = parseInt($(this).attr("id").split("-")[1])
        // console.log(this) - confirms the element that was selected 

        if (currentHour > hour) {
            $(this).addClass("past");
        } else if (currentHour === hour) {
            $(this).addClass("present");
        } else {
            $(this).addClass("future");
        }
    })
}

// calls the audit function to loop through time and add classes to id based on hour in relation to current time
auditTime();