import "./KyraLogo.css";

/** Figma: "KYRA Logo" (mark + wordmark). */
export default function KyraLogo() {
  return (
    <div className="kyra-logo">
      <img className="kyra-logo__mark" src={`${import.meta.env.BASE_URL}/assets/brand/kyra-logo.png`} alt="KYRA" />
      <div className="kyra-logo__text">
        <img src={`${import.meta.env.BASE_URL}/assets/brand/kyra-wordmark.png`} alt="" />
      </div>
    </div>
  );
}
