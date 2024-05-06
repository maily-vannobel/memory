import React, { useState } from 'react';
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
// useState ici pour déclarer état local des cartes + initialise l'état
 const [cards, setCards] = useState(() => shuffle([...cardsData]));

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
    const newCards = cards.map(card =>
      card.id === id ? {...card, isFlipped: !card.isFlipped} : card
    );
    setCards(newCards);
  }
//gérer clic sur bouton mélange, utilise 'shuffle' pour mélanger +maj
  function handleShuffle() {
    setCards(shuffle([...cardsData]));
  }

  const divStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'repeat(4, 1fr)',
    gap: '10px'
  };

  const carteStyle = {
    width: '15rem',
  };

  return (
    <div style={divStyle}>
<section>
      
          <MyButton text="Mélanger" onClick={handleShuffle} />
          <MyButton text="Lancer une partie"  /> 
     
</section>
 <section class="board">
      {cards.map((card, index) => (
        <GameCard key={index} card={card} onClick={handleCardClick} style={carteStyle} />
      ))}

</section>
    </div>

  );
}

export default GameBoard;