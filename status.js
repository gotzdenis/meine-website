document.addEventListener("DOMContentLoaded", function () {

function animateCounter(element, target){

if(target <= 0){
element.textContent = 0;
return;
}

let current = 0;
const duration = 800;
const stepTime = Math.max(Math.floor(duration / target), 50);

const interval = setInterval(function(){

current++;

element.textContent = current;

if(current >= target){
clearInterval(interval);
}

}, stepTime);

}

function countProjects(){

fetch("projects.html")
.then(res => res.text())
.then(html => {

const parser = new DOMParser();
const doc = parser.parseFromString(html, "text/html");

const projects = doc.querySelectorAll(".tech-box");

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
