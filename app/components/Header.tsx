import React from 'react'

const Header = () => {
  return (
    <header className="header">
        <div className="header__left">
          <div className="header__logo">SKINSTRIC</div>

          <div className="header__step">
            <img src="/icons/left-bracket.svg" alt="" />
            <span>INTRO</span>
            <img src="/icons/right-bracket.svg" alt="" />
          </div>
        </div>

        <button className="header__button">ENTER CODE</button>
      </header>
  )
}

export default Header