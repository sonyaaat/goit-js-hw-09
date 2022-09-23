import Notiflix from 'notiflix';

const delayValue=document.querySelector('[name="delay"]')
const stepValue=document.querySelector('[name="step"]')
const amountValue=document.querySelector('[name="amount"]')
const submitBtn=document.querySelector('button')
submitBtn.addEventListener('click',onButtonClick)
let counter=0;

function onButtonClick(){
  event.preventDefault()
  if(delayValue.value===''||stepValue.value===''||amountValue.value==='')
  {
    Notiflix.Notify.failure("Заповніть всі поля")
    return
  }
  if(Number(delayValue.value)<0||Number(stepValue.value)<0||Number(amountValue.value)<=0)
  {
    Notiflix.Notify.failure("Введіть додатні значення")
    return
  }
  let delay=Number(delayValue.value)
  while(counter<Number(amountValue.value))
  {
    counter+=1;
    const newPromise=createPromise(counter,delay)
    console.log(newPromise)
    newPromise.then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delay+=Number(stepValue.value);
  }
  counter=0
}
function createPromise(position, delay) {
  return new Promise((resolve,reject)=>{
    const shouldResolve = Math.random() > 0.3;
    setTimeout(()=>
    {
      if(shouldResolve)
      {
        resolve({position,delay})
      }
      reject({position,delay})
    },delay)
  })
}
