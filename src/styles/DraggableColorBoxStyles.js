import chroma from "chroma-js";
import sizes from "./sizes";

export default {
  root: {
    cursor: "pointer",
    display: "inline-block",
    height: "25%",
    margin: "0 auto",
    marginBottom: "-5.6px",
    position: "relative",
    width: "20%",
    "&:hover svg": {
      color: "white",
      transform: "scale(1.25)",
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: "20%",
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "10%",
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: "5%",
    },
  },
  boxContent: {
    bottom: "0px",
    boxSizing: "border-box",
    color: (props) =>
      chroma(props.color).luminance() <= 0.08
        ? "rgba(255, 255, 255, 0.8)"
        : "rgba(0, 0, 0, 0.5)",
    display: "flex",
    fontSize: "12px",
    justifyContent: "space-between",
    left: "0px",
    letterSpacing: "1px",
    padding: "10px",
    position: "absolute",
    textTransform: "uppercase",
    width: "100%",
  },
  deleteIcon: {
    transition: "all 0.3s ease-in-out",
  },
};
