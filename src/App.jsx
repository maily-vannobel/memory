import { useState } from 'react'
import './App.css'
import React from 'react';
import Mybutton from './components/button';
import GameBoard from './components/gameboard';


function App() {

  return (
    <>
    
      <h1>Jeu Memory</h1>
      <GameBoard />
     

    </>
  );
}

export default App;