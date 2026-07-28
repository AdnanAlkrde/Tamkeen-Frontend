/* =========================================================
   ANIMATIONS.JS — تفعيل الأنيميشن في كل الصفحات
   ========================================================= */

(function () {

  // =====================
  // 1. تفعيل الأنيميشن عند التمرير
  // =====================

  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-fade-down, .animate-fade-right, .animate-fade-left, .animate-fade-scale');

    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // بدء الأنيميشن
          entry.target.style.animationPlayState = 'running';
          // إزالة المراقبة بعد الظهور
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
      // إيقاف الأنيميشن مؤقتاً
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });
  }

  // =====================
  // 2. تفعيل أنيميشن البطاقات
  // =====================

  function initCardAnimations() {
    const cards = document.querySelectorAll('.card, .stat-card, .budget-card, .action-card, .leave-card, .training-card, .transfer-card, .promotion-card, .evaluation-card, .appointment-card, .qualification-card, .family-card');

    cards.forEach((card, index) => {
      // إضافة class الأنيميشن
      card.classList.add('animate-fade-up');
      // إضافة تأخير تدريجي
      const delay = (index % 4) + 1;
      card.classList.add('delay-' + delay);
    });
  }

  // =====================
  // 3. تفعيل أنيميشن الجداول
  // =====================

  function initTableAnimations() {
    const rows = document.querySelectorAll('tbody tr');

    rows.forEach((row, index) => {
      row.classList.add('animate-fade-right');
      const delay = (index % 5) + 1;
      row.classList.add('delay-' + delay);
    });
  }

  // =====================
  // 4. تفعيل أنيميشن النشاطات
  // =====================

  function initActivityAnimations() {
    const activities = document.querySelectorAll('.activity');

    activities.forEach((activity, index) => {
      activity.classList.add('animate-fade-left');
      const delay = (index % 3) + 1;
      activity.classList.add('delay-' + delay);
    });
  }

  // =====================
  // 5. تفعيل أنيميشن التنبيهات
  // =====================

  function initAlertAnimations() {
    const alerts = document.querySelectorAll('.alert');

    alerts.forEach((alert, index) => {
      alert.classList.add('animate-fade-scale');
      const delay = (index % 3) + 1;
      alert.classList.add('delay-' + delay);
    });
  }

  // =====================
  // 6. تفعيل Hover Effects
  // =====================

  function initHoverEffects() {
    // إضافة hover-lift للبطاقات
    document.querySelectorAll('.card, .stat-card, .budget-card').forEach(el => {
      el.classList.add('hover-lift');
    });

    // إضافة hover-scale للأزرار
    document.querySelectorAll('.btn, .quick-actions button').forEach(el => {
      el.classList.add('hover-scale-soft');
    });

    // إضافة hover-rotate للأيقونات
    document.querySelectorAll('.card-icon, .stat-icon').forEach(el => {
      el.classList.add('hover-rotate');
    });
  }

  // =====================
  // 7. تنفيذ كل شيء
  // =====================

  // انتظار تحميل DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initCardAnimations();
      initTableAnimations();
      initActivityAnimations();
      initAlertAnimations();
      initHoverEffects();
      initScrollAnimations();
    });
  } else {
    initCardAnimations();
    initTableAnimations();
    initActivityAnimations();
    initAlertAnimations();
    initHoverEffects();
    initScrollAnimations();
  }

  console.log('🎬 Animations System Loaded Successfully');

})();