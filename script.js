const main_container = document.querySelector(".drawing_board");
let num_square = 30;

function create_grid (num_square) {
    for (let i = 0; i < num_square; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < num_square; j++) {
            let square = document.createElement("div");
            square.classList.add("square");
            let square_size = 600 / num_square;
            square.style.cssText = `background: lavender; border: 1px solid white; width: ${square_size}px; height: ${square_size}px`;
            row.appendChild(square);
        }
        main_container.appendChild(row);
    }
}

create_grid(num_square);

// If the new grid button is pressed the grid is redrew
const size = document.querySelector("#size");
let all_rows = document.querySelectorAll(".row");

size.addEventListener("click", () => {
    let new_num_square = parseInt(prompt("Please enter the desired dimension of the square grid", "30"));
    
    // Remove all rows
    all_rows.forEach(row => row.remove());
    // No need to remove all squares, as by removing all rows, we are removing the squares within the row divs
    
    // Create new grid
    create_grid(new_num_square);
    
    // Update the node list references
    all_rows = document.querySelectorAll(".row");
    all_squares = document.querySelectorAll(".square");
});

let draw_colour = "white";

function getRandomColor() {
    // All possible # colour combination
    const letters = '0123456789ABCDEF';
    // Since all colours start with # we add from there
    let colour = '#';
    // We need to choose 6 extra digit/letters
    for (let i = 0; i < 6; i++) {
        // Math.random() generates between 0 to 1, so times 16 gives a random integer between 0 and 16
        colour += letters[Math.floor(Math.random() * 16)];
    }
    return colour;
}

let randomButton = document.querySelector("#random");
let is_random = false;

randomButton.addEventListener("click", () => {
    is_random = !is_random; 
    // Toggle random color mode
    // isRandom, like all Javascript variables/objects, has the embedded boolean value True
    // But if we compare True with !=, then the boolean expression becomes False, i.e. is_random = False 
    if (is_random) {
        randomButton.innerHTML = "Original Colour";
    } else {
        randomButton.innerHTML = "Random Colour";
    }
});

const squares = document.querySelectorAll(".square");
// For each div with in 'square' class
squares.forEach(square => {
    square.addEventListener("mouseover", (event) => {
        // If random is still original True, i.e. the button has not been clicked
        if (is_random) {
            event.target.style.background = getRandomColor();
        }
        else {
            event.target.style.background = "white"
        }
    });
    // We don't use event "mouseout" because we want to maintain the changed tile background
    // to achieve the "drawn on" effect
});


const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
    // Resets background colour for all divs within the class square
    squares.forEach(square => {
        square.style.background = "lavender";
    }
)} 
);


