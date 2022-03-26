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