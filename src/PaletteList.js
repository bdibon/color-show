import React, { Component } from "react";
import MiniPalette from "./MiniPalette";

export default class PaletteList extends Component {
  render() {
    const { palettes } = this.props;
    return (
      <div>
        <MiniPalette />
        <h1>React Colors</h1>
        {palettes.map((palette) => (
          <MiniPalette key={palette.id} {...palette} />
        ))}
      </div>
    );
  }
}
