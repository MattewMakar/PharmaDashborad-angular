import "date-fns";
import React, { useState } from "react";
import { Drug } from "../services/Drug";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { createStyles, makeStyles, Theme, ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Card, TextField, Grid, Button } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const theme = createMuiTheme({
  overrides: {
    MuiFormControl: {
      marginNormal: {
        marginBottom: 0,
        marginTop: 0,
      },
    },
  },
});
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: "80%",
      textAlign: "center",
      margin: "auto",
    },
    heading: {
      width: "50%",
      background: "#081C8D",
      textAlign: "center",
      color: "#FFFFFF",
      margin: "auto",
      marginBottom: "50px",
      "& h1": {
        margin: "auto",
      },
    },

    input: {
      width: "100%",
      alignSelf: "center",
    },
    button: {
      width: "100%",
      fontWeight: 700,
    },
    error: {
      color: "#ff0000",
      fontWeight: 700,
    },
  })
);

const AddDrug = () => {
  const classes = useStyles();
  let history = useHistory();
  const [drug, setdrug] = useState<Drug>({
    name: "",
    UUID: "",
    date_added: new Date(),
    quantity: 0,
    summary: "",
  });
  const [submit, setSubmit] = useState(true);
  const [serverError, setServerError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setServerError(false);

      if (drug.name && drug.UUID) {
        await axios({ method: "post", url: "http://localhost:8000/drugs", data: drug });
        setSubmit(true);
        history.push("/");
      } else {
        setSubmit(false);
      }
    } catch (err) {
      setServerError(true);
    }
  };
  const handleChange = (name: "name"  | "UUID" | "date_added" | "quantity" | "summary", value: any) => {
    setdrug({ ...drug, [name]: value });
  };

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div>
          <Card className={classes.heading}>
            <h1>Add A drug</h1>
          </Card>
          <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.input}
                  required
                  id="outlined-required"
                  value={drug?.name}
                  label="drug name"
                  placeholder="enter the drug's name "
                  variant="outlined"
                  onChange={(e) => handleChange("name", e.target.value)}
                  name="name"
                  error={!submit && !drug.name ? true : false}
                  helperText={!submit && !drug.UUID ? "name is required." : ""}
                />
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.input}
                  value={drug?.UUID}
                  required
                  id="outlined-required"
                  label="UUID"
                  placeholder="enter the drug's UUID "
                  variant="outlined"
                  onChange={(e) => handleChange("UUID", e.target.value)}
                  name="UUID"
                  error={!submit && !drug.UUID ? true : false}
                  helperText={!submit && !drug.UUID ? "UUID is required." : ""}
                />
              </Grid>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date picker dialog"
                  format="MM/dd/yyyy"
                  value={drug?.date_added}
                  onChange={(date) => handleChange("date_added", date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  className={classes.input}
                  inputVariant="outlined"
                  name="date"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.input}
                  value={drug?.quantity}
                  label="Cover image url"
                  placeholder="enter the drug's cover url "
                  variant="outlined"
                  onChange={(e) => handleChange("quantity", e.target.value)}
                  name="cover"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.input}
                  value={drug?.summary}
                  multiline
                  id="outlined-textarea"
                  label="Summary"
                  placeholder="enter the drug's summary "
                  variant="outlined"
                  onChange={(e) => handleChange("summary", e.target.value)}
                  name="summary"
                />
              </Grid>
              {serverError ? (
                <Grid item xs={12}>
                  <p className={classes.error}>The UUID you entered is already exist</p>
                </Grid>
              ) : null}

              <Grid item xs={12}>
                <Button className={classes.button} variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default AddDrug
