import React from "react";
import "./styles.scss";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import {connect} from "react-redux";
import {pathLogoutPage, pathProfile, pathHomePage, pathAbout} from "../../constants/routesConstant";

class NavBarView extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href={pathAbout}>CHAT SIMPLE APP Web version</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href={pathHomePage}>HOME</Nav.Link>
            <Nav.Link href={pathAbout}>ABOUT</Nav.Link>
          </Nav>
          <Nav className="mr-3">
            
            <NavDropdown title="PROFILES" id="collasible-nav-dropdown" className="custom-nav-dropdown-right">
              <NavDropdown.Item href={pathProfile}>Update profile</NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item href={pathLogoutPage}>SIGN OUT</NavDropdown.Item>
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


export default connect(
  (state) => ({
    authReducer: state.authReducer
  }),
  {}
)(NavBarView);