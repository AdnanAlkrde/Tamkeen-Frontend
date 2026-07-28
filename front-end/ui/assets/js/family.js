/* =====================================================
   FAMILY MANAGEMENT SYSTEM JS
   صندوق المعونة الاجتماعية - إدارة الأسرة
   (تم إزالة دوال التحكم بالـ Sidebar - تعتمد على layout.js)
===================================================== */

/* =========================
        MODAL
========================= */

const familyModal = document.getElementById("familyModal");
const saveBtn = document.querySelector(".save-btn");
const familyGrid = document.querySelector(".family-grid");

function openFamilyModal() {
  if (familyModal) {
    familyModal.classList.add("active");
  }
}

function closeFamilyModal() {
  if (familyModal) {
    familyModal.classList.remove("active");
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
        ADD FAMILY MEMBER
========================= */

if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    let name = document.querySelector(".form-group input").value;
    let relation = document.querySelector(".form-group select").value;

    if (name.trim() === "") {
      alert("يرجى إدخال اسم الفرد");
      return;
    }

    let card = document.createElement("div");
    card.className = "family-card";

    card.innerHTML = `
            <div class="family-icon child">
                <i class="fa-solid fa-child"></i>
            </div>
            <div>
                <h3>${name}</h3>
                <p>${relation}</p>
                <span>تم الإضافة حديثاً</span>
            </div>
            <div class="actions">
                <button class="edit"><i class="fa-solid fa-pen"></i></button>
                <button class="delete"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

    familyGrid.appendChild(card);
    closeFamilyModal();
    activateDeleteButtons();
  });
}

/* =========================
        DELETE MEMBER
========================= */

function activateDeleteButtons() {
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach(btn => {
    btn.onclick = () => {
      let card = btn.closest(".family-card");
      if (confirm("هل تريد حذف فرد الأسرة؟")) {
        card.remove();
      }
    };
  });
}

activateDeleteButtons();

/* =========================
        EDIT BUTTON
========================= */

document.querySelectorAll(".edit").forEach(btn => {
  btn.onclick = () => {
    alert("سيتم فتح تعديل بيانات فرد الأسرة لاحقاً");
  };
});

/* =========================
        SEARCH
========================= */

const searchInput = document.querySelector(".search-box input");

if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    let value = searchInput.value.toLowerCase();
    document.querySelectorAll(".family-card").forEach(card => {
      card.style.display = card.innerText.toLowerCase().includes(value) ? "flex" : "none";
    });
  });
}

console.log("Family Management System Loaded Successfully");