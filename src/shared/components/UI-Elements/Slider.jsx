import React, { useState } from 'react'
import slider1 from '../../../assets/images/slider1.jpg'
import slider2 from '../../../assets/images/slider2.jpg'
import slider3 from '../../../assets/images/slider3.jpg'

import './Slider.css'

const Slider = () => {
  const [index, setIndex] = useState(0)

  const mod = (n, m) => {
    let result = n % m
    return result >= 0 ? result : result + m
  }

  const cards = [
    {
      id: '1',
      image: slider1
    },
    {
      id: '2',
      image: slider2
    },
    {
      id: '3',
      image: slider3
    },
    {
      id: '5',
      image: slider1
    },
    {
      id: '6',
      image: slider2
    },
    {
      id: '7',
      image: slider3
    }
  ]

  const rightClickHandler = () => {
    setIndex((index + 1) % cards.length)
  }
  const leftClickHandler = () => {
    if ((index - 1) % cards.length < 0) {
      setIndex(cards.length - 1)
    } else {
      setIndex((index - 1) % cards.length)
    }
  }
  return (
    <div className='carousel'>
      <div className='arrow arrow-left' onClick={leftClickHandler}>
        ❰
      </div>
      {cards.map((card, idx) => {
        const indexLeft = mod(index - 1, cards.length)
        const indexRight = mod(index + 1, cards.length)

        let className = 'card'

        if (idx === index) className = 'card card--active'
        else if (idx === indexRight) className = 'card card--right'
        else if (idx === indexLeft) className = 'card card--left'
        else className = 'card'

        return (
          <div
            onClick={() => {
              setIndex(idx)
            }}
            key={card.id}
          >
            <img
              className={className}
              src={card.image}
              alt='Comic'
              style={{ borderRadius: '1rem' }}
            />
          </div>
        )
      })}
      <div className='arrow arrow-right' onClick={rightClickHandler}>
        ❱
      </div>
    </div>
  )
}

export default Slider
