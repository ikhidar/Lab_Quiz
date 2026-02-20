function gradeQuiz() {
  if (!isFormValid()) return;

  clearMarks();
  let score = 0;

  // Q1 correct: let (accept var or const too if you want)
  const q1 = document.getElementById("q1").value.trim().toLowerCase();
  if (q1 === "let" || q1 === "var" || q1 === "const") {
    score += 20;
    showCorrect(1);
  } else {
    showWrong(1);
  }

  // Q2 correct: toLowerCase()
  const q2 = document.getElementById("q2").value;
  if (q2 === "tolowercase") {
    score += 20;
    showCorrect(2);
  } else {
    showWrong(2);
  }

  // Q3 correct: String, Boolean, Number
  const isString = document.getElementById("String").checked;
  const isBoolean = document.getElementById("Boolean").checked;
  const isNumber = document.getElementById("Number").checked;
  const isCar = document.getElementById("Car").checked;

  if (isString && isBoolean && isNumber && !isCar) {
    score += 20;
    showCorrect(3);
  } else {
    showWrong(3);
  }

  // Q4 correct: ===
  const q4 = document.querySelector('input[name="q4"]:checked');
  if (q4 && q4.value === "===") {
    score += 20;
    showCorrect(4);
  } else {
    showWrong(4);
  }

  // Q5 correct: Netscape
  const q5 = document.getElementById("q5").value;
  if (q5 === "netscape") {
    score += 20;
    showCorrect(5);
  } else {
    showWrong(5);
  }

  document.getElementById("totalScore").textContent = `Total Score: ${score}`;

  let attempts = parseInt(localStorage.getItem("total_attempts"), 10);
  if (isNaN(attempts)) attempts = 0;
  attempts++;
  localStorage.setItem("total_attempts", attempts);
  updateAttemptsDisplay(attempts);

  const over80 = document.getElementById("over80");
  if (score > 80) {
    over80.textContent = "Congratulations! You scored above 80!";
  } else {
    over80.textContent = "Try again! You scored 80 or below.";
  }
}