const pomodoroTimer = document.getElementById("pomodoro-timer")

const startButton = document.getElementById("pomodoro-start")
const pauseButton = document.getElementById("pomodoro-pause")
const stopButton = document.getElementById("pomodoro-stop")

let isClockRunning = false
let type = "Work"

// 25 minutes in seconds

let workSessionDuration = 1500
let currentTimeLeftInSession = 1500
let timeSpentInCurrentSession = 0

// 5 minutes in seconds

let breakSessionDuration = 300

//Start button functionality

startButton.addEventListener("click", () => {
    toggleClock()
})

//Pause button functionality

pauseButton.addEventListener("click", () => {
    toggleClock()
})

//Stop button functionality

stopButton.addEventListener("click", () => {
    toggleClock(true)
})

const toggleClock = (reset) => {
    if(reset) {
        // Stop the timer
        stopClock()
    }
    else {
        if(isClockRunning === true) {
            // Pause the timer
            clearInterval(clockTimer)
            isClockRunning = false
        }
        else {
            // Start the timer
            isClockRunning = true
                clockTimer = setInterval(()=> {
                currentTimeLeftInSession--
                displayCurrentTimeLeftInSession()
            }, 1000)
        }

    }
}

const displayCurrentTimeLeftInSession = () => {
    const secondsLeft = currentTimeLeftInSession
    let result = ""
    const seconds = secondsLeft % 60
    const minutes = parseInt(secondsLeft / 60) % 60
    let hours = parseInt(secondsLeft / 3600)

    // Add 0s if at less than 10

    function addLeadingZeroes(time) {
        return time < 10 ? `0${time}` : time
    }

    if (hours > 0) result += `${hours}:`
    result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`
    pomodoroTimer.innerText = result.toString()
}

const stopClock = () => {
    // Reset timer
    clearInterval(clockTimer)
    timeSpentInCurrentSession = 0
    isClockRunning = false
    currentTimeLeftInSession = workSessionDuration
    displayCurrentTimeLeftInSession()
}

const stepDown = () => {
    if(currentTimeLeftInSession > 0) {
        currentTimeLeftInSession--
        timeSpentInCurrentSession++
    }
    else if (currentTimeLeftInSession === 0) {
        timeSpentInCurrentSession = 0
        if(type === "Work"){
            currentTimeLeftInSession = breakSessionDuration
            displaySessionLog("Work")
            type = "Break"
        }
        else {
            currentTimeLeftInSession = workSessionDuration
            type = "Work"
            displaySessionLog("Break")
        }
    }
    displayCurrentTimeLeftInSession()
}

const displaySessionLog = (type) => {
    const sessionsList = document.getElementById("pomodoro-sessions")
    const li = document.createElement("li")
    let elapsedTime = parseInt(timeSpentInCurrentSession / 60)
    elapsedTime = elapsedTime > 0 ? elapsedTime : "< 1"

    const text = document.createTextNode(`${sesionLabel} : ${elapsedTime} min`)
    li.appendChild(text)
    sessionsList.appendChild(li)
}