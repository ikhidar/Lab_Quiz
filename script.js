// script.js - robust, fixed version
(function () {
  // Helpers
  const get = id => document.getElementById(id);
  const setFieldError = (id, msg) => { const el = get(id); if (el) el.textContent = msg; };
  const clearFieldErrors = () => {
    ["q1Error","q2Error","q3Error","q4Error","q5Error","formError"].forEach(id => setFieldError(id,""));
  };

  function showCorrect(num) {
    const el = get("mark"+num);
    if (el) el.innerHTML = `<img src="check.png" alt="correct" width="20" height="20">`;
  }
  function showWrong(num) {
    const el = get("mark"+num);
    if (el) el.innerHTML = `<img src="x.png" alt="incorrect" width="20" height="20">`;
  }
  function clearMarks() {
    for (let i=1;i<=5;i++) { const el = get("mark"+i); if(el) el.innerHTML=""; }
    if (get("totalScore")) get("totalScore").textContent = "";
    if (get("over80")) get("over80").textContent = "";
  }
  function updateAttemptsDisplay(n) {
    const el = get("totalAttempts");
    if (el) el.textContent = `Total Attempts: ${n}`;
  }

  function validateForm() {
    clearFieldErrors();
    let ok = true;
    const q1 = (get("q1") && get("q1").value.trim()) || "";
    const q2 = get("q2") && get("q2").value;
    const q4 = document.querySelector('input[name="q4"]:checked');
    const q5 = get("q5") && get("q5").value;

    if (!q1) { setFieldError("q1Error","Please enter the capital of France."); ok = false; }
    if (!q2) { setFieldError("q2Error","Please select the largest ocean."); ok = false; }
    // Q3 is optional to validate presence; we accept any selection but grading expects specific checks
    if (!q4) { setFieldError("q4Error","Please choose a country."); ok = false; }
    if (!q5) { setFieldError("q5Error","Please select a location."); ok = false; }

    if (!ok) setFieldError("formError","Please fix the highlighted fields and submit again.");
    return ok;
  }

  function gradeQuiz() {
    // Run validation first
    if (!validateForm()) return;

    clearMarks();
    let score = 0;

    // Q1 (Paris)
    const q1 = (get("q1").value || "").trim().toLowerCase();
    if (q1 === "paris") { score += 20; showCorrect(1); } else { showWrong(1); }

    // Q2 (Pacific)
    const q2 = get("q2").value;
    if (q2 === "pacific") { score += 20; showCorrect(2); } else { showWrong(2); }

    // Q3 (continents: Asia, Europe, Africa; Greenland is NOT a continent)
    const asia = !!(get("Asia") && get("Asia").checked);
    const europe = !!(get("Europe") && get("Europe").checked);
    const africa = !!(get("Africa") && get("Africa").checked);
    const greenland = !!(get("Greenland") && get("Greenland").checked);
    if (asia && europe && africa && !greenland) { score += 20; showCorrect(3); } else { showWrong(3); }

    // Q4 (China)
    const q4 = document.querySelector('input[name="q4"]:checked');
    if (q4 && q4.value === "china") { score += 20; showCorrect(4); } else { showWrong(4); }

    // Q5 (Australia)
    const q5 = get("q5").value;
    if (q5 === "australia") { score += 20; showCorrect(5); } else { showWrong(5); }

    // show total score
    if (get("totalScore")) get("totalScore").textContent = `Total Score: ${score}`;

    // update attempts
    let attempts = parseInt(localStorage.getItem("total_attempts"), 10);
    if (isNaN(attempts)) attempts = 0;
    attempts += 1;
    localStorage.setItem("total_attempts", attempts);
    updateAttemptsDisplay(attempts);

    // message
    if (get("over80")) {
      get("over80").textContent = (score >= 80) ? "Congratulations! You scored above 80!" : "Try again! You scored 80 or below.";
    }
  }

  // Attach handlers on DOM ready, and expose function for debugging
  document.addEventListener("DOMContentLoaded", () => {
    const btn = get("gradeBtn");
    if (btn) btn.addEventListener("click", gradeQuiz);
    // initialize attempts
    let attempts = parseInt(localStorage.getItem("total_attempts"), 10);
    if (isNaN(attempts)) attempts = 0;
    updateAttemptsDisplay(attempts);
    // expose for console testing
    window.gradeQuiz = gradeQuiz;
  });

})();