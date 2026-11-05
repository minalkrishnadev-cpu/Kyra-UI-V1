import { useEffect, useRef, useState } from "react";
import { FilesetResolver, PoseLandmarker } from "@mediapipe/tasks-vision";

// Files served from /public (see setup steps in the README).
// const WASM_URL = "/mediapipe/wasm";
// const MODEL_URL = "/mediapipe/pose_landmarker_lite.task";
const WASM_URL = `${import.meta.env.BASE_URL}mediapipe/wasm`;
const MODEL_URL = `${import.meta.env.BASE_URL}mediapipe/pose_landmarker_lite.task`;
// ---- tuning knobs ----
const SCREEN_ASPECT = 1080 / 3840; // the camera feed is shown "cover" inside this portrait screen
const MIN_VISIBILITY = 0.5;        // how sure the model must be that a body point is visible
const EDGE_MARGIN = 0.01;          // body points this close to the edge count as cut off
const MIN_BODY_HEIGHT = 0.55;      // head-to-ankle height as a fraction of what is shown; lower = too far
const TOO_CLOSE_TORSO = 0.3;       // shoulders-to-hips height; bigger while cut off = too close
const SETTLE_MS = 400;             // a new verdict must hold this long before the message changes
const STILL_MS = 1000;             // full body must stay in position this long before counting down
const COUNT_FROM = 3;

const NOSE = 0, L_SHOULDER = 11, R_SHOULDER = 12, L_HIP = 23, R_HIP = 24, L_ANKLE = 27, R_ANKLE = 28;

async function assertServed(url) {
  let res;
  try {
    res = await fetch(url, { cache: "no-store" });
  } catch {
    throw new Error(`cannot reach ${url}`);
  }
  const type = res.headers.get("content-type") || "";
  if (!res.ok || type.includes("text/html")) throw new Error(`missing file: ${url} (HTTP ${res.status})`);
}

async function createLandmarker() {
  await assertServed(`${WASM_URL}/vision_wasm_internal.js`);
  await assertServed(MODEL_URL);
  const vision = await FilesetResolver.forVisionTasks(WASM_URL);
  const make = (delegate) =>
    PoseLandmarker.createFromOptions(vision, {
      baseOptions: { modelAssetPath: MODEL_URL, delegate },
      runningMode: "VIDEO",
      numPoses: 2, // 2 so we can notice a second person
    });
  try {
    return await make("GPU");
  } catch {
    return await make("CPU");
  }
}

/** Decide what to tell the person, based on one frame of pose landmarks. */
function judge(poses, video) {
  if (!poses || poses.length === 0) return "no-person";
  if (poses.length > 1) return "multiple";
  const lm = poses[0];

  // The part of the camera frame that is actually visible on the portrait screen.
  const videoAspect = (video.videoWidth || 4) / (video.videoHeight || 3);
  let x0 = 0, x1 = 1, y0 = 0, y1 = 1;
  if (videoAspect > SCREEN_ASPECT) {
    x0 = (1 - SCREEN_ASPECT / videoAspect) / 2;
    x1 = 1 - x0;
  } else {
    y0 = (1 - videoAspect / SCREEN_ASPECT) / 2;
    y1 = 1 - y0;
  }
  const nx = (p) => (p.x - x0) / (x1 - x0);
  const ny = (p) => (p.y - y0) / (y1 - y0);
  const inView = (p) =>
    (p.visibility ?? 1) > MIN_VISIBILITY &&
    nx(p) > EDGE_MARGIN && nx(p) < 1 - EDGE_MARGIN &&
    ny(p) > EDGE_MARGIN && ny(p) < 1 - EDGE_MARGIN;

  const head = lm[NOSE], lA = lm[L_ANKLE], rA = lm[R_ANKLE];
  const fullBodyShown = inView(head) && inView(lA) && inView(rA);

  if (!fullBodyShown) {
    const shoulderY = (ny(lm[L_SHOULDER]) + ny(lm[R_SHOULDER])) / 2;
    const hipY = (ny(lm[L_HIP]) + ny(lm[R_HIP])) / 2;
    return hipY - shoulderY > TOO_CLOSE_TORSO ? "too-close" : "out-of-frame";
  }

  const bodyHeight = (ny(lA) + ny(rA)) / 2 - ny(head);
  return bodyHeight < MIN_BODY_HEIGHT ? "too-far" : "ok";
}

/**
 * Guides someone into position, counts down, and takes a photo.
 *
 * state: "loading" | "no-person" | "out-of-frame" | "too-far" | "too-close" | "multiple"
 *        | "hold" (in position, waiting a moment) | "countdown" | "captured" | "error"
 * count: 3, 2, 1 during the countdown, otherwise null
 * onCapture(photoDataUrl): called once with a JPEG data URL
 */
export function useBodyScan({ videoRef, onCapture, enabled = true }) {
  const [state, setState] = useState("loading");
  const [count, setCount] = useState(null);
  const [error, setError] = useState(null);
  const captureRef = useRef(onCapture);
  captureRef.current = onCapture;

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let raf = 0;
    let landmarker = null;
    let lastVideoTime = -1;

    let committed = "loading";
    let pending = "loading";
    let pendingSince = 0;
    let phase = "guiding"; // guiding | countdown | captured
    let okSince = null;
    let countStart = 0;

    const getVideo = () =>
      videoRef?.current ?? Array.from(document.querySelectorAll("video")).find((v) => v.srcObject) ?? null;

    const capture = (video) => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      phase = "captured";
      setCount(null);
      setState("captured");
      captureRef.current?.(canvas.toDataURL("image/jpeg", 0.92));
    };

    const tick = () => {
      if (cancelled || phase === "captured") return;
      const video = getVideo();

      if (video && video.readyState >= 2 && video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;
        const now = performance.now();
        const verdict = judge(landmarker.detectForVideo(video, now).landmarks, video);

        if (verdict !== pending) {
          pending = verdict;
          pendingSince = now;
        }
        if (pending !== committed && now - pendingSince >= SETTLE_MS) committed = pending;

        if (phase === "guiding") {
          if (committed === "ok") {
            setState("hold");
            okSince = okSince ?? now;
            if (now - okSince >= STILL_MS) {
              phase = "countdown";
              countStart = now;
              setState("countdown");
              setCount(COUNT_FROM);
            }
          } else {
            okSince = null;
            setState(committed);
          }
        } else if (phase === "countdown") {
          if (committed !== "ok") {
            // they moved out of position: cancel and guide again
            phase = "guiding";
            okSince = null;
            setCount(null);
            setState(committed);
          } else {
            const n = COUNT_FROM - Math.floor((now - countStart) / 1000);
            if (n <= 0) {
              capture(video);
              return;
            }
            setCount(n);
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    (async () => {
      try {
        const lmk = await createLandmarker();
        if (cancelled) {
          lmk.close();
          return;
        }
        landmarker = lmk;
        tick();
      } catch (err) {
        console.error("[body scan] startup failed:", err);
        setError(err.message);
        setState("error");
      }
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      landmarker?.close();
    };
  }, [videoRef, enabled]);

  return { state, count, error };
}