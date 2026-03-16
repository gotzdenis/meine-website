document.addEventListener("DOMContentLoaded", function () {

const cpu = document.getElementById("cpu-load");
const memory = document.getElementById("memory-usage");
const uptime = document.getElementById("system-uptime");

let startTime = Date.now();

function updateSystemStats(){

if(cpu){
cpu.textContent = Math.floor(Math.random() * 40 + 10);
}

if(memory){
memory.textContent = Math.floor(Math.random() * 50 + 30);
}

if(uptime){

let seconds = Math.floor((Date.now() - startTime) / 1000);

let h = Math.floor(seconds / 3600);
let m = Math.floor((seconds % 3600) / 60);
let s = seconds % 60;

uptime.textContent =
String(h).padStart(2,"0") + ":" +
String(m).padStart(2,"0") + ":" +
String(s).padStart(2,"0");

}

}

updateSystemStats();

setInterval(updateSystemStats, 2000);

});