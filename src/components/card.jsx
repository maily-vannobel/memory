import React from 'react';
import './css/card.css'



function GameCard({ card, onClick }) {
  return (
    <div className='card' onClick={() => onClick(card.id)}>
      <div className={`card-inner ${card.isFlipped ? '' : 'is-flipped'}`}>
        <div className="card-front">
          <img src={card.image} alt={`Card ${card.id}`} />
        </div>
        <div className="card-back">
          {/* Mettez ici l'image ou la couleur du dos de la carte */}
        </div>
      </div>
    </div>
  );
}

export default GameCard;
