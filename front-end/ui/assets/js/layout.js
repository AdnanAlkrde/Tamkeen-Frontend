/* =========================================================
   LAYOUT.JS — الشريط الجانبي والهيدر الموحّدان
   =========================================================
   يقوم هذا الملف بحقن الشريط الجانبي (Sidebar) والهيدر
   (Header) في كل صفحات المشروع من مصدر واحد، بدل تكرار
   نفس الكود HTML في كل صفحة على حدة.

   طريقة الاستخدام في أي صفحة جديدة:
   1) ضع مكان الشريط الجانبي: <div id="app-sidebar"></div>
   2) ضع مكان الهيدر:
      <div id="app-header"
           data-title="عنوان الصفحة"
           data-subtitle="الوصف الفرعي"
           data-search="نص placeholder للبحث"></div>
   3) أدرج هذا الملف (layout.js) قبل ملف الصفحة الخاص
      مباشرة، في نهاية body، حتى تكون العناصر جاهزة عندما
      يعمل كود الصفحة (مثل employee.js أو accounts.js).

   لتحديث تصميم أو عناصر الشريط الجانبي لكل المشروع دفعة
   واحدة: عدّل فقط SIDEBAR_MENU بالأسفل (أو layout.css
   للتصميم).
   ========================================================= */

(function () {

    // قائمة عناصر الشريط الجانبي (المصدر الوحيد لكل المشروع)
    var SIDEBAR_MENU = [
        { href: "Dashbord.html", icon: "fa-solid fa-house", label: "الرئيسية" },
        { href: "employee.html", icon: "fa-solid fa-users", label: "إدارة الموظفين" },
        { href: "finance.html", icon: "fa-solid fa-money-bill-wave", label: "الإدارة المالية" },
        { href: "financial-reports.html", icon: "fa-solid fa-chart-column", label: "التقارير" },
        { href: "hr.html", icon: "fa-solid fa-user-group", label: "الموارد البشرية" },
        { href: "#", icon: "fa-solid fa-gear", label: "الإعدادات" }
    ];

    // أي قسم رئيسي يجب أن يظهر "فعّال" لكل صفحة فرعية
    var ACTIVE_SECTION = {
        "Dashbord.html": "Dashbord.html",
        "employee.html": "employee.html",
        "finance.html": "finance.html",
        "financial-reports.html": "financial-reports.html",
        "hr.html": "hr.html",
        "accounts.html": "finance.html",
        "budget.html": "finance.html",
        "cheques.html": "finance.html",
        "payment-orders.html": "finance.html",
        "transfers.html": "finance.html",
        "appointments.html": "hr.html",
        "employee-transfers.html": "hr.html",
        "family.html": "hr.html",
        "job-status.html": "hr.html",
        "leaves.html": "hr.html",
        "performance.html": "hr.html",
        "promotions.html": "hr.html",
        "punishments-rewards.html": "hr.html",
        "qualifications.html": "hr.html",
        "training.html": "hr.html"
    };

    function currentPage() {
        var parts = window.location.pathname.split("/");
        return parts[parts.length - 1] || "Dashbord.html";
    }

    function renderSidebar() {
        var el = document.getElementById("app-sidebar");
        if (!el) return;

        var active = ACTIVE_SECTION[currentPage()] || currentPage();

        var html = '<div class="logo">' +
            '<img src="" alt="وزارة الشؤون الاجتماعية والعمل">' +
            '<h2>وزارة الشؤون الاجتماعية والعمل</h2>' +
            '<span>صندوق المعونة الاجتماعية</span>' +
            '</div>' +
            '<ul class="menu">';

        SIDEBAR_MENU.forEach(function (item) {
            var isActive = item.href === active;
            html += '<li' + (isActive ? ' class="active"' : '') + '>' +
                '<a href="' + item.href + '">' +
                '<i class="' + item.icon + '"></i>' +
                '<span>' + item.label + '</span>' +
                '</a></li>';
        });

        html += '<li class="logout"><a href="#">' +
            '<i class="fa-solid fa-right-from-bracket"></i>' +
            '<span>تسجيل الخروج</span>' +
            '</a></li></ul>';

        el.outerHTML = '<aside class="sidebar">' + html + '</aside>';
    }

    function renderHeader() {
        var el = document.getElementById("app-header");
        if (!el) return;

        var title = el.getAttribute("data-title") || "";
        var subtitle = el.getAttribute("data-subtitle") || "";
        var search = el.getAttribute("data-search") || "بحث...";
        var menuOnclick = el.getAttribute("data-menu-onclick");
        var menuBtnAttr = menuOnclick ? ' onclick="' + menuOnclick + '"' : '';

        var html = '<div class="header-left">' +
            '<button class="menu-btn"' + menuBtnAttr + '><i class="fa-solid fa-bars"></i></button>' +
            '<div class="page-title"><h1>' + title + '</h1><p>' + subtitle + '</p></div>' +
            '</div>' +
            '<div class="header-right">' +
            '<div class="search-box">' +
            '<i class="fa-solid fa-magnifying-glass"></i>' +
            '<input type="text" placeholder="' + search + '">' +
            '</div>' +
            '<div class="notification"><i class="fa-regular fa-bell"></i><span class="badge">4</span></div>' +
            '<div class="user">' +
            '<img src="../assets/images/user.jpg" alt="User">' +
            '<div><h4>مدير النظام</h4><span>Administrator</span></div>' +
            '</div>' +
            '</div>';

        el.outerHTML = '<header class="header">' + html + '</header>';
    }

    renderSidebar();
    renderHeader();

})();
