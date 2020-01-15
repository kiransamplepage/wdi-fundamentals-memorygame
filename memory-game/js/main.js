let cards = [
	{
		  rank : "queen"
		, suit : "hearts"
		, cardImage: "images/queen-of-hearts.png"
	},
	
	{
		  rank : "queen"
		, suit : "diamonds"
		, cardImage: "images/queen-of-diamonds.png"
	},
	
	{
		  rank : "king"
		, suit : "hearts"
		, cardImage: "images/king-of-hearts.png"
	},
	
	{
		  rank : "king"
		, suit : "diamonds"
		, cardImage: "images/king-of-diamonds.png"
	}	
];

let cardsInPlay = [];
let gamesPlayed = 0;
let gamesWon = 0;
let playAgain = true;
let tempCardId = "";

function checkForMatch() {
	if (cardsInPlay[0] === cardsInPlay[1]) {
		document.getElementById('message').textContent = "You found a match!";
		gamesWon++;
	}
	else
		document.getElementById('message').textContent = "Sorry, try again.";
	
	gamesPlayed++;
	
	// Update score
	document.getElementById('gamesPlayed').textContent = "Games Played: " + 
    	gamesPlayed;
	
	document.getElementById('gamesWon').textContent = "Games Won: " + gamesWon;
		
}

function flipCard() {
	
	if (playAgain === false) return;
	
	let cardId = this.getAttribute('data-id');
	
	// Make sure we aren't cheating by flipping the same card!
	if (tempCardId === cardId) 
		return;
	else
		tempCardId = cardId;
		
	cardsInPlay.push(cards[cardId].rank);
	
	this.setAttribute('src', cards[cardId].cardImage);
	
	if (cardsInPlay.length === 2) {
		playAgain = false;
		checkForMatch();
	}
	
}

function createBoard() {
		
	// Shuffle the cards array
	shuffle(cards);
	
	document.getElementById('message').innerHTML = "&nbsp;";
	
	// Clear the board
	const myNode = document.getElementById('game-board');
	while (myNode.firstChild)
		myNode.removeChild(myNode.firstChild);
	
	// Create a new board
	for(let i = 0; i < cards.length; i++) {
		
		let cardElement = document.createElement('img');
		cardElement.setAttribute('src', "images/back.png");
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	}
}

function resetBoard() {
	// Create a new board
	cardsInPlay = [];
	createBoard();
	playAgain = true;
	tempCardId = "";
}


// From https://javascript.info/task/shuffle
function shuffle(array) {
	  for (let i = array.length - 1; i > 0; i--) {
	    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

	    // swap elements array[i] and array[j]
	    // we use "destructuring assignment" syntax to achieve that
	    // same can be written as:
	    // let t = array[i]; array[i] = array[j]; array[j] = t
	    [array[i], array[j]] = [array[j], array[i]];
	  }
	}

createBoard();