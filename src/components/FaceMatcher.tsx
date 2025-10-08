"use client";
import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { useGetStudentsQuery } from "@/redux/features/students/studentsApiSlice";
import Swal from "sweetalert2";

const FaceMatcher = () => {
  const webcamRef = useRef<Webcam>(null);
  const [identifiedStudent, setIdentifiedStudent] = useState("Initializing...");
  const [isReady, setIsReady] = useState(false);
  const { data: students } = useGetStudentsQuery();

  useEffect(() => {
    const setupFaceMatcher = async () => {
      // Load the AI models.
      const MODEL_URL = "/model";
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);
      if (students?.length) {
        setIsReady(true);
        Swal.fire({ icon: "warning", title: "You don't have any students." });
        setIdentifiedStudent("No students enrolled");
        return null;
      }
      const labeledFaceDescriptors = students?.map((student) => {
        return new faceapi.LabeledFaceDescriptors(
          student.name,
          student?.descriptions?.map((desc) => new Float32Array(desc)),
        );
      });
      setIsReady(true);

      return new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
    };

    const runDetection = async () => {
      const faceMatcher = await setupFaceMatcher();
      if (!faceMatcher) return;

      const interval = setInterval(async () => {
        const detection = await faceapi
          .detectSingleFace(
            // eslint-disable-next-line
            //@ts-ignore
            webcamRef?.current?.video,
            new faceapi.SsdMobilenetv1Options(),
          )
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (detection) {
          const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
          setIdentifiedStudent(bestMatch.toString());
        } else {
          setIdentifiedStudent("Unknown.");
        }
      }, 2000);
      return () => clearInterval(interval);
    };

    runDetection();
  }, [students]);
  return (
    <div>
      <Webcam audio={true} ref={webcamRef} width={480} height={360} />
      <h3>Identified: {isReady ? identifiedStudent : "Loading models..."}</h3>
    </div>
  );
};

export default FaceMatcher;
