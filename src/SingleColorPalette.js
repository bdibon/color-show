import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/PaletteStyles";

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = { format: "hex" };
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.changeFormat = this.changeFormat.bind(this);
  }

  gatherShades(palette, colorId) {
    let shades = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorId)
      );
    }
    return shades.slice(1);
  }

  changeFormat(val) {
    this.setState({ format: val });
  }

  render() {
    const { format } = this.state;
    const { palette, classes } = this.props;
    const colorBoxes = this._shades.map((color) => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[format]}
        showingFullPalette={false}
      />
    ));
    return (
      <div className={classes.Palette}>
        <NavBar handleChange={this.changeFormat} colorSlider={false} />
        <div className={classes.colors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${palette.id}`}>Go Back</Link>
          </div>
        </div>
        <PaletteFooter
          paletteName={palette.paletteName}
          emoji={palette.emoji}
        />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
