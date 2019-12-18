import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./styles.scss";

class ConversationView extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="mb-sm-3 mb-md-0 card contacts-card">
        <div className="card__header">
          <div className="input-group">
            <input type="text" placeholder="Search..." name="" className="form-control search"/>
              <div className="input-group-prepend">
                <span className="input-group-text search__btn">
                  {/*<i className="fas fa-search"></i>*/}
                  <FontAwesomeIcon icon={['fas', 'search']}/>
                </span>
              </div>
          </div>
        </div>
        <div className="card__body">

        </div>
        <div className="card__footer"></div>
      </div>
    );
  }
}

export default ConversationView;