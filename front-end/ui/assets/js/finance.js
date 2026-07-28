/* =====================================================
   FINANCE MANAGEMENT SYSTEM JS - الإدارة المالية
   (تم إزالة دوال التحكم بالـ Sidebar - تعتمد على layout.js)
===================================================== */

/* =========================
        AUTO DATE
========================= */

const dateElement = document.querySelector(".welcome-box .date span");

if (dateElement) {
  const today = new Date();
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric"
  };
  dateElement.textContent = today.toLocaleDateString("ar-SY", options);
}

/* =========================
        FINANCE SEARCH
========================= */

const searchInput = document.querySelector(".search-box input");
const tableRows = document.querySelectorAll("tbody tr");

if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    let value = searchInput.value.toLowerCase();
    tableRows.forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(value) ? "table-row" : "none";
    });
  });
}

/* =========================
        CARD CLICK EFFECT
========================= */

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    card.style.transform = "scale(.98)";
    setTimeout(() => {
      card.style.transform = "";
    }, 150);
  });
});

console.log("Finance System Loaded Successfully");