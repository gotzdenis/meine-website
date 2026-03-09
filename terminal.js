const input = document.getElementById("terminal-input");
const output = document.getElementById("terminal-output");

const commands = {

help: `
Verfügbare Befehle:

help      → Hilfe anzeigen
about     → Über mich
projects  → Projekte öffnen
blog      → Blog öffnen
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

sysinfo: `
SYSTEM PROFILE

Name: Denis Gotz
Rolle: Fachinformatiker Systemintegration
Fokus: Linux / Netzwerke / Systemadministration
Portfolio: SYS-PORTFOLIO
`,

projects: () => {
window.location.href = "projects.html";
},

blog: () => {
window.location.href = "blog.html";
},

clear: () => {
output.innerHTML = "";
}

};

input.addEventListener("keydown", function(e){

if(e.key === "Enter"){

const cmd = input.value.trim().toLowerCase();

output.innerHTML += `<p>> ${cmd}</p>`;

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

}

});