const colors = [
  "#ff1744",
  "#f50057",
  "#d500f9",
  "#d500f9",
  "#3d5afe",
  "#2979ff",
  "#00b0ff",
  "#00e5ff",
  "#1de9b6",
  "#00e676",
  "#76ff03",
  "#c6ff00",
  "#ffea00",
  "#ffc400",
  "#ff9100",
  "#ff3d00"
];

const fromString = string => {
  if (!string) return "#000";

  return colors[string.length % colors.length];
};

export default {
  fromString
};
