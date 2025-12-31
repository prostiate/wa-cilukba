import React from "react";
import { usePrivacy } from "../../context/PrivacyContext";

interface AvatarProps {
  src: string;
  size?: "xs" | "sm" | "md" | "lg";
  blurOverride?: boolean; // If provided, controls blurring. If undefined, uses global default logic
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  size = "md",
  blurOverride,
}) => {
  const { settings } = usePrivacy();

  // If override is passed, use it. Otherwise assume generic blur setting (which we've removed in favor of explicit, but good for fallback)
  const shouldBlur = blurOverride !== undefined ? blurOverride : false;

  const isBlurred = settings.enableExtension && shouldBlur;
  const canHover = settings.enableExtension && settings.hoverToReveal;

  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={`relative overflow-hidden rounded-full flex-shrink-0 bg-gray-300 ${sizeClasses[size]}`}
    >
      <img
        src={src}
        alt="Avatar"
        className={`w-full h-full object-cover transition-all duration-300 
          ${isBlurred ? "filter blur-[5px]" : ""} 
          ${isBlurred && canHover ? "hover:blur-0" : ""}`}
      />
    </div>
  );
};
