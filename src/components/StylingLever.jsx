import { useState } from "react";


/** One row of "Styling Levers": ringed icon plus label that swaps to short_tip on hover */
export default function StylingLever({ title, short_tip, shortTip, size = 71, layers }) {
  const [isHovered, setIsHovered] = useState(false);
  const tip = short_tip || shortTip;
  const displayText = isHovered && tip ? tip : title;

  return (
    <div 
      className="lever"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="lever__icon" style={{ width: size, height: size }}>
        {layers.map((l, i) => (
          <img
            key={i}
            src={l.src}
            alt=""
            style={{ left: l.left ?? 0, top: l.top ?? 0, width: l.w ?? size, height: l.h ?? size }}
          />
        ))}
      </div>
      <p className="lever__label">{displayText}</p>
    </div>
  );
}