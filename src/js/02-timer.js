import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

let selectedDate;
const startBtn=document.querySelector("[data-start]");
const input=document.querySelector("#datetime-picker")
const daysSpan=document.querySelector("[data-days]");
const hoursSpan=document.querySelector("[data-hours]");
const minutesSpan=document.querySelector("[data-minutes]")
const secondsSpan=document.querySelector("[data-seconds]")

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      selectedDate=selectedDates[0];
      const selectedTime=selectedDate.getTime();
      const startTime=Date.now();
      if(selectedTime-startTime<0)
      {
        Notiflix.Notify.failure('Please choose a date in the future');
        return
      }
      startBtn.removeAttribute("disabled")
    },
  };


flatpickr("input#datetime-picker", options);

startBtn.addEventListener('click',onStartClick)

function onStartClick()
{
    startBtn.setAttribute("disabled",true)
    input.setAttribute("disabled",true)
    console.log(input)
    const selectedTime=selectedDate.getTime();
    updateClock(convertMs(selectedTime-Date.now()))
    intervalId=setInterval(() => {
    const startTime=Date.now();
    const deltaTime=selectedTime-startTime;
    if(deltaTime<1000)
    {
        clearTimeout(intervalId);
        console.log("STOP")
        const time=convertMs(0)
        updateClock(time)
        startBtn.removeAttribute("disabled")
        return
    }
    
    const time=convertMs(deltaTime)
    console.log(time)
    updateClock(time)
    }, 1000);
   
    

}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  
  function updateClock({ days, hours, minutes, seconds })
  {
    daysSpan.textContent=days
    hoursSpan.textContent=hours
    minutesSpan.textContent=minutes
    secondsSpan.textContent=seconds
  }

  function addLeadingZero(value)
  {
    return String(value).padStart(2, '0');
  }