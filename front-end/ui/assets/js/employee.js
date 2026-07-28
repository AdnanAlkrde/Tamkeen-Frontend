/* =========================================================
   EMPLOYEES MANAGEMENT SYSTEM
   DATA LAYER + GRID RENDER + PAGINATION
========================================================= */


/* =========================
        DATA
========================= */


let employees = [

  {
    id: 1,
    regNo: "100234",
    nationalNo: "09876541",
    name: "أحمد خالد المصري",
    fatherName: "خالد",
    motherName: "سلوى",
    birthDate: "1990-04-12",
    gender: "ذكر",
    birthPlace: "دمشق",
    address: "دمشق - المزة",
    phone: "0991234567",
    disability: "لا يوجد",
    dept: "الإدارة المالية",
    gov: "دمشق",
    status: "active"
  },


  {
    id: 2,
    regNo: "100235",
    nationalNo: "09876542",
    name: "سارة يوسف حداد",
    fatherName: "يوسف",
    motherName: "منى",
    birthDate: "1993-09-02",
    gender: "أنثى",
    birthPlace: "حلب",
    address: "حلب - الفرقان",
    phone: "0937654321",
    disability: "لا يوجد",
    dept: "الموارد البشرية",
    gov: "حلب",
    status: "active"
  },


  {
    id: 3,
    regNo: "100236",
    nationalNo: "09876543",
    name: "محمد علي زيدان",
    fatherName: "علي",
    motherName: "رنا",
    birthDate: "1988-01-20",
    gender: "ذكر",
    birthPlace: "حمص",
    address: "حمص - الوعر",
    phone: "0944556677",
    disability: "حركية",
    dept: "خدمة المستفيدين",
    gov: "حمص",
    status: "pending"
  }

];





/* =========================
        VARIABLES
========================= */


let editingId = null;

let currentPage = 1;

const pageSize = 10;

let filteredEmployees = [...employees];







/* =========================
        STATISTICS
========================= */


function renderStats() {


  document.getElementById("statTotal").textContent =
    employees.length;



  document.getElementById("statActive").textContent =
    employees.filter(emp => emp.status === "active").length;



  document.getElementById("statPending").textContent =
    employees.filter(emp => emp.status === "pending").length;



  document.getElementById("statDeleted").textContent =
    employees.filter(emp => emp.status === "deleted").length;


}









/* =========================
        STATUS BADGE
========================= */


function statusBadge(status) {


  if (status === "active") {

    return `
        <span class="badge-status status-active">
            نشط
        </span>
        `;

  }



  if (status === "pending") {

    return `
        <span class="badge-status status-pending">
            قيد المراجعة
        </span>
        `;

  }



  return `
    <span class="badge-status status-deleted">
        محذوف منطقياً
    </span>
    `;


}









/* =========================
        GRID RENDER
========================= */


function renderGrid() {


  const grid =
    document.getElementById("employeeGridBody");



  const start =
    (currentPage - 1) * pageSize;



  const data =
    filteredEmployees.slice(
      start,
      start + pageSize
    );





  if (data.length === 0) {


    grid.innerHTML = `

        <div class="empty-data">

            لا يوجد موظفين

        </div>

        `;


    return;

  }






  grid.innerHTML = data.map(emp => `


    <div class="employee-row">



        <div>
            <input type="checkbox">
        </div>




        <div>
            ${emp.regNo}
        </div>





        <div class="emp-name">


            <div class="emp-avatar">

                ${emp.name.charAt(0)}

            </div>


            ${emp.name}


        </div>





        <div>
            ${emp.regNo}
        </div>





        <div>
            ${emp.nationalNo}
        </div>





        <div>
            ${emp.dept}
        </div>





        <div>
            ${emp.gov}
        </div>





        <div>
            ${emp.phone}
        </div>





        <div>

            ${statusBadge(emp.status)}

        </div>





        <div class="employee-actions">



            <button 
            class="icon-btn edit"
            onclick="openEditModal(${emp.id})">

                <i class="fa-solid fa-pen"></i>

            </button>





            <button 
            class="icon-btn print"
            onclick="openPrintModal(${emp.id})">

                <i class="fa-solid fa-print"></i>

            </button>





            <button 
            class="icon-btn delete"
            onclick="softDelete(${emp.id})">

                <i class="fa-solid fa-trash"></i>

            </button>



        </div>



    </div>


    `).join("");





  document.getElementById("resultCount").textContent =

    `عرض ${data.length} من ${filteredEmployees.length} موظف`;





  renderPagination();


}









/* =========================
        PAGINATION
========================= */


function renderPagination() {


  const totalPages = Math.max(

    1,

    Math.ceil(
      filteredEmployees.length / pageSize
    )

  );



  const box =
    document.getElementById("pageBtns");



  let buttons = "";





  for (let i = 1; i <= totalPages; i++) {


    buttons += `

        <button 
        class="${i === currentPage ? "active" : ""}"

        onclick="goToPage(${i})">

            ${i}

        </button>

        `;


  }





  box.innerHTML = buttons;


}







