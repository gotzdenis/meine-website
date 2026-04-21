// ================= BLOG PREVIEW (FINAL + META) =================

document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("blog-preview-container");
  if (!container) return;

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

        // 🔹 Titel
        const title = post.querySelector("h4")?.innerText || "Blog Artikel";

        // 🔹 Link erkennen
        let link = "#";
        if (post.tagName === "A") {
          link = post.getAttribute("href") || "#";
        } else {
          const innerLink = post.querySelector("a");
          if (innerLink) link = innerLink.getAttribute("href") || "#";
        }

        // 🔹 Text (nur Beschreibung)
        let text = "";
        const paragraphs = post.querySelectorAll("p");
        if (paragraphs.length > 0) {
          text = paragraphs[0].innerText;
        }

        // 🔹 META (Datum + Tag)
        const date = post.querySelector(".blog-date")?.innerText || "";
        const tag = post.querySelector(".blog-tag")?.innerText || "";

        // 🔹 Karte bauen
        const card = document.createElement("div");
        card.className = "tech-box blog-card";

        card.innerHTML = `
          <div class="blog-meta">
            ${date ? `<span class="blog-date">${date}</span>` : ""}
            ${tag ? `<span class="blog-tag">${tag}</span>` : ""}
          </div>

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