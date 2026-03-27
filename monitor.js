document.addEventListener("DOMContentLoaded", function () {

    const cpu = document.getElementById("cpu-load");
    const memory = document.getElementById("memory-usage");
    const uptime = document.getElementById("system-uptime");

    async function loadRealSystemData() {
        try {
            const response = await fetch('http://localhost:4000/status');
            const data = await response.json();

            // Uptime (echte Daten)
            if (uptime) {
                let seconds = Math.floor(data.uptime);

                let h = Math.floor(seconds / 3600);
                let m = Math.floor((seconds % 3600) / 60);
                let s = seconds % 60;

                uptime.textContent =
                    String(h).padStart(2,"0") + ":" +
                    String(m).padStart(2,"0") + ":" +
                    String(s).padStart(2,"0");
            }

            // RAM (echte Daten)
            if (memory) {
                let percentFree = Math.round((data.freeMemory / data.totalMemory) * 100);
                memory.textContent = percentFree;
            }

            // CPU (placeholder)
            if (cpu) {
                cpu.textContent = "LIVE";
            }

        } catch (error) {
            console.error("Server nicht erreichbar:", error);
        }
    }

    // alle 3 Sekunden aktualisieren
    setInterval(loadRealSystemData, 3000);

    // sofort beim Laden
    loadRealSystemData();

});