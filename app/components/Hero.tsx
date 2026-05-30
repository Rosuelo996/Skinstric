"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";

const Hero = () => {
  const heroRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);
  const leftActionRef = useRef(null);
  const leftDiamondRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const [isRightHovered, setIsRightHovered] = useState(false);

  useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline();

    tl.from([line1Ref.current, line2Ref.current], {
      opacity: 0,
      duration: 0.8,
      delay: 0.8,
      ease: "power1.inOut",
      stagger: 0.15,
    })
      .from(descriptionRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power1.out",
      })
      .from(ctaRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power1.out",
      });
  });

  return () => {
    ctx.revert();
  };
}, []);

  const animationSettings = {
    duration: 0.4,
    ease: "none",
  };

  return (
    <section className="hero-wrapper">
      <section ref={heroRef} className="hero">
        <h1 className="hero__title">
          <span ref={line1Ref} className="line1">
            Sophisticated
          </span>
          <br />
          <span ref={line2Ref} className="line2">
            skincare
          </span>
        </h1>
      </section>

      <div ref={leftDiamondRef} className="large-diamond large-diamond--left">
        <img
          src="/icons/diamond-large.svg"
          alt=""
          className="large-diamond__svg"
        />
      </div>

      <div className="large-diamond large-diamond--right">
        <img
          src="/icons/diamond-large.svg"
          alt=""
          className="large-diamond__svg"
        />
      </div>

      <div
        className={`large-diamond large-diamond--right large-diamond--ring1 ${isRightHovered ? "large-diamond--ring-active" : ""}`}
      >
        <img
          src="/icons/diamond-large.svg"
          alt=""
          className="large-diamond__svg"
        />
      </div>
      <div
        className={`large-diamond large-diamond--right large-diamond--ring2 ${isRightHovered ? "large-diamond--ring-active" : ""}`}
      >
        <img
          src="/icons/diamond-large.svg"
          alt=""
          className="large-diamond__svg"
        />
      </div>
      <div
        className={`large-diamond large-diamond--right large-diamond--ring3 ${isRightHovered ? "large-diamond--ring-active" : ""}`}
      >
        <img
          src="/icons/diamond-large.svg"
          alt=""
          className="large-diamond__svg"
        />
      </div>

      <section ref={descriptionRef} className="hero-description">
        <p>
          Skinstric developed an A.I. that creates a highly-personalised routine
          tailored to what your skin needs.
        </p>

        <section ref={ctaRef} className="hero-cta">
          <Link href={"/testing"}>
            <button className="hero-cta__btn">
              <span>ENTER EXPERIENCE</span>
              <img src="/icons/diamond-btn-cta.svg" alt="" />
            </button>
          </Link>
        </section>
      </section>

      <section className="hero-actions">
        <div ref={leftActionRef} className="hero-actions__left">
          <button className="diamond-button diamond-button__left">
            <img src="/icons/diamond-btn-left.svg" alt="" />
            <span>Discover A.I.</span>
          </button>
        </div>

        <div
          className="hero-actions__right"
          onMouseEnter={() => {
            setIsRightHovered(true);
            gsap.to(heroRef.current, {
              x: -300,
              ...animationSettings,
            });

            gsap.to(line1Ref.current, {
              x: -40,
              ...animationSettings,
            });

            gsap.to(line2Ref.current, {
              x: -120,
              ...animationSettings,
            });

            gsap.to(leftActionRef.current, {
              opacity: 0,
              duration: 0.6,
              ease: "power2.out",
            });

            gsap.to(leftDiamondRef.current, {
              opacity: 0,
              duration: 0.6,
              ease: "power2.out",
            });
          }}
          onMouseLeave={() => {
            setIsRightHovered(false);
            gsap.to(heroRef.current, {
              x: 0,
              ...animationSettings,
            });

            gsap.to(line1Ref.current, {
              x: 0,
              ...animationSettings,
            });

            gsap.to(line2Ref.current, {
              x: 0,
              ...animationSettings,
            });

            gsap.to(leftActionRef.current, {
              opacity: 1,
              duration: 0.9,
              ease: "power2.out",
            });

            gsap.to(leftDiamondRef.current, {
              opacity: 1,
              duration: 0.9,
              ease: "power2.out",
            });
          }}
        >
          <Link href={"/testing"}>
            <button className="diamond-button">
              <span>Take Test</span>
              <div className="diamond-icon">
                <img src="/icons/diamond-btn-right.svg" alt="" />
              </div>
            </button>
          </Link>
        </div>
      </section>
    </section>
  );
};

export default Hero;
