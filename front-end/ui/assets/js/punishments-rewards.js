/* =====================================================
   PENALTIES & REWARDS MANAGEMENT SYSTEM JS
   صندوق المعونة الاجتماعية - العقوبات والمكافآت
   (تم إزالة دوال التحكم بالـ Sidebar - تعتمد على layout.js)
===================================================== */

/* =========================
        VARIABLES
========================= */

const actionModal = document.getElementById("actionModal");
const saveBtn = document.querySelector(".save-btn");
const actionList = document.querySelector(".action-list");
let editCard = null;

/* =========================
        MODAL CONTROL
========================= */

function openActionModal() {
  actionModal.classList.add("active");
}

function closeActionModal() {
  actionModal.classList.remove("active");
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
        SAVE ACTION
========================= */

saveBtn.onclick = () => {
  let inputs = document.querySelectorAll(".form-group input");
  let select = document.querySelector(".form-group select");

  let employee = inputs[0].value;
  let number = inputs[1].value;
  let type = select.value;
  let date = inputs[2].value;
  let reason = inputs[3].value;
  let department = inputs[4].value;

  if (employee === "") {
    alert("يرجى إدخال اسم الموظف");
    return;
  }

  if (editCard) {
    updateAction(editCard, employee, number, type, date, reason, department);
  } else {
    createAction(employee, number, type, date, reason, department);
  }

  closeActionModal();
  saveData();
};

/* =========================
        CREATE ACTION CARD
========================= */

function createAction(employee, number, type, date, reason, department) {
  let card = document.createElement("div");
  card.className = "action-card";

  card.innerHTML = `
        <div class="action-icon ${getActionClass(type)}">
            <i class="${getActionIcon(type)}"></i>
        </div>
        <div class="action-info">
            <h3>${employee}</h3>
            <p>الرقم الذاتي: ${number}</p>
            <p>نوع الإجراء: ${type}</p>
            <p>السبب: ${reason}</p>
            <p>التاريخ: ${date}</p>
            <p>الجهة المصدرة: ${department}</p>
            <p>الحالة: <span class="status vacation">قيد الموافقة</span></p>
        </div>
        <div class="actions">
            <button class="edit"><i class="fa-solid fa-pen"></i></button>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </div>
    `;

  actionList.appendChild(card);
  activateButtons();
}

/* =========================
        UPDATE ACTION
========================= */

function updateAction(card, employee, number, type, date, reason, department) {
  let data = card.querySelectorAll(".action-info p");
  card.querySelector("h3").innerText = employee;
  data[0].innerText = "الرقم الذاتي: " + number;
  data[1].innerText = "نوع الإجراء: " + type;
  data[2].innerText = "السبب: " + reason;
  data[3].innerText = "التاريخ: " + date;
  data[4].innerText = "الجهة المصدرة: " + department;

  let icon = card.querySelector(".action-icon");
  icon.className = "action-icon " + getActionClass(type);
  icon.innerHTML = `<i class="${getActionIcon(type)}"></i>`;
}

/* =========================
        ACTION ICONS
========================= */

function getActionIcon(type) {
  if (type.includes("مكافأة") || type.includes("كتاب") || type.includes("حافز")) {
    return "fa-solid fa-award";
  }
  return "fa-solid fa-gavel";
}

function getActionClass(type) {
  if (type.includes("مكافأة") || type.includes("كتاب") || type.includes("حافز")) {
    return "reward";
  }
  return "penalty";
}

/* =========================
        BUTTONS CONTROL
========================= */

function activateButtons() {
  const editButtons = document.querySelectorAll(".edit");
  const deleteButtons = document.querySelectorAll(".delete");

  editButtons.forEach(btn => {
    btn.onclick = () => {
      let card = btn.closest(".action-card");
      editCard = card;

      let info = card.querySelectorAll(".action-info p");
      let inputs = document.querySelectorAll(".form-group input");

      inputs[0].value = card.querySelector("h3").innerText;
      inputs[1].value = info[0].innerText.replace("الرقم الذاتي: ", "");
      inputs[2].value = info[3].innerText.replace("التاريخ: ", "");
      inputs[3].value = info[2].innerText.replace("السبب: ", "");
      inputs[4].value = info[4].innerText.replace("الجهة المصدرة: ", "");

      openActionModal();
    };
  });

  deleteButtons.forEach(btn => {
    btn.onclick = () => {
      let card = btn.closest(".action-card");
      if (confirm("هل تريد حذف هذا الإجراء؟")) {
        card.remove();
        saveData();
      }
    };
  });
}

activateButtons();

/* =========================
        SEARCH
========================= */

const searchInput = document.querySelector(".search-box input");

if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    let value = searchInput.value.toLowerCase();
    document.querySelectorAll(".action-card").forEach(card => {
      card.style.display = card.innerText.toLowerCase().includes(value) ? "flex" : "none";
    });
  });
}

/* =========================
        LOCAL STORAGE
========================= */

function saveData() {
  let actions = [];
  document.querySelectorAll(".action-card").forEach(card => {
    actions.push({ html: card.innerHTML });
  });
  localStorage.setItem("penaltiesRewards", JSON.stringify(actions));
}

function loadData() {
  let data = localStorage.getItem("penaltiesRewards");
  if (!data) return;
  let actions = JSON.parse(data);
  actions.forEach(item => {
    let card = document.createElement("div");
    card.className = "action-card";
    card.innerHTML = item.html;
    actionList.appendChild(card);
  });
  activateButtons();
}

loadData();

/* =========================
        CLOSE MODAL OUTSIDE
========================= */

window.onclick = (e) => {
  if (e.target === actionModal) {
    closeActionModal();
  }
};

console.log("Penalties & Rewards System Loaded Successfully");