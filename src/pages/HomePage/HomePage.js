import React from "react";
import Proptypes from "prop-types";
import "./styles.scss";

class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div className="home-page">
        hello, this is homepage
      </div>
    );
  }
}

HomePage.propTypes = {

};

export default HomePage;