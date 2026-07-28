/* =====================================================
   HR MANAGEMENT SYSTEM JS - الموارد البشرية
   (تم إزالة دوال التحكم بالـ Sidebar - تعتمد على layout.js)
===================================================== */

/* =========================
        HR SEARCH
========================= */

const searchInput = document.querySelector(".search-box input");
const cards = document.querySelectorAll(".card");

if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    let value = searchInput.value.trim().toLowerCase();
    cards.forEach(card => {
      card.style.display = card.innerText.toLowerCase().includes(value) ? "flex" : "none";
    });
  });
}

/* =========================
        CARD ANIMATION
========================= */

cards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.05}s`;
});

/* =========================
        CURRENT DATE
========================= */

const dateElement = document.querySelector(".welcome-box .date span");

if (dateElement) {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  dateElement.innerHTML = `${day}/${month}/${year}`;
}

console.log("HR Management System Loaded Successfully");