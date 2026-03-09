fetch("projects.html")
.then(res => res.text())
.then(html => {

const parser = new DOMParser();
const doc = parser.parseFromString(html, "text/html");

const projects = doc.querySelectorAll(".tech-box");

document.getElementById("project-count").textContent = projects.length;

});

fetch("blog.html")
.then(res => res.text())
.then(html => {

const parser = new DOMParser();
const doc = parser.parseFromString(html, "text/html");

const posts = doc.querySelectorAll(".blog-card");

document.getElementById("blog-count").textContent = posts.length;

});