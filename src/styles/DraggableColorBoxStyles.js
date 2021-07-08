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
  },
  boxContent: {
    bottom: "0px",
    boxSizing: "border-box",
    color: "rgba(0, 0, 0, 0.5)",
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