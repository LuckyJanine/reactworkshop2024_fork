import React, { useState } from 'react'
import CardFront from './CardFront'
import CardBack from './CardBack'
import './Card.css'

export default function Card({recipe}) {
  // the repice prop sent from App.js is recived and deconstructed for easy use in component

  // hit F12, or right click page and select "inspect" to open developer tools in the broswer. Select "console" and look at the recipe object
  console.log(recipe) // prints to the console

  // TODO
  // * complete the src-atribute on the img-tag to show the recipe picture
  // * complete the href-attribute #top on the link a-tag to the proper recipe url
  // * update the card with information you'd find interesting about the recipe
  // * update the card styling

  // const [modal, setModal] = useState(false);

  // const toggleIngredientsModal = () => {
  //   setModal(!modal)
  // }

  const [back, setBack] = useState(false);
  const flipCard = () => {
    setBack(!back)
  }
  
  return (
    <div className='card'>
      {
        !back && (
          <CardFront recipe={recipe} flipCard={flipCard}/>
        )
      }
      {
        back && (
          <CardBack ingredients={recipe.ingredients}  flipCard={flipCard} back={back}/>
        )
      }
    </div>
  )
}
