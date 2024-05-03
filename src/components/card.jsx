import React from 'react';
import './css/card.css'



function GameCard({ image }) {
  return (
    <div className='carte'>
      <img src={image} />
    </div>
    

  );
}

export default GameCard;