function goToPage(page) {


  currentPage = page;

  renderGrid();


}

/* =========================================================
        SEARCH + FILTER SYSTEM
========================================================= */


/* =========================
        ADVANCED SEARCH
========================= */


function toggleAdvSearch() {


  const box =
    document.getElementById("advSearch");



  if (box.style.display === "grid") {

    box.style.display = "none";

  }
  else {

    box.style.display = "grid";

  }


}







function applyFilters() {


  const regNo =
    document.getElementById("fRegNo").value.trim();



  const nationalNo =
    document.getElementById("fNationalNo").value.trim();



  const name =
    document.getElementById("fName")
      .value
      .toLowerCase()
      .trim();




  const dept =
    document.getElementById("fDept").value;




  const gov =
    document.getElementById("fGov").value;




  const gender =
    document.getElementById("fGender").value;




  const status =
    document.getElementById("fStatus").value;






  filteredEmployees = employees.filter(emp => {



    return (

      (!regNo ||
        emp.regNo.includes(regNo))


      &&


      (!nationalNo ||
        emp.nationalNo.includes(nationalNo))


      &&


      (!name ||
        emp.name.toLowerCase().includes(name))


      &&


      (!dept ||
        emp.dept === dept)


      &&


      (!gov ||
        emp.gov === gov)


      &&


      (!gender ||
        emp.gender === gender)


      &&


      (!status ||
        emp.status === status)



    );


  });





  currentPage = 1;


  renderGrid();


  showToast(
    "تم تطبيق الفلاتر بنجاح"
  );


}









/* =========================
        QUICK SEARCH
========================= */


document
  .querySelector(".search-box input")
  .addEventListener("input", function () {



    const value =
      this.value
        .toLowerCase()
        .trim();





    filteredEmployees =
      employees.filter(emp => {



        return (

          emp.name
            .toLowerCase()
            .includes(value)


          ||


          emp.regNo.includes(value)


          ||


          emp.nationalNo.includes(value)



        );


      });





    currentPage = 1;


    renderGrid();



  });












/* =========================================================
        ADD / EDIT EMPLOYEE
========================================================= */







function openAddModal() {



  editingId = null;




  document.getElementById("modalTitle")
    .textContent =
    "إضافة موظف جديد";





  document.getElementById("empForm")
    .reset();





  document
    .getElementById("empModal")
    .classList.add("open");



}









function openEditModal(id) {



  const emp =
    employees.find(
      e => e.id === id
    );




  if (!emp) return;





  editingId = id;






  document.getElementById("modalTitle")
    .textContent =
    "تعديل بيانات الموظف";





  document.getElementById("in_regNo").value =
    emp.regNo;



  document.getElementById("in_nationalNo").value =
    emp.nationalNo;



  document.getElementById("in_name").value =
    emp.name;



  document.getElementById("in_fatherName").value =
    emp.fatherName;



  document.getElementById("in_motherName").value =
    emp.motherName;



  document.getElementById("in_birthDate").value =
    emp.birthDate;



  document.getElementById("in_gender").value =
    emp.gender;



  document.getElementById("in_birthPlace").value =
    emp.birthPlace;



  document.getElementById("in_address").value =
    emp.address;



  document.getElementById("in_phone").value =
    emp.phone;



  document.getElementById("in_disability").value =
    emp.disability;



  document.getElementById("in_dept").value =
    emp.dept;



  document.getElementById("in_gov").value =
    emp.gov;







  document
    .getElementById("empModal")
    .classList.add("open");



}









function closeModal() {



  document
    .getElementById("empModal")
    .classList.remove("open");


}









/* =========================
        SAVE EMPLOYEE
========================= */


function saveEmployee() {



  const data = {



    regNo:
      document.getElementById("in_regNo")
        .value
        .trim(),



    nationalNo:
      document.getElementById("in_nationalNo")
        .value
        .trim(),



    name:
      document.getElementById("in_name")
        .value
        .trim(),



    fatherName:
      document.getElementById("in_fatherName")
        .value
        .trim(),



    motherName:
      document.getElementById("in_motherName")
        .value
        .trim(),



    birthDate:
      document.getElementById("in_birthDate")
        .value,



    gender:
      document.getElementById("in_gender")
        .value,



    birthPlace:
      document.getElementById("in_birthPlace")
        .value,



    address:
      document.getElementById("in_address")
        .value,



    phone:
      document.getElementById("in_phone")
        .value,



    disability:
      document.getElementById("in_disability")
        .value,



    dept:
      document.getElementById("in_dept")
        .value,



    gov:
      document.getElementById("in_gov")
        .value



  };







  if (
    !data.regNo ||
    !data.nationalNo ||
    !data.name
  ) {


    showToast(
      "يرجى تعبئة الحقول الأساسية",
      true
    );


    return;


  }








  if (editingId) {



    const index =
      employees.findIndex(
        e => e.id === editingId
      );



    employees[index] = {

      ...employees[index],

      ...data

    };



    showToast(
      "تم تعديل بيانات الموظف"
    );



  }

  else {



    const newId =

      employees.length

        ?

        Math.max(
          ...employees.map(
            e => e.id
          )
        ) + 1

        :

        1;






    employees.push({

      id: newId,

      ...data,

      status: "pending"


    });





    showToast(
      "تمت إضافة الموظف"
    );


  }







  filteredEmployees =
    [...employees];



  renderStats();



  renderGrid();



  closeModal();



}

