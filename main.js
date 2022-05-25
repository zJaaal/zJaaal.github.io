let isResult = false;

const expression = document.querySelector(".expression");
const currentNumber = document.querySelector(".input");
const charElements = document.querySelectorAll(".char");

expression.InnerHTML = "0";

const inputChar = (e) => { 
  currentNumber.value += e.target.value
  console.log("its triggering");
}; 

charElements.forEach(btn => {
  btn.addEventListener("click", inputChar);
});

