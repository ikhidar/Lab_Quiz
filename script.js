document.querySelector("button").addEventListener("click", gradeQuiz);
//Global variables

var score = 0;
var attempts = localStorage.getItem("total_attempts");
displayQ4Choices();

function displayQ4Choices(){
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);
    for( let i = 0; i <q4ChoicesArray.length; i++){
        document.querySelector("#q4Choices").innerHTML += 
        `<input type ="radio" name="q4" id="${q4ChoicesArray[i]}" value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`;
    }
        
}

function isFormValid(){
    let isValid = true;

    if(document.querySelector("#q1").value == ""){
        isValid = false;
        document.querySelector("#validationFdbk").innerHTML= "Missing answer to question 1";
    }
    return isValid;
}

function rightAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png' alt='Checkmark'>";
    score+=20;
}

function wrongAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='xmark'>";
}


function gradeQuiz(){
    console.log("Grading quiz...")
    //resets validation feedback
    document.querySelector("#validationFdbk").innerHTML ="";
    if(!isFormValid()){
        return;
    }


    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let q4Response = document.querySelector("input[name=q4]:checked").value;
    let q5Response = document.querySelector("#q5").value;
    console.log(q1Response);
    console.log(q2Response);

    //grade q1 cleaner now
    if(q1Response == "sacramento"){
        rightAnswer(1);
    }else{
        wrongAnswer(1);
    }

    //grade q2
    if(q2Response == "mo"){
        rightAnswer(2);
    }else{
        wrongAnswer(2);
    }
    //grade q3
    if(document.querySelector("#Jefferson").checked && document.querySelector("#Roosevelt").checked 
        && !document.querySelector("#Jackson").checked && !document.querySelector("#Franklin".checked))
    {
            rightAnswer(3);
    }
    else{
            wrongAnswer(3);
    }
    //grade q4
    if(q4Response == "Rhode Island"){
        rightAnswer(4);
    }
    else{
        wrongAnswer(4);
    }

    if(q5Response == "austin"){
        rightAnswer(5);
    }
    else{
        wrongAnswer(5);
    }

    if(score >= 80){
        document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
        document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
        localStorage.setItem("total_attempts", attempts)
        document.querySelector("#over80").innerHTML = "Congratulations! You scored above 80!";
        document.querySelector("#over80").className = "bg-success text-white";
        console.log(score);
    }
    else{
        document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
        document.querySelector("#totalAttempts").innerHTML = `Total Attemps: ${++attempts}`;
        localStorage.setItem("total_attempts", attempts)
        document.querySelector("#over80").innerHTML = "Try again! You scored less than 80";
        document.querySelector("#over80").className = "bg-danger text-white";
    }
    
}
