import React from "react";
import ReactDOM from "react-dom";
import Home from "./home.js";
import Registration from "./registration.js";

class Layout extends React.Component{
  render(){
    return(
        <div>
            <Home/>
        </div>
        );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Layout/>, app);
