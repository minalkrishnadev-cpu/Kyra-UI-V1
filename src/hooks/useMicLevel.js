import { useEffect } from "react";

/**
 * Measures microphone loudness and writes it to a CSS variable (--level, 0 to 1)
 * on the element in `targetRef`. It never re-renders React, so the animation stays smooth.
 *
 *   const ref = useRef(null);
 *   useMicLevel(ref, { active: true });
 *   <div ref={ref} style={{ transform: "scale(calc(1 + var(--level) * 0.5))" }} />
 */
export function useMicLevel(targetRef, { active = true, noiseFloor = 0.015, range = 0.12 } = {}) {
  useEffect(() => {
    const setLevel = (v) => targetRef.current?.style.setProperty("--level", v.toFixed(3));
    setLevel(0);
    if (!active || !navigator.mediaDevices?.getUserMedia) return;

    let cancelled = false;
    let raf = 0;
    let stream = null;
    let ctx = null;

    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: true, noiseSuppression: true },
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === "suspended") await ctx.resume().catch(() => {});

        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        ctx.createMediaStreamSource(stream).connect(analyser);
        const data = new Uint8Array(analyser.fftSize);
        let level = 0;

        const tick = () => {
          if (cancelled) return;
          analyser.getByteTimeDomainData(data);
          let sum = 0;
          for (let i = 0; i < data.length; i++) {
            const v = (data[i] - 128) / 128;
            sum += v * v;
          }
          const rms = Math.sqrt(sum / data.length);
          const target = Math.min(1, Math.max(0, (rms - noiseFloor) / range));
          // rise quickly, fall slowly: feels natural
          level += (target - level) * (target > level ? 0.5 : 0.08);
          setLevel(level);
          raf = requestAnimationFrame(tick);
        };
        tick();
      } catch (err) {
        // Permission problems are already reported by the speech hook.
        console.warn("[mic level] unavailable:", err?.name || err);
      }
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      stream?.getTracks().forEach((t) => t.stop());
      ctx?.close().catch(() => {});
      setLevel(0);
    };
  }, [targetRef, active, noiseFloor, range]);
}