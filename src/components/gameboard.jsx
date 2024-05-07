import React, { useState, useEffect } from 'react';
import MyButton from './button';
import GameCard from './card'
import './css/gameBoard.css'


function GameBoard() {

  const cardsData = [
    { id: 1, image: './src/assets/images/flower.jpg', isFlipped: false, isMatched: false },
    { id: 2, image: './src/assets/images/butterfly.png',isFlipped: false, isMatched: false },
    { id: 3, image: './src/assets/images/cloud.png',isFlipped: false, isMatched: false },
    { id: 4, image: './src/assets/images/sun.png',isFlipped: false, isMatched: false},
    { id: 5, image: './src/assets/images/mushroom.png',isFlipped: false, isMatched: false },
    { id: 6, image: './src/assets/images/princess.png',isFlipped: false, isMatched: false },
    { id: 7, image: './src/assets/images/flower.jpg',isFlipped: false, isMatched: false },
    { id: 8, image: './src/assets/images/butterfly.png',isFlipped: false, isMatched: false},
    { id: 9, image: './src/assets/images/cloud.png',isFlipped: false, isMatched: false },
    { id: 10, image: './src/assets/images/sun.png',isFlipped: false, isMatched: false },
    { id: 11, image: './src/assets/images/mushroom.png',isFlipped: false, isMatched: false },
    { id: 12, image: './src/assets/images/princess.png',isFlipped: false, isMatched: false},

  ];
// useState ici pour déclarer état local + initialise l'état
 const [cards, setCards] = useState(() => shuffle([...cardsData]));
 const [timer, setTimer] = useState(0);
 const [flippedCards, setFlippedCards] = useState([]);
 const [timerIntervalId, setTimerIntervalId] = useState(null);
 const [gameStarted, setGameStarted] = useState(false);  //savoir si jeu commencé


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
    console.log("Clicked card id:", id);
    const clickedCard = cards.find(card => card.id === id);
    console.log("Clicked card:", clickedCard);
    if (clickedCard.isFlipped || clickedCard.isMatched) {
      console.log("Card already flipped or matched, returning...");
      return; // Ne rien faire si la carte est déjà retournée ou appariée
    }
    
    const newCards = cards.map(card =>
      card.id === id ? {...card, isFlipped: true} : card
    );
    console.log("New cards state:", newCards);
    setCards(newCards);
    setFlippedCards(prevFlippedCards => [...prevFlippedCards, id]);
  }
      


//gérer clic sur bouton mélange, utilise 'shuffle' pour mélanger +maj
  function handleShuffle() {
    setCards(shuffle([...cardsData]));
  }



  // démarrer le jeu, retourner ttes les cartes
  function flipAllCards() {
    const flippedCards = cards.map(card => ({
      ...card,
      isFlipped: false
    }));
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
    const [card1Id, card2Id] = flippedCards;
    const card1Index = cards.findIndex(card => card.id === card1Id);
    const card2Index = cards.findIndex(card => card.id === card2Id);
    const card1 = cards[card1Index];
    const card2 = cards[card2Index];
      console.log("Card 1:", card1);
    console.log("Card 2:", card2);
    if (card1 && card2 && card1.image === card2.image) {
      const newCards = [...cards];
      newCards[card1Index].isMatched = true;
      newCards[card2Index].isMatched = true;
      setCards(newCards);
      setFlippedCards([]);  } else {
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
      if (!gameStarted) { 
        flipAllCards(); 
        startTimer(); 
        setGameStarted(true); 
      }
    }

    return ( 
      <>
        <div className="menu-player">
          <MyButton text="Lancer le jeu" onClick={startGame} />
          <button className='timer'> Temps : {timer}  </button>
        </div>

        <div className="game-board">
          {cards.map((card, index) => (
            <GameCard key={index} card={card} onClick={handleCardClick} />
          ))}
        </div>
      </>
    );
  
  }
  export default GameBoard;