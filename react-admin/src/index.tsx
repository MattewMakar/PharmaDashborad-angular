import React from 'react';
import ReactDOM from 'react-dom';
import Routers from "./routers";
//here I only load the main router component  
ReactDOM.render(
  <React.StrictMode>
    <Routers />
  </React.StrictMode>,
  document.getElementById('root')
);

