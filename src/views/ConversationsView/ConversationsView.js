import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./styles.scss";
import ConversationComponent from "../../components/ConversationComponent";

class ConversationsView extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const conversations = CONV_LIST;
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
          <ul>
            {conversations && conversations.length > 0 && conversations.map((conv, i) => {
              return (
                <li key={i}>
                  <ConversationComponent conversation={conv} />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="card__footer"></div>
      </div>
    );
  }
}

export default ConversationsView;

const CONV_LIST = [
  {user: {displayName: "User1", statusText: "Sometime good!", isOnline: true, photoURL: "https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg"}},
  {user: {displayName: "User2", statusText: "Sometime good!", isOnline: false, photoURL: "http://profilepicturesdp.com/wp-content/uploads/2018/07/sweet-girl-profile-pictures-9.jpg"}},
  {user: {displayName: "User3", statusText: "Sometime good!", isOnline: true}},
  {user: {displayName: "User4", statusText: "Sometime good!", isOnline: false, photoURL: "https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg"}},
  {user: {displayName: "User5", statusText: "Sometime good!", isOnline: false}},
  {user: {displayName: "User6", statusText: "Sometime good!", isOnline: false, photoURL: "https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg"}},
  {user: {displayName: "User7", statusText: "Sometime good!", isOnline: true, photoURL: "http://profilepicturesdp.com/wp-content/uploads/2018/07/sweet-girl-profile-pictures-9.jpg"}},
  {user: {displayName: "User8", statusText: "Sometime good!", isOnline: false, photoURL: "http://profilepicturesdp.com/wp-content/uploads/2018/07/sweet-girl-profile-pictures-9.jpg"}},
  {user: {displayName: "User9", statusText: "Sometime good!", isOnline: true, photoURL: "http://profilepicturesdp.com/wp-content/uploads/2018/07/sweet-girl-profile-pictures-9.jpg"}},
  {user: {displayName: "User10", statusText: "Sometime good!", isOnline: true}},
  {user: {displayName: "User11", statusText: "Sometime good!", isOnline: false}},
];