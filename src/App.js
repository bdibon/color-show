import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { generatePalette } from "./colorHelpers";
import PaletteList from "./PaletteList";
import Palette from "./Palette";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import seedColors from "./seedColors";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(localStorage.getItem("palettes"));
    this.state = { palettes: savedPalettes || seedColors };
    this.savePalette = this.savePalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  findPalette(id) {
    return this.state.palettes.find((palette) => palette.id === id);
  }

  deletePalette(id) {
    return this.setState(
      (st) => ({
        palettes: st.palettes.filter((pal) => pal.id !== id),
      }),
      this.syncLocalStorage
    );
  }

  savePalette(newPalette) {
    this.setState(
      { palettes: [...this.state.palettes, newPalette] },
      this.syncLocalStorage
    );
  }

  syncLocalStorage() {
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    );
  }

  render() {
    return (
      <Route
        render={({ location }) => {
          return (
            <TransitionGroup>
              <CSSTransition key={location.key} classNames="fade" timeout={500}>
                <Switch location={location}>
                  <Route
                    exact
                    path="/"
                    render={(routeProps) => (
                      <div className="page">
                        <PaletteList
                          palettes={this.state.palettes}
                          {...routeProps}
                          deletePalette={this.deletePalette}
                        />
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path="/palette/new"
                    render={(routeProps) => (
                      <div className="page">
                        <NewPaletteForm
                          {...routeProps}
                          savePalette={this.savePalette}
                          palettes={this.state.palettes}
                        />
                      </div>
                    )}
                  ></Route>
                  <Route
                    exact
                    path="/palette/:id"
                    render={(routeProps) => {
                      const palette = this.findPalette(
                        routeProps.match.params.id
                      );
                      return (
                        <div className="page">
                          <Palette {...generatePalette(palette)} />;
                        </div>
                      );
                    }}
                  />
                  <Route
                    exact
                    path="/palette/:paletteId/:colorId"
                    render={(routeProps) => (
                      <div className="page">
                        <SingleColorPalette
                          palette={generatePalette(
                            this.findPalette(routeProps.match.params.paletteId)
                          )}
                          colorId={routeProps.match.params.colorId}
                        />
                      </div>
                    )}
                  />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          );
        }}
      />
    );
  }
}
