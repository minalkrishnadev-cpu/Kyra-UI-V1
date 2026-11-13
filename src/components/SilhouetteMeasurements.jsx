// import "./SilhouetteMeasurements.css";

// // Coordinates are inside the 266 x 988 measurement overlay from the Figma design.
// const MARKS = [
//   { id: "shoulder_width", label: "Shoulders", y: 194.38, cx: 133.5, w: 201 },
//   { id: "chest_bust", label: "Bust", y: 287.03, cx: 133, w: 158 },
//   { id: "waist", label: "Waist", y: 369.62, cx: 133, w: 96 },
//   { id: "hips", label: "Hips", y: 430.05, cx: 132.5, w: 161 },
// ];
// const HEAD_Y = 10;
// const FEET_Y = 987;
// const CENTER_X = 133;

// /** The shoulders and waist lines are linked by the trapezoid in the design. */
// export const RELATION_IDS = ["shoulder_width", "waist"];

// const edge = (m) => ({ l: m.cx - m.w / 2, r: m.cx + m.w / 2 });

// /**
//  * Silhouette with measurement lines (Figma: "Fit Analysis" row, 312 x 1073).
//  * Hover (or tap / pinch) the figure to reveal the measurements.
//  * Hover a line to focus it.
//  */
// export default function SilhouetteMeasurements({
//   values,
//   height,
//   active,
//   showAll,
//   onHoverAll,
//   onHoverMark,
//   onSelectMark,
//   onToggleAll,
// }) {
//   const relationOn = RELATION_IDS.includes(active);
//   const sh = MARKS[0];
//   const wa = MARKS[2];

//   return (
//     <div
//       className="sil"
//       data-pinch
//       onMouseEnter={() => onHoverAll(true)}
//       onMouseLeave={() => onHoverAll(false)}
//       onClick={onToggleAll}
//     >
//         {/* const WASM_URL = `${import.meta.env.BASE_URL}mediapipe/wasm`; */}
//       <img className="sil__img" src={`${import.meta.env.BASE_URL}assets/brand/silhouette.png`} alt="Your silhouette" />

//       <div className="sil__overlay">
//         <svg className="sil__svg" viewBox="0 0 266 988" aria-hidden="true">
//           {relationOn && (
//             <polygon
//               className="sil__fill"
//               points={`${edge(sh).l},${sh.y} ${edge(sh).r},${sh.y} ${edge(wa).r},${wa.y} ${edge(wa).l},${wa.y}`}
//             />
//           )}

//           <line className="sil__center" x1={CENTER_X} y1={HEAD_Y} x2={CENTER_X} y2={FEET_Y} />
//           <circle className="sil__dot" cx={CENTER_X} cy={HEAD_Y} r="4" />
//           <circle className="sil__dot" cx={CENTER_X} cy={FEET_Y} r="4" />

//           {MARKS.map((m) => {
//             const on = active === m.id || (relationOn && RELATION_IDS.includes(m.id));
//             const { l, r } = edge(m);
//             return (
//               <g key={m.id} className={`sil__mark${on ? " is-active" : ""}`}>
//                 <line x1={l} y1={m.y} x2={r} y2={m.y} />
//                 <circle cx={l} cy={m.y} r="4" />
//                 <circle cx={r} cy={m.y} r="4" />
//               </g>
//             );
//           })}
//         </svg>

//         {/* value labels, revealed on hover */}
//         {MARKS.map((m) => (
//           <span
//             key={m.id}
//             className={`sil__pill${showAll ? " is-on" : ""}${active === m.id ? " is-active" : ""}`}
//             style={{ left: m.cx, top: m.y }}
//           >
//             {values[m.id]} cm
//           </span>
//         ))}
//         <span
//           className={`sil__pill${showAll ? " is-on" : ""}`}
//           style={{ left: CENTER_X, top: FEET_Y - 40 }}
//         >
//           {height} cm
//         </span>

//         {/* invisible hover / click zones over each line */}
//         {MARKS.map((m) => (
//           <button
//             key={m.id}
//             type="button"
//             className="sil__zone"
//             aria-label={`${m.label}: ${values[m.id]} cm`}
//             style={{ left: m.cx - m.w / 2 - 24, top: m.y - 26, width: m.w + 48, height: 52 }}
//             onMouseEnter={() => onHoverMark(m.id)}
//             onMouseLeave={() => onHoverMark(null)}
//             onFocus={() => onHoverMark(m.id)}
//             onBlur={() => onHoverMark(null)}
//             onClick={(e) => {
//               e.stopPropagation();
//               onSelectMark(m.id);
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// import "./SilhouetteMeasurements.css";

