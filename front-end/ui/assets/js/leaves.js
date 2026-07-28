/* =====================================================
   LEAVES MANAGEMENT SYSTEM JS
   صندوق المعونة الاجتماعية - إدارة الإجازات
   (تم إزالة دوال التحكم بالـ Sidebar - تعتمد على layout.js)
===================================================== */

/* =========================
        VARIABLES
========================= */

const leaveModal = document.getElementById("leaveModal");
const saveBtn = document.querySelector(".save-btn");
const leaveList = document.querySelector(".leave-list");
let editCard = null;

/* =========================
        MODAL
========================= */

function openLeaveModal() {
  leaveModal.classList.add("active");
}

function closeLeaveModal() {
  leaveModal.classList.remove("active");
  clearForm();
}

function clearForm() {
  document.querySelectorAll(".form-group input").forEach(input => {
    input.value = "";
  });
  document.querySelectorAll(".form-group select").forEach(select => {
    select.selectedIndex = 0;
  });
  editCard = null;
}

/* =========================
        SAVE LEAVE
========================= */

saveBtn.onclick = () => {
  let inputs = document.querySelectorAll(".form-group input");
  let select = document.querySelector(".form-group select");

  let employee = inputs[0].value;
  let type = select.value;
  let start = inputs[1].value;
  let end = inputs[2].value;
  let note = inputs[3].value;

  if (employee === "") {
    alert("يرجى إدخال اسم الموظف");
    return;
  }

  if (editCard) {
    updateLeave(editCard, employee, type, start, end);
  } else {
    createLeave(employee, type, start, end);
  }

  closeLeaveModal();
  saveLeaves();
};

/* =========================
        CREATE CARD
========================= */

function createLeave(employee, type, start, end) {
  let card = document.createElement("div");
  card.className = "leave-card";

  card.innerHTML = `
        <div class="leave-icon ${getTypeClass(type)}">
            <i class="${getTypeIcon(type)}"></i>
        </div>
        <div class="leave-info">
            <h3>${employee}</h3>
            <p>نوع الإجازة: ${type}</p>
            <p>من: ${start}</p>
            <p>إلى: ${end}</p>
            <p>الحالة: <span class="status vacation">قيد الموافقة</span></p>
        </div>
        <div class="actions">
            <button class="edit"><i class="fa-solid fa-pen"></i></button>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </div>
    `;

  leaveList.appendChild(card);
  activateButtons();
}

/* =========================
        UPDATE
========================= */

function updateLeave(card, employee, type, start, end) {
  card.querySelector("h3").innerText = employee;
  card.querySelectorAll("p")[0].innerText = "نوع الإجازة: " + type;
  card.querySelectorAll("p")[1].innerText = "من: " + start;
  card.querySelectorAll("p")[2].innerText = "إلى: " + end;

  let icon = card.querySelector(".leave-icon");
  icon.className = "leave-icon " + getTypeClass(type);
  icon.innerHTML = `<i class="${getTypeIcon(type)}"></i>`;
}

/* =========================
        BUTTONS
========================= */

function activateButtons() {
  document.querySelectorAll(".delete").forEach(btn => {
    btn.onclick = () => {
      let card = btn.closest(".leave-card");
      if (confirm("هل تريد حذف سجل الإجازة؟")) {
        card.remove();
        saveLeaves();
      }
    };
  });

  document.querySelectorAll(".edit").forEach(btn => {
    btn.onclick = () => {
      editCard = btn.closest(".leave-card");
      let data = editCard.querySelectorAll("p");
      let inputs = document.querySelectorAll(".form-group input");
      let select = document.querySelector(".form-group select");

      document.querySelector(".form-group input").value = editCard.querySelector("h3").innerText;
      select.value = data[0].innerText.replace("نوع الإجازة:", "").trim();
      inputs[1].value = data[1].innerText.replace("من:", "").trim();
      inputs[2].value = data[2].innerText.replace("إلى:", "").trim();

      openLeaveModal();
    };
  });
}

/* =========================
        TYPE SETTINGS
========================= */

function getTypeIcon(type) {
  if (type.includes("صحية")) return "fa-solid fa-notes-medical";
  if (type.includes("أمومة")) return "fa-solid fa-person-pregnant";
  if (type.includes("دراسية")) return "fa-solid fa-book-open";
  if (type.includes("بأجر")) return "fa-solid fa-money-bill";
  return "fa-solid fa-user-clock";
}

function getTypeClass(type) {
  if (type.includes("صحية")) return "health";
  if (type.includes("دراسية")) return "study";
  if (type.includes("أمومة")) return "purple";
  if (type.includes("بأجر")) return "green";
  return "orange";
}

/* =========================
        SEARCH
========================= */

const searchInput = document.querySelector(".search-box input");

if (searchInput) {
  searchInput.onkeyup = () => {
    let value = searchInput.value.toLowerCase();
    document.querySelectorAll(".leave-card").forEach(card => {
      card.style.display = card.innerText.toLowerCase().includes(value) ? "flex" : "none";
    });
  };
}

/* =========================
        LOCAL STORAGE
========================= */

function saveLeaves() {
  let data = [];
  document.querySelectorAll(".leave-card").forEach(card => {
    data.push(card.innerHTML);
  });
  localStorage.setItem("leavesData", JSON.stringify(data));
}

function loadLeaves() {
  let data = localStorage.getItem("leavesData");
  if (!data) return;
  JSON.parse(data).forEach(item => {
    let card = document.createElement("div");
    card.className = "leave-card";
    card.innerHTML = item;
    leaveList.appendChild(card);
  });
  activateButtons();
}

loadLeaves();

console.log("Leaves System Loaded Successfully");