import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AllDrugs from "pages/List";
import ShowDrug from "pages/Show";
import NewDrug from "pages/New";
import EditDrug from "pages/Edit";

//I wrapped all of our routes inside the browser router and inside the switch in the router component
//path "/" will load the allDrugs in a list from the list component 
//path "/new" will load the drug form to add a new drug
//path "/edit/:id" will load the drug form with the selected drug data inside it 
//path "/:id" will load the selected drug information 
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
