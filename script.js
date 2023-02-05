const pomodoroTimer = document.getElementById("pomodoro-timer")

const startButton = document.getElementById("pomodoro-start")
const pauseButton = document.getElementById("pomodoro-pause")
const stopButton = document.getElementById("pomodoro-stop")

let isClockRunning = false

// 25 minutes in seconds

let workSessionDuration = 1500
let currentTimeLeftInSession = 1500

// 5 minutes in seconds

let breakSessionSuration = 300

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
    isClockRunning = false
    currentTimeLeftInSession = workSessionDuration
    displayCurrentTimeLeftInSession()
}