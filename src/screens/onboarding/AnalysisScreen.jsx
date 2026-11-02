import AppHeader from "../../components/AppHeader.jsx";

/** Figma: Analysis / "Analysing" (2043:13245) */
export default function AnalysisScreen() {
  return (
    <div className="screen">
      <AppHeader />
      <div className="screen__content screen__content--analysing">
        <h1 className="title">Building your profile.</h1>
        <p className="screen__text">
          We’re analysing your skin tone and fit to personalise your recommendations.
        </p>
      </div>
    </div>
  );
}