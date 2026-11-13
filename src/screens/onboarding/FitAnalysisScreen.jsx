import { useState } from "react";
import AppHeader from "../../components/AppHeader.jsx";
import SilhouetteMeasurements from "../../components/SilhouetteMeasurements.jsx";
import StylingLever from "../../components/StylingLever.jsx";
import "./FitAnalysisScreen.css";

const stub = {
  user_profile: {
    height: { value: 172, unit: "cm" },
    body_measurements: {
      unit: "cm",
      neck: 36,
      shoulder_width: 41,
      chest_bust: 92,
      underbust: 78,
      waist: 74,
      hips: 96,
      thigh: 55,
      calf: 36,
      inseam: 79,
      outseam: 103,
      arm_length: 58,
      bicep: 29,
      wrist: 16,
    },
    skin_analysis: { monk_skin_tone: "MST-4", undertone: "Neutral" },
  },
  proportion_guides: [
    {
      mapping: "SHOULDERS -> WAIST",
      title: "Easy, elongated looks",
      tip: "Wear softly structured or wrap tops that follow your shoulder line and taper neatly into your natural waist.",
    },
    {
      mapping: "BUST -> WAIST",
      title: "Creating effortless outfits",
      tip: "Use V-neck or open-collar necklines in Deep Teal to create clean vertical space above the waist.",
    },
    {
      mapping: "WAIST -> HIPS",
      title: "Bringing your outfit together",
      tip: "Pair high-rise, straight-leg jeans in Olive with a tucked-in Camel blouse for a relaxed, put-together look.",
    },
    {
      mapping: "HIPS -> SHOULDERS",
      title: "Exploring outfit combinations",
      tip: "Keep visual detail near the neckline or collar to balance your hip curve with your upper frame.",
    },
    {
      mapping: "HEIGHT -> INSEAM",
      title: "Finding your ideal length",
      tip: "Anchor bottoms at your true waist and keep hem-to-shoe tones cohesive to visually lengthen your leg line.",
    },
  ],
  top_styling_levers: [
    {
      category: "Bottoms",
      title: "High-rise straight-leg bottoms",
      color: { name: "Olive", hex: "#6E6D4E" },
      short_tip: "Sit higher at the waist to create a clean line through your outfit and elongate your leg proportion.",
      size: 73,
      layers: [{ src: `${import.meta.env.BASE_URL}assets/brand/lever-trouser.png` }],
    },
    {
      category: "Tops",
      title: "Draped V-neck blouse",
      color: { name: "Deep Teal", hex: "#475E61" },
      short_tip: "Frames your collarbone and tapers smoothly into the waist without adding volume.",
      size: 72.521,
      layers: [{ src: `${import.meta.env.BASE_URL}assets/brand/lever-top.png` }],
    },
    {
      category: "Footwear",
      title: "Pointed-toe shoes",
      color: { name: "Camel", hex: "#A9896D" },
      short_tip: "Extends the vertical line from your hem to the floor for a sleeker silhouette.",
      size: 71,
      layers: [{ src: `${import.meta.env.BASE_URL}assets/brand/lever-shoe.png` }],
    },
  ],
};

const { height, body_measurements: bm } = stub.user_profile;

const ROWS = [
  { id: "height", label: "Height", value: height.value },
  { id: "neck", label: "Neck", value: bm.neck },
  { id: "shoulder_width", label: "Shoulders", value: bm.shoulder_width },
  { id: "chest_bust", label: "Bust", value: bm.chest_bust },
  { id: "underbust", label: "Underbust", value: bm.underbust },
  { id: "waist", label: "Waist", value: bm.waist },
  { id: "hips", label: "Hips", value: bm.hips },
  { id: "thigh", label: "Thigh", value: bm.thigh },
  { id: "calf", label: "Calf", value: bm.calf },
  { id: "inseam", label: "Inseam", value: bm.inseam },
  { id: "outseam", label: "Outseam", value: bm.outseam },
  { id: "arm_length", label: "Arm length", value: bm.arm_length },
  { id: "bicep", label: "Bicep", value: bm.bicep },
  { id: "wrist", label: "Wrist", value: bm.wrist },
];
const VALUES = Object.fromEntries(ROWS.map((r) => [r.id, r.value]));

