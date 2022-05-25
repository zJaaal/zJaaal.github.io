
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
  if(expression.innerHTML[0] == 0 && e.target.value == "0" && expression.length == 1){
    return;
  }
  if(e.target.value == "." && pointExist)
    return;
    
    if(e.target.value == "." && isNaN(Number(expression.innerHTML.slice(-1))) && expression.innerHTML.slice(-1) != "."){;
      expression.innerHTML += "0.";
      pointExist = true
      return;
    }

  if(e.target.value == "." && isNaN(Number(expression.innerHTML.slice(-1)))){
    console.log(expression.innerHTML.slice(-1));
    expression.innerHTML = "0.";
    pointExist = true;
    return;
  }
  if(e.target.value == "." && expression.innerHTML.slice(-1) == "0"){
    expression.innerHTML +=".";
    pointExist = true;
    return;
  }

  if(expression.innerHTML.slice(-2) == "0." && e.target.value != "."){
    expression.innerHTML += e.target.value;
    pointExist = true;
    return;
  }
  if(expression.innerHTML[0] == "0" && e.target.value != "." && expression.innerHTML.length == 1){
    expression.innerHTML = e.target.value;
    return;
  }

  expression.innerHTML += e.target.value
}; 

const deleteString = () =>{
  pointExist = false;
  if(!currentNumber.value){
    expression.innerHTML = "0";
    return;
  }
  currentNumber.classList.remove("result");
  isResult = false;
  currentNumber.value = "";
};

const deleteChar = () =>{
  if(currentNumber.value)
    deleteString();

    if(expression.innerHTML == 0){
      return;
    }
    if(expression.innerHTML.length == 1){
      pointExist = false;
      expression.innerHTML = "0";
      return;
    }
    if(expression.innerHTML.slice(0, -1) == ".")
      pointExist = false;

    expression.innerHTML = expression.innerHTML.slice(0, -1);
};

const handleAction = (e) =>{
  if(isNaN(Number(expression.innerHTML.slice(-1))) && expression.innerHTML.slice(-1) == ".")
    return;
  pointExist = false;

  if(isNaN(Number(expression.innerHTML.slice(-1))) && expression.innerHTML.slice(-1) != "."){
    expression.innerHTML = replaceAt(expression.innerHTML.lastIndexOf(expression.innerHTML.slice(-1)), expression.innerHTML, e.target.value);
    return;
  }
  if(expression.innerHTML.slice(-1) == "0" && expression.innerHTML.length == 1){
    return;
  }
  expression.innerHTML += e.target.value;
}

const resolveAnswer = () =>{
  if(isNaN(expression.innerHTML.slice(-1)))
    expression.innerHTML = expression.innerHTML.slice(0, -1);

  let result = eval(expression.innerHTML);
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