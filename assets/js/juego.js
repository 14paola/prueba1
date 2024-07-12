/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck       = [];
const types    = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

let pointsPlayer = 0,
    pointsComputer = 0;

//References HTML
const btnAsk    = document.querySelector('#btnAsk');
const btnArrest = document.querySelector('#btnArrest');
const btnNew    = document.querySelector('#btnNew');


const divLettersPlayer   = document.querySelector('#player-letters');
const divLettersComputer = document.querySelector('#computer-letters'); 
const pointsHTML = document.querySelectorAll('small');


// create new deck
const createDeck = () => {

    for( let i = 2; i<= 10; i++) {
        for(let type of types){
            deck.push(i + type);
        }
    }
    for(let type of types){
        for(let special of specials){
            deck.push(special + type);
        }
    }
    
    // console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;

}

createDeck();

// function that allows you to take a card
const askforLetter = () => {

    if (deck.length === 0){
        throw 'there are no cards in the deck';
    }

    const letter = deck.pop();
    return letter;
}

// for (let i = 0; i<= 100; i++){
//     askforLetter();
// }
// deck = [];

const letterValue = (letter) => {

    const value = letter.substring(0,letter.length-1);
    return (isNaN(value))  ? 
           (value === 'A') ? 11 : 10
            : value * 1;
}

// turn computer
const computerShift = (minimunPoints) => {

    do{
    const letter = askforLetter();
    pointsComputer = pointsComputer + letterValue(letter);
    pointsHTML[1].innerText = pointsComputer;

    // <img class="letter" src="assets/cartas/10C.png"></img>
    const imgLetter = document.createElement('img');
    imgLetter.src   = `assets/cartas/${ letter }.png`; 
    imgLetter.classList.add('letter');
    divLettersComputer.append(imgLetter);

    if (minimunPoints > 21){
        break;
    }

    }while( (pointsComputer < minimunPoints) && (minimunPoints <= 21));

    setTimeout(() => {
    if(pointsComputer === minimunPoints){
        alert('Nobody wins :(');
    }else if (minimunPoints > 21){
        alert('Computer wins :)');
    }else if (pointsComputer > 21){
        alert('Player wins :)');
    }else{
        alert('Computer wins :)');
    }
}, 10);




}









//Events
btnAsk.addEventListener('click', () => {

    const letter = askforLetter();
    pointsPlayer = pointsPlayer + letterValue(letter);
    pointsHTML[0].innerText = pointsPlayer;

    // <img class="letter" src="assets/cartas/10C.png"></img>
    const imgLetter = document.createElement('img');
    imgLetter.src   = `assets/cartas/${ letter }.png`; 
    imgLetter.classList.add('letter');
    divLettersPlayer.append(imgLetter);

    if (pointsPlayer > 21){
        console.warn('I am so sorry you lost');
        btnAsk.disabled    = true;
        btnArrest.disabled = true;
        computerShift(pointsPlayer);

    }else if (pointsPlayer === 21) {
        console.warn('21, Win!');
        btnAsk.disabled    = true;
        btnArrest.disabled = true;
        computerShift(pointsPlayer);
    }

});

btnArrest.addEventListener('click', () =>{
    btnAsk.disabled    = true;
    btnArrest.disabled = true;

    computerShift(pointsPlayer); 
});

btnNew.addEventListener('click', () =>{
    
    console.clear();
    deck = [];
    deck = createDeck();
    
    pointsPlayer   = 0;
    pointsComputer = 0;
    
    pointsHTML[0].innerText = 0;
    pointsHTML[1].innerText = 0;

    divLettersComputer.innerHTML = '';
    divLettersPlayer.innerHTML = '';

    btnAsk.disabled    = false;
    btnArrest.disabled = false;

});




// TODO: Delete
