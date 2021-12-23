import React from "react";
import {Provider} from "react-redux";
import Menu from "./Menu";
import store from "./store";
class App extends React.Component{
  render(){
    return(
    
    <Provider store ={store}>
        <Menu/>
    </Provider>

    )}
}

export default App;
