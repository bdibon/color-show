export default {
  NavBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "6vh",
  },

  logo: {
    marginRight: "15px",
    padding: "0 13px",
    fontSize: "22px",
    backgroundColor: "#eceff1",
    fontFamily: "Roboto",
    height: "100%",
    display: "flex",
    alignItems: "center",
    "& a": {
      textDecoration: "none",
      color: "black",
    },
  },
  slider: {
    display: "inline-block",
    margin: "0 10px",
    width: "340px",
    "& .rc-slider-rail": {
      height: "8px",
    },
    "& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:focus, .rc-slider-handle:hover":
      {
        backgroundColor: "green",
        border: "2px solid green",
        boxShadow: "none",
        height: "13px",
        marginTop: "-3px",
        outline: "none",
        width: "13px",
      },
    "& .rc-slider-track": {
      backgroundColor: "transparent",
    },
  },
  selectContainer: {
    marginLeft: "auto",
    marginRight: "1rem",
  },
};
