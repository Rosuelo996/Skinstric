"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setResult } from "../../redux/resultSlice";
import { useRouter } from "next/navigation";

const CaptionPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState("");

  useEffect(() => {
    const startCamera = async () => {
      try {
        if (!videoRef.current) {
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        videoRef.current.srcObject = stream;
      } catch {}
    };
    startCamera();
  }, []);

  const handleTakePicture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    context.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");

    setError("")
    setCapturedImage(image);
  };

  const handleUsePicture = async () => {
    if (!capturedImage) {
      return;
    }

    const base64 = capturedImage.split(",")[1];

    try {
      setError("");
      setIsLoading(true);

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

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      dispatch(setResult(data.data));

      localStorage.setItem("skinstricAnalysis", JSON.stringify(data.data));

      router.push("/select");
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="caption">
      <div className="caption-page">
        <video
          ref={videoRef}
          className="camera-caption__video"
          autoPlay
          playsInline
        />

        <canvas ref={canvasRef} className="hidden" />

        {!capturedImage && (
          <button className="caption-take-picture" onClick={handleTakePicture}>
            <span>TAKE PICTURE</span>
            <img src="/icons/selfie.svg" alt="" />
          </button>
        )}

        {capturedImage && (
          <div className="caption-preview">
            <img
              src={capturedImage}
              alt=""
              className="caption-preview__image"
            />

            {error && <p className="caption-error">{error}</p>}

            {isLoading ? (
              <div className="caption-loading">
                <div className="caption-loading__panel">
                  <p>ANALYSING YOUR IMAGE</p>

                  <div className="caption-preview__dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="caption-preview__panel">
                <div className="caption-preview__title">PREVIEW</div>

                <div className="caption-preview__actions">
                  <button
                    onClick={() => {
                      setCapturedImage("");
                      setError("");
                    }}
                  >
                    RETAKE
                  </button>

                  <button onClick={handleUsePicture}>USE THIS PICTURE</button>
                </div>
              </div>
            )}
          </div>
        )}

        <Link href={"/result"}>
            <button className="back-button action-button">
              <img
                className="action-button__img"
                src="/icons/diamond-btn-left.svg"
                alt=""
              />
              <span>BACK</span>
            </button>
          </Link>

        <div className="camera-footer">
          <p className="camera-footer__title">
            TO GET BETTER RESULTS MAKE SURE TO HAVE
          </p>

          <div className="camera-footer__tips">
            <div className="camera-tip">
              <img
                src="/icons/diamond-dot.svg"
                alt=""
                className="camera-tip__icon"
              />
              <span>NEUTRAL EXPRESSION</span>
            </div>

            <div className="camera-tip">
              <img
                src="/icons/diamond-dot.svg"
                alt=""
                className="camera-tip__icon"
              />
              <span>FRONTAL POSE</span>
            </div>

            <div className="camera-tip">
              <img
                src="/icons/diamond-dot.svg"
                alt=""
                className="camera-tip__icon"
              />
              <span>ADEQUATE LIGHTING</span>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default CaptionPage;
