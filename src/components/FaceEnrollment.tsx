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
const FaceEnrollment = ({ studentId }: { studentId: string }) => {
  const webcamRef = useRef<Webcam>(null);
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const [updateStudentById] = useUpdateStudentByIdMutation();
  const [isCamOpen, setIsCamOpen] = useState(false);
  // const [descriptors, setDescriptors] = useState([]);

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

  const handleEnroll = useCallback(async () => {
    if (!webcamRef.current) {
      Swal.fire({ icon: "error", title: "Webcam current not found." });
      return;
    }
    const imageSrc = webcamRef.current.getScreenshot({
      width: 1920,
      height: 1080,
    });
    if (!imageSrc) {
      Swal.fire({ icon: "error", title: "Image src not found." });
      return;
    }
    const img = new Image();
    img.src = imageSrc;
    img.onload = async () => {
      const detections = await faceapi
        .detectSingleFace(img, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detections) {
        Swal.fire({ icon: "success", title: "Detections is there." });
        updateStudentById({
          _id: studentId,
          descriptions: [Array.from(detections.descriptor)],
        })
          .unwrap()
          .then((data) => {
            console.log(data);
            if (data.success) {
              Swal.fire({
                icon: "success",
                title: "Face enrolled successfully.",
              }).then(() => {
                setIsCamOpen(false);
              });
            }
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "No face detected.",
        });
      }
    };
  }, [webcamRef, updateStudentById, studentId]);
  return (
    <div>
      <Webcam
        audio={false}
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
          setIsCamOpen(!isCamOpen);
          handleEnroll();
        }}
        className="btn btn-primary"
        disabled={!isWebcamReady}
      >
        {isWebcamReady ? "Enroll Student." : "Waiting for web cam."}
      </button>
    </div>
  );
};

export default FaceEnrollment;