// const MARKS = [
//   { id: "shoulder_width", label: "Shoulders", y: 194.38, cx: 133.5, w: 201 },
//   { id: "chest_bust", label: "Bust", y: 287.03, cx: 133, w: 158 },
//   { id: "waist", label: "Waist", y: 369.62, cx: 133, w: 96 },
//   { id: "hips", label: "Hips", y: 430.05, cx: 132.5, w: 161 },
//   { id: "inseam", label: "Inseam", y: 560.00, cx: 132.5, w: 140 },
// ];

// const HEAD_Y = 10;
// const FEET_Y = 987;
// const CENTER_X = 133;

// const edge = (m) => ({ l: m.cx - m.w / 2, r: m.cx + m.w / 2 });

// export default function SilhouetteMeasurements({
//   values,
//   height,
//   active,
//   showAll,
//   onHoverAll,
//   onHoverMark,
//   onSelectMark,
//   onToggleAll,
// }) {
//   const sh = MARKS[0];
//   const bu = MARKS[1];
//   const wa = MARKS[2];
//   const hi = MARKS[3];

//   // Determine which upper and lower bounds to shade based on active selection
//   let topMark = null;
//   let bottomMark = null;
//   let isHeightSpan = false;

//   if (active === "shoulder_width" || active === "waist") {
//     topMark = sh;
//     bottomMark = wa;
//   } else if (active === "chest_bust") {
//     topMark = bu;
//     bottomMark = wa;
//   } else if (active === "hips") {
//     topMark = wa;
//     bottomMark = hi;
//   } else if (active === "height" || active === "inseam") {
//     isHeightSpan = true;
//   }

//   return (
//     <div
//       className="sil"
//       data-pinch
//       onMouseEnter={() => onHoverAll(true)}
//       onMouseLeave={() => onHoverAll(false)}
//       onClick={onToggleAll}
//     >
//       <img
//         className="sil__img"
//         src={`${import.meta.env.BASE_URL}assets/brand/silhouette.png`}
//         alt="Your silhouette"
//       />

//       <div className="sil__overlay">
//         <svg className="sil__svg" viewBox="0 0 266 988" aria-hidden="true">
//           {/* Trapezoid highlight for upper-body pairs (Shoulders/Bust/Waist/Hips) */}
//           {topMark && bottomMark && (
//             <polygon
//               className="sil__fill"
//               points={`${edge(topMark).l},${topMark.y} ${edge(topMark).r},${topMark.y} ${edge(bottomMark).r},${bottomMark.y} ${edge(bottomMark).l},${bottomMark.y}`}
//             />
//           )}

//           {/* Full body span highlight for Height → Inseam */}
//           {isHeightSpan && (
//             <rect
//               className="sil__fill"
//               x={CENTER_X - 60}
//               y={HEAD_Y}
//               width={120}
//               height={FEET_Y - HEAD_Y}
//             />
//           )}

//           <line className="sil__center" x1={CENTER_X} y1={HEAD_Y} x2={CENTER_X} y2={FEET_Y} />
//           <circle className="sil__dot" cx={CENTER_X} cy={HEAD_Y} r="4" />
//           <circle className="sil__dot" cx={CENTER_X} cy={FEET_Y} r="4" />

//           {MARKS.map((m) => {
//             const on = active === m.id;
//             const { l, r } = edge(m);
//             return (
//               <g key={m.id} className={`sil__mark${on ? " is-active" : ""}`}>
//                 <line x1={l} y1={m.y} x2={r} y2={m.y} />
//                 <circle cx={l} cy={m.y} r="4" />
//                 <circle cx={r} cy={m.y} r="4" />
//               </g>
//             );
//           })}
//         </svg>

//         {MARKS.map((m) => (
//           <span
//             key={m.id}
//             className={`sil__pill${showAll ? " is-on" : ""}${active === m.id ? " is-active" : ""}`}
//             style={{ left: m.cx, top: m.y }}
//           >
//             {values[m.id]} cm
//           </span>
//         ))}
//         <span
//           className={`sil__pill${showAll ? " is-on" : ""}${active === "height" ? " is-active" : ""}`}
//           style={{ left: CENTER_X, top: FEET_Y - 40 }}
//         >
//           {height} cm
//         </span>

//         {MARKS.map((m) => (
//           <button
//             key={m.id}
//             type="button"
//             className="sil__zone"
//             aria-label={`${m.label}: ${values[m.id]} cm`}
//             style={{ left: m.cx - m.w / 2 - 24, top: m.y - 26, width: m.w + 48, height: 52 }}
//             onMouseEnter={() => onHoverMark(m.id)}
//             onMouseLeave={() => onHoverMark(null)}
//             onFocus={() => onHoverMark(m.id)}
//             onBlur={() => onHoverMark(null)}
//             onClick={(e) => {
//               e.stopPropagation();
//               onSelectMark(m.id);
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
import "./SilhouetteMeasurements.css";

