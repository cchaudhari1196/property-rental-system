import React from 'react';
import '../OwnerHeader.css';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from "react-bootstrap";

function OwnerHeader(props) {

  console.log(JSON.parse(localStorage.getItem('data1')));
  let sign = JSON.parse(localStorage.getItem('data1'));
  let signOut = () => {
    if (sign != null) {
      localStorage.removeItem('data1');
      window.location.href = '/ownerlogin';
    }
  }
  console.log(sign);
  console.log(window.location.pathname)

  return (

    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Link to="/owner" className="navbar_brand"><Navbar.Brand > &nbsp;</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavLink to={"/owner"} className={window.location.pathname==="/owner"?"headerLink headerLinkActive" : "headerLink"} >View Properties</NavLink>
            <NavLink to={"/addproperty"} className={window.location.pathname==="/addproperty"?"headerLink headerLinkActive" : "headerLink"} >Add Properties</NavLink>


          </Nav>
          <Nav.Link>
          </Nav.Link>
          <Nav.Link >
            <Link to={!sign && "/ownerlogin"} className="headerLink">
              <div className='vheader_option'>
                <span className='vheader_optionLineOne'>Hello {!sign ? 'Owner' : sign.name}</span>
                <span className='vheader_optionLineTwo' onClick={signOut}>{sign ? 'Sign Out' : 'Sign In'}</span>
              </div>
            </Link>
          </Nav.Link>
          <Nav.Link style={{ color: "#6474E5" }} >
            <Link to={"/owner"} className="headerLink">Owner
            </Link></Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default OwnerHeader
