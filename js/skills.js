document.addEventListener("DOMContentLoaded", () => {

  const bars = document.querySelectorAll(".skill-bar div");

  bars.forEach(bar => {
    bar.style.width = "0";
  });

  const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const bar = entry.target;
        const targetWidth = bar.getAttribute("data-width");

        bar.style.width = targetWidth;

        observer.unobserve(bar);
      }

    });

  }, { threshold: 0.4 });

  bars.forEach(bar => observer.observe(bar));

});