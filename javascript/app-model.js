export default class ticTacBugGame {

    constructor(){
        this.gridSize = 3;
        this.turn = "X";
        this.board = [...Array(this.gridSize)].map(e=> Array(this.gridSize).fill(null));
        this.winner = false;
        this.lastPlayaToMove = '';
        this.moves = 0;
    }

    toggleTurn(){
        document.getElementById(this.turn).className = 'inactive-turn';
        document.getElementById(this.turn).style.textDecoration='none';
        document.getElementById('playa-'+this.turn).classList.remove('active');
        this.turn = this.turn == "X" ? "O" : "X";
        document.getElementById(this.turn).className = 'active-turn';
        document.getElementById('playa-'+this.turn).classList.add('active');
    }

    checkForWin(){
        var gridSquares = document.getElementById('container').children;
        //returns the row in index 0 and then the columns in following indexes

        //check horizontal columns along the y-axis
        for(let y=0; y< this.gridSize;y++){
            //grab the symbol in the starting grid position as string
            let horizontalVal = String(this.board[y][0]);

            if(horizontalVal!=null && this.gridSize == this.board[y].filter(e => e == horizontalVal).length){
                this.winner = true;
                //tag the divs with the winning chars
                for(let i=0; i<this.board[y].length; i++){
                    gridSquares[((y*this.gridSize)+i)].querySelector('h2').classList.add("win");
                }
 
            }
        }

        //check vertical columns along the x-axis
        for(let x=0; x< this.gridSize && !this.winner;x++){ 
            let matches = 0;
            for(let y = 0; y<this.gridSize; y++){
                let verticalVal = String(this.board[0][x]);
                if(verticalVal!=null && this.board[y][x] == verticalVal){
                    matches++;
                    if(matches==this.gridSize){
                        //tag the columns - nested so can access the x value
                        for(let i=0; i<this.gridSize; i++){
                            gridSquares[((i*this.gridSize)+x)].querySelector('h2').classList.add("win");
                        }  
                        this.winner = true 
                    } 
                } 
            } 
        }

        //check diagonal starting 0,0
        let lhsMatchCounter = 0;
        let lhsChar = String(this.board[0][0]);
        for(let xy=0; xy< this.gridSize && !this.winner;xy++){ 
            if(this.board[xy][xy]==lhsChar){
                lhsMatchCounter++
            }
            if(lhsMatchCounter==this.gridSize){
                for(let i=0; i<this.gridSize; i++){
                    gridSquares[((i*this.gridSize)+(i))].querySelector('h2').classList.add("win");
                }  
                this.winner = true;
            }
        }    

        //check diagonal starting this.board[-1],this.board[-1]
        let rhsMatchCounter = 0;
        let rhsChar = String(this.board[0][this.gridSize-1]);
        for(let xy=0; xy<this.gridSize && !this.winner;xy++){ 
            if(this.board[xy][this.gridSize-(1+xy)]==rhsChar){
                rhsMatchCounter++;
            }
            if(rhsMatchCounter==this.gridSize){
                for(let i=0; i<this.gridSize; i++){
                    gridSquares[((i*this.gridSize)+(this.gridSize - (i+1)))].querySelector('h2').classList.add("win");
                }  
                this.winner = true;
            }
        } 
        if(this.winner == true){
            document.getElementById('game-outcome').textContent = `${this.turn} WINS!`;
        }
        //check for draw
        else if(this.moves == this.gridSize**2 && this.winner == false){
            document.getElementById('game-outcome').textContent = "DRAW!";
        } 
    }

    playerMove(i,j){

        if(isNaN(i)){
            return false;
        } else if(this.board[i][j] == null){
            this.moves++;
            this.board[i][j] = this.turn;
            this.checkForWin(); 
            return true;
        } else {
            return false;
        }
    }

    reDrawBoard(){
        this.board = [...Array(this.gridSize)].map(e=> Array(this.gridSize).fill(null));
    }
}