/*=========================================
            Dashboard JS
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  // Animated Counter
  // ==============================

  const numbers = document.querySelectorAll(".card-info .number");

  numbers.forEach(counter => {
    const target = parseInt(counter.textContent.replace(/,/g, ""));
    let current = 0;
    const speed = Math.max(10, Math.floor(target / 100));

    const updateCounter = () => {
      if (current < target) {
        current += speed;
        if (current > target) current = target;
        counter.textContent = current.toLocaleString();
        requestAnimationFrame(updateCounter);
      }
    };

    counter.textContent = "0";
    updateCounter();
  });

  // ==============================
  // Cards Animation
  // ==============================

  const cards = document.querySelectorAll(".card");

  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";

    setTimeout(() => {
      card.style.transition = ".6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 150);
  });

  // ==============================
  // Buttons Hover Effect
  // ==============================

  const buttons = document.querySelectorAll(".quick-actions button");

  buttons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "scale(1.03)";
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "scale(1)";
    });
  });

  console.log("Dashboard Loaded Successfully ✅");
});

/*=========================================
   Dashboard JS - مع أنيميشن البطاقات
=========================================*/

document.addEventListener("DOMContentLoaded", function () {

  // ==============================
  // Animated Counter (العداد المتحرك)
  // ==============================

  const numbers = document.querySelectorAll(".card-info .number");

  numbers.forEach(counter => {
    const target = parseInt(counter.textContent.replace(/,/g, ""));
    let current = 0;
    const speed = Math.max(10, Math.floor(target / 100));

    const updateCounter = () => {
      if (current < target) {
        current += speed;
        if (current > target) current = target;
        counter.textContent = current.toLocaleString();
        requestAnimationFrame(updateCounter);
      }
    };

    // تأخير بدء العداد مع ظهور البطاقة
    setTimeout(() => {
      counter.textContent = "0";
      updateCounter();
    }, 300);
  });

  // ==============================
  // Buttons Hover Effect
  // ==============================

  const buttons = document.querySelectorAll(".quick-actions button");

  buttons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "scale(1.03)";
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "scale(1)";
    });
  });

  console.log("Dashboard Loaded Successfully ✅");
});