const gridElement = document.getElementsByClassName("grid")[0];

function getOrientation() {
    if (window.innerWidth > window.innerHeight) {
        // Landscape
        gridElement.style.width = "unset";
        gridElement.style.height = "100%";
    } else if (window.innerWidth < window.innerHeight) {
        // Portrait
        gridElement.style.width = "100%";
        gridElement.style.height = "unset";
    }
}

window.onload = getOrientation;
window.onresize = getOrientation;

const ranges = {
    B: [1, 15, 5],
    I: [16, 30, 5],
    N: [31, 45, 4], // center is free
    G: [46, 60, 5],
    O: [61, 75, 5]
};

function randomUnique(min, max, count) {
    const nums = [];

    while (nums.length < count) {
        const n = Math.floor(Math.random() * (max - min + 1)) + min;

        if (!nums.includes(n)) {
            nums.push(n);
        }
    }

    return nums;
}

Object.entries(ranges).forEach(([letter, [min, max, count]]) => {
    const numbers = randomUnique(min, max, count);

    document
        .querySelectorAll(`.grid__cell--${letter}`)
        .forEach((cell, index) => {
            // Skip the free space in N
            if (letter === "N" && cell.textContent === "*") {
                return;
            }

            cell.textContent = numbers.shift();
        });
});

document.querySelector(".grid").addEventListener("click", (e) => {
    const cell = e.target.closest(".grid__cell");

    if (!cell) return;

    // Optional: prevent marking the BINGO header
    if (["B", "I", "N", "G", "O"].includes(cell.textContent)) return;

    cell.classList.toggle("grid__cell--marked");
});