import chroma from "chroma-js";
import sizes from "./sizes";

const styles = {
  ColorBox: {
    cursor: "pointer",
    display: "inline-block",
    height: (props) => (props.showingFullPalette ? "25%" : "50%"),
    margin: "0 auto",
    marginBottom: "-3.9px",
    position: "relative",
    width: "20%",
    "&:hover button": {
      opacity: 1,
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: (props) => (props.showingFullPalette ? "20%" : "33.3333%"),
    },
    [sizes.down("md")]: {
      width: "50%",
      height: (props) => (props.showingFullPalette ? "10%" : "20%"),
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: (props) => (props.showingFullPalette ? "5%" : "10%"),
    },
  },
  copyText: {
    color: (props) =>
      chroma(props.background).luminance() > 0.7 ? "black" : "white",
  },
  colorName: {
    color: (props) =>
      chroma(props.background).luminance() <= 0.08 ? "white" : "black",
  },
  seeMore: {
    background: "rgba(255, 255, 255, 0.3)",
    border: "none",
    bottom: "0px",
    color: (props) =>
      chroma(props.background).luminance() > 0.7 ? "rgba(0,0,0,0.4)" : "white",
    height: "30px",
    lineHeight: "30px",
    position: "absolute",
    right: "0px",
    textAlign: "center",
    textTransform: "uppercase",
    width: "60px",
  },
  copyButton: {
    background: "rgba(255, 255, 255, 0.3)",
    border: "none",
    color: (props) =>
      chroma(props.background).luminance() > 0.7 ? "black" : "white",
    cursor: "pointer",
    display: "inline-block",
    fontSize: "1rem",
    height: "30px",
    left: "50%",
    lineHeight: "30px",
    marginLeft: "-50px",
    marginTop: "-15px",
    opacity: 0,
    outline: "none",
    position: "absolute",
    textAlign: "center",
    textDecoration: "none",
    textTransform: "uppercase",
    top: "50%",
    width: "100px",
  },
  boxContent: {
    bottom: "0px",
    boxSizing: "border-box",
    color: "black",
    fontSize: "12px",
    left: "0px",
    letterSpacing: "1px",
    padding: "10px",
    position: "absolute",
    textTransform: "uppercase",
    width: "100%",
  },
  copyOverlay: {
    height: "100%",
    opacity: "0",
    transform: "scale(0.1)",
    transition: "transform 0.6s ease-in-out",
    width: "100%",
    zIndex: "0",
  },
  showOverlay: {
    opacity: "1",
    position: "absolute",
    transform: "scale(50)",
    zIndex: "10",
  },
  copyMessage: {
    alignItems: "center",
    bottom: "0",
    color: "white",
    display: "flex",
    flexDirection: "column",
    fontSize: "4rem",
    justifyContent: "center",
    left: "0",
    opacity: "0",
    position: "fixed",
    right: "0",
    textShadow: "0px 0px 2px rgba(0, 0, 0, 0.71)",
    top: "0",
    transform: "scale(0.1)",
    "& h1": {
      background: "rgba(255, 255, 255, 0.2)",
      fontWeight: "400",
      marginBottom: "0",
      padding: "1rem",
      textAlign: "center",
      textShadow: "1px 2px solid black",
      textTransform: "uppercase",
      width: "100%",
      [sizes.down("xs")]: {
        fontSize: "6rem",
      },
    },
    "& p": {
      fontSize: "2rem",
      fontWeight: "100",
    },
  },
  showCopyMessage: {
    opacity: "1",
    transform: "scale(1)",
    transitionDelay: "0.3s",
    transition: "all 0.4s ease-in-out",
    zIndex: "25",
  },
};

export default styles;
