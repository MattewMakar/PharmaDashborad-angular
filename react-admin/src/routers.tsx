import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AllDrugs from "pages/List";
import ShowDrug from "pages/Show";
import NewDrug from "pages/New";
import EditDrug from "pages/Edit";


export default function Routers() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={AllDrugs} />
        <Route path="/new" exact component={NewDrug} />
        <Route path="/edit/:id" exact component={EditDrug} />
        <Route path="/:id" exact component={ShowDrug} />
      </Switch>
    </Router>
  );
}
