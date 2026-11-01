// import React, { useEffect, useRef, useState } from 'react';
// import { useCallback } from "react";
// import { createPortal } from "react-dom";
// import AppHeader from "../../components/AppHeader.jsx";
// import OptionCard from "../../components/OptionCard.jsx";
// import { useNavigate } from "react-router-dom";
// import { useCamera } from "../../context/CameraContext.jsx";
// import { useHandPointer } from "../../hooks/useHandPointer.js";
// /** Figma: Onboarding / "How can i help you" (variant A, 2043:8311) */
// export default function LookingForTodayScreen() {
//    const navigate = useNavigate();
//   const { videoRef } = useCamera();
//   const screenRef = useRef(null);
//   const logoRef = useRef(null);
//   useEffect(() => {
//   console.log("videoRef.current:", videoRef.current,
//               "| <video> elements on page:", document.querySelectorAll("video").length);
// }, [videoRef]);
//   const goNext = useCallback(() => navigate("/welcome/looking-for-today/surpriseme"), [navigate]);
//     const handlePinch = useCallback(
//       ({ x, y }) => {
//         const r = logoRef.current?.getBoundingClientRect();
//         if (!r) return;
//         const inside =
//           x >= r.left - HIT_PADDING &&
//           x <= r.right + HIT_PADDING &&
//           y >= r.top - HIT_PADDING &&
//           y <= r.bottom + HIT_PADDING;
//         if (inside) goNext();
//       },
//       [goNext]
//     );
//       const { cursorRef, status } = useHandPointer({
//         videoRef,
//         areaRef: screenRef,
//         onPinch: handlePinch,
//       });
//   return (
//     <div ref={screenRef} className="screen">
//       <AppHeader />
//       <div className="screen__content" style={{ gap: 112 }}>
//         <h1 className="title title--inset">What are you looking for today?</h1>
//         <div className="button-stack">
//           <OptionCard ref={logoRef} label="Browse"  onClick={goNext}/>
//           <OptionCard ref={logoRef} label="Something Specific"  onClick={goNext}/>
//         </div>
//       </div>
  
//       {createPortal(
//             <div
//               ref={cursorRef}
//               style={{
//                 position: "fixed",
//                 top: 0,
//                 left: 0,
//                 display: "none",
//                 width: 48,
//                 height: 48,
//                 borderRadius: "50%",
//                 border: "3px solid white",
//                 backgroundColor: "#584149",
//                 boxShadow: "0 0 12px rgba(0,0,0,0.4)",
//                 pointerEvents: "none",
//                 zIndex: 9999,
//                 transition: "background-color 0.1s ease",
//               }}
//             />,
//             document.body
//           )}
//             </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import AppHeader from "../../components/AppHeader.jsx";
import OptionCard from "../../components/OptionCard.jsx";
import { useHandPointer } from "../../hooks/useHandPointer.js";

const SURPRISE_ME = "/welcome/looking-for-today/surpriseme";
const SPECIFIC_SCREEN = "/welcome/looking-for-today/specificscreen";
export default function LookingForTodayScreen() {
  const navigate = useNavigate();
  useHandPointer(); // pinch = click on the nearest button

  return (
    <div className="screen">
      <AppHeader />
      <div className="screen__content" style={{ gap: 112 }}>
        <h1 className="title title--inset">What are you looking for today?</h1>
        <div className="button-stack">
          <OptionCard label="Browse" onClick={() => navigate(SURPRISE_ME)} />
          <OptionCard label="Something Specific" onClick={() => navigate(SPECIFIC_SCREEN)} />
        </div>
      </div>
    </div>
  );
}