const MARKS = [
  { id: "shoulder_width", label: "Shoulders", y: 194.38, cx: 133.5, w: 201 },
  { id: "chest_bust", label: "Bust", y: 287.03, cx: 133, w: 158 },
  { id: "waist", label: "Waist", y: 369.62, cx: 133, w: 96 },
  { id: "hips", label: "Hips", y: 430.05, cx: 132.5, w: 161 },
  // Added Inseam position so it can be targeted for the Height → Inseam view
  { id: "inseam", label: "Inseam", y: 560.00, cx: 132.5, w: 140 }, 
];

const HEAD_Y = 10;
const FEET_Y = 987;
const CENTER_X = 133;

const edge = (m) => ({ l: m.cx - m.w / 2, r: m.cx + m.w / 2 });

export default function SilhouetteMeasurements({
  values,
  height,
  active,
  showAll,
  onHoverAll,
  onHoverMark,
  onSelectMark,
  onToggleAll,
}) {
  const sh = MARKS[0];
  const bu = MARKS[1];
  const wa = MARKS[2];
  const hi = MARKS[3];
  const ins = MARKS[4];

  let topMark = null;
  let bottomMark = null;
  let isHeightSpan = false;

  if (active === "shoulder_width" || active === "waist") {
    topMark = sh;
    bottomMark = wa;
  } else if (active === "chest_bust") {
    topMark = bu;
    bottomMark = wa;
  } else if (active === "hips") {
    topMark = wa;
    bottomMark = hi;
  } else if (active === "height" || active === "inseam") {
    isHeightSpan = true;
  }

  return (
    <div
      className="sil"
      data-pinch
      onMouseEnter={() => onHoverAll(true)}
      onMouseLeave={() => onHoverAll(false)}
      onClick={onToggleAll}
    >
      <img
        className="sil__img"
        src={`${import.meta.env.BASE_URL}assets/brand/silhouette.png`}
        alt="Your silhouette"
      />

      <div className="sil__overlay">
        <svg className="sil__svg" viewBox="0 0 266 988" aria-hidden="true">
          {/* Trapezoid highlight for upper-body pairs */}
          {topMark && bottomMark && (
            <polygon
              className="sil__fill"
              points={`${edge(topMark).l},${topMark.y} ${edge(topMark).r},${topMark.y} ${edge(bottomMark).r},${bottomMark.y} ${edge(bottomMark).l},${bottomMark.y}`}
            />
          )}

          {/* Lower-body span highlight for Height → Inseam (from inseam line down to feet) */}
          {isHeightSpan && (
            <rect
              className="sil__fill"
              x={CENTER_X - 70}
              y={ins.y}
              width={140}
              height={FEET_Y - ins.y}
            />
          )}

          <line className="sil__center" x1={CENTER_X} y1={HEAD_Y} x2={CENTER_X} y2={FEET_Y} />
          <circle className="sil__dot" cx={CENTER_X} cy={HEAD_Y} r="4" />
          <circle className="sil__dot" cx={CENTER_X} cy={FEET_Y} r="4" />

          {MARKS.map((m) => {
            const on = active === m.id;
            const { l, r } = edge(m);
            return (
              <g key={m.id} className={`sil__mark${on ? " is-active" : ""}`}>
                <line x1={l} y1={m.y} x2={r} y2={m.y} />
                <circle cx={l} cy={m.y} r="4" />
                <circle cx={r} cy={m.y} r="4" />
              </g>
            );
          })}
        </svg>

        {MARKS.map((m) => (
          <span
            key={m.id}
            className={`sil__pill${showAll ? " is-on" : ""}${active === m.id ? " is-active" : ""}`}
            style={{ left: m.cx, top: m.y }}
          >
            {values[m.id]} cm
          </span>
        ))}
        <span
          className={`sil__pill${showAll ? " is-on" : ""}${active === "height" ? " is-active" : ""}`}
          style={{ left: CENTER_X, top: FEET_Y - 40 }}
        >
          {height} cm
        </span>

        {MARKS.map((m) => (
          <button
            key={m.id}
            type="button"
            className="sil__zone"
            aria-label={`${m.label}: ${values[m.id]} cm`}
            style={{ left: m.cx - m.w / 2 - 24, top: m.y - 26, width: m.w + 48, height: 52 }}
            onMouseEnter={() => onHoverMark(m.id)}
            onMouseLeave={() => onHoverMark(null)}
            onFocus={() => onHoverMark(m.id)}
            onBlur={() => onHoverMark(null)}
            onClick={(e) => {
              e.stopPropagation();
              onSelectMark(m.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}