

const Hero = () => {
  return (
    <section className="hero-wrapper">
        <section className="hero">
        <h1>
          Sophisticated
          <br />
          skincare
        </h1>
      </section>

      <div className="large-diamond large-diamond--left"></div>
      <div className="large-diamond large-diamond--right"></div>

      <section className="hero-description">
        <p>
          Skinstric developed an A.I. that creates a highly-personalised routine
          tailored to what your skin needs.
        </p>

        <section className="hero-cta">
          <button className="hero-cta__btn">
            <span>ENTER EXPERIENCE</span>
            <img src="/icons/diamond-btn-cta.svg" alt="" />
          </button>
        </section>
      </section>

      <section className="hero-actions">
        <div className="hero-actions__left">
          <button className="diamond-button">
            <img src="/icons/diamond-btn-left.svg" alt="" />
            <span>Discover A.I.</span>
          </button>
        </div>

        <div className="hero-actions__right">
          <button className="diamond-button">
            <span>Take Test</span>
            <img src="/icons/diamond-btn-right.svg" alt="" />
          </button>
        </div>
      </section>

    </section>
  )
}

export default Hero