const ACTIONS = ["Look longer", "Balance Width", "Add Volume", "Reduce Volume"];

const MAPPING_KEYS = {
  shoulder_width: "SHOULDERS -> WAIST",
  chest_bust: "BUST -> WAIST",
  hips: "WAIST -> HIPS",
  height: "HEIGHT -> INSEAM",
  inseam: "HEIGHT -> INSEAM",
};

export default function FitAnalysisScreen() {
  const [hoverAll, setHoverAll] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [toggled, setToggled] = useState(false);
  const [hoveredLever, setHoveredLever] = useState(null); // Tracks hovered styling lever

  const active = hovered ?? selected;
  const showAll = hoverAll || toggled || active !== null;

  const toggleMark = (id) => setSelected((cur) => (cur === id ? null : id));

  const activeMappingKey = MAPPING_KEYS[active];
  const matchedGuide = stub.proportion_guides.find((g) => g.mapping === activeMappingKey);

  let info;
  if (hoveredLever) {
    info = (
      <>
        <span className="fit__tag">{hoveredLever.category.toUpperCase()} LEVER</span>
        <div className="fit__info-text">
          <p className="fit__info-title">{hoveredLever.title}</p>
          <p className="fit__info-copy">{hoveredLever.short_tip}</p>
        </div>
      </>
    );
  } else if (matchedGuide) {
    info = (
      <>
        <span className="fit__tag">{matchedGuide.mapping}</span>
        <div className="fit__info-text">
          <p className="fit__info-title">{matchedGuide.title}</p>
          <p className="fit__info-copy">{matchedGuide.tip}</p>
        </div>
      </>
    );
  } else if (showAll) {
    info = (
      <>
        <span className="fit__tag">MEASUREMENTS</span>
        <ul className="fit__grid">
          {ROWS.map((r) => (
            <li key={r.id} className={r.id === active ? "is-active" : undefined}>
              <span>{r.label}</span>
              <span>{r.value} cm</span>
            </li>
          ))}
        </ul>
      </>
    );
  } else {
    info = (
      <>
        <span className="fit__tag">FIT ANALYSIS</span>
        <div className="fit__info-text">
          <p className="fit__info-title">Your fit, mapped out.</p>
          <p className="fit__info-copy">
            Your scan is complete. Explore the outlines on your silhouette to discover how your body
            proportions work together and what they mean for your fit.
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="screen fit">
      <AppHeader />
      <div className="fit__content">
        <h1 className="title title--h4">Fit Analysis</h1>
        <div className="fit__card">
          <div className="fit__intro">
            <p className="fit__intro-title">See what loves you back</p>
            <p className="fit__intro-copy">
              Here’s how your measurements and proportions work together, and what they mean for
              your fit.
            </p>
          </div>

          <div className="fit__row">
            <SilhouetteMeasurements
              values={VALUES}
              height={height.value}
              active={active}
              showAll={showAll}
              // onHoverAll={setHoverAll}
              onHoverMark={setHovered}
              onSelectMark={toggleMark}
              onToggleAll={() => setToggled((t) => !t)}
            />

            <div className="fit__side">
              <div className="fit__info">
                <div className="fit__info-body">{info}</div>
              </div>
              <div className="fit__levers">
                <p className="fit__levers-title">Styling Levers</p>
                {stub.top_styling_levers.map((l) => (
                  <StylingLever
                    key={l.title}
                    {...l}
                    // onMouseEnter={() => setHoveredLever(l)}
                    // onMouseLeave={() => setHoveredLever(null)}
                  />
                ))}
              </div>
            </div>
          </div>

          <span className="fit__tick" style={{ left: 289 }} />
          <span className="fit__tick" style={{ left: 516 }} />
          <span className="fit__tick" style={{ left: 785 }} />

          <div className="fit__actions">
            {ACTIONS.map((a) => (
              <button key={a} type="button" className="fit__action">
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}