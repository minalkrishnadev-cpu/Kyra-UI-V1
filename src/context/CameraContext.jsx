// import React, { createContext, useContext, useEffect, useRef } from 'react';

// const CameraContext = createContext();

// export function CameraProvider({ children }) {
//   const videoRef = useRef(null);
//   const streamRef = useRef(null);

//   useEffect(() => {
//     let currentStream = null;

//     const startCamera = async () => {
//       try {
//         currentStream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
//         streamRef.current = currentStream;
//         if (videoRef.current) {
//           videoRef.current.srcObject = currentStream;
//           await videoRef.current.play();
//         }
//       } catch (err) {
//         console.error("Global camera access failed:", err);
//       }
//     };

//     startCamera();

//     return () => {
//       if (currentStream) {
//         currentStream.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, []);

//   return (
//     <CameraContext.Provider value={{ videoRef, streamRef }}>
//       {/* Hidden global video element that stays alive across route changes */}
//       <video ref={videoRef} style={{ display: "none" }} playsInline muted />
//       {children}
//     </CameraContext.Provider>
//   );
// }

// export const useCamera = () => useContext(CameraContext);

import React, { createContext, useContext, useEffect, useRef } from "react";

const CameraContext = createContext(null);

export function CameraProvider({ children }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
        });
        if (cancelled) {
          // StrictMode runs this effect twice in dev; don't leak the first stream.
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error("Global camera access failed:", err);
      }
    })();

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, []);

  return (
    <CameraContext.Provider value={{ videoRef, streamRef }}>
      {/* Kept off-screen rather than display:none, which can stop frame decoding. */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          position: "fixed",
          left: -9999,
          top: 0,
          width: 640,
          height: 480,
          opacity: 0,
          pointerEvents: "none",
        }}
      />
      {children}
    </CameraContext.Provider>
  );
}

export function useCamera() {
  const ctx = useContext(CameraContext);
  if (!ctx) throw new Error("useCamera must be used inside <CameraProvider>");
  return ctx;
}