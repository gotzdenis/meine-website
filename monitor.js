function random(min, max){
return Math.floor(Math.random()*(max-min+1))+min;
}

function updateSystemMonitor(){

document.getElementById("cpu-load").textContent = random(3,25);
document.getElementById("memory-usage").textContent = random(20,60);

}

setInterval(updateSystemMonitor,2000);


/* uptime */

let startTime = Date.now();

function updateUptime(){

let diff = Date.now()-startTime;

let seconds = Math.floor(diff/1000)%60;
let minutes = Math.floor(diff/60000)%60;
let hours = Math.floor(diff/3600000);

document.getElementById("system-uptime").textContent =
hours+"h "+minutes+"m "+seconds+"s";

}

setInterval(updateUptime,1000);
