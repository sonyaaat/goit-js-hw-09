const startBtn=document.querySelector("[data-start]")
const stopBtn=document.querySelector("[data-stop]")

let timeoutId=null;

startBtn.addEventListener("click", onStartClick)
stopBtn.addEventListener("click",onStopClick)

function onStartClick()
{
    changeColor();
    timeoutId = setInterval(changeColor, 1000);
    startBtn.setAttribute("disabled",true)
    stopBtn.removeAttribute('disabled')
}

function onStopClick()
{
    clearInterval(timeoutId)
    startBtn.removeAttribute("disabled")
    stopBtn.setAttribute("disabled",true)
}

function changeColor()
{
document.body.style.backgroundColor=getRandomHexColor();
}


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }