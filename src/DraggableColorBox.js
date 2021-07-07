import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
  root: {
    cursor: "pointer",
    display: "inline-block",
    height: "25%",
    margin: "0 auto",
    marginBottom: "-3.9px",
    position: "relative",
    width: "20%",
  },
};

function DraggableColorBox(props) {
  const { color, name, classes } = props;
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      {name}
    </div>
  );
}

export default withStyles(styles)(DraggableColorBox);
