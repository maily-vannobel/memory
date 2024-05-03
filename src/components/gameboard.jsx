import React, { useState } from 'react';
import MyButton from './button';

function GameBoard() {
  const cardsData = [
    { id: 1, image: './src/assets/images/flower.jpg' },
    { id: 2, image: './src/assets/images/butterfly.jpg' },
    { id: 3, image: './src/assets/images/cloud.png' },
    { id: 4, image: './src/assets/images/flower.jpg' },
    { id: 5, image: './src/assets/images/butterfly.jpg' },
    { id: 6, image: './src/assets/images/cloud.png' }
  ];

  const [shuffledCards, setShuffledCards] = useState(() => shuffle([...cardsData]));

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  function handleShuffle() {
    setShuffledCards(shuffle([...cardsData]));
  }

  const divStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    gap: '20px'
  };

  const carteStyle = {
    width: '15rem',
  };

  return (
    <div style={divStyle}>
      {shuffledCards.map((card, index) => (
        <img style={carteStyle} key={index} src={card.image} alt={`Card ${card.id}`} />
      ))}
      <MyButton text="Mélanger" onClick={handleShuffle} />
    </div>
  );
}

export default GameBoard;
