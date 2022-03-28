let amountOfRows = 16
let squares, squaresArr

function createRows(amountOfRows) {
    let container = document.querySelector('.container')

    for (let i = 0; i < amountOfRows; i++) {
        let row = document.createElement('div')

        row.classList.add('row')        
        row.classList.add(`r-${i}`)
        row.style.height = 1 / amountOfRows
        
        container.appendChild(row)
    }
}

function createSquares(amountOfSquares) {
    let rowNum = 0

    for (let i = 0; i <= amountOfSquares - 1; i++) {
        if (i !== 0 && i % amountOfRows === 0) rowNum++
        
        let row = document.querySelector(`.r-${rowNum}`)
        let square = document.createElement('div')

        square.classList.add('square')
        square.style.width = 1 / (amountOfRows ** 2)
        
        row.appendChild(square)
    }
}

function createGrid(amountOfRows = amountOfRows) {
    createRows(amountOfRows)
    createSquares(amountOfRows ** 2)

    squares = document.querySelectorAll('.square')
    squaresArr = Array.from(squares)
}

createGrid(amountOfRows)

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

function paintSquare(e) {
    if (e.type === 'click' || mouseIsDown && squaresArr.includes(e.target)) {
        e.target.classList.add('painted')
    }
}

function erase(e) {
    if (e.type === 'click' || mouseIsDown && squaresArr.includes(e.target)) {
        e.target.classList.remove('painted')
    }
}

let eraserBtn = document.querySelector('.eraserBtn')

function isBtnOn(btn) {
    return (btn.classList.contains('on'))
}

function turnOffOtherBtns(exception) {
    let AllBtns = document.querySelectorAll('.g1')

    for (let currentBtn of AllBtns) {
        if (currentBtn === exception) continue
        
        currentBtn.classList.remove('on')
    }
}

function toggleBtn(arg) {
    
    //The argument might be an event, or it might
    //be a button.
    //Note: DO NOT REMOVE THE SEMICOLON!!! Javascript is weird...
    let btn = (arg.tagName === 'BUTTON')? e : arg.target;
    
    (isBtnOn(btn))? btn.classList.remove('on') :
        btn.classList.add('on')

   turnOffOtherBtns(btn)    
}

function displayGridSize(e) {
    let size = e.target.value
    gridSize.textContent = `${size} x ${size}`
}

function removePreviousContent() {
    let container = document.querySelector('.container')

    container.innerHTML = ''
}

function updateAmountofRows(e) {
    amountOfRows = e.target.value

    removePreviousContent()

    createGrid(amountOfRows)
}

let rangeElem = document.querySelector('#rangeInput')
let gridSize = document.querySelector('.gridSize')

rangeElem.addEventListener('input', displayGridSize)
rangeElem.addEventListener('change', updateAmountofRows)

container.addEventListener('mousemove', (e) => {
    (isBtnOn(eraserBtn))? erase(e) : paintSquare(e)
})

squaresArr.forEach(square => {
    square.addEventListener('click', (e) => {
        (isBtnOn(eraserBtn))? erase(e) : paintSquare(e)
    })
});

function clear() {
    squares.forEach(square => {
        square.classList.remove('painted')
    })
}

let clearBtn = document.querySelector('.clearBtn')

clearBtn.addEventListener('click', clear)

eraserBtn.addEventListener('click', toggleBtn)