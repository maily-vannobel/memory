import React from 'react';


function Mybutton(props) {
  return (
<div>
 <button onClick={props.onClick}> {props.text} </button>
</div> 
)
}

export default Mybutton;
