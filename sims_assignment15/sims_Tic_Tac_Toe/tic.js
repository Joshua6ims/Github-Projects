const boxes = document.querySelectorAll(".box");
const PlayerX = "X";
const PlayerO = "O";
let turn = PlayerX;

const boardState = Array(boxes.length);
boardState.fill(null);

const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area")
const gameOverText = document.getElementById("game-over-text")


boxes.forEach(box=>box.addEventListener("click", boxClick));


function boxClick(event){
    if(gameOverArea.classList.contains("visible")){
        return;
    }

    const box = event.target;
    const boxNumber = box.dataset.index;
    if(box.innerText != ""){
        return;
    }

    if(turn === PlayerX){
        box.innerText = PlayerX;
        boardState[boxNumber - 1] = PlayerX;
        turn = PlayerO;
    }
    else{
        box.innerText = PlayerO;
        boardState[boxNumber - 1] = PlayerO;
        turn = PlayerX;
    }

    checkWinner();
}

function checkWinner(){
    for(const winningCombination of winningCombo){
        const {combo, strikeClass} = winningCombination;
        const boxValue1 = boardState[combo[0] - 1];
        const boxValue2 = boardState[combo[1] - 1];
        const boxValue3 = boardState[combo[2] - 1];

        if(boxValue1 != null && 
            boxValue1 === boxValue2 && 
            boxValue1 === boxValue3
            ){
            strike.classList.add(strikeClass);
            gameOverScreen(boxValue1);
            return;
        }
    }

    const allBoxesFilledIn = boardState.every((box) => box !== null);
    if(allBoxesFilledIn){
        gameOverScreen(null);
    }

}

const winningCombo = [
    {combo: [1, 2, 3], },
    {combo: [4, 5, 6], },
    {combo: [7, 8, 9], },
    
    {combo: [1, 4, 7], },
    {combo: [2, 5, 8], },
    {combo: [3, 6, 9], },

    {combo: [1, 5, 9],},
    {combo: [3, 5, 7], },
]

function gameOverScreen(winnerText){
    let text = "Draw"
    if(winnerText != null){
        text = `Winner is ${winnerText}!`;
    }
    gameOverArea.className = "visible";
    gameOverText.innerText = text;
}


