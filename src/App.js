import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { generatePalette } from "./colorHelpers";
import PaletteList from "./PaletteList";
import Palette from "./Palette";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";

import seedColors from "./seedColors";

export default class App extends Component {
  findPalette(id) {
    return seedColors.find((palette) => palette.id === id);
  }
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <PaletteList palettes={seedColors} {...routeProps} />
          )}
        />
        <Route
          exact
          path="/palette/new"
          render={() => <NewPaletteForm></NewPaletteForm>}
        ></Route>
        <Route
          exact
          path="/palette/:id"
          render={(routeProps) => {
            const palette = this.findPalette(routeProps.match.params.id);
            return <Palette {...generatePalette(palette)} />;
          }}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={(routeProps) => (
            <SingleColorPalette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
              colorId={routeProps.match.params.colorId}
            ></SingleColorPalette>
          )}
        />
      </Switch>
    );
  }
}
