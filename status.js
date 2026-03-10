document.addEventListener("DOMContentLoaded", function () {

function countProjects(){

fetch("projects.html")
.then(res => res.text())
.then(html => {

const parser = new DOMParser();
const doc = parser.parseFromString(html, "text/html");

const projects = doc.querySelectorAll(".tech-box");

const el = document.getElementById("project-count");

if(el){
el.textContent = projects.length;
}

})
.catch(err => console.log("Project count error:", err));

}

function countBlogs(){

fetch("blog.html")
.then(res => res.text())
.then(html => {

const parser = new DOMParser();
const doc = parser.parseFromString(html, "text/html");

const posts = doc.querySelectorAll(".blog-card");

const el = document.getElementById("blog-count");

if(el){
el.textContent = posts.length;
}

})
.catch(err => console.log("Blog count error:", err));

}

countProjects();
countBlogs();

});