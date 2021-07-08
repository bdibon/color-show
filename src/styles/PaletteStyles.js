import sizes from "./sizes";

const styles = {
  Palette: {
    height: "100vh",
  },
  colors: {
    height: "90%",
  },
  goBack: {
    backgroundColor: "black",
    cursor: "pointer",
    display: "inline-block",
    height: "50%",
    margin: "0 auto",
    marginBottom: " -3.9px",
    position: "relative",
    width: "20%",
    "& a": {
      background: "rgba(255, 255, 255, 0.3)",
      border: "none",
      color: "white",
      cursor: "pointer",
      display: "inline-block",
      fontSize: "1rem",
      height: "30px",
      left: "50%",
      lineHeight: "30px",
      marginLeft: "-50px",
      marginTop: "-15px",
      outline: "none",
      position: "absolute",
      textAlign: "center",
      textDecoration: "none",
      textTransform: "uppercase",
      top: "50%",
      width: "100px",
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: "33.3333%",
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "20%",
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: "10%",
    },
  },
};

export default styles;
