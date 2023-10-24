import React,{useState} from 'react'

function Cards({tour, getRemoveId}) {

    const [readmore, setReadmore] = useState(false);
    const description = readmore ? tour.info : `${tour.info.substring(0, 200)}....`;

  return (
    <div className='card'>
        <img className='cityImage' alt='' src={tour.image}></img>

        <div className="tourInfo">
          <div className="tourDetails">
              <h4 className="tourPrice">{tour.price}</h4>
              <h4 className="tourCityName">{tour.name}</h4>
          </div>
          <div className="description">
              {description}
              <span className='readMore' onClick={() => { setReadmore(!readmore) }}>
                  {readmore ? " Show Less" : " Read More"}
              </span>
          </div>
        </div>

        <button className='notIntrestedBtn' onClick={() => getRemoveId(tour.id)}>Not Intrested</button>
    </div>
  )
}

export default Cards