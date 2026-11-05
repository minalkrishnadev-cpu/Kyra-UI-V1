import { useNavigate } from "react-router-dom";
import CameraGuide from "../../components/CameraGuide.jsx";
import CameraFeed from "../../components/CameraFeed.jsx";
import { useCamera } from "../../context/CameraContext.jsx";
import { useBodyScan } from "../../hooks/useBodyScan.js";

// Messages reuse the wording of the Too Far / Out of Frame / Multiple Faces / Too Close screens.
const COPY = {
  loading: { title: "Getting ready…" },
  "no-person": {
    title: "Out of frame!",
    body: "Please adjust your position until your full body is visible in the mirror.",
  },
  "out-of-frame": {
    title: "Out of frame!",
    body: "Please adjust your position until your full body is visible in the mirror.",
  },
  "too-far": {
    title: "Too far!",
    body: "Please step closer. You’re a little far away for me to see you clearly.",
  },
  "too-close": {
    title: "Too close!",
    body: "Please step back. Move back gently until you’re standing on the marked line.",
  },
  multiple: {
    title: "Multiple Faces Found",
    body: "Please ensure only one person is in the frame to continue.",
  },
};

/**
 * Figma: Analysis / "Hold still" (2043:18550)
 * Shows the live camera, guides the person until their full body is in frame,
 * counts 3, 2, 1, then takes a photo and moves on.
 */
export default function HoldStillScreen() {
  const navigate = useNavigate();
  const { videoRef, streamRef } = useCamera();

//   const { state, count, error } = useBodyScan({
//     videoRef,
//     // The photo is passed to the next screen in memory only; it is not saved anywhere.
//     // TODO: point this at the Colour Result screen once it exists.
//     onCapture: (photo) => navigate("/analysis/result", { state: { photo } }),
//   });
const { state, count, error } = useBodyScan({
    videoRef,
    onCapture: async (photo) => {
      try {
        // 1. Ensure we have a Blob/File object ready for FormData
        let imageBlob = photo;
        if (!(photo instanceof Blob) && typeof photo === "string") {
          const res = await fetch(photo);
          imageBlob = await res.blob();
        }

        // 2. Build FormData to match FastAPI's UploadFile expectation
        const formData = new FormData();
        formData.append("image", imageBlob, `body-scan-${Date.now()}.jpg`);

        // 3. Call the FastAPI POST endpoint
        const response = await fetch("http://localhost:5055/analyze", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Analysis failed: ${response.statusText}`);
        }

        const analysisResult = await response.json();
        console.info("Analysis success:", analysisResult);

        // 4. Convert to Data URL for preview and download
        const reader = new FileReader();
        reader.onloadend = () => {
          const photoDataUrl = reader.result;

          // Trigger download
          const link = document.createElement("a");
          link.href = photoDataUrl;
          link.download = `body-scan-${Date.now()}.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // 5. Navigate to the result screen, passing both the photo and analysis result via router state
          navigate("/welcome/looking-for-today/surpriseme/analysis/holdstill/analysisres", {
            state: { 
              photo: photoDataUrl, 
              result: analysisResult 
            }
          });
        };
        reader.readAsDataURL(imageBlob);

      } catch (err) {
        console.error("Error processing or uploading body scan:", err);
      }
    },
  });
  const inPosition = state === "hold" || state === "countdown" || state === "captured";

  let content;
  if (inPosition) {
    // Figma "Hold still": 110px title in a 791px box, 120px gap, then the green check.
    // During the countdown the check becomes the 3, 2, 1 in a matching circle.
    content = {
      title: "Great, hold still!",
      titleHeight: 256,
      contentWidth: 791,
      gap: 120,
      bracketsSrc: "/assets/brand/viewfinder.png",
      badge:
        state === "countdown" ? (
          <div className="camera-guide__count">{count}</div>
        ) : (
          <img className="camera-guide__badge" src="/assets/analysis/check-circle.svg" alt="" />
        ),
    };
  } else if (state === "error") {
    content = { title: "Camera check unavailable", body: error };
  } else {
    content = COPY[state] ?? COPY.loading;
  }

  return (
    <CameraGuide
      background={<CameraFeed streamRef={streamRef} />}
      // darker while giving instructions (as designed), lighter once you are in position
      overlayOpacity={inPosition ? 0.3 : 0.66}
      {...content}
    />
  );
}