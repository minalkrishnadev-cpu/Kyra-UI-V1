import AppHeader from "../../components/AppHeader.jsx";
import OptionCard from "../../components/OptionCard.jsx";

import { useNavigate,useLocation, useSearchParams  } from "react-router-dom";

// NOTE: both accessory cards are labelled "Accessories" in the Figma file.
const OPTIONS = [
  { id: "tops-male", label: "Tops", icon: `${import.meta.env.BASE_URL}/assets/icons/tops.png`, iconWidth: 200 },
  { id: "bottoms-male", label: "Bottoms", icon: `${import.meta.env.BASE_URL}/assets/icons/bottoms.png`, iconWidth: 200 },
  { id: "footwear-male", label: "Footwear", icon: `${import.meta.env.BASE_URL}/assets/icons/shoes.png`, iconWidth: 200 },
  { id: "accessories-male", label: "Accessories", icon: `${import.meta.env.BASE_URL}/assets/icons/glasses.png`, iconWidth: 244 },
];


/** Figma: Onboarding / "Male Something specific" (2043:9935) */
const ANALYSIS="/welcome/looking-for-today/surpriseme/analysis";
const LISTENING="/welcome/looking-for-today/specificscreen/voicesearch";
export default function MaleSomethingSpecificScreen({ onSelect }) {
   const { state } = useLocation();
  const [params] = useSearchParams();
  const searchid = state?.id ?? params.get("category");
  console.log(searchid);
  const navigate = useNavigate();
    const handleSelect = (id) => {
    onSelect?.(id);
    const target = searchid === "somethingspecific" ? LISTENING : ANALYSIS;

    navigate(`${target}?category=${encodeURIComponent(id)}`, {
      state: { id },
    });
  };
  return (
    <div className="screen">
      <AppHeader />
      <div className="screen__content" style={{ gap: 100 }}>
        <h1 className="title">What would you like to try?</h1>
        <div className="option-grid">
          {OPTIONS.map((o) => (
            <OptionCard
              key={o.id}
              label={o.label}
              icon={o.icon}
              iconWidth={o.iconWidth}
              width="w500"
              onClick={() =>handleSelect(o.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
