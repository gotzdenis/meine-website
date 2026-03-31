
const secret = [
    "ArrowUp","ArrowUp",
    "ArrowDown","ArrowDown",
    "ArrowLeft","ArrowRight",
    "ArrowLeft","ArrowRight",
    "b","a"
];

let input = [];

document.addEventListener("keydown", (e) => {

    input.push(e.key);

    if (input.length > secret.length) {
        input.shift();
    }

    if (JSON.stringify(input) === JSON.stringify(secret)) {

        alert("🔥 Developer Mode aktiviert!");

        document.body.style.background = "#001111";

    }

});