import { useEffect } from "react";
import AppHeader from "../../components/AppHeader.jsx";
import { useNavigate,useLocation, useSearchParams  } from "react-router-dom";
const INTRO_MS = 3000; // 3 seconds
const NEXT = "/welcome/looking-for-today/surpriseme/analysis/holdstill";

/** Figma: Analysis / "Analysing" (2043:13245) */
export default function AnalysisScreen() {
      const { state } = useLocation();
  const [params] = useSearchParams();
  const searchid = state?.id ?? params.get("category");
const text = state?.text ?? params.get("q");
console.log("inside - analysis category "+searchid);
console.log("inside - analysis voice search "+text);
  const navigate = useNavigate();
  // useEffect(() => {
  //   const timer = setTimeout(() => navigate(NEXT), INTRO_MS);
  //   return () => clearTimeout(timer); // stops the timer if you leave early
  // }, [navigate]);
  useEffect(() => {
  const timer = setTimeout(() => {
    const query = new URLSearchParams();
    if (searchid) query.set("category", searchid);
    if (text) query.set("q", text);

    navigate(`${NEXT}?${query.toString()}`, {
      state: { id: searchid, text },
    });
  }, INTRO_MS);
  return () => clearTimeout(timer);
}, [navigate, searchid, text]);
  console.log(searchid)
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