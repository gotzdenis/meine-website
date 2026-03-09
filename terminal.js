const input = document.getElementById("terminal-input");
const output = document.getElementById("terminal-output");

/* Linux Prompt */

const prompt = "denis@sys-portfolio:~$";

const commands = {

help: `
Verfügbare Befehle:

help      → Hilfe anzeigen
about     → Über mich
skills    → Fähigkeiten anzeigen
projects  → Projektseite öffnen
blog      → letzte Blogposts anzeigen
sysinfo   → Systemprofil anzeigen
clear     → Terminal leeren
`,

about: `
Denis Gotz
Fachinformatiker für Systemintegration (Umschulung)

Fokus:
Linux
Systemadministration
Dokumentation
`,

skills: `
SKILLS

Linux
Netzwerktechnik
Systemadministration
HTML
CSS
JavaScript
Git
`,

sysinfo: `
SYSTEM PROFILE

Name: Denis Gotz
Rolle: Fachinformatiker Systemintegration
Fokus: Linux / Netzwerke / Systemadministration
Portfolio: SYS-PORTFOLIO
`,

blog: `
LETZTE BLOGPOSTS

011  SYS-PORTFOLIO v2 – Technischer Umbau
010  Einführung Datenbanken
009  Einführung Programmierung

Alle Artikel:
blog.html
`,

projects: () => {

window.location.href = "projects.html";

},

clear: () => {

output.innerHTML = "";

}

};

input.addEventListener("keydown", function(e){

if(e.key === "Enter"){

const cmd = input.value.trim().toLowerCase();

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

});