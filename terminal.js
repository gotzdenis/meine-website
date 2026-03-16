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
system    → Systemstatus anzeigen
sysinfo   → Systemprofil anzeigen
neofetch  → Systemübersicht anzeigen
whoami    → Benutzer anzeigen
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

document.getElementById("system-status").scrollIntoView({behavior:"smooth"});

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

clear: () => {

output.innerHTML = "";

}

};

input.addEventListener("keydown", function(e){

/* ENTER */

if(e.key === "Enter"){

const cmd = input.value.trim().toLowerCase();

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