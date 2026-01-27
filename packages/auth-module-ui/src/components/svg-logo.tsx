import React from "react";
import { FlexBox } from "nettle-design/src";

interface LogoProps {
  size?: number;
  iconColor?: string;
  textColor?: string;
  className?: string;
}

const NettleLogo = ({
  size = 24,
  iconColor = "#D6B081",
  textColor = "#FFFFFF",
  className,
}: LogoProps) => {
  return (
    <FlexBox alignItems="center" className={className} style={{ gap: "12px" }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 3.674 6.686 L 3.674 14.62 L 5.657 14.62 L 5.657 10.359 L 18 18 L 18 0.294 L 2.718 0.294 L 5.951 2.278 L 16.09 2.278 L 16.09 14.4 Z"
          fill={iconColor}
        />
        <path
          d="M 14.327 11.314 L 14.327 3.38 L 12.343 3.38 L 12.343 7.641 L 0 0 L 0 17.706 L 15.282 17.706 L 12.049 15.722 L 1.91 15.722 L 1.91 3.6 Z"
          fill={iconColor}
        />
      </svg>
      <svg
        height={size * 0.9}
        viewBox="0 0 85 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 41.585 1.006 L 56.933 1.006 L 56.933 4.176 L 52.88 4.176 L 52.88 17.67 L 49.597 17.67 L 49.597 4.176 L 46.646 4.176 Z M 42.687 3.542 L 43.699 4.176 L 38.383 4.176 L 38.383 17.67 L 35.1 17.67 L 35.1 4.176 L 31.206 4.176 L 31.206 1.006 L 38.638 1.006 Z M 3.745 17.67 L 0.416 17.67 L 0.416 0.349 L 0.552 0.349 L 12.19 11.398 L 12.122 1.006 L 15.428 1.006 L 15.428 18.349 L 15.337 18.349 L 3.677 7.481 Z M 29.116 4.176 L 21.033 4.176 L 21.033 7.73 L 28.188 7.73 L 28.188 10.9 L 21.033 10.9 L 21.033 14.5 L 29.433 14.5 L 29.433 17.67 L 17.75 17.67 L 17.75 1.006 L 29.116 1.006 Z M 59.117 1.006 L 62.4 1.006 L 62.4 14.5 L 70.234 14.5 L 70.234 17.67 L 59.117 17.67 Z M 83.757 4.176 L 75.674 4.176 L 75.674 7.73 L 82.829 7.73 L 82.829 10.9 L 75.674 10.9 L 75.674 14.5 L 84.074 14.5 L 84.074 17.67 L 72.391 17.67 L 72.391 1.006 L 83.757 1.006 Z"
          fill={textColor}
        />
      </svg>
    </FlexBox>
  );
};

export default NettleLogo;
