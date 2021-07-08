import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  picker: {
    width: "100% !important",
    marginTop: "2rem",
  },
  addColor: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem",
  },
  colorNameInput: {
    height: "70px",
    width: "100%",
  },
  form: {
    width: "100%",
  },
}));

export { useStyles };
