import React from "react";
import Proptypes from "prop-types";
import "./styles.scss";
import ConversationView from "../../components/ConversationView/ConversationView";

class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div className="row justify-content-center h-100 home-page">
        <div className="col-md-4 col-xl-3 home-page__chat">
          <ConversationView />
        </div>
        <div className="col-md-8 col-xl-6 home-page__chat">chat box</div>
      </div>
    );
  }
}

HomePage.propTypes = {

};

export default HomePage;