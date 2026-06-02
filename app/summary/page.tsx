"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

const SummaryPage = () => {
  const circleRef = useRef<HTMLDivElement>(null);
  const score = 96;

  useEffect(() => {
    if (!circleRef.current) return;

    gsap.fromTo(
      circleRef.current,
      { "--score": 0 },
      {
        "--score": score,
        duration: 1.2,
        ease: "power2.out",
      },
    );
  }, [score]);

  return (
    <main className="summary">
      <section className="summary-page">
        <div className="page-label">
          <p className="page-label__title">A.I ANALYSIS</p>
          <h1 className="page-label__section-title">DEMOGRAPHICS</h1>
          <p className="page-label__para">PREDICTED RACE AND AGE</p>
        </div>

        <div className="summary-content">
          <div className="summary-sidebar">
            <button className="summary-card summary-card--active">
              <p className="summary-card__value">EAST ASIAN</p>
              <p className="summary-card__label">RACE</p>
            </button>

            <button className="summary-card">
              <p className="summary-card__value">20-29</p>
              <p className="summary-card__label">AGE</p>
            </button>

            <button className="summary-card">
              <p className="summary-card__value">FEMALE</p>
              <p className="summary-card__label">SEX</p>
            </button>
          </div>

          <div className="summary-main">
            <p className="summary-main__title">East asian</p>

            <div className="summary-score">
              <div ref={circleRef} className="summary-score__circle">
                <p className="summary-score__value">96</p>
                <span className="summary-score__symbol">%</span>
              </div>
            </div>
          </div>

          <div className="summary-confidence">
            <div className="summary-confidence__header">
              <p className="summary-confidence__heading">RACE</p>
              <p className="summary-confidence__heading">A.I. CONFIDENCE</p>
            </div>

            <div className="summary-confidence__list">
              <div className="confidence-row confidence-row--active">
                <div className="confidence-row__content">
                  <img
                    src="/icons/diamond-dot-active.svg"
                    alt=""
                    className="confidence-row__icon"
                  />
                  <p className="confidence-row__label">East Asian</p>
                </div>
                <p className="confidence-row__score">96%</p>
              </div>

              <div className="confidence-row">
                <div className="confidence-row__content">
                  <img
                    src="/icons/diamond-dot.svg"
                    alt=""
                    className="confidence-row__icon"
                  />
                  <p className="confidence-row__label">White</p>
                </div>
                <p className="confidence-row__score">6%</p>
              </div>

              <div className="confidence-row">
                <div className="confidence-row__content">
                  <img
                    src="/icons/diamond-dot.svg"
                    alt=""
                    className="confidence-row__icon"
                  />
                  <p className="confidence-row__label">Black</p>
                </div>
                <p className="confidence-row__score">3%</p>
              </div>

              <div className="confidence-row">
                <div className="confidence-row__content">
                  <img
                    src="/icons/diamond-dot.svg"
                    alt=""
                    className="confidence-row__icon"
                  />
                  <p className="confidence-row__label">South Asian</p>
                </div>
                <p className="confidence-row__score">2%</p>
              </div>

              <div className="confidence-row">
                <div className="confidence-row__content">
                  <img
                    src="/icons/diamond-dot.svg"
                    alt=""
                    className="confidence-row__icon"
                  />
                  <p className="confidence-row__label">Latino Hispanic</p>
                </div>
                <p className="confidence-row__score">0%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="summary-footer">
          <Link href={"/select"}>
            <button className="back-button action-button">
              <img className="action-button__img" src="/icons/diamond-btn-left.svg" alt="" />
              <span>BACK</span>
            </button>
          </Link>

          <p className="summary-footer__text">
            If A.I. estimate is wrong, select the correct one.
          </p>

          <div className="summary-footer__actions">
            <button className="summary-footer__button">RESET</button>

            <button className="summary-footer__button">
              CONFIRM
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SummaryPage;
