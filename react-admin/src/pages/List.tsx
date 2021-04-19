import { makeStyles, createStyles, Button } from "@material-ui/core";
import List from "components/DrugsList";
import { useHistory } from "react-router";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      textAlign: "center",
      margin: "auto",
      color: "#055225",
      fontFamily: "arial",
    },
    button: {
      border: "1px solid #888888",
      borderRadius: 10,
      background: "#16c831",
      margin: 20,
      width: "50%",
      fontWeight: 700,
    },
  })
);

const DrugList = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <h1>React Admin Dashboard</h1>

      <h2>Available drugs</h2>
      <Button className={classes.button} onClick={() => history.push("/new")}>
        + add{" "}
      </Button>
      <List />
    </div>
  );
};

export default DrugList;
