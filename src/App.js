import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/styles.scss";

import APODComponent from "./components/APODComponent";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
  }
  
  render() {
    return (
      <div className={"app"}>
        <APODComponent />
      </div>
    );
  }
}
