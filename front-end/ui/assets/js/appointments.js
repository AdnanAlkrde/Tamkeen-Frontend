/* =====================================================
   APPOINTMENTS MANAGEMENT SYSTEM JS
   صندوق المعونة الاجتماعية - إدارة التعيينات
   (تم إزالة دوال التحكم بالـ Sidebar - تعتمد على layout.js)
===================================================== */

/* =========================
        VARIABLES
========================= */

const appointmentModal = document.getElementById("appointmentModal");
const saveBtn = document.querySelector(".save-btn");
const appointmentList = document.querySelector(".appointment-list");
let editAppointment = null;

/* =========================
        MODAL CONTROL
========================= */

function openAppointmentModal() {
  if (appointmentModal) {
    appointmentModal.classList.add("active");
  }
}

function closeAppointmentModal() {
  if (appointmentModal) {
    appointmentModal.classList.remove("active");
    clearForm();
  }
}

function clearForm() {
  document.querySelectorAll(".form-group input").forEach(input => {
    input.value = "";
  });
  document.querySelectorAll(".form-group select").forEach(select => {
    select.selectedIndex = 0;
  });
  editAppointment = null;
}

/* =========================
        SAVE APPOINTMENT
========================= */

if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    let inputs = document.querySelectorAll(".form-group input");
    let selects = document.querySelectorAll(".form-group select");

    let employee = inputs[0].value;
    let decision = inputs[1].value;
    let type = selects[0].value;
    let department = inputs[2].value;
    let job = inputs[3].value;
    let startDate = inputs[4].value;
    let status = selects[1].value;

    if (employee === "") {
      alert("يرجى إدخال اسم الموظف");
      return;
    }

    if (editAppointment) {
      updateAppointment(editAppointment, employee, decision, type, department, job, startDate, status);
    } else {
      createAppointment(employee, decision, type, department, job, startDate, status);
    }

    closeAppointmentModal();
    saveData();
  });
}

/* =========================
        CREATE APPOINTMENT
========================= */

function createAppointment(employee, decision, type, department, job, startDate, status) {
  let card = document.createElement("div");
  card.className = "appointment-card";

  card.innerHTML = `
        <div class="appointment-icon">
            <i class="fa-solid fa-file-signature"></i>
        </div>
        <div class="appointment-info">
            <h3>${employee}</h3>
            <p>رقم القرار: ${decision}</p>
            <p>نوع القرار: ${type}</p>
            <p>القسم: ${department}</p>
            <p>الوظيفة: ${job}</p>
            <p>تاريخ المباشرة: ${startDate}</p>
            <p>الحالة: <span class="status ${getStatusClass(status)}">${status}</span></p>
        </div>
        <div class="actions">
            <button class="edit"><i class="fa-solid fa-pen"></i></button>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </div>
    `;

  appointmentList.appendChild(card);
  activateButtons();
}

/* =========================
        UPDATE APPOINTMENT
========================= */

function updateAppointment(card, employee, decision, type, department, job, startDate, status) {
  let info = card.querySelectorAll(".appointment-info p");
  card.querySelector("h3").innerText = employee;
  info[0].innerText = "رقم القرار: " + decision;
  info[1].innerText = "نوع القرار: " + type;
  info[2].innerText = "القسم: " + department;
  info[3].innerText = "الوظيفة: " + job;
  info[4].innerText = "تاريخ المباشرة: " + startDate;
  info[5].innerHTML = `الحالة: <span class="status ${getStatusClass(status)}">${status}</span>`;
}

/* =========================
        STATUS COLOR
========================= */

function getStatusClass(status) {
  if (status === "ساري") return "active";
  if (status === "قيد التنفيذ") return "pending";
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
      editAppointment = btn.closest(".appointment-card");
      let employee = editAppointment.querySelector("h3").innerText;
      let info = editAppointment.querySelectorAll(".appointment-info p");
      let inputs = document.querySelectorAll(".form-group input");
      let selects = document.querySelectorAll(".form-group select");

      inputs[0].value = employee;
      inputs[1].value = info[0].innerText.replace("رقم القرار:", "").trim();
      selects[0].value = info[1].innerText.replace("نوع القرار:", "").trim();
      inputs[2].value = info[2].innerText.replace("القسم:", "").trim();
      inputs[3].value = info[3].innerText.replace("الوظيفة:", "").trim();
      inputs[4].value = info[4].innerText.replace("تاريخ المباشرة:", "").trim();
      selects[1].value = info[5].innerText.replace("الحالة:", "").trim();

      openAppointmentModal();
    };
  });

  deleteButtons.forEach(btn => {
    btn.onclick = () => {
      let card = btn.closest(".appointment-card");
      if (confirm("هل تريد حذف قرار التعيين؟")) {
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
    document.querySelectorAll(".appointment-card").forEach(card => {
      card.style.display = card.innerText.toLowerCase().includes(value) ? "flex" : "none";
    });
  });
}

/* =========================
        LOCAL STORAGE
========================= */

function saveData() {
  let appointments = [];
  document.querySelectorAll(".appointment-card").forEach(card => {
    appointments.push({ html: card.innerHTML });
  });
  localStorage.setItem("appointmentsData", JSON.stringify(appointments));
}

function loadData() {
  let data = localStorage.getItem("appointmentsData");
  if (!data) return;
  let appointments = JSON.parse(data);
  appointments.forEach(item => {
    let card = document.createElement("div");
    card.className = "appointment-card";
    card.innerHTML = item.html;
    appointmentList.appendChild(card);
  });
  activateButtons();
}

loadData();

/* =========================
        CLOSE MODAL OUTSIDE
========================= */

window.addEventListener("click", (e) => {
  if (e.target === appointmentModal) {
    closeAppointmentModal();
  }
});

/* =========================
        ESC CLOSE
========================= */

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeAppointmentModal();
  }
});

console.log("Appointments System Loaded Successfully");