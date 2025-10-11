// @ts-nocheck
/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { useGetStudentsQuery } from "@/redux/features/students/studentsApiSlice";

function MatcherDiagnostics() {
  const webcamRef = useRef<Webcam>(null);
  const [status, setStatus] = useState("Loading Models...");
  const [dbMatcher, setDbMatcher] = useState<faceapi.FaceMatcher | null>(null);
  const [liveMatcher, setLiveMatcher] = useState<faceapi.FaceMatcher | null>(
    null,
  );
  const [results, setResults] = useState({
    dbResult: "N/A",
    liveResult: "N/A",
  });
  const { data: students } = useGetStudentsQuery();

  // 1. Load models and the data from your database
  useEffect(() => {
    const setup = async () => {
      const MODEL_URL = "/models";
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);
      setStatus("Models Loaded. Fetching DB data...");

      if (students?.length > 0) {
        const labeledFaceDescriptors = students?.map(
          (student: any) =>
            new faceapi.LabeledFaceDescriptors(
              student.name,
              student.descriptions.map(
                (desc: number[]) => new Float32Array(desc),
              ),
            ),
        );
        setDbMatcher(new faceapi.FaceMatcher(labeledFaceDescriptors, 0.5));
        setStatus("Ready! DB Matcher is active.");
      } else {
        setStatus("Ready! No data in DB.");
      }
    };
    setup();
  }, []);

  // 2. The Live Detection Loop
  useEffect(() => {
    const interval = setInterval(async () => {
      if (webcamRef.current) {
        const detection = await faceapi
          .detectSingleFace(
            webcamRef.current.video,
            new faceapi.SsdMobilenetv1Options(),
          )
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (detection) {
          let dbResultText = "N/A";
          let liveResultText = 'N/A (Click "Enroll Live" to test)';

          // Test against the database matcher
          if (dbMatcher) {
            const bestMatch = dbMatcher.findBestMatch(detection.descriptor);
            const confidence = Math.round((1 - bestMatch.distance) * 100);
            dbResultText = `${bestMatch.label} (${confidence}%)`;
          }

          // Test against the live matcher
          if (liveMatcher) {
            const bestMatch = liveMatcher.findBestMatch(detection.descriptor);
            const confidence = Math.round((1 - bestMatch.distance) * 100);
            liveResultText = `${bestMatch.label} (${confidence}%)`;
          }
          setResults({ dbResult: dbResultText, liveResult: liveResultText });
        }
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [dbMatcher, liveMatcher]);

  // 3. Function to enroll your face LIVE
  const handleLiveEnroll = async () => {
    if (webcamRef.current) {
      setStatus("Capturing live face...");
      const detection = await faceapi
        .detectSingleFace(
          webcamRef?.current?.video,
          new faceapi.SsdMobilenetv1Options(),
        )
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detection) {
        const descriptor = new faceapi.LabeledFaceDescriptors(
          "live_enrollment",
          [detection.descriptor],
        );
        setLiveMatcher(new faceapi.FaceMatcher(descriptor, 0.5));
        setStatus("Live enrollment complete! Matching...");
      } else {
        setStatus("Failed to capture live face.");
      }
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Matcher Diagnostics Tool</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        mirrored={true}
        width={480}
        height={360}
      />
      <br />
      <button
        onClick={handleLiveEnroll}
        style={{ fontSize: "16px", padding: "10px" }}
      >
        Enroll My Face LIVE
      </button>
      <div style={{ marginTop: "20px", fontSize: "20px" }}>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Database Match Result:</strong>{" "}
          <span style={{ color: "red" }}>{results.dbResult}</span>
        </p>
        <p>
          <strong>Live Match Result:</strong>{" "}
          <span style={{ color: "green" }}>{results.liveResult}</span>
        </p>
      </div>
    </div>
  );
}

export default MatcherDiagnostics;
