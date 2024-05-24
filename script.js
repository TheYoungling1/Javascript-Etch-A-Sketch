const main_container = document.querySelector(".drawing_board");
let num_square = 30;

function create_grid(num_square) {
    main_container.innerHTML = ''; // Clear existing grid
    let square_size = 600 / num_square;

    for (let i = 0; i < num_square; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < num_square; j++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.style.cssText = `background: lavender; border: 1px solid white; width: ${square_size}px; height: ${square_size}px`;
            row.appendChild(square);
        }
        main_container.appendChild(row);
    }
    addSquareEventListeners(); // Add event listeners to new squares
}

create_grid(num_square);

const sizeButton = document.querySelector("#size");

sizeButton.addEventListener("click", () => {
    let new_num_square = parseInt(prompt("Please enter the desired dimension of the square grid", "30"));
    if (!isNaN(new_num_square) && new_num_square > 0) {
        num_square = new_num_square;
        create_grid(num_square);
    }
});

let is_random = false;

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const randomButton = document.querySelector("#random");
randomButton.addEventListener("click", () => {
    is_random = !is_random;
    randomButton.innerHTML = is_random ? "Original Colour" : "Random Colour";
});

function addSquareEventListeners() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.addEventListener("mouseover", (event) => {
            if (is_random) {
                event.target.style.background = getRandomColor();
            } else {
                event.target.style.background = "white";
            }
        });
    });
}

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", () => {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.style.background = "lavender";
    });
});