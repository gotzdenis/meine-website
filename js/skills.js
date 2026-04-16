document.addEventListener("DOMContentLoaded", () => {

  const bars = document.querySelectorAll(".skill-bar div");

  // 🔴 WICHTIG: Start bei 0 setzen
  bars.forEach(bar => {
    bar.style.width = "0";
  });

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const bar = entry.target;
        const targetWidth = bar.dataset.width;

        // kleiner Delay für smooth Effekt
        setTimeout(() => {
          bar.style.width = targetWidth;
        }, 100);

        observer.unobserve(bar);
      }

    });

  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));

});