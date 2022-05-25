
const expression = document.querySelector(".expression");
const currentNumber = document.querySelector(".input");
const charElements = document.querySelectorAll(".char");
const opElements = document.querySelectorAll(".contrast.op");
const answer = document.querySelector(".ans");
const emptyBtn = document.querySelector(".contrast[value='E']");
const clearBtn = document.querySelector(".contrast[value='C']");


let isResult = false;
let pointExist = false;

const inputChar = (e) => { 
  if(expression.value[0] == 0 && e.target.value == "0" && expression.length == 1){
    return;
  }
  if(e.target.value == "." && pointExist)
    return;
    
    if(e.target.value == "." && isNaN(Number(expression.value.slice(-1))) && expression.value.slice(-1) != "."){;
      expression.value += "0.";
      pointExist = true
      return;
    }

  if(e.target.value == "." && isNaN(Number(expression.value.slice(-1)))){
    console.log(expression.value.slice(-1));
    expression.value = "0.";
    pointExist = true;
    return;
  }
  if(e.target.value == "." && expression.value.slice(-1) == "0"){
    expression.value +=".";
    pointExist = true;
    return;
  }

  if(expression.value.slice(-2) == "0." && e.target.value != "."){
    expression.value += e.target.value;
    pointExist = true;
    return;
  }
  if(expression.value[0] == "0" && e.target.value != "." && expression.value.length == 1){
    expression.value = e.target.value;
    return;
  }

  expression.value += e.target.value
}; 

const deleteString = () =>{
  pointExist = false;
  if(!currentNumber.value){
    expression.value = "0";
    return;
  }
  currentNumber.classList.remove("result");
  isResult = false;
  currentNumber.value = "";
};

const deleteChar = () =>{
  if(currentNumber.value)
    deleteString();

    if(expression.value == 0){
      return;
    }
    if(expression.value.length == 1){
      pointExist = false;
      expression.value = "0";
      return;
    }
    if(expression.value.slice(0, -1) == ".")
      pointExist = false;

    expression.value = expression.value.slice(0, -1);
};

const handleAction = (e) =>{
  if(isNaN(Number(expression.value.slice(-1))) && expression.value.slice(-1) == ".")
    return;
  pointExist = false;

  if(isNaN(Number(expression.value.slice(-1))) && expression.value.slice(-1) != "."){
    expression.value = replaceAt(expression.value.lastIndexOf(expression.value.slice(-1)), expression.value, e.target.value);
    return;
  }
  if(expression.value.slice(-1) == "0" && expression.value.length == 1){
    return;
  }
  expression.value += e.target.value;
}

const resolveAnswer = () =>{
  if(isNaN(expression.value.slice(-1)))
    expression.value = expression.value.slice(0, -1);

  let result = eval(expression.value);
  currentNumber.classList.add("result");
  isResult = true;
  if(result.toString().lastIndexOf('.') == -1){
    result = result.toExponential(2);
    currentNumber.value = "= " + result;
    return;
  }
  if(result.toString().length > 6)
    result = Number.parseFloat(result).toExponential(2);

  currentNumber.value = "= " + result;
}

answer.addEventListener("click", resolveAnswer);
clearBtn.addEventListener("click", deleteChar);
emptyBtn.addEventListener("click", deleteString);

charElements.forEach(btn => {
  btn.addEventListener("click", inputChar);
});

opElements.forEach( element =>{
    element.addEventListener("click", handleAction);
})


function replaceAt(index, string, replace){
  let newString = [];
  for(let i = 0; i < string.length; i++){
    newString[i] = string[i];
    if(i == index)
    newString[i] = replace;

  };
  return newString.join("");
}