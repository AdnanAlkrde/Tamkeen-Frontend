/* =====================================================
   TRANSFERS SYSTEM JS - التحويلات المالية
   (تم إزالة دوال التحكم بالـ Sidebar - تعتمد على layout.js)
===================================================== */

/* =========================
        MODAL
========================= */

const transferModal = document.getElementById("transferModal");

function openModal() {
  if (transferModal) {
    transferModal.classList.add("active");
  }
}

function closeModal() {
  if (transferModal) {
    transferModal.classList.remove("active");
  }
}

if (transferModal) {
  transferModal.addEventListener("click", (e) => {
    if (e.target === transferModal) {
      closeModal();
    }
  });
}

/* =========================
        SEARCH
========================= */

const searchInput = document.querySelector(".search-box input");
const transferRows = document.querySelectorAll("tbody tr");

if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    let value = searchInput.value.toLowerCase();
    transferRows.forEach(row => {
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
    let status = prompt("اكتب الحالة:\nمكتمل - قيد التنفيذ - فشل");
    if (status) {
      transferRows.forEach(row => {
        row.style.display = row.textContent.includes(status) ? "table-row" : "none";
      });
    }
  });
}

/* =========================
        SAVE TRANSFER
========================= */

const saveBtn = document.querySelector(".save-btn");

if (saveBtn) {
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("تم حفظ التحويل المالي بنجاح ✅");
    closeModal();
  });
}

/* =========================
        ACTION BUTTONS
========================= */

document.querySelectorAll(".view").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("عرض تفاصيل التحويل");
  });
});

document.querySelectorAll(".edit").forEach(btn => {
  btn.addEventListener("click", () => {
    openModal();
  });
});

document.querySelectorAll(".print").forEach(btn => {
  btn.addEventListener("click", () => {
    window.print();
  });
});

/* =========================
        EXPORT
========================= */

const exportButton = document.querySelector(".quick-actions button:nth-child(2)");

if (exportButton) {
  exportButton.addEventListener("click", () => {
    alert("سيتم تصدير بيانات التحويلات إلى Excel 📊");
  });
}

console.log("Transfers System Loaded Successfully");