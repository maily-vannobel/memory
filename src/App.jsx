import { useState } from 'react'
import './App.css'
import React from 'react';
import GameBoard from './components/gameboard';
import Title from './components/title';


function App() {

  return (
    <>
        <Title text="Memory Game"/>
    
      <GameBoard />
    </>
  );
}

export default App;