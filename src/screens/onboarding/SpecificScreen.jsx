// import AppHeader from "../../components/AppHeader.jsx";
// import { useNavigate } from "react-router-dom";
// import OptionCard from "../../components/OptionCard.jsx";
// import { useHandPointer } from "../../hooks/useHandPointer.js";
// /** Figma: Onboarding / "Surprise me" (2043:13011) */
// const MALE_PICKS = "/welcome/looking-for-today/surpriseme/malepicks";
// const FEMALE_PICKS = "/welcome/looking-for-today/surpriseme/femalepicks";
// export default function SurpriseMeScreen() {
//    const navigate = useNavigate();
//   useHandPointer(); // pinch = click on the nearest button
//   return (
//     <div className="screen">
//       <AppHeader />
//       <div className="screen__content" style={{ gap: 300 }}>
//         <h1 className="title title--inset">What would you like to try?</h1>
//         <div className="button-row">
//           <OptionCard label="Outfit" width="w500" />
//           <OptionCard label="Pick a Piece" width="w500"  onClick={() => navigate(FEMALE_PICKS)}/>
//         </div>
//       </div>
//     </div>
//   );
// }

//import "./SurpriseMeScreen.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../components/AppHeader.jsx";
import OptionCard from "../../components/OptionCard.jsx";

/** Figma: Onboarding / "Surprise me" (2043:13011) */
const VOICE_SEARCH = "/welcome/looking-for-today/specificscreen/voicesearch";
const SHOPFOR="/welcome/looking-for-today/surpriseme/shopfor"
export default function SpecificScreen() {
  const navigate = useNavigate();
    const handleNavigation = (route) => {
    navigate(`${SHOPFOR}?category=${encodeURIComponent(route)}`, {
      state: { route },
    });
  };
  // No useHandPointer() needed: the shared detector turns a pinch into a click
  // on the nearest button, so these onClick handlers work for hand and mouse.
  return (
    <div className="screen">
      <AppHeader />
      <div className="screen__content" style={{ gap: 300 }}>
        <h1 className="title title--inset">What would you like to try?</h1>

        <div className="button-row">
          {/* TODO: Outfit has no destination yet (the "analysis" flow in the Figma notes). */}
          <OptionCard label="Outfit" width="w500"    onClick={() => navigate(VOICE_SEARCH)}/>
          <OptionCard
            label="Pick a Piece"
            width="w500"
            onClick={() => handleNavigation("somethingspecific")}
          />
        </div>
      </div>
    </div>
  );
}