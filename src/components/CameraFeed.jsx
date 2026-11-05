import { useEffect, useRef } from "react";

/** Shows the live camera as a mirror, using the stream CameraProvider already opened. */
export default function CameraFeed({ streamRef }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    let timer = 0;
    const attach = () => {
      if (!streamRef.current || !video) return false;
      video.srcObject = streamRef.current;
      video.play().catch(() => {});
      return true;
    };
    if (!attach()) {
      timer = setInterval(() => attach() && clearInterval(timer), 200);
    }
    return () => clearInterval(timer);
  }, [streamRef]);

  return <video ref={ref} className="camera-feed" autoPlay muted playsInline />;
}