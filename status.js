document.addEventListener("DOMContentLoaded", function () {

function animateCounter(element, target){

if(target <= 0){
element.textContent = 0;
return;
}

let current = 0;
const duration = 800;
const increment = Math.max(1, Math.floor(target / 40));

const interval = setInterval(function(){

current += increment;

if(current >= target){
current = target;
clearInterval(interval);
}

element.textContent = current;

}, duration / 40);

}

function countProjects(){

fetch("projects.html")
.then(res => res.text())
.then(html => {

const parser = new DOMParser();
const doc = parser.parseFromString(html, "text/html");

/* nur echte Projekte zählen */

const projects = doc.querySelectorAll(".tech-box h4");

const el = document.getElementById("project-count");

if(el){
animateCounter(el, projects.length);
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
animateCounter(el, posts.length);
}

})
.catch(err => console.log("Blog count error:", err));

}

countProjects();
countBlogs();

});