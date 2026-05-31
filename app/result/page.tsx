"use client";
import Link from "next/link";
import { useRef } from "react";

const ResultPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGalleryClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      if (typeof reader.result === "string") {
        const base64 = reader.result.split(",")[1];
        console.log(base64);
        console.log(base64.length);

        const response = await fetch(
          "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              image: base64,
            }),
          },
        );
        const data = await response.json();
        console.log(data);
      }
    };

    reader.readAsDataURL(file);

    e.target.value = "";
  };

  return (
    <main className="result">
      <input
        className="result-file-input"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
      ></input>

      <section className="result-page">
        <p className="page-label">TO START ANALYSIS</p>

        <div className="result-options">
          <div className="result-option result-option--camera">
            <img
              src="/icons/diamond-large.svg"
              alt=""
              className="result-option__diamond result-option__diamond--large"
            />
            <img
              src="/icons/diamond-large.svg"
              alt=""
              className="result-option__diamond result-option__diamond--medium"
            />
            <img
              src="/icons/diamond-large.svg"
              alt=""
              className="result-option__diamond result-option__diamond--small"
            />

            <div className="result-option__icon-wrapper">
              <img
                src="/icons/camera.svg"
                alt=""
                className="result-option__icon"
              />
            </div>
            <img src="/icons/line.svg" alt="" className="result-option__line" />

            <span className="result-option__text result-option__text--camera">
              ALLOW A.I.
              <br />
              TO SCAN YOUR FACE
            </span>
          </div>

          <div className="result-option result-option--gallery">
            <img
              src="/icons/diamond-large.svg"
              alt=""
              className="result-option__diamond result-option__diamond--large"
            />
            <img
              src="/icons/diamond-large.svg"
              alt=""
              className="result-option__diamond result-option__diamond--medium"
            />
            <img
              src="/icons/diamond-large.svg"
              alt=""
              className="result-option__diamond result-option__diamond--small"
            />

            <div className="result-option__icon-wrapper">
              <img
                src="/icons/gallery.svg"
                alt=""
                className="result-option__icon"
                onClick={handleGalleryClick}
              />
            </div>
            <img src="/icons/line.svg" alt="" className="result-option__line" />

            <span className="result-option__text result-option__text--gallery">
              ALLOW A.I.
              <br />
              ACCESS GALLERY
            </span>
          </div>
        </div>

        <Link href="/testing">
          <button className="action-button back-button">
            <img src="/icons/diamond-btn-left.svg" alt="" />
            <span>BACK</span>
          </button>
        </Link>
      </section>
    </main>
  );
};

export default ResultPage;
