import React from "react";
import {Navbar, Nav, NavDropdown, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {pathLogoutPage, pathProfile, pathHomePage, pathAbout, pathFullAbout} from "../../constants/routesConstant";
import cn from "classnames";
import {withRouter} from "react-router-dom";
import "./styles.scss";
import Images from "../../themes/Images";
import Image from "react-bootstrap/Image";

class NavBarView extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Navbar className="nav-bar-customize" collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href={pathFullAbout}>CHAT SIMPLE APP Web version</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={undefined} id="toggle-menu-button"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <CustomNavLink
              onClick={() => {
                this.props.history.push(pathHomePage)
              }}
              active={this.props.location.pathname === pathHomePage}
            >
              HOME
            </CustomNavLink>
            <CustomNavLink
              onClick={() => {
                this.props.history.push(pathAbout)
              }}
              active={this.props.location.pathname === pathAbout}
            >
              ABOUT
            </CustomNavLink>
          </Nav>
          <Nav className="mr-3">
            <NavDropdown
              title={
                <div className="user-box">
                  <Image
                    style={{width: "35px", height: "35px"}}
                    roundedCircle
                    src={this.props.authReducer.photoURL ? this.props.authReducer.photoURL : Images.noProfile}
                  />
                  <span className="nav-link active">{this.props.authReducer.displayName}</span>
                </div>
              }
              id="collasible-nav-dropdown"
              className="custom-nav-dropdown-right"
            >
              <CustomDropdownItem
                onClick={() => {
                  this.props.history.push(pathProfile)
                }}
              >
                Update profile
              </CustomDropdownItem>
              <NavDropdown.Divider/>
              <CustomDropdownItem
                onClick={() => {
                  this.props.history.push(pathLogoutPage)
                }}
              >
                Sign out
              </CustomDropdownItem>
              {/*<NavDropdown.Item href={pathLogoutPage}>Sign out</NavDropdown.Item>*/}
            </NavDropdown>
            
            {/*<Nav.Link href="/login">SIGN IN</Nav.Link>*/}
            {/*<Nav.Link eventKey={2} href="#memes">*/}
            {/*  Dank memes*/}
            {/*</Nav.Link>*/}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const CustomNavLink = ({classNameLink, onClick, children, active}) => {
  return (
    <div
      className={cn("nav-link", {[classNameLink]: classNameLink, "active": active})}
      onClick={() => {
        document.getElementById("toggle-menu-button").click();
        onClick();
      }}
    >
      {children}
    </div>
  );
};

const CustomDropdownItem = ({classNameItem, onClick, children}) => {
  return (
    <div
      className={cn("dropdown-item", {[classNameItem]: classNameItem})}
      onClick={() => {
        document.getElementById("toggle-menu-button").click();
        onClick();
      }}
    >
      {children}
    </div>
  );
};

export default withRouter(connect(
  (state) => ({
    authReducer: state.authReducer
  }),
  {}
)(NavBarView));