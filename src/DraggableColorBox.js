import React from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  root: {
    cursor: "pointer",
    display: "inline-block",
    height: "25%",
    margin: "0 auto",
    marginBottom: "-3.9px",
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

function DraggableColorBox(props) {
  const { color, name, classes, deleteColor } = props;
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={deleteColor} />
      </div>
    </div>
  );
}

export default withStyles(styles)(DraggableColorBox);
