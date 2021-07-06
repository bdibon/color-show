import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/PaletteStyles";
class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: "hex" };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeLevel(level) {
    this.setState({ level });
  }

  changeFormat(val) {
    this.setState({ format: val });
  }

  render() {
    const { colors, paletteName, emoji, id: paletteId, classes } = this.props;
    const { level, format } = this.state;
    const colorBoxes = colors[level].map((color) => (
      <ColorBox
        key={color.id}
        background={color[format]}
        name={color.name}
        paletteId={paletteId}
        colorId={color.id}
        showingFullPalette={true}
      />
    ));
    return (
      <div className={classes.Palette}>
        <NavBar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
          colorSlider={true}
        />
        <div className={classes.colors}>{colorBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
