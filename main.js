
const expression = document.querySelector(".expression");
const currentNumber = document.querySelector(".input");
const charElements = document.querySelectorAll(".char");
const contrastElements = document.querySelectorAll(".contrast");
const answer = document.querySelector(".ans");
let isResult = false;

const inputChar = (e) => { 
  if(!currentNumber.value[0] && e.target.value == "0"){
    return;
  }
  if(isResult)
    return;
  if(e.target.value == "." && !currentNumber.value){
    currentNumber.value ="0.";
    return;
  }
  if(e.target.value == "." && currentNumber.value.includes("."))
    return;

  currentNumber.value += e.target.value
}; 
const deleteChar = () =>{
  if(currentNumber.value[0] === "="){
    currentNumber.classList.remove("result");
    isResult = false;
    currentNumber.value = currentNumber.value.slice(1);
    return;
  }
  if(!currentNumber.value){
    if(expression.innerHTML == 0){
      return;
    }
    if(expression.innerHTML.length == 1){
      expression.innerHTML = "0";
      return;
    }
    expression.innerHTML = expression.innerHTML.slice(0, -1);
    return;
  }
    currentNumber.value = currentNumber.value.slice(0, -1);
};

const deleteString = () =>{
  if(!currentNumber.value){
    expression.innerHTML = "0";
    return;
  }
  currentNumber.classList.remove("result");
  isResult = false;
    currentNumber.value = "";
};

const addNumber = () =>{
  if(isResult)
    return;

  if(currentNumber.value[0] == "-"){
    currentNumber.value = currentNumber.value.slice(1);
    return;
  }
  if(expression.innerHTML[0] == "0"){
    expression.innerHTML = currentNumber.value;
    currentNumber.value = "";
    return;
  }
  if(!currentNumber.value)
    return;
  expression.innerHTML += " + " + currentNumber.value;
  currentNumber.value = "";
}

const subNumber = () =>{
  if(isResult)
    return;

  if(!currentNumber.value){
    currentNumber.value += "- ";
    return;
  }
  if(expression.innerHTML[0] == "0"){
    expression.innerHTML = currentNumber.value;
    currentNumber.value = "";
    return;
  }
  if(currentNumber.value[0] == "-"){
    expression.innerHTML += " " + currentNumber.value;
    currentNumber.value = "";
    return;
  }
  expression.innerHTML += " - " + currentNumber.value;
  currentNumber.value = "";
}

const modNumber = () =>{
  if(isResult)
    return;

    if(expression.innerHTML[0] == "0"){
      expression.innerHTML = currentNumber.value;
      currentNumber.value = "";
      return;
    }

    if(!currentNumber.value){
      return;
    }
    expression.innerHTML += " % " + currentNumber.value;
    currentNumber.value = "";
}

const divNumber = () =>{
  if(isResult)
    return;
    
    if(expression.innerHTML[0] == "0"){
      expression.innerHTML = currentNumber.value;
      currentNumber.value = "";
      return;
    }

    if(!currentNumber.value){
      return;
    }
    expression.innerHTML += " / " + currentNumber.value;
    currentNumber.value = "";
}
const mulNumber = () =>{
  if(isResult)
    return;

    
    if(expression.innerHTML[0] == "0"){
      expression.innerHTML = currentNumber.value;
      currentNumber.value = "";
      return;
    }

    if(!currentNumber.value){
      return;
    }
    expression.innerHTML += " * " + currentNumber.value;
    currentNumber.value = "";
}

const resolveAnswer = () =>{
  let result = eval(expression.innerHTML);
  currentNumber.classList.add("result");
  isResult = true;
  currentNumber.value = "= " + result;
}
answer.addEventListener("click", resolveAnswer);

charElements.forEach(btn => {
  btn.addEventListener("click", inputChar);
});

//Jejeje
const constrastActions={};
constrastActions["C"] = deleteChar;
constrastActions["E"] = deleteString;
constrastActions["+"] = addNumber;
constrastActions["-"] = subNumber;
constrastActions["%"] = modNumber;
constrastActions["/"] = divNumber;
constrastActions["*"] = mulNumber;


contrastElements.forEach( element =>{
    element.addEventListener("click", constrastActions[element.value]);
})

// // Every contrast function for testing
// const clearBtn = document.querySelector(".contrast[value='C']");
// clearBtn.addEventListener("click", deleteChar);

// const emptyBtn = document.querySelector(".contrast[value='E']");
// emptyBtn.addEventListener("click", deleteString);

// const addBtn =  document.querySelector(".contrast[value='+']");
// addBtn.addEventListener("click", addNumber);

// const subBtn = document.querySelector(".contrast[value='-']");
// subBtn.addEventListener("click", subNumber);

// const modBtn = document.querySelector(".contrast[value='%']");
// modBtn.addEventListener("click", modNumber);

// const divBtn = document.querySelector(".contrast[value='/']");
// divBtn.addEventListener("click", divNumber);

// const mulBtn = document.querySelector(".contrast[value='*']");
// mulBtn.addEventListener("click", mulNumber);
