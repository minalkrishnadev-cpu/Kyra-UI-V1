import { useEffect, useRef } from "react";
import { useHandTracking } from "../context/HandTrackingContext.jsx";

/**
 * Subscribe a screen to the shared hand detector (it lives in <HandTrackingProvider>,
 * so nothing reloads when you navigate).
 *
 *   const { status } = useHandPointer({
 *     onPinch: ({ x, y }) => { ... },       // viewport pixels, fires once per pinch
 *     onFrame: ({ landmarks }) => { ... },  // every new camera frame; landmarks is null if no hand
 *   });
 */
export function useHandPointer({ onPinch, onFrame } = {}) {
  const { register, registerFrame, status } = useHandTracking();
  const pinchRef = useRef(onPinch);
  const frameRef = useRef(onFrame);
  pinchRef.current = onPinch;
  frameRef.current = onFrame;

  useEffect(() => register((p) => pinchRef.current?.(p)), [register]);
  useEffect(() => registerFrame((f) => frameRef.current?.(f)), [registerFrame]);

  return { status };
}