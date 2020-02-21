import React, {useState} from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Images from "../../themes/Images";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import "./styles.scss";
import propTypes from "prop-types";
import {updateProfile} from "../../actions/profileActions";
import {connect} from "react-redux";

function ProfileView({user, updateProfile}) {
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user.displayName);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [des, setDes] = useState(user.des);
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-9 col-lg-7 mx-auto">
          <Card className="card-profile">
            <Card.Img variant="top" src={Images.cardBackground}/>
            <UserAvatar user={user} hideStatus/>
            <Card.Body>
              {editing ?
                <InputGroup className="mb-3" size="sm">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="display-name">Display name</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Enter your display name"
                    aria-label="Username"
                    aria-describedby="display-name"
                    value={displayName}
                    onChange={event => setDisplayName(event.target.value)}
                  />
                </InputGroup> :
                <Card.Title>{displayName}</Card.Title>
              }
              {editing ?
                <InputGroup className="mb-3" size="sm">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="phoneNumber">Phone number</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Enter your phone"
                    aria-label="Phone number"
                    aria-describedby="Phone number"
                    value={phoneNumber}
                    onChange={event => setPhoneNumber(event.target.value)}
                  />
                </InputGroup> :
                <Card.Title>{phoneNumber}</Card.Title>
              }
              {editing ?
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Description about you</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    as="textarea"
                    aria-label="Description about you"
                    value={des}
                    onChange={event => setDes(event.target.value)}
                  />
                </InputGroup> :
                <Card.Text>
                  {des}
                </Card.Text>
              }
            </Card.Body>
            <Card.Footer>
              <Button
                variant="primary"
                onClick={editing ? () => {
                  updateProfile({...user, displayName, des});
                  setEditing(!editing);
                } : () => setEditing(!editing)}
                size="lg"
                block
              >
                {editing ? "Save" : "Edit"}
              </Button>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
}

ProfileView.propTypes = {
  user: propTypes.object
};

export default connect(
  (state) => ({
    user: state.authReducer
  }),
  {updateProfile}
)(ProfileView);

const USER = {
  displayName: "User9",
  email: "test@mail.com",
  statusText: "Sometime good!",
  isOnline: true,
  photoURL: "http://profilepicturesdp.com/wp-content/uploads/2018/07/sweet-girl-profile-pictures-9.jpg",
  des: "test tetsajoawdaw iojdaoiwjdoiuahwdniuahwiud hawuiHU!Hiu hIUHUIH!IUH!IU!HIU!HEIU."
};