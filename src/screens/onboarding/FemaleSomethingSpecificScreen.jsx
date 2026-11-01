import AppHeader from "../../components/AppHeader.jsx";
import OptionCard from "../../components/OptionCard.jsx";

// NOTE: both accessory cards are labelled "Accessories" in the Figma file (boots / bag icons).
const OPTIONS = [
  { id: "tops", label: "Tops", icon: "/assets/icons/tops-women.png", iconWidth: 200 },
  { id: "bottoms", label: "Bottoms", icon: "/assets/icons/bottom-women.png", iconWidth: 253 },
  { id: "accessories-boots", label: "Accessories", icon: "/assets/icons/shoes-women.png", iconWidth: 200 },
  { id: "accessories-bag", label: "Accessories", icon: "/assets/icons/bag-women.png", iconWidth: 200 },
  { id: "one-pieces", label: "One-Pieces", icon: "/assets/icons/dress-women.png", iconWidth: 200 },
];

/** Figma: Onboarding / "Female Something specific" (2043:8334) */
export default function FemaleSomethingSpecificScreen({ onSelect }) {
  return (
    <div className="screen">
      <AppHeader />
      <div className="screen__content" style={{ gap: 100 }}>
        <h1 className="title">What would you like to try?</h1>
        <div className="option-grid">
          {OPTIONS.map((o, i) => (
            <div key={o.id} className={i === OPTIONS.length - 1 ? "option-grid__span" : undefined}>
              <OptionCard
                label={o.label}
                icon={o.icon}
                iconWidth={o.iconWidth}
                width="w500"
                onClick={() => onSelect?.(o.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
