/* =====================================================
   BUDGET SYSTEM JS - إدارة الموازنة
   (تم إزالة دوال التحكم بالـ Sidebar - تعتمد على layout.js)
===================================================== */

/* =========================
        MODAL
========================= */

const budgetModal = document.getElementById("budgetModal");

function openModal() {
  if (budgetModal) {
    budgetModal.classList.add("active");
  }
}

function closeModal() {
  if (budgetModal) {
    budgetModal.classList.remove("active");
  }
}

if (budgetModal) {
  budgetModal.addEventListener("click", (e) => {
    if (e.target === budgetModal) {
      closeModal();
    }
  });
}

/* =========================
        SEARCH
========================= */

const searchInput = document.querySelector(".search-box input");
const budgetRows = document.querySelectorAll("tbody tr");

if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    let value = searchInput.value.toLowerCase();
    budgetRows.forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(value) ? "table-row" : "none";
    });
  });
}

/* =========================
        FILTER
========================= */

const filterBtn = document.querySelector(".filter-btn");

if (filterBtn) {
  filterBtn.addEventListener("click", () => {
    let status = prompt("اكتب حالة الموازنة:\nضمن الخطة - قريب من الحد - تجاوز");
    if (status) {
      budgetRows.forEach(row => {
        row.style.display = row.textContent.includes(status) ? "table-row" : "none";
      });
    }
  });
}

/* =========================
        SAVE BUDGET
========================= */

const saveBtn = document.querySelector(".save-btn");

if (saveBtn) {
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("تم إضافة الاعتماد المالي بنجاح ✅");
    closeModal();
  });
}

/* =========================
        VIEW BUTTONS
========================= */

document.querySelectorAll(".view").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("عرض تفاصيل بند الموازنة");
  });
});

/* =========================
        EDIT BUTTONS
========================= */

document.querySelectorAll(".edit").forEach(btn => {
  btn.addEventListener("click", () => {
    openModal();
  });
});

/* =========================
        DELETE BUTTONS
========================= */

document.querySelectorAll(".delete").forEach(btn => {
  btn.addEventListener("click", () => {
    if (confirm("هل تريد حذف هذا البند من الموازنة؟")) {
      alert("تم حذف البند بنجاح");
    }
  });
});

/* =========================
        EXPORT REPORT
========================= */

const exportBtn = document.querySelector(".quick-actions button:nth-child(2)");

if (exportBtn) {
  exportBtn.addEventListener("click", () => {
    alert("جاري تجهيز تقرير الموازنة 📊");
  });
}

/* =========================
        PRINT
========================= */

const printBtn = document.querySelector(".quick-actions button:nth-child(3)");

if (printBtn) {
  printBtn.addEventListener("click", () => {
    window.print();
  });
}

console.log("Budget System Loaded Successfully");