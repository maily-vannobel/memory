import React from 'react';
import './css/title.css';

function Title(props) {
  return (
    <>
      <h1 >{props.text}</h1>
      <h2>{props.subtext}</h2>
    </>
  );
}

export default Title;