/* =====================================================
   FINANCIAL REPORTS JS - التقارير المالية
   (تم إزالة دوال التحكم بالـ Sidebar - تعتمد على layout.js)
===================================================== */

/* =========================
        SEARCH TABLE
========================= */

const searchInput = document.querySelector(".search-box input");
const reportRows = document.querySelectorAll("tbody tr");

if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    let value = searchInput.value.toLowerCase();
    reportRows.forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(value) ? "table-row" : "none";
    });
  });
}

/* =========================
        REPORT FILTER
========================= */

const reportType = document.querySelector(".filter-item select");
const searchReportBtn = document.querySelector(".search-report");

if (searchReportBtn) {
  searchReportBtn.addEventListener("click", () => {
    let type = reportType.value;
    reportRows.forEach(row => {
      if (type === "كل التقارير" || row.textContent.includes(type)) {
        row.style.display = "table-row";
      } else {
        row.style.display = "none";
      }
    });
    alert("تم تحديث التقرير حسب الاختيار ✅");
  });
}

/* =========================
        EXPORT EXCEL
========================= */

const excelBtn = document.querySelector(".excel-btn");

if (excelBtn) {
  excelBtn.addEventListener("click", () => {
    alert("جاري تجهيز ملف Excel 📊");
  });
}

/* =========================
        EXPORT PDF
========================= */

const pdfBtn = document.querySelector(".pdf-btn");

if (pdfBtn) {
  pdfBtn.addEventListener("click", () => {
    alert("جاري تجهيز ملف PDF 📄");
  });
}

/* =========================
        PRINT REPORT
========================= */

function printReport() {
  window.print();
}

/* =========================
        CURRENT DATE
========================= */

const date = new Date();
console.log("Reports Loaded:", date.toLocaleDateString("ar-SY"));