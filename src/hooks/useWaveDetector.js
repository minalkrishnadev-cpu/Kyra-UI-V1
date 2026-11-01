import { useRef } from "react";
import { useHandPointer } from "./useHandPointer.js";

/**
 * Calls onWave() when the hand swings left-right-left (or right-left-right).
 *
 * swings:    direction changes needed
 * minTravel: how far (fraction of the camera width) the wrist must move to count a swing
 * windowMs:  all swings must happen within this time
 */
export function useWaveDetector(onWave, { swings = 2, minTravel = 0.08, windowMs = 2000 } = {}) {
  const s = useRef({ dir: 0, extreme: null, times: [], fired: false });
  const cb = useRef(onWave);
  cb.current = onWave;

  const reset = () => {
    s.current.dir = 0;
    s.current.extreme = null;
    s.current.times = [];
  };

  const registerSwing = () => {
    const now = performance.now();
    const st = s.current;
    st.times = [...st.times.filter((t) => now - t < windowMs), now];
    if (st.times.length >= swings && !st.fired) {
      st.fired = true;
      reset();
      cb.current?.();
    }
  };

  const { status } = useHandPointer({
    onFrame: ({ landmarks }) => {
      const st = s.current;
      if (!landmarks) return reset();

      const x = landmarks[0].x; // wrist
      if (st.extreme === null) {
        st.extreme = x;
        return;
      }

      if (st.dir === 0) {
        if (Math.abs(x - st.extreme) > minTravel) {
          st.dir = x > st.extreme ? 1 : -1;
          st.extreme = x;
        }
      } else if (st.dir === 1) {
        if (x > st.extreme) st.extreme = x;
        else if (st.extreme - x > minTravel) {
          registerSwing();
          st.dir = -1;
          st.extreme = x;
        }
      } else {
        if (x < st.extreme) st.extreme = x;
        else if (x - st.extreme > minTravel) {
          registerSwing();
          st.dir = 1;
          st.extreme = x;
        }
      }
    },
  });

  return { status };
}