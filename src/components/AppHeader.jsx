import "./AppHeader.css";

/** Top bar: Kyra star (left) and profile icon (right). Figma: "Frame 1410126071". */
export default function AppHeader({ onKyraClick, onProfileClick, paddingX = 18 }) {
  return (
    <header className="app-header" style={{ paddingInline: paddingX }}>
      <button type="button" className="app-header__kyra" onClick={onKyraClick} aria-label="Kyra">
        <img src={`${import.meta.env.BASE_URL}/assets/icons/kyra-star.png`} alt="" />
      </button>
      <button type="button" className="app-header__profile" onClick={onProfileClick} aria-label="Profile">
        <img src={`${import.meta.env.BASE_URL}/assets/icons/user-profile.png`} alt="" />
      </button>
    </header>
  );
}
