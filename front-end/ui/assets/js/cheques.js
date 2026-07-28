/* =====================================================
   CHEQUES SYSTEM JS - إدارة الشيكات
   (تم إزالة دوال التحكم بالـ Sidebar - تعتمد على layout.js)
===================================================== */

/* =========================
        MODAL
========================= */

const chequeModal = document.getElementById("chequeModal");

function openModal() {
  if (chequeModal) {
    chequeModal.classList.add("active");
  }
}

function closeModal() {
  if (chequeModal) {
    chequeModal.classList.remove("active");
  }
}

if (chequeModal) {
  chequeModal.addEventListener("click", (e) => {
    if (e.target === chequeModal) {
      closeModal();
    }
  });
}

/* =========================
        SEARCH TABLE
========================= */

const searchInput = document.querySelector(".search-box input");
const chequeRows = document.querySelectorAll("tbody tr");

if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    let value = searchInput.value.toLowerCase();
    chequeRows.forEach(row => {
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
    let status = prompt("اكتب حالة الشيك:\nمصروف - قيد الصرف - ملغى");
    if (status) {
      chequeRows.forEach(row => {
        row.style.display = row.textContent.includes(status) ? "table-row" : "none";
      });
    }
  });
}

/* =========================
        SAVE CHEQUE
========================= */

const saveBtn = document.querySelector(".save-btn");

if (saveBtn) {
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("تم إصدار الشيك بنجاح ✅");
    closeModal();
  });
}

/* =========================
        ACTION BUTTONS
========================= */

document.querySelectorAll(".view").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("عرض تفاصيل الشيك");
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

const excelBtn = document.querySelector(".quick-actions button:nth-child(3)");

if (excelBtn) {
  excelBtn.addEventListener("click", () => {
    alert("سيتم تصدير الشيكات إلى Excel 📊");
  });
}

console.log("Cheques System Loaded Successfully");