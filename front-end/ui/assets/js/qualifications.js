/* =====================================================
   QUALIFICATIONS MANAGEMENT SYSTEM JS
   صندوق المعونة الاجتماعية - إدارة المؤهلات العلمية
   (تم إزالة دوال التحكم بالـ Sidebar - تعتمد على layout.js)
===================================================== */

/* =========================
        MODAL CONTROL
========================= */

const qualificationModal = document.getElementById("qualificationModal");
const saveBtn = document.querySelector(".save-btn");
const qualificationGrid = document.querySelector(".qualification-grid");

function openQualificationModal() {
  if (qualificationModal) {
    qualificationModal.classList.add("active");
  }
}

function closeQualificationModal() {
  if (qualificationModal) {
    qualificationModal.classList.remove("active");
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
        ADD QUALIFICATION
========================= */

if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    let inputs = document.querySelectorAll(".form-group input");
    let select = document.querySelector(".form-group select");

    let type = select.value;
    let university = inputs[0].value;
    let college = inputs[1].value;
    let speciality = inputs[2].value;
    let average = inputs[3].value;
    let year = inputs[4].value;

    if (university.trim() === "") {
      alert("يرجى إدخال اسم الجامعة");
      return;
    }

    let card = document.createElement("div");
    card.className = "qualification-card";

    card.innerHTML = `
            <div class="qualification-icon">
                <i class="fa-solid fa-graduation-cap"></i>
            </div>
            <div class="qualification-info">
                <h3>${type}</h3>
                <p>الجامعة: ${university}</p>
                <p>الكلية: ${college}</p>
                <p>الاختصاص: ${speciality}</p>
                <p>المعدل: ${average}</p>
                <p>سنة التخرج: ${year}</p>
            </div>
            <div class="actions">
                <button class="edit"><i class="fa-solid fa-pen"></i></button>
                <button class="delete"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

    qualificationGrid.appendChild(card);
    closeQualificationModal();
    activateDelete();
  });
}

/* =========================
        DELETE
========================= */

function activateDelete() {
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach(btn => {
    btn.onclick = () => {
      let card = btn.closest(".qualification-card");
      if (confirm("هل تريد حذف هذا المؤهل؟")) {
        card.remove();
      }
    };
  });
}

activateDelete();

/* =========================
        EDIT
========================= */

document.querySelectorAll(".edit").forEach(btn => {
  btn.onclick = () => {
    alert("سيتم فتح تعديل بيانات المؤهل لاحقاً");
  };
});

/* =========================
        SEARCH
========================= */

const searchInput = document.querySelector(".search-box input");

if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    let value = searchInput.value.toLowerCase();
    document.querySelectorAll(".qualification-card").forEach(card => {
      card.style.display = card.innerText.toLowerCase().includes(value) ? "flex" : "none";
    });
  });
}

/* =========================
        PRINT CV
========================= */

function printCV() {
  window.print();
}

console.log("Qualifications System Loaded Successfully");