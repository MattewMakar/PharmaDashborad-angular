import express from "express";
import cors from "cors";
import router from "./router";

const app = express();
const PORT = 8000;
app.use(express.json());
app.use(cors());
app.use('/' , router
)
app.listen(PORT , () => {
  console.log(`app is listening at ${PORT}`);
})