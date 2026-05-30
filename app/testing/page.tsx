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

        console.log(data);
      } catch (error) {
        setError("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
        setIsSuccess(true);
      }
    }
  };

  return (
    <main className="testing">
      <section className="testing-page">
        <p className="testing-label">TO START ANALYSIS</p>

        <div className="testing-diamond">
          <img
            src="/icons/diamond-large.svg"
            alt=""
            className="testing-diamond__svg testing-diamond__svg--large"
          />

          <img
            src="/icons/diamond-large.svg"
            alt=""
            className="testing-diamond__svg testing-diamond__svg--medium"
          />

          <img
            src="/icons/diamond-large.svg"
            alt=""
            className="testing-diamond__svg testing-diamond__svg--small"
          />

          <div className="testing-diamond__content">
            {isLoading ? (
              <>
                <p className="testing-loading">Processing submission</p>

                <div className="testing-loading__dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </>
            ) : isSuccess ? (
              <>
                <h2 className="testing-success__title">Thank you!</h2>

                <p className="testing-success__text">
                  Proceed for the next step
                </p>
              </>
            ) : (
              <>
                <p>CLICK TO TYPE</p>
                {error && <p className="testing-error">{error}</p>}
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
            <button className="testing-proceed" onClick={handleSubmit}>
              <span>PROCEED</span>
              <img src="/icons/diamond-btn-right.svg" alt="" />
            </button>
          </Link>
        )}

        <Link href={"/"}>
          <button className="testing-back">
            <img src="/icons/diamond-btn-left.svg" alt="" />
            <span>BACK</span>
          </button>
        </Link>
      </section>
    </main>
  );
};

export default TestingPage;
