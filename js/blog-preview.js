// ================= BLOG PREVIEW (FIXED) =================

document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("blog-preview-container");
  if (!container) return;

  // 🔥 wichtig → verhindert doppelte Einträge
  container.innerHTML = "";

  fetch("blog.html")
    .then(res => res.text())
    .then(html => {

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const posts = doc.querySelectorAll(".blog-card");

      if (!posts.length) {
        console.warn("Keine Blog Cards gefunden (.blog-card fehlt)");
        return;
      }

      for (let i = 0; i < 3 && i < posts.length; i++) {

        const post = posts[i];

        const title = post.querySelector("h4")?.innerText || "Blog Artikel";
        const link = post.querySelector("a")?.getAttribute("href") || "#";
        const text = post.querySelector("p")?.innerText || "";

        const card = document.createElement("div");
        card.className = "tech-box";

        // 🔥 gleiche Struktur wie Projekte
        card.innerHTML = `
          <span>BLOG</span>
          <h4>${title}</h4>
          <p>${text}</p>
          <p><a href="${link}">Artikel lesen →</a></p>
        `;

        container.appendChild(card);
      }

    })
    .catch(error => {
      console.warn("Blog Preview konnte nicht geladen werden", error);
    });

});