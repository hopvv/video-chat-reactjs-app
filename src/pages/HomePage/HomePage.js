import React from "react";
import Proptypes from "prop-types";
import "./styles.scss";
import ConversationsView from "../../views/ConversationsView/ConversationsView";
import {logout} from "../../actions/AuthActions";
import {connect} from "react-redux";

class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  
  handleLogout() {
    this.props.logout();
  }
  
  render() {
    return(
      <div className="row justify-content-center h-100 home-page">
        <div className="col-md-4 col-xl-3 home-page__chat">
          <ConversationsView />
        </div>
        <div className="col-md-8 col-xl-6 home-page__chat">
          
          <button
            className="btn btn-lg btn-google btn-block text-uppercase btn-flex-icon"
            onClick={this.handleLogout.bind(this)}
          >logout</button>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {

};

export default connect(
  (state) => ({
  }),
  {logout}
)(HomePage);
