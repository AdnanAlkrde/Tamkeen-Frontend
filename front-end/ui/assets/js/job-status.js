/* =====================================================
   JOB STATUS MANAGEMENT SYSTEM JS
   صندوق المعونة الاجتماعية - إدارة الوضع الوظيفي
   (تم إزالة دوال التحكم بالـ Sidebar - تعتمد على layout.js)
===================================================== */

/* =========================
        MODAL CONTROL
========================= */

const jobModal = document.getElementById("jobModal");
const saveBtn = document.querySelector(".save-btn");
const jobHistory = document.querySelector(".job-history");

function openJobModal() {
  if (jobModal) {
    jobModal.classList.add("active");
  }
}

function closeJobModal() {
  if (jobModal) {
    jobModal.classList.remove("active");
    clearForm();
  }
}

function clearForm() {
  document.querySelectorAll(".form-group input").forEach(input => {
    input.value = "";
  });
  document.querySelectorAll(".form-group select").forEach(select => {
    select.selectedIndex = 0;
  });
}

/* =========================
        SAVE JOB ACTION
========================= */

if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    const selects = document.querySelectorAll(".form-group select");
    const inputs = document.querySelectorAll(".form-group input");

    let operation = selects[0].value;
    let date = inputs[0].value;
    let category = inputs[1].value;
    let degree = inputs[2].value;
    let rank = inputs[3].value;
    let status = selects[1].value;

    if (date === "") {
      alert("يرجى إدخال التاريخ");
      return;
    }

    let card = document.createElement("div");
    card.className = "job-card";

    card.innerHTML = `
            <div class="job-icon green-bg">
                <i class="fa-solid fa-file-circle-plus"></i>
            </div>
            <div class="job-info">
                <h3>${operation}</h3>
                <p>التاريخ: ${date}</p>
                <p>الفئة: ${category}</p>
                <p>الدرجة: ${degree}</p>
                <p>المرتبة: ${rank}</p>
                <p>الحالة: ${status}</p>
            </div>
            <div class="actions">
                <button class="edit"><i class="fa-solid fa-pen"></i></button>
                <button class="delete"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

    jobHistory.appendChild(card);
    closeJobModal();
    activateDelete();
  });
}

/* =========================
        DELETE JOB RECORD
========================= */

function activateDelete() {
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach(btn => {
    btn.onclick = () => {
      let card = btn.closest(".job-card");
      if (confirm("هل تريد حذف هذا السجل الوظيفي؟")) {
        card.remove();
        saveData();
      }
    };
  });
}

activateDelete();

/* =========================
        EDIT JOB RECORD
========================= */

document.querySelectorAll(".edit").forEach(btn => {
  btn.onclick = () => {
    alert("سيتم فتح نموذج تعديل الحركة الوظيفية");
  };
});

/* =========================
        SEARCH
========================= */

const searchInput = document.querySelector(".search-box input");

if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    let value = searchInput.value.toLowerCase();
    document.querySelectorAll(".job-card").forEach(card => {
      card.style.display = card.innerText.toLowerCase().includes(value) ? "flex" : "none";
    });
  });
}

/* =========================
        LOCAL STORAGE
========================= */

function saveData() {
  let jobs = [];
  document.querySelectorAll(".job-card").forEach(card => {
    jobs.push(card.innerText);
  });
  localStorage.setItem("jobHistory", JSON.stringify(jobs));
}

function loadData() {
  let data = localStorage.getItem("jobHistory");
  if (!data) return;
  console.log("تم تحميل السجل الوظيفي", JSON.parse(data));
}

loadData();

console.log("Job Status System Loaded Successfully");