import React from 'react'
import Cards from './Cards'

function Tours(props) {

  return (
    <div className='container'>
      <h2 className='title'>Plan With Prince</h2>

      <div className='cardsContainer'>
        {// map returns an array so we are using its value here
          props.tours.map((tour) => {
            return <Cards key={tour.id} tour={tour} getRemoveId={props.removeTour} /> //maps a card for each tour in tours
          })
        }
      </div>
    </div>
  )
}

export default Tours