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

