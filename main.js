const col0Array = [300,50,15,10,8,6]
const col1Array = [300,6,10,50,15,8]
const col2Array = [300,15,6,8,10,50]
// const col0Array = [300,1,2,3,4,5]
// const col1Array = [0,5,3,1,2,4]
// const col2Array = [0,2,5,4,3,1]
let firstIntervalId
let firstCount = 0
let secondIntervalId
let secondCount = 0
let thirdIntervalId
let thirdCount = 0
let stopCount = 1
const speed = 100
let canPlay = true
//initialLayout
const resArr = [[50,300,6],[6,300,8],[15,300,50]] //col1, col2, col3
    document.getElementById('icon00').src = '50.svg'
    document.getElementById('icon01').src = `300.svg`
    document.getElementById('icon02').src = `6.svg`
    document.getElementById('icon10').src = '6.svg'
    document.getElementById('icon11').src = `300.svg`
    document.getElementById('icon12').src = `8.svg`    
    document.getElementById('icon20').src = '15.svg'
    document.getElementById('icon21').src = `300.svg`
    document.getElementById('icon22').src = `50.svg`  

//player money
let coins = 50
//localStorage.setItem('coins', coins)
document.querySelector('.coins').innerText = coins

//each of the next three functions control the numbers in one of the columns
function firstCycleArray() {
    let index = firstCount % col0Array.length 
    if (index === 5){ //if at the last index of the array, it will switch the first index
        resArr[0][0] = col0Array[0]
        document.getElementById('icon00').src = '300.svg'
    } else {
        resArr[0][0] = col0Array[index+1] //otherwise this will return undefined
        document.getElementById('icon00').src = `${col0Array[index+1]}.svg`
    }
    resArr[0][1] = col0Array[index]
    document.getElementById('icon01').src = `${col0Array[index]}.svg`
    if (index === 0){ //if at the first index of the array, it will switch to the last index
        resArr[0][2] = col0Array[5]
        document.getElementById('icon02').src = '6.svg'
    } else{
        resArr[0][2] = col0Array[index-1] //otherwise this will return undefined
        document.getElementById('icon02').src = `${col0Array[index-1]}.svg`
    }
    firstCount++;
}

function secondCycleArray() {
    let index = secondCount % col1Array.length
    if (index === 5){
        resArr[1][0] = col1Array[0]
        document.getElementById('icon10').src = '300.svg'
    } else {
        resArr[1][0] = col1Array[index+1]
        document.getElementById('icon10').src = `${col1Array[index+1]}.svg`
    }
    resArr[1][1] = col1Array[index]
    document.getElementById('icon11').src = `${col1Array[index]}.svg`
    if (index === 0){
        resArr[1][2] = col1Array[5]
        document.getElementById('icon12').src = '8.svg'
    } else{
        resArr[1][2] = col1Array[index-1]
        document.getElementById('icon12').src = `${col1Array[index-1]}.svg`
    }
    secondCount++;
}

function thirdCycleArray() {
    let index = thirdCount % col2Array.length
    if (index === 5){
        resArr[2][0] = col2Array[0]
        document.getElementById('icon20').src = '300.svg'
    } else {
        resArr[2][0] = col2Array[index+1]
        document.getElementById('icon20').src = `${col2Array[index+1]}.svg`
    }
    resArr[2][1] = col2Array[index]
    document.getElementById('icon21').src = `${col2Array[index]}.svg`
    if (index === 0){
        resArr[2][2] = col2Array[5]
        document.getElementById('icon22').src = '50.svg'
    } else{
        resArr[2][2] = col2Array[index-1]
        document.getElementById('icon22').src = `${col2Array[index-1]}.svg`
    }
    thirdCount++;
}

document.querySelector('.start').addEventListener('click', startCycle)
document.querySelector('.stop').addEventListener('click', stopCycle)
let betAmount //gets the selectedAmount from getBet()

function startCycle(){
	//check if an interval has already been set up
	if(!firstIntervalId && !secondIntervalId && !thirdIntervalId){
        getBet()
        console.log(betAmount)
	}
}

//the if statements allow the player to stop each column one at a time, left to right
function stopCycle(){
    if (stopCount === 1 && firstIntervalId){
        clearInterval(firstIntervalId)
        // release our intervalID from the variable
        firstIntervalId = null 
        stopCount++
    } else if(stopCount === 2 && secondIntervalId){
        clearInterval(secondIntervalId)
        // release our intervalID from the variable
        secondIntervalId = null 
        stopCount++
    } else if (stopCount === 3 && thirdIntervalId){
        clearInterval(thirdIntervalId)
        // release our intervalID from the variable
        thirdIntervalId = null 
        console.table(resArr)
        checkWin()
        stopCount = 1
    }
}

//resArr layout
//c0|c1|c2
//[0][0][0]
//[1][1][1]
//[2][2][2]

function checkWin(){
    let winTopRow = (resArr[0][0] === resArr[1][0] && resArr[0][0] === resArr[2][0])
    let winMidRow = (resArr[0][1] === resArr[1][1] && resArr[0][1] === resArr[2][1])
    let winBotRow = (resArr[0][2] === resArr[1][2] && resArr[0][2] === resArr[2][2])
    let winLRDiag = (resArr[0][0] === resArr[1][1] && resArr[0][0] === resArr[2][2])
    let winRLDiag = (resArr[0][2] === resArr[1][1] && resArr[0][2] === resArr[2][0])
    //order of checks: 1st row, 2nd row, 3rd row, left-right diag, right-left diag
    //if (resArr[0][0] === resArr[1][0] && resArr[0][0] === resArr[2][0] || resArr[0][1] === resArr[1][1] && resArr[0][1] === resArr[2][1] || resArr[0][2] === resArr[1][2] && resArr[0][2] === resArr[2][2] || resArr[0][0] === resArr[1][1] && resArr[0][0] === resArr[2][2] || resArr[0][2] === resArr[1][1] && resArr[0][2] === resArr[2][0] ){
    if (winTopRow || winMidRow || winBotRow || winLRDiag || winRLDiag){
        console.log('WINNA')
        if (winTopRow || winLRDiag){
            coins = coins + betAmount * Number(resArr[0][0])
        } else if (winMidRow){
            console.log(betAmount, Number(resArr[0][1]))

            coins = coins + betAmount * Number(resArr[0][1])
            console.log(coins)
        } else if (winBotRow || winRLDiag){
            coins = coins + betAmount * Number(resArr[0][2])
        } 
        document.querySelector('.coins').innerText = coins
    } else {
        console.log('soz')
    }
}


//checks the selected bet amount, and deducts that from the total coins. saves everything to local storage because I'm trying to learn that right now. 

const rangeValue = document.querySelector('input')
rangeValue.max = coins
function getBet(){
    let selectedBet = Number(rangeValue.value) //takes the value of the number input and assigns it to the variable
    if (selectedBet <= 0 || selectedBet === NaN || selectedBet > coins){ //checks if a bet is too small, or NaN, or more than the amount of available coins
        console.log('get more money')
        betAmount = 0
    } else if (coins === 0) { //checks if the player has any coins anyway
        console.log('get more money')
        betAmount = 0
    } else {
        coins -= selectedBet
        document.querySelector('.coins').innerText = coins
        rangeValue.max = coins
        firstIntervalId = setInterval(firstCycleArray, speed)
        secondIntervalId = setInterval(secondCycleArray, speed)
        thirdIntervalId = setInterval(thirdCycleArray, speed)
        betAmount = selectedBet
    }
}