/* =====================================================
   PERFORMANCE MANAGEMENT SYSTEM JS
   صندوق المعونة الاجتماعية - الأداء والتقارير البشرية
   (تم إزالة دوال التحكم بالـ Sidebar - تعتمد على layout.js)
===================================================== */

/* =========================
        VARIABLES
========================= */

const evaluationModal = document.getElementById("evaluationModal");
const saveBtn = document.querySelector(".save-btn");
const evaluationList = document.querySelector(".evaluation-list");
let editEvaluation = null;

/* =========================
        MODAL CONTROL
========================= */

function openEvaluationModal() {
  if (evaluationModal) {
    evaluationModal.classList.add("active");
  }
}

function closeEvaluationModal() {
  if (evaluationModal) {
    evaluationModal.classList.remove("active");
    clearForm();
  }
}

function clearForm() {
  document.querySelectorAll(".form-group input").forEach(input => {
    input.value = "";
  });
  let select = document.querySelector(".form-group select");
  if (select) {
    select.selectedIndex = 0;
  }
  editEvaluation = null;
}

/* =========================
        SAVE EVALUATION
========================= */

if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    let inputs = document.querySelectorAll(".form-group input");
    let select = document.querySelector(".form-group select");

    let name = inputs[0].value;
    let department = inputs[1].value;
    let year = inputs[2].value;
    let evaluator = inputs[3].value;
    let score = inputs[4].value;
    let grade = select.value;

    if (name === "") {
      alert("يرجى إدخال اسم الموظف");
      return;
    }

    if (editEvaluation) {
      updateEvaluation(editEvaluation, name, department, year, evaluator, score, grade);
    } else {
      createEvaluation(name, department, year, evaluator, score, grade);
    }

    closeEvaluationModal();
    saveData();
  });
}

/* =========================
        CREATE EVALUATION
========================= */

function createEvaluation(name, department, year, evaluator, score, grade) {
  let card = document.createElement("div");
  card.className = "evaluation-card";

  card.innerHTML = `
        <div class="evaluation-icon">
            <i class="fa-solid fa-user-check"></i>
        </div>
        <div class="evaluation-info">
            <h3>${name}</h3>
            <p>القسم: ${department}</p>
            <p>الفترة: ${year}</p>
            <p>المقيّم: ${evaluator}</p>
            <p>النتيجة: <span class="score">${score}%</span></p>
            <p>التقدير: <span class="status ${getGradeClass(grade)}">${grade}</span></p>
        </div>
        <div class="actions">
            <button class="edit"><i class="fa-solid fa-pen"></i></button>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </div>
    `;

  evaluationList.appendChild(card);
  activateButtons();
}

/* =========================
        UPDATE EVALUATION
========================= */

function updateEvaluation(card, name, department, year, evaluator, score, grade) {
  let info = card.querySelectorAll(".evaluation-info p");
  card.querySelector("h3").innerText = name;
  info[0].innerText = "القسم: " + department;
  info[1].innerText = "الفترة: " + year;
  info[2].innerText = "المقيّم: " + evaluator;
  info[3].innerHTML = `النتيجة: <span class="score">${score}%</span>`;
  info[4].innerHTML = `التقدير: <span class="status ${getGradeClass(grade)}">${grade}</span>`;
}

/* =========================
        GRADE CLASS
========================= */

function getGradeClass(grade) {
  if (grade === "ممتاز") return "excellent";
  if (grade === "جيد جداً") return "good";
  if (grade === "جيد") return "normal";
  return "weak";
}

/* =========================
        BUTTONS CONTROL
========================= */

function activateButtons() {
  const editButtons = document.querySelectorAll(".edit");
  const deleteButtons = document.querySelectorAll(".delete");

  editButtons.forEach(btn => {
    btn.onclick = () => {
      editEvaluation = btn.closest(".evaluation-card");
      let name = editEvaluation.querySelector("h3").innerText;
      let info = editEvaluation.querySelectorAll(".evaluation-info p");
      let inputs = document.querySelectorAll(".form-group input");
      let select = document.querySelector(".form-group select");

      inputs[0].value = name;
      inputs[1].value = info[0].innerText.replace("القسم: ", "");
      inputs[2].value = info[1].innerText.replace("الفترة: ", "");
      inputs[3].value = info[2].innerText.replace("المقيّم: ", "");
      inputs[4].value = editEvaluation.querySelector(".score").innerText.replace("%", "");
      select.value = info[4].innerText.replace("التقدير:", "").trim();

      openEvaluationModal();
    };
  });

  deleteButtons.forEach(btn => {
    btn.onclick = () => {
      let card = btn.closest(".evaluation-card");
      if (confirm("هل تريد حذف هذا التقييم؟")) {
        card.remove();
        saveData();
      }
    };
  });
}

activateButtons();

/* =========================
        SEARCH
========================= */

const searchInput = document.querySelector(".search-box input");

if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    let value = searchInput.value.toLowerCase();
    document.querySelectorAll(".evaluation-card").forEach(card => {
      card.style.display = card.innerText.toLowerCase().includes(value) ? "flex" : "none";
    });
  });
}

/* =========================
        LOCAL STORAGE
========================= */

function saveData() {
  let evaluations = [];
  document.querySelectorAll(".evaluation-card").forEach(card => {
    evaluations.push({ html: card.innerHTML });
  });
  localStorage.setItem("performanceData", JSON.stringify(evaluations));
}

function loadData() {
  let data = localStorage.getItem("performanceData");
  if (!data) return;
  let evaluations = JSON.parse(data);
  evaluations.forEach(item => {
    let card = document.createElement("div");
    card.className = "evaluation-card";
    card.innerHTML = item.html;
    evaluationList.appendChild(card);
  });
  activateButtons();
}

loadData();

/* =========================
        CLOSE MODAL OUTSIDE
========================= */

window.onclick = (e) => {
  if (e.target === evaluationModal) {
    closeEvaluationModal();
  }
};

console.log("Performance System Loaded Successfully");