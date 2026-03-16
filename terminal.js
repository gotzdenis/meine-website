const input = document.getElementById("terminal-input");
let commandHistory = [];
let historyIndex = -1;
const output = document.getElementById("terminal-output");

/* Linux Prompt */

const prompt = "denis@sys-portfolio:~$";

const commands = {

help: `
Verfügbare Befehle:

help      → Hilfe anzeigen
about     → Über mich anzeigen
skills    → Fähigkeiten anzeigen
projects  → Zu Projekte springen
blog      → Zum Blog springen
system    → System Dashboard anzeigen
sysinfo   → Systemprofil anzeigen
neofetch  → Systemübersicht anzeigen
whoami    → Benutzer anzeigen
scan      → Portfolio System Scan
clear     → Terminal leeren
`,

about: () => {

document.getElementById("about").scrollIntoView({behavior:"smooth"});

},

skills: () => {

document.getElementById("skills").scrollIntoView({behavior:"smooth"});

},

projects: () => {

document.getElementById("projects").scrollIntoView({behavior:"smooth"});

},

blog: () => {

document.getElementById("blog-preview").scrollIntoView({behavior:"smooth"});

},

system: () => {

document.getElementById("system-dashboard").scrollIntoView({behavior:"smooth"});

},

sysinfo: `
SYSTEM PROFILE

Name: Denis Gotz
Rolle: Fachinformatiker Systemintegration
Fokus: Linux / Netzwerke / Systemadministration
Portfolio: SYS-PORTFOLIO
`,

neofetch: `
denis@sys-portfolio
--------------------

OS: SYS-PORTFOLIO Linux
Role: Fachinformatiker Systemintegration
Focus: Linux / Netzwerke / Systemadministration
Projects: Portfolio System Console
Shell: Vanilla JavaScript Terminal

Uptime: Learning every day
`,

whoami: `
denis
Fachinformatiker Systemintegration (Umschulung)
SYS-PORTFOLIO Administrator
`,

scan: () => {

const projects = document.getElementById("project-count")?.textContent || "?";
const blogs = document.getElementById("blog-count")?.textContent || "?";

output.innerHTML += `
<pre>

SYS-PORTFOLIO SCAN
------------------

Projects: ${projects}
Blog Posts: ${blogs}
Modules: 6

System Status: OK

</pre>
`;

},

clear: () => {

output.innerHTML = "";

}

};

input.addEventListener("keydown", function(e){

/* ENTER */

if(e.key === "Enter"){

const cmd = input.value.trim().toLowerCase();

/* OPEN COMMAND */

if(cmd.startsWith("open ")){

const target = cmd.replace("open ","");

const pages = {

blog: "blog.html",
projects: "projects.html",
linux: "project-linux-001.html",
portfolio: "portfolio.html"

};

if(pages[target]){

window.location.href = pages[target];

}else{

output.innerHTML += `<p>Ziel nicht gefunden.</p>`;

}

input.value = "";
return;

}

/* History speichern */

if(cmd !== ""){
commandHistory.push(cmd);
historyIndex = commandHistory.length;
}

/* Prompt Ausgabe */

output.innerHTML += `<p><span class="cmd">${prompt}</span> ${cmd}</p>`;

/* Command prüfen */

if(commands[cmd]){

if(typeof commands[cmd] === "function"){

commands[cmd]();

}else{

output.innerHTML += `<pre>${commands[cmd]}</pre>`;

}

}else{

output.innerHTML += `<p>Befehl nicht gefunden.</p>`;

}

input.value = "";

/* Auto Scroll */

output.scrollTop = output.scrollHeight;

}

/* HISTORY ↑ */

if(e.key === "ArrowUp"){

if(historyIndex > 0){
historyIndex--;
input.value = commandHistory[historyIndex];
}

}

/* HISTORY ↓ */

if(e.key === "ArrowDown"){

if(historyIndex < commandHistory.length - 1){
historyIndex++;
input.value = commandHistory[historyIndex];
}else{
input.value = "";
}

}

});

/* TAB AUTOCOMPLETE */

input.addEventListener("keydown", function(e){

if(e.key === "Tab"){

e.preventDefault();

const value = input.value.toLowerCase();

const commandList = Object.keys(commands);

const match = commandList.find(cmd => cmd.startsWith(value));

if(match){
input.value = match;
}

}

});