import React, { Fragment, useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useStyles } from "./styles/ColorPickerFormStyles";

export default function ColorPickerForm(props) {
  const { paletteIsFull, colors, addNewColor } = props;
  const classes = useStyles();

  const [currentColor, setCurrentColor] = useState("teal");
  const handleColorChange = (newColor) => {
    setCurrentColor(newColor.hex);
  };

  const [newColorName, setNewColorName] = useState("");
  const handleColorNameChange = (e) => {
    setNewColorName(e.target.value);
  };

  const handleSubmit = () => {
    addNewColor({ color: currentColor, name: newColorName });
    setNewColorName("");
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", () => {
      return colors.every(({ color }) => color !== currentColor);
    });
  });

  return (
    <Fragment>
      <ChromePicker
        className={classes.picker}
        color={currentColor}
        onChangeComplete={handleColorChange}
      />
      <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
        <TextValidator
          className={classes.colorNameInput}
          name="newColorName"
          placeholder="Color Name"
          margin="normal"
          variant="filled"
          value={newColorName}
          onChange={handleColorNameChange}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "this field is required",
            "color name must be unique",
            "color already used",
          ]}
        />
        <Button
          className={classes.addColor}
          variant="contained"
          type="submit"
          color="primary"
          style={{
            backgroundColor: paletteIsFull ? "currentColor" : currentColor,
          }}
          disabled={paletteIsFull}
        >
          {paletteIsFull ? "Palette is full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </Fragment>
  );
}
