let isResult = false;

const expression = document.querySelector(".expression");
const currentNumber = document.querySelector(".input");
const charElements = document.querySelectorAll(".char");
const contrastElements = document.querySelectorAll(".contrast");

expression.innerHTML = "6567";

const inputChar = (e) => { 
  if(!currentNumber.value[0] && e.target.value == "0")
    return;

  currentNumber.value += e.target.value
}; 
const deleteChar = (e) =>{
  if(!currentNumber.value){
    if(expression.innerHTML == 0){
      return;
    }
    expression.innerHTML = expression.innerHTML.slice(0, -1);
    return;
  }
    currentNumber.value = currentNumber.value.slice(0, -1);
};

const deleteString = (e) =>{
  if(!currentNumber.value){
    expression.innerHTML = "0";
    return;
  }
    currentNumber.value = "";
};

charElements.forEach(btn => {
  btn.addEventListener("click", inputChar);
  console.log(contrastElements);
});

//Jejeje
// const constrastActions={};
// constrastActions["C"] = deleteChar;
// constrastActions["E"] = deleteString;
// constrastActions["%"] = deleteChar;
// constrastActions["/"] = deleteChar;
// constrastActions["*"] = deleteChar;
// constrastActions["-"] = deleteChar;
// constrastActions["+"] = deleteChar;

// contrastElements.forEach( element =>{
//     element.addEventListener("click", constrastActions[element.target.value]);

// })

// Every contrast function for testing
const clearBtn = document.querySelector(".contrast[value='C']");
clearBtn.addEventListener("click", deleteChar);

const emptyBtn = document.querySelector(".contrast[value='E']");
emptyBtn.addEventListener("click", deleteString);

