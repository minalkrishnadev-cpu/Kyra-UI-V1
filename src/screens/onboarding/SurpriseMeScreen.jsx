

//import "./SurpriseMeScreen.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../components/AppHeader.jsx";
import OptionCard from "../../components/OptionCard.jsx";

/** Figma: Onboarding / "Surprise me" (2043:13011) */

const ANALYSIS="/welcome/looking-for-today/surpriseme/analysis";
const SHOPFOR="/welcome/looking-for-today/surpriseme/shopfor"
export default function SurpriseMeScreen() {
  const navigate = useNavigate();
  const [showShoppingFor, setShowShoppingFor] = useState(false);

  // No useHandPointer() needed: the shared detector turns a pinch into a click
  // on the nearest button, so these onClick handlers work for hand and mouse.
  return (
    <div className="screen">
      <AppHeader />
      <div className="screen__content" style={{ gap: 300 }}>
        <h1 className="title title--inset">What would you like to try?</h1>

        <div className="button-row">
          {/* TODO: Outfit has no destination yet (the "analysis" flow in the Figma notes). */}
          <OptionCard onHowver label="Outfit" width="w500" onClick={() => navigate(ANALYSIS)} />
          <OptionCard
            label="Pick a Piece"
            width="w500"
            onClick={() => navigate(SHOPFOR)}
          />
        </div>
      </div>
    </div>
  );
}