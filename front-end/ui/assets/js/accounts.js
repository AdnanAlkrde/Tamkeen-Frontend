/* =====================================================
   ACCOUNTS SYSTEM JS - دليل الحسابات
   (تم إزالة دوال التحكم بالـ Sidebar - تعتمد على layout.js)
===================================================== */

/* =========================
        MODAL
========================= */

const accountModal = document.getElementById("accountModal");

function openModal() {
  if (accountModal) {
    accountModal.classList.add("active");
  }
}

function closeModal() {
  if (accountModal) {
    accountModal.classList.remove("active");
  }
}

if (accountModal) {
  accountModal.addEventListener("click", (e) => {
    if (e.target === accountModal) {
      closeModal();
    }
  });
}

/* =========================
        SEARCH
========================= */

const searchInput = document.querySelector(".search-box input");
const accountRows = document.querySelectorAll("tbody tr");

if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    let value = searchInput.value.toLowerCase();
    accountRows.forEach(row => {
      let text = row.textContent.toLowerCase();
      row.style.display = text.includes(value) ? "table-row" : "none";
    });
  });
}

/* =========================
        FILTER
========================= */

const filterBtn = document.querySelector(".filter-btn");

if (filterBtn) {
  filterBtn.addEventListener("click", () => {
    let type = prompt("اكتب نوع الحساب:\nأصول - التزامات - إيرادات - مصروفات");
    if (type) {
      accountRows.forEach(row => {
        row.style.display = row.textContent.includes(type) ? "table-row" : "none";
      });
    }
  });
}

/* =========================
        SAVE ACCOUNT
========================= */

const saveBtn = document.querySelector(".save-btn");

if (saveBtn) {
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("تم إنشاء الحساب بنجاح ✅");
    closeModal();
  });
}

/* =========================
        VIEW BUTTONS
========================= */

document.querySelectorAll(".view").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("عرض تفاصيل الحساب");
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
    if (confirm("هل تريد حذف هذا الحساب؟")) {
      alert("تم حذف الحساب");
    }
  });
});

/* =========================
        TREE TOGGLE
========================= */

document.querySelectorAll(".tree-item").forEach(item => {
  item.addEventListener("click", () => {
    item.classList.toggle("open");
  });
});

console.log("Accounts System Loaded Successfully");