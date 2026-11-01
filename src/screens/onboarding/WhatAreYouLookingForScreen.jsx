import AppHeader from "../../components/AppHeader.jsx";
import OptionCard from "../../components/OptionCard.jsx";

/** Figma: Onboarding / "What r u looking for" (2043:13023) */
export default function WhatAreYouLookingForScreen({ onOutfit, onPickAPiece }) {
  return (
    <div className="screen">
      <AppHeader />
      <div className="screen__content" style={{ gap: 300 }}>
        <h1 className="title title--inset">What are you looking for?</h1>
        <div className="button-row">
          <OptionCard label="Outfit" width="w500" onClick={onOutfit} />
          <OptionCard label="Pick a Piece" width="w500" onClick={onPickAPiece} />
        </div>
      </div>
    </div>
  );
}
