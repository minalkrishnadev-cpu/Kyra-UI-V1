import AppHeader from "../../components/AppHeader.jsx";
import OptionCard from "../../components/OptionCard.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const KYRA_LISTENS = "/welcome/looking-for-today/specificscreen/voicesearch/listening";
/** Figma: Onboarding / "Catagories" (2043:9444) */
export default function TellUsWhatYouHaveInMindScreen() {
    const navigate = useNavigate();
  const [showShoppingFor, setShowShoppingFor] = useState(false);
  return (
    <div className="screen">
      <AppHeader />
      <div className="screen__content" style={{ gap: 100 }}>
        <h1 className="title">Tell us what you have in mind</h1>
        <OptionCard
          label="Voice search"
          icon={`${import.meta.env.BASE_URL}/assets/icons/voicesearch.png`}
          width="w500"
           onClick={() => navigate(KYRA_LISTENS)}
        />
      </div>
    </div>
  );
}
