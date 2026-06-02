"use client";
import Link from "next/link";
import { useState } from "react";

const TestingPage = () => {
  const [step, setStep] = useState("name");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    if (step === "name") {
      if (!name.trim()) {
        setError("Please enter your name");
        return;
      }

      setError("");
      setStep("location");
    } else {
      if (!location.trim()) {
        setError("Please enter your location");
        return;
      }

      setError("");
      setIsLoading(true);

      try {
        const response = await fetch(
          "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              location,
            }),
          },
        );

        const data = await response.json();

        setIsSuccess(true);
      } catch (error) {
        setError("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <main className="testing">
      <section className="testing-page">
        <div className="page-label">
          <p className="page-label__title">TO START ANALYSIS</p>
        </div>

        <div className="layout-diamond testing-diamond">
          <img
            src="/icons/diamond-large.svg"
            alt=""
            className="layout-diamond__svg layout-diamond__svg--large"
          />

          <img
            src="/icons/diamond-large.svg"
            alt=""
            className="layout-diamond__svg layout-diamond__svg--medium"
          />

          <img
            src="/icons/diamond-large.svg"
            alt=""
            className="layout-diamond__svg layout-diamond__svg--small"
          />

          <div className="testing-diamond__content">
            {isLoading ? (
              <div className="loading__wrapper">
                <p className="loading">Processing submission</p>

                <div className="loading__dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            ) : isSuccess ? (
              <div className="success">
                <h2 className="success__title">Thank you!</h2>

                <p className="success__text">Proceed for the next step</p>
              </div>
            ) : (
              <>
                <p className="testing-input-label">CLICK TO TYPE</p>
                {error && <p className="error">{error}</p>}
                <input
                  className="testing-diamond__input"
                  type="text"
                  placeholder={
                    step === "name"
                      ? "Introduce Yourself"
                      : "Where are you from?"
                  }
                  value={step === "name" ? name : location}
                  onChange={(e) => {
                    setError("");
                    if (step === "name") {
                      setName(e.target.value);
                    } else {
                      setLocation(e.target.value);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                />
              </>
            )}
          </div>
        </div>

        {isSuccess && (
          <Link href={"/result"}>
            <button className="proceed-button action-button">
              <span>PROCEED</span>
              <img className="action-button__img" src="/icons/diamond-btn-right.svg" alt="" />
            </button>
          </Link>
        )}

        <Link href={"/"}>
          <button className="back-button action-button">
            <img className="action-button__img" src="/icons/diamond-btn-left.svg" alt="" />
            <span>BACK</span>
          </button>
        </Link>
      </section>
    </main>
  );
};

export default TestingPage;
