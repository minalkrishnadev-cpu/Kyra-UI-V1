import { useEffect, useRef, useState } from "react";

const SpeechRecognition =
  typeof window !== "undefined" ? window.SpeechRecognition || window.webkitSpeechRecognition : null;

/**
 * Live voice-to-text using the browser's Web Speech API (Chrome / Edge).
 * Starts listening on mount. Once the person has spoken, 3 seconds of silence
 * ends the session and calls onDone(text).
 *
 * Returns:
 *   finalText  words the recogniser is sure about
 *   interim    words still being worked out (show dimmer)
 *   status     "starting" | "listening" | "done" | "error" | "unsupported"
 *   error      null | "no-speech" | "not-allowed" | "audio-capture" | "network" | "other"
 */
export function useSpeechToText({
  lang = typeof navigator !== "undefined" ? navigator.language || "en-US" : "en-US",
  silenceMs = 3000,   // silence after speech that counts as "finished"
  noSpeechMs = 10000, // nobody has spoken yet: show a hint (keeps listening)
  onDone,
} = {}) {
  const [finalText, setFinalText] = useState("");
  const [interim, setInterim] = useState("");
  const [status, setStatus] = useState(SpeechRecognition ? "starting" : "unsupported");
  const [error, setError] = useState(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (!SpeechRecognition) return;

    let rec = null;
    let stopped = false;
    let heard = false;
    let finalAcc = "";
    let interimNow = "";
    let silenceTimer = 0;
    let noSpeechTimer = 0;

    const clearTimers = () => {
      clearTimeout(silenceTimer);
      clearTimeout(noSpeechTimer);
    };

    const finish = () => {
      if (stopped) return;
      stopped = true;
      clearTimers();
      try {
        rec.stop();
      } catch {}
      const text = `${finalAcc} ${interimNow}`.replace(/\s+/g, " ").trim();
      setFinalText(text);
      setInterim("");
      setStatus("done");
      onDoneRef.current?.(text);
    };

    const fail = (code) => {
      if (stopped) return;
      stopped = true;
      clearTimers();
      setError(code);
      setStatus("error");
    };

    const start = () => {
      rec = new SpeechRecognition();
      rec.lang = lang;
      rec.continuous = true;
      rec.interimResults = true;

      rec.onstart = () => setStatus((s) => (s === "starting" ? "listening" : s));

      rec.onresult = (event) => {
        let interimStr = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) finalAcc += `${result[0].transcript} `;
          else interimStr += result[0].transcript;
        }
        interimNow = interimStr;
        heard = true;
        setError(null);
        setFinalText(finalAcc.trim());
        setInterim(interimStr);

        // every new word restarts the 3-second silence countdown
        clearTimeout(noSpeechTimer);
        clearTimeout(silenceTimer);
        silenceTimer = setTimeout(finish, silenceMs);
      };

      rec.onerror = (e) => {
        if (e.error === "no-speech" || e.error === "aborted") return; // onend restarts
        if (e.error === "not-allowed" || e.error === "service-not-allowed") return fail("not-allowed");
        if (e.error === "audio-capture") return fail("audio-capture");
        if (e.error === "network") return fail("network");
        console.warn("[speech] error:", e.error);
        fail("other");
      };

      // Chrome ends a session on its own after a pause or about a minute: keep going.
      rec.onend = () => {
        if (stopped) return;
        setTimeout(() => {
          if (stopped) return;
          try {
            rec.start();
          } catch {}
        }, 150);
      };

      try {
        rec.start();
      } catch (err) {
        console.warn("[speech] could not start:", err);
        fail("other");
      }
    };

    start();
    noSpeechTimer = setTimeout(() => {
      if (!heard && !stopped) setError("no-speech");
    }, noSpeechMs);

    return () => {
      stopped = true;
      clearTimers();
      try {
        rec?.abort();
      } catch {}
    };
  }, [lang, silenceMs, noSpeechMs]);

  return { finalText, interim, status, error, supported: !!SpeechRecognition };
}