const col0Array = [0,1,2,3,4,5]
const col1Array = [0,5,3,1,2,4]
const col2Array = [0,2,5,4,3,1]
let firstIntervalId
let firstCount = 0
let secondIntervalId
let secondCount = 0
let thirdIntervalId
let thirdCount = 0
let stopCount = 1
const speed = 100
const resArr = [[0,0,0],[0,0,0],[0,0,0]] //col1, col2, col3
let canPlay = true

//player money
let coins = 50
//localStorage.setItem('coins', coins)
document.querySelector('.coins').innerText = coins

//each of the next three functions control the numbers in one of the columns
function firstCycleArray() {
    let index = firstCount % col0Array.length 
    //console.log(col0Array[index])
    if (index === 0){
        //document.querySelector('.col0-top').innerText = col0Array[5]
        resArr[0][0] = col0Array[5]
        document.getElementById('icon00').src = '5.svg'
    } else {
        //document.querySelector('.col0-top').innerText = col0Array[index-1]
        resArr[0][0] = col0Array[index-1]
        document.getElementById('icon00').src = `${col0Array[index-1]}.svg`
    }
    //document.querySelector('.col0-middle').innerText = col0Array[index]
    resArr[0][1] = col0Array[index]
    document.getElementById('icon01').src = `${col0Array[index]}.svg`
    if (index === 5){
        //document.querySelector('.col0-bottom').innerText = col0Array[0]
        resArr[0][2] = col0Array[0]
        document.getElementById('icon02').src = '0.svg'
    } else{
        //document.querySelector('.col0-bottom').innerText = col0Array[index+1]
        resArr[0][2] = col0Array[index+1]
        document.getElementById('icon02').src = `${col0Array[index+1]}.svg`
    }
    firstCount++;
}

function secondCycleArray() {
    let index = secondCount % col1Array.length
    //console.log(col1Array[index])
    if (index === 0){
        //document.querySelector('.col1-top').innerText = col1Array[5]
        resArr[1][0] = col1Array[5]
        document.getElementById('icon10').src = '4.svg'
    } else {
        //document.querySelector('.col1-top').innerText = col1Array[index-1]
        resArr[1][0] = col1Array[index-1]
        document.getElementById('icon10').src = `${col1Array[index-1]}.svg`
    }
    //document.querySelector('.col1-middle').innerText = col1Array[index]
    resArr[1][1] = col1Array[index]
    document.getElementById('icon11').src = `${col1Array[index]}.svg`
    if (index === 5){
        //document.querySelector('.col1-bottom').innerText = col1Array[0]
        resArr[1][2] = col1Array[0]
        document.getElementById('icon12').src = '0.svg'
    } else{
        //document.querySelector('.col1-bottom').innerText = col1Array[index+1]
        resArr[1][2] = col1Array[index+1]
        document.getElementById('icon12').src = `${col1Array[index+1]}.svg`
    }
    secondCount++;
}

function thirdCycleArray() {
    let index = thirdCount % col2Array.length
    //console.log(col2Array[index])
    if (index === 0){
        //document.querySelector('.col2-top').innerText = col2Array[5]
        resArr[2][0] = col2Array[5]
        document.getElementById('icon20').src = '1.svg'
    } else {
        //document.querySelector('.col2-top').innerText = col2Array[index-1]
        resArr[2][0] = col2Array[index-1]
        document.getElementById('icon20').src = `${col2Array[index-1]}.svg`
    }
    //document.querySelector('.col2-middle').innerText = col2Array[index]
    resArr[2][1] = col2Array[index]
    document.getElementById('icon21').src = `${col2Array[index]}.svg`
    if (index === 5){
        //document.querySelector('.col2-bottom').innerText = col2Array[0]
        resArr[2][2] = col2Array[0]
        document.getElementById('icon22').src = '0.svg'
    } else{
        //document.querySelector('.col2-bottom').innerText = col2Array[index+1]
        resArr[2][2] = col2Array[index+1]
        document.getElementById('icon22').src = `${col2Array[index+1]}.svg`
    }
    

    thirdCount++;
}

document.querySelector('.start').addEventListener('click', startCycle)
document.querySelector('.stop').addEventListener('click', stopCycle)


function startCycle(){
	//check if an interval has already been set up
	if(!firstIntervalId && !secondIntervalId && !thirdIntervalId){
        //place bet function here
        getBet()
		
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
    //order of checks: 1st row, 2nd row, 3rd row, left-right diag, right-left diag
    if (resArr[0][0] === resArr[1][0] && resArr[0][0] === resArr[2][0] || resArr[0][1] === resArr[1][1] && resArr[0][1] === resArr[2][1] || resArr[0][2] === resArr[1][2] && resArr[0][2] === resArr[2][2] || resArr[0][0] === resArr[1][1] && resArr[0][0] === resArr[2][2] || resArr[0][2] === resArr[1][1] && resArr[0][2] === resArr[2][0] ){
        console.log('WINNA')
    } else {
        console.log('soz')
    }
}

//const radioBtns = document.querySelectorAll('input[name="coin"]')
//checks the selected bet amount, and deducts that from the total coins. saves everything to local storage because I'm trying to learn that right now. 

const rangeValue = document.querySelector('input')
rangeValue.max = coins
function getBet(){
    let selectedBet = Number(rangeValue.value)
    if (selectedBet <= 0 || selectedBet === NaN || selectedBet > coins){
        console.log('get more money')
        canPlay = false
    } else if (coins === 0) {
        console.log('get more money')
        canPlay = false
    } else {
        coins -= selectedBet
        document.querySelector('.coins').innerText = coins
        rangeValue.max = coins
        firstIntervalId = setInterval(firstCycleArray, speed)
        secondIntervalId = setInterval(secondCycleArray, speed)
        thirdIntervalId = setInterval(thirdCycleArray, speed)
    }
}

// function getBet(){
//     let selectedBet
//     for (const radioBtn of radioBtns){
//         if (radioBtn.checked){
//             if (Number(radioBtn.value) <= coins && coins !== 0){
//                 selectedBet = Number(radioBtn.value)
//                 break
//             } else {
//                 return canPlay = false
//             }
            
//         }
//     }
//         coins -= selectedBet
//         document.querySelector('.coins').innerText = coins
//         console.log(selectedBet)
//         return canPlay = true
    
// }