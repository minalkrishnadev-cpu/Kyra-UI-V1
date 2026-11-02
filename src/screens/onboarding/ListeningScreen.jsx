// import AppHeader from "../../components/AppHeader.jsx";
// import "./ListeningScreen.css";

// /** Figma: Onboarding / "Catagories" (2043:13036). The Kyra mark animates while listening. */
// export default function ListeningScreen() {
//   return (
//     <div className="screen">
//       <AppHeader />
//       <div className="screen__content">
//         <h1 className="title title--h4">Listening</h1>
//       </div>
//       <div className="listening__kyra">
//         <img src="/assets/brand/kyra-talking.png" alt="" />
//       </div>
//     </div>
//   );
// }
// import AppHeader from "../../components/AppHeader.jsx";
// import { useSpeechToText } from "../../hooks/useSpeechToText.js";
// import "./ListeningScreen.css";

// const MESSAGES = {
//   unsupported: "Voice input isn’t supported in this browser. Please use Chrome or Edge.",
//   "not-allowed": "Microphone access is blocked. Please allow the microphone and try again.",
//   "audio-capture": "I can’t find a microphone. Please check it’s connected.",
//   network: "Voice recognition needs an internet connection.",
//   other: "Something went wrong with voice input. Please try again.",
//   "no-speech": "I can’t hear you yet. Try speaking a little louder.",
// };

// /** Figma: Onboarding / "Catagories" (2043:13036). The Kyra mark animates while listening. */
// export default function ListeningScreen() {
//   const { finalText, interim, status, error } = useSpeechToText({
//     // 3 seconds of silence after speaking: input is done.
//     onDone: (text) => {
//       console.log("Voice input:", text);
//       // TODO: send `text` to search / the next screen.
//     },
//   });

//   const message = status === "unsupported" ? MESSAGES.unsupported : error && MESSAGES[error];

//   return (
//     <div className="screen">
//       <AppHeader />
//       <div className="screen__content">
//         <h1 className="title title--h4">Listening</h1>
//       </div>
//       <div className="listening__kyra">
//         <img src="/assets/brand/kyra-talking.png" alt="" />
//       </div>

//       <div className="listening__transcript" aria-live="polite">
//         <p className="listening__text">
//           {finalText}
//           {interim && <span className="listening__interim"> {interim}</span>}
//         </p>
//         {message && <p className="listening__hint">{message}</p>}
//       </div>
//     </div>
//   );
// }
import { useRef } from "react";
import AppHeader from "../../components/AppHeader.jsx";
import { useSpeechToText } from "../../hooks/useSpeechToText.js";
import { useMicLevel } from "../../hooks/useMicLevel.js";
import "./ListeningScreen.css";

const MESSAGES = {
  unsupported: "Voice input isn’t supported in this browser. Please use Chrome or Edge.",
  "not-allowed": "Microphone access is blocked. Please allow the microphone and try again.",
  "audio-capture": "I can’t find a microphone. Please check it’s connected.",
  network: "Voice recognition needs an internet connection.",
  other: "Something went wrong with voice input. Please try again.",
  "no-speech": "I can’t hear you yet. Try speaking a little louder.",
};

/** Figma: Onboarding / "Catagories" (2043:13036). The Kyra mark animates while listening. */
export default function ListeningScreen() {
  const kyraRef = useRef(null);

  const { finalText, interim, status, error } = useSpeechToText({
    // 3 seconds of silence after speaking: input is done.
    onDone: (text) => {
      console.log("Voice input:", text);
      // TODO: send `text` to search / the next screen.
    },
  });

  // Drives the rings and glow: louder voice = bigger and brighter.
  const listening = status === "starting" || status === "listening";
  useMicLevel(kyraRef, { active: listening });

  const message = status === "unsupported" ? MESSAGES.unsupported : error && MESSAGES[error];

  return (
    <div className="screen">
      <AppHeader />
      <div className="screen__content">
        <h1 className="title title--h4">Listening</h1>
      </div>

      <div ref={kyraRef} className={`listening__kyra${listening ? "" : " is-idle"}`}>
        <span className="listening__idle">
          <span className="listening__ring listening__ring--breathe" />
        </span>
        <span className="listening__ring listening__ring--1" />
        <span className="listening__ring listening__ring--2" />
        <span className="listening__ring listening__ring--3" />
        <span className="listening__glow" />
        <img src="/assets/brand/kyra-talking.png" alt="" />
      </div>

      <div className="listening__transcript" aria-live="polite">
        <p className="listening__text">
          {finalText}
          {interim && <span className="listening__interim"> {interim}</span>}
        </p>
        {message && <p className="listening__hint">{message}</p>}
      </div>
    </div>
  );
}