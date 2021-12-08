import ticTacBugGame from "./app-model.js";
//declarations
let ticTacBug = new ticTacBugGame;


//DOM assignments
let container = document.getElementById('container');

//EVENT HANDLERS
function handlerGrid(){
    container.querySelectorAll('DIV').forEach(element=> element.addEventListener('click',selectGridPosition));
}

function handleGridSlider(){
    
    document.querySelector('#grid-slider').addEventListener('change', drawBoard);
}

function handleLineButtons(){
    document.getElementById('classic').addEventListener('click', styleBoardLines);
    document.getElementById('disco').addEventListener('click', styleBoardLines);
    document.getElementById('reset').addEventListener('click', function(){ 
        document.getElementById('reset').disabled = true;
        drawBoard(); 
        setTimeout(()=>{
            document.getElementById('reset').disabled = false;
        },3000
        );
    });
}

//GENERAL FUNCTIONS

//codepen slider code thx to Aaron Iker - chopped up alot from original smoke slider
const $ = (s, o = document) => o.querySelector(s);
var interval;

let slider = $('.slider'),
    input = $('input', slider),
    random = (min, max) => min + Math.random() * (max - min),
    between = (min, max, percent) =>  max - (max - min) * (1 - percent),
    create = slider => {

        let percent = slider.handle.dataset.percent,
            position = slider.handle.dataset.position,
            div = document.createElement('div');

        slider.range.appendChild(div);
        div.remove();
    };

rangesliderJs.create(input, {
    onInit(value) {
        this.handle.dataset.value = value;
    },
    onSlideStart(value, percent, position) {
        this.handle.classList.add('active');
        interval = setInterval(() => {
            create(this);
        }, 3);
    },
    onSlide(value, percent, position) {
        this.handle.dataset.value = value;
        this.handle.dataset.percent = percent;
        this.handle.dataset.position = position;
    },
    onSlideEnd() {
        this.handle.classList.remove('active');
        clearInterval(interval);
    }
});


function styleBoardLines(e){
    // if the classic button is clicked
    //     add the .classic class - let it over-ride the glowing class.
    // --@-- MESSY CODE... can clean this fat condition statement up --@--
    let currentButton = e.target;
    if(currentButton.id == 'classic'){
        container.classList.add('classic');
        container.classList.remove('glowing');
        currentButton.classList.add('active');
        document.getElementById('disco').classList.remove('active');
    } else {
        container.classList.remove('classic');
        container.classList.add('glowing');
        currentButton.classList.add('active');
        document.getElementById('classic').classList.remove('active');
    }
}

function styleGridDimensions(size){
    container.style.gridTemplateColumns = null;
    container.style.gridTemplateRows = null;
    console.log(" 1fr".repeat(size));
    container.style.gridTemplateColumns = " 1fr".repeat(size);
    container.style.gridTemplateRows = " 1fr".repeat(size);
}

function setGridSize(){
   ticTacBug.gridSize = Number(document.getElementById('grid-slider').value);
   ticTacBug.reDrawBoard();
}

function selectGridPosition(Event){
    let grid_selection = Event.target;
    if(ticTacBug.playerMove(Number(grid_selection.dataset.row),Number(grid_selection.dataset.col))){
        
        console.log(grid_selection);
        if(ticTacBug.gridSize >=7){
            grid_selection.querySelector('h2').style.fontSize = 'clamp(10px, 2.8vw, 4vh)';
        } else if(ticTacBug.gridSize >=5){
            grid_selection.querySelector('h2').style.fontSize = 'clamp(14px, 3.5vw, 5.0vh)';
        }
        grid_selection.querySelector('span').textContent = ticTacBug.turn;
        ticTacBug.lastPlayaToMove = ticTacBug.turn;
        ticTacBug.toggleTurn();
    }
}

function drawBoard(){
    let col = 0;
    let row = 0;
    setGridSize();
    let gridDimensions = ticTacBug.gridSize;

    //reset turn counter and winner
    ticTacBug.moves = 0;
    ticTacBug.winner = false;
    document.getElementById('game-outcome').textContent = "";

    //clear the container div of anything in there previously
    container.innerHTML = '';
    styleGridDimensions(gridDimensions);

    //adjustments for large grid sizes
    if( ticTacBug.gridSize >= 5){
        container.style.gap = '0.7vh';
        
    } else if (ticTacBug.gridSize >= 7){
        container.style.gap = '0.3vh';
    }

    for(let i=1; i<=gridDimensions**2;i++){        
        //create the base div object as a grid square and set base node values
        let current_grid = Object.assign(document.createElement('div'),{
            id:String(i), 
            className:"grid-square",
        }); 
        current_grid.innerHTML = "<h2 data-text='o'><span></span></h2>";
        current_grid.setAttribute('data-row',row);
        current_grid.setAttribute('data-col',col);
        current_grid.setAttribute('data-clicked','false');
        container.appendChild(current_grid);
        col++;

        if(i%gridDimensions == 0){
            row++;
            col = 0;
        }
    }

    handleGridSlider();
    handlerGrid();
    handleLineButtons();
    document.getElementById('screen-cover').style.display = 'none';

}
drawBoard();

export default ticTacBug;