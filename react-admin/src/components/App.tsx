import React from 'react';
import DrugList from './DrugsList'
//here I load the drug list component and inside there are two links to direct the all the other routes 
function App() {

  return (
    <div className="App">
      <h1>Available drugs </h1>
      <DrugList/>
    </div>
  );
}

export default App;
