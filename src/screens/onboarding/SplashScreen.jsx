import AppHeader from "../../components/AppHeader.jsx";
import KyraLogo from "../../components/KyraLogo.jsx";
import "./SplashScreen.css";
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { useCamera } from "../../context/CameraContext.jsx";
/** Figma: Onboarding / "Splash Screen" (2043:8300) */
export default function SplashScreen() {
    const navigate = useNavigate();
    const { videoRef } = useCamera();
  
  // UI Debug state so you can see what's happening live
  const [waveCount, setWaveCount] = useState(0);
    const [handStatus, setHandStatus] = useState("Looking for hand...");
  const prevXRef = useRef(null);
  const waveCountRef = useRef(0);
  const lastDirRef = useRef(null);

    useEffect(() => {
    let handLandmarker = null;
    let animationFrameId = null;
    let stream = null;

    const setupCameraAndDetector = async () => {
      try {
        //1. Start Web Camera
        // 2. Initialize MediaPipe Tasks-Vision Resolver & HandLandmarker
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        handLandmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 1
        });

        setHandStatus("Camera ready! Show your hand.");
        console.log(handStatus);

        // 3. Frame processing loop
        const predictWebcam = () => {
          if (videoRef.current && handLandmarker && videoRef.current.readyState === 4) {
            let startTimeMs = performance.now();
            const results = handLandmarker.detectForVideo(videoRef.current, startTimeMs);

            if (results.landmarks && results.landmarks.length > 0) {
              setHandStatus("Hand Detected! 👋 Wave left & right");
               console.log(handStatus);
              
              // Landmark index 0 is the wrist coordinates
              const wrist = results.landmarks[0][0];
              const currentX = wrist.x;

              if (prevXRef.current !== null) {
                const deltaX = currentX - prevXRef.current;

                // Detect quick horizontal hand shift (a wave motion)
                if (Math.abs(deltaX) > 0.015) { // Lowered threshold slightly for easier detection
                  const currentDir = deltaX > 0 ? 'right' : 'left';
                  if (lastDirRef.current && lastDirRef.current !== currentDir) {
                    waveCountRef.current += 1;
                    setWaveCount(waveCountRef.current);
                  }
                  lastDirRef.current = currentDir;
                }
              }

              prevXRef.current = currentX;

              // When wave threshold is reached, stop tracks and route to /home
              if (waveCountRef.current >= 1) {
                setHandStatus("Wave detected! Navigating...");
                 console.log(handStatus);
                if (stream) {
                  stream.getTracks().forEach(track => track.stop());
                }
                navigate('/welcome');
                return;
              }
            } else {
              setHandStatus("No hand detected. Hold hand closer to camera.");
            }
          }
          animationFrameId = requestAnimationFrame(predictWebcam);
        };

        predictWebcam();
      } catch (err) {
        console.error("MediaPipe initialization error:", err);
        setHandStatus("Error initializing camera/AI.");
      }
    };

    setupCameraAndDetector();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (handLandmarker) {
        handLandmarker.close();
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [navigate]);
  return (
    <div className="screen splash" >
       {/* <video 
        ref={videoRef} 
        style={{display:'none'}} 
        playsInline 
        muted 
      /> */}
      <AppHeader />
      <div className="splash__content">
        <KyraLogo />
        <p className="splash__prompt">Ready to explore? Just wave!</p>
      </div>
    </div>
  );
}
