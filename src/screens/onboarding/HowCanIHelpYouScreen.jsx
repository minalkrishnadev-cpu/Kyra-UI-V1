import AppHeader from "../../components/AppHeader.jsx";
import OptionCard from "../../components/OptionCard.jsx";

/** Figma: Onboarding / "How can i help you" (variant B, 2043:8322) */
export default function HowCanIHelpYouScreen({ onJustBrowsing, onKnowWhatIWant }) {
  return (
    <div className="screen">
      <AppHeader />
      <div className="screen__content" style={{ gap: 251, marginTop: 184 }}>
        <h1 className="title title--inset">How can I help you today?</h1>
        <div className="button-stack">
          <OptionCard label="I’m just browsing" width="auto" onClick={onJustBrowsing} />
          <OptionCard label="I know what I’m looking for" width="auto" onClick={onKnowWhatIWant} />
        </div>
      </div>
    </div>
  );
}
