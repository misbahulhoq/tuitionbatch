"use client";
import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { useGetStudentsQuery } from "@/redux/features/students/studentsApiSlice";
import Swal from "sweetalert2";
import Speech from "react-text-to-speech";
import toast from "react-hot-toast";
const FaceMatcher = () => {
  const webcamRef = useRef<Webcam>(null);
  const [identifiedStudent, setIdentifiedStudent] = useState("Initializing...");
  const [isReady, setIsReady] = useState(false);
  const { data: students } = useGetStudentsQuery();

  useEffect(() => {
    // const recognition = new ()
    const setupFaceMatcher = async () => {
      // Load the AI models.
      const MODEL_URL = "/model";
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);
      if (students?.length === 0) {
        setIsReady(true);
        Swal.fire({ icon: "warning", title: "You don't have any students." });
        setIdentifiedStudent("No students enrolled");
        return null;
      }
      const labeledFaceDescriptors = students
        ?.filter((student) => student?.descriptions?.length > 0)
        .map((student) => {
          return new faceapi.LabeledFaceDescriptors(
            student.name,
            student?.descriptions?.map((desc) => new Float32Array(desc)),
          );
        });
      setIsReady(true);
      toast.success("Face matcher is ready.", {
        duration: 2000,
      });
      return new faceapi.FaceMatcher(labeledFaceDescriptors, 0.5);
    };

    const runDetection = async () => {
      const faceMatcher = await setupFaceMatcher();
      if (!faceMatcher) {
        toast.error("No face matcher found.", {
          duration: 2000,
        });
        return;
      }

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
          const { label, distance } = bestMatch;
          const confidence = Math.round((1 - distance) * 100);
          if (label === "unknown") {
            <Speech text={"Person is not matched."} autoPlay={true} />;
            toast.error("Person is not matched." + `${confidence}%`, {
              duration: 2000,
            });
          } else {
            toast.success(`${label}'s face detected.`, {
              duration: 2000,
            });
            <Speech text={label} autoPlay={true} />;
          }
          setIdentifiedStudent(label);
        } else {
          toast.error("No face detected.", {
            duration: 2000,
          });
          setIdentifiedStudent("Unknown.");
        }
      }, 2000);
      return () => clearInterval(interval);
    };

    runDetection();
  }, [students]);
  return (
    <div className="flex flex-col items-center">
      <Webcam
        audio={false}
        ref={webcamRef}
        width={480}
        height={360}
        dir="ltr"
      />
      <h3>Identified: {isReady ? identifiedStudent : "Loading models..."}</h3>
    </div>
  );
};

export default FaceMatcher;
