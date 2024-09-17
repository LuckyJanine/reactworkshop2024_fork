import React, { useState } from 'react'
import Ingredients from './Ingredients'
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

  const [modal, setModal] = useState(false);

  const toggleIngredientsModal = () => {
    setModal(!modal)
  }
  
  return (
    <div className='recipe-card'>
      <div className='car-img'>
        <img src={recipe.image} alt={recipe.label} />
      </div>
      <div className='card-lbl'>
        <h3>{recipe.label}</h3>
      </div>
      <div>
        <a href={recipe.url} target='_blank' className='button recipe-btn'>To recipe</a>
        <button className='button ingredients-btn' onClick={toggleIngredientsModal}>Ingredients</button>
        {
          modal && (
            <Ingredients ingredients={recipe.ingredients} toggleModal={toggleIngredientsModal}/>
          )
        }
      </div>
      </div>
  )
}
