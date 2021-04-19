import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Drug } from "services/Drug";
import { Paper, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, createStyles, Theme, Button } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: "1px solid #888888",
      background: "#ebf3f3",

      textAlign: "center",
      margin: "20px auto",

      width: "80%",
    },
    drug: {
      cursor: "pointer",
      "&:hover": {
        background: "gray",
      },
    },
    table: {},
  })
);

const DrugsList = () => {
  const history = useHistory();
  const [drugs, setDrugs] = useState<Drug[]>([]);
  useEffect(() => {
    (async () => {
      const data = await axios({
        method: "get",
        url: "http://localhost:8000/drugs",
      });
      setDrugs(data.data);
    })();
  }, []);
  const classes = useStyles();

  const handleSelectDrug = (uuid: string) => {
    history.push(`/${uuid}`);
  };

  const handleDelete = async (id: string) => {
    const res = await axios({
      method: "DELETE",
      url: `http://localhost:8000/drugs/${id}`,
    });
    if (res.status === 200) {
      const newDrugs = drugs.filter((_) => _.UUID !== id);
      console.log(newDrugs);
      setDrugs(newDrugs);
    }
  };

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">UUID</TableCell>
            <TableCell align="right">Date added</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right"> </TableCell>
            <TableCell align="right"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drugs.map((drug) => (
            <TableRow className={classes.drug} key={drug.UUID}>
              <TableCell component="th" scope="row" onClick={() => handleSelectDrug(drug.UUID)}>
                {drug.name}
              </TableCell>
              <TableCell align="right" onClick={() => handleSelectDrug(drug.UUID)}>
                {drug.UUID}
              </TableCell>
              <TableCell align="right" onClick={() => handleSelectDrug(drug.UUID)}>
                {drug.date_added}
              </TableCell>
              <TableCell align="right" onClick={() => handleSelectDrug(drug.UUID)}>
                {drug.quantity}
              </TableCell>

              <TableCell align="right">
                <Button color="primary" onClick={() => history.push(`/edit/${drug.UUID}`)}>
                  Edit
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button color="secondary" onClick={() => handleDelete(drug.UUID)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DrugsList;