/* =========================================================
        DELETE SYSTEM (SOFT DELETE)
========================================================= */


function softDelete(id) {


  const emp =
    employees.find(
      e => e.id === id
    );


  if (!emp) return;



  const confirmDelete =
    confirm(
      `هل تريد حذف الموظف "${emp.name}" ؟`
    );



  if (!confirmDelete)
    return;



  emp.status = "deleted";



  filteredEmployees =
    [...employees];



  renderStats();

  renderGrid();



  showToast(
    "تم حذف الموظف منطقياً",
    true
  );


}







/* =========================================================
        PRINT EMPLOYEE CARD
========================================================= */


function openPrintModal(id) {



  const emp =
    employees.find(
      e => e.id === id
    );



  if (!emp) return;





  const body =
    document.getElementById("printCardBody");



  body.innerHTML = `


    <div class="employee-card">


        <h2>
            ${emp.name}
        </h2>



        <div class="info">


            <div>
                <span>
                الرقم الذاتي:
                </span>
                ${emp.regNo}
            </div>



            <div>
                <span>
                الرقم الوطني:
                </span>
                ${emp.nationalNo}
            </div>



            <div>
                <span>
                اسم الأب:
                </span>
                ${emp.fatherName || "-"}
            </div>



            <div>
                <span>
                اسم الأم:
                </span>
                ${emp.motherName || "-"}
            </div>



            <div>
                <span>
                القسم:
                </span>
                ${emp.dept}
            </div>



            <div>
                <span>
                المحافظة:
                </span>
                ${emp.gov}
            </div>



            <div>
                <span>
                الجوال:
                </span>
                ${emp.phone}
            </div>



            <div>
                <span>
                الحالة:
                </span>
                ${emp.status === "active"
      ?
      "نشط"
      :
      emp.status === "pending"
        ?
        "قيد المراجعة"
        :
        "محذوف"
    }
            </div>



        </div>


    </div>


    `;



  document
    .getElementById("printModal")
    .classList.add("open");


}





function closePrintModal() {


  document
    .getElementById("printModal")
    .classList.remove("open");


}








/* =========================================================
        EXPORT SYSTEM
========================================================= */


function exportData(type) {



  if (type === "excel") {



    let csv =
      "الرقم الذاتي,الرقم الوطني,الاسم,القسم,المحافظة,الحالة\n";



    filteredEmployees.forEach(emp => {


      csv +=
        `${emp.regNo},${emp.nationalNo},${emp.name},${emp.dept},${emp.gov},${emp.status}\n`;


    });





    const blob =
      new Blob(
        [
          "\uFEFF" + csv
        ],
        {
          type: "text/csv;charset=utf-8;"
        }
      );



    const link =
      document.createElement("a");



    link.href =
      URL.createObjectURL(blob);



    link.download =
      "employees.csv";



    link.click();



    showToast(
      "تم تصدير ملف Excel"
    );



  }



  else {



    showToast(
      "جاري تجهيز ملف PDF"
    );



    setTimeout(() => {

      window.print();

    }, 700);



  }



}








/* =========================================================
        TOAST SYSTEM
========================================================= */


function showToast(message, error = false) {



  const toast =
    document.getElementById("toast");



  if (!toast) return;



  toast.textContent =
    (error ? "⚠️ " : "✅ ")
    +
    message;



  toast.className =
    "toast show";



  if (error) {

    toast.classList.add("red");

  }




  setTimeout(() => {


    toast.className =
      "toast";


  }, 3000);



}








/* =========================================================
        SIDEBAR MOBILE
========================================================= */


function toggleSidebar() {


  const sidebar =
    document.querySelector(".sidebar");



  sidebar.classList.toggle("active");


}







document.addEventListener(
  "click",
  function (e) {



    const sidebar =
      document.querySelector(".sidebar");



    const menu =
      document.querySelector(".menu-btn");



    if (
      window.innerWidth <= 1100
      &&
      sidebar
      &&
      !sidebar.contains(e.target)
      &&
      menu
      &&
      !menu.contains(e.target)

    ) {


      sidebar.classList.remove("active");


    }


  });








/* =========================================================
        MODAL CLOSE EVENTS
========================================================= */


document
  .getElementById("empModal")
  .addEventListener(
    "click",
    function (e) {


      if (e.target === this) {

        closeModal();

      }


    });





document
  .getElementById("printModal")
  .addEventListener(
    "click",
    function (e) {


      if (e.target === this) {

        closePrintModal();

      }


    });








/* =========================================================
        INIT
========================================================= */


renderStats();

renderGrid();