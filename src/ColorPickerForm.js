import React, { Fragment, useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

export default function ColorPickerForm(props) {
  const { paletteIsFull, colors, addNewColor } = props;

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
      <ChromePicker color={currentColor} onChangeComplete={handleColorChange} />
      <ValidatorForm onSubmit={handleSubmit}>
        <TextValidator
          name="newColorName"
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
