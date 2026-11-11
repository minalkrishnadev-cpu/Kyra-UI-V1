import AppHeader from "./AppHeader.jsx";
import "./CameraGuide.css";

/**
 * Shared layout for the camera-positioning screens (Too far, Out of frame,
 * Multiple faces, Too close, Hold still). Figma: frame "Too Far" / "Hold still".
 * A dark overlay sits over the camera view; the red brackets frame the person.
 *
 * background:     optional live camera element, drawn under the overlay
 * overlayOpacity: 0.66 matches the design; lower it to see the person more clearly
 * bracketsSrc:    red corners by default; the "Hold still" design uses green
 * badge:          optional element under the text (the green check, or the countdown circle)
 */
 //bracketsSrc: `${import.meta.env.BASE_URL}/assets/brand/greenframe.png`,
export default function CameraGuide({
  title,
  body,
  titleSize,
  titleHeight,
  contentWidth,
  gap,
  badge,
   //bracketsSrc: /assets/brand/greenframe.png`,
  bracketsSrc = `${import.meta.env.BASE_URL}/assets/brand/viewfinder.png`,
  background,
  overlayOpacity = 0.66,
}) {
  return (
    <div className="screen camera-guide">
      {background}
      <div className="camera-guide__overlay" style={{ opacity: overlayOpacity }} />
      <div className="camera-guide__header">
        <AppHeader />
      </div>

      <div className="camera-guide__frame">
        <div className="camera-guide__brackets">
          <img src={bracketsSrc} alt="" />
        </div>

        <div
          className="camera-guide__content"
          style={{ ...(contentWidth && { width: contentWidth }), ...(gap != null && { gap }) }}
        >
          <h1
            className="camera-guide__title"
            style={{
              ...(titleSize && { fontSize: titleSize }),
              ...(titleHeight && { height: titleHeight, overflow: "hidden" }),
            }}
          >
            {title}
          </h1>
          {body && <p className="camera-guide__body">{body}</p>}
          {badge}
        </div>
      </div>
    </div>
  );
}