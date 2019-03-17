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

const colors800 = [
  "#c62828",
  "#ad1457",
  "#6a1b9a",
  "#4527a0",
  "#283593",
  "#1565c0",
  "#0277bd",
  "#00838f",
  "#00695c",
  "#2e7d32",
  "#558b2f",
  "#9e9d24",
  "#f9a825",
  "#ff8f00",
  "#ef6c00",
  "#d84315",
  "#4e342e",
  "#424242",
  "#37474f"
];

const colors800Light = [
  "#ff5f52",
  "#e35183",
  "#9c4dcc",
  "#7953d2",
  "#5f5fc4",
  "#5e92f3",
  "#58a5f0",
  "#4fb3bf",
  "#439889",
  "#60ad5e",
  "#85bb5c",
  "#d2ce56",
  "#ffd95a",
  "#ffc046",
  "#ff9d3f",
  "#ff7543",
  "#7b5e57",
  "#6d6d6d",
  "#62727b"
];

const fromString = string => {
  if (!string) return "#000";

  return colors[string.length % colors.length];
};

const fromString800 = string => {
  if (!string) return "#000";

  return colors800[string.length % colors.length];
};

const gradientFromString = string => {
  const primary = colors800[string.length % colors.length];
  const secondary = colors800Light[string.length % colors.length];

  return `linear-gradient(315deg, ${primary} 0%, ${secondary} 74%)`;
};

export default {
  fromString,
  fromString800,
  gradientFromString
};
