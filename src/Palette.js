import React, { Component } from "react";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import "./Palette.css";

export default class Palette extends Component {
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
    const { level, format } = this.state;
    const colorBoxes = this.props.colors[level].map((color) => (
      <ColorBox key={color.name} background={color[format]} name={color.name} />
    ));
    return (
      <div className="Palette">
        <NavBar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
        />
        <div className="Palette-colors">{colorBoxes}</div>
        {/* Footer */}
      </div>
    );
  }
}
