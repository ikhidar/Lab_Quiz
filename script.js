document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("gradeBtn").addEventListener("click", gradeQuiz);

  let attempts = parseInt(localStorage.getItem("total_attempts"), 10);
  if (isNaN(attempts)) attempts = 0;
  updateAttemptsDisplay(attempts);
});

function showCorrect(num) {
  const el = document.getElementById("mark" + num);
  el.innerHTML = `<img src="img/check.png" alt="correct" width="20" height="20">`;
}

function showWrong(num) {
  const el = document.getElementById("mark" + num);
  el.innerHTML = `<img src="img/x.png" alt="incorrect" width="20" height="20">`;
}

function clearMarks() {
  for (let i = 1; i <= 5; i++) {
    document.getElementById("mark" + i).innerHTML = "";
  }
  document.getElementById("totalScore").textContent = "";
  document.getElementById("over80").textContent = "";
}

function isFormValid() {
  const q1 = document.getElementById("q1").value.trim();
  const q2 = document.getElementById("q2").value;
  const q4 = document.querySelector('input[name="q4"]:checked');
  const q5 = document.getElementById("q5").value;

  if (!q1) {
    alert("Please answer question 1.");
    return false;
  }
  if (!q2) {
    alert("Please answer question 2.");
    return false;
  }
  if (!q4) {
    alert("Please answer question 4.");
    return false;
  }
  if (!q5) {
    alert("Please answer question 5.");
    return false;
  }
  return true;
}

function gradeQuiz() {
  if (!isFormValid()) return;

  clearMarks();
  let score = 0;

  // Q1
  const q1 = document.getElementById("q1").value.trim().toLowerCase();
  if (q1 === "sacramento") {
    score += 20;
    showCorrect(1);
  } else {
    showWrong(1);
  }

  // Q2
  const q2 = document.getElementById("q2").value;
  if (q2 === "mississippi") {
    score += 20;
    showCorrect(2);
  } else {
    showWrong(2);
  }

  // Q3: correct = Jefferson, Roosevelt, Lincoln (Jackson is incorrect)
  const q3Jeff = document.getElementById("Jefferson").checked;
  const q3Roos = document.getElementById("Roosevelt").checked;
  const q3Jack = document.getElementById("Jackson").checked;
  const q3Linc = document.getElementById("Lincoln").checked;
  if (q3Jeff && q3Roos && q3Linc && !q3Jack) {
    score += 20;
    showCorrect(3);
  } else {
    showWrong(3);
  }

  // Q4
  const q4 = document.querySelector('input[name="q4"]:checked');
  if (q4 && q4.value === "rhode") {
    score += 20;
    showCorrect(4);
  } else {
    showWrong(4);
  }

  // Q5
  const q5 = document.getElementById("q5").value;
  if (q5 === "dc") {
    score += 20;
    showCorrect(5);
  } else {
    showWrong(5);
  }

  document.getElementById("totalScore").textContent = `Total Score: ${score}`;

  let attempts = parseInt(localStorage.getItem("total_attempts"), 10);
  if (isNaN(attempts)) attempts = 0;
  attempts += 1;
  localStorage.setItem("total_attempts", attempts);
  updateAttemptsDisplay(attempts);

  const over80 = document.getElementById("over80");
  if (score > 80) {
    over80.textContent = "Congratulations! You scored above 80!";
  } else {
    over80.textContent = "Try again! You scored 80 or below.";
  }
}

function updateAttemptsDisplay(n) {
  document.getElementById("totalAttempts").textContent = `Total Attempts: ${n}`;
}