const pomodoroTimer = document.getDocumentById("pomodoro-timer")

const startButton = document.getDocumentById("pomodoro-start")
const pauseButton = document.getDocumentById("pomodoro-pause")
const stopButton = document.getDocumentById("pomodoro-stop")

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
    toggleClock()
})