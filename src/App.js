import React, { Component } from "react";
import { generatePalette } from "./colorHelpers";
import Palette from "./Palette";

import seedColors from "./seedColors";

export default class App extends Component {
  render() {
    return (
      <div>
        <Palette {...generatePalette(seedColors[4])} />
      </div>
    );
  }
}
