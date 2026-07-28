/* =====================================================
    PAYMENT ORDERS SYSTEM JS - أوامر الصرف
    (تم إزالة دوال التحكم بالـ Sidebar - تعتمد على layout.js)
===================================================== */

/* =========================
        MODAL OPEN / CLOSE
========================= */

const modal = document.getElementById("paymentModal");

function openModal() {
  if (modal) {
    modal.classList.add("active");
  }
}

function closeModal() {
  if (modal) {
    modal.classList.remove("active");
  }
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

/* =========================
        SEARCH TABLE
========================= */

const searchInput = document.querySelector(".search-box input");
const rows = document.querySelectorAll("tbody tr");

if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    let value = searchInput.value.toLowerCase();
    rows.forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(value) ? "table-row" : "none";
    });
  });
}

/* =========================
        FILTER BUTTON
========================= */

const filterBtn = document.querySelector(".filter-btn");

if (filterBtn) {
  filterBtn.addEventListener("click", () => {
    let status = prompt("اكتب الحالة المطلوبة:\nمعتمد - قيد المراجعة - مرفوض");
    if (status) {
      rows.forEach(row => {
        row.style.display = row.textContent.includes(status) ? "table-row" : "none";
      });
    }
  });
}

/* =========================
        SAVE PAYMENT ORDER
========================= */

const saveBtn = document.querySelector(".save-btn");

if (saveBtn) {
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("تم حفظ أمر الصرف بنجاح ✅");
    closeModal();
  });
}

/* =========================
        EXPORT BUTTON
========================= */

const exportBtn = document.querySelector(".quick-actions button:nth-child(3)");

if (exportBtn) {
  exportBtn.addEventListener("click", () => {
    alert("سيتم تصدير أوامر الصرف إلى Excel قريباً 📊");
  });
}

/* =========================
        ACTION BUTTONS
========================= */

document.querySelectorAll(".view").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("عرض تفاصيل أمر الصرف");
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

console.log("Payment Orders System Loaded Successfully");