import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { generatePalette } from "./colorHelpers";
import Palette from "./Palette";

import seedColors from "./seedColors";

export default class App extends Component {
  findPalette(id) {
    return seedColors.find((palette) => palette.id === id);
  }
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <h1>Root</h1>
        </Route>
        <Route
          exact
          path="/palette/:id"
          render={(routeProps) => {
            const palette = this.findPalette(routeProps.match.params.id);
            return <Palette {...generatePalette(palette)} />;
          }}
        />
      </Switch>
    );
  }
}
