import React, { useState, useEffect } from 'react';
import MyButton from './button';
import GameCard from './card'
import './css/gameBoard.css'


function GameBoard() {

  const cardsData = [
    { id: 1, image: './src/assets/images/flower.jpg', isFlipped: false },
    { id: 2, image: './src/assets/images/butterfly.png',isFlipped: false },
    { id: 3, image: './src/assets/images/cloud.png',isFlipped: false },
    { id: 4, image: './src/assets/images/sun.png',isFlipped: false},
    { id: 5, image: './src/assets/images/mushroom.png',isFlipped: false },
    { id: 6, image: './src/assets/images/princess.png',isFlipped: false },
    { id: 7, image: './src/assets/images/flower.jpg',isFlipped: false },
    { id: 8, image: './src/assets/images/butterfly.png',isFlipped: false },
    { id: 9, image: './src/assets/images/cloud.png',isFlipped: false },
    { id: 10, image: './src/assets/images/sun.png',isFlipped: false },
    { id: 11, image: './src/assets/images/mushroom.png',isFlipped: false },
    { id: 12, image: './src/assets/images/princess.png',isFlipped: false },

  ];
// useState ici pour déclarer état local + initialise l'état
 const [cards, setCards] = useState(() => shuffle([...cardsData]));
 const [timer, setTimer] = useState(0);
 const [flippedCards, setFlippedCards] = useState([]);
 const [timerIntervalId, setTimerIntervalId] = useState(null);


 //fonction pour mélanger cartes
  function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

   //fonction pour gérer clics cartes; mets à jour l'état d'une carte qd elle est cliquée
   function handleCardClick(id) {
    const isCardFlipped = cards.find(card => card.id === id).isFlipped;
  
    const newCards = cards.map(card =>
      card.id === id ? {...card, isFlipped: !card.isFlipped} : card
    );
    setCards(newCards);
    if (!newCards.find(card => card.id === id).isFlipped) {
      setFlippedCards(prevFlippedCards => [...prevFlippedCards, id]);
    }
  }
  //gérer clic sur bouton mélange, utilise 'shuffle' pour mélanger +maj
  function handleShuffle() {
    setCards(shuffle([...cardsData]));
  }



  // démarrer le jeu, retourner ttes les cartes
  function flipAllCards() {
    const flippedCards = cards.map(card => ({
      ...card,
      isFlipped: true
    }));


    // MAJ de l'état
    setCards(flippedCards);
  
  }
  function startTimer() {
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
    }
    const newIntervalId = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);
    setTimerIntervalId(newIntervalId);
  }
   // VERIFIER LES PAIRES

 function checkForPair() {
  console.log("Flipped cards:", flippedCards);
  const [card1Id, card2Id] = flippedCards;
  console.log("Card 1 ID:", card1Id);
  console.log("Card 2 ID:", card2Id);
  const card1 = cards.find(card => card.id === card1Id);
  const card2 = cards.find(card => card.id === card2Id);
  console.log("Card 1:", card1);
  console.log("Card 2:", card2);
  if (card1 && card2 && card1.image === card2.image) {
    console.log("Pair found! Keeping cards flipped.");
    // Les cartes correspondent, laissez-les retournées.
    setFlippedCards([]);
  } else {
    console.log("No pair found. Flipping cards back after delay.");
    // Les cartes ne correspondent pas, retournez-les après un court délai.
    setTimeout(() => {
      const newCards = cards.map(card =>
        flippedCards.includes(card.id) ? { ...card, isFlipped: false } : card
      );
      console.log("New cards state:", newCards);
      setCards(newCards);
      setFlippedCards([]); // Videz flippedCards ici, après avoir mis à jour l'état des cartes
    }, 1000); // 1 seconde de délai
  }
}
   useEffect(() => {
     if (flippedCards.length === 2) {
       checkForPair();
     }
   }, [flippedCards]);
 




  function startGame() {
    flipAllCards();
    startTimer();
  }


return (
<>
    <div className="menu-player">
          
            <MyButton text="Mélanger" onClick={handleShuffle} />
            <MyButton text="Lancer le jeu" onClick={startGame} />
            <button className='timer'> Temps : {timer}  </button> 
    </div>

    <div className="game-board">

          {cards.map((card, index) => (
            <GameCard key={index} card={card} onClick={handleCardClick}  />
          ))}

    </div>
</>
  );
}

export default GameBoard;