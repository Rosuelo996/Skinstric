"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const CameraPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        setError("");

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        router.push("/camera/caption");

      } catch (error) {
        setError("Camera access denied. Please allow camera access.");

        setTimeout(() => {
          router.push("/result");
        }, 1500);
      }
    };

    const timer = setTimeout(() => {
      requestCameraPermission();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="camera">
      <div className="camera-loading">
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
            <div className="camera-loading__pulse">
              <img
                src="/icons/camera.svg"
                alt=""
                className="result-option__icon"
              />

              <div className="camera-loading__status">
                <p className="camera-loading__text">SETTING UP CAMERA ...</p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="camera-loading__error">
            <p>{error}</p>
          </div>
        )}

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

export default CameraPage;
