"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import formatAnalysisData from "../utils/formatAnalysisData";
import { Analysis } from "../redux/resultSlice";

const SummaryPage = () => {
  const circleRef = useRef<HTMLDivElement>(null);

  const analysis = useSelector((state: RootState) => state.result.analysis);

  const [savedAnalysis, setSavedAnalysis] = useState<Analysis | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    "race" | "age" | "gender"
  >("race");

   const [actualValues, setActualValues] = useState({
    race: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("skinstricAnalysis");

    if (stored) {
      setSavedAnalysis(JSON.parse(stored));
    }
  }, []);

  const currentAnalysis = analysis || savedAnalysis;

  const categoryData = currentAnalysis?.[selectedCategory];
  const selectedEntries = formatAnalysisData(categoryData);

  const selectedValue = actualValues[selectedCategory];
  
  const mainResult =
  selectedEntries.find(([label]) => label === selectedValue) ||
  selectedEntries[0];

  const [mainLabel, mainScore] = mainResult || [];
  const score = mainScore || 0;

  const raceResults = formatAnalysisData(currentAnalysis?.race);
  const ageResults = formatAnalysisData(currentAnalysis?.age);
  const genderResults = formatAnalysisData(currentAnalysis?.gender);

  const [mainRace] = raceResults[0] || [];
  const [mainAge] = ageResults[0] || [];
  const [mainGender] = genderResults[0] || [];

  const handleReset = () => {
  setActualValues({
    race: "",
    age: "",
    gender: "",
  });
};

 

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
            <button
              onClick={() => setSelectedCategory("race")}
              className={`summary-card ${
                selectedCategory === "race" ? "summary-card--active" : ""
              }`}
            >
              <p className="summary-card__value">{actualValues.race || mainRace}</p>
              <p className="summary-card__label">RACE</p>
            </button>

            <button
              onClick={() => setSelectedCategory("age")}
              className={`summary-card ${
                selectedCategory === "age" ? "summary-card--active" : ""
              }`}
            >
              <p className="summary-card__value">{actualValues.age || mainAge}</p>
              <p className="summary-card__label">AGE</p>
            </button>

            <button
              onClick={() => setSelectedCategory("gender")}
              className={`summary-card ${
                selectedCategory === "gender" ? "summary-card--active" : ""
              }`}
            >
              <p className="summary-card__value">{actualValues.gender || mainGender}</p>
              <p className="summary-card__label">SEX</p>
            </button>
          </div>

          <div className="summary-main">
            <p className="summary-main__title">{mainLabel}</p>

            <div className="summary-score">
              <div ref={circleRef} className="summary-score__circle">
                <p className="summary-score__value">{Math.round(score)}</p>
                <span className="summary-score__symbol">%</span>
              </div>
            </div>
          </div>

          <div className="summary-confidence">
            <div className="summary-confidence__header">
              <p className="summary-confidence__heading">
                {selectedCategory === "gender"
                  ? "SEX"
                  : selectedCategory.toUpperCase()}
              </p>
              <p className="summary-confidence__heading">A.I. CONFIDENCE</p>
            </div>

            <div className="summary-confidence__list">
              {selectedEntries.map(([selectedLabel, selectedScore]) => (
                <button
                  key={selectedLabel}
                  className={`confidence-row ${actualValues[selectedCategory] === selectedLabel ? "confidence-row--active" : ""}`}
                  onClick={() => {
                    setActualValues((prev) => (
                      {
                        ...prev,
                        [selectedCategory] : selectedLabel
                      }
                    ))
                  }}
                >
                  <div className="confidence-row__content">
                    <img
                      src={`${actualValues[selectedCategory] === selectedLabel ? "/icons/diamond-dot-active.svg" : "/icons/diamond-dot.svg"}`}
                      alt=""
                      className="confidence-row__icon"
                    />
                    <p className="confidence-row__label">{selectedLabel}</p>
                  </div>
                  <p className="confidence-row__score">
                    {Math.round(selectedScore)}%
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="summary-footer">
          <Link href={"/select"}>
            <button className="back-button action-button">
              <img
                className="action-button__img"
                src="/icons/diamond-btn-left.svg"
                alt=""
              />
              <span>BACK</span>
            </button>
          </Link>

          <p className="summary-footer__text">
            If A.I. estimate is wrong, select the correct one.
          </p>

          <div className="summary-footer__actions">
            <button className="summary-footer__button" onClick={handleReset}
            >RESET</button>

            <button className="summary-footer__button not-allowed" disabled>CONFIRM</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SummaryPage;
