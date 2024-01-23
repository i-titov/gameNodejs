let time = 11000
let playerName
let startDisplayImgInterval = null
let startTimer = null
let score = 0
let round = 1
let roundSpeed = 1000
const nBlock = 16
const sqrt = 100/Math.sqrt(nBlock)
let delay = 1000
const board = document.querySelector('#boardGame')
const scoreText = document.querySelector('#score')
const roundText = document.querySelector('#round')
const playerText = document.querySelector('#player')
const form = document.querySelector('#game')
const input  = document.querySelector('#input')
const resetBtn  = document.querySelector('#reset')
const resetPopBtn = document.querySelector('#resetPopUp')
const popup = document.querySelector('.popup')
const timeGame  = document.querySelector('#timeGame')

// Click to btn for start the game
document.querySelector('#startGame').addEventListener('click',function (event){
    event.preventDefault()
    if(!input.value){return}
    playerName = input.value
    popup.classList.remove('flex')
    popup.classList.add('hidden')
    startGame()
})
//Events
resetBtn.addEventListener('click', ()=>{
    endGame()
})
resetPopBtn.addEventListener('click', ()=>{
    endGame()
    popup.classList.remove('flex')
    popup.classList.add('hidden')
})

//Fn for creating div
function createBlock(el){
        return `<div class="block" data-id ="${el}"></div>`
}
//Make random choose of img
function randomImages(){
    let random = Math.floor(Math.random() * 3) + 1
    return './public/img/'+random+'.jpeg'
}

// Show random img to div html
function displayCharacter(){
    removeImg()
    let random = Math.floor(Math.random() * nBlock) + 1
    let block = document.querySelector(`[data-id='${random}']`)
    block.appendChild(setRandomImage())
    block.classList.add('character')
}

// Add img to block
function setRandomImage(){
    let img = document.createElement("img");
    img.setAttribute('src', randomImages())
    return img
}
// Delete img from block
function removeImg(){
    document.querySelectorAll('.block').forEach((block)=>{
        if(block.classList.contains('character')){
            block.getElementsByTagName('img')[0].remove()
            block.classList.remove('character')
        }
    })
}
//Show info
function displayInfoOn(){
    scoreText.innerHTML = 'Score '+score
    roundText.innerHTML = 'Round '+round
    playerText.innerHTML = 'Player '+playerName
    scoreText.classList.remove('hidden')
    roundText.classList.remove('hidden')
    playerText.classList.remove('hidden')
    timeGame.classList.remove('hidden')
    resetBtn.classList.remove('hidden')
    form.classList.add('hidden')
}
// Clear img
function displayInfoOff(){
    score = 0
    scoreText.classList.add('hidden')
    roundText.classList.add('hidden')
    playerText.classList.add('hidden')
    timeGame.classList.add('hidden')
    input.value = ''
    form.classList.add('hidden')
    resetBtn.classList.add('hidden')
    time = 10000
}
// Set divs in html
function setBlocks(){
    for(let i = 1; i<= nBlock; i++){
        let element = createBlock(i)
        board.innerHTML += element
        board.classList.add('board')
    }
    document.querySelectorAll('.block').forEach((block)=>{
        block.style.width = (sqrt-1)+'%'
        block.style.height = sqrt+'%'
    })
}
//Delete blocks from html
function removeBlocks(){
    document.querySelectorAll('.block').forEach((block)=>{
        block.remove()
    })
}
// Set score and check if player didnt touch 1 img 2 times
function setScore(){
    document.querySelectorAll('.block').forEach((block)=>{
        block.addEventListener('click', function (){
            if(block.getElementsByTagName('img')[0] && !block.getElementsByTagName('img')[0].classList.contains('clicked')){
                block.getElementsByTagName('img')[0].classList.add('clicked')
                score++
                scoreText.innerHTML = 'Score '+score
            }
        })
    })
}
// Check if plays has a time
function isTimeOut(){
    return time <= 1000
}
function timerFn(){
    // Every second check if score < 30
    if(isScoreLimit()){
        showPopUp(true)
        stopTimer()
        stopRandomImg()
        endGame()
    }
    if(isTimeOut()){
        stopTimer()
        gameRules()
    }
    time -= delay
    timeGame.innerHTML = 'Seconds: '+time/1000
}
function gameRules(){
    if(isLastRound()){
        stopRandomImg()
        showPopUp(false)
        endGame()
        return
    }
    levelUp()
}
//Fn to stop timer
function stopTimer(){
    clearInterval(startTimer)
}
// Fn for stop show images
function stopRandomImg(){
    clearInterval(startDisplayImgInterval)
}
//Start the game
function startGame(){
    startTimerImgInterval()
    setBlocks()
    displayInfoOn()
    setScore()
}
// Finish the game
function endGame(){
    stopRandomImg()
    stopTimer()
    displayInfoOff()
    removeImg()
    removeBlocks()
    form.classList.remove('hidden')
    resetBtn.classList.add('hidden')
}
//Up level
function levelUp(){
    round++
    time = 11000
    roundSpeed = roundSpeed - (round * (round > 2 ? 50 : 100))
    stopRandomImg()
    startTimerImgInterval()
    displayInfoOn()
}
//Check if its last round
function isLastRound(){
    return round >= 5
}
//Check if score of player > 30
function isScoreLimit(){
    return score >=25
}
// Fn for starting 2 interval in one moment
function startTimerImgInterval(){
    startTimer = setInterval(timerFn,delay)
    startDisplayImgInterval = setInterval(displayCharacter, roundSpeed)
}
// Charge popup to show result of game
function showPopUp(win){
    let text = win ? 'Awesome ' : 'Sorry '
    document.querySelector('.popup-title').innerHTML = text+' '+playerName
    document.querySelector('.popup-round').innerHTML = 'Your round is: ' +round
    document.querySelector('.popup-score').innerHTML = 'Your Score is: ' +score
    popup.classList.remove('hidden')
    popup.classList.add('flex')
}
