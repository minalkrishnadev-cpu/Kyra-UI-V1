/**
 * Figma: "Bracelet Info card".
 * width: "default" (600) | "w500" (500) | "auto" (hugs content)
 */
export default function OptionCard({ label, icon, iconWidth = 200, width = "default", onClick }) {
  const cls = [
    "option-card",
    width === "w500" && "option-card--w500",
    width === "auto" && "option-card--auto",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={cls} onClick={onClick}>
      {icon && (
        <img
          className="option-card__icon"
          src={icon}
          alt=""
          style={{ width: iconWidth }}
        />
      )}
      <span>{label}</span>
    </button>
  );
}
