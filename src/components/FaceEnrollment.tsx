"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import { useUpdateStudentByIdMutation } from "@/redux/features/students/studentsApiSlice";
import Swal from "sweetalert2";
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

// Define the directions for the user
const DIRECTIONS = [
  "Please Look Straight at the Camera",
  "Please Look Slightly to Your Left",
  "Please Look Slightly to Your Right",
];

const FaceEnrollment = ({ studentId }: { studentId: string }) => {
  const webcamRef = useRef<Webcam>(null);
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const [updateStudentById] = useUpdateStudentByIdMutation();
  const [isCamOpen, setIsCamOpen] = useState(false);
  const [captureStep, setCaptureStep] = useState(0); // Tracks the current step
  const [descriptors, setDescriptors] = useState<Float32Array[]>([]); // Stores captured descriptors
  const [isCapturing, setIsCapturing] = useState(false); // Disables button during processing

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/model";
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);
      console.log("Models loaded");
    };
    loadModels();
  }, []);

  const saveEnrollMent = useCallback(
    (finalDescriptors: Float32Array[]) => {
      const descriptorsAsArray = finalDescriptors.map((d) => Array.from(d));
      updateStudentById({ _id: studentId, descriptions: descriptorsAsArray })
        .unwrap()
        .then((data) => {
          if (data.success) {
            Swal.fire({
              icon: "success",
              title: "Face enrolled successfully.",
            }).then(() => {
              setIsCamOpen(false);
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Enrollment failed",
            text: err.message,
          });
        });
    },
    [studentId, updateStudentById],
  );

  const handleCapture = useCallback(async () => {
    if (!webcamRef.current) {
      Swal.fire({
        icon: "error",
        title: "Webcam not found.",
      });
      return;
    }

    setIsCapturing(true);

    const imageSrc = webcamRef.current.getScreenshot({
      width: 1920,
      height: 1080,
    });

    if (!imageSrc) {
      Swal.fire({
        icon: "error",
        title: "Could not capture image",
        text: "Image src not found.",
      });
      return;
    }

    const img = new Image();
    img.src = imageSrc;
    img.onload = async () => {
      const detection = await faceapi
        .detectSingleFace(img, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detection) {
        const newDescriptors = [...descriptors, detection.descriptor];
        setDescriptors(newDescriptors);

        if (newDescriptors.length === DIRECTIONS.length) {
          Swal.fire({ icon: "info", title: "All photos captured. Saving.." });
          saveEnrollMent(newDescriptors);
        } else {
          setCaptureStep((prevStep) => prevStep + 1);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "No face detected. Please try again.",
        });
      }
      setIsCapturing(false);
    };
  }, [webcamRef, descriptors, saveEnrollMent]);

  return (
    <div>
      {/* Display the current direction to the user */}
      {captureStep < DIRECTIONS.length && (
        <h3 style={{ color: "#1976d2" }}>{DIRECTIONS[captureStep]}</h3>
      )}

      {/* Show progress */}
      <p>
        Captured {descriptors.length} of {DIRECTIONS.length} photos.
      </p>
      <Webcam
        audio={false}
        mirrored={true}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={300}
        height={100}
        className={`rounded-full ${isCamOpen ? "block" : "hidden"}`}
        videoConstraints={videoConstraints}
        onUserMedia={() => {
          setIsWebcamReady(true);
        }}
      />

      <button
        onClick={() => {
          setIsCamOpen(true);
          handleCapture();
        }}
        className="btn btn-primary"
        disabled={
          !isWebcamReady || isCapturing || captureStep >= DIRECTIONS.length
        }
      >
        {isCapturing
          ? "Processing..."
          : captureStep >= DIRECTIONS.length
            ? "Enrollment Complete"
            : `Capture Photo ${captureStep + 1}`}
      </button>
    </div>
  );
};

export default FaceEnrollment;
