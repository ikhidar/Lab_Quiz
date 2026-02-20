
document.addEventListener("DOMContentLoaded", () => {
  const gradeBtn = document.getElementById("gradeBtn");
  if (gradeBtn) gradeBtn.addEventListener("click", gradeQuiz);

  let attempts = parseInt(localStorage.getItem("total_attempts"), 10);
  if (isNaN(attempts)) attempts = 0;
  updateAttemptsDisplay(attempts);
});

function showCorrect(num) {
  const el = document.getElementById("mark" + num);
  if (el) {
    el.innerHTML = `<img src="check.png" alt="correct" width="20" height="20">`;
  }
}

function showWrong(num) {
  const el = document.getElementById("mark" + num);
  if (el) {
    el.innerHTML = `<img src="x.png" alt="incorrect" width="20" height="20">`;
  }
}

function clearMarks() {
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById("mark" + i);
    if (el) el.innerHTML = "";
  }
  const scoreEl = document.getElementById("totalScore");
  if (scoreEl) scoreEl.textContent = "";
  const over80 = document.getElementById("over80");
  if (over80) over80.textContent = "";
}

function isFormValid() {
  const q1 = document.getElementById("q1") && document.getElementById("q1").value.trim();
  const q2 = document.getElementById("q2") && document.getElementById("q2").value;
  const q4 = document.querySelector('input[name="q4"]:checked');
  const q5 = document.getElementById("q5") && document.getElementById("q5").value;

  if (!q1) {
    alert("Please answer question 1 (capital of California).");
    return false;
  }
  if (!q2) {
    alert("Please answer question 2 (longest river).");
    return false;
  }
  if (!q4) {
    alert("Please answer question 4 (smallest US state).");
    return false;
  }
  if (!q5) {
    alert("Please answer question 5 (where is the White House).");
    return false;
  }
  return true;
}

function gradeQuiz() {
  if (!isFormValid()) return;

  clearMarks();
  let score = 0;

  const q1 = (document.getElementById("q1").value || "").trim().toLowerCase();
  if (q1 === "sacramento") {
    score += 20;
    showCorrect(1);
  } else {
    showWrong(1);
  }

  const q2 = document.getElementById("q2").value;
  if (q2 === "mississippi") {
    score += 20;
    showCorrect(2);
  } else {
    showWrong(2);
  }

  const q3Jeff = !!document.getElementById("Jefferson").checked;
  const q3Roos = !!document.getElementById("Roosevelt").checked;
  const q3Jack = !!document.getElementById("Jackson").checked;
  const q3Linc = !!document.getElementById("Lincoln").checked;
  if (q3Jeff && q3Roos && q3Linc && !q3Jack) {
    score += 20;
    showCorrect(3);
  } else {
    showWrong(3);
  }

  const q4 = document.querySelector('input[name="q4"]:checked');
  if (q4 && q4.value === "rhode") {
    score += 20;
    showCorrect(4);
  } else {
    showWrong(4);
  }

  const q5 = document.getElementById("q5").value;
  if (q5 === "dc") {
    score += 20;
    showCorrect(5);
  } else {
    showWrong(5);
  }

  const scoreEl = document.getElementById("totalScore");
  if (scoreEl) scoreEl.textContent = `Total Score: ${score}`;

  let attempts = parseInt(localStorage.getItem("total_attempts"), 10);
  if (isNaN(attempts)) attempts = 0;
  attempts += 1;
  localStorage.setItem("total_attempts", attempts);
  updateAttemptsDisplay(attempts);

  const over80 = document.getElementById("over80");
  if (over80) {
    if (score > 80) {
      over80.textContent = "Congratulations! You scored above 80!";
    } else {
      over80.textContent = "Try again! You scored 80 or below.";
    }
  }
}

function updateAttemptsDisplay(n) {
  const el = document.getElementById("totalAttempts");
  if (el) el.textContent = `Total Attempts: ${n}`;
}