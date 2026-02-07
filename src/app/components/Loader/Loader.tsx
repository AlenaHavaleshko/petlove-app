import { useEffect, useState } from "react";
import css from "./Loader.module.css";
import { useLoader } from "../../../context/useLoader";

function Loader() {
  const [progress, setProgress] = useState(0);
  const { hideLoader } = useLoader();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            hideLoader();
          }, 300);
          return 100;
        }
        return prev + 5;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [hideLoader]);

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={css.loader_backdrop}>
      <div className={css.loader_container}>
        <div className={css.circle_wrapper}>
          <svg className={css.progress_ring} width="280" height="280">
            <circle
              className={css.progress_ring_circle_bg}
              stroke="rgba(84, 190, 241, 0.1)"
              strokeWidth="8"
              fill="transparent"
              r="90"
              cx="140"
              cy="140"
            />
            <circle
              className={css.progress_ring_circle}
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="transparent"
              r="90"
              cx="140"
              cy="140"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9bd0f5" />
                <stop offset="100%" stopColor="#54bef1" />
              </linearGradient>
            </defs>
          </svg>
          <div className={css.loader_content}>
            <div className={css.loading_text}>Loading</div>
            <div className={css.percentage}>{progress}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
