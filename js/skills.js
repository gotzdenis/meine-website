document.addEventListener("DOMContentLoaded", () => {

  const bars = document.querySelectorAll(".skill-bar div");

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const bar = entry.target;
        const targetWidth = bar.dataset.width;

        bar.style.width = targetWidth;

        observer.unobserve(bar);
      }

    });

  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));

});