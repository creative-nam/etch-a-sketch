let amountOfRows = 16
let amountOfSquares = 256

function createRows(amountOfRows) {
    let container = document.querySelector('.container')

    for (let i = 0; i < amountOfRows; i++) {
        let row = document.createElement('div')

        row.classList.add('row')        
        row.classList.add(`r-${i}`)        
        
        container.appendChild(row)
    }
}

function createSquares(amountOfSquares) {
    let rowNum = 0

    for (let i = 0; i <= amountOfSquares - 1; i++) {
        if (i !== 0 && i % 16 === 0) rowNum++
        
        let row = document.querySelector(`.r-${rowNum}`)
        let square = document.createElement('div')

        square.classList.add('square')
        
        row.appendChild(square)
    }
}

createRows(amountOfRows)
createSquares(amountOfSquares)

/*
The folllowing piece of code, used to detect weather mouse is
down at any given moment was inspired by this comment on
stackoverflow: https://stackoverflow.com/questions/322378/javascript-check-if-mouse-button-down#:~:text=This%20is%20an,the%20MouseEvent%20docs.
by u/Jono Job
*/
let mouseIsDown = false

function isMouseDown(e) {
    //works if one, or all of the main buttons - right, left, and
    // middle (usually the wheel), are clicked/pressed (ie, simultaneously)
    // for more info, read about (mouse events)[https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons]
    if (e.buttons >= 1 && e.buttons < 8) {
        mouseIsDown = true
    }
}

document.addEventListener("mousedown", isMouseDown)
document.addEventListener("mousemove", isMouseDown)
window.addEventListener("mouseup", () => mouseIsDown = false)

let container = document.querySelector('.container')
let squares = document.querySelectorAll('.square')
let squaresArr = Array.from(squares)

function paintSquare(e) {
    if (e.type === 'click' || mouseIsDown && squaresArr.includes(e.target)) {
        e.target.classList.add('painted')
    }
}

container.addEventListener('mousemove', paintSquare)

squaresArr.forEach(square => {
    square.addEventListener('click', paintSquare)
});