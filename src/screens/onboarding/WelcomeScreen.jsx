// import AppHeader from "../../components/AppHeader.jsx";
// import KyraLogo from "../../components/KyraLogo.jsx";
// import "./WelcomeScreen.css";

// /** Figma: Onboarding / "Welcome screen" (2043:8291) */
// export default function WelcomeScreen() {
//   return (
//     <div className="screen welcome" >
//       <AppHeader paddingX={32} />
//       <div className="welcome__content">
//         <KyraLogo />
//         <div className="welcome__copy">
//           <p className="welcome__heading">Welcome!</p>
//           <p className="welcome__intro">
//             I’m Kyra,
//             <br />
//             your personal shopping assistant!
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useRef, useState } from 'react';
import { useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../components/AppHeader.jsx";
import KyraLogo from "../../components/KyraLogo.jsx";
import { useCamera } from "../../context/CameraContext.jsx";
import { useHandPointer } from "../../hooks/useHandPointer.js";
import "./WelcomeScreen.css";

const HIT_PADDING = 40; // px of forgiveness around the logo

/** Figma: Onboarding / "Welcome screen" (2043:8291) */
export default function WelcomeScreen() {

  const navigate = useNavigate();
  const { videoRef } = useCamera();
  const screenRef = useRef(null);
  const logoRef = useRef(null);
  useEffect(() => {
  console.log("videoRef.current:", videoRef.current,
              "| <video> elements on page:", document.querySelectorAll("video").length);
}, [videoRef]);
  const goNext = useCallback(() => navigate("/welcome/looking-for-today"), [navigate]);

  const handlePinch = useCallback(
    ({ x, y }) => {
      const r = logoRef.current?.getBoundingClientRect();
      if (!r) return;
      const inside =
        x >= r.left - HIT_PADDING &&
        x <= r.right + HIT_PADDING &&
        y >= r.top - HIT_PADDING &&
        y <= r.bottom + HIT_PADDING;
      if (inside) goNext();
    },
    [goNext]
  );

  const { cursorRef, status } = useHandPointer({
    videoRef,
    areaRef: screenRef,
    onPinch: handlePinch,
  });

  return (
    <div ref={screenRef} className="screen welcome">
      <AppHeader paddingX={32} />
      <div className="welcome__content">
        <div ref={logoRef} style={{ display: "inline-block", cursor: "pointer" }} onClick={goNext}>
          <KyraLogo />
        </div>

        <div className="welcome__copy">
          <p className="welcome__heading">Welcome!</p>
          <p className="welcome__intro">
            I’m Kyra,
            <br />
            your personal shopping assistant!
          </p>
        </div>

        <p style={{ fontSize: 28, color: "#888", textAlign: "center", margin: 0 }}>{status}</p>
      </div>

      {/* Rendered into <body>: position:fixed breaks inside the scaled ScreenFrame otherwise. */}
      {createPortal(
        <div
          ref={cursorRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            display: "none",
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: "3px solid white",
            backgroundColor: "#584149",
            boxShadow: "0 0 12px rgba(0,0,0,0.4)",
            pointerEvents: "none",
            zIndex: 9999,
            transition: "background-color 0.1s ease",
          }}
        />,
        document.body
      )}
    </div>
  );
}
