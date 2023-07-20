import React from 'react'
import "./styles.css"

const Button = ({text, onClick, disabled, width}) => {
  return (<button className='custom-btn' onClick={onClick} disabled={disabled} style={{width: width}}>{text}</button>)
}

export default Button