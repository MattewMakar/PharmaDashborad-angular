import "date-fns";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Drug } from "../services/Drug";
import { createStyles, makeStyles, Theme, ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Card, TextField, Grid, Button } from "@material-ui/core";
import axios from "axios";
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
    },
    button: {
      width: "100%",
      fontWeight: 700,
    },
  })
);
const EditDrug = () => {
  const classes = useStyles();
  let history = useHistory();
  const { id }: { id: string } = useParams();

  const [Drug, setDrug] = useState<Drug>({
    name: "",
    
    UUID: "",
    date_added: new Date(),
    quantity: 0,
    summary: "",
  });
  const [submit, setSubmit] = useState(true);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Drug.name && Drug.UUID) {
      await axios({ method: "put", url: `http://localhost:8000/Drugs/${id}`, data: Drug });
      setSubmit(true);
      history.push('/');
    } else {
      setSubmit(false);
    }
  }
  const handleChange = (name: "name" |  "UUID" | "date_added" | "quantity" | "summary", value: any) => {
    setDrug({ ...Drug, [name]: value });
  };

  useEffect(() => {
    (async () => {
      const data = await axios({ method: "get", url: `http://localhost:8000/Drugs/${id}` });
      setDrug(data.data[0]);
    })();
  }, [id]);

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div>
          <Card className={classes.heading}>
            <h1>Edit a Drugs</h1>
          </Card>
          <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
            {" "}
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.input}
                  required
                  id="outlined-required"
                  value={Drug?.name}
                  label="Drug name"
                  placeholder="enter the Drug's name "
                  variant="outlined"
                  onChange={(e) => handleChange("name", e.target.value)}
                  name="name"
                  error={!submit && !Drug.name ? true : false}
                  helperText="name is required."
                />
              </Grid>
            
              <Grid item xs={6}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.input}
                  value={Drug?.UUID}
                  required
                  id="outlined-required"
                  label="UUID"
                  placeholder="enter the Drug's UUID "
                  variant="outlined"
                  onChange={(e) => handleChange("UUID", e.target.value)}
                  name="UUID"
                  error={!submit && !Drug.UUID ? true : false}
                  helperText="UUID is required."
                />
              </Grid>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date picker dialog"
                  format="MM/dd/yyyy"
                  value={Drug?.date_added}
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
                  value={Drug?.quantity}
                  label="Cover image url"
                  placeholder="enter the Drug's cover url "
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
                  value={Drug?.summary}
                  multiline
                  id="outlined-textarea"
                  label="Summary"
                  placeholder="enter the Drug's summary "
                  variant="outlined"
                  onChange={(e) => handleChange("summary", e.target.value)}
                  name="summary"
                />
              </Grid>
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

export default EditDrug
