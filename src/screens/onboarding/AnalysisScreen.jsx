import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../components/AppHeader.jsx";

const INTRO_MS = 3000; // 3 seconds
const NEXT = "/welcome/looking-for-today/surpriseme/analysis/holdstill";

/** Figma: Analysis / "Analysing" (2043:13245) */
export default function AnalysisScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate(NEXT), INTRO_MS);
    return () => clearTimeout(timer); // stops the timer if you leave early
  }, [navigate]);

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