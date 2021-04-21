import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CardActions, CardHeader ,Card, CardMedia, CardContent, Typography, Button, CardActionArea, makeStyles } from "@material-ui/core";
import image from '../assets/drug.jpg'
import { Drug } from "services/Drug";
import { useHistory  } from "react-router-dom";
//here I used the useParams hook from react-router-dom to get the id from the active route then send a get request to the server with the id and store the returned drug in a state variable and render it in this component 
const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  media: {
    width: 200,
    height: 140
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const ShowDrug = () => {
  const history = useHistory();
  const classes = useStyles();
  const params: { id: string } = useParams();
  const [drug, setDrug] = useState<Drug | undefined>();
  useEffect(() => {
    (async () => {
      const { data } = await axios({
        method: "GET",
        url: `http://localhost:8000/drugs/${params.id}`,
      });
      setDrug(data);      
    })();
  }, [params]);

  const handleDelete = async (id: string) => {
    const res = await axios({
      method: "DELETE",
      url: `http://localhost:8000/drugs/${id}`,
    });
    if (res.status === 200) {
      history.push("/");
    }
  };
  

  return (
    <div className={classes.center}>
     
      {drug && (
        
        <Card className={classes.root}>
          <CardHeader title={ drug.name}/> 
          <CardActionArea>
            <CardMedia className={classes.media} image={image} title="Contemplative Reptile" />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {drug.summary}{" "}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={() => history.push(`/edit/${drug.UUID}`)}>
              Edit
            </Button>
            <Button size="small" color="secondary" onClick={() => handleDelete(drug.UUID)}>
              Delete
            </Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
};

export default ShowDrug;
