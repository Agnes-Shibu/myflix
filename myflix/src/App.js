import React from "react";
import NavBar from "./Components/Navbar/NavBar";
import "./App.css"
import Banner from "./Components/Banner/Banner";
import RowPost from "./Components/RowPost/RowPost";
import { com,horror,action } from "./urls";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <RowPost url={action} title='Action'/>
      <RowPost url={com} title='Comedy' isSmall/>
      <RowPost url={horror} title='Horror' isSmall/>
    </div>
  );
}

export default App;
