import React, { useState, useEffect } from "react";
import { Drug } from "../services/Drug";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextField, Grid, Button } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: "80%",
      textAlign: "center",
      margin: "auto",
    },
    heading: {
      textAlign: "center",
      margin: "20px auto",
      fontFamily: "arial",
      color: "#055225",
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
// here I used the useParams hook from the react router dom to get the id that was sent in the active route then send a request to the server with id in the url and receive the response and store it in a state variable drug then initialize the form values with the current object and using the onChange event to keep track of the current state of the input fields then on submit I sent the url request to the server using the put method
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
      const res = await axios({ method: "PUT", url: `http://localhost:8000/drugs/${id}`, data: Drug });
      console.log(res)
      setSubmit(true);
      history.push("/");
    } else {
      setSubmit(false);
    }
  };
  const handleChange = (name: "name" | "UUID" | "date_added" | "quantity" | "summary", value: any) => {
    setDrug({ ...Drug, [name]: value });
  };
  useEffect(() => {
    if (id)
      (async () => {
        const data = await axios({ method: "get", url: `http://localhost:8000/Drugs/${id}` });
        setDrug(data.data);
      })();
  }, [id]);
  return (
    <React.Fragment>
      <h1 className={classes.heading}>Edit A Drug</h1>
      <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
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
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              required
              className={classes.input}
              value={Drug?.quantity}
              label="Available Quantity"
              placeholder="enter the Drug's Available Quantity "
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
              required
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
              Edit
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default EditDrug;
