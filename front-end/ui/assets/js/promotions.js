/* =====================================================
   PROMOTIONS MANAGEMENT SYSTEM JS
   صندوق المعونة الاجتماعية - إدارة الترقيات
   (تم إزالة دوال التحكم بالـ Sidebar - تعتمد على layout.js)
===================================================== */

/* =========================
        MODAL CONTROL
========================= */

const promotionModal = document.getElementById("promotionModal");
const saveBtn = document.querySelector(".save-btn");
const promotionList = document.querySelector(".promotion-list");

function openPromotionModal() {
  if (promotionModal) {
    promotionModal.classList.add("active");
  }
}

function closePromotionModal() {
  if (promotionModal) {
    promotionModal.classList.remove("active");
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
        ADD PROMOTION
========================= */

if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    let inputs = document.querySelectorAll(".form-group input");
    let type = document.querySelector(".form-group select").value;

    let employee = inputs[0].value;
    let number = inputs[1].value;
    let oldDegree = inputs[2].value;
    let newDegree = inputs[3].value;
    let decision = inputs[4].value;
    let date = inputs[5].value;
    let note = inputs[6].value;

    if (employee === "") {
      alert("يرجى إدخال اسم الموظف");
      return;
    }

    let card = document.createElement("div");
    card.className = "promotion-card";

    card.innerHTML = `
            <div class="promotion-icon">
                <i class="fa-solid fa-arrow-up"></i>
            </div>
            <div class="promotion-info">
                <h3>${employee}</h3>
                <p>الرقم الذاتي: ${number}</p>
                <p>نوع الترقية: ${type}</p>
                <p>${oldDegree} ← ${newDegree}</p>
                <p>تاريخ القرار: ${date}</p>
                <p>رقم القرار: ${decision}</p>
                <span class="status vacation">قيد الاعتماد</span>
            </div>
            <div class="actions">
                <button class="edit"><i class="fa-solid fa-pen"></i></button>
                <button class="delete"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

    promotionList.appendChild(card);
    closePromotionModal();
    activateDelete();
    savePromotions();
  });
}

/* =========================
        DELETE PROMOTION
========================= */

function activateDelete() {
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach(btn => {
    btn.onclick = () => {
      let card = btn.closest(".promotion-card");
      if (confirm("هل تريد حذف سجل الترقية؟")) {
        card.remove();
        savePromotions();
      }
    };
  });
}

activateDelete();

/* =========================
        EDIT PROMOTION
========================= */

document.querySelectorAll(".edit").forEach(btn => {
  btn.onclick = () => {
    alert("سيتم فتح نموذج تعديل الترقية");
  };
});

/* =========================
        SEARCH
========================= */

const searchInput = document.querySelector(".search-box input");

if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    let value = searchInput.value.toLowerCase();
    document.querySelectorAll(".promotion-card").forEach(card => {
      card.style.display = card.innerText.toLowerCase().includes(value) ? "flex" : "none";
    });
  });
}

/* =========================
        LOCAL STORAGE
========================= */

function savePromotions() {
  let promotions = [];
  document.querySelectorAll(".promotion-card").forEach(card => {
    promotions.push({ data: card.innerText });
  });
  localStorage.setItem("promotionsData", JSON.stringify(promotions));
}

function loadPromotions() {
  let data = localStorage.getItem("promotionsData");
  if (!data) return;
  console.log("تم تحميل سجل الترقيات", JSON.parse(data));
}

loadPromotions();

console.log("Promotions System Loaded Successfully");