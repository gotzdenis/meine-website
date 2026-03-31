document.addEventListener("mousemove", (e) => {

    let glow = document.getElementById("cursor-glow");

    if (!glow) {
        glow = document.createElement("div");
        glow.id = "cursor-glow";
        document.body.appendChild(glow);
    }

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});