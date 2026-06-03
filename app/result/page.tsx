"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setResult, clearResult } from "../redux/resultSlice";
import { useRouter } from "next/navigation";

const ResultPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGalleryClick = () => {
    setPreviewImage("");
    dispatch(clearResult());
    setError("");
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      if (typeof reader.result === "string") {
        const base64 = reader.result.split(",")[1];

        setPreviewImage(reader.result);

        setError("");
        setIsLoading(true);

        try {
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
          dispatch(setResult(data.data));
          localStorage.setItem("skinstricAnalysis", JSON.stringify(data.data));
          router.push("/select");
        } catch {
          setError("Upload failed. Please try again.");
        } finally {
          setIsLoading(false);
        }
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
        accept="image/*"
        onChange={handleFileChange}
      ></input>

      <section className="result-page">
        <div className="result-preview">
          <p className="result-preview__label">Preview</p>

          <div className="result-preview__box">
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="result-preview__image"
              />
            )}
          </div>
        </div>

        <div className="page-label">
          <p className="page-label__title">TO START ANALYSIS</p>
        </div>

        <div className="result-options">
          {error && <p className="error">{error}</p>}

          {isLoading ? (
            <div className="loading__wrapper">
              <p className="loading">Preparing your analysis</p>

              <div className="loading__dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          ) : (
            <>
              <div className="result-option result-option--camera">
                <div className="layout-diamond result-option__diamond">
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
                </div>

                <div className="result-option__icon-wrapper">
                  <img
                    src="/icons/camera.svg"
                    alt=""
                    className="result-option__icon"
                  />
                </div>
                <img
                  src="/icons/line.svg"
                  alt=""
                  className="result-option__line"
                />

                <span className="result-option__text result-option__text--camera">
                  ALLOW A.I.
                  <br />
                  TO SCAN YOUR FACE
                </span>
              </div>

              <div className="result-option result-option--gallery">
                <div className="layout-diamond result-option__diamond">
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
                </div>

                <div className="result-option__icon-wrapper">
                  <img
                    src="/icons/gallery.svg"
                    alt=""
                    className="result-option__icon"
                    onClick={handleGalleryClick}
                  />
                </div>
                <img
                  src="/icons/line.svg"
                  alt=""
                  className="result-option__line"
                />

                <span className="result-option__text result-option__text--gallery">
                  ALLOW A.I.
                  <br />
                  ACCESS GALLERY
                </span>
              </div>
            </>
          )}
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
