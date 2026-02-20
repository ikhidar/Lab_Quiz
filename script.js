(function () {
  const $ = id => document.getElementById(id);

  function setText(id, text) {
    const el = $(id);
    if (el) el.textContent = text;
  }

  function setHTML(id, html) {
    const el = $(id);
    if (el) el.innerHTML = html;
  }

  function showCorrect(n) {
    const el = $("mark" + n);
    if (el) el.innerHTML = `<img src="check.png" alt="correct" width="20" height="20">`;
  }
  function showWrong(n) {
    const el = $("mark" + n);
    if (el) el.innerHTML = `<img src="x.png" alt="incorrect" width="20" height="20">`;
  }

  function clearMarksAndMessages() {
    for (let i = 1; i <= 5; i++) {
      const m = $("mark" + i);
      if (m) m.innerHTML = "";
    }
    setText("totalScore", "");
    setText("over80", "");
    ["q1Error","q2Error","q3Error","q4Error","q5Error","formError"].forEach(id => setText(id,""));
  }

  function updateAttemptsDisplay(n) {
    const el = $("totalAttempts");
    if (el) el.textContent = `Total Attempts: ${n}`;
  }

  function validateForm() {
    ["q1Error","q2Error","q3Error","q4Error","q5Error","formError"].forEach(id => setText(id,""));
    let valid = true;

    const q1 = ($("q1") && $("q1").value.trim()) || "";
    const q2 = ($("q2") && $("q2").value) || "";
    const q4 = document.querySelector('input[name="q4"]:checked');
    const q5 = ($("q5") && $("q5").value) || "";

    if (!q1) { setText("q1Error", "Please enter the capital of France."); valid = false; }
    if (!q2) { setText("q2Error", "Please select the largest ocean."); valid = false; }
    if (!q4) { setText("q4Error", "Please select the country with the largest population."); valid = false; }
    if (!q5) { setText("q5Error", "Please select where the Great Barrier Reef is located."); valid = false; }

    if (!valid) setText("formError", "Please fix the highlighted fields and submit again.");
    return valid;
  }

  function gradeQuiz() {
    if (!validateForm()) return;

    clearMarksAndMessages();
    let score = 0;

    const q1 = (($("q1") && $("q1").value) || "").trim().toLowerCase();
    if (q1 === "paris") { score += 20; showCorrect(1); } else { showWrong(1); }

    const q2 = ($("q2") && $("q2").value) || "";
    if (q2 === "pacific") { score += 20; showCorrect(2); } else { showWrong(2); }

    const asia = !!($("Asia") && $("Asia").checked);
    const europe = !!($("Europe") && $("Europe").checked);
    const africa = !!($("Africa") && $("Africa").checked);
    const greenland = !!($("Greenland") && $("Greenland").checked);
    if (asia && europe && africa && !greenland) { score += 20; showCorrect(3); } else { showWrong(3); }

    const q4 = document.querySelector('input[name="q4"]:checked');
    if (q4 && q4.value === "china") { score += 20; showCorrect(4); } else { showWrong(4); }

    const q5 = ($("q5") && $("q5").value) || "";
    if (q5 === "australia") { score += 20; showCorrect(5); } else { showWrong(5); }

    setText("totalScore", `Total Score: ${score}`);

    let attempts = parseInt(localStorage.getItem("total_attempts"), 10);
    if (isNaN(attempts)) attempts = 0;
    attempts += 1;
    localStorage.setItem("total_attempts", attempts);
    updateAttemptsDisplay(attempts);

    const msg = (score >= 80) ? "Congratulations! You scored above 80!" : "Try again! You scored 80 or below.";
    setText("over80", msg);
  }

  function init() {
    const btn = $("gradeBtn");
    if (btn) {
      btn.addEventListener("click", gradeQuiz);
    } else {
      console.warn("gradeBtn not found in DOM.");
    }

    let attempts = parseInt(localStorage.getItem("total_attempts"), 10);
    if (isNaN(attempts)) attempts = 0;
    updateAttemptsDisplay(attempts);

    window.gradeQuiz = gradeQuiz;
    window.clearMarksAndMessages = clearMarksAndMessages;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();