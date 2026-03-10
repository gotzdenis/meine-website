// ================= BLOG PREVIEW =================

fetch("blog.html")
.then(res => res.text())
.then(html => {

const parser = new DOMParser();
const doc = parser.parseFromString(html, "text/html");

// Alle Blog Karten finden
const posts = doc.querySelectorAll(".blog-card");

// Container auf Portfolio Seite
const container = document.getElementById("blog-preview-container");

if(!container) return;

// maximal 3 Artikel anzeigen
for(let i = 0; i < 3 && i < posts.length; i++){

const post = posts[i];

// Titel
const title = post.querySelector("h4") 
    ? post.querySelector("h4").innerText 
    : "Blog Artikel";

// Link
const link = post.querySelector("a") 
    ? post.querySelector("a").getAttribute("href") 
    : "#";

// Text
const text = post.querySelector("p") 
    ? post.querySelector("p").innerText 
    : "";

// neue Karte erstellen
const card = document.createElement("div");
card.className = "tech-box";

// Inhalt einsetzen
card.innerHTML = `
<h4>${title}</h4>
<p>${text}</p>
<a href="${link}">Artikel lesen →</a>
`;

container.appendChild(card);

}

})
.catch(error => {

console.warn("Blog Preview konnte nicht geladen werden", error);

});
