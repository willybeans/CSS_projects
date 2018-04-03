/* issues to be adddressed:
- the "." behavior is incorrect
- the button sizing is inconsistent
*/

var buttons = ['CE','AC', '*','7','8','9','/','4','5','6',
               '-','1','2','3','+','0','.','='];
var currentEntry = [], totalEntry = [];
var testNum = /[0-9]/g;
var testOperands = /[+\-\/*=]/;
var equals = true;

window.onload = () => {
  makeButtons();
}

function applyClick(x) {
  var btn = document.getElementById("b" + x);
  var totalArea = document.getElementById("totalArea");
  var currentArea = document.getElementById("currentArea");
  var speech = document.getElementById("speech");

  btn.onclick = () => {
    //first we clear the face
    speech.style.display = "none";
    //document.getElementById("face-sleep").style.display = "none";
    document.getElementById("numberArea").style.display = "block";

       if(equals){ //clear for first entry
        document.getElementById("face-sleep").style.display = "none";
        currentEntry = [];
        totalEntry = [];
        currentArea.textContent = " ";
        totalArea.textContent = " ";

      }

     if(currentEntry.length >= 9 || totalArea.textContent.length >= 17){ //restrict imput length
      currentArea.textContent = "Number Limit Exceeded!";
      totalArea.textContent = ":-(";
      equals = true;
     }else if(!isNaN(x)) { //test for number
       if(testOperands.test(currentEntry[0])){ //after using operands
        currentArea.textContent = x;
        totalArea.textContent = totalArea.textContent + currentEntry[0];
        totalEntry.push(currentEntry[0]);
        currentEntry = [];
        currentEntry.push(x);
      } else { //number behavior:
        equals = false;
     currentEntry.push(x);
     currentArea.textContent = (currentArea.textContent + x);
   }
  } else if (isNaN(x)) { //**for all non numerics**\\
      if(equals){
        return;
      } else {
        if(testOperands.test(x)){ //for operators
          if(testOperands.test(currentEntry[0])){
            //if there is ALREADy an operator do nothing
            return;
          } else if (x === "=") { //to get answer
            // if(equals || (totalEntry[0] === null)){
            //   alert("hi");
            //   return;
            // } else {
              speech.style.display = "block";
              document.getElementById("face-sleep").style.display = "none";
              document.getElementById("numberArea").style.display = "none";
              document.getElementById("face-happy").style.display = "block";
              document.getElementById
              var final = currentEntry.join('');
              totalEntry.push(final);
              totalArea.textContent = totalArea.textContent + currentArea.textContent;
                while(totalEntry.includes("*") || totalEntry.includes("/")){
                  if(totalEntry.includes("*")){
                    console.log("inside)");
                    let index = totalEntry.indexOf("*");
                    let a = totalEntry[index - 1];
                    let b = totalEntry[index + 1];
                    let c =  a * b;
                    //so how to inject into proper place in array?
                    console.log(index - 1);
                    console.log(totalEntry);
                    totalEntry.splice((index - 1),3,c);
                    //console.log(testArray);
                    console.log(totalEntry);
                  } else {
                    let index = totalEntry.indexOf("/");
                    let a = totalEntry[index - 1];
                    let b = totalEntry[index + 1];
                    let c =  a / b;
                    //injecting new total here
                    totalEntry.splice((index - 1),3,c);
                  }
                }
                while(totalEntry.includes("+") || totalEntry.includes("-")){
                  if(totalEntry.includes("+")){
                    let index = totalEntry.indexOf("+");
                    let a = Number(totalEntry[index - 1]); //+ is concatenating instead of adding
                    let b = Number(totalEntry[index + 1]);
                    let c =  a + b;

                    totalEntry.splice((index - 1),3,c);
                  } else {
                    let index = totalEntry.indexOf("-");
                    let a = totalEntry[index - 1];
                    let b = totalEntry[index + 1];
                    let c =  a - b;
                    //injecting new total here
                    totalEntry.splice((index - 1),3,c);
                  }
                }
              currentEntry = [];
              equals = true;
              document.getElementById("equation").textContent = totalArea.textContent;
              document.getElementById("solution").textContent = totalEntry[0];
              currentArea.textContent = " ";
              totalArea.textContent = " "
              //currentArea.textContent = totalEntry[0];
            // }
          }
          else {
            var userInput = currentEntry.join('') // dude change this var name lmao
            totalEntry.push(userInput); //push the pre-existing numbers into our final
            totalArea.textContent = totalArea.textContent + currentArea.textContent;
            currentEntry = []; //clear current entry to make room
            currentEntry.push(x);
            currentArea.textContent = x;
            //totalArea.textContent = totalArea.textContent + "";
          }

        } else if (x === ".") {
          if(!currentEntry.includes(".")){ //test for pre-existing period
            currentEntry.push(x);
            currentArea.textContent = currentArea.textContent + x;
          }
          //this needs to behave similar to a number but cant use more than one
        } else if (x === "AC" || x === "CE") {
          document.getElementById('face-happy').style.display = "none";
          currentEntry = [];
          currentArea.textContent = " "
          if (x === "AC"){
          totalEntry = [];
          totalArea.textContent = " ";
          }
        } else {
        currentArea.textContent = x;
        totalArea.textContent = (totalArea.textContent + x);
        currentEntry = x;
      }
    }
   }
  }
 }

function makeButtons() {
  for (var i = 0; i < buttons.length; i++){
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode(buttons[i]);
    var container = document.getElementById('container');
    btn.id = "b" + buttons[i];
    btn.className = "button";
    btn.appendChild(t);
    container.appendChild(btn);
    applyClick(buttons[i]);
  }
}
