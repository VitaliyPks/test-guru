import { useEffect, useState } from "react";

import "./ProgressBar.scss";

interface IProgressBarProps {
  isLoading: boolean;
}

export const ProgressBar = ({ isLoading }: IProgressBarProps) => {
  const base = "progress-bar";
  const [progress, setProgress] = useState(0);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    let interval;

    if (isLoading || showBar) {
      let multiplier = 1;
      setShowBar(true);

      interval = setInterval(() => {
        if (progress >= 100) {
          setShowBar(false);
          setProgress(0);
          clearInterval(interval);
        } else {
          if (!isLoading) {
            multiplier = 10;
          }

          if (progress < 80 || !isLoading) {
            const value = Math.floor((Math.random() * 10) / 2) * multiplier;

            setProgress((prev) => prev + (value ? value : 1));
          }
        }
      }, 300);
    }

    return () => clearInterval(interval);
  }, [progress, showBar, isLoading]);

  if (!showBar) return null;

  return (
    <div className={base}>
      <div className={`${base}__bar`} style={{ width: `${progress}%` }} />
    </div>
  );
};
