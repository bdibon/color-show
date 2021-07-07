import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Button } from "@material-ui/core";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DraggableColorList from "./DraggableColorList.js";
import PaletteFormNav from "./PaletteFormNav.js";
import { arrayMove } from "react-sortable-hoc";

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

NewPaletteForm.defaultProps = {
  maxColors: 20,
};

export default function NewPaletteForm(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [currentColor, setCurrentColor] = useState("teal");
  const [colors, setColors] = useState(props.palettes[0].colors);
  const [newColorName, setNewColorName] = useState("");

  const paletteIsFull = colors.length >= props.maxColors;

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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleColorNameChange = (e) => {
    setNewColorName(e.target.value);
  };

  const addNewColor = () => {
    const newColor = { color: currentColor, name: newColorName };
    setColors([...colors, newColor]);
  };

  const clearColors = () => {
    setColors([]);
  };

  const savePalette = (newPaletteName) => {
    const newPalette = {
      paletteName: newPaletteName,
      colors,
      id: newColorName.toLowerCase().replace(/ /g, "-"),
    };
    props.savePalette(newPalette);
    props.history.push("/");
  };

  const deleteColor = (colorName) => {
    setColors(colors.filter((color) => color.name !== colorName));
  };

  const addRandomColor = () => {
    const allColors = props.palettes.map((p) => p.colors).flat();
    const rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
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
        <Typography variant="h4">Design Your Palette</Typography>
        <div>
          <Button variant="contained" color="secondary" onClick={clearColors}>
            Clear Palette
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={addRandomColor}
            disabled={paletteIsFull}
          >
            Random Color
          </Button>
        </div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={(newColor) => setCurrentColor(newColor.hex)}
        />
        <ValidatorForm onSubmit={addNewColor}>
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
