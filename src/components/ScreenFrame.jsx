import { useEffect, useState } from "react";

const DESIGN_W = 1080;
const DESIGN_H = 3840;

/**
 * Renders a screen at its 1080 x 3840 design size and scales it to fit the viewport.
 */
export default function ScreenFrame({ children }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fit = () =>
      setScale(Math.min(window.innerWidth / DESIGN_W, window.innerHeight / DESIGN_H));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div
      style={{
        width: DESIGN_W * scale,
        height: DESIGN_H * scale,
        margin: "0 auto",
      }}
    >
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
        {children}
      </div>
    </div>
  );
}
