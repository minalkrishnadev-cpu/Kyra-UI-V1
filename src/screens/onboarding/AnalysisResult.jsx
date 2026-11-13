// import { useLocation, useNavigate } from "react-router-dom";
// import AppHeader from "../../components/AppHeader.jsx";
// import { useState, useMemo } from "react";
 
// // Sample analysis result. Pass your own JSON via the `data` prop.
// const SAMPLE_DATA = {
//   monk_skin_tone: "MST-4",
//   undertone: "Neutral",
//   contrast: "Medium",
//   clarity: "Clear",
//   recommended_colors: [
//     { name: "Olive", hex: "#6E6D4E", role: "Core", reason: "Earthy tone that balances your complexion." },
//     { name: "Camel", hex: "#A9896D", role: "Core", reason: "Warm neutral that adds effortless harmony." },
//     { name: "Deep Teal", hex: "#475E61", role: "Supporting", reason: "Adds depth and clarity to your look." },
//     { name: "Plum", hex: "#7D546D", role: "Supporting", reason: "Rich, muted berry tone that flatters neutral undertones." },
//     { name: "Terracotta", hex: "#B86046", role: "Accent", reason: "Brings natural warmth and vibrancy without overpowering." },
//   ],
// };
// function ColorCard({ color, index, distance, selected, onSelect }) {
//   return (
//     <button
//       type="button"
//       className="skin-card"
//       aria-pressed={selected}
//       aria-label={`${color.name}, ${color.role}, ${color.hex}`}
//       style={{ "--c": color.hex, "--i": index, "--d": distance }}
//       onClick={() => onSelect(index)}
//     >
//       <span className="skin-card__hex">{color.hex.toUpperCase()}</span>
//       <span className="skin-card__role">{color.role}</span>
//       <span className="skin-card__why">{color.reason}</span>
//     </button>
//   );
// }
// /** Figma: Analysis / "Analysing" (2043:13245) */
// export default function AnalysisResult() {
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // Extract photo and analysis result from router state
//   //const { photo, result } = location.state || {};

//   return (
//     <div className="screen">
//       <AppHeader />
//       <div className="screen__content screen__content--analysing">
        
//         {/* Render the captured photo if available */}
//         {/* {photo && (
//           <div className="photo-preview" style={{ marginBottom: "20px" }}>
//             <img 
//               src={photo} 
//               alt="Scanned Body" 
//               style={{ maxWidth: "200px", borderRadius: "8px" }} 
//             />
//           </div>
//         )} */}

      
//         {/* <div className="screen__text">
//           {result ? (
//             <pre style={{ textAlign: "left", background: "#0000", padding: "15px", borderRadius: "5px" }}>
//               {JSON.stringify(result, null, 2)}
//             </pre>
//           ) : (
//             <p>No analysis data found. Please try capturing again.</p>
//           )}
//         </div> */}
//              {/* call llm here*/}
//               <div className="screen">
//       <AppHeader />
//       <div className="screen__content screen__content--result">
//         <h1 className="title">Skin Tone Analysis</h1>
 
//         <section className="skin-panel">
//           <h2 className="skin-panel__title">Colors that love you back</h2>
//           <p className="skin-panel__sub">
//             Your scan is complete. Tap a color to see why it works with your tone.
//           </p>
 
//           <div className="skin-pills">
//             <div className="skin-pill">
//               <i className="skin-pill__dot" style={{ background: monkSwatch(data.monk_skin_tone) }} />
//               <b>{data.monk_skin_tone}</b>
//             </div>
//             {pills.map(([label, value]) => (
//               <div className="skin-pill" key={label}>
//                 <span>{label}</span>
//                 <b>{value}</b>
//               </div>
//             ))}
//           </div>
 
//           <div className="skin-stage" role="group" aria-label="Recommended colors">
//             {colors.map((c, i) => (
//               <ColorCard
//                 key={c.hex}
//                 color={c}
//                 index={i}
//                 distance={Math.abs(i - selected)}
//                 selected={i === selected}
//                 onSelect={setSelected}
//               />
//             ))}
//           </div>
 
