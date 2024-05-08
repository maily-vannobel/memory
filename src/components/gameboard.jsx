import React, { useState, useEffect } from 'react';
import MyButton from './button';
import GameCard from './card'
import './css/gameBoard.css'


function GameBoard() {
  const cardsData = [
    { id: 1, image: './src/assets/images/flower.jpg', isFlipped: true, isMatched: false },
    { id: 2, image: './src/assets/images/butterfly.png',isFlipped: true, isMatched: false },
    { id: 3, image: './src/assets/images/cloud.png',isFlipped: true, isMatched: false },
    { id: 4, image: './src/assets/images/sun.png',isFlipped: true, isMatched: false},
    { id: 5, image: './src/assets/images/mushroom.png',isFlipped: true, isMatched: false },
    { id: 6, image: './src/assets/images/princess.png',isFlipped: true, isMatched: false },
    { id: 7, image: './src/assets/images/flower.jpg',isFlipped: true, isMatched: false },
    { id: 8, image: './src/assets/images/butterfly.png',isFlipped: true, isMatched: false},
    { id: 9, image: './src/assets/images/cloud.png',isFlipped: true, isMatched: false },
    { id: 10, image: './src/assets/images/sun.png',isFlipped: true, isMatched: false },
    { id: 11, image: './src/assets/images/mushroom.png',isFlipped: true, isMatched: false },
    { id: 12, image: './src/assets/images/princess.png',isFlipped: true, isMatched: false},
  ];

  // useState ici pour déclarer état local + initialise l'état
  const [cards, setCards] = useState(() => shuffle([...cardsData]));
  const [timer, setTimer] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]);
  const [timerIntervalId, setTimerIntervalId] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);  //savoir si jeu commencé
  const [hasWon, setHasWon] = useState(false);

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
  //  function handleCardClick(id) {
  //   const clickedCardIndex = cards.findIndex(card => card.id === id);
  //   const clickedCard = cards[clickedCardIndex];
  //   console.log("carte cliquée:", clickedCard);
  //   if (clickedCard.isMatched) {
  //     return; // Ne rien faire si la carte est déjà appariée
  //   }
  
  //   const newCards = [...cards];
  //   newCards[clickedCardIndex] = {
  //     ...newCards[clickedCardIndex],
  //     isFlipped: !newCards[clickedCardIndex].isFlipped // Basculer l'état isFlipped de la carte
  //   };
  //   setCards(newCards);
  //   if (!clickedCard.isFlipped) {
  //     setFlippedCards(prevFlippedCards => [...prevFlippedCards, id]);
  //   }
  
  //   console.log ("Nouvel état des cartes:", newCards);
  // }

  function handleCardClick(id) {
    const clickedCardIndex = cards.findIndex(card => card.id === id);
    const clickedCard = cards[clickedCardIndex];
    
    console.log("carte cliquée:", clickedCard);
    // Ne rien faire si la carte est déjà appariée ou si elle est déjà retournée
    if (clickedCard.isMatched) {
        return;
    }

    // Mettre à jour l'état de la carte en la retournant
    const newCards = [...cards];
    newCards[clickedCardIndex] = {
        ...newCards[clickedCardIndex],
        isFlipped: !newCards[clickedCardIndex].isFlipped // Retourner la carte
    };

    setCards(newCards);
    if (!clickedCard.isFlipped) {
      setFlippedCards(prevFlippedCards => [...prevFlippedCards, id]);
    }

    console.log("Nouvel état des cartes:", newCards);
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
    // Vérifie que deux cartes sont retournées
    if (flippedCards.length !== 2) {
        return;
    }

    // Récupère les indices des deux cartes retournées
    const [card1Id, card2Id] = flippedCards;
    const card1Index = cards.findIndex(card => card.id === card1Id);
    const card2Index = cards.findIndex(card => card.id === card2Id);
    const card1 = cards[card1Index];
    const card2 = cards[card2Index];
    
    // SI IMG IDENTIQUES -> APPAREILLÉES
    if (card1.image === card2.image) {
        const newCards = [...cards];
        newCards[card1Index].isMatched = true;
        newCards[card2Index].isMatched = true;
        newCards[card1Index].isFlipped = true;
        newCards[card2Index].isFlipped = true;
        setCards(newCards);
        setFlippedCards([]); // Réinitialise immédiatement
        checkWin();

      } else {
        // sinon: img retournées
        setTimeout(() => {
            const newCards = cards.map(card =>
                flippedCards.includes(card.id) ? { ...card, isFlipped: false } : card
            );
            setCards(newCards);
            setFlippedCards([]); // Réinitialise après le délai
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
      setGameStarted(true);
      startTimer();
      const newCards = cards.map(card => ({ ...card, isFlipped: false, isMatched: false }));
      setCards(newCards);
      setFlippedCards([]);
    }
  } 
  function checkWin() {
    const allMatched = cards.every(card => card.isMatched);
    if (allMatched) {
      setHasWon(true);
    }
  }
  
  return ( 
    <>
      <div className="menu-player">
        <MyButton text="Lancer le jeu" onClick={startGame} />
        <button className='timer'> Temps : {timer} secondes </button>
      </div>
      {hasWon && <div className="victory-message">Félicitations! Vous avez gagné!</div>} {/* Message de victoire */}
      <div className="game-board">
        {cards.map((card, index) => (
          <GameCard key={index} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </>
  );  
}
  
export default GameBoard;