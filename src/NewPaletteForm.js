import React, { useState } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Button } from "@material-ui/core";
import DraggableColorList from "./DraggableColorList.js";
import PaletteFormNav from "./PaletteFormNav.js";
import ColorPickerForm from "./ColorPickerForm.js";
import { arrayMove } from "react-sortable-hoc";
import { useStyles } from "./styles/NewPaletteFormStyles";
import seedColors from "./seedColors";

NewPaletteForm.defaultProps = {
  maxColors: 20,
};

export default function NewPaletteForm(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const [colors, setColors] = useState(seedColors[0].colors);

  const paletteIsFull = colors.length >= props.maxColors;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = (newColor) => {
    setColors([...colors, newColor]);
  };

  const clearColors = () => {
    setColors([]);
  };

  const savePalette = ({ paletteName, emoji }) => {
    const newPalette = {
      paletteName,
      emoji,
      colors,
      id: paletteName.toLowerCase().replace(/ /g, "-"),
    };
    props.savePalette(newPalette);
    props.history.push("/");
  };

  const deleteColor = (colorName) => {
    setColors(colors.filter((color) => color.name !== colorName));
  };

  const addRandomColor = () => {
    const allColors = props.palettes.map((p) => p.colors).flat();
    let rand;
    let randomColor;
    let isDuplicateColor = true;

    while (isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isDuplicateColor = colors.find(
        (color) => color.name === randomColor.name
      );
    }

    setColors([...colors, randomColor]);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  return (
    <div className={classes.root}>
      <PaletteFormNav
        classes={classes}
        palettes={props.palettes}
        savePalette={savePalette}
        handleDrawerOpen={handleDrawerOpen}
        open={open}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={clearColors}
            >
              Clear Palette
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={addRandomColor}
              disabled={paletteIsFull}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            paletteIsFull={paletteIsFull}
            colors={colors}
            addNewColor={addNewColor}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          deleteColor={deleteColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
}