//           <div className="skin-caption" aria-live="polite">
//             <div className="skin-caption__name">{active.name}</div>
//             <div className="skin-caption__meta">{active.role} color</div>
//           </div>
//           <p className="skin-hint">Tap a color to explore</p>
//         </section>
//       </div>
//     </div>

//       </div>
//     </div>
//   );
// }



import { useLocation, useNavigate } from "react-router-dom";
import AppHeader from "../../components/AppHeader.jsx";
import { useState, useMemo } from "react";
import "./AnalysisResult.css";
import OptionCard from "../../components/OptionCard.jsx";

// Sample analysis result. Pass your own JSON via the `data` prop.
const SAMPLE_DATA = {
  monk_skin_tone: "MST-4",
  undertone: "Neutral",
  contrast: "Medium",
  clarity: "Clear",
  recommended_colors: [
    { name: "Olive", hex: "#6E6D4E", role: "Core", reason: "Earthy tone that balances your complexion." },
    { name: "Camel", hex: "#A9896D", role: "Core", reason: "Warm neutral that adds effortless harmony." },
    { name: "Deep Teal", hex: "#475E61", role: "Supporting", reason: "Adds depth and clarity to your look." },
    { name: "Plum", hex: "#7D546D", role: "Supporting", reason: "Rich, muted berry tone that flatters neutral undertones." },
    { name: "Terracotta", hex: "#B86046", role: "Accent", reason: "Brings natural warmth and vibrancy without overpowering." },
  ],
};

// Monk Skin Tone scale swatches (MST-1 to MST-10)
// const MONK = ["#F6EDE4", "#F3E7DB", "#F7EAD0", "#EADABA", "#D7BD96", "#A07E56", "#825C43", "#604134", "#3A312A", "#292420"];
// const monkSwatch = (id) => MONK[(parseInt(String(id).replace(/\D/g, ""), 10) || 4) - 1] ?? MONK[3];

function ColorCard({ color, index, distance, selected, onSelect }) {
  return (
    <button
      type="button"
      className="skin-card"
      aria-pressed={selected}
      aria-label={`${color.name}, ${color.role}, ${color.hex}`}
      style={{ "--c": color.hex, "--i": index, "--d": distance }}
      onClick={() => onSelect(index)}
    >
      <span className="skin-card__hex">{color.hex.toUpperCase()}</span>
      <span className="skin-card__role">{color.role}</span>
      <span className="skin-card__why">{color.reason}</span>
    </button>
  );
}

/** Figma: Analysis / "Analysing" (2043:13245) */
export default function AnalysisResult() {
  const navigate = useNavigate();
  const location = useLocation();

  const data = SAMPLE_DATA;
  const colors = data.recommended_colors;
  
  // Set initial selected state to null so nothing is highlighted on first load
  const [selected, setSelected] = useState(null);
  const active = selected === null ? null : colors[selected];

  const pills = useMemo(
    () => [["Undertone", data.undertone], ["Contrast", data.contrast], ["Clarity", data.clarity]],
    [data]
  );

  return (
    <div className="screen">
      <AppHeader />
      <div className="screen__content screen__content--result">
        <h1 className="title">Skin Tone Analysis</h1>

        <section className="skin-panel">
          <h2 className="skin-panel__title">Colors that complement you</h2>
          <div className="skin-pills">
            {pills.map(([label, value]) => (
              <div className="skin-pill" key={label}>
                <span>{label}</span>
                <b>{value}</b>
              </div>
            ))}
          </div>

          <div className="skin-stage" role="group" aria-label="Recommended colors">
            {colors.map((c, i) => (
              <ColorCard
                key={c.hex}
                color={c}
                index={i}
                distance={selected === null ? 0 : Math.abs(i - selected)}
                selected={i === selected}
                onSelect={setSelected}
              />
            ))}
          </div>

          {active && (
            <div className="skin-caption" aria-live="polite">
              <div className="skin-caption__name">{active.name}</div>
              <div className="skin-caption__meta">{active.role} color</div>
            </div>
          )}
          <p className="skin-hint">Tap a color to explore</p>
          
           
        </section>
        <div className="button-row">
            <OptionCard onHowver label="Continue" width="w500" onClick={() => navigate("/welcome/looking-for-today/surpriseme/analysis/holdstill/analysisres/fit")}/>
            </div>
      </div>
    </div>
  );
}