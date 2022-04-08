let amountOfRows = 16
let squares, squaresArr
let container = document.querySelector('.container')

function createRows(amountOfRows) {
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

        square.addEventListener('mouseenter', (e) => {
            (isBtnOn(eraserBtn))? erase(e) : paintSquare(e)
        });

        square.addEventListener('click', (e) => {
            (isBtnOn(eraserBtn))? erase(e) : paintSquare(e)
        })
        
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

function getRgbVals(str) {
    let i = 0
    let arr = ['', '', '']

    for (const letter of str) {
        if (!isNaN(letter)) arr[i] += letter

        else if (letter === ',') i++
        
        else if (letter === ' ') continue
    }

    return arr
}

/*
This piece of code, used to convert RGB colors to HSL was taken/inpired
by a comment on a stackoverflow thread by users u/defend orca
and u/azametzin

link to the comment: https://stackoverflow.com/questions/2348597/why-doesnt-this-javascript-rgb-to-hsl-code-work/54071699#:~:text=You%20have%20to%20change,60%2Cs%2Cl%2Ca%7D%3B%0A%7D
*/

function convertRgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    }

    else {
        let d = max - min;
        s = (l > 0.5)? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g -b) / d + ((g < b)? 6 : 0); break;
            case g: h = ( b -r) / d + 2; break;
            case b: h = (r -g) / d + 4; break;
        }
    }

    return [h * 60, s * 100, l * 100];
}

function darkenOrLighten(val) {
    return (isBtnOn(darkenBtn))? val - 5 : val + 5
}

function paintSquare(e) {
    if (e.type === 'click' || mouseIsDown && squaresArr.includes(e.target)) {
        let square = e.target
        
        if (isBtnOn(rainbowBtn)) {
            erase(e)
            square.classList.add('paintedRainbow')
            square.style.backgroundColor = `hsl(${(parseInt(Math.random() * 357) + 1)}, 80%, 50%)`
        }

        else if (isBtnOn(darkenBtn) || isBtnOn(lightenBtn)) {
            //slice the string form the 4th element (the elem immediately after the first parenthesis),
            //to the end (the last parenthesis), with the last elem not included
            let bgColor = window.getComputedStyle(square).backgroundColor.slice(4, -1)
            let bgColorRgb = getRgbVals(bgColor)
            let hsl = convertRgbToHsl(bgColorRgb[0], bgColorRgb[1], bgColorRgb[2])

            square.style.backgroundColor = `hsl(${hsl[0]}, ${hsl[1]}%, ${darkenOrLighten(hsl[2])}%)`         
        }

        else {
            erase(e)
            square.classList.add('painted')
        }
    }
}

function erase(e) {
    if (e.type === 'click' || mouseIsDown && squaresArr.includes(e.target)) {
        e.target.classList.remove('painted')
        e.target.classList.remove('paintedRainbow')
        e.target.style.backgroundColor = ''
    }
}

function togglegridLines(e) {
    toggleBtn(e)
    
    if (isBtnOn(gridLinesBtn)) {
        squares.forEach(square => {
            square.style.borderRight = '.1px solid grey'
            square.style.borderBottom = '.1px solid grey'
        })
    }

    else {
        squares.forEach(square => {
            square.style.border = '0'
        }) 
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

function clear() {
    squares.forEach(square => {
        square.classList.remove('painted')
        square.classList.remove('paintedrainbow')
        square.style.backgroundColor = '#fff'
    })
}

let clearBtn = document.querySelector('.clearBtn')

clearBtn.addEventListener('click', clear)

eraserBtn.addEventListener('click', toggleBtn)

let rainbowBtn = document.querySelector('.rainbowBtn')

rainbowBtn.addEventListener('click', toggleBtn)

let darkenBtn = document.querySelector('.darkenBtn')
darkenBtn.addEventListener('click', toggleBtn)

let lightenBtn = document.querySelector('.lightenBtn')
lightenBtn.addEventListener('click', toggleBtn)

let gridLinesBtn = document.querySelector('.gridLinesBtn')
gridLinesBtn.addEventListener('click', togglegridLines)