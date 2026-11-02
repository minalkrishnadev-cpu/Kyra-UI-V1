import AppHeader from "../../components/AppHeader.jsx";
import OptionCard from "../../components/OptionCard.jsx";

// NOTE: both accessory cards are labelled "Accessories" in the Figma file.
const OPTIONS = [
  { id: "tops", label: "Tops", icon: `${import.meta.env.BASE_URL}/assets/icons/tops.png`, iconWidth: 200 },
  { id: "bottoms", label: "Bottoms", icon: `${import.meta.env.BASE_URL}/assets/icons/bottoms.png`, iconWidth: 200 },
  { id: "accessories-a", label: "Accessories", icon: `${import.meta.env.BASE_URL}/assets/icons/shoes.png`, iconWidth: 200 },
  { id: "accessories-b", label: "Accessories", icon: `${import.meta.env.BASE_URL}/assets/icons/glasses.png`, iconWidth: 244 },
];

/** Figma: Onboarding / "Male Something specific" (2043:9935) */
export default function MaleSomethingSpecificScreen({ onSelect }) {
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
              onClick={() => onSelect?.(o.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
