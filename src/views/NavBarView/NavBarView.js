import React from "react";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import {connect} from "react-redux";
import {pathLogoutPage, pathProfile, pathHomePage, pathAbout} from "../../constants/routesConstant";
import cn from "classnames";
import NavLink from "react-bootstrap/NavLink";
import {withRouter} from "react-router-dom";
import "./styles.scss";

class NavBarView extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Navbar className="nav-bar-customize" collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href={pathAbout}>CHAT SIMPLE APP Web version</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" onSelect={() => {console.log("DMMDMDMDM")}}>
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
            <NavDropdown title={this.props.authReducer.displayName} id="collasible-nav-dropdown" className="custom-nav-dropdown-right">
              <NavDropdown.Item href={pathProfile}>Update profile</NavDropdown.Item>
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
      onClick={onClick}>
      {children}
    </div>
  );
};

const CustomDropdownItem = ({classNameItem, onClick, children}) => {
  return (
    <div
      className={cn("dropdown-item", {[classNameItem]: classNameItem})}
      onClick={onClick}>
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