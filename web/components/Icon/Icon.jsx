const iconSizes = { large: "30", medium: "24", small: "18" };

export function Icon({ size = "medium", source: Source }) {
  return <Source fontSize={iconSizes[size] || iconSizes.medium} />;
}
