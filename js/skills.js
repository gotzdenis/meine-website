document.addEventListener("DOMContentLoaded", () => {

  const bars = document.querySelectorAll(".skill-bar div");

  const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const bar = entry.target;
        const width = bar.style.width;

        bar.style.width = "0%";

        setTimeout(() => {
          bar.style.width = width;
        }, 100);

        observer.unobserve(bar);
      }

    });

  }, { threshold: 0.4 });

  bars.forEach(bar => {
    observer.observe(bar);
  });

});