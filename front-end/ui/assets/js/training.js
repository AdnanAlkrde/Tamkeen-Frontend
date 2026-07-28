/* =====================================================
   TRAINING MANAGEMENT SYSTEM JS
   صندوق المعونة الاجتماعية - إدارة الدورات التدريبية
   (تم إزالة دوال التحكم بالـ Sidebar - تعتمد على layout.js)
===================================================== */

/* =========================
        VARIABLES
========================= */

const trainingModal = document.getElementById("trainingModal");
const saveBtn = document.querySelector(".save-btn");
const trainingList = document.querySelector(".training-list");
let editCard = null;

/* =========================
        MODAL CONTROL
========================= */

function openTrainingModal() {
  trainingModal.classList.add("active");
}

function closeTrainingModal() {
  trainingModal.classList.remove("active");
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
        SAVE TRAINING
========================= */

saveBtn.addEventListener("click", () => {
  let inputs = document.querySelectorAll(".form-group input");
  let select = document.querySelector(".form-group select");

  let name = inputs[0].value;
  let type = select.value;
  let trainer = inputs[1].value;
  let start = inputs[2].value;
  let end = inputs[3].value;
  let members = inputs[4].value;
  let place = inputs[5].value;

  if (name === "") {
    alert("يرجى إدخال اسم الدورة");
    return;
  }

  if (editCard) {
    updateTraining(editCard, name, type, trainer, start, end, members, place);
  } else {
    createTraining(name, type, trainer, start, end, members, place);
  }

  closeTrainingModal();
  saveData();
});

/* =========================
        CREATE TRAINING CARD
========================= */

function createTraining(name, type, trainer, start, end, members, place) {
  let card = document.createElement("div");
  card.className = "training-card";

  card.innerHTML = `
        <div class="training-icon ${getTrainingClass(type)}">
            <i class="${getTrainingIcon(type)}"></i>
        </div>
        <div class="training-info">
            <h3>${name}</h3>
            <p>نوع الدورة: ${type}</p>
            <p>المدرب: ${trainer}</p>
            <p>من: ${start}</p>
            <p>إلى: ${end}</p>
            <p>عدد المشاركين: ${members} موظف</p>
            <p>المكان: ${place}</p>
            <p>الحالة: <span class="status vacation">قيد التسجيل</span></p>
        </div>
        <div class="actions">
            <button class="edit"><i class="fa-solid fa-pen"></i></button>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </div>
    `;

  trainingList.appendChild(card);
  activateButtons();
}

/* =========================
        UPDATE TRAINING
========================= */

function updateTraining(card, name, type, trainer, start, end, members, place) {
  let info = card.querySelectorAll(".training-info p");
  card.querySelector("h3").innerText = name;
  info[0].innerText = "نوع الدورة: " + type;
  info[1].innerText = "المدرب: " + trainer;
  info[2].innerText = "من: " + start;
  info[3].innerText = "إلى: " + end;
  info[4].innerText = "عدد المشاركين: " + members + " موظف";
  info[5].innerText = "المكان: " + place;

  let icon = card.querySelector(".training-icon");
  icon.className = "training-icon " + getTrainingClass(type);
  icon.innerHTML = `<i class="${getTrainingIcon(type)}"></i>`;
}

/* =========================
        TRAINING ICON
========================= */

function getTrainingIcon(type) {
  if (type.includes("تقنية")) return "fa-solid fa-code";
  if (type.includes("مالية")) return "fa-solid fa-money-bill";
  if (type.includes("قانونية")) return "fa-solid fa-scale-balanced";
  if (type.includes("إدارية")) return "fa-solid fa-user-tie";
  return "fa-solid fa-chart-line";
}

function getTrainingClass(type) {
  if (type.includes("تقنية")) return "tech";
  return "";
}

/* =========================
        BUTTONS CONTROL
========================= */

function activateButtons() {
  const editButtons = document.querySelectorAll(".edit");
  const deleteButtons = document.querySelectorAll(".delete");

  editButtons.forEach(btn => {
    btn.onclick = () => {
      editCard = btn.closest(".training-card");
      let title = editCard.querySelector("h3").innerText;
      let info = editCard.querySelectorAll(".training-info p");
      let inputs = document.querySelectorAll(".form-group input");
      let select = document.querySelector(".form-group select");

      inputs[0].value = title;
      select.value = info[0].innerText.replace("نوع الدورة: ", "");
      inputs[1].value = info[1].innerText.replace("المدرب: ", "");
      inputs[2].value = info[2].innerText.replace("من: ", "");
      inputs[3].value = info[3].innerText.replace("إلى: ", "");
      inputs[4].value = info[4].innerText.replace("عدد المشاركين: ", "").replace(" موظف", "");
      inputs[5].value = info[5].innerText.replace("المكان: ", "");

      openTrainingModal();
    };
  });

  deleteButtons.forEach(btn => {
    btn.onclick = () => {
      let card = btn.closest(".training-card");
      if (confirm("هل تريد حذف هذه الدورة؟")) {
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
    document.querySelectorAll(".training-card").forEach(card => {
      card.style.display = card.innerText.toLowerCase().includes(value) ? "flex" : "none";
    });
  });
}

/* =========================
        LOCAL STORAGE
========================= */

function saveData() {
  let trainings = [];
  document.querySelectorAll(".training-card").forEach(card => {
    trainings.push({ html: card.innerHTML });
  });
  localStorage.setItem("trainingData", JSON.stringify(trainings));
}

function loadData() {
  let data = localStorage.getItem("trainingData");
  if (!data) return;
  let trainings = JSON.parse(data);
  trainings.forEach(item => {
    let card = document.createElement("div");
    card.className = "training-card";
    card.innerHTML = item.html;
    trainingList.appendChild(card);
  });
  activateButtons();
}

loadData();

/* =========================
        CLOSE MODAL
========================= */

window.onclick = (e) => {
  if (e.target === trainingModal) {
    closeTrainingModal();
  }
};

console.log("Training System Loaded Successfully");