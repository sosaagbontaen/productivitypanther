tick = new Audio();
tick.src = "resources/tick.mp3";
click = new Audio();
click.src = "resources/FGBS(5).wav";
click2 = new Audio();
click2.src = "resources/FGBS(8).wav";
error = new Audio();
error.src = "resources/error.mp3";
check = new Audio();
check.src = "resources/check.mp3";
scroll = new Audio();
scroll.src = "resources/FGBS(39).wav";
roar = new Audio();
roar.src = "resources/roar.mp3";
ticking = false;
sbreak = false;
lbreak = false;
sessions = 0;

body = document.querySelector("body");
timer = document.querySelector("#timer");
updateBtn = document.querySelector("#updateBtn");
playBtn = document.querySelector("#playBtn");
pauseBtn = document.querySelector("#pauseBtn");
workInput = document.querySelector("#workInput");
lBreakInput = document.querySelector("#lBreakInput");
sBreakInput = document.querySelector("#sBreakInput");
settings = document.querySelector(".inputContainer");
settingsBtn = document.querySelector("#settingsBtn");
modal = document.querySelector("#confirmation");
indicator = document.querySelector("#indicator");
seshType = document.querySelector("#seshType");
tabName = document.querySelector("#tabName");

let time = Number(workInput.value) * 60;

countdown = timer
function updateIndicator(){

}
function updateCountdown(){ /*Source for basic timer implementation: W3Schools.com - https://www.w3schools.com/howto/howto_js_countdown.asp*/
        var currentBGColor = timer.style.backgroundColor;
        var currentBorderColor = timer.style.borderColor;
        let minutes = Math.floor(time/60);
        let seconds = Math.floor(time % 60);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        minutes = minutes < 10 ? "0" + minutes: minutes;
        countdown.innerText = minutes + ":" + seconds;
		tabName.innerHTML = "(" + countdown.innerText + ") Productivity Panther";
        /*Session ends*/
        if (minutes <= 0 && seconds <= 0){
            if (ticking == true){
                seshType.style.color="green";
                if (sessions < 3){ /*If intermediate work session ends, start a short break*/
                    seshType.textContent = "Time for a short break!";
                    sessions++;
                    sbreak = true;
                    ticking = false;
                    time = Number(sBreakInput.value) * 60;
                }
                else if (sessions >= 3){ /*If final work session ends, start a long break*/
                    seshType.innerText = "Time for a long break!";
                    sessions ++;
                    lbreak = true;
                    ticking = false;
                    time = Number(lBreakInput.value) * 60;
                }
            }
            else if (sbreak == true){ /*If short break ends, start a work session*/
                seshType.style.color="#05152C";
                seshType.innerText = "Time to get to work!"
                time = Number(workInput.value) * 60;
                sbreak = false;
                ticking = false;

            }
            else if (lbreak == true){ /*If long break ends, start a work session and reset session count*/
                seshType.style.color="#05152C";
                seshType.innerText = "New session, let's go!"
                time = Number(workInput.value) * 60;
                lbreak = false;
                ticking = false;
                sessions = 0;

            }
            indicator.innerText = sessions + "/4 Sessions Completed";
            updateCountdown();
            tick.pause()
            tick.currentTime=0;
            clearInterval(setCountdown);
            checkSound();
            playBtn.style.color = "#05152C";
            stopBtn.style.color = "#1491C3";
            pauseBtn.style.color = "#05152C";
            timer.style.backgroundColor = "green";
            setTimeout(function(){
                timer.style.backgroundColor = currentBGColor;
                timer.style.borderColor = currentBorderColor;
            }, 2000)
        }
    }
function startCountdown() {
    if (time < 0){
        clearInterval(setCountdown)
    }
    updateCountdown();
    time--;
    }

startCountdown();

function play()
{
    if (ticking == false){
        clickSound()
        if (sbreak == false && lbreak == false && ticking == false){
            ticking = true;
        }
        else if (sbreak == true){
            ticking = false;
            lbreak = false;
        }
        else if (lbreak == true){
            ticking = false;
            sbreak = false;
        }

            tickSound();
            playBtn.style.color = "#1491C3";
            stopBtn.style.color = "#05152C";
            pauseBtn.style.color = "#05152C";
            timer.style.borderColor = "#1491C3";
            timer.style.backgroundColor = "#05152C";
            setCountdown = setInterval(startCountdown, 1000); /*global variable so that pause can work with it too*/

        }
        else{
            errorSound();
        }
    }

function pause()
{
    if (ticking == true){
        ticking = false;
        playBtn.style.color = "#05152C";
        stopBtn.style.color = "#05152C";
        pauseBtn.style.color = "#1491C3";
        timer.style.borderColor = "#05152C";
        timer.style.backgroundColor = "#1491C3";
        clearInterval(setCountdown);
    }
    tick.pause();
    tick.currentTime=0;
}

function stop() {
    modal.style.visibility = "visible";
    modal.style.opacity = 1;
}

function closeConfirmation() {
  modal.style.opacity = 0;
  setTimeout(function(){
        modal.style.visibility = "hidden";
    }, 700)
}

function confirmStop(){
    modal.style.opacity = 0;
    setTimeout(function(){
        modal.style.visibility = "hidden";
    }, 700)
    ticking = false;
    sbreak = false;
    lbreak = false;
    playBtn.style.color = "#05152C";
    pauseBtn.style.color = "#05152C";
    stopBtn.style.color = "#1491C3";
    timer.style.borderColor = "#05152C";
    timer.style.backgroundColor = "#1491C3";
    tick.pause();
    tick.currentTime=0;
    clearInterval(setCountdown);
    seshType.innerText = "Time to get to work!"
    seshType.style.color="#05152C";
    time = Number(workInput.value) * 60;
    updateCountdown();
}

function tickSound(){
    tick.play();
    tick.currentTime=0;
    tick.loop=true
    tick.playbackRate=.8
}
function checkSound(){
    check.play();
    check.currentTime=.2;
}
function clickSound(){
    click.play();
    click.currentTime=0;
}
function updateSound(){
    click2.play();
    click2.currentTime=0.05;
}
function errorSound(){
    error.play();
    error.currentTime=0.6;
}
function updatePulse(){
    var currentBGColor = timer.style.backgroundColor;
    var currentBorderColor = timer.style.borderColor;
    click2.play();
    click2.currentTime=0.05;
    timer.style.backgroundColor = "green";
    timer.style.borderColor = "black";
    updateBtn.style.backgroundColor = "green";
    updateBtn.style.borderColor = "black";
     workInput.style.backgroundColor = "green";
    workInput.style.borderColor = "black";
     sBreakInput.style.backgroundColor = "green";
    sBreakInput.style.borderColor = "black";
     lBreakInput.style.backgroundColor = "green";
    lBreakInput.style.borderColor = "black";
    setTimeout(function(){
        timer.style.backgroundColor = currentBGColor;
        timer.style.borderColor = currentBorderColor;
        updateBtn.style.backgroundColor = "#05152C";
        updateBtn.style.borderColor = "#1491C3";
        workInput.style.backgroundColor = "#05152C";
        workInput.style.borderColor = "#1491C3";
        sBreakInput.style.backgroundColor = "#05152C";
        sBreakInput.style.borderColor = "#1491C3";
        lBreakInput.style.backgroundColor = "#05152C";
        lBreakInput.style.borderColor = "#1491C3";
    }, 800)
    time = Number(workInput.value) * 60;
    updateCountdown();
}
function scrollSound(){
    scroll.play();
    scroll.currentTime=.01
}
function roarSound(){
    roar.play();
    roar.currentTime=0.4
}
function timerPulse(){
    var currentBGColor = timer.style.backgroundColor;
    var currentBorderColor = timer.style.borderColor;
    timer.style.backgroundColor = "crimson";
    timer.style.borderColor = "black";
    setTimeout(function(){
        timer.style.backgroundColor = currentBGColor;
        timer.style.borderColor = currentBorderColor;
    }, 2000)
}
function toggleSettings(){
    if (settings.style.visibility == "visible"){
        updateBtn.style.visibility = "hidden";
        settings.style.visibility = "hidden";
        settingsBtn.style.color = "#05152C";
    }
    else{
        updateBtn.style.visibility = "visible";
        settings.style.visibility = "visible"
        settingsBtn.style.color = "#1491C3";
    }
}

