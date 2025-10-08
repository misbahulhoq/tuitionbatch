"use client";
/**
 * A simple test component for face-api
 * @returns {JSX.Element} A div element with the text "FaceApiTest"
 */

import React, { JSX, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

const FaceApiTest: React.FC = (): JSX.Element | null => {
  const webcamRef = useRef<Webcam>(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading AI Models...");
  const [detectionResult, setDetectionResult] = useState("");

  // This useEffect hook loads all the necessary models when the component mounts.
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models"; // Ensure models are in your public/models folder
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
          faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
        ]);
        setLoadingMessage("Models Loaded. Ready to Test.");
      } catch (error) {
        setLoadingMessage(
          "Error loading models. Check the console for details.",
        );
        console.error("Model loading error:", error);
      }
    };
    loadModels();
  }, []);

  // This function runs when the "Run Test" button is clicked.
  const handleTest = async () => {
    if (!webcamRef.current) {
      setDetectionResult("Error: Webcam not available.");
      return;
    }

    setDetectionResult("Capturing and analyzing...");
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      setDetectionResult("Error: Could not capture image.");
      return;
    }

    const img = new Image();
    img.src = imageSrc;
    img.onload = async () => {
      // This is the core test. We try to detect a single face with all features.
      const detection = await faceapi
        .detectSingleFace(img, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender();

      if (detection) {
        // If a face is found, the test is a success.
        const { age, gender, expressions } = detection;
        const dominantExpression = (
          Object.keys(expressions) as Array<keyof typeof expressions>
        ).reduce((a, b) => (expressions[a] > expressions[b] ? a : b));

        const resultText = `✅ Success! Detected a ${gender} face, around ${Math.round(
          age,
        )} years old, showing a(n) ${dominantExpression} expression.`;
        setDetectionResult(resultText);
      } else {
        // If no face is found, the test fails.
        setDetectionResult("❌ Failure: No face was detected in the image.");
      }
    };
  };
  if (process.env.NODE_ENV === "production") {
    return null;
  } else {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Face-API.js Core Functionality Test</h2>
        <Webcam
          audio={false}
          ref={webcamRef}
          mirrored={true}
          width={480}
          height={360}
          style={{ border: "2px solid black" }}
        />

        {/* The button to trigger the test */}
        <button
          onClick={handleTest}
          disabled={loadingMessage !== "Models Loaded. Ready to Test."}
          style={{ fontSize: "16px", padding: "10px 20px", marginTop: "10px" }}
        >
          Run Test
        </button>

        {/* Area to display status messages */}
        <div style={{ marginTop: "20px", fontSize: "18px", minHeight: "50px" }}>
          <p>
            <strong>Status:</strong> {loadingMessage}
          </p>
          {detectionResult && (
            <p>
              <strong>Test Result:</strong> {detectionResult}
            </p>
          )}
        </div>
      </div>
    );
  }
};

export default FaceApiTest